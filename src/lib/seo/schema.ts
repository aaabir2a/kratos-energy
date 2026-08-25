/**
 * JSON-LD builders. Every URL these emit is absolute, and every node that
 * refers to the business does so by @id rather than repeating the entity.
 *
 * Expectations, so nobody over-invests here: Google restricted FAQPage rich
 * results to government and health sites in 2023 and deprecated HowTo results
 * the same year, and WebApplication has never drawn a SERP visual. These help
 * entity understanding and AI surfaces — they will not produce accordions.
 */

import { SITE_URL, SITE_NAME, ORG, absoluteUrl } from "./site";

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/**
 * "Electrician" is a LocalBusiness subtype, which gives honest local semantics
 * without claiming a walk-in showroom we don't have.
 */
export function organizationLd() {
  return {
    "@type": ["Organization", "Electrician"],
    "@id": ORG_ID,
    name: SITE_NAME,
    legalName: ORG.legalName,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/opengraph-image"),
    },
    image: absoluteUrl("/opengraph-image"),
    telephone: ORG.phoneE164,
    email: ORG.email,
    foundingDate: ORG.foundingDate,
    address: {
      "@type": "PostalAddress",
      streetAddress: ORG.streetAddress,
      addressLocality: ORG.locality,
      addressRegion: ORG.region,
      postalCode: ORG.postalCode,
      addressCountry: ORG.country,
    },
    areaServed: ORG.areaServed.map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: ORG.phoneE164,
      email: ORG.email,
      contactType: "sales",
      areaServed: "AU",
      availableLanguage: "en",
    },
    sameAs: ORG.sameAs,
  };
}

/**
 * No potentialAction/SearchAction — the site has no search route, and claiming
 * one that doesn't exist is a known way to lose trust in your markup.
 */
export function websiteLd() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: "en-AU",
    publisher: { "@id": ORG_ID },
  };
}

/** Organization + WebSite as one graph — mounted once, in the root layout. */
export function siteGraphLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationLd(), websiteLd()],
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function itemListLd(items: { name: string; path: string; description?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.description ? { description: item.description } : {}),
      url: absoluteUrl(item.path),
    })),
  };
}

/** Free browser tool — one per calculator and for the system builder. */
export function calculatorLd(i: {
  name: string;
  description: string;
  path: string;
  featureList?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: i.name,
    description: i.description,
    url: absoluteUrl(i.path),
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    inLanguage: "en-AU",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "AUD" },
    provider: { "@id": ORG_ID },
    ...(i.featureList ? { featureList: i.featureList } : {}),
  };
}

export function howToLd(i: {
  name: string;
  description: string;
  path: string;
  steps: { name: string; text: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: i.name,
    description: i.description,
    url: absoluteUrl(i.path),
    step: i.steps.map((s, idx) => ({
      "@type": "HowToStep",
      position: idx + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

export function serviceLd(i: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: i.name,
    description: i.description,
    url: absoluteUrl(i.path),
    serviceType: i.serviceType,
    provider: { "@id": ORG_ID },
    areaServed: ORG.areaServed.map((name) => ({ "@type": "AdministrativeArea", name })),
  };
}

/**
 * Descriptive only — no `offers`. System prices are "incl. GST, after STC
 * rebate" and the STC price moves with the market, so a machine-readable price
 * would drift from the real one.
 */
export function productLd(i: {
  name: string;
  description: string;
  path: string;
  image?: string;
  brand?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: i.name,
    description: i.description,
    url: absoluteUrl(i.path),
    ...(i.image ? { image: absoluteUrl(i.image) } : {}),
    brand: { "@type": "Brand", name: i.brand ?? SITE_NAME },
    manufacturer: { "@id": ORG_ID },
  };
}

export function articleLd(i: {
  /** schema.org article type — see schemaForPostType() for the CMS mapping. */
  type: "Article" | "BlogPosting" | "NewsArticle";
  headline: string;
  description?: string;
  image?: string;
  authorName?: string;
  datePublished?: string;
  dateModified?: string;
  path: string;
  /** Post tags from the CMS. */
  keywords?: string[];
  /** Category name, e.g. "Guides". */
  articleSection?: string;
  /** Counted from the rendered body, not estimated from read time. */
  wordCount?: number;
}) {
  const url = absoluteUrl(i.path);
  const keywords = i.keywords?.map((k) => k.trim()).filter(Boolean) ?? [];
  return {
    "@context": "https://schema.org",
    "@type": i.type,
    headline: i.headline,
    ...(i.description ? { description: i.description } : {}),
    ...(i.image ? { image: [absoluteUrl(i.image)] } : {}),
    ...(keywords.length ? { keywords: keywords.join(", ") } : {}),
    ...(i.articleSection ? { articleSection: i.articleSection } : {}),
    ...(i.wordCount ? { wordCount: i.wordCount } : {}),
    author: { "@type": "Person", name: i.authorName || SITE_NAME },
    publisher: { "@id": ORG_ID },
    ...(i.datePublished ? { datePublished: i.datePublished } : {}),
    ...(i.dateModified ? { dateModified: i.dateModified } : {}),
    inLanguage: "en-AU",
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    // Ties the post to the WebSite node the root layout emits, so the whole
    // site reads as one entity graph rather than unconnected pages.
    isPartOf: { "@id": WEBSITE_ID },
    // Selectors must match real elements — `.article-excerpt` is set on the
    // post excerpt in the blog and news templates.
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".article-excerpt"],
    },
  };
}
