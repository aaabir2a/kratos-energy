"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import { submitLead, type LeadFormField } from "@/lib/api";
import { useContentStore } from "@/lib/store";
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

/* Estimates are presented as ranges so they read as an initial estimate,
   not a quote (client requirement). */
const PRICE_BAND = 0.07; // ±7% around the configured total
const SAVE_BAND = 0.1; // ±10% around the modelled saving

const roundTo = (n: number, step: number) => Math.round(n / step) * step;

function band(n: number, pct: number, step: number): { lo: number; hi: number } {
  return { lo: roundTo(n * (1 - pct), step), hi: roundTo(n * (1 + pct), step) };
}

/** "$9,700 – $10,900" */
const moneyRange = (r: { lo: number; hi: number }) => `${money(r.lo)} – ${money(r.hi)}`;

/**
 * Satisfy the CRM's global lead-form schema: fill each field it declares from
 * the contact details (via `maps_to`, then by type/label), defaulting required
 * choice fields so validation passes. Unknown build_* keys ride alongside.
 */
function schemaAutoFill(
  fields: LeadFormField[],
  contact: Record<string, string | undefined>,
): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const f of fields) {
    const mapped = f.maps_to ? contact[f.maps_to] : undefined;
    if (mapped) {
      out[f.field_name] = mapped;
      continue;
    }
    if (f.type === "email" && contact.email) {
      out[f.field_name] = contact.email;
      continue;
    }
    if (f.type === "phone" && contact.phone) {
      out[f.field_name] = contact.phone;
      continue;
    }
    if (f.type === "text" && /name/i.test(`${f.label} ${f.field_name}`) && contact.firstName) {
      out[f.field_name] = contact.firstName;
      continue;
    }
    if ((f.type === "select" || f.type === "radio") && f.required && f.options?.length) {
      // Build-your-system is a residential tool — prefer that option.
      out[f.field_name] = f.options.find((o) => /residential/i.test(o)) ?? f.options[0];
      continue;
    }
    if (f.type === "checkbox" && f.required) out[f.field_name] = true;
  }
  return out;
}

