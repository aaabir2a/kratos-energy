/**
 * State/territory metadata for the programmatic location pages
 * (`/solar/[state]`). Pairs each state with a representative capital-city
 * postcode so the rebate, generation and tariff engines produce real,
 * location-specific numbers per page.
 */

import { type StateCode } from "./rebates";

export type StateMeta = {
  code: StateCode;
  slug: string;
  name: string;
  capital: string;
  /** Capital-city postcode used to derive STC zone + tariffs for examples. */
  capitalPostcode: number;
  zoneNote: string;
  intro: string;
};

export const STATE_META: StateMeta[] = [
  {
    code: "NSW",
    slug: "nsw",
    name: "New South Wales",
    capital: "Sydney",
    capitalPostcode: 2000,
    zoneNote: "Most of NSW sits in STC Zone 3, with far-western areas in the sunnier Zone 2.",
    intro:
      "New South Wales has strong year-round sun and some of the country's busiest solar suburbs. With grid prices among the higher in the nation, a well-sized system pays back fast.",
  },
  {
    code: "VIC",
    slug: "vic",
    name: "Victoria",
    capital: "Melbourne",
    capitalPostcode: 3000,
    zoneNote: "Victoria is mostly STC Zone 4 — the lowest rating — so system sizing matters more here.",
    intro:
      "Victoria's cooler, cloudier winters mean a little less generation per kW, but lower install costs and solid rebates keep solar very worthwhile across the state.",
  },
  {
    code: "WA",
    slug: "wa",
    name: "Western Australia",
    capital: "Perth",
    capitalPostcode: 6000,
    zoneNote: "Perth sits in STC Zone 3, while WA's vast north climbs into Zones 1 and 2.",
    intro:
      "Perth enjoys some of the highest generation per kW of any capital. WA's Distributed Energy Buyback Scheme also rewards evening exports, making batteries especially valuable.",
  },
];

export function stateBySlug(slug: string): StateMeta | undefined {
  return STATE_META.find((s) => s.slug === slug);
}
