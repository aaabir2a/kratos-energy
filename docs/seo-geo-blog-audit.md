# SEO & GEO Blog Audit — Kratos Energy

> **Scope:** `src/app/blog/page.tsx` (listing) · `src/app/blog/[slug]/page.tsx` (single post)  
> **Also reviewed:** `src/lib/seo/schema.ts` · `src/lib/seo/metadata.ts` · `src/lib/seo/site.ts`  
> `src/lib/seo/dynamicUrls.ts` · `src/components/blog/BlogBlockRenderer.tsx`  
> CMS: `kratos-energy-backend/frontend/src/features/blogs/`

---

## ✅ What Is Already Working

| Area | Detail |
|------|--------|
| `generateMetadata()` — listing | Title, description, self-referencing canonical with `?page` / `?category` passthrough |
| `generateMetadata()` — single post | `metaTitle`, `metaDescription`, `canonicalUrl`, OG `article` type, Twitter card |
| `BlogPosting` JSON-LD | Emitted via `articleLd()` + `<JsonLd>` on every post page |
| Global `Organization` + `WebSite` JSON-LD | Injected in root layout via `siteGraphLd()` |
| Breadcrumb nav | Present in DOM (`Home › Blog › Post title`) |
| ISR revalidation | `revalidate = 60` on both pages |
| Dynamic sitemap | Blog slugs emitted with `lastmod`, `changefreq`, `priority` |
| `postPath()` | Percent-encodes slugs — prevents duplicate-URL bugs |
| `news` type redirect | `/blog/[slug]` → `/news/[slug]` for news posts; no duplicate indexable URLs |
| CMS SEO fields | `metaTitle`, `metaDescription`, `canonicalUrl` editable in the editor |
| `robots` / `googleBot` | Correctly gated to `IS_INDEXABLE` (prod URL only) |
| Image `alt` | Set on listing cards and featured images |

---

## 🔴 Critical Fixes

### Fix 1 — Add `BreadcrumbList` JSON-LD to `[slug]/page.tsx`

**Problem:** `breadcrumbLd()` exists in `schema.ts` but is never called on the post page.  
The breadcrumb is in the DOM but not in structured data — Google cannot reliably extract it for SERP display.

**File:** `src/app/blog/[slug]/page.tsx`

```tsx
// 1. Import breadcrumbLd
import { articleLd, breadcrumbLd } from "@/lib/seo/schema";

// 2. Inside PostPage(), after schemaJson is built, add:
const breadcrumbJson = breadcrumbLd([
  { name: "Home",           path: "/" },
  { name: "Blog",           path: "/blog" },
  { name: post.title,       path: postPath("blog", post.slug || slug) },
]);

// 3. In the JSX, add a second <JsonLd> alongside the first:
<JsonLd data={schemaJson} />
<JsonLd data={breadcrumbJson} />
```

---

### Fix 2 — Add JSON-LD to the Blog Listing Page

**Problem:** `/blog/page.tsx` emits zero structured data.  
At minimum it needs `BreadcrumbList`; `ItemList` gives AI crawlers a machine-readable post index.

**File:** `src/app/blog/page.tsx`

```tsx
// 1. Add imports
import { breadcrumbLd, itemListLd } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/JsonLd";

// 2. Inside BlogPage(), after fetching posts, build the schemas:
const breadcrumbJson = breadcrumbLd([
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
]);

const itemListJson = itemListLd(
  displayPosts.map((p) => ({
    name:        p.title,
    path:        `/blog/${p.slug}`,
    description: p.excerpt,
  }))
);

// 3. Render before <SiteLayout>:
<>
  <JsonLd data={breadcrumbJson} />
  {displayPosts.length > 0 && <JsonLd data={itemListJson} />}
  <SiteLayout>
    ...
  </SiteLayout>
</>
```

---

### Fix 3 — Extend `articleLd()` with GEO & E-E-A-T Fields

**Problem:** The current `articleLd` output is missing fields that AI crawlers (ChatGPT browsing, Perplexity, Google AI Overviews) use for entity scoring and answer sourcing.

**File:** `src/lib/seo/schema.ts`

