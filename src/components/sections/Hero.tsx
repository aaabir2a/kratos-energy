"use client";

import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { Stars } from "@/components/ui/Stars";
import { scrollToId } from "@/lib/utils";

const TRUST: { value: string; label: string }[] = [
  { value: "2,847+", label: "Homes powered" },
  { value: "$0", label: "Upfront options" },
  { value: "≈ $2,310", label: "Saved per year" },
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[540px] items-stretch overflow-hidden bg-forest-900 lg:min-h-[600px]"
    >
      {/* Full-bleed photograph — the surface itself. Separate landscape and
          portrait crops; the off-device image is requested at 1px so it isn't
          downloaded twice. */}
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

      {/* Directional scrim: darkens the lower-left where the copy lives,
          opens the upper-right so the photo still reads */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(105deg,#0c3b28_4%,rgba(12,59,40,0.78)_38%,rgba(12,59,40,0.30)_66%,rgba(12,59,40,0.08)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-900 via-forest-900/35 to-transparent" />

      {/* Warm sun-glow — atmospheric, low and soft */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-6%] top-[26%] -z-[5] h-[460px] w-[460px] rounded-full bg-green-400/20 blur-[130px]"
      />

      <div className="container-ke relative z-10 flex w-full flex-col justify-center gap-8 py-10 sm:py-12 lg:gap-10 lg:py-12">
        {/* Copy */}
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
            <Button
              variant="primary"
              size="lg"
              icon="arrow"
              onClick={() => scrollToId("quote")}
            >
              Get a Free Quote
            </Button>
            <button
              onClick={() => scrollToId("calculator")}
              className="ke-press inline-flex items-center gap-2.5 rounded-pill border border-white/25 bg-white/10 px-7 py-[15px] font-display text-[17px] font-bold text-white hover:bg-white/[0.18]"
            >
              <Icon name="calculator" size={19} /> Calculate Savings
            </button>
          </div>
        </div>

        {/* Solid trust bar, grounded at the foot of the photo */}
        <div
          className="animate-fade-up flex w-full max-w-[560px] overflow-hidden rounded-xl bg-forest-900/85 shadow-[0_24px_60px_rgba(0,0,0,0.45)] ring-1 ring-inset ring-white/12"
          style={{ animationDelay: "340ms" }}
        >
          {TRUST.map((t, i) => (
            <div
              key={t.label}
              className={`flex flex-1 flex-col px-5 py-[18px] sm:px-7 ${i > 0 ? "border-l border-white/12" : ""
                }`}
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
  );
}
