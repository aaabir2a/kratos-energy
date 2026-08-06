"use client";

/**
 * Homepage hero.
 *  - Mobile / tablet (< lg): original full-bleed dark overlay hero, unchanged.
 *  - Desktop (≥ lg): new split-screen layout.
 *      Left 48 %  — white background, all copy, flush to left viewport edge.
 *      Right 52 % — full-bleed image slider, flush to right viewport edge.
 *      Slider: pure opacity crossfade only (no zoom), 3 s dwell, no dot nav.
 */
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { Stars } from "@/components/ui/Stars";
import { NETBadge } from "@/components/layout/NETBadge";
import { scrollToId } from "@/lib/utils";
import type { HeroImage, HeroImages } from "@/lib/api";

/** Dwell time in ms — must match .animate-hero-progress duration in globals.css */
const ROTATE_MS = 3000;

const TRUST: { value: string; label: string }[] = [
  { value: "2,847+", label: "Homes powered" },
  { value: "$0", label: "Upfront options" },
  { value: "≈ $2,310", label: "Saved per year" },
];

/* ─── Slider helpers ─────────────────────────────────────────────────────── */

/**
 * Pure-fade crossfade slider. No zoom, no nav dots.
 * `showNav` controls whether to render the segmented progress bars
 * (kept for the mobile/tablet hero; hidden for the new desktop panel).
 */
