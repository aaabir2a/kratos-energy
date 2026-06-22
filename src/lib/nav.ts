export type NavChild = { label: string; href: string };

export type NavLink = {
  label: string;
  /** Route or "/#anchor" for a homepage section. */
  href: string;
  /** Optional dropdown children. */
  menu?: NavChild[];
};

/**
 * Primary site navigation. All links are real routes or homepage
 * anchors ("/#id"), so they work from any page.
 */
export const NAV: NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "Our Services",
    href: "/#services",
    menu: [
      { label: "Residential Solar", href: "/#systems" },
      { label: "Commercial Solar", href: "/#systems" },
      { label: "Battery Storage", href: "/battery-storage" },
      { label: "EV Charging", href: "/ev-charging" },
      { label: "Maintenance & Support", href: "/support" },
    ],
  },
  {
    label: "Our Products",
    href: "/#systems",
    menu: [
      { label: "6.6kW System", href: "/systems/6-6kw" },
      { label: "10.12kW System", href: "/systems/10kw" },
      { label: "13.2kW System", href: "/systems/13-2kw" },
      { label: "Commercial Systems", href: "/systems/50kw" },
    ],
  },
  {
    label: "Solar Savings",
    href: "/savings-calculator",
    menu: [
      { label: "Savings Calculator", href: "/savings-calculator" },
      { label: "Build Your System", href: "/build" },
      { label: "Government Rebates", href: "/rebates" },
      { label: "Rebate Calculator", href: "/calculators/solar-rebate" },
      { label: "Finance & $0 Upfront", href: "/finance" },
    ],
  },
  { label: "Projects", href: "/#reviews" },
  { label: "Blog", href: "/blog" },
  { label: "Refer", href: "/refer" },
  { label: "About", href: "/#services" },
  { label: "Contact", href: "/get-a-quote" },
];

/** Phone number used across the site chrome. */
export const PHONE = "1300 089 547";
export const PHONE_HREF = "tel:1300089547";
export const EMAIL = "sales@kratos-energy.com";
