/**
 * Australian solar & battery rebate engine.
 *
 * Every figure below is sourced from a primary government source and
 * date-stamped. When a rate changes, update the constants here (and the
 * `VERIFIED` date) — no component code needs to change.
 *
 * Sources (verified 2026-06-22):
 *  - STC formula, zone ratings, deeming: Clean Energy Regulator (CER),
 *    Small-scale Renewable Energy Scheme. Scheme ends 31 Dec 2030.
 *  - Cheaper Home Batteries Program (federal battery rebate), tiered
 *    structure effective 1 May 2026: DCCEEW.
 *  - State schemes change frequently — see STATE_SCHEMES notes/links.
 */

import { ZONE_RATING, zoneForPostcode, type Zone } from "./postcodeZones";

export { ZONE_RATING, zoneForPostcode, type Zone };

/** Date all rates below were last checked against primary sources. */
export const VERIFIED = "2026-06-22";

/* --------------------------------------------------------------- STC */

/** Last year STCs can be created (SRES legislated end). */
export const STC_SCHEME_END_YEAR = 2030;

/**
 * Assumed STC trade price (ex-GST). The CER Clearing House caps at $40;
 * the open market trades a little below after broker/admin fees. We use a
 * conservative default so estimates don't overstate the rebate.
 */
export const STC_PRICE = 38;

/** Deeming period: years from install to the scheme end, inclusive. */
export function deemingYears(installYear: number): number {
  return Math.max(0, STC_SCHEME_END_YEAR + 1 - installYear);
}

export type StcResult = {
  zone: Zone;
  zoneRating: number;
  deemingYears: number;
  stcCount: number;
  stcPrice: number;
  rebate: number;
};

/**
 * STC ("solar rebate") for a PV system.
 * STCs = floor(kW × zoneRating × deemingYears); rebate = STCs × price.
 */
export function calcStc(systemKw: number, postcode: number, installYear: number): StcResult | null {
  const zone = zoneForPostcode(postcode);
  if (zone === null) return null;
  const zoneRating = ZONE_RATING[zone];
  const years = deemingYears(installYear);
  const stcCount = Math.floor(systemKw * zoneRating * years);
  return {
    zone,
    zoneRating,
    deemingYears: years,
    stcCount,
    stcPrice: STC_PRICE,
    rebate: stcCount * STC_PRICE,
  };
}

/* -------------------------------------------- Federal battery rebate */

/**
 * Cheaper Home Batteries Program — tiered from 1 May 2026.
 * Full rate ≈ 6.8 STC/kWh × ~$37 ≈ $252 per usable kWh, then tapered:
 *   0–14 kWh    100%
 *   14–28 kWh    60%
 *   28–50 kWh    15%
 *   above 50 kWh  0% (no support)
 */
export const FED_BATTERY_FULL_RATE = 252; // $ per usable kWh
const FED_TIERS: [limit: number, factor: number][] = [
  [14, 1.0],
  [28, 0.6],
  [50, 0.15],
];

export function calcFederalBatteryRebate(usableKwh: number): number {
  if (usableKwh <= 0) return 0;
  let rebate = 0;
  let prev = 0;
  for (const [limit, factor] of FED_TIERS) {
    const slice = Math.max(0, Math.min(usableKwh, limit) - prev);
    rebate += slice * FED_BATTERY_FULL_RATE * factor;
    prev = limit;
  }
  return Math.round(rebate);
}

/* ----------------------------------------------------- State lookup */

export type StateCode = "NSW" | "VIC" | "QLD" | "SA" | "WA" | "TAS" | "ACT" | "NT";

/** Map an AU postcode to its state/territory (standard Australia Post rules). */
export function stateForPostcode(pc: number): StateCode | null {
  if (pc >= 200 && pc <= 299) return "ACT";
  if ((pc >= 2600 && pc <= 2618) || (pc >= 2900 && pc <= 2920)) return "ACT";
  if ((pc >= 1000 && pc <= 2599) || (pc >= 2619 && pc <= 2899) || (pc >= 2921 && pc <= 2999)) return "NSW";
  if ((pc >= 3000 && pc <= 3999) || (pc >= 8000 && pc <= 8999)) return "VIC";
  if ((pc >= 4000 && pc <= 4999) || (pc >= 9000 && pc <= 9999)) return "QLD";
  if (pc >= 5000 && pc <= 5999) return "SA";
  if (pc >= 6000 && pc <= 6999) return "WA";
  if (pc >= 7000 && pc <= 7999) return "TAS";
  if (pc >= 800 && pc <= 999) return "NT";
  return null;
}

export type StateScheme = {
  name: string;
  /** Plain-language status of the current battery/solar incentive. */
  battery: string;
  url: string;
};

/**
 * State-level battery/solar incentives. These change often and many are
 * loans rather than cash rebates, so we describe + link rather than bake in
 * a number we can't keep current. The federal rebate above is the precise,
 * calculable figure; state support is shown as guidance.
 */
export const STATE_SCHEMES: Record<StateCode, StateScheme> = {
  NSW: {
    name: "New South Wales",
    battery: "Peak Demand Reduction Scheme (PDRS) battery incentive + VPP connection bonus.",
    url: "https://www.energy.nsw.gov.au/households/rebates-grants-and-schemes",
  },
  VIC: {
    name: "Victoria",
    battery: "Solar Victoria interest-free battery loans (eligibility applies).",
    url: "https://www.solar.vic.gov.au/",
  },
  QLD: {
    name: "Queensland",
    battery: "Battery rebates run periodically — check current round before quoting.",
    url: "https://www.qld.gov.au/housing/buying-owning-home/energy-water-home/solar",
  },
  SA: {
    name: "South Australia",
    battery: "No active state battery cash rebate; retailer VPP plans available.",
    url: "https://www.sa.gov.au/topics/energy-and-environment",
  },
  WA: {
    name: "Western Australia",
    battery: "WA Residential Battery Scheme rebate (Synergy/Horizon network areas).",
    url: "https://www.wa.gov.au/service/energy-and-environment",
  },
  TAS: {
    name: "Tasmania",
    battery: "Energy Saver Loan Scheme — interest-free finance for batteries.",
    url: "https://www.energy.tas.gov.au/",
  },
  ACT: {
    name: "Australian Capital Territory",
    battery: "Sustainable Household Scheme — zero-interest loans for batteries.",
    url: "https://www.climatechoices.act.gov.au/policy-programs/sustainable-household-scheme",
  },
  NT: {
    name: "Northern Territory",
    battery: "Home and Business Battery Scheme grant (subject to current funding).",
    url: "https://nt.gov.au/environment/energy",
  },
};

/* --------------------------------------------------- Combined result */

export type RebateInput = {
  systemKw: number;
  postcode: number;
  batteryUsableKwh: number;
  installYear?: number;
};

export type RebateResult = {
  stc: StcResult;
  federalBattery: number;
  state: StateCode;
  stateScheme: StateScheme;
  total: number; // STC + federal battery (calculable figures only)
};

/** Full rebate estimate for a postcode + system + optional battery. */
export function calcRebates(input: RebateInput): RebateResult | null {
  const installYear = input.installYear ?? new Date().getFullYear();
  const stc = calcStc(input.systemKw, input.postcode, installYear);
  const state = stateForPostcode(input.postcode);
  if (!stc || !state) return null;

  const federalBattery = calcFederalBatteryRebate(input.batteryUsableKwh);
  return {
    stc,
    federalBattery,
    state,
    stateScheme: STATE_SCHEMES[state],
    total: stc.rebate + federalBattery,
  };
}

export function money(n: number): string {
  return "$" + Math.round(n).toLocaleString();
}
