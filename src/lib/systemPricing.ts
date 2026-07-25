/**
 * Real Kratos pricing — sourced from "Price Calculation 1.xlsx".
 * Solar prices are after STC rebate; battery prices are after state +
 * federal rebates; inverter prices include GST. Single source of truth
 * for the Build-Your-System configurator.
 */

export type Phase = "1P" | "3P";

/* ---------------------------------------------------------------- Solar */

export type SolarSystem = {
  id: string;
  sizeKw: number;
  panels: number; // approx 475W panels
  priceGst: number; // before STC
  stc: number; // STC rebate applied
  finalPrice: number; // after STC, incl GST
  recInverter: string; // recommended inverter size, plain text
};

/** Trina 475W / Jinko panels, Cleanergy / Mibet rails. */
export const SOLAR: SolarSystem[] = [
  { id: "6.6", sizeKw: 6.6, panels: 14, priceGst: 4984, stc: 1500, finalPrice: 3484, recInverter: "5 kW" },
  { id: "10", sizeKw: 10, panels: 22, priceGst: 8088, stc: 2500, finalPrice: 5588, recInverter: "8–10 kW" },
  { id: "13", sizeKw: 13, panels: 28, priceGst: 10417, stc: 3250, finalPrice: 7167, recInverter: "10 kW" },
];

/* ------------------------------------------------------------- Brands */

/** Brands that have both inverter and battery pricing — the ecosystems
 *  we let a customer build around. */
export const BRANDS = ["Goodwe", "Sungrow", "Sigenergy", "FoxESS", "Sofar"] as const;
export type Brand = (typeof BRANDS)[number];

export const BRAND_BLURB: Record<Brand, string> = {
  Goodwe: "All-in-one hybrid + storage, strong value",
  Sungrow: "Global tier-1, premium reliability",
  Sigenergy: "AI-managed 5-in-1, top-end",
  FoxESS: "Modular EQ batteries, great $/kWh",
  Sofar: "Single & three-phase, budget-friendly",
};

/* ---------------------------------------------------------- Inverters */

export type Inverter = {
  id: string;
  brand: Brand;
  model: string;
  phase: Phase;
  kw: number;
  price: number; // incl GST
};

export const INVERTERS: Inverter[] = [
  // Goodwe
  { id: "gw-5-1p", brand: "Goodwe", model: "Goodwe 5kW 1P", phase: "1P", kw: 5, price: 1480 },
  { id: "gw-10-1p", brand: "Goodwe", model: "Goodwe 10kW 1P", phase: "1P", kw: 10, price: 2428 },
  { id: "gw-5-3p", brand: "Goodwe", model: "Goodwe 5kW 3P", phase: "3P", kw: 5, price: 2288 },
  { id: "gw-8-3p", brand: "Goodwe", model: "Goodwe 8kW 3P", phase: "3P", kw: 8, price: 2349 },
  { id: "gw-10-3p", brand: "Goodwe", model: "Goodwe 10kW 3P", phase: "3P", kw: 10, price: 2434 },
  { id: "gw-15-3p", brand: "Goodwe", model: "Goodwe 15kW 3P", phase: "3P", kw: 15, price: 2600 },
  // Sungrow
  { id: "sg-5-1p", brand: "Sungrow", model: "SH5.0RS", phase: "1P", kw: 5, price: 2273 },
  { id: "sg-8-1p", brand: "Sungrow", model: "SH8.0RS", phase: "1P", kw: 8, price: 3118 },
  { id: "sg-10-1p", brand: "Sungrow", model: "SH10RS", phase: "1P", kw: 10, price: 3573 },
  { id: "sg-5-3p", brand: "Sungrow", model: "SH5RT", phase: "3P", kw: 5, price: 3638 },
  { id: "sg-10-3p", brand: "Sungrow", model: "SH10RT", phase: "3P", kw: 10, price: 4418 },
  { id: "sg-15-3p", brand: "Sungrow", model: "SH15RT", phase: "3P", kw: 15, price: 5185 },
  // Sigenergy
  { id: "si-5-1p", brand: "Sigenergy", model: "SigenStor EC 5.0 SP", phase: "1P", kw: 5, price: 1745 },
  { id: "si-8-1p", brand: "Sigenergy", model: "SigenStor EC 8.0 SP", phase: "1P", kw: 8, price: 3226 },
  { id: "si-10-1p", brand: "Sigenergy", model: "SigenStor EC 10.0 SP", phase: "1P", kw: 10, price: 3477 },
  { id: "si-10-3p", brand: "Sigenergy", model: "SigenStor EC 10.0 TP", phase: "3P", kw: 10, price: 3477 },
  { id: "si-15-3p", brand: "Sigenergy", model: "SigenStor EC 15.0 TP", phase: "3P", kw: 15, price: 4564 },
  // FoxESS
  { id: "fx-5-1p", brand: "FoxESS", model: "Fox 5kW 1P", phase: "1P", kw: 5, price: 1337 },
  { id: "fx-8-1p", brand: "FoxESS", model: "Fox 8kW 1P", phase: "1P", kw: 8, price: 2117 },
  { id: "fx-10-1p", brand: "FoxESS", model: "Fox 10kW 1P", phase: "1P", kw: 10, price: 2247 },
  { id: "fx-10-3p", brand: "FoxESS", model: "Fox 10kW 3P", phase: "3P", kw: 10, price: 2247 },
  { id: "fx-15-3p", brand: "FoxESS", model: "Fox 15kW 3P", phase: "3P", kw: 15, price: 2338 },
  // Sofar
  { id: "sf-5-1p", brand: "Sofar", model: "ESI 5K", phase: "1P", kw: 5, price: 1430 },
  { id: "sf-6-1p", brand: "Sofar", model: "ESI 6K", phase: "1P", kw: 6, price: 1878 },
  { id: "sf-5-3p", brand: "Sofar", model: "HYD 5", phase: "3P", kw: 5, price: 2632 },
  { id: "sf-10-3p", brand: "Sofar", model: "HYD 10", phase: "3P", kw: 10, price: 3248 },
  { id: "sf-15-3p", brand: "Sofar", model: "HYD 15", phase: "3P", kw: 15, price: 3848 },
  { id: "sf-20-3p", brand: "Sofar", model: "HYD 20", phase: "3P", kw: 20, price: 3653 },
];

