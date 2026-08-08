/**
 * Sitemap index — the single URL submitted to Search Console.
 *
 * Note: `src/app/sitemap.ts` must never be created; it would claim this same
 * path via the metadata file convention and break the build.
 */

import { absoluteUrl } from "@/lib/seo/site";
import { renderSitemapIndex, xmlResponse } from "@/lib/seo/sitemap";
import { STATIC_ROUTES_LASTMOD } from "@/lib/seo/routes";

export const dynamic = "force-static";
export const revalidate = 86400;

export function GET(): Response {
  return xmlResponse(
    renderSitemapIndex([
      { loc: absoluteUrl("/sitemap-static.xml"), lastmod: STATIC_ROUTES_LASTMOD },
      // No lastmod for the dynamic child: the index can't know it without
      // duplicating the CMS fetch, and a wrong date is worse than none.
      { loc: absoluteUrl("/sitemap-dynamic.xml") },
    ]),
  );
}
