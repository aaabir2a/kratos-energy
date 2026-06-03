"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import {
  systemsByCategory,
  type SolarSystem,
  type SystemCategory,
} from "@/lib/systems";
import { cn, scrollToId } from "@/lib/utils";

function PriceCard({ s }: { s: SolarSystem }) {
  const enquire = s.price === null;
  return (
    <div
      className={cn(
        "ke-lift relative flex flex-col rounded-lg bg-white p-7",
        s.recommended
          ? "border-2 border-green-500 shadow-lg"
          : "border border-ash-200 shadow-md",
      )}
    >
      {s.recommended && (
        <span className="absolute -top-3 left-7 rounded-pill bg-green-500 px-3.5 py-[5px] font-display text-[11px] font-bold uppercase tracking-[0.06em] text-white">
          Recommended
        </span>
      )}

      {/* Savings ribbon */}
      <div className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-pill bg-green-50 px-3 py-1.5 font-display text-[12.5px] font-bold text-forest-700">
        <Icon name="trend" size={14} className="text-green-600" />
        Save up to ${s.savingsPerYear.toLocaleString()} p.a.
      </div>

      {/* Size + audience */}
      <div className="font-display text-[40px] font-extrabold leading-none text-navy-800">
        {s.size}
      </div>
      <div className="mt-2 font-body text-[14.5px] text-ash-700">
        {s.audience}
      </div>

      {/* Price block */}
      <div className="my-5 border-y border-ash-200 py-5">
        {enquire ? (
          <div className="font-display text-[22px] font-extrabold text-navy-700">
            Custom quote
          </div>
        ) : (
          <div className="flex items-end gap-2.5">
            <div>
              <div className="font-display text-[18px] font-bold leading-none text-green-600">
                ${s.perDay}
                <span className="ml-1 font-body text-[12.5px] font-semibold text-ash-500">
                  /day · {s.termMonths}mo
                </span>
              </div>
              <div className="mt-2 font-display text-[28px] font-extrabold leading-none text-navy-800">
                ${s.price?.toLocaleString()}
              </div>
              <div className="mt-1 font-body text-[12px] text-ash-500">
                outright, after rebate
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Specs */}
      <ul className="mb-6 flex flex-col gap-2.5">
        {s.specs.map((p) => (
          <li
            key={p}
            className="flex items-center gap-2.5 font-body text-[14px] text-ink"
          >
            <Icon
              name="check"
              size={15}
              stroke={3}
              className="flex-none text-green-500"
            />
            {p}
          </li>
        ))}
      </ul>

      {/* Actions */}
      <div className="mt-auto flex flex-col gap-2.5">
        <Button
          variant={s.recommended ? "primary" : "navy"}
          size="md"
          icon="arrow"
          fullWidth
          onClick={() => scrollToId("quote")}
        >
          {enquire ? "Request a Quote" : "Get Discounted Price"}
        </Button>
        <Link
          href={`/systems/${s.slug}`}
          className="text-center font-display text-[13.5px] font-bold text-forest-700 underline-offset-4 hover:underline"
        >
          Learn more about the {s.size} system →
        </Link>
      </div>
    </div>
  );
}

export function SystemPricing() {
  const [cat, setCat] = useState<SystemCategory>("residential");
  const systems = systemsByCategory(cat);

  return (
    <section id="systems" className="bg-white py-[84px]">
      <div className="container-ke">
        <div className="mb-10 text-center">
          <Eyebrow center>Transparent Solar Pricing</Eyebrow>
          <h2 className="mt-3 font-display text-[clamp(30px,3.6vw,46px)] font-extrabold tracking-[-0.02em] text-navy-700">
            Find the right system for your roof.
          </h2>
          <p className="mx-auto mt-3 max-w-[540px] font-body text-lg text-ash-700">
            Upfront pricing or low daily payment plans — every system includes
            Tier 1 panels and CEC-accredited installation.
          </p>
        </div>

        {/* Category toggle */}
        <div className="mb-10 flex justify-center">
          <div className="inline-flex rounded-pill border border-ash-200 bg-paper p-1.5">
            {(["residential", "commercial"] as const).map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={cn(
                  "rounded-pill px-6 py-2.5 font-display text-[14.5px] font-bold capitalize transition-all",
                  cat === c
                    ? "bg-green-500 text-white shadow-green"
                    : "text-ash-500 hover:text-forest-700",
                )}
              >
                {c} solar
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {systems.map((s) => (
            <PriceCard key={s.slug} s={s} />
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-[680px] text-center font-body text-[12.5px] leading-relaxed text-ash-500">
          *Performance and savings figures are estimates based on CEC guidelines
          and vary site to site. Speak to a Kratos Energy consultant for a
          tailored quote.
        </p>
      </div>
    </section>
  );
}
