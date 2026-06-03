"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

type Option = { id: string; label: string; sub: string; price: number };

const PANELS: Option[] = [
  { id: "6.6", label: "6.6kW", sub: "16 panels · small home", price: 3990 },
  { id: "10", label: "10.12kW", sub: "24 panels · medium home", price: 5490 },
  { id: "13.2", label: "13.2kW", sub: "32 panels · large home", price: 7990 },
];

const INVERTERS: Option[] = [
  { id: "string", label: "String inverter", sub: "Fronius / Sungrow", price: 0 },
  { id: "hybrid", label: "Hybrid inverter", sub: "Battery-ready", price: 900 },
  { id: "micro", label: "Microinverters", sub: "Enphase · panel-level", price: 1600 },
];

const BATTERIES: Option[] = [
  { id: "none", label: "No battery", sub: "Add later anytime", price: 0 },
  { id: "5", label: "5 kWh battery", sub: "Evening backup", price: 4200 },
  { id: "13.5", label: "13.5 kWh battery", sub: "Whole-home backup", price: 9800 },
];

const EV: Option[] = [
  { id: "none", label: "No charger", sub: "Skip for now", price: 0 },
  { id: "7", label: "7kW EV charger", sub: "Overnight charging", price: 1290 },
  { id: "22", label: "22kW EV charger", sub: "Three-phase fast", price: 1990 },
];

const STEPS = [
  { key: "panel", title: "Solar size", options: PANELS },
  { key: "inverter", title: "Inverter", options: INVERTERS },
  { key: "battery", title: "Battery", options: BATTERIES },
  { key: "ev", title: "EV charger", options: EV },
] as const;

function money(n: number) {
  return "$" + n.toLocaleString();
}

export function SystemConfigurator() {
  const [sel, setSel] = useState<Record<string, Option>>({
    panel: PANELS[1],
    inverter: INVERTERS[0],
    battery: BATTERIES[0],
    ev: EV[0],
  });
  const [done, setDone] = useState(false);

  const total = useMemo(
    () => Object.values(sel).reduce((sum, o) => sum + o.price, 0),
    [sel],
  );
  const perDay = Math.round((total / 24 / 30) * 10) / 10;

  return (
    <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1fr_360px]">
      {/* Steps */}
      <div className="flex flex-col gap-6">
        {STEPS.map((step) => (
          <div key={step.key}>
            <div className="mb-3 font-display text-[15px] font-bold text-navy-700">
              {step.title}
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {step.options.map((o) => {
                const active = sel[step.key].id === o.id;
                return (
                  <button
                    key={o.id}
                    onClick={() => setSel((s) => ({ ...s, [step.key]: o }))}
                    className={cn(
                      "rounded-lg border-[1.5px] p-4 text-left transition-all",
                      active
                        ? "border-green-500 bg-green-50 shadow-sm"
                        : "border-ash-300 bg-white hover:border-green-300",
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display text-[15.5px] font-bold text-navy-700">
                        {o.label}
                      </span>
                      {active && (
                        <Icon name="check" size={16} stroke={3} className="text-green-500" />
                      )}
                    </div>
                    <div className="mt-1 font-body text-[12.5px] text-ash-500">
                      {o.sub}
                    </div>
                    <div className="mt-2 font-display text-[13px] font-bold text-forest-700">
                      {o.price === 0 ? "Included" : "+ " + money(o.price)}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="lg:sticky lg:top-[96px] lg:self-start">
        <div className="rounded-xl border border-ash-200 bg-white p-7 shadow-lg">
          <div className="font-display text-[13px] font-bold uppercase tracking-[0.06em] text-green-600">
            Your system
          </div>

          <div className="my-4 flex flex-col gap-2.5 border-y border-ash-200 py-4">
            {STEPS.map((step) => (
              <div key={step.key} className="flex items-center justify-between">
                <span className="font-body text-[13.5px] text-ash-700">
                  {sel[step.key].label}
                </span>
                <span className="font-display text-[13.5px] font-bold text-navy-700">
                  {sel[step.key].price === 0 ? "—" : money(sel[step.key].price)}
                </span>
              </div>
            ))}
          </div>

          <div className="font-body text-[12.5px] font-bold uppercase tracking-[0.06em] text-ash-500">
            Estimated total
          </div>
          <div className="font-display text-[38px] font-extrabold leading-none text-green-600">
            {money(total)}
          </div>
          <div className="mt-1.5 font-body text-[13px] text-ash-500">
            ≈ ${perDay}/day · after rebates · +GST
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
              <div className="font-display text-[15px] font-bold text-forest-700">
                Build saved!
              </div>
              <div className="mt-0.5 font-body text-[13px] text-ash-700">
                A consultant will confirm your configuration and exact price.
              </div>
            </div>
          )}

          <p className="mt-3.5 text-center font-body text-[11.5px] leading-relaxed text-ash-500">
            Indicative pricing — final quote confirmed after a free site
            assessment.
          </p>
        </div>
      </div>
    </div>
  );
}