function Slider({
  images,
  className,
  showNav = false,
}: {
  images: HeroImage[];
  className?: string;
  showNav?: boolean;
}) {
  const [{ i, prev }, setSlide] = useState<{ i: number; prev: number | null }>({
    i: 0,
    prev: null,
  });
  const reduce = useRef(false);

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
    <div className={className} aria-hidden>
      {/* Previous frame stays visible while new one fades in — no pop. */}
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
        className="animate-hero-slide absolute inset-0 z-[1] h-full w-full object-cover object-center"
      />

      {/* Preload the rest. */}
      <div className="hidden">
        {images.map((img, idx) =>
          idx === i ? null : (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={`pl-${img.url}`} src={img.url} alt="" loading="lazy" decoding="async" />
          ),
        )}
      </div>

      {/* Optional segmented progress bars (mobile hero only). */}
      {showNav && images.length > 1 && (
        <div className="pointer-events-auto absolute bottom-5 right-5 z-[2] flex gap-2 sm:bottom-7 sm:right-8">
          {images.map((img, idx) => (
            <button
              key={img.url}
              type="button"
              aria-label={`Show photo ${idx + 1} of ${images.length}`}
              onClick={() => setSlide((s) => (s.i === idx ? s : { i: idx, prev: s.i }))}
              className="group flex h-5 items-center"
            >
              <span className="h-[3px] w-9 overflow-hidden rounded-pill bg-white/30 transition-colors group-hover:bg-white/45">
                {idx === i && (
                  <span key={`fill-${i}`} className="animate-hero-progress block h-full bg-white" />
                )}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Hero export ────────────────────────────────────────────────────────── */

export function Hero({ images }: { images: HeroImages }) {
  const hasDesktop = images.desktop.length > 0;
  const hasMobile = images.mobile.length > 0;

  return (
    <div id="top">
      {/* ── Mobile / Tablet hero (unchanged) ─────────────────────────── */}
      <section className="relative isolate flex min-h-[540px] items-stretch overflow-hidden bg-forest-900 lg:hidden">
        {hasDesktop ? (
          <Slider images={images.desktop} className="absolute inset-0 -z-10 hidden sm:block" showNav />
        ) : (
          <Image
            src="/assets/hero-solar-rooftop.png"
            alt="Rooftop solar panels on an Australian home at golden hour"
            fill
            priority
            sizes="(max-width: 639px) 1px, 100vw"
            className="-z-10 hidden object-cover object-center sm:block"
          />
        )}
        {hasMobile ? (
          <Slider images={images.mobile} className="absolute inset-0 -z-10 sm:hidden" showNav />
        ) : (
          <Image
            src="/assets/hero-solar-rooftop-mobile.png"
            alt="Rooftop solar panels on an Australian home at golden hour"
            fill
            priority
            sizes="(max-width: 639px) 100vw, 1px"
            className="-z-10 object-cover object-center sm:hidden"
          />
        )}

        <div className="absolute inset-0 -z-[5] bg-[linear-gradient(105deg,#0c3b28_4%,rgba(12,59,40,0.78)_38%,rgba(12,59,40,0.30)_66%,rgba(12,59,40,0.08)_100%)]" />
        <div className="absolute inset-0 -z-[5] bg-gradient-to-t from-forest-900 via-forest-900/35 to-transparent" />
        <div
          aria-hidden
          className="pointer-events-none absolute left-[-6%] top-[26%] -z-[4] h-[460px] w-[460px] rounded-full bg-green-400/20 blur-[130px]"
        />

        <div className="container-ke relative z-10 flex w-full flex-col justify-center gap-8 py-10 sm:py-12">
          <div className="max-w-[660px]">
            <div
              className="animate-fade-up mb-6 inline-flex items-center gap-2.5 rounded-pill bg-white/10 py-1.5 pl-[7px] pr-3.5 ring-1 ring-inset ring-white/15"
              style={{ animationDelay: "0ms" }}
            >
              <span className="rounded-pill bg-green-500 px-2.5 py-[3px] font-display text-[11px] font-bold tracking-[0.04em] text-white">
                CEC APPROVED
              </span>
              <span className="inline-flex items-center gap-[7px] font-body text-[13px] font-bold text-white">
                <Stars size={13} /> 4.9/5 · 2,847 homes
              </span>
            </div>

            <div
              className="animate-fade-up mb-4 flex items-center gap-3"
              style={{ animationDelay: "70ms" }}
            >
              <span className="h-px w-9 bg-green-400/70" />
              <span className="font-display text-[13px] font-bold uppercase tracking-[0.16em] text-green-300">
                100% Australian-Owned Solar
              </span>
            </div>

            <h1
              className="animate-fade-up m-0 font-display text-[clamp(40px,5.6vw,74px)] font-extrabold leading-[0.96] tracking-[-0.03em] text-white [text-wrap:balance]"
              style={{ animationDelay: "130ms" }}
            >
              Power your home with <span className="text-green-300">the sun.</span>
            </h1>

            <p
              className="animate-fade-up m-0 mt-6 max-w-[500px] font-body text-[clamp(16px,1.25vw,18.5px)] leading-relaxed text-white/85"
              style={{ animationDelay: "200ms" }}
            >
              Premium panels, accredited installation and a 25-year warranty,
              turning Australian power bills into savings since 2016.
            </p>

            <div
              className="animate-fade-up mt-8 flex flex-wrap gap-3"
              style={{ animationDelay: "270ms" }}
            >
              <Button variant="primary" size="lg" icon="arrow" onClick={() => scrollToId("quote")}>
                Get a Free Quote
              </Button>
              <button
                onClick={() => scrollToId("calculator")}
                className="ke-press inline-flex items-center gap-2.5 rounded-pill border border-white/25 bg-white/10 px-7 py-[15px] font-display text-[17px] font-bold text-white hover:bg-white/[0.18]"
              >
                <Icon name="calculator" size={19} /> Calculate Savings
              </button>
            </div>

            {/* New Energy Tech Approved Seller */}
            <div
              className="animate-fade-up mt-6 inline-flex max-w-full items-center rounded-xl bg-white/10 px-3.5 py-2.5 ring-1 ring-inset ring-white/15 sm:px-4"
              style={{ animationDelay: "300ms" }}
            >
              <NETBadge scale={0.95} logoScale={1.35} tone="dark" />
            </div>
          </div>

          <div
            className="animate-fade-up flex w-full max-w-[560px] overflow-hidden rounded-xl bg-forest-900/85 shadow-[0_24px_60px_rgba(0,0,0,0.45)] ring-1 ring-inset ring-white/12"
            style={{ animationDelay: "340ms" }}
          >
            {TRUST.map((t, idx) => (
              <div
                key={t.label}
                className={`flex flex-1 flex-col px-5 py-[18px] sm:px-7 ${idx > 0 ? "border-l border-white/12" : ""}`}
              >
                <span className="font-display text-[clamp(20px,2.2vw,27px)] font-extrabold leading-none text-green-300">
                  {t.value}
                </span>
                <span className="mt-1.5 font-body text-[12px] font-semibold text-white/65">
                  {t.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Desktop hero (≥ lg) ──────────────────────────────────────── */}
      {/*
        Full-viewport-width two-column split:
          Left column  — white bg, content, spans from viewport-left to ~52 % of viewport.
          Right column — image slider, spans from ~52 % to viewport-right edge.
        The section itself is position:relative and full-width.
        The left column is a flex column centred vertically; its content is
        right-padded so it never underlaps the image.
      */}
      <section className="relative hidden min-h-[560px] xl:min-h-[600px] overflow-hidden bg-white lg:flex lg:items-stretch">
        {/* Left: white content panel — 52 % of viewport */}
        <div className="relative z-10 flex w-[52%] shrink-0 flex-col justify-between bg-white py-10 pl-8 lg:pl-12 xl:pl-20 2xl:pl-28 pr-10 xl:pr-16">
          <div>
            {/* Tagline */}
            <div
              className="animate-fade-up mb-2 flex items-center gap-2"
              style={{ animationDelay: "0ms" }}
            >
              <span className="h-px w-9 bg-green-500/70" />
              <span className="font-display text-[13px] font-bold uppercase tracking-[0.16em] text-green-600">
                100% Australian-Owned Solar
              </span>
            </div>

            {/* Headline */}
            <h1
              className="animate-fade-up m-0 font-display text-[clamp(44px,4vw,60px)] font-extrabold leading-[1.04] tracking-[-0.03em] text-navy-700"
              style={{ animationDelay: "70ms" }}
            >
              Power your home <br />
              <span className="text-green-600">with the sun.</span>
            </h1>

            {/* Description */}
            <p
              className="animate-fade-up m-0 mt-4 max-w-[460px] font-body text-[16px] leading-relaxed text-ash-700"
              style={{ animationDelay: "140ms" }}
            >
              Premium panels, CEC-accredited installation and a 25-year warranty,
              turning Australian power bills into savings since 2016.
            </p>

            {/* CTAs */}
            <div
              className="animate-fade-up mt-6 flex flex-wrap items-center gap-5"
              style={{ animationDelay: "210ms" }}
            >
              <Button variant="primary" size="lg" icon="arrow" onClick={() => scrollToId("quote")}>
                Get a Free Quote
              </Button>
              <button
                onClick={() => scrollToId("calculator")}
                className="ke-press inline-flex items-center gap-1.5 font-display text-[15.5px] font-bold text-navy-700 hover:text-green-600 transition-colors"
              >
                Calculate my savings <Icon name="arrow" size={15} stroke={2.4} />
              </button>
            </div>

            {/* New Energy Tech Approved Seller — fills the gap under the CTA row */}
            <div
              className="animate-fade-up mt-8 inline-flex items-center rounded-xl border border-ash-200 bg-paper px-5 py-3.5"
              style={{ animationDelay: "250ms" }}
            >
              <NETBadge scale={1.25} logoScale={2} />
            </div>
          </div>

          {/* Metrics row — anchored to bottom of column */}
          <div
            className="animate-fade-up mt-6 grid grid-cols-3 gap-6 border-t border-ash-200 pt-6"
            style={{ animationDelay: "280ms" }}
          >
            {[
              { label: "Warranty", value: "25yr" },
              { label: "Homes Powered", value: "2,847+" },
              { label: "Client Rating", value: "4.9" },
            ].map((m) => (
              <div key={m.label}>
                <div className="font-display text-[11px] font-bold uppercase tracking-[0.1em] text-ash-500">
                  {m.label}
                </div>
                <div className="mt-1 font-display text-[27px] font-extrabold leading-none text-navy-700">
                  {m.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: full-bleed image slider — 48 % of viewport */}
        <div className="relative flex-1 bg-forest-900">
          {hasDesktop ? (
            <Slider
              images={images.desktop}
              className="absolute inset-0 h-full w-full"
              showNav={false}
            />
          ) : (
            <Image
              src="/assets/hero-solar-rooftop.png"
              alt="Rooftop solar panels on an Australian home at golden hour"
              fill
              priority
              sizes="52vw"
              className="object-cover object-center"
            />
          )}
        </div>
      </section>
    </div>
  );
}