/** Pull UTM / click-id attribution off the current URL for lead source. */
function attribution() {
  if (typeof window === "undefined") return {};
  const q = new URLSearchParams(window.location.search);
  const pick = (k: string) => q.get(k) || undefined;
  return {
    utmSource: pick("utm_source"),
    utmMedium: pick("utm_medium"),
    utmCampaign: pick("utm_campaign"),
    gclid: pick("gclid"),
    fbclid: pick("fbclid"),
    referrerUrl: document.referrer || undefined,
  };
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

  // System. Selections are stored as overrides and the effective values are
  // derived, so changing brand/phase/roof can't leave a stale choice selected.
  const [phase, setPhase] = useState<Phase>("1P");
  const [brand, setBrand] = useState<Brand>("Goodwe");
  const [solarOverride, setSolarOverride] = useState<SolarSystem | null>(null);
  const [inverterOverride, setInverterOverride] = useState<Inverter | null>(null);
  const [batteryId, setBatteryId] = useState<string | null>(null);
  const [evChoice, setEvChoice] = useState<EvCharger>(EV_CHARGERS[0]);

  // Request flow: closed CTA → contact mini-form → sent confirmation.
  const [mode, setMode] = useState<"cta" | "form" | "sent">("cta");
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  // Live CRM form schema — its required fields must be satisfied on submit.
  const { data: leadSchema } = useContentStore((s) => s.leadForm);
  const loadLeadForm = useContentStore((s) => s.loadLeadForm);
  useEffect(() => {
    loadLeadForm();
  }, [loadLeadForm]);

  // Solar follows the roof recommendation until the user picks a size.
  const solar = solarOverride ?? roof.recommended;

  const inverterOpts = useMemo(
    () => INVERTERS.filter((i) => i.brand === brand && i.phase === phase),
    [brand, phase],
  );
  const batteryOpts = useMemo(() => BATTERY_OPTIONS.filter((b) => b.brand === brand), [brand]);
  const recInverter = useMemo(() => bestInverter(inverterOpts, solar.sizeKw), [inverterOpts, solar]);

  // Inverter: the user's pick if it's valid for this brand+phase, else best-fit.
  const inverter =
    inverterOverride && inverterOpts.some((o) => o.id === inverterOverride.id)
      ? inverterOverride
      : recInverter;

  // Battery: resolve the chosen id within the current brand (else none).
  const battery = batteryId ? batteryOpts.find((b) => b.id === batteryId) ?? null : null;

  // 22kW charger needs three-phase supply — fall back to none on single-phase.
  const ev = evChoice.phase === "3P" && phase === "1P" ? EV_CHARGERS[0] : evChoice;

  const totalCost =
    solar.finalPrice + (inverter?.price ?? 0) + (battery?.finalPrice ?? 0) + ev.price;
  const annualSaving = estimateAnnualSaving(solar.sizeKw, roof.yieldFactor, !!battery);

  // Presented as ranges: exact figures read as a quote, which this is not.
  const costRange = band(totalCost, PRICE_BAND, 100);
  const saveRange = band(annualSaving, SAVE_BAND, 50);
  const paybackLo = saveRange.hi > 0 ? costRange.lo / saveRange.hi : 0;
  const paybackHi = saveRange.lo > 0 ? costRange.hi / saveRange.lo : 0;
  const paybackRange =
    paybackHi > 0 ? `${(Math.round(paybackLo * 2) / 2).toFixed(1)} – ${(Math.round(paybackHi * 2) / 2).toFixed(1)}` : "—";

  const lineItems = [
    { label: `${solar.sizeKw} kW solar · ${solar.panels} panels`, value: solar.finalPrice },
    { label: inverter ? `${inverter.brand} ${inverter.model}` : "Inverter — select", value: inverter?.price ?? 0 },
    { label: battery ? `${battery.brand} ${battery.model}` : "No battery", value: battery?.finalPrice ?? 0 },
    { label: ev.price ? ev.label : "No EV charger", value: ev.price },
  ];

  const last = STEPS.length - 1;

  /** Submit the configured build + contact details as a CRM lead. The full
   *  configuration goes in `message` (first-class lead column) and mirrored
   *  into customFields for when the backend adds structured build fields. */
  async function handleRequestBuild(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;
    setSendError(null);

    const fd = new FormData(e.currentTarget);
    const firstName = String(fd.get("firstName") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const phoneNo = String(fd.get("phone") || "").trim();
    if (!firstName) {
      setSendError("Please tell us your name.");
      return;
    }
    if (!email && !phoneNo) {
      setSendError("Please add an email or a phone number so we can reach you.");
      return;
    }

    const orient = ORIENTATIONS.find((o) => o.id === orientation)?.label ?? orientation;
    const shade = SHADING.find((s) => s.id === shading)?.label ?? shading;

    const summary = [
      "Build Your System enquiry:",
      `- Solar: ${solar.sizeKw} kW (${solar.panels} panels)`,
      `- Inverter: ${inverter ? `${inverter.brand} ${inverter.model} (${inverter.kw} kW, ${inverter.phase})` : "not selected"}`,
      `- Battery: ${battery ? `${battery.brand} ${battery.model} (${battery.kwh} kWh)` : "none"}`,
      `- EV charger: ${ev.price ? ev.label : "none"}`,
      `- Supply: ${phase === "1P" ? "single-phase" : "three-phase"} · Brand: ${brand}`,
      `- Roof: ${sqFt.toLocaleString()} sq ft, ${orient}, ${shade}`,
      `- Estimated investment: ${moneyRange(costRange)} (after rebates, incl. GST)`,
      `- Estimated saving: ${moneyRange(saveRange)}/yr · payback ${paybackRange} yrs`,
    ].join("\n");

    setSending(true);
    try {
      await submitLead({
        firstName,
        email: email || undefined,
        phone: phoneNo || undefined,
        suburb: String(fd.get("suburb") || "").trim() || undefined,
        message: summary,
        consentMarketing: true,
        customFields: {
          // Explicit origin markers so the CRM can distinguish configurator leads.
          lead_source: "build_configurator",
          source_page: "/build",
          ...schemaAutoFill(leadSchema?.fieldsSchema ?? [], {
            firstName,
            email: email || undefined,
            phone: phoneNo || undefined,
            suburb: String(fd.get("suburb") || "").trim() || undefined,
          }),
          build_solar_kw: solar.sizeKw,
          build_panel_count: solar.panels,
          build_brand: brand,
          build_inverter: inverter ? `${inverter.brand} ${inverter.model}` : null,
          build_battery: battery ? `${battery.model} ${battery.kwh}kWh` : null,
          build_ev_charger: ev.price ? ev.label : null,
          build_supply_phase: phase,
          build_roof_sqft: sqFt,
          build_roof_orientation: orientation,
          build_roof_shading: shading,
          build_est_total_low: costRange.lo,
          build_est_total_high: costRange.hi,
          build_est_saving_low: saveRange.lo,
          build_est_saving_high: saveRange.hi,
          build_est_payback_years: paybackRange,
        },
        ...attribution(),
        // Always identify the page itself, even with no external referrer.
        referrerUrl:
          attribution().referrerUrl ??
          (typeof window !== "undefined" ? window.location.href : undefined),
      });
      setMode("sent");
    } catch {
      setSendError("Couldn't send just now — please try again or call us.");
    } finally {
      setSending(false);
    }
  }

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
                      setSolarOverride(s);
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
                    onClick={() => setInverterOverride(iv)}
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
                  onClick={() => setBatteryId(null)}
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
                      onClick={() => setBatteryId(b.id)}
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
                      onClick={() => !blocked && setEvChoice(c)}
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
            Estimated investment
          </div>
          <div className="font-display text-[clamp(22px,1.9vw,27px)] font-extrabold leading-tight text-green-600">
            {step === last ? moneyRange(costRange) : "—"}
          </div>
          <div className="mt-1 font-body text-[13px] text-ash-500">after rebates · incl. GST</div>

          {/* Savings + payback — estimated ranges */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-md bg-green-50 p-3.5">
              <div className="font-display text-[15px] font-extrabold leading-snug text-forest-700">
                {step === last ? moneyRange(saveRange) : "—"}
              </div>
              <div className="mt-1 font-body text-[11.5px] text-ash-500">Est. saved / year</div>
            </div>
            <div className="rounded-md bg-paper p-3.5">
              <div className="font-display text-[15px] font-extrabold leading-snug text-navy-800">
                {step === last ? (
                  <>
                    {paybackRange}{" "}
                    {paybackRange !== "—" && (
                      <span className="text-[12px] font-bold text-ash-500">yrs</span>
                    )}
                  </>
                ) : (
                  "—"
                )}
              </div>
              <div className="mt-1 font-body text-[11.5px] text-ash-500">Typical payback</div>
            </div>
          </div>

          {/* Estimate notice — this is not a quote. */}
          <div className="mt-4 flex gap-2.5 rounded-md border border-gold-400/50 bg-gold-300/15 p-3.5">
            <Icon name="shield" size={16} stroke={2.2} className="mt-0.5 flex-none text-gold-500" />
            <p className="m-0 font-body text-[12.5px] leading-relaxed text-ash-700">
              <strong className="text-navy-700">This is an initial estimate, not a quote.</strong>{" "}
              Final pricing is confirmed after a free site assessment — roof
              condition, switchboard and metering can change the design.
            </p>
          </div>

          {/* Assumptions behind the numbers */}
          <details className="mt-2.5 rounded-md border border-ash-200 bg-white">
            <summary className="cursor-pointer select-none px-3.5 py-2.5 font-display text-[12.5px] font-bold text-forest-700">
              How we estimate
            </summary>
            <ul className="m-0 flex flex-col gap-1.5 px-3.5 pb-3.5 font-body text-[12px] leading-relaxed text-ash-700">
              <li>Prices include GST with the STC rebate already deducted.</li>
              <li>Battery prices include current state and federal rebates.</li>
              <li>
                Savings assume ≈ $231 per kW per year on a north-facing,
                unshaded roof, adjusted for your orientation and shading, plus
                ≈ $320/yr extra self-consumption with a battery.
              </li>
              <li>Actual savings depend on your tariff and usage patterns.</li>
            </ul>
          </details>

          {mode === "cta" && (
            <button
              onClick={() => setMode("form")}
              className="ke-press mt-5 inline-flex w-full items-center justify-center gap-2.5 rounded-pill bg-green-500 px-6 py-[14px] font-display text-[15.5px] font-bold text-white shadow-green hover:bg-green-600"
            >
              Get my exact quote <Icon name="arrow" size={18} stroke={2.4} />
            </button>
          )}

          {mode === "form" && (
            <form onSubmit={handleRequestBuild} className="mt-5 flex flex-col gap-2.5" noValidate>
              <div className="font-display text-[13.5px] font-bold text-navy-700">
                Send this build to our team
              </div>
              <input
                name="firstName"
                required
                placeholder="First name"
                className="w-full rounded-md border-[1.5px] border-ash-300 bg-white px-3.5 py-2.5 font-body text-[14px] text-ink outline-none"
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="w-full rounded-md border-[1.5px] border-ash-300 bg-white px-3.5 py-2.5 font-body text-[14px] text-ink outline-none"
              />
              <div className="grid grid-cols-2 gap-2.5">
                <input
                  name="phone"
                  type="tel"
                  placeholder="Phone"
                  className="w-full rounded-md border-[1.5px] border-ash-300 bg-white px-3.5 py-2.5 font-body text-[14px] text-ink outline-none"
                />
                <input
                  name="suburb"
                  placeholder="Suburb"
                  className="w-full rounded-md border-[1.5px] border-ash-300 bg-white px-3.5 py-2.5 font-body text-[14px] text-ink outline-none"
                />
              </div>
              {sendError && (
                <p className="m-0 rounded-md bg-red-50 px-3 py-2 font-body text-[12.5px] text-red-700">
                  {sendError}
                </p>
              )}
              <button
                type="submit"
                disabled={sending}
                className={cn(
                  "ke-press inline-flex w-full items-center justify-center gap-2.5 rounded-pill bg-green-500 px-6 py-[13px] font-display text-[15px] font-bold text-white shadow-green hover:bg-green-600",
                  sending && "opacity-70",
                )}
              >
                {sending ? "Sending…" : "Request my exact quote"}
                {!sending && <Icon name="arrow" size={17} stroke={2.4} />}
              </button>
              <p className="m-0 text-center font-body text-[11px] text-ash-500">
                We include your full configuration so the first call is useful.
              </p>
            </form>
          )}

          {mode === "sent" && (
            <div className="mt-5 rounded-lg bg-green-50 p-4 text-center">
              <Icon name="check" size={28} stroke={3} className="mx-auto mb-1.5 text-green-600" />
              <div className="font-display text-[15px] font-bold text-forest-700">Build sent!</div>
              <div className="mt-0.5 font-body text-[13px] text-ash-700">
                A consultant will review your configuration and confirm exact
                pricing after a free site assessment.
              </div>
            </div>
          )}

          <p className="mt-3.5 text-center font-body text-[11.5px] leading-relaxed text-ash-500">
            Estimated ranges only — your final quote is confirmed after a free
            site assessment.
          </p>
        </div>
      </div>
    </div>
  );
}
