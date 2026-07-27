"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import { STATE_SCHEMES, calcStc, CER_STC_URL, VERIFIED, type StateCode } from "@/lib/rebates";

/** "2026-07-23" -> "23 July 2026" */
function verifiedDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });
}

/** System size the figures below are quoted for. */
const SAMPLE_KW = 6.6;
/** Representative capital-city postcode per state, used to compute the STC
 *  zone. The federal STC figure is derived live from the rebate engine so it
 *  can never drift from the real deeming-based amount. */
const REP_POSTCODE: Record<string, number> = { NSW: 2000, VIC: 3000, ACT: 2600 };

type Rebate = {
  state: string;
  name: string;
  /** State solar-panel rebate (0 where the state has none). */
  stateRebate: number;
  /** State battery incentive on a typical 10kWh battery (0 where none). */
  batteryRebate: number;
  note: string;
};

// Verified against government sources 2026-07-23 (see per-state source links).
// State battery/solar figures are indicative for a typical system; the federal
// STC below is computed live, not hard-coded.
const REBATES: Rebate[] = [
  { state: "NSW", name: "New South Wales", stateRebate: 0, batteryRebate: 1600, note: "PDRS battery incentive + federal STCs." },
  { state: "VIC", name: "Victoria", stateRebate: 1400, batteryRebate: 0, note: "Solar Victoria solar rebate; batteries via the federal program." },
  { state: "ACT", name: "Australian Capital Territory", stateRebate: 0, batteryRebate: 0, note: "Sustainable Household Scheme (zero-interest loans) + federal STCs." },
];

function money(n: number) {
  return "$" + n.toLocaleString();
}

export function RebateExplorer() {
  const [active, setActive] = useState("NSW");
  const r = REBATES.find((x) => x.state === active)!;
  const scheme = STATE_SCHEMES[active as StateCode];
  // Live federal STC for the sample system in this state (deeming-based).
  const federalStc =
    calcStc(SAMPLE_KW, REP_POSTCODE[r.state], new Date().getFullYear())?.rebate ?? 0;
  const total = federalStc + r.stateRebate;
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
            ["Federal STCs", federalStc, "Applied at point of sale"],
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

        {/* Verify with the official government sources */}
        <div className="mt-4 rounded-lg border border-ash-200 bg-paper p-4">
          <div className="flex items-center gap-2 font-display text-[13px] font-bold text-navy-700">
            <Icon name="shield" size={16} stroke={2.2} className="flex-none text-forest-700" />
            Verify these figures with the official sources
          </div>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-5">
            <a
              href={CER_STC_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 font-display text-[13px] font-bold text-green-600 hover:text-green-700"
            >
              <Icon name="zap" size={14} stroke={2.2} className="flex-none" />
              Federal STCs — Clean Energy Regulator
              <Icon name="arrow" size={13} stroke={2.4} className="-rotate-45 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href={scheme.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 font-display text-[13px] font-bold text-green-600 hover:text-green-700"
            >
              <Icon name="mapPin" size={14} stroke={2.2} className="flex-none" />
              {r.state} — {scheme.short}
              <Icon name="arrow" size={13} stroke={2.4} className="-rotate-45 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
          <p className="mt-2.5 font-body text-[11.5px] text-ash-500">
            Last checked against government sources on {verifiedDate(VERIFIED)}. Programs
            change often — always confirm current eligibility on the official site.
          </p>
        </div>
      </div>
    </div>
  );
}
