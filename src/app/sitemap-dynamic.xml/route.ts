/**
 * CMS-driven URLs — blog posts, news articles and projects.
 *
 * No `dynamic` export on purpose: `force-dynamic` would flip the segment's
 * fetch cache to no-store and defeat the per-fetch revalidate, while
 * `force-static` would freeze the data. A bare `revalidate` gives clean ISR —
 * prerendered at build, refreshed hourly in the background.
 */

import { renderUrlset, xmlResponse } from "@/lib/seo/sitemap";
import { getDynamicSitemapEntries } from "@/lib/seo/dynamicUrls";

export const revalidate = 3600;

export async function GET(): Promise<Response> {
  const { entries, degraded } = await getDynamicSitemapEntries();
  if (degraded) {
    console.error("[sitemap-dynamic] CMS unreachable — serving fallback URLs");
  }
  return xmlResponse(renderUrlset(entries));
}
