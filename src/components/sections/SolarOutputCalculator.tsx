"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import {
  ENERGY_BY_STATE,
  ENERGY_VERIFIED,
  annualCo2Saved,
  annualGeneration,
  stateForPostcode,
  treesEquivalent,
} from "@/lib/energy";

const PRESETS = [6.6, 10, 13.2, 20];

export function SolarOutputCalculator() {
  const [postcode, setPostcode] = useState("");
  const [systemKw, setSystemKw] = useState(6.6);

  const pc = /^\d{4}$/.test(postcode) ? parseInt(postcode, 10) : null;
  const state = pc !== null ? stateForPostcode(pc) : null;

  const out = useMemo(() => {
    if (!state) return null;
    const annual = annualGeneration(systemKw, state);
    const co2 = annualCo2Saved(annual);
    return {
      annual,
      daily: Math.round((annual / 365) * 10) / 10,
      monthly: Math.round(annual / 12),
      co2,
      trees: treesEquivalent(co2),
      city: ENERGY_BY_STATE[state].city,
      perKwDay: ENERGY_BY_STATE[state].genPerKwDay,
    };
  }, [state, systemKw]);

  return (
    <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1fr_400px]">
      <div className="rounded-xl border border-ash-200 bg-white p-6 shadow-md sm:p-8">
        <label className="block">
          <span className="mb-1.5 flex items-center gap-2 font-display text-[14px] font-bold text-navy-700">
            <Icon name="mapPin" size={17} className="text-green-600" /> Your postcode
          </span>
          <input
            inputMode="numeric"
            maxLength={4}
            value={postcode}
            onChange={(e) => setPostcode(e.target.value.replace(/\D/g, "").slice(0, 4))}
            placeholder="e.g. 4000"
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
          {out && (
            <span className="mt-1.5 block font-body text-[12.5px] text-ash-700">
              {out.city} region · ≈ {out.perKwDay} kWh per kW each day
            </span>
          )}
        </label>

        <div className="mt-7">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="flex items-center gap-2 font-display text-[14px] font-bold text-navy-700">
              <Icon name="sun" size={17} className="text-green-600" /> Solar system size
            </span>
            <span className="font-display text-[16px] font-extrabold text-forest-700">{systemKw} kW</span>
          </div>
          <input
            type="range"
            min={1.5}
            max={30}
            step={0.1}
            value={systemKw}
            onChange={(e) => setSystemKw(+e.target.value)}
            className="w-full"
            aria-label="Solar system size in kilowatts"
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {PRESETS.map((kw) => (
              <button
                key={kw}
                onClick={() => setSystemKw(kw)}
                className={cn(
                  "rounded-pill border px-3 py-1 font-display text-[12.5px] font-bold transition-colors",
                  systemKw === kw
                    ? "border-green-500 bg-green-50 text-forest-700"
                    : "border-ash-300 text-ash-700 hover:border-green-300",
                )}
              >
                {kw} kW
              </button>
            ))}
          </div>
        </div>

        <div className="mt-7 rounded-lg border border-ash-200 bg-paper p-4">
          <p className="font-body text-[12.5px] leading-relaxed text-ash-700">
            Output is the annual average — summer days run well above this, winter days below. Real figures
            depend on roof orientation, shading and panel quality.
          </p>
        </div>
      </div>

      <div className="lg:sticky lg:top-[96px] lg:self-start">
        <div className="overflow-hidden rounded-xl border border-ash-200 bg-white shadow-lg">
          <div className="bg-forest-900 px-7 py-5">
            <div className="font-display text-[12.5px] font-bold uppercase tracking-[0.06em] text-green-300">
              Estimated annual output
            </div>
            <div className="mt-1 font-display text-[44px] font-extrabold leading-none text-white">
              {out ? out.annual.toLocaleString() : "0"}
              <span className="ml-1.5 text-[18px] font-bold text-[#a9c4a3]">kWh</span>
            </div>
            <div className="mt-1.5 font-body text-[12.5px] text-[#a9c4a3]">
              {out ? `≈ ${out.daily} kWh per day · ${out.monthly.toLocaleString()} kWh per month` : "Enter your postcode"}
            </div>
          </div>

          <div className="p-7">
            {out ? (
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-md bg-green-50 p-4">
                  <div className="font-display text-[22px] font-extrabold leading-none text-forest-700">
                    {out.co2.toLocaleString()}
                  </div>
                  <div className="mt-1 font-body text-[12px] text-ash-500">kg CO₂ avoided / year</div>
                </div>
                <div className="rounded-md bg-paper p-4">
                  <div className="font-display text-[22px] font-extrabold leading-none text-navy-800">
                    {out.trees.toLocaleString()}
                  </div>
                  <div className="mt-1 font-body text-[12px] text-ash-500">trees planted equivalent</div>
                </div>
              </div>
            ) : (
              <div className="py-6 text-center">
                <Icon name="sun" size={32} className="mx-auto mb-2 text-ash-300" />
                <p className="font-body text-[13.5px] text-ash-500">
                  Enter a postcode to estimate your generation and CO₂ savings.
                </p>
              </div>
            )}

            <a
              href="/get-a-quote"
              className="ke-press mt-5 inline-flex w-full items-center justify-center gap-2.5 rounded-pill bg-green-500 px-6 py-[14px] font-display text-[15.5px] font-bold text-white shadow-green hover:bg-green-600"
            >
              Get a Tailored Quote <Icon name="arrow" size={18} stroke={2.4} />
            </a>

            <p className="mt-4 border-t border-ash-200 pt-3.5 text-center font-body text-[11px] leading-relaxed text-ash-500">
              Indicative estimate. Generation averages verified {ENERGY_VERIFIED} (Clean Energy Council /
              PVWatts city data). Your output varies with orientation, shading and weather.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
