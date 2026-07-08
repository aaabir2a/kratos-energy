"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { cn, scrollToId } from "@/lib/utils";

const STATE_FACTOR: Record<string, number> = {
  NSW: 1.0,
  VIC: 0.94,
  WA: 1.02,
};

const SIDE_STATS: [string, string][] = [
  ["$8.2M", "Customer savings"],
  ["3,100+", "Systems installed"],
  ["25 yr", "Asset lifespan"],
];

export function SavingsCalculator() {
  const [bill, setBill] = useState(350);
  const [type, setType] = useState<"Residential" | "Commercial">("Residential");
  const [state, setState] = useState("NSW");

  const offset = type === "Residential" ? 0.78 : 0.62;
  const monthly = Math.round(bill * offset * STATE_FACTOR[state]);
  const yearly = monthly * 12;
  const lifetime = yearly * 25;

  return (
    <section id="calculator" className="bg-forest-900 py-[78px]">
      <div className="container-ke grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
        {/* Copy */}
        <div>
          <h2 className="mb-4 font-display text-[clamp(30px,3.5vw,46px)] font-extrabold leading-[1.08] tracking-[-0.02em] text-white">
            See your savings in 30 seconds.
          </h2>
          <p className="m-0 max-w-[420px] font-body text-[17px] leading-relaxed text-[#a9c4a3]">
            No obligations, no pushy sales calls. Adjust your details and watch
            your estimated solar savings update live, then lock it in with a
            free tailored quote.
          </p>
          <div className="mt-[30px] flex gap-[26px]">
            {SIDE_STATS.map(([value, label]) => (
              <div key={label}>
                <div className="font-display text-[26px] font-extrabold text-gold-400">
                  {value}
                </div>
                <div className="font-body text-[12.5px] font-semibold text-[#a9c4a3]">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Calculator card */}
        <div className="rounded-xl bg-white p-[30px] shadow-lg">
          <div className="mb-[22px] flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-[11px] bg-green-50 text-green-600">
              <Icon name="calculator" size={22} />
            </span>
            <h3 className="m-0 font-display text-[19px] font-bold text-navy-700">
              Solar Savings Calculator
            </h3>
          </div>

          {/* Bill slider */}
          <div className="mb-[18px] flex flex-col gap-[7px]">
            <div className="flex justify-between">
              <span className="font-display text-[13px] font-semibold text-ash-700">
                Monthly electricity bill
              </span>
              <span className="font-display font-extrabold text-forest-700">
                ${bill}
              </span>
            </div>
            <input
              type="range"
              min={100}
              max={900}
              step={10}
              value={bill}
              onChange={(e) => setBill(+e.target.value)}
              className="w-full"
              aria-label="Monthly electricity bill"
            />
          </div>

          {/* Property type */}
          <div className="mb-[18px] flex flex-col gap-[7px]">
            <span className="font-display text-[13px] font-semibold text-ash-700">
              Property type
            </span>
            <div className="flex gap-2.5" role="group" aria-label="Property type">
              {(["Residential", "Commercial"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  aria-pressed={type === t}
                  className={cn(
                    "flex-1 rounded-md border-[1.5px] px-2 py-[11px] text-center font-display text-[13.5px] font-bold transition-all",
                    type === t
                      ? "border-green-500 bg-green-50 text-forest-700"
                      : "border-ash-300 bg-white text-ash-500",
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="mb-[22px] flex flex-col gap-[7px]">
            <span className="font-display text-[13px] font-semibold text-ash-700">
              Location
            </span>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full rounded-md border-[1.5px] border-ash-300 bg-white px-3.5 py-3 font-body text-[15px] text-ink outline-none"
            >
              {Object.keys(STATE_FACTOR).map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Result */}
          <div className="mb-[18px] flex items-center justify-between rounded-lg border border-green-200 bg-green-50 px-5 py-[18px]">
            <div>
              <div className="font-body text-[12.5px] font-bold uppercase tracking-[0.06em] text-forest-700">
                Est. yearly savings
              </div>
              <div className="font-display text-[38px] font-extrabold leading-[1.1] text-green-600">
                ${yearly.toLocaleString()}
              </div>
              <div className="font-body text-[12.5px] text-ash-500">
                ≈ ${monthly}/mo · ${lifetime.toLocaleString()} over 25 yrs
              </div>
            </div>
            <Icon name="trend" size={44} className="text-green-400" />
          </div>

          <Button
            variant="primary"
            size="lg"
            icon="arrow"
            fullWidth
            onClick={() => scrollToId("quote")}
          >
            Get My Tailored Quote
          </Button>
        </div>
      </div>
    </section>
  );
}
