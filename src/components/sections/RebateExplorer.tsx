"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

type Rebate = {
  state: string;
  name: string;
  federalStc: number;
  stateRebate: number;
  batteryRebate: number;
  note: string;
};

// Indicative figures for a typical 6.6kW system — replace with live data.
const REBATES: Rebate[] = [
  { state: "NSW", name: "New South Wales", federalStc: 2230, stateRebate: 640, batteryRebate: 1600, note: "Empowering Homes + federal STCs." },
  { state: "VIC", name: "Victoria", federalStc: 2230, stateRebate: 1400, batteryRebate: 2950, note: "Solar Victoria rebate + interest-free loan." },
  { state: "QLD", name: "Queensland", federalStc: 2230, stateRebate: 0, batteryRebate: 1000, note: "Federal STCs + battery booster." },
  { state: "SA", name: "South Australia", federalStc: 2230, stateRebate: 0, batteryRebate: 2000, note: "Home Battery Scheme + federal STCs." },
  { state: "ACT", name: "ACT", federalStc: 2230, stateRebate: 825, batteryRebate: 3500, note: "Sustainable Household Scheme loan." },
  { state: "WA", name: "Western Australia", federalStc: 2230, stateRebate: 0, batteryRebate: 1300, note: "Federal STCs + DEBS buyback." },
  { state: "TAS", name: "Tasmania", federalStc: 2090, stateRebate: 0, batteryRebate: 0, note: "Federal STCs + interest-free loans." },
  { state: "NT", name: "Northern Territory", federalStc: 1950, stateRebate: 750, batteryRebate: 5000, note: "Home & Business Battery Scheme." },
];

function money(n: number) {
  return "$" + n.toLocaleString();
}

export function RebateExplorer() {
  const [active, setActive] = useState("NSW");
  const r = REBATES.find((x) => x.state === active)!;
  const total = r.federalStc + r.stateRebate;
  const totalWithBattery = total + r.batteryRebate;

  return (
    <div className="grid grid-cols-1 gap-7 lg:grid-cols-[300px_1fr]">
      {/* State picker */}
      <div className="rounded-lg border border-ash-200 bg-white p-4 shadow-md">
        <div className="mb-3 px-1 font-display text-[13px] font-bold uppercase tracking-[0.06em] text-ash-500">
          Select your state
        </div>
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
          {REBATES.map((x) => (
            <button
              key={x.state}
              onClick={() => setActive(x.state)}
              className={cn(
                "flex items-center justify-between rounded-md px-4 py-3 text-left font-display text-[14.5px] font-bold transition-all",
                active === x.state
                  ? "bg-green-500 text-white shadow-green"
                  : "bg-paper text-ash-700 hover:bg-green-50 hover:text-forest-700",
              )}
            >
              {x.state}
              {active === x.state && <Icon name="check" size={16} stroke={3} />}
            </button>
          ))}
        </div>
      </div>

      {/* Result */}
      <div className="rounded-lg border border-ash-200 bg-white p-7 shadow-md sm:p-9">
        <div className="mb-1 font-display text-[13px] font-bold uppercase tracking-[0.06em] text-green-600">
          {r.name}
        </div>
        <h3 className="mb-1 font-display text-[26px] font-extrabold text-navy-700">
          Up to {money(totalWithBattery)} in rebates
        </h3>
        <p className="mb-6 font-body text-[14.5px] text-ash-700">{r.note}</p>

        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
          {[
            ["Federal STCs", r.federalStc, "Applied at point of sale"],
            ["State rebate", r.stateRebate, "On a typical 6.6kW system"],
            ["Battery rebate", r.batteryRebate, "If adding storage"],
          ].map(([label, val, sub]) => (
            <div key={label as string} className="rounded-md border border-ash-200 bg-paper p-5">
              <div className="font-display text-[28px] font-extrabold leading-none text-forest-700">
                {money(val as number)}
              </div>
              <div className="mt-2 font-display text-[13.5px] font-bold text-navy-700">
                {label as string}
              </div>
              <div className="mt-0.5 font-body text-[12px] text-ash-500">
                {sub as string}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-green-200 bg-green-50 px-6 py-5">
          <div>
            <div className="font-body text-[12.5px] font-bold uppercase tracking-[0.06em] text-forest-700">
              Solar-only rebate total
            </div>
            <div className="font-display text-[34px] font-extrabold leading-none text-green-600">
              {money(total)}
            </div>
          </div>
          <a
            href="/get-a-quote"
            className="ke-press inline-flex items-center gap-2.5 rounded-pill bg-green-500 px-7 py-[14px] font-display text-[15px] font-bold text-white shadow-green hover:bg-green-600"
          >
            Claim My Rebate <Icon name="arrow" size={18} stroke={2.4} />
          </a>
        </div>

        <p className="mt-4 font-body text-[12px] leading-relaxed text-ash-500">
          Figures are indicative for a typical 6.6kW system and change with
          system size, STC price and program availability. A consultant will
          confirm your exact entitlements.
        </p>
      </div>
    </div>
  );
}
