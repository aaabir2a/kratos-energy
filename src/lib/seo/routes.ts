/**
 * Every hand-authored route on the site, for the static sitemap.
 *
 * `lastModified` is deliberately hand-maintained rather than stamped with the
 * build date: telling Google that all 31 URLs changed on every deploy teaches
 * it that our lastmod is noise, and it stops trusting the signal. Bump the date
 * on a row when you meaningfully edit that page.
 */

import { SYSTEMS } from "@/lib/systems";
import { STATE_META } from "@/lib/states";
import type { ChangeFreq } from "./sitemap";

export type StaticRoute = {
  path: string;
  lastModified: string;
  changeFrequency: ChangeFreq;
  priority: number;
};

const PAGES: StaticRoute[] = [
  { path: "/", lastModified: "2026-08-08", changeFrequency: "weekly", priority: 1.0 },

  // Priority commercial-intent tools.
  { path: "/calculators/solar-rebate", lastModified: "2026-08-08", changeFrequency: "monthly", priority: 0.9 },
  { path: "/build", lastModified: "2026-08-08", changeFrequency: "monthly", priority: 0.9 },
  { path: "/savings-calculator", lastModified: "2026-08-08", changeFrequency: "monthly", priority: 0.9 },
  { path: "/rebates", lastModified: "2026-08-08", changeFrequency: "monthly", priority: 0.9 },

  { path: "/calculators", lastModified: "2026-08-08", changeFrequency: "monthly", priority: 0.8 },
  { path: "/calculators/battery-rebate", lastModified: "2026-08-08", changeFrequency: "monthly", priority: 0.8 },
  { path: "/calculators/solar-output", lastModified: "2026-08-08", changeFrequency: "monthly", priority: 0.8 },
  { path: "/calculators/feed-in-tariff", lastModified: "2026-08-08", changeFrequency: "monthly", priority: 0.8 },
  { path: "/calculators/ev-charging-cost", lastModified: "2026-08-08", changeFrequency: "monthly", priority: 0.8 },
  { path: "/solar", lastModified: "2026-08-08", changeFrequency: "monthly", priority: 0.8 },
  { path: "/residential-solar", lastModified: "2026-08-08", changeFrequency: "monthly", priority: 0.8 },
  { path: "/commercial-solar", lastModified: "2026-08-08", changeFrequency: "monthly", priority: 0.8 },
  { path: "/battery-storage", lastModified: "2026-08-08", changeFrequency: "monthly", priority: 0.8 },

  { path: "/ev-charging", lastModified: "2026-08-08", changeFrequency: "monthly", priority: 0.6 },
  { path: "/finance", lastModified: "2026-08-08", changeFrequency: "monthly", priority: 0.6 },
  { path: "/packages/large-scale", lastModified: "2026-08-08", changeFrequency: "monthly", priority: 0.6 },
  { path: "/projects", lastModified: "2026-08-08", changeFrequency: "weekly", priority: 0.6 },
  { path: "/blog", lastModified: "2026-08-08", changeFrequency: "daily", priority: 0.6 },
  { path: "/news", lastModified: "2026-08-08", changeFrequency: "daily", priority: 0.6 },
  { path: "/contact", lastModified: "2026-08-08", changeFrequency: "yearly", priority: 0.6 },
  { path: "/support", lastModified: "2026-08-08", changeFrequency: "yearly", priority: 0.5 },

  { path: "/luxury-getaway", lastModified: "2026-08-08", changeFrequency: "monthly", priority: 0.3 },
  { path: "/privacy", lastModified: "2026-08-04", changeFrequency: "yearly", priority: 0.3 },
];

/**
 * `/get-a-quote` and `/refer` are intentionally absent — both are noindex
 * conversion pages (see src/lib/seo/metadata.ts).
 */
export const STATIC_ROUTES: StaticRoute[] = [
  ...PAGES,
  ...SYSTEMS.map((s) => ({
    path: `/packages/${s.slug}`,
    lastModified: "2026-08-08",
    changeFrequency: "monthly" as ChangeFreq,
    priority: 0.6,
  })),
  ...STATE_META.map((s) => ({
    path: `/solar/${s.slug}`,
    lastModified: "2026-08-08",
    changeFrequency: "monthly" as ChangeFreq,
    priority: 0.8,
  })),
];

/** Newest hand-maintained date across the static set, for the index lastmod. */
export const STATIC_ROUTES_LASTMOD = STATIC_ROUTES.reduce(
  (max, r) => (r.lastModified > max ? r.lastModified : max),
  "1970-01-01",
);
