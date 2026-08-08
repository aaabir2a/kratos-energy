/** XML serialisation for the sitemap index and its two child sitemaps. */

import { xmlEscape } from "./site";

export type ChangeFreq =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

export type SitemapEntry = {
  /** Absolute URL. */
  loc: string;
  /** W3C date, YYYY-MM-DD. */
  lastmod?: string;
  changefreq?: ChangeFreq;
  priority?: number;
};

/** Normalises any date-ish input to YYYY-MM-DD, or undefined if unusable. */
export function w3cDate(input?: string | Date | null): string | undefined {
  if (!input) return undefined;
  const d = input instanceof Date ? input : new Date(input);
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toISOString().slice(0, 10);
}

function urlNode(e: SitemapEntry): string {
  const parts = [`    <loc>${xmlEscape(e.loc)}</loc>`];
  if (e.lastmod) parts.push(`    <lastmod>${e.lastmod}</lastmod>`);
  if (e.changefreq) parts.push(`    <changefreq>${e.changefreq}</changefreq>`);
  if (typeof e.priority === "number") {
    const p = Math.min(1, Math.max(0, e.priority)).toFixed(1);
    parts.push(`    <priority>${p}</priority>`);
  }
  return `  <url>\n${parts.join("\n")}\n  </url>`;
}

export function renderUrlset(entries: SitemapEntry[]): string {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries.map(urlNode),
    "</urlset>",
    "",
  ].join("\n");
}

export function renderSitemapIndex(children: { loc: string; lastmod?: string }[]): string {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...children.map((c) =>
      [
        "  <sitemap>",
        `    <loc>${xmlEscape(c.loc)}</loc>`,
        ...(c.lastmod ? [`    <lastmod>${c.lastmod}</lastmod>`] : []),
        "  </sitemap>",
      ].join("\n"),
    ),
    "</sitemapindex>",
    "",
  ].join("\n");
}

export function xmlResponse(body: string, cacheControl?: string): Response {
  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control":
        cacheControl ?? "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
