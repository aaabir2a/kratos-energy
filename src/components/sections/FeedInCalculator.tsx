"use client";

import { useEffect, useMemo, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import {
  ENERGY_BY_STATE,
  ENERGY_VERIFIED,
  annualGeneration,
  money,
  stateForPostcode,
} from "@/lib/energy";

export function FeedInCalculator() {
  const [postcode, setPostcode] = useState("");
  const [systemKw, setSystemKw] = useState(6.6);
  const [exportShare, setExportShare] = useState(50); // % of generation exported
  const [fit, setFit] = useState(5); // c/kWh, editable

  const pc = /^\d{4}$/.test(postcode) ? parseInt(postcode, 10) : null;
  const state = pc !== null ? stateForPostcode(pc) : null;

  // Seed the feed-in rate from the state default when postcode resolves.
  useEffect(() => {
    if (state) setFit(ENERGY_BY_STATE[state].feedInTariff);
  }, [state]);

  const res = useMemo(() => {
    if (!state) return null;
    const annualGen = annualGeneration(systemKw, state);
    const exportedKwh = Math.round((annualGen * exportShare) / 100);
    const annualEarnings = (exportedKwh * fit) / 100;
    return {
      exportedKwh,
      annualEarnings,
      monthly: annualEarnings / 12,
      city: ENERGY_BY_STATE[state].city,
    };
  }, [state, systemKw, exportShare, fit]);

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
            placeholder="e.g. 2000"
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

        {/* System size */}
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
        </div>

        {/* Export share */}
        <div className="mt-7">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="flex items-center gap-2 font-display text-[14px] font-bold text-navy-700">
              <Icon name="trend" size={17} className="text-green-600" /> Exported to grid
            </span>
            <span className="font-display text-[16px] font-extrabold text-forest-700">{exportShare}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={exportShare}
            onChange={(e) => setExportShare(+e.target.value)}
            className="w-full"
            aria-label="Percentage of generation exported"
          />
          <p className="mt-1.5 font-body text-[12px] text-ash-500">
            The rest is self-consumed. Without a battery, homes typically export 50–70%; with a battery,
            much less.
          </p>
        </div>

        {/* Editable FiT */}
        <div className="mt-7">
          <span className="mb-1.5 flex items-center gap-2 font-display text-[14px] font-bold text-navy-700">
            <Icon name="zap" size={17} className="text-green-600" /> Feed-in tariff (c/kWh)
          </span>
          <input
            type="number"
            min={0}
            max={30}
            step={0.1}
            value={fit}
            onChange={(e) => setFit(Math.max(0, +e.target.value))}
            className="w-full rounded-md border-[1.5px] border-ash-300 bg-white px-4 py-3 font-display text-[16px] font-bold text-navy-800 outline-none focus:border-green-500"
            aria-label="Feed-in tariff in cents per kWh"
          />
          <p className="mt-1.5 font-body text-[12px] text-ash-500">
            Pre-filled with a typical rate for your state — enter your retailer&apos;s exact rate for a
            precise figure.
          </p>
        </div>
      </div>

      <div className="lg:sticky lg:top-[96px] lg:self-start">
        <div className="overflow-hidden rounded-xl border border-ash-200 bg-white shadow-lg">
          <div className="bg-forest-900 px-7 py-5">
            <div className="font-display text-[12.5px] font-bold uppercase tracking-[0.06em] text-green-300">
              Estimated export earnings
            </div>
            <div className="mt-1 font-display text-[44px] font-extrabold leading-none text-white">
              {res ? money(res.annualEarnings) : "$0"}
              <span className="ml-1.5 text-[16px] font-bold text-[#a9c4a3]">/ yr</span>
            </div>
            <div className="mt-1.5 font-body text-[12.5px] text-[#a9c4a3]">
              {res ? `≈ ${money(res.monthly)} per month` : "Enter your postcode"}
            </div>
          </div>

          <div className="p-7">
            {res ? (
              <>
                <div className="flex items-center justify-between">
                  <span className="font-display text-[13.5px] font-bold text-navy-700">Exported to grid</span>
                  <span className="font-display text-[15px] font-extrabold text-green-600">
                    {res.exportedKwh.toLocaleString()} kWh / yr
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-ash-200 pt-3">
                  <span className="font-display text-[13.5px] font-bold text-navy-700">Feed-in rate</span>
                  <span className="font-display text-[15px] font-extrabold text-ash-700">{fit} c/kWh</span>
                </div>

                <div className="mt-5 rounded-lg bg-paper p-4">
                  <p className="font-body text-[12.5px] leading-relaxed text-ash-700">
                    Feed-in rates are low in 2026 — self-consuming your solar (running appliances by day, or
                    adding a battery) is usually worth far more than exporting it.
                  </p>
                </div>
              </>
            ) : (
              <div className="py-6 text-center">
                <Icon name="zap" size={32} className="mx-auto mb-2 text-ash-300" />
                <p className="font-body text-[13.5px] text-ash-500">
                  Enter a postcode to estimate your feed-in earnings.
                </p>
              </div>
            )}

            <a
              href="/get-a-quote"
              className="ke-press mt-5 inline-flex w-full items-center justify-center gap-2.5 rounded-pill bg-green-500 px-6 py-[14px] font-display text-[15.5px] font-bold text-white shadow-green hover:bg-green-600"
            >
              Maximise My Solar Value <Icon name="arrow" size={18} stroke={2.4} />
            </a>

            <p className="mt-4 border-t border-ash-200 pt-3.5 text-center font-body text-[11px] leading-relaxed text-ash-500">
              Estimate only. Default rates verified {ENERGY_VERIFIED} from state benchmarks; retailer offers
              vary. Enter your own rate for accuracy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
