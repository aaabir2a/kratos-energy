import type { MetadataRoute } from "next";
import { SITE_URL, IS_INDEXABLE } from "@/lib/seo/site";

/**
 * Deliberately does NOT disallow /_next/ — blocking CSS and JS stops Google
 * rendering the page, which costs rankings.
 *
 * Staging is blocked by NEXT_PUBLIC_SITE_URL not matching production. That only
 * works if staging is its own build, so the test. vhost also sets
 * `X-Robots-Tag: noindex` in nginx — see docs/nginx-staging.md.
 */
export default function robots(): MetadataRoute.Robots {
  if (!IS_INDEXABLE) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      {
        // Standard search engines & general web crawlers
        userAgent: "*",
        allow: "/",
      },
      {
        // Explicitly welcome AI Search & Answer engines for GEO citations
        userAgent: [
          "OAI-SearchBot",
          "ChatGPT-User",
          "GPTBot",
          "PerplexityBot",
          "ClaudeBot",
          "Claude-Web",
          "Applebot-Extended",
        ],
        allow: "/",
      },
      {
        // Block aggressive high-frequency scrapers that consume VPS bandwidth without SEO/GEO value
        userAgent: [
          "Bytespider",
          "CCBot",
          "Amazonbot",
        ],
        disallow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
