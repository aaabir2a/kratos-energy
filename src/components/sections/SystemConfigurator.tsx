"use client";

import { useEffect, useMemo, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import {
  BATTERY_OPTIONS,
  BRAND_BLURB,
  BRANDS,
  EV_CHARGERS,
  INVERTERS,
  ORIENTATIONS,
  SHADING,
  SOLAR,
  estimateAnnualSaving,
  estimateRoof,
  money,
  type Brand,
  type EvCharger,
  type Inverter,
  type OrientationId,
  type Phase,
  type ShadingId,
  type SolarSystem,
  type BatteryOption,
} from "@/lib/systemPricing";

/* ---------------------------------------------------------------- helpers */

/** Best-fit inverter for a system size within a filtered list. */
function bestInverter(opts: Inverter[], targetKw: number): Inverter | null {
  if (opts.length === 0) return null;
  return [...opts].sort((a, b) => {
    const da = Math.abs(a.kw - targetKw);
    const db = Math.abs(b.kw - targetKw);
    if (da !== db) return da - db;
    return b.kw - a.kw; // tie → larger headroom
  })[0];
}

const STEPS = [
  { key: "roof", title: "Your roof", icon: "building" },
  { key: "solar", title: "Solar size", icon: "sun" },
  { key: "phase", title: "Power supply", icon: "zap" },
  { key: "brand", title: "Brand", icon: "award" },
  { key: "inverter", title: "Inverter", icon: "wrench" },
  { key: "battery", title: "Battery", icon: "battery" },
  { key: "ev", title: "EV charger", icon: "trend" },
] as const;

/* ----------------------------------------------------------- subcomponents */

function StepHeading({ icon, kicker, title, sub }: { icon: string; kicker: string; title: string; sub: string }) {
  return (
    <div className="mb-6">
      <div className="mb-2 flex items-center gap-2 font-display text-[12px] font-bold uppercase tracking-[0.08em] text-green-600">
        <Icon name={icon} size={15} /> {kicker}
      </div>
      <h3 className="font-display text-[clamp(22px,2.4vw,28px)] font-extrabold leading-tight tracking-[-0.02em] text-navy-800">
        {title}
      </h3>
      <p className="mt-1.5 max-w-[520px] font-body text-[14.5px] leading-relaxed text-ash-700">{sub}</p>
    </div>
  );
}

/** Generic selectable tile used across the brand/phase/option steps. */
function Tile({
  active,
  onClick,
  disabled,
  title,
  sub,
  meta,
  recommended,
}: {
  active: boolean;
  onClick: () => void;
  disabled?: boolean;
  title: string;
  sub?: string;
  meta?: string;
  recommended?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
      className={cn(
        "relative flex flex-col rounded-lg border-[1.5px] p-4 text-left transition-all",
        disabled
          ? "cursor-not-allowed border-ash-200 bg-paper opacity-55"
          : active
            ? "border-green-500 bg-green-50 shadow-sm"
            : "border-ash-300 bg-white hover:border-green-300",
      )}
    >
      {recommended && !active && (
        <span className="absolute right-3 top-3 rounded-pill bg-gold-400 px-2 py-[2px] font-display text-[10px] font-bold text-forest-900">
          BEST FIT
        </span>
      )}
      <div className="flex items-center justify-between gap-2">
        <span className="font-display text-[15.5px] font-bold text-navy-700">{title}</span>
        {active && <Icon name="check" size={16} stroke={3} className="flex-none text-green-500" />}
      </div>
      {sub && <span className="mt-1 font-body text-[12.5px] leading-snug text-ash-500">{sub}</span>}
      {meta && <span className="mt-2 font-display text-[13px] font-bold text-forest-700">{meta}</span>}
    </button>
  );
}

/* -------------------------------------------------------------- component */

export function SystemConfigurator() {
  const [step, setStep] = useState(0);

  // Roof
  const [sqFt, setSqFt] = useState(1500);
  const [orientation, setOrientation] = useState<OrientationId>("N");
  const [shading, setShading] = useState<ShadingId>("none");

  const roof = useMemo(() => estimateRoof(sqFt, orientation, shading), [sqFt, orientation, shading]);

  // System
  const [solar, setSolar] = useState<SolarSystem>(SOLAR[1]);
  const [phase, setPhase] = useState<Phase>("1P");
  const [brand, setBrand] = useState<Brand>("Goodwe");
  const [inverter, setInverter] = useState<Inverter | null>(null);
  const [battery, setBattery] = useState<BatteryOption | null>(null);
  const [ev, setEv] = useState<EvCharger>(EV_CHARGERS[0]);
  const [done, setDone] = useState(false);

  // Snap solar to the roof recommendation only until the user overrides it.
  const [solarTouched, setSolarTouched] = useState(false);
  useEffect(() => {
    if (!solarTouched) setSolar(roof.recommended);
  }, [roof, solarTouched]);

  const inverterOpts = useMemo(
    () => INVERTERS.filter((i) => i.brand === brand && i.phase === phase),
    [brand, phase],
  );
  const batteryOpts = useMemo(() => BATTERY_OPTIONS.filter((b) => b.brand === brand), [brand]);
  const recInverter = useMemo(() => bestInverter(inverterOpts, solar.sizeKw), [inverterOpts, solar]);

  // Keep inverter valid for the current brand+phase.
  useEffect(() => {
    setInverter((prev) => (prev && inverterOpts.some((o) => o.id === prev.id) ? prev : recInverter));
  }, [inverterOpts, recInverter]);

  // Keep battery valid for the current brand.
  useEffect(() => {
    setBattery((prev) => (prev && batteryOpts.some((o) => o.id === prev.id) ? prev : null));
  }, [batteryOpts]);

  // 22kW charger needs three-phase supply.
  useEffect(() => {
    if (phase === "1P" && ev.phase === "3P") setEv(EV_CHARGERS[0]);
  }, [phase, ev]);

  const totalCost =
    solar.finalPrice + (inverter?.price ?? 0) + (battery?.finalPrice ?? 0) + ev.price;
  const annualSaving = estimateAnnualSaving(solar.sizeKw, roof.yieldFactor, !!battery);
  const paybackYears = annualSaving > 0 ? totalCost / annualSaving : 0;

  const lineItems = [
    { label: `${solar.sizeKw} kW solar · ${solar.panels} panels`, value: solar.finalPrice },
    { label: inverter ? `${inverter.brand} ${inverter.model}` : "Inverter — select", value: inverter?.price ?? 0 },
    { label: battery ? `${battery.brand} ${battery.model}` : "No battery", value: battery?.finalPrice ?? 0 },
    { label: ev.price ? ev.label : "No EV charger", value: ev.price },
  ];

  const last = STEPS.length - 1;

  return (
    <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1fr_372px]">
      {/* ----------------------------------------------------------- wizard */}
      <div className="rounded-xl border border-ash-200 bg-white p-6 shadow-md sm:p-8">
        {/* Progress rail */}
        <div className="mb-7 flex items-center gap-1.5">
          {STEPS.map((s, i) => (
            <button
              key={s.key}
              onClick={() => setStep(i)}
              aria-label={s.title}
              className="group flex flex-1 flex-col gap-1.5"
            >
              <span
                className={cn(
                  "h-1.5 rounded-pill transition-colors",
                  i <= step ? "bg-green-500" : "bg-ash-200",
                )}
              />
              <span
                className={cn(
                  "hidden text-left font-display text-[11px] font-bold uppercase tracking-[0.04em] sm:block",
                  i === step ? "text-forest-700" : "text-ash-500 group-hover:text-ash-700",
                )}
              >
                {s.title}
              </span>
            </button>
          ))}
        </div>

        <div key={step} className="animate-fade-up">
          {/* -------------------------------------------------- 0 · Roof */}
          {step === 0 && (
            <div>
              <StepHeading
                icon="building"
                kicker="Step 1 of 7"
                title="Tell us about your roof"
                sub="We size your system to the space you have. Estimate your usable roof area and how it faces the sun."
              />

              <div className="mb-6">
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="font-display text-[13.5px] font-bold text-ash-700">Roof area</span>
                  <span className="font-display text-[16px] font-extrabold text-forest-700">
                    {sqFt.toLocaleString()} sq ft
                  </span>
                </div>
                <input
                  type="range"
                  min={500}
                  max={4000}
                  step={50}
                  value={sqFt}
                  onChange={(e) => setSqFt(+e.target.value)}
                  className="w-full"
                  aria-label="Roof area in square feet"
                />
                <div className="mt-1 flex justify-between font-body text-[11.5px] text-ash-500">
                  <span>Small (500)</span>
                  <span>Large (4,000)</span>
                </div>
              </div>

              <div className="mb-6">
                <span className="mb-2 block font-display text-[13.5px] font-bold text-ash-700">
                  Main roof orientation
                </span>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {ORIENTATIONS.map((o) => (
                    <Tile
                      key={o.id}
                      active={orientation === o.id}
                      onClick={() => setOrientation(o.id)}
                      title={o.label}
                      sub={o.note}
                    />
                  ))}
                </div>
              </div>

              <div className="mb-7">
                <span className="mb-2 block font-display text-[13.5px] font-bold text-ash-700">Shading</span>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {SHADING.map((s) => (
                    <Tile
                      key={s.id}
                      active={shading === s.id}
                      onClick={() => setShading(s.id)}
                      title={s.label}
                    />
                  ))}
                </div>
              </div>

              {/* Live estimate */}
              <div className="flex items-center gap-4 rounded-lg border border-green-200 bg-green-50 p-5">
                <span className="flex h-12 w-12 flex-none items-center justify-center rounded-[13px] bg-green-500 text-white">
                  <Icon name="sun" size={24} />
                </span>
                <div>
                  <div className="font-display text-[15px] font-bold text-forest-700">
                    Fits ≈ {roof.maxPanels} panels · up to {roof.maxKw} kW
                  </div>
                  <div className="mt-0.5 font-body text-[13px] text-ash-700">
                    We recommend the{" "}
                    <strong className="text-forest-700">{roof.recommended.sizeKw} kW</strong> system ·
                    sun quality {Math.round(roof.yieldFactor * 100)}%
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ------------------------------------------------- 1 · Solar */}
          {step === 1 && (
            <div>
              <StepHeading
                icon="sun"
                kicker="Step 2 of 7"
                title="Choose your solar size"
                sub="Trina 475W / Jinko panels on Cleanergy rails. Prices shown are after the STC rebate, including GST."
              />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {SOLAR.map((s) => (
                  <Tile
                    key={s.id}
                    active={solar.id === s.id}
                    recommended={roof.recommended.id === s.id}
                    onClick={() => {
                      setSolar(s);
                      setSolarTouched(true);
                    }}
                    title={`${s.sizeKw} kW`}
                    sub={`${s.panels} panels · ${s.recInverter} inverter`}
                    meta={money(s.finalPrice)}
                  />
                ))}
              </div>
              <p className="mt-4 font-body text-[12.5px] text-ash-500">
                Includes {money(solar.stc)} STC rebate already deducted from {money(solar.priceGst)}.
              </p>
            </div>
          )}

          {/* ------------------------------------------------- 2 · Phase */}
          {step === 2 && (
            <div>
              <StepHeading
                icon="zap"
                kicker="Step 3 of 7"
                title="Single or three-phase?"
                sub="Most homes are single-phase. Three-phase supply suits larger homes and unlocks bigger inverters and 22kW EV charging."
              />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Tile
                  active={phase === "1P"}
                  onClick={() => setPhase("1P")}
                  title="Single-phase"
                  sub="Standard for most Australian homes"
                />
                <Tile
                  active={phase === "3P"}
                  onClick={() => setPhase("3P")}
                  title="Three-phase"
                  sub="Larger homes · bigger inverters · 22kW EV"
                />
              </div>
              <p className="mt-4 font-body text-[12.5px] text-ash-500">
                Not sure? Check your switchboard or pick single-phase — we confirm on the free site visit.
              </p>
            </div>
          )}

          {/* ------------------------------------------------- 3 · Brand */}
          {step === 3 && (
            <div>
              <StepHeading
                icon="award"
                kicker="Step 4 of 7"
                title="Pick your equipment brand"
                sub="We build around one ecosystem so your inverter and battery talk to each other and share one app and warranty."
              />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {BRANDS.map((b) => (
                  <Tile
                    key={b}
                    active={brand === b}
                    onClick={() => setBrand(b)}
                    title={b}
                    sub={BRAND_BLURB[b]}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ---------------------------------------------- 4 · Inverter */}
          {step === 4 && (
            <div>
              <StepHeading
                icon="wrench"
                kicker="Step 5 of 7"
                title={`${brand} ${phase === "1P" ? "single" : "three"}-phase inverters`}
                sub="The inverter converts your panels' DC into home AC and manages the battery. We pre-select the best fit for your system size."
              />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {inverterOpts.map((iv) => (
                  <Tile
                    key={iv.id}
                    active={inverter?.id === iv.id}
                    recommended={recInverter?.id === iv.id}
                    onClick={() => setInverter(iv)}
                    title={iv.model}
                    sub={`${iv.kw} kW · ${iv.phase}`}
                    meta={money(iv.price)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ----------------------------------------------- 5 · Battery */}
          {step === 5 && (
            <div>
              <StepHeading
                icon="battery"
                kicker="Step 6 of 7"
                title={`Add ${brand} storage?`}
                sub="A battery stores daytime solar for the evening and can keep you running through a blackout. Prices are after state + federal rebates."
              />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <Tile
                  active={battery === null}
                  onClick={() => setBattery(null)}
                  title="No battery"
                  sub="Add later anytime"
                  meta="Included"
                />
                {batteryOpts
                  .filter((b) => b.phase === "any" || b.phase === phase)
                  .map((b) => (
                    <Tile
                      key={b.id}
                      active={battery?.id === b.id}
                      onClick={() => setBattery(b)}
                      title={`${b.kwh} kWh`}
                      sub={b.model}
                      meta={money(b.finalPrice)}
                    />
                  ))}
              </div>
            </div>
          )}

          {/* ---------------------------------------------------- 6 · EV */}
          {step === 6 && (
            <div>
              <StepHeading
                icon="trend"
                kicker="Step 7 of 7"
                title="Add EV charging?"
                sub="Charge your car straight from stored solar. The 22kW fast charger needs three-phase supply."
              />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {EV_CHARGERS.map((c) => {
                  const blocked = c.phase === "3P" && phase === "1P";
                  return (
                    <Tile
                      key={c.id}
                      active={ev.id === c.id}
                      disabled={blocked}
                      onClick={() => !blocked && setEv(c)}
                      title={c.label}
                      sub={blocked ? "Needs three-phase supply" : c.sub}
                      meta={c.price ? money(c.price) : "Included"}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Nav */}
        <div className="mt-8 flex items-center justify-between border-t border-ash-200 pt-5">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-pill px-4 py-2.5 font-display text-[14px] font-bold transition-colors",
              step === 0 ? "cursor-not-allowed text-ash-300" : "text-ash-700 hover:text-forest-700",
            )}
          >
            <Icon name="chevron" size={16} className="rotate-90" /> Back
          </button>
          <span className="font-body text-[12.5px] font-semibold text-ash-500">
            Step {step + 1} / {STEPS.length}
          </span>
          {step < last ? (
            <button
              onClick={() => setStep((s) => Math.min(last, s + 1))}
              className="ke-press inline-flex items-center gap-2 rounded-pill bg-green-500 px-6 py-2.5 font-display text-[14px] font-bold text-white shadow-green hover:bg-green-600"
            >
              Next <Icon name="arrow" size={16} stroke={2.4} />
            </button>
          ) : (
            <span className="font-display text-[13px] font-bold text-forest-700">Review your build →</span>
          )}
        </div>
      </div>

      {/* ---------------------------------------------------------- summary */}
      <div className="lg:sticky lg:top-[96px] lg:self-start">
        <div className="rounded-xl border border-ash-200 bg-white p-7 shadow-lg">
          <div className="font-display text-[13px] font-bold uppercase tracking-[0.06em] text-green-600">
            Your system
          </div>

          <div className="my-4 flex flex-col gap-2.5 border-y border-ash-200 py-4">
            {lineItems.map((li, i) => (
              <div key={i} className="flex items-start justify-between gap-3">
                <span className="font-body text-[13px] leading-snug text-ash-700">{li.label}</span>
                <span className="flex-none font-display text-[13.5px] font-bold text-navy-700">
                  {li.value === 0 ? "—" : money(li.value)}
                </span>
              </div>
            ))}
          </div>

          <div className="font-body text-[12.5px] font-bold uppercase tracking-[0.06em] text-ash-500">
            Estimated total
          </div>
          <div className="font-display text-[38px] font-extrabold leading-none text-green-600">
            {money(totalCost)}
          </div>
          <div className="mt-1.5 font-body text-[13px] text-ash-500">after rebates · +GST</div>

          {/* Savings + payback */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-md bg-green-50 p-3.5">
              <div className="font-display text-[20px] font-extrabold leading-none text-forest-700">
                {money(annualSaving)}
              </div>
              <div className="mt-1 font-body text-[11.5px] text-ash-500">Saved / year</div>
            </div>
            <div className="rounded-md bg-paper p-3.5">
              <div className="font-display text-[20px] font-extrabold leading-none text-navy-800">
                {paybackYears.toFixed(1)} <span className="text-[13px] font-bold text-ash-500">yrs</span>
              </div>
              <div className="mt-1 font-body text-[11.5px] text-ash-500">Payback</div>
            </div>
          </div>

          {!done ? (
            <button
              onClick={() => setDone(true)}
              className="ke-press mt-5 inline-flex w-full items-center justify-center gap-2.5 rounded-pill bg-green-500 px-6 py-[14px] font-display text-[15.5px] font-bold text-white shadow-green hover:bg-green-600"
            >
              Request This Build <Icon name="arrow" size={18} stroke={2.4} />
            </button>
          ) : (
            <div className="mt-5 rounded-lg bg-green-50 p-4 text-center">
              <Icon name="check" size={28} stroke={3} className="mx-auto mb-1.5 text-green-600" />
              <div className="font-display text-[15px] font-bold text-forest-700">Build saved!</div>
              <div className="mt-0.5 font-body text-[13px] text-ash-700">
                A consultant will confirm your configuration and exact price.
              </div>
            </div>
          )}

          <p className="mt-3.5 text-center font-body text-[11.5px] leading-relaxed text-ash-500">
            Indicative pricing &amp; savings — final quote confirmed after a free site assessment.
          </p>
        </div>
      </div>
    </div>
  );
}