```ts
// Extend the input type:
export function articleLd(i: {
  type:            "BlogPosting" | "NewsArticle";
  headline:        string;
  description?:    string;
  image?:          string;
  authorName?:     string;
  datePublished?:  string;
  dateModified?:   string;
  path:            string;
  // ── new fields ──
  keywords?:       string[];   // post tags from CMS
  articleSection?: string;     // category name, e.g. "Solar Rebates"
  wordCount?:      number;     // estimated from block content
}) {
  const url = absoluteUrl(i.path);
  return {
    "@context": "https://schema.org",
    "@type":    i.type,
    headline:   i.headline,
    ...(i.description    ? { description:    i.description }    : {}),
    ...(i.image          ? { image: [absoluteUrl(i.image)] }    : {}),
    ...(i.keywords       ? { keywords:       i.keywords.join(", ") } : {}),
    ...(i.articleSection ? { articleSection: i.articleSection } : {}),
    ...(i.wordCount      ? { wordCount:      i.wordCount }      : {}),
    author:    { "@type": "Person", name: i.authorName || SITE_NAME },
    publisher: { "@id": ORG_ID },
    ...(i.datePublished  ? { datePublished:  i.datePublished }  : {}),
    ...(i.dateModified   ? { dateModified:   i.dateModified }   : {}),
    inLanguage:      "en-AU",
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    isPartOf:         { "@id": WEBSITE_ID },           // links post to WebSite node
    speakable: {                                        // Google AI Overviews signal
      "@type":      "SpeakableSpecification",
      cssSelector:  ["h1", ".article-excerpt", "h2", "h3"],
    },
  };
}
```

**File:** `src/app/blog/[slug]/page.tsx` — pass new fields when calling `articleLd`:

```tsx
const schemaJson = articleLd({
  type:            "BlogPosting",
  headline:        post.title,
  description:     post.excerpt,
  image:           post.featuredImage,
  authorName,
  datePublished:   post.publishedAt || post.createdAt,
  dateModified:    post.updatedAt,
  path:            postPath("blog", post.slug || slug),
  // ── new ──
  keywords:        post.tags?.length ? post.tags : undefined,
  articleSection:  post.categoryName || undefined,
  wordCount:       post.readMins ? post.readMins * 200 : undefined, // ~200 wpm estimate
});
```

---

### Fix 4 — Add `width` / `height` to OG Image on Single Post

**Problem:** The `images` array in `generateMetadata` for posts has no dimensions — social platforms fetch the image to measure it.

**File:** `src/app/blog/[slug]/page.tsx` — inside `generateMetadata`:

```ts
// Before:
images: post.featuredImage ? [{ url: post.featuredImage }] : undefined,

// After:
images: post.featuredImage
  ? [{ url: post.featuredImage, width: 1200, height: 630, alt: post.title }]
  : undefined,
```

Apply the same change to the `twitter` card block:
```ts
twitter: {
  card:   "summary_large_image",
  title:  post.metaTitle || post.title,
  description: post.metaDescription || post.excerpt,
  ...(post.featuredImage
    ? { images: [{ url: post.featuredImage, alt: post.title }] }
    : {}),
},
```

---

### Fix 5 — Pass `tags` to OpenGraph `article`

**Problem:** Post tags exist in the API and DOM but are not forwarded to OG metadata.

**File:** `src/app/blog/[slug]/page.tsx` — inside `generateMetadata`:

```ts
openGraph: {
  title:       post.metaTitle || post.title,
  description: post.metaDescription || post.excerpt,
  url:         absoluteUrl(postPath("blog", post.slug || slug)),
  images:      post.featuredImage
    ? [{ url: post.featuredImage, width: 1200, height: 630, alt: post.title }]
    : undefined,
  type:        "article",
  tags:        post.tags?.length ? post.tags : undefined,  // ← add this
},
```

---

## 🟡 Important SEO Improvements

### Fix 6 — Add `generateStaticParams` to `[slug]/page.tsx`

**Problem:** Without `generateStaticParams`, every blog post page is cold-rendered on first crawler hit. This wastes Google's crawl budget during ISR warm-up.

