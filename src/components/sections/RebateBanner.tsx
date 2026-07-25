"use client";

import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { cn, scrollToId } from "@/lib/utils";
import { CER_STC_URL } from "@/lib/rebates";

// Federal STC ("solar rebate") step-down for a typical 10kW system as the
// deeming period shrinks toward the 2030 SRES scheme end. This is the national
// federal scheme, not a state-specific rebate. Figures from the rebate engine —
// see src/lib/rebates.
const COLS: [string, string, boolean][] = [
  ["$2,620", "Federal STC · 2026", true],
  ["$2,090", "Federal STC · 2027 (est.)", false],
  ["$1,560", "Federal STC · 2028 (est.)", false],
];

export function RebateBanner() {
  return (
    <section id="rebate" className="bg-navy-900 py-16">
      <div className="container-ke grid grid-cols-1 items-center gap-11 lg:grid-cols-2">
        <div>
          <div className="mb-[18px] inline-flex items-center gap-2 rounded-pill border border-gold-400/40 bg-gold-400/15 px-3.5 py-1.5">
            <Icon name="clock" size={15} className="text-gold-400" />
            <span className="font-display text-[12.5px] font-bold tracking-[0.04em] text-gold-400">
              LIMITED TIME
            </span>
          </div>
          <h2 className="mb-3 font-display text-[clamp(28px,3.2vw,40px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-white">
            The federal solar rebate is ending soon.
          </h2>
          <p className="mb-6 max-w-[440px] font-body text-[17px] leading-relaxed text-[#c4d2ef]">
            The federal STC rebate steps down every year until the scheme ends in
            2030. Lock in maximum savings before the next step-down.
          </p>
          <Button
            variant="gold"
            size="lg"
            icon="arrow"
            onClick={() => scrollToId("quote")}
          >
            Secure My Rebate Now
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-3.5">
          {COLS.map(([value, label, hot]) => (
            <div
              key={label}
              className={cn(
                "rounded-lg px-3.5 py-6 text-center",
                hot
                  ? "bg-gold-400"
                  : "border border-white/15 bg-white/[0.06]",
              )}
            >
              <div
                className={cn(
                  "font-display text-[30px] font-extrabold leading-none",
                  hot ? "text-navy-900" : "text-white",
                )}
              >
                {value}
              </div>
              <div
                className={cn(
                  "mt-2 font-body text-[12.5px] font-semibold",
                  hot ? "text-forest-900" : "text-[#9fb2d8]",
                )}
              >
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Let visitors verify the federal figures at the source. */}
        <a
          href={CER_STC_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 font-body text-[12.5px] font-semibold text-[#c4d2ef] underline-offset-2 hover:text-white hover:underline"
        >
          <Icon name="shield" size={14} stroke={2.2} className="text-gold-400" />
          Source: Clean Energy Regulator (federal STC scheme)
          <Icon name="arrow" size={12} stroke={2.4} className="-rotate-45" />
        </a>
      </div>
    </section>
  );
}
