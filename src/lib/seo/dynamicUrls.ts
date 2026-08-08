/**
 * Collects the CMS-driven URLs for /sitemap-dynamic.xml.
 *
 * Failure policy: never throw, never return an empty urlset. An empty sitemap
 * tells Google the URLs are gone; a stale one just costs freshness. The last
 * good result is cached in module scope — the standalone server process is
 * long-lived, so it survives between requests within a container lifetime.
 */

import { getProjectsServer } from "@/lib/api";
import { absoluteUrl, postPath } from "./site";
import { w3cDate, type SitemapEntry } from "./sitemap";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://api.kratos-energy.com/api/v1";

/** Hard cap so a bad pagination response can't spin forever. */
const MAX_PAGES = 10;
const PAGE_SIZE = 200;

type ApiPost = {
  slug?: string;
  typeSlug?: string;
  updatedAt?: string;
  publishedAt?: string;
  createdAt?: string;
};

export type DynamicSitemapResult = {
  entries: SitemapEntry[];
  /** True when the API was unreachable and we served a fallback. */
  degraded: boolean;
};

/** Hub URLs, so the file is never empty even on a cold failed start. */
const SEED: SitemapEntry[] = [
  { loc: absoluteUrl("/blog"), changefreq: "daily", priority: 0.6 },
  { loc: absoluteUrl("/news"), changefreq: "daily", priority: 0.6 },
  { loc: absoluteUrl("/projects"), changefreq: "weekly", priority: 0.6 },
];

let lastGood: SitemapEntry[] | null = null;

function isNews(post: ApiPost): boolean {
  return String(post.typeSlug || "").toLowerCase() === "news";
}

async function fetchPostEntries(): Promise<SitemapEntry[]> {
  const entries: SitemapEntry[] = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages && page <= MAX_PAGES) {
    const res = await fetch(
      `${API_BASE}/public/blog/posts?page=${page}&limit=${PAGE_SIZE}`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) throw new Error(`blog posts ${res.status}`);

    const body = await res.json();
    const posts: ApiPost[] = body?.data?.posts ?? [];
    totalPages = Number(body?.data?.pagination?.totalPages) || 1;

    for (const post of posts) {
      if (!post.slug) continue;
      entries.push({
        // Same predicate the /news routes use, so each post lands in exactly
        // one place and never appears under both prefixes.
        loc: absoluteUrl(postPath(isNews(post) ? "news" : "blog", post.slug)),
        lastmod: w3cDate(post.updatedAt ?? post.publishedAt ?? post.createdAt),
        changefreq: "monthly",
        priority: 0.6,
      });
    }

    page += 1;
  }

  return entries;
}

async function fetchProjectEntries(): Promise<SitemapEntry[]> {
  const projects = await getProjectsServer(200);
  return projects
    .filter((p) => p.title)
    .map((p) => ({
      // Must byte-match the links in Projects.tsx — the route segment is the
      // encoded title. Low priority: these URLs churn whenever a CRM title is
      // edited, until the API grows a stable slug.
      loc: absoluteUrl(`/projects/${encodeURIComponent(p.title)}`),
      lastmod: w3cDate(p.projectDate ?? p.createdAt),
      changefreq: "yearly" as const,
      priority: 0.3,
    }));
}

export async function getDynamicSitemapEntries(): Promise<DynamicSitemapResult> {
  const [posts, projects] = await Promise.allSettled([
    fetchPostEntries(),
    fetchProjectEntries(),
  ]);

  const entries: SitemapEntry[] = [];
  if (posts.status === "fulfilled") entries.push(...posts.value);
  if (projects.status === "fulfilled") entries.push(...projects.value);

  // Both sources down, or the CMS returned nothing at all — serve the last
  // known good set rather than publishing an empty file.
  if (entries.length === 0) {
    return { entries: lastGood ?? SEED, degraded: true };
  }

  lastGood = entries;
  return { entries, degraded: posts.status === "rejected" || projects.status === "rejected" };
}
