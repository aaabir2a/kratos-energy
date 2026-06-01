export type NavLink = {
  label: string;
  /** Section id to scroll to (homepage anchors for this prototype). */
  id: string;
  /** Optional dropdown children. */
  menu?: { label: string; id: string }[];
};

/**
 * Primary site navigation. Items with a `menu` render a hover dropdown.
 * Ids map to the homepage section anchors; swap for real routes when
 * additional pages are built.
 */
export const NAV: NavLink[] = [
  { label: "Home", id: "top" },
  {
    label: "Our Services",
    id: "services",
    menu: [
      { label: "Residential Solar", id: "services" },
      { label: "Commercial Solar", id: "services" },
      { label: "Battery Storage", id: "services" },
      { label: "Maintenance & Service", id: "services" },
    ],
  },
  {
    label: "Our Products",
    id: "services",
    menu: [
      { label: "Solar Panels", id: "services" },
      { label: "Inverters", id: "services" },
      { label: "Home Batteries", id: "services" },
    ],
  },
  {
    label: "Solar Savings",
    id: "calculator",
    menu: [
      { label: "Savings Calculator", id: "calculator" },
      { label: "Government Rebates", id: "rebate" },
      { label: "Finance & $0 Upfront", id: "quote" },
    ],
  },
  { label: "Our Projects", id: "reviews" },
  { label: "News", id: "reviews" },
  { label: "Blog", id: "reviews" },
  { label: "About Us", id: "services" },
  { label: "Contact", id: "quote" },
];

/** Phone number used across the site chrome. */
export const PHONE = "1300 089 547";
export const PHONE_HREF = "tel:1300089547";
export const EMAIL = "sales@kratos-energy.com";
