/**
 * The calculator set — one source of truth for the hub page, the sitewide
 * "related calculators" block and any future links. Keep the order: it drives
 * both the hub grid and the ItemList schema position.
 */

export type Calc = {
  href: string;
  icon: string;
  title: string;
  desc: string;
  tag: string;
  /** Shorter label for the compact related-calculators strip. */
  short: string;
};

export const CALCULATORS: Calc[] = [
  {
    href: "/calculators/solar-rebate",
    icon: "sun",
    title: "Solar Rebate Calculator",
    short: "Solar rebate",
    desc: "Estimate your federal STC solar rebate by postcode, using official Clean Energy Regulator zone ratings.",
    tag: "By postcode",
  },
  {
    href: "/calculators/battery-rebate",
    icon: "battery",
    title: "Battery Rebate Calculator",
    short: "Battery rebate",
    desc: "See your Cheaper Home Batteries rebate per usable kWh, with the tapered 2026 tiers and state support.",
    tag: "Cheaper Home Batteries",
  },
  {
    href: "/savings-calculator",
    icon: "trend",
    title: "Savings & Payback Calculator",
    short: "Savings & payback",
    desc: "Model your yearly bill savings, payback period and 25-year return from going solar.",
    tag: "Bill savings",
  },
  {
    href: "/calculators/solar-output",
    icon: "sun",
    title: "Solar Output Calculator",
    short: "Solar output",
    desc: "Estimate how many kWh your system generates per day, month and year, plus CO₂ avoided.",
    tag: "Generation",
  },
  {
    href: "/calculators/feed-in-tariff",
    icon: "zap",
    title: "Feed-in Tariff Calculator",
    short: "Feed-in tariff",
    desc: "See what your exported solar earns with 2026 feed-in rates by state.",
    tag: "Export earnings",
  },
  {
    href: "/calculators/ev-charging-cost",
    icon: "battery",
    title: "EV Charging Cost Calculator",
    short: "EV charging cost",
    desc: "Compare the yearly cost of charging your EV on solar versus the grid.",
    tag: "EV charging",
  },
  {
    href: "/build",
    icon: "wrench",
    title: "Build Your System",
    short: "Build your system",
    desc: "Design a system from your roof up — panels, inverter, battery and EV charging with live pricing.",
    tag: "System builder",
  },
];

/** Everything except the page you're on, capped. */
export function relatedCalculators(currentPath: string, limit = 3): Calc[] {
  return CALCULATORS.filter((c) => c.href !== currentPath).slice(0, limit);
}