**File:** `src/app/blog/[slug]/page.tsx`

```ts
export async function generateStaticParams() {
  const base = process.env.NEXT_PUBLIC_API_BASE || "http://192.168.0.220:4000/api/v1";
  try {
    const res = await fetch(`${base}/public/blog/posts?page=1&limit=50`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    const posts = data.data?.posts || [];
    return posts
      .filter((p: { typeSlug?: string }) =>
        String(p.typeSlug || "").toLowerCase() !== "news"
      )
      .map((p: { slug: string }) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}
```

---

### Fix 7 — Fix Accordion Block Crawler Visibility

**Problem:** `AccordionBlock` in `BlogBlockRenderer.tsx` is a `"use client"` component. Collapsed accordion content is **not in the initial HTML payload** — crawlers cannot read it.

**Option A (CSS-only, recommended):** Replace the JS toggle with `<details>` / `<summary>`:

```tsx
function AccordionBlock({ items }: { items?: any[] }) {
  if (!items || !Array.isArray(items)) return null;
  return (
    <div className="my-8 space-y-4">
      {items.map((item, idx) => (
        <details key={idx} className="rounded-xl border border-gray-200 bg-white shadow-sm group open:border-[#8bc34a] open:shadow-md">
          <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-4 font-display font-bold text-[16px] text-gray-900 group-open:text-[#8bc34a]">
            {item.title}
          </summary>
          <div className="px-6 py-5 text-gray-700 text-[15px] leading-relaxed font-body border-t border-[#8bc34a]/20">
            {item.content}
          </div>
        </details>
      ))}
    </div>
  );
}
```

**Option B:** When the post contains an `accordion` block, emit a `FAQPage` JSON-LD alongside `articleLd`:

```tsx
// In [slug]/page.tsx — detect accordion blocks
const faqItems = (post.blocks || [])
  .filter((b: any) => b.type === "accordion")
  .flatMap((b: any) => b.content?.items || [])
  .filter((item: any) => item.title && item.content);

// Then conditionally add JSON-LD:
{faqItems.length > 0 && (
  <JsonLd
    data={{
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((item: any) => ({
        "@type": "Question",
        name:    item.title,
        acceptedAnswer: { "@type": "Answer", text: item.content },
      })),
    }}
  />
)}
```

---

### Fix 8 — Add `readMins` Field to CMS Editor

**Problem:** `readMins` exists in the `BlogPost` API type but the CMS editor has no input for it. The public page falls back to `post.readMins || 5` — always 5 minutes for posts without a value.

**File:** `kratos-energy-backend/frontend/src/features/blogs/BlogPostEditorPage.tsx`

Add inside the **Post Settings** sidebar card, after the author field:

```tsx
<div className="space-y-1.5">
  <Label htmlFor="readMins" className="text-xs font-semibold">
    Read Time (minutes)
  </Label>
  <Input
    id="readMins"
    type="number"
    min={1}
    max={60}
    {...register('readMins', { valueAsNumber: true })}
    placeholder="e.g. 5"
    className="text-xs"
  />
  <p className="text-[10px] text-gray-400">Leave blank to auto-estimate (~200 wpm)</p>
</div>
```

Also add `readMins?: number` to `defaultValues` in the `useForm` call.

---

### Fix 9 — Enforce Non-Empty Alt Text on Image Blocks

**Problem:** The fallback `alt="Blog content image"` in `BlogBlockRenderer.tsx` is meaningless for image search and AI alt-text signals.

**File:** `src/components/blog/BlogBlockRenderer.tsx`

```tsx
// Before:
alt={alt || caption || "Blog content image"}

// After — use a descriptive fallback from context:
alt={alt || caption || `Image in article: ${block.id}`}
```

**In the CMS `ImageBlock.tsx`:** Add a required `alt` field validation so editors are prompted before saving without alt text.

---

## 🟠 GEO (Generative Engine Optimisation) — Additional Signals

These don't affect traditional SERP rankings but improve citation probability in AI-generated answers (Google AI Overviews, Perplexity, ChatGPT browsing, Bing Copilot).

