/**
 * Equipment brands shown on the /products/solar carousels.
 *
 * `logo` is an optional path under /public. Where it is absent the carousel
 * falls back to a wordmark chip — the same approach BrandWall already takes,
 * so the page is complete either way. Drop a licensed SVG/PNG into
 * public/assets/brands/ and set `logo` here to switch a brand over.
 *
 * The logo files in public/assets/brands/ were taken from each manufacturer's
 * own site rather than a licensed press kit; check authorised-reseller terms
 * before adding a brand whose marks we are not cleared to display.
 */
export type Brand = {
  name: string;
  /** One line on what they make — used as the chip's accessible label. */
  note: string;
  logo?: string;
};

export const INVERTER_BRANDS: Brand[] = [
  {
    name: "FoxESS",
    note: "Hybrid and string inverters with battery-ready storage",
    logo: "/assets/brands/foxess.png",
  },
  {
    name: "GoodWe",
    note: "Long-standing hybrid range, strong warranty support",
    logo: "/assets/brands/goodwe.svg",
  },
  {
    name: "Sungrow",
    note: "One of the world's largest inverter manufacturers",
    logo: "/assets/brands/sungrow.svg",
  },
  {
    // Awaiting a logo file — their site blocks automated downloads.
    name: "Sigenergy",
    note: "All-in-one inverter, battery and EV charging stack",
  },
  {
    name: "ESY Sunhome",
    note: "Integrated hybrid inverter and storage systems",
    logo: "/assets/brands/esy-sunhome.webp",
  },
  {
    name: "Sofar Solar",
    note: "Single and three-phase hybrids for homes and business",
    logo: "/assets/brands/sofar.svg",
  },
];

export const BATTERY_BRANDS: Brand[] = [
  {
    name: "Fox ESS",
    note: "Modular home batteries, stackable as your usage grows",
    logo: "/assets/brands/foxess.png",
  },
  {
    // Awaiting a logo file — their site blocks automated downloads.
    name: "Sigenergy",
    note: "All-in-one battery, inverter and EV charging stack",
  },
  {
    name: "GoodWe",
    note: "Hybrid-matched storage with blackout backup",
    logo: "/assets/brands/goodwe.svg",
  },
];

/** Panels plus the racking and mounting hardware that puts them on the roof. */
export const PANEL_BRANDS: Brand[] = [
  {
    name: "Trina Solar",
    note: "Tier 1 modules with a 25-year product warranty",
    logo: "/assets/brands/trina.svg",
  },
  {
    name: "Jinko Solar",
    note: "Tier 1 N-type panels, high yield per square metre",
    logo: "/assets/brands/jinko.png",
  },
  {
    // Awaiting a logo file — their site blocks automated downloads.
    name: "Clenergy",
    note: "Mounting rails and roof attachment systems",
  },
  {
    // Symbol only: the wordmark version they publish is white-on-transparent,
    // which would vanish against the chip. Swap if we get a dark wordmark.
    name: "Mibet",
    note: "Engineered racking and mounting hardware",
    logo: "/assets/brands/mibet.webp",
  },
];
