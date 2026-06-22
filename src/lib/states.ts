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
    code: "QLD",
    slug: "qld",
    name: "Queensland",
    capital: "Brisbane",
    capitalPostcode: 4000,
    zoneNote: "South-east QLD is STC Zone 3; the state's north and west reach the top-rated Zones 1 and 2.",
    intro:
      "The Sunshine State lives up to its name. High irradiance and large roofs make Queensland one of the best places in Australia to go solar — and to add a battery.",
  },
  {
    code: "SA",
    slug: "sa",
    name: "South Australia",
    capital: "Adelaide",
    capitalPostcode: 5000,
    zoneNote: "Adelaide and most of SA fall in STC Zone 3, with the outback north in Zones 1 and 2.",
    intro:
      "South Australia pairs excellent sun with the country's highest grid prices, so self-consuming solar — and storing it in a battery — delivers standout savings.",
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
  {
    code: "TAS",
    slug: "tas",
    name: "Tasmania",
    capital: "Hobart",
    capitalPostcode: 7000,
    zoneNote: "Tasmania is STC Zone 4, so a slightly larger system offsets the cooler climate.",
    intro:
      "Tasmania generates less per kW than the mainland, but among the better feed-in rates and interest-free battery finance keep the numbers attractive.",
  },
  {
    code: "ACT",
    slug: "act",
    name: "Australian Capital Territory",
    capital: "Canberra",
    capitalPostcode: 2600,
    zoneNote: "Canberra and the ACT sit in STC Zone 3 with clear, sunny days much of the year.",
    intro:
      "The ACT combines good sun with one of the country's most generous support programs — the Sustainable Household Scheme offers zero-interest loans for solar and batteries.",
  },
  {
    code: "NT",
    slug: "nt",
    name: "Northern Territory",
    capital: "Darwin",
    capitalPostcode: 800,
    zoneNote: "Darwin is STC Zone 2 and the NT's centre is top-rated Zone 1 — the highest sun in Australia.",
    intro:
      "The Territory has the strongest sunlight in the country. With high generation and a battery grant on offer, NT homes can run on solar almost year-round.",
  },
];

export function stateBySlug(slug: string): StateMeta | undefined {
  return STATE_META.find((s) => s.slug === slug);
}
