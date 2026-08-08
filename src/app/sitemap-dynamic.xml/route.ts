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
    console.error(
      "[sitemap-dynamic] CMS unreachable — serving fallback URLs. " +
        `Check NEXT_PUBLIC_API_BASE (${process.env.NEXT_PUBLIC_API_BASE ?? "unset"}).`,
    );
    // Say so in the file too. Otherwise a short sitemap looks like a bug in
    // the sitemap rather than an unreachable API.
    return xmlResponse(
      renderUrlset(entries).replace(
        "<urlset",
        "<!-- DEGRADED: could not reach the CMS, so this lists fallback URLs only. -->\n<urlset",
      ),
    );
  }

  return xmlResponse(renderUrlset(entries));
}
