# Google Search Console Audit, Action Plan & Rank-Up Strategy
**Domain:** `https://kratos-energy.com`  
**Frontend Repository:** `kratos-energy` (Next.js 14/15 App Router)  
**Backend Repository:** `kratos-energy-backend` (Express, Prisma, PostgreSQL)  
**Date of Audit:** September 8, 2026  

---

## 1. Executive Summary & GSC Reports Breakdown

Based on the Google Search Console (GSC) export files:
1. `conanical tag issue page list.xlsx`
2. `crawled but currently not indexed.xlsx`
3. `discovered - currently not indexed.xlsx`
4. `kratos-energy.com-Coverage-2026-09-08.xlsx`

### Overview of Issues
* **Not Found (404):** 51 URLs (Legacy WordPress & old site paths returning 404 without 301 redirects).
* **Alternate page with proper canonical tag:** 8 URLs (7 URLs caused by `www` vs `non-www` dual-serving; 1 URL caused by trailing slash `/`).
* **Crawled – currently not indexed:** 11 URLs (Dynamic OG image route, PWA manifest, legacy WordPress tag pages with raw spaces, unindexed query strings).
* **Discovered – currently not indexed:** 12 URLs (Malformed URLs containing single quote `'` and newline `\n`, plus orphaned calculator/state pages).

---

## 2. Root Cause Analysis by GSC Report

### A. Canonical Tag Issues (`conanical tag issue page list.xlsx`)
**Status:** *Alternate page with proper canonical tag*
* `https://www.kratos-energy.com/`
* `https://www.kratos-energy.com/calculators`
* `https://www.kratos-energy.com/support`
* `https://www.kratos-energy.com/packages/100kw`
* `https://www.kratos-energy.com/contact`
* `https://www.kratos-energy.com/news`
* `https://www.kratos-energy.com/calculators/solar-rebate`
* `https://kratos-energy.com/blog/commercial-solar-for-nsw-businesses-how-to-cut-operating-costs-by-6/`

#### Why this happens:
1. **`www` vs `non-www` dual-serving:**
   * Canonical URL is defined as `https://kratos-energy.com` (non-www) in `src/lib/seo/site.ts`.
   * When crawlers request `https://www.kratos-energy.com`, the server returns **HTTP 200 OK** with a `<link rel="canonical" href="https://kratos-energy.com/...">`.
   * Because there is no **HTTP 301 Permanent Redirect** from `www` to `non-www`, Google crawls both hostnames and flags all `www` pages as duplicate/alternate pages.
2. **Trailing slash discrepancy:**
   * URL #8 ends with a `/`. Next.js serves routes without trailing slashes, but the slug in the CMS was saved with a trailing slash, resulting in two conflicting URLs.

---

### B. Crawled – Currently Not Indexed (`crawled but currently not indexed.xlsx`)
* `https://kratos-energy.com/opengraph-image`: Next.js dynamic image endpoint (`image/png`) linked via `<meta property="og:image">`. Crawled by Googlebot web search crawler instead of Googlebot-Image.
* `https://www.kratos-energy.com/manifest.webmanifest`: PWA manifest file crawled on `www.`.
* `https://www.kratos-energy.com/systems/50kw`: Legacy route crawled on `www.`.
* `https://www.kratos-energy.com/news/tag/6.6kW solar price`  
* `https://www.kratos-energy.com/news/tag/commercial battery storage`  
* `https://www.kratos-energy.com/news/tag/solar battery NSW rebate`:  
  Legacy WordPress tag URLs containing raw spaces. Next.js does not implement `/news/tag/*`, resulting in empty/404 responses.
* `https://www.kratos-energy.com/news?format=rss`: Legacy WordPress RSS query string.
* `https://www.kratos-energy.com/our-projects/`: Old WordPress portfolio route missing a 301 redirect to `/projects`.
* `https://kratos-energy.com/?ref=aftership`: Tracking parameter crawled without canonical exclusion.
* `https://www.kratos-energy.com/blog/commercial-solar-nsw-businesses` & `solar-battery-roi-guide-nsw`: Old blog slugs requested on `www.`.

---

### C. Discovered – Currently Not Indexed (`discovered - currently not indexed.xlsx`)
* `"https://kratos-energy.com/blog/nsw-solar-rebates-your-complete-guide-to-claiming-thousands-in-government-incentives'"`:  
  **CRITICAL:** Trailing single quote (`'`) in the slug saved in the CMS.
* `https://kratos-energy.com/projects/50 kw Commercial Solar System with 48 \nkwh Battery in Chester Hill, Sydney`:  
  **CRITICAL:** Literal newline (`\n`) and unencoded spaces in the title injected into the XML sitemap.
