/**
 * Per-state energy assumptions for the savings / output / feed-in / EV
 * calculators. These are indicative 2026 figures — generation from CEC /
 * PVWatts-style city averages; tariffs from published state benchmarks.
 * They are sensible defaults the user can override with their own bill.
 *
 * Verified: 2026-06-22. Sources: Clean Energy Council (generation),
 * AER / IPART / state pricing benchmarks (tariffs & feed-in).
 */

import { type StateCode, stateForPostcode } from "./rebates";

export { type StateCode, stateForPostcode };

export const ENERGY_VERIFIED = "2026-06-22";

export type StateEnergy = {
  city: string;
  /** Real-world annual-average generation, kWh per kW of panels per day. */
  genPerKwDay: number;
  /** Typical residential import (usage) tariff, c/kWh. */
  importTariff: number;
  /** Typical solar feed-in tariff (export), c/kWh. */
  feedInTariff: number;
};

export const ENERGY_BY_STATE: Record<StateCode, StateEnergy> = {
  NSW: { city: "Sydney", genPerKwDay: 4.1, importTariff: 32, feedInTariff: 5 },
  VIC: { city: "Melbourne", genPerKwDay: 3.6, importTariff: 28, feedInTariff: 4 },
  QLD: { city: "Brisbane", genPerKwDay: 4.3, importTariff: 28, feedInTariff: 5 },
  SA: { city: "Adelaide", genPerKwDay: 4.3, importTariff: 40, feedInTariff: 3 },
  WA: { city: "Perth", genPerKwDay: 4.4, importTariff: 30, feedInTariff: 5 },
  TAS: { city: "Hobart", genPerKwDay: 3.3, importTariff: 27, feedInTariff: 7 },
  ACT: { city: "Canberra", genPerKwDay: 4.1, importTariff: 25, feedInTariff: 6 },
  NT: { city: "Darwin", genPerKwDay: 4.4, importTariff: 28, feedInTariff: 8 },
};

/** Grid emissions factor (kg CO2 per kWh), national average. */
export const CO2_PER_KWH = 0.66;
/** A typical EV uses ~16 kWh per 100 km. */
export const EV_KWH_PER_100KM = 16;

/** Annual generation (kWh) for a system size in a given state. */
export function annualGeneration(systemKw: number, state: StateCode): number {
  return Math.round(systemKw * ENERGY_BY_STATE[state].genPerKwDay * 365);
}

/** CO2 avoided (kg/yr) for a given annual generation. */
export function annualCo2Saved(annualKwh: number): number {
  return Math.round(annualKwh * CO2_PER_KWH);
}

/** Rough trees-equivalent (≈21 kg CO2 absorbed per tree per year). */
export function treesEquivalent(co2Kg: number): number {
  return Math.round(co2Kg / 21);
}

export function money(n: number): string {
  return "$" + Math.round(n).toLocaleString();
}
