import type { Metadata } from "next";
import { SITE_NAME, SITE_LOCALE, IS_INDEXABLE, absoluteUrl } from "./site";

export type PageSeo = {
  /**
   * Without the brand — the root template appends " · Kratos Energy" (16
   * chars), so keep this at or under ~45 to avoid truncation in results.
   */
  title: string;
  /** 140–158 characters. Lead with a number, name the state or Australia. */
  description: string;
  /** Root-relative path of this page, e.g. "/calculators/solar-rebate". */
  path: string;
  keywords?: string[];
  /** Root-relative or absolute image for OG/Twitter cards. */
  image?: string;
  type?: "website" | "article";
  /** Thin or duplicate-intent pages: keep the links, drop the index. */
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
};

/**
 * Builds a page's Metadata with a self-referencing canonical.
 *
 * Canonicals must be set per page and never in the root layout — Next merges
 * `alternates` down to any page that doesn't define its own, so a canonical in
 * the layout would point every route at one URL.
 */
export function pageMetadata(seo: PageSeo): Metadata {
  const url = absoluteUrl(seo.path);
  const image = seo.image ? absoluteUrl(seo.image) : absoluteUrl("/opengraph-image");
  const blocked = seo.noIndex || !IS_INDEXABLE;

  return {
    title: seo.title,
    description: seo.description,
    ...(seo.keywords ? { keywords: seo.keywords } : {}),
    alternates: {
      canonical: url,
      languages: {
        "en-AU": url,
        "x-default": url,
      },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url,
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      type: seo.type ?? "website",
      images: [{ url: image, width: 1200, height: 630 }],
      ...(seo.publishedTime ? { publishedTime: seo.publishedTime } : {}),
      ...(seo.modifiedTime ? { modifiedTime: seo.modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [image],
    },
    ...(blocked ? { robots: { index: false, follow: true } } : {}),
  };
}