/* ----------------------------------------------------------- Batteries */

export type BatteryOption = {
  id: string;
  brand: Brand;
  model: string;
  kwh: number;
  phase: Phase | "any";
  finalPrice: number; // after state + federal rebates
};

export const BATTERY_OPTIONS: BatteryOption[] = [
  // Goodwe all-in-one
  { id: "gw-b-16", brand: "Goodwe", model: "16kWh All-in-One", kwh: 16, phase: "any", finalPrice: 4184 },
  { id: "gw-b-24", brand: "Goodwe", model: "24kWh All-in-One", kwh: 24, phase: "any", finalPrice: 6564 },
  { id: "gw-b-32", brand: "Goodwe", model: "32kWh All-in-One", kwh: 32, phase: "any", finalPrice: 9432 },
  { id: "gw-b-40", brand: "Goodwe", model: "40kWh All-in-One", kwh: 40, phase: "any", finalPrice: 12750 },
  { id: "gw-b-48", brand: "Goodwe", model: "48kWh All-in-One", kwh: 48, phase: "any", finalPrice: 16068 },
  // Sungrow
  { id: "sg-b-10", brand: "Sungrow", model: "10kWh Battery", kwh: 10, phase: "any", finalPrice: 5097 },
  { id: "sg-b-15", brand: "Sungrow", model: "15kWh Battery", kwh: 15, phase: "any", finalPrice: 6565 },
  { id: "sg-b-20", brand: "Sungrow", model: "20kWh Battery", kwh: 20, phase: "any", finalPrice: 8444 },
  { id: "sg-b-25", brand: "Sungrow", model: "25kWh Battery (3-phase)", kwh: 25, phase: "3P", finalPrice: 10287 },
  // Sigenergy
  { id: "si-b-16", brand: "Sigenergy", model: "16kWh Battery", kwh: 16, phase: "any", finalPrice: 6438 },
  { id: "si-b-24", brand: "Sigenergy", model: "24kWh Battery", kwh: 24, phase: "any", finalPrice: 8830 },
  { id: "si-b-32", brand: "Sigenergy", model: "32kWh Battery", kwh: 32, phase: "any", finalPrice: 12360 },
  { id: "si-b-40", brand: "Sigenergy", model: "40kWh Battery", kwh: 40, phase: "any", finalPrice: 16015 },
  { id: "si-b-48", brand: "Sigenergy", model: "48kWh Battery", kwh: 48, phase: "any", finalPrice: 19671 },
  // FoxESS EQ
  { id: "fx-b-18", brand: "FoxESS", model: "18kWh EQ", kwh: 18, phase: "any", finalPrice: 3775 },
  { id: "fx-b-23", brand: "FoxESS", model: "23kWh EQ", kwh: 23, phase: "any", finalPrice: 4847 },
  { id: "fx-b-27", brand: "FoxESS", model: "27kWh EQ", kwh: 27, phase: "any", finalPrice: 6033 },
  { id: "fx-b-32", brand: "FoxESS", model: "32kWh EQ", kwh: 32, phase: "any", finalPrice: 7474 },
  { id: "fx-b-37", brand: "FoxESS", model: "37kWh EQ", kwh: 37, phase: "any", finalPrice: 9110 },
  { id: "fx-b-42", brand: "FoxESS", model: "42kWh EQ", kwh: 42, phase: "any", finalPrice: 10744 },
  // Sofar
  { id: "sf-b-10", brand: "Sofar", model: "10kWh Battery", kwh: 10, phase: "any", finalPrice: 1810 },
  { id: "sf-b-15", brand: "Sofar", model: "15kWh Battery", kwh: 15, phase: "any", finalPrice: 2078 },
  { id: "sf-b-20", brand: "Sofar", model: "20kWh Battery", kwh: 20, phase: "any", finalPrice: 2737 },
  { id: "sf-b-30", brand: "Sofar", model: "30kWh Battery", kwh: 30, phase: "any", finalPrice: 6125 },
  { id: "sf-b-40", brand: "Sofar", model: "40kWh Battery", kwh: 40, phase: "any", finalPrice: 9650 },
  { id: "sf-b-50", brand: "Sofar", model: "50kWh Battery", kwh: 50, phase: "any", finalPrice: 12175 },
];

