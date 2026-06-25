"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import {
  ENERGY_BY_STATE,
  ENERGY_VERIFIED,
  EV_KWH_PER_100KM,
  money,
  stateForPostcode,
} from "@/lib/energy";

export function EvChargingCalculator() {
  const [postcode, setPostcode] = useState("");
  const [kmPerWeek, setKmPerWeek] = useState(250);
  const [importOverride, setImportOverride] = useState<number | null>(null);
  const [solarOverride, setSolarOverride] = useState<number | null>(null);

  const pc = /^\d{4}$/.test(postcode) ? parseInt(postcode, 10) : null;
  const state = pc !== null ? stateForPostcode(pc) : null;

  // Rates: state defaults unless the user has typed their own.
  const importTariff = importOverride ?? (state ? ENERGY_BY_STATE[state].importTariff : 32);
  const solarRate = solarOverride ?? (state ? ENERGY_BY_STATE[state].feedInTariff : 5);
  const setImportTariff = (v: number) => setImportOverride(Math.max(0, v));
  const setSolarRate = (v: number) => setSolarOverride(Math.max(0, v));

  const res = useMemo(() => {
    const annualKm = kmPerWeek * 52;
    const annualKwh = (annualKm * EV_KWH_PER_100KM) / 100;
    const gridCost = (annualKwh * importTariff) / 100;
    const solarCost = (annualKwh * solarRate) / 100;
    return {
      annualKwh: Math.round(annualKwh),
      gridCost,
      solarCost,
      saving: gridCost - solarCost,
      gridPer100: (EV_KWH_PER_100KM * importTariff) / 100,
      solarPer100: (EV_KWH_PER_100KM * solarRate) / 100,
    };
  }, [kmPerWeek, importTariff, solarRate]);

  return (
    <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1fr_400px]">
      <div className="rounded-xl border border-ash-200 bg-white p-6 shadow-md sm:p-8">
        <label className="block">
          <span className="mb-1.5 flex items-center gap-2 font-display text-[14px] font-bold text-navy-700">
            <Icon name="mapPin" size={17} className="text-green-600" /> Your postcode
            <span className="font-body text-[12px] font-normal text-ash-500">(sets default rates)</span>
          </span>
          <input
            inputMode="numeric"
            maxLength={4}
            value={postcode}
            onChange={(e) => setPostcode(e.target.value.replace(/\D/g, "").slice(0, 4))}
            placeholder="e.g. 6000"
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

        {/* Distance */}
        <div className="mt-7">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="flex items-center gap-2 font-display text-[14px] font-bold text-navy-700">
              <Icon name="trend" size={17} className="text-green-600" /> Driving distance
            </span>
            <span className="font-display text-[16px] font-extrabold text-forest-700">{kmPerWeek} km/wk</span>
          </div>
          <input
            type="range"
            min={50}
            max={1000}
            step={10}
            value={kmPerWeek}
            onChange={(e) => setKmPerWeek(+e.target.value)}
            className="w-full"
            aria-label="Kilometres driven per week"
          />
          <div className="mt-1 flex justify-between font-body text-[11.5px] text-ash-500">
            <span>{(kmPerWeek * 52).toLocaleString()} km/yr</span>
            <span>≈ {res.annualKwh.toLocaleString()} kWh/yr</span>
          </div>
        </div>

        {/* Rates */}
        <div className="mt-7 grid grid-cols-2 gap-4">
          <label className="block">
            <span className="mb-1.5 block font-display text-[13px] font-bold text-navy-700">
              Grid rate (c/kWh)
            </span>
            <input
              type="number"
              min={0}
              step={0.1}
              value={importTariff}
              onChange={(e) => setImportTariff(Math.max(0, +e.target.value))}
              className="w-full rounded-md border-[1.5px] border-ash-300 bg-white px-3.5 py-2.5 font-display text-[15px] font-bold text-navy-800 outline-none focus:border-green-500"
              aria-label="Grid import rate in cents per kWh"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block font-display text-[13px] font-bold text-navy-700">
              Solar rate (c/kWh)
            </span>
            <input
              type="number"
              min={0}
              step={0.1}
              value={solarRate}
              onChange={(e) => setSolarRate(Math.max(0, +e.target.value))}
              className="w-full rounded-md border-[1.5px] border-ash-300 bg-white px-3.5 py-2.5 font-display text-[15px] font-bold text-navy-800 outline-none focus:border-green-500"
              aria-label="Solar charging rate in cents per kWh"
            />
          </label>
        </div>
        <p className="mt-2 font-body text-[12px] text-ash-500">
          Charging from your own solar costs only what you&apos;d have earned exporting it (the feed-in
          rate) — far less than buying from the grid.
        </p>
      </div>

      <div className="lg:sticky lg:top-[96px] lg:self-start">
        <div className="overflow-hidden rounded-xl border border-ash-200 bg-white shadow-lg">
          <div className="bg-forest-900 px-7 py-5">
            <div className="font-display text-[12.5px] font-bold uppercase tracking-[0.06em] text-green-300">
              Yearly saving charging on solar
            </div>
            <div className="mt-1 font-display text-[44px] font-extrabold leading-none text-white">
              {money(res.saving)}
            </div>
            <div className="mt-1.5 font-body text-[12.5px] text-[#a9c4a3]">
              vs charging the same {res.annualKwh.toLocaleString()} kWh from the grid
            </div>
          </div>

          <div className="p-7">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-md bg-paper p-4">
                <div className="font-display text-[22px] font-extrabold leading-none text-navy-800">
                  {money(res.gridCost)}
                </div>
                <div className="mt-1 font-body text-[12px] text-ash-500">Grid charging / yr</div>
                <div className="mt-0.5 font-body text-[11px] text-ash-500">
                  {money(res.gridPer100)} / 100 km
                </div>
              </div>
              <div className="rounded-md bg-green-50 p-4">
                <div className="font-display text-[22px] font-extrabold leading-none text-forest-700">
                  {money(res.solarCost)}
                </div>
                <div className="mt-1 font-body text-[12px] text-ash-500">Solar charging / yr</div>
                <div className="mt-0.5 font-body text-[11px] text-ash-500">
                  {money(res.solarPer100)} / 100 km
                </div>
              </div>
            </div>

            <a
              href="/ev-charging"
              className="ke-press mt-5 inline-flex w-full items-center justify-center gap-2.5 rounded-pill bg-green-500 px-6 py-[14px] font-display text-[15.5px] font-bold text-white shadow-green hover:bg-green-600"
            >
              Explore EV Charging <Icon name="arrow" size={18} stroke={2.4} />
            </a>

            <p className="mt-4 border-t border-ash-200 pt-3.5 text-center font-body text-[11px] leading-relaxed text-ash-500">
              Estimate only. Assumes {EV_KWH_PER_100KM} kWh / 100 km. Default rates verified{" "}
              {ENERGY_VERIFIED}; enter your own for accuracy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