* `/calculators/battery-rebate`, `/calculators/ev-charging-cost`, `/calculators/feed-in-tariff`, `/finance`, `/solar/act`, `/packages/10kw`:  
  High-value pages present in the XML sitemap but buried too deep without strong internal link equity from top-level menus and body content.

---

## 3. Changes in `kratos-energy` (Frontend Next.js)

### File 1: `next.config.mjs`
**Purpose:** Force 301 redirects for `www` → `non-www`, normalize trailing slashes, and map legacy WordPress routes.

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  trailingSlash: false, // Enforce no-trailing-slash policy

  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2678400,
    remotePatterns: [
      { protocol: "http", hostname: "75.119.149.137", port: "9000", pathname: "/blogs/**" },
      { protocol: "http", hostname: "75.119.149.137", port: "9000", pathname: "/kratos-uploads/**" },
      { protocol: "https", hostname: "api.kratos-energy.com", pathname: "/blogs/**" },
      { protocol: "https", hostname: "api.kratos-energy.com", pathname: "/kratos-uploads/**" },
    ],
  },

  async redirects() {
    return [
      // 1. Force www -> non-www (Fixes 7 of 8 Canonical Tag issues)
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.kratos-energy.com" }],
        destination: "https://kratos-energy.com/:path*",
        permanent: true,
      },

      // 2. Legacy WordPress & renamed routes (Fixes Crawled Not Indexed & 404s)
      { source: "/our-projects", destination: "/projects", permanent: true },
      { source: "/our-projects/:path*", destination: "/projects", permanent: true },
      { source: "/news/tag/:tag*", destination: "/news", permanent: true },
      { source: "/systems/:slug", destination: "/packages/:slug", permanent: true },
      { source: "/systems", destination: "/packages/large-scale", permanent: true },
      { source: "/battery-storage", destination: "/products/battery", permanent: true },
      { source: "/ev-charging", destination: "/products/ev-charging", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },

      // 3. Fix the specific malformed URL discovered by Google
      {
        source: "/blog/nsw-solar-rebates-your-complete-guide-to-claiming-thousands-in-government-incentives'",
        destination: "/blog/nsw-solar-rebates-your-complete-guide-to-claiming-thousands-in-government-incentives",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
```

---

### File 2: `src/lib/seo/dynamicUrls.ts`
**Purpose:** Sanitize project titles to remove newlines (`\n`) and generate valid, search-friendly slugs in the sitemap.

```typescript
function cleanProjectSlug(title: string): string {
  return title
    .replace(/[\r\n]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

async function fetchProjectEntries(): Promise<SitemapEntry[]> {
  const projects = await getProjectsServer(200);
  return projects
    .filter((p) => p.title)
    .map((p) => ({
      loc: absoluteUrl(`/projects/${cleanProjectSlug(p.title)}`),
      lastmod: w3cDate(p.projectDate ?? p.createdAt),
      changefreq: "yearly" as const,
      priority: 0.5,
    }));
}
```

---

### File 3: `src/app/projects/[title]/page.tsx`
**Purpose:** Match projects by sanitized slug while retaining backwards compatibility for legacy decoded titles.

```typescript
function slugify(text: string): string {
  return text
    .replace(/[\r\n]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export default async function ProjectPage({ params }: Params) {
  const { title } = await params;
  const decoded = decodeURIComponent(title);
  const targetSlug = slugify(decoded);

  const projects = await getProjectsServer(100);
  const project = projects.find(
    (p) =>
      slugify(p.title) === targetSlug ||
      p.title.toLowerCase() === decoded.toLowerCase()
  );

  if (!project) notFound();
  // ...
}
```

---

### File 4: `src/app/robots.ts`
**Purpose:** Prevent dynamic image generator routes and marketing query strings from being indexed as HTML documents.

```typescript
return {
  rules: [
    {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/opengraph-image*",
        "/twitter-image*",
        "/*?ref=*",
        "/*?format=rss",
      ],
    },
  ],
  sitemap: `${SITE_URL}/sitemap.xml`,
  host: SITE_URL,
};
```

---

### File 5: `src/lib/nav.ts` & `src/components/layout/Footer.tsx`
**Purpose:** Provide internal link equity to pages currently stuck in "Discovered - not indexed".
* Expand **Solar Savings** in `src/lib/nav.ts` dropdown to include:
  * Solar Rebate Calculator (`/calculators/solar-rebate`)
  * Battery Rebate Calculator (`/calculators/battery-rebate`)
  * Feed-in Tariff Guide (`/calculators/feed-in-tariff`)
  * EV Charging Cost (`/calculators/ev-charging-cost`)
* Add links in `src/app/solar/[state]/page.tsx` to cross-link `/solar/nsw`, `/solar/vic`, and `/solar/act`.

---

## 4. Changes in `kratos-energy-backend` (CMS & API)

> [!IMPORTANT]
> **Production Database Safety:**
> No tables are dropped, no schemas are reset, and no breaking column constraints are added. All database records remain intact.

### 1. Slug Sanitization in CMS Admin
**File:** `frontend/src/features/blogs/BlogPostEditorPage.tsx`  
Strip illegal characters, quotes, and slashes when editing or saving blog posts:

```typescript
function sanitizeSlug(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/['"’]/g, "")           // Strip quotes
    .replace(/\/+$/, "")             // Strip trailing slashes
    .replace(/[^a-z0-9]+/g, "-")    // Replace invalid characters with hyphens
    .replace(/(^-|-$)+/g, "");       // Trim leading/trailing hyphens
}
```

---

### 2. Slug & Title Validation in Backend API
**Files:**
* `backend/src/modules/blogs/blogs.routes.ts`:
  Add transform to Zod `postSchema` to ensure slugs are always clean lowercase strings without quotes or trailing slashes:
  ```typescript
  slug: z.string().min(1).transform((v) =>
    v.trim().toLowerCase().replace(/['"’]/g, "").replace(/\/+$/, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")
  ),
  ```
* `backend/src/modules/projects/projects.schema.ts`:
  Transform project titles to collapse line breaks:
  ```typescript
  title: z.string().min(2).max(200).transform((v) => v.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim()),
  ```
* `backend/src/modules/projects/projects.service.ts`:
  In `publicList()`, add a computed `slug` on-the-fly (`slugify(p.title)`) so the public API provides clean URLs without altering the database schema.

---

### 3. Immediate Data Fixes in Production CMS
Log into the production CMS panel and perform these 3 edits:
1. **Blog Post with Single Quote:**  
   Slug: `nsw-solar-rebates-your-complete-guide-to-claiming-thousands-in-government-incentives'`  
   → Edit to: `nsw-solar-rebates-your-complete-guide-to-claiming-thousands-in-government-incentives`
2. **Blog Post with Trailing Slash:**  
   Slug: `commercial-solar-for-nsw-businesses-how-to-cut-operating-costs-by-6/`  
   → Edit to: `commercial-solar-for-nsw-businesses-how-to-cut-operating-costs-by-6`
3. **Project with Linebreak:**  
   Title: `50 kw Commercial Solar System with 48 \nkwh Battery in Chester Hill, Sydney`  
   → Remove the newline between `48` and `kwh`.

---

## 5. Google Rank Up Strategy for `kratos-energy.com`

### Pillar 1: Technical SEO & Indexation Recovery (Immediate)
1. **Submit Validation in GSC:**  
   After deploying the `www` → `non-www` redirect and slug fixes, request validation for:
   * *Alternate page with proper canonical tag*
   * *Discovered - currently not indexed*
2. **Recover 51 404 Errors:**  
   Map each of the 51 404 URLs in `next.config.mjs` to its current counterpart to reclaim past backlink equity.

### Pillar 2: Commercial Intent & Australian Solar Content
1. **High-ROI Commercial Keywords:**  
   Target queries such as:
   * *"Commercial solar NSW payback period"*
   * *"30kW 50kW 100kW solar cost Australia"*
   * *"Peak Demand Reduction Scheme (PDRS) battery incentives"*
   * *"Instant Asset Write-Off for commercial solar 2026"*
2. **Federal Battery Rebate Hub:**  
   Capitalize on the **Cheaper Home Batteries** scheme on `/calculators/battery-rebate` with exact financial projections and state comparisons.
3. **Suburb/Region Expansion:**  
   Expand programmatic solar landing pages for key service areas:
   * `/solar/sydney`, `/solar/wollongong`, `/solar/illawarra`, `/solar/act`

### Pillar 3: E-E-A-T & Local Authority
1. **Google Business Profile (GBP):**  
   Ensure exact NAP matching between your footer and GBP:  
   *SmartSpace, Suite 66, 1st Floor, Enterprise 1, Innovation Campus, Squires Way, North Wollongong NSW 2500*
2. **Accreditations in Schema:**  
   Highlight **Clean Energy Council (CEC) Approved Solar Retailer** and **NET Approved Seller** badges with JSON-LD schema markup.
3. **Real Installation Case Studies:**  
   Each project in `/projects` should specify system size, hardware brands (GoodWe, Sungrow, Tesla), and suburb name.

### Pillar 4: GEO (Generative Engine Optimization for AI Search)
1. Use HTML `<table>` elements with semantic headers for rebate schedules, tariff comparisons, and system sizes.
2. Structure key sections as direct Q&A blocks (40–50 words) to feed Google AI Overviews, ChatGPT Search, and Perplexity.
