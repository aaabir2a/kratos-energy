/** Hand-authored routes — fully known at build time. */

import { absoluteUrl } from "@/lib/seo/site";
import { renderUrlset, xmlResponse } from "@/lib/seo/sitemap";
import { STATIC_ROUTES } from "@/lib/seo/routes";

export const dynamic = "force-static";
export const revalidate = 86400;

export function GET(): Response {
  return xmlResponse(
    renderUrlset(
      STATIC_ROUTES.map((r) => ({
        loc: absoluteUrl(r.path),
        lastmod: r.lastModified,
        changefreq: r.changeFrequency,
        priority: r.priority,
      })),
    ),
  );
}
