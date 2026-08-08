/**
 * Single source of truth for the canonical site URL and the business identity
 * that feeds metadata, sitemaps, robots and JSON-LD.
 *
 * `NEXT_PUBLIC_SITE_URL` is inlined at build time — a container rebuild is
 * required for a change to take effect.
 */

import { PHONE, EMAIL } from "@/lib/nav";
import { SOCIALS } from "@/components/layout/Socials";

export const PRODUCTION_URL = "https://kratos-energy.com";

/** Canonical origin, never with a trailing slash. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || PRODUCTION_URL).replace(/\/+$/, "");

export const SITE_NAME = "Kratos Energy";
export const SITE_LOCALE = "en_AU";

/**
 * Only the real production origin may be indexed. Staging and preview builds
 * set a different NEXT_PUBLIC_SITE_URL and get a blanket disallow.
 */
export const IS_INDEXABLE = SITE_URL === PRODUCTION_URL;

/** Root-relative path → absolute URL. Passes absolute inputs through. */
export function absoluteUrl(path: string = "/"): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Canonical path for a CMS article. The slug is percent-encoded because a few
 * CMS slugs contain characters that are not path-safe (a trailing "/" or "'"),
 * and an unencoded one resolves to a different route than the post it names.
 * For well-formed slugs this is the identity function.
 */
export function postPath(type: "blog" | "news", slug: string): string {
  return `/${type}/${encodeURIComponent(slug)}`;
}

/** Escapes text for use inside an XML element. */
export function xmlEscape(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Serialises JSON-LD for injection into a <script> tag. Escaping "<" stops a
 * CMS-supplied string containing "</script>" from breaking out of the block.
 */
export function jsonLdSafe(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** Business identity — mirrors what the footer displays. */
export const ORG = {
  legalName: "Kratos Energy Pty Ltd",
  foundingDate: "2016",
  phone: PHONE,
  /** E.164 form for structured data. */
  phoneE164: `+61${PHONE.replace(/\D/g, "").replace(/^0/, "")}`,
  email: EMAIL,
  streetAddress: "SmartSpace, Suite 66, 1st Floor, Enterprise 1, Innovation Campus, Squires Way",
  locality: "North Wollongong",
  region: "NSW",
  postalCode: "2500",
  country: "AU",
  /** Matches STATE_META — the states we actually install in. */
  areaServed: ["New South Wales", "Victoria", "Australian Capital Territory"],
  sameAs: SOCIALS.map((s) => s.href),
} as const;