### GEO-1 — `speakable` schema (covered in Fix 3 above)
Already included in the extended `articleLd()`.

### GEO-2 — `about` / `mentions` entity linking
Add to post JSON-LD to tie the article to named entities:

```ts
// In articleLd or directly in [slug]/page.tsx schemaJson:
about: [
  { "@type": "Thing", name: "Solar Energy" },
  { "@type": "Thing", name: "Australian Government Rebates" },
  // Derive from post.tags at runtime
  ...(post.tags || []).map((tag: string) => ({ "@type": "Thing", name: tag })),
],
```

### GEO-3 — Add `hreflang` link for AU geo-targeting

**File:** `src/app/layout.tsx` — inside `<head>`:

```tsx
<link rel="alternate" hrefLang="en-AU" href={SITE_URL} />
```

Or via Next.js `metadata.alternates`:
```ts
alternates: {
  languages: { "en-AU": SITE_URL },
},
```

---

## CMS Field Coverage Matrix

| Field | CMS Editor | API `BlogPost` | Public Page |
|-------|:---:|:---:|:---:|
| `title` | ✅ | ✅ | ✅ |
| `slug` | ✅ auto-gen | ✅ | ✅ |
| `excerpt` | ✅ | ✅ | ✅ |
| `featuredImage` | ✅ upload | ✅ | ✅ |
| `metaTitle` | ✅ | ✅ | ✅ |
| `metaDescription` | ✅ | ✅ | ✅ |
| `canonicalUrl` | ✅ | ✅ | ✅ |
| `tags` | ✅ tag input | ✅ | ✅ DOM, ❌ OG |
| `author` | ✅ | ✅ | ✅ JSON-LD |
| `categoryId` | ✅ select | ✅ | ✅ |
| `typeId` | ✅ select | ✅ | ✅ |
| `readMins` | ❌ **missing** | ✅ field exists | ⚠️ hardcoded `5` fallback |
| `wordCount` | ❌ no display | ❌ not in API | ❌ not in JSON-LD |
| `publishedAt` display | ❌ not shown | ✅ | ✅ used |
| SEO SERP preview | ❌ not in editor | — | — |
| `BreadcrumbList` JSON-LD | — | — | ❌ **missing** |
| `ItemList` JSON-LD on listing | — | — | ❌ **missing** |
| `speakable` in JSON-LD | — | — | ❌ **missing** |
| `articleSection` in JSON-LD | — | — | ❌ **missing** |
| `keywords` in JSON-LD | — | — | ❌ **missing** |

---

## Priority Implementation Order

| Priority | Fix | Effort | SEO / GEO Impact |
|:---:|-----|:---:|:---:|
| 1 | Fix 1 — `BreadcrumbList` JSON-LD on `[slug]/page.tsx` | ⬤ Low | 🔴 High |
| 2 | Fix 2 — `BreadcrumbList` + `ItemList` JSON-LD on listing | ⬤ Low | 🔴 High |
| 3 | Fix 3 — Extend `articleLd` (`keywords`, `articleSection`, `wordCount`, `speakable`, `isPartOf`) | ⬤ Low | 🔴 High (GEO) |
| 4 | Fix 4 — OG image `width` / `height` / `alt` on post page | ⬤ Trivial | 🟡 Medium |
| 5 | Fix 5 — Pass `tags` to OG `article.tags` | ⬤ Trivial | 🟡 Medium |
| 6 | Fix 6 — `generateStaticParams` on `[slug]/page.tsx` | ⬤ Medium | 🔴 High |
| 7 | Fix 7 — Accordion block SSR (details/summary or FAQPage JSON-LD) | ⬤ Medium | 🔴 High (GEO) |
| 8 | Fix 8 — `readMins` field in CMS editor | ⬤ Medium | 🟡 Medium |
| 9 | Fix 9 — Enforce non-empty alt text on image blocks | ⬤ Low | 🟡 Medium |
| 10 | GEO-2 — `about` / `mentions` entity linking | ⬤ Low | 🟠 GEO |
| 11 | GEO-3 — `hreflang` for `en-AU` | ⬤ Trivial | 🟡 Medium |
