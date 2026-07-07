"use client";

/**
 * Hero background surface. Renders the static hero photo immediately (the LCP
 * element, priority-loaded) and, once the CRM hero-images API responds, fades
 * in the managed image(s) on top. Multiple images become an auto-rotating
 * slider with dots. Static image stays underneath as a zero-cost fallback, so
 * a slow or failed API never leaves the hero blank.
 */
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useContentStore } from "@/lib/store";
import type { HeroImage } from "@/lib/api";

const ROTATE_MS = 6000;

/** One responsive slider layer (desktop OR mobile). Only rendered when the API
 *  returned at least one image for that variant. */
function Slider({
  images,
  className,
}: {
  images: HeroImage[];
  className: string;
}) {
  const [i, setI] = useState(0);
  const reduce = useRef(false);

  useEffect(() => {
    reduce.current =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (images.length < 2 || reduce.current) return;
    const t = setInterval(
      () => setI((p) => (p + 1) % images.length),
      ROTATE_MS,
    );
    return () => clearInterval(t);
  }, [images.length]);

  return (
    <div className={className} aria-hidden>
      {images.map((img, idx) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={img.url}
          src={img.url}
          alt=""
          width={img.width}
          height={img.height}
          loading={idx === 0 ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={idx === 0 ? "high" : undefined}
          className="absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ease-out"
          style={{ opacity: idx === i ? 1 : 0 }}
        />
      ))}

      {images.length > 1 && (
        <div className="pointer-events-auto absolute bottom-4 right-4 z-[1] flex gap-1.5">
          {images.map((img, idx) => (
            <button
              key={img.url}
              type="button"
              aria-label={`Show hero image ${idx + 1}`}
              onClick={() => setI(idx)}
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
      {/* Static base layer — instant LCP, always present. */}
      <Image
        src="/assets/hero-solar-rooftop.png"
        alt="Rooftop solar panels on an Australian home at golden hour"
        fill
        priority
        sizes="(max-width: 639px) 1px, 100vw"
        className="-z-10 hidden object-cover object-center sm:block"
      />
      <Image
        src="/assets/hero-solar-rooftop-mobile.png"
        alt="Rooftop solar panels on an Australian home at golden hour"
        fill
        priority
        sizes="(max-width: 639px) 100vw, 1px"
        className="-z-10 object-cover object-center sm:hidden"
      />

      {/* CRM-managed images fade in on top once loaded. */}
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
