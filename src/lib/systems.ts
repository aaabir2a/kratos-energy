export type SystemCategory = "residential" | "commercial";

export type SolarSystem = {
  slug: string;
  category: SystemCategory;
  /** Display size, e.g. "6.6kW". */
  size: string;
  /** Short audience label shown under the size. */
  audience: string;
  /** Marketing one-liner for the detail-page hero. */
  tagline: string;
  /** Recommended retail price (outright), AUD, after rebate. */
  price: number | null;
  /** Indicative daily payment-plan figure, AUD. null = enquire. */
  perDay: number | null;
  /** Payment-plan term in months (for the daily figure). */
  termMonths: number | null;
  /** Estimated annual bill savings, AUD. */
  savingsPerYear: number;
  /** Flagged as the most-recommended card. */
  recommended?: boolean;
  /** Headline spec bullets for the card. */
  specs: string[];
  /** Longer "what's included" list for the detail page. */
  includes: string[];
  /** Key numbers for the detail-page stat band. */
  stats: { value: string; label: string }[];
};

export const SYSTEMS: SolarSystem[] = [
  {
    slug: "6-6kw",
    category: "residential",
    size: "6.6kW",
    audience: "Just right for most family homes",
    tagline: "The most popular size in Australia — ideal for a 2–4 person home.",
    price: 3990,
    perDay: 7,
    termMonths: 21,
    savingsPerYear: 1800,
    specs: [
      "Trina 475W or Jinko panels",
      "5kW power inverter",
      "14 × 475W panels",
      "Single-phase compatible",
    ],
    includes: [
      "Trina 475W or Jinko Tier 1 panels",
      "5kW grid-connect inverter",
      "Cleanergy or Mibet mounting rails",
      "Full design & engineering",
      "CEC-accredited installation",
      "Wi-Fi production monitoring",
      "Grid-connection paperwork handled",
    ],
    stats: [
      { value: "6.6kW", label: "System size" },
      { value: "~26kWh", label: "Daily generation" },
      { value: "$1,800", label: "Annual savings" },
      { value: "25 yr", label: "Panel warranty" },
    ],
  },
  {
    slug: "10kw",
    category: "residential",
    size: "10kW",
    audience: "Medium homes & small businesses",
    tagline: "Headroom for ducted air-con, a pool, or a future battery & EV.",
    price: 5490,
    perDay: 9,
    termMonths: 24,
    savingsPerYear: 2310,
    recommended: true,
    specs: [
      "Trina 475W or Jinko panels",
      "8–10kW power inverter",
      "21 × 475W panels",
      "Battery & EV ready",
    ],
    includes: [
      "Trina 475W or Jinko Tier 1 panels",
      "8–10kW hybrid-ready inverter",
      "Cleanergy or Mibet mounting rails",
      "Full design & engineering",
      "CEC-accredited installation",
      "Wi-Fi production monitoring",
      "Battery & EV-charger pre-wiring",
    ],
    stats: [
      { value: "10kW", label: "System size" },
      { value: "~40kWh", label: "Daily generation" },
      { value: "$2,310", label: "Annual savings" },
      { value: "25 yr", label: "Panel warranty" },
    ],
  },
  {
    slug: "13-2kw",
    category: "residential",
    size: "13kW",
    audience: "Larger homes & small businesses",
    tagline: "Maximum single-phase output for big households and high usage.",
    price: 7990,
    perDay: 10,
    termMonths: 24,
    savingsPerYear: 2900,
    specs: [
      "Trina 475W or Jinko panels",
      "10kW power inverter",
      "27 × 475W panels",
      "Three-phase compatible",
    ],
    includes: [
      "Trina 475W or Jinko Tier 1 panels",
      "10kW grid-connect inverter",
      "Cleanergy or Mibet mounting rails",
      "Full design & engineering",
      "CEC-accredited installation",
      "Wi-Fi production monitoring",
      "Three-phase grid connection",
    ],
    stats: [
      { value: "13kW", label: "System size" },
      { value: "~52kWh", label: "Daily generation" },
      { value: "$2,900", label: "Annual savings" },
      { value: "25 yr", label: "Panel warranty" },
    ],
  },
  {
    slug: "30kw",
    category: "commercial",
    size: "30kW",
    audience: "Low–medium commercial energy use",
    tagline: "Cut overheads for cafés, clinics and small warehouses.",
    price: null,
    perDay: null,
    termMonths: null,
    savingsPerYear: 9800,
    specs: [
      "Tier 1 solar modules",
      "15kW + 15kW inverters",
      "72 × 415W panels",
      "Commercial monitoring",
    ],
    includes: [
      "Tier 1 commercial panels",
      "Dual 15kW inverters",
      "Engineering & DA support",
      "CEC-accredited installation",
      "Live commercial monitoring",
      "Flexible PPA & finance options",
    ],
    stats: [
      { value: "30kW", label: "System size" },
      { value: "~114kWh", label: "Daily generation" },
      { value: "$9,800", label: "Annual savings" },
      { value: "10 yr", label: "Workmanship" },
    ],
  },
  {
    slug: "50kw",
    category: "commercial",
    size: "50kW",
    audience: "Standard commercial & industrial",
    tagline: "Predictable, lower energy costs for warehouses and factories.",
    price: null,
    perDay: null,
    termMonths: null,
    savingsPerYear: 16500,
    recommended: true,
    specs: [
      "Tier 1 solar modules",
      "30kW + 20kW inverters",
      "120 × 415W panels",
      "Commercial monitoring",
    ],
    includes: [
      "Tier 1 commercial panels",
      "30kW + 20kW inverters",
      "Engineering & DA support",
      "CEC-accredited installation",
      "Live commercial monitoring",
      "Flexible PPA & finance options",
    ],
    stats: [
      { value: "50kW", label: "System size" },
      { value: "~190kWh", label: "Daily generation" },
      { value: "$16,500", label: "Annual savings" },
      { value: "10 yr", label: "Workmanship" },
    ],
  },
  {
    slug: "100kw",
    category: "commercial",
    size: "100kW",
    audience: "Large commercial applications",
    tagline: "Our largest standard system — serious offset for serious sites.",
    price: null,
    perDay: null,
    termMonths: null,
    savingsPerYear: 33000,
    specs: [
      "Tier 1 solar modules",
      "50kW + 50kW inverters",
      "240 × 415W panels",
      "SCADA-ready monitoring",
    ],
    includes: [
      "Tier 1 commercial panels",
      "Dual 50kW inverters",
      "Full EPC & engineering",
      "CEC-accredited installation",
      "SCADA-ready monitoring",
      "Custom PPA & finance options",
    ],
    stats: [
      { value: "100kW", label: "System size" },
      { value: "~380kWh", label: "Daily generation" },
      { value: "$33,000", label: "Annual savings" },
      { value: "10 yr", label: "Workmanship" },
    ],
  },
];

export function getSystem(slug: string): SolarSystem | undefined {
  return SYSTEMS.find((s) => s.slug === slug);
}

export function systemsByCategory(cat: SystemCategory): SolarSystem[] {
  return SYSTEMS.filter((s) => s.category === cat);
}

/** Panel, inverter & battery brands we install (CEC-approved). */
export const BRANDS: string[] = [
  "Jinko Solar",
  "Trina Solar",
  "Canadian Solar",
  "LONGi",
  "REC",
  "Fronius",
  "SMA",
  "Sungrow",
  "GoodWe",
  "Tesla Powerwall",
  "Enphase",
  "SolarEdge",
];
