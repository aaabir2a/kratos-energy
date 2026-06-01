"use client";

import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { Stars } from "@/components/ui/Stars";
import { scrollToId } from "@/lib/utils";

function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col">
      <span className="font-display text-[26px] font-extrabold leading-none text-navy-700">
        {value}
      </span>
      <span className="mt-[5px] font-body text-[12.5px] font-semibold text-ash-500">
        {label}
      </span>
    </div>
  );
}

function FloatCard({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`absolute rounded-md border border-white/70 bg-white/95 shadow-lg backdrop-blur-md ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-x-clip bg-white lg:h-[calc(100vh-116px)] lg:min-h-[560px]"
    >
      <div className="container-ke grid grid-cols-1 items-center gap-14 py-12 lg:h-full lg:grid-cols-[1.02fr_1.1fr] lg:py-0">
        {/* LEFT — copy */}
        <div className="animate-fade-up py-2">
          <div className="mb-[22px] inline-flex items-center gap-2.5 rounded-pill border border-green-200 bg-green-50 py-1.5 pl-[7px] pr-3.5">
            <span className="rounded-pill bg-green-500 px-2.5 py-[3px] font-display text-[11px] font-bold tracking-[0.04em] text-white">
              CEC APPROVED
            </span>
            <span className="inline-flex items-center gap-[7px] font-body text-[13px] font-bold text-forest-800">
              <Stars size={13} /> 4.9/5 · 2,847 homes
            </span>
          </div>

          <div className="mb-3.5 font-display text-[13.5px] font-bold uppercase tracking-[0.14em] text-green-600">
            100% Australian-Owned Solar
          </div>

          <h1 className="m-0 font-display text-[clamp(40px,4.6vw,66px)] font-extrabold leading-none tracking-[-0.025em] text-navy-800 [text-wrap:balance]">
            Power your home
            <br />
            with <span className="text-green-600">the sun.</span>
          </h1>

          <p className="m-0 mb-7 mt-5 max-w-[480px] font-body text-[clamp(16px,1.25vw,18.5px)] leading-relaxed text-ash-700">
            Premium panels, accredited installation and a 25-year warranty —
            turning Australian power bills into savings since 2016.
          </p>

          <div className="mb-[30px] flex flex-wrap gap-3">
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
              className="ke-press inline-flex items-center gap-2.5 rounded-pill border-[1.5px] border-green-300 bg-white px-7 py-[15px] font-display text-[17px] font-bold text-forest-700 hover:bg-green-50"
            >
              <Icon name="calculator" size={19} /> Calculate Savings
            </button>
          </div>

          <div className="flex items-center gap-7 border-t border-ash-200 pt-6">
            <StatPill value="2,847+" label="Homes powered" />
            <div className="h-9 w-px bg-ash-200" />
            <StatPill value="25 yr" label="Panel warranty" />
            <div className="h-9 w-px bg-ash-200" />
            <StatPill value="$0" label="Upfront options" />
          </div>
        </div>

        {/* RIGHT — image + floating proof cards */}
        <div className="relative h-[360px] self-center lg:h-[min(78%,560px)]">
          <div className="absolute inset-0 overflow-hidden rounded-xl shadow-lg">
            <Image
              src="/assets/photo-family-house.jpg"
              alt="Australian family at home with rooftop solar"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover [object-position:46%_42%]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-forest-900/5 to-forest-900/30" />
          </div>

          {/* Savings — top left */}
          <FloatCard className="left-2 top-5 flex items-center gap-3 px-[18px] py-[15px] lg:-left-6">
            <span className="flex h-11 w-11 flex-none items-center justify-center rounded-[12px] bg-green-50 text-green-600">
              <Icon name="trend" size={24} />
            </span>
            <div>
              <div className="font-display text-[22px] font-extrabold leading-none text-green-600">
                ≈ $2,310/yr
              </div>
              <div className="mt-1 font-body text-xs font-semibold text-ash-500">
                Average bill savings
              </div>
            </div>
          </FloatCard>

          {/* Warranty — top right */}
          <FloatCard className="right-2 top-5 flex items-center gap-2.5 px-[15px] py-[11px] lg:-right-4">
            <Icon name="shield" size={22} className="text-gold-500" />
            <div className="font-display text-[13.5px] font-extrabold leading-[1.15] text-navy-700">
              25-Year
              <br />
              Warranty
            </div>
          </FloatCard>

          {/* Offer — bottom */}
          <FloatCard className="-bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-[18px] whitespace-nowrap px-5 py-4">
            <div>
              <div className="mb-[3px] font-body text-[11.5px] font-bold uppercase tracking-[0.06em] text-green-600">
                Most popular
              </div>
              <div className="font-display text-[17px] font-extrabold text-navy-700">
                10.12 kW System
              </div>
            </div>
            <div className="h-[38px] w-px bg-ash-200" />
            <div>
              <div className="font-display text-[26px] font-extrabold leading-none text-green-600">
                $5,490
              </div>
              <div className="mt-[3px] font-body text-[11px] font-semibold text-ash-500">
                +GST · after rebate
              </div>
            </div>
          </FloatCard>
        </div>
      </div>
    </section>
  );
}
