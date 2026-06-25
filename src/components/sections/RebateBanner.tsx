"use client";

import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { cn, scrollToId } from "@/lib/utils";

// STC step-down for a typical 10kW NSW system (Zone 3) as deeming falls to
// the 2030 scheme end. Figures from the rebate engine — see src/lib/rebates.
const COLS: [string, string, boolean][] = [
  ["$2,620", "Current Rebate (2026)", true],
  ["$2,090", "2027 Rebate (est.)", false],
  ["$1,560", "2028 Rebate (est.)", false],
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
            NSW solar rebates are ending soon.
          </h2>
          <p className="mb-6 max-w-[440px] font-body text-[17px] leading-relaxed text-[#c4d2ef]">
            Government rebates reduce every year. Lock in maximum savings before
            the next step-down.
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
      </div>
    </section>
  );
}
