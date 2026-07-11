"use client";

/**
 * Hero background surface. Renders the static hero photo immediately (the LCP
 * element, priority-loaded). Once the CRM hero-images API responds, the managed
 * image(s) take over and the static photo is removed so it can never bleed
 * through a transition. Multiple images become an auto-rotating slider.
 *
 * Crossfade is two-layer: the previous frame stays fully opaque underneath
 * while the incoming frame fades in on top (see `.animate-hero-fade`). This
 * avoids the mid-transition dip that would otherwise flash whatever sits below.
 */
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useContentStore } from "@/lib/store";
import type { HeroImage } from "@/lib/api";

const ROTATE_MS = 6000;

/** One responsive slider layer (desktop OR mobile). */
function Slider({
  images,
  className,
}: {
  images: HeroImage[];
  className: string;
}) {
  // Track current + previous index together so the previous frame can stay
  // solid under the incoming fade without reading a ref during render.
  const [{ i, prev }, setSlide] = useState<{ i: number; prev: number | null }>({
    i: 0,
    prev: null,
  });
  const reduce = useRef(false);

  const goTo = (next: number) =>
    setSlide((s) => (s.i === next ? s : { i: next, prev: s.i }));

  useEffect(() => {
    reduce.current =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (images.length < 2 || reduce.current) return;
    const t = setInterval(
      () => setSlide((s) => ({ i: (s.i + 1) % images.length, prev: s.i })),
      ROTATE_MS,
    );
    return () => clearInterval(t);
  }, [images.length]);

  return (
    <div className={`${className} bg-forest-900`} aria-hidden>
      {/* Previous frame — solid underneath so the fade never reveals a gap. */}
      {prev !== null && prev !== i && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={`prev-${prev}`}
          src={images[prev].url}
          alt=""
          decoding="async"
          className="absolute inset-0 z-0 h-full w-full object-cover object-center"
        />
      )}

      {/* Current frame — fades in on top; keyed by index so it replays. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={`cur-${i}`}
        src={images[i].url}
        alt=""
        width={images[i].width}
        height={images[i].height}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        className="animate-hero-fade absolute inset-0 z-[1] h-full w-full object-cover object-center"
      />

      {/* Preload the rest so the next slide is decoded before it shows. */}
      <div className="hidden">
        {images.map((img, idx) =>
          idx === i ? null : (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={`pl-${img.url}`} src={img.url} alt="" loading="lazy" decoding="async" />
          ),
        )}
      </div>

      {images.length > 1 && (
        <div className="pointer-events-auto absolute bottom-4 right-4 z-[2] flex gap-1.5">
          {images.map((img, idx) => (
            <button
              key={img.url}
              type="button"
              aria-label={`Show hero image ${idx + 1}`}
              onClick={() => goTo(idx)}
              className={`h-1.5 rounded-full transition-all ${
                idx === i ? "w-5 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function HeroBackdrop() {
  const { status, data } = useContentStore((s) => s.hero);
  const loadHero = useContentStore((s) => s.loadHero);

  useEffect(() => {
    loadHero();
  }, [loadHero]);

  const ready = status === "ready";
  const hasDesktop = ready && data.desktop.length > 0;
  const hasMobile = ready && data.mobile.length > 0;

  return (
    <>
      {/* Static base — instant LCP. Removed per-variant once the API images
          are in, so it can never show through a slider transition. */}
      {!hasDesktop && (
        <Image
          src="/assets/hero-solar-rooftop.png"
          alt="Rooftop solar panels on an Australian home at golden hour"
          fill
          priority
          sizes="(max-width: 639px) 1px, 100vw"
          className="-z-10 hidden object-cover object-center sm:block"
        />
      )}
      {!hasMobile && (
        <Image
          src="/assets/hero-solar-rooftop-mobile.png"
          alt="Rooftop solar panels on an Australian home at golden hour"
          fill
          priority
          sizes="(max-width: 639px) 100vw, 1px"
          className="-z-10 object-cover object-center sm:hidden"
        />
      )}

      {/* CRM-managed images once loaded. */}
      {hasDesktop && (
        <Slider
          images={data.desktop}
          className="absolute inset-0 -z-10 hidden sm:block"
        />
      )}
      {hasMobile && (
        <Slider
          images={data.mobile}
          className="absolute inset-0 -z-10 sm:hidden"
        />
      )}
    </>
  );
}
