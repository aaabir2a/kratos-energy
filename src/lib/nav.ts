export type NavChild = { label: string; href: string };

export type NavLink = {
  label: string;
  /** Route or "/#anchor" for a homepage section. */
  href: string;
  /** Optional dropdown children. */
  menu?: NavChild[];
};

export type ProductSubcategory = {
  label: string;
  href: string;
  description: string;
};

export type ProductCategory = {
  id: string;
  label: string;
  description: string;
  icon: string;
  href?: string;
  subcategories?: ProductSubcategory[];
  customContent?: {
    title: string;
    text: string;
    points: string[];
    ctaText: string;
    ctaHref: string;
  };
};

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: "residential",
    label: "Residential Systems",
    description: "High-performance solar and battery solutions tailored for Australian homes to maximise your energy savings.",
    icon: "sun",
    subcategories: [
      { label: "6.6kW System", href: "/systems/6-6kw", description: "Our most popular size, ideal for standard 2–4 person homes." },
      { label: "10.12kW System", href: "/systems/10kw", description: "Perfect for medium homes with higher usage or ducted air-con." },
      { label: "13.2kW System", href: "/systems/13-2kw", description: "Designed for larger families, high energy loads, or battery readiness." },
      { label: "Customised Solution", href: "/get-a-quote", description: "Custom-designed solar and storage layouts matching your exact needs." }
    ]
  },
  {
    id: "commercial",
    label: "Commercial Systems",
    description: "Scalable commercial solar solutions designed to reduce operating costs and meet corporate sustainability goals.",
    icon: "building",
    subcategories: [
      { label: "30kW System", href: "/systems/30kw", description: "Cut overheads for cafés, local medical clinics, and small offices." },
      { label: "50kW System", href: "/systems/50kw", description: "Standard configuration for small-medium warehouses and industrial units." },
      { label: "100kW System", href: "/systems/100kw", description: "Our largest standard commercial configuration for high-yield operations." },
      { label: "Customised System", href: "/get-a-quote", description: "Tailored multi-inverter configurations with utility grid connection support." }
    ]
  },
  {
    id: "large-scale",
    label: "Large Scale Systems",
    description: "Utility-scale installations requiring comprehensive planning, expert engineering, and seamless grid connection.",
    icon: "zap",
    href: "/systems/large-scale",
    customContent: {
      title: "Utility & Grid-Scale Installations",
      text: "Large-scale solar installations require meticulous planning, site assessment, grid connection studies, and engineering design. Kratos Energy manages the entire lifecycle from feasibility studies to construction and connection, ensuring maximum yield and investment returns.",
      points: [
        "Comprehensive grid connection & feasibility studies",
        "Utility-scale engineering design and structural certification",
        "Procurement of premium Tier-1 utility grade equipment",
        "CEC accredited commercial project managers & installers",
      ],
      ctaText: "Consult Our Enterprise Team",
      ctaHref: "/contact"
    }
  }
];

/**
 * Primary site navigation. All links are real routes or homepage
 * anchors ("/#id"), so they work from any page.
 */
export const NAV: NavLink[] = [
  {
    label: "Our Services",
    href: "/#services",
    menu: [
      { label: "Residential Solar", href: "/residential-solar" },
      { label: "Commercial Solar", href: "/commercial-solar" },
      { label: "Battery Storage", href: "/battery-storage" },
      { label: "EV Charging", href: "/ev-charging" },
      { label: "Maintenance & Support", href: "/support" },
    ],
  },
  {
    label: "Our Products",
    href: "/#systems",
    // Handled customly via PRODUCT_CATEGORIES in SiteHeader and MobileMenu
  },
  {
    label: "Solar Savings",
    href: "/savings-calculator",
    menu: [
      { label: "All Calculators", href: "/calculators" },
      { label: "Savings Calculator", href: "/savings-calculator" },
      { label: "Solar Rebate Calculator", href: "/calculators/solar-rebate" },
      { label: "Battery Rebate Calculator", href: "/calculators/battery-rebate" },
      { label: "Solar Output Calculator", href: "/calculators/solar-output" },
      { label: "Feed-in Tariff Calculator", href: "/calculators/feed-in-tariff" },
      { label: "EV Charging Cost", href: "/calculators/ev-charging-cost" },
      { label: "Solar by State", href: "/solar" },
      { label: "Build Your System", href: "/build" },
      { label: "Government Rebates", href: "/rebates" },
      { label: "Finance & $0 Upfront", href: "/finance" },
    ],
  },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "News", href: "/news" },
  // { label: "Refer", href: "/refer" },
  { label: "Contact", href: "/contact" },
];

/** Phone number used across the site chrome. */
export const PHONE = "1300 089 547";
export const PHONE_HREF = "tel:1300089547";
export const EMAIL = "info@kratos-energy.com";
