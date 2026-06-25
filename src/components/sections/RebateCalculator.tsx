"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import {
  STATE_SCHEMES,
  STC_PRICE,
  STC_SCHEME_END_YEAR,
  VERIFIED,
  ZONE_RATING,
  calcRebates,
  money,
  stateForPostcode,
  zoneForPostcode,
} from "@/lib/rebates";

const SOLAR_PRESETS = [6.6, 10, 13.2, 20];
const CURRENT_YEAR = 2026;

export function RebateCalculator() {
  const [postcode, setPostcode] = useState("");
  const [systemKw, setSystemKw] = useState(6.6);
  const [hasBattery, setHasBattery] = useState(false);
  const [batteryKwh, setBatteryKwh] = useState(13.5);
  const [installYear, setInstallYear] = useState(CURRENT_YEAR);

  const pc = /^\d{4}$/.test(postcode) ? parseInt(postcode, 10) : null;
  const zone = pc !== null ? zoneForPostcode(pc) : null;
  const state = pc !== null ? stateForPostcode(pc) : null;
  const valid = pc !== null && zone !== null && state !== null;

  const result = useMemo(() => {
    if (!valid) return null;
    return calcRebates({
      systemKw,
      postcode: pc!,
      batteryUsableKwh: hasBattery ? batteryKwh : 0,
      installYear,
    });
  }, [valid, pc, systemKw, hasBattery, batteryKwh, installYear]);

  return (
    <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1fr_400px]">
      {/* ---------------------------------------------------------- inputs */}
      <div className="rounded-xl border border-ash-200 bg-white p-6 shadow-md sm:p-8">
        {/* Postcode */}
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
              postcode.length === 4 && !valid
                ? "border-red-400"
                : "border-ash-300 focus:border-green-500",
            )}
            aria-label="Postcode"
          />
          {postcode.length === 4 && !valid && (
            <span className="mt-1.5 block font-body text-[12.5px] font-semibold text-red-500">
              Not a recognised Australian postcode.
            </span>
          )}
          {valid && (
            <span className="mt-1.5 block font-body text-[12.5px] text-ash-700">
              {STATE_SCHEMES[state].name} · STC{" "}
              <strong className="text-forest-700">Zone {zone}</strong> (rating{" "}
              {ZONE_RATING[zone]})
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
            max={20}
            step={0.1}
            value={systemKw}
            onChange={(e) => setSystemKw(+e.target.value)}
            className="w-full"
            aria-label="Solar system size in kilowatts"
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {SOLAR_PRESETS.map((kw) => (
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

        {/* Battery */}
        <div className="mt-7 rounded-lg border border-ash-200 bg-paper p-4">
          <label className="flex cursor-pointer items-center justify-between">
            <span className="flex items-center gap-2 font-display text-[14px] font-bold text-navy-700">
              <Icon name="battery" size={18} className="text-green-600" /> Adding a battery?
            </span>
            <button
              onClick={() => setHasBattery((b) => !b)}
              role="switch"
              aria-checked={hasBattery}
              className={cn(
                "relative h-6 w-11 flex-none rounded-pill transition-colors",
                hasBattery ? "bg-green-500" : "bg-ash-300",
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform",
                  hasBattery ? "translate-x-[22px]" : "translate-x-0.5",
                )}
              />
            </button>
          </label>
          {hasBattery && (
            <div className="mt-4">
              <div className="mb-1.5 flex items-center justify-between">
                <span className="font-body text-[13px] font-semibold text-ash-700">Usable capacity</span>
                <span className="font-display text-[15px] font-extrabold text-forest-700">{batteryKwh} kWh</span>
              </div>
              <input
                type="range"
                min={5}
                max={50}
                step={0.5}
                value={batteryKwh}
                onChange={(e) => setBatteryKwh(+e.target.value)}
                className="w-full"
                aria-label="Battery usable capacity in kWh"
              />
            </div>
          )}
        </div>

        {/* Install year */}
        <div className="mt-7">
          <span className="mb-1.5 flex items-center gap-2 font-display text-[14px] font-bold text-navy-700">
            <Icon name="clock" size={17} className="text-green-600" /> Install year
          </span>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: STC_SCHEME_END_YEAR - CURRENT_YEAR + 1 }, (_, i) => CURRENT_YEAR + i).map(
              (y) => (
                <button
                  key={y}
                  onClick={() => setInstallYear(y)}
                  className={cn(
                    "rounded-pill border px-3.5 py-1.5 font-display text-[13px] font-bold transition-colors",
                    installYear === y
                      ? "border-green-500 bg-green-50 text-forest-700"
                      : "border-ash-300 text-ash-700 hover:border-green-300",
                  )}
                >
                  {y}
                </button>
              ),
            )}
          </div>
          <p className="mt-2 font-body text-[12px] text-ash-500">
            The STC rebate shrinks each year as the scheme winds down to {STC_SCHEME_END_YEAR}. Lock in
            sooner for more.
          </p>
        </div>
      </div>

      {/* --------------------------------------------------------- results */}
      <div className="lg:sticky lg:top-[96px] lg:self-start">
        <div className="overflow-hidden rounded-xl border border-ash-200 bg-white shadow-lg">
          <div className="bg-forest-900 px-7 py-5">
            <div className="font-display text-[12.5px] font-bold uppercase tracking-[0.06em] text-green-300">
              Your estimated rebate
            </div>
            <div className="mt-1 font-display text-[44px] font-extrabold leading-none text-white">
              {result ? money(result.total) : "$0"}
            </div>
            <div className="mt-1.5 font-body text-[12.5px] text-[#a9c4a3]">
              {result ? "Federal incentives · before state support" : "Enter your postcode to calculate"}
            </div>
          </div>

          <div className="p-7">
            {result ? (
              <>
                {/* STC */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-display text-[14px] font-bold text-navy-700">Solar STC rebate</div>
                    <div className="mt-0.5 font-body text-[12.5px] text-ash-500">
                      {result.stc.stcCount} STCs · Zone {result.stc.zone} · {result.stc.deemingYears} yr
                      deeming × {money(STC_PRICE)}
                    </div>
                  </div>
                  <div className="flex-none font-display text-[17px] font-extrabold text-green-600">
                    {money(result.stc.rebate)}
                  </div>
                </div>

                {/* Federal battery */}
                <div className="mt-4 flex items-start justify-between gap-3 border-t border-ash-200 pt-4">
                  <div>
                    <div className="font-display text-[14px] font-bold text-navy-700">
                      Federal battery rebate
                    </div>
                    <div className="mt-0.5 font-body text-[12.5px] text-ash-500">
                      {hasBattery
                        ? `Cheaper Home Batteries · ${batteryKwh} kWh (tiered)`
                        : "Add a battery to qualify"}
                    </div>
                  </div>
                  <div className="flex-none font-display text-[17px] font-extrabold text-green-600">
                    {money(result.federalBattery)}
                  </div>
                </div>

                {/* State scheme */}
                <div className="mt-5 rounded-lg bg-paper p-4">
                  <div className="flex items-center gap-2 font-display text-[13px] font-bold text-navy-700">
                    <Icon name="shield" size={16} className="text-forest-700" />
                    {result.stateScheme.name} support
                  </div>
                  <p className="mt-1.5 font-body text-[12.5px] leading-relaxed text-ash-700">
                    {result.stateScheme.battery}
                  </p>
                  <a
                    href={result.stateScheme.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 font-display text-[12.5px] font-bold text-green-600 hover:text-green-700"
                  >
                    View official scheme <Icon name="arrow" size={13} stroke={2.4} />
                  </a>
                </div>

                <a
                  href="/get-a-quote"
                  className="ke-press mt-5 inline-flex w-full items-center justify-center gap-2.5 rounded-pill bg-green-500 px-6 py-[14px] font-display text-[15.5px] font-bold text-white shadow-green hover:bg-green-600"
                >
                  Claim This With a Free Quote <Icon name="arrow" size={18} stroke={2.4} />
                </a>
              </>
            ) : (
              <div className="py-6 text-center">
                <Icon name="mapPin" size={32} className="mx-auto mb-2 text-ash-300" />
                <p className="font-body text-[13.5px] text-ash-500">
                  Enter a valid Australian postcode to see your STC and battery rebates.
                </p>
              </div>
            )}

            <p className="mt-4 border-t border-ash-200 pt-3.5 text-center font-body text-[11px] leading-relaxed text-ash-500">
              Estimate only — not a quote. Figures verified {VERIFIED}. Sources: Clean Energy Regulator
              (STC), DCCEEW (Cheaper Home Batteries). Final value confirmed at installation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
