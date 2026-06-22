"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import {
  FED_BATTERY_FULL_RATE,
  STATE_SCHEMES,
  VERIFIED,
  calcFederalBatteryRebate,
  federalBatteryBreakdown,
  money,
  stateForPostcode,
} from "@/lib/rebates";

/** Common usable capacities drawn from the Kratos battery range. */
const SIZE_PRESETS = [10, 13.5, 16, 24, 32];

export function BatteryRebateCalculator() {
  const [postcode, setPostcode] = useState("");
  const [kwh, setKwh] = useState(13.5);

  const pc = /^\d{4}$/.test(postcode) ? parseInt(postcode, 10) : null;
  const state = pc !== null ? stateForPostcode(pc) : null;

  const total = useMemo(() => calcFederalBatteryRebate(kwh), [kwh]);
  const tiers = useMemo(() => federalBatteryBreakdown(kwh), [kwh]);
  const perKwh = kwh > 0 ? total / kwh : 0;

  return (
    <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1fr_400px]">
      {/* ---------------------------------------------------------- inputs */}
      <div className="rounded-xl border border-ash-200 bg-white p-6 shadow-md sm:p-8">
        {/* Capacity */}
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <span className="flex items-center gap-2 font-display text-[14px] font-bold text-navy-700">
              <Icon name="battery" size={18} className="text-green-600" /> Usable battery capacity
            </span>
            <span className="font-display text-[16px] font-extrabold text-forest-700">{kwh} kWh</span>
          </div>
          <input
            type="range"
            min={5}
            max={50}
            step={0.5}
            value={kwh}
            onChange={(e) => setKwh(+e.target.value)}
            className="w-full"
            aria-label="Usable battery capacity in kWh"
          />
          <div className="mt-1 flex justify-between font-body text-[11.5px] text-ash-500">
            <span>5 kWh</span>
            <span>50 kWh cap</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {SIZE_PRESETS.map((k) => (
              <button
                key={k}
                onClick={() => setKwh(k)}
                className={cn(
                  "rounded-pill border px-3 py-1 font-display text-[12.5px] font-bold transition-colors",
                  kwh === k
                    ? "border-green-500 bg-green-50 text-forest-700"
                    : "border-ash-300 text-ash-700 hover:border-green-300",
                )}
              >
                {k} kWh
              </button>
            ))}
          </div>
        </div>

        {/* Postcode */}
        <label className="mt-7 block">
          <span className="mb-1.5 flex items-center gap-2 font-display text-[14px] font-bold text-navy-700">
            <Icon name="mapPin" size={17} className="text-green-600" /> Your postcode
            <span className="font-body text-[12px] font-normal text-ash-500">(for state support)</span>
          </span>
          <input
            inputMode="numeric"
            maxLength={4}
            value={postcode}
            onChange={(e) => setPostcode(e.target.value.replace(/\D/g, "").slice(0, 4))}
            placeholder="e.g. 3000"
            className={cn(
              "w-full rounded-md border-[1.5px] bg-white px-4 py-3.5 font-display text-[20px] font-bold tracking-[0.08em] text-navy-800 outline-none transition-colors",
              postcode.length === 4 && !state ? "border-red-400" : "border-ash-300 focus:border-green-500",
            )}
            aria-label="Postcode"
          />
          {postcode.length === 4 && !state && (
            <span className="mt-1.5 block font-body text-[12.5px] font-semibold text-red-500">
              Not a recognised Australian postcode.
            </span>
          )}
        </label>

        {/* Tier explainer */}
        <div className="mt-7 rounded-lg border border-ash-200 bg-paper p-4">
          <div className="font-display text-[13px] font-bold text-navy-700">How the rebate tapers</div>
          <p className="mt-1 font-body text-[12.5px] leading-relaxed text-ash-700">
            The federal Cheaper Home Batteries rebate pays the full rate on your first 14 kWh, then 60% up to
            28 kWh and 15% up to the 50 kWh cap. Bigger batteries still earn — just at a lower top-up rate.
          </p>
        </div>
      </div>

      {/* --------------------------------------------------------- results */}
      <div className="lg:sticky lg:top-[96px] lg:self-start">
        <div className="overflow-hidden rounded-xl border border-ash-200 bg-white shadow-lg">
          <div className="bg-forest-900 px-7 py-5">
            <div className="font-display text-[12.5px] font-bold uppercase tracking-[0.06em] text-green-300">
              Federal battery rebate
            </div>
            <div className="mt-1 font-display text-[44px] font-extrabold leading-none text-white">
              {money(total)}
            </div>
            <div className="mt-1.5 font-body text-[12.5px] text-[#a9c4a3]">
              ≈ {money(perKwh)}/kWh effective · on {kwh} kWh usable
            </div>
          </div>

          <div className="p-7">
            {/* Tier breakdown */}
            <div className="flex flex-col gap-2.5">
              {tiers.map((t) => (
                <div key={t.label} className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-display text-[13.5px] font-bold text-navy-700">{t.label}</div>
                    <div className="mt-0.5 font-body text-[12px] text-ash-500">
                      {t.kwh} kWh × {money(t.rate)}/kWh
                    </div>
                  </div>
                  <div className="flex-none font-display text-[15px] font-extrabold text-green-600">
                    {money(t.amount)}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-ash-200 pt-4">
              <span className="font-display text-[14px] font-bold text-navy-700">Full rate</span>
              <span className="font-display text-[14px] font-bold text-ash-700">
                {money(FED_BATTERY_FULL_RATE)}/kWh
              </span>
            </div>

            {/* State scheme */}
            {state && (
              <div className="mt-5 rounded-lg bg-paper p-4">
                <div className="flex items-center gap-2 font-display text-[13px] font-bold text-navy-700">
                  <Icon name="shield" size={16} className="text-forest-700" />
                  {STATE_SCHEMES[state].name} support
                </div>
                <p className="mt-1.5 font-body text-[12.5px] leading-relaxed text-ash-700">
                  {STATE_SCHEMES[state].battery}
                </p>
                <a
                  href={STATE_SCHEMES[state].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 font-display text-[12.5px] font-bold text-green-600 hover:text-green-700"
                >
                  View official scheme <Icon name="arrow" size={13} stroke={2.4} />
                </a>
              </div>
            )}

            <a
              href="/get-a-quote"
              className="ke-press mt-5 inline-flex w-full items-center justify-center gap-2.5 rounded-pill bg-green-500 px-6 py-[14px] font-display text-[15.5px] font-bold text-white shadow-green hover:bg-green-600"
            >
              Get a Battery Quote <Icon name="arrow" size={18} stroke={2.4} />
            </a>

            <p className="mt-4 border-t border-ash-200 pt-3.5 text-center font-body text-[11px] leading-relaxed text-ash-500">
              Estimate only — not a quote. Federal rate verified {VERIFIED}. Source: DCCEEW, Cheaper Home
              Batteries Program. State support varies; final value confirmed at installation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