/* ---------------------------------------------------------- EV chargers */

export type EvCharger = {
  id: string;
  label: string;
  sub: string;
  phase: Phase | "any";
  price: number;
};

export const EV_CHARGERS: EvCharger[] = [
  { id: "none", label: "No charger", sub: "Add later anytime", phase: "any", price: 0 },
  { id: "7kw", label: "7kW AC charger", sub: "Single-phase, overnight charge", phase: "1P", price: 1290 },
  { id: "22kw", label: "22kW AC charger", sub: "Three-phase fast charge", phase: "3P", price: 1990 },
];

/* ------------------------------------------------- Roof → sizing model */

export const ORIENTATIONS = [
  { id: "N", label: "North", yield: 1.0, note: "Best — peak generation" },
  { id: "E/W", label: "East / West", yield: 0.85, note: "Good — split morning & evening" },
  { id: "S", label: "South", yield: 0.7, note: "Reduced — least sun in AU" },
] as const;
export type OrientationId = (typeof ORIENTATIONS)[number]["id"];

export const SHADING = [
  { id: "none", label: "No shading", yield: 1.0, usable: 1.0 },
  { id: "partial", label: "Partial shade", yield: 0.85, usable: 0.85 },
  { id: "heavy", label: "Heavy shade", yield: 0.65, usable: 0.6 },
] as const;
export type ShadingId = (typeof SHADING)[number]["id"];

/** Installed footprint of a 475W panel incl. spacing, in square metres. */
const SQM_PER_PANEL = 2.05;
/** Base share of a roof actually usable after setbacks/obstructions. */
const BASE_USABLE = 0.6;
/** Baseline first-year saving per kW on a north-facing, unshaded roof. */
const SAVINGS_PER_KW = 231; // ≈ $2,310/yr on a 10kW system
/** Extra annual self-consumption saving when a battery is added. */
const BATTERY_SAVINGS = 320;

export type RoofEstimate = {
  maxPanels: number;
  maxKw: number;
  recommended: SolarSystem;
  yieldFactor: number;
};

/** From roof area (m²) + orientation + shading, estimate how much
 *  solar fits and which standard system to recommend. */
export function estimateRoof(
  sqM: number,
  orientationId: OrientationId,
  shadingId: ShadingId,
): RoofEstimate {
  const shading = SHADING.find((s) => s.id === shadingId)!;
  const orientation = ORIENTATIONS.find((o) => o.id === orientationId)!;

  const usableSqM = sqM * BASE_USABLE * shading.usable;
  const maxPanels = Math.max(0, Math.floor(usableSqM / SQM_PER_PANEL));
  const maxKw = Math.round(maxPanels * 0.475 * 10) / 10;

  // Largest standard system that fits; fall back to the smallest.
  const fits = [...SOLAR].reverse().find((s) => s.sizeKw <= maxKw + 0.6);
  const recommended = fits ?? SOLAR[0];

  return {
    maxPanels,
    maxKw,
    recommended,
    yieldFactor: orientation.yield * shading.yield,
  };
}

/** First-year saving estimate for a system + roof, optionally w/ battery. */
export function estimateAnnualSaving(
  sizeKw: number,
  yieldFactor: number,
  hasBattery: boolean,
): number {
  const solar = sizeKw * SAVINGS_PER_KW * yieldFactor;
  return Math.round(solar + (hasBattery ? BATTERY_SAVINGS : 0));
}

export function money(n: number): string {
  return "$" + Math.round(n).toLocaleString();
}
