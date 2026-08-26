# Blog Type–Driven JSON-LD Schema — Analysis & Implementation Plan

## What You Planned vs What Is Actually Happening

### The Plan

Each blog type should produce its own Schema.org `@type`:

| CMS Blog Type | typeSlug | Intended Schema |
|---|---|---|
| Article | `article` | `Article` / `BlogPosting` |
| FAQ | `faq` | `FAQPage` |
| General Blog | `general-blog` | `BlogPosting` |
| How-To | `how-to` | `HowTo` |
| NEWS | `news` | `NewsArticle` |

### What Is Actually Happening Right Now

```
/blog/[slug]/page.tsx  →  always emits  BlogPosting   (hardcoded, line 190)
/news/[slug]/page.tsx  →  always emits  NewsArticle   (correct for NEWS type)
```

**`faqLd` and `howToLd` exist in `schema.ts` but are never called from any blog post page.**
They are used on static pages (calculators, build, solar/state) but are completely unused for CMS content.

> **The type-based schema routing is not implemented at all on blog post pages.**
> Every Article, FAQ, General Blog, and How-To post receives an identical `BlogPosting` block.

---

## Is Type-Based JSON-LD the Right Architecture?

**Yes — and it is the correct approach, with one important nuance.**

### Why it is right

Schema.org types are not cosmetic labels. Google, Perplexity and ChatGPT use them as ranking signals:

| Schema type | What it unlocks |
|---|---|
| `FAQPage` | FAQ rich results (accordion in SERP), AI answer sourcing from Q&A pairs |
| `HowTo` | Step-based rich results, AI instructions sourcing |
| `NewsArticle` | Google News eligibility, Discover feed, Top Stories carousel |
| `BlogPosting` / `Article` | Entity understanding, citation weight in AI Overviews |

Emitting the wrong type does not cause a penalty, but it throws away a free signal upgrade.

### The one nuance — `FAQPage` and `HowTo` need structured content, not free text

For `faqLd`, Google expects:
```json
{ "name": "What is a solar rebate?", "acceptedAnswer": { "text": "..." } }
```

For `howToLd`, Google expects named steps:
```json
{ "name": "Step 1: Assess your roof", "text": "Detailed instructions..." }
```

The CMS already has the right blocks for both:
- **FAQ posts** use the `accordion` block — `{ items: [{ title, content }] }` maps directly to Q&A pairs
- **How-To posts** use `text` blocks with headings — steps can be extracted from the block array

The only missing piece is the **extraction logic** on the public page, not the content itself.

---

## Current State Audit Per Type

### `article` (typeSlug: `article`)
- **Current:** `BlogPosting` — acceptable (`BlogPosting` is a subtype of `Article`)
- **Optimal:** Switch to `@type: "Article"` (more precise for editorial long-form)
- **Blocker:** None — works today, just not maximally precise

### `general-blog` (typeSlug: `general-blog`)
- **Current:** `BlogPosting` — correct type
- **Optimal:** `BlogPosting` — already the best fit
- **Blocker:** None

### `faq` (typeSlug: `faq`)
- **Current:** `BlogPosting` — **wrong** — loses FAQPage rich result eligibility entirely
- **Optimal:** `FAQPage` (primary) + `BlogPosting` (secondary)
- **Blocker:** Need to extract accordion block items as Q&A pairs at render time

### `how-to` (typeSlug: `how-to`)
- **Current:** `BlogPosting` — **wrong** — loses HowTo rich result eligibility entirely
- **Optimal:** `HowTo` (primary) + `BlogPosting` (secondary)
- **Blocker:** Need to extract text/accordion blocks as named steps at render time

### `news` (typeSlug: `news`)
- **Current:** `NewsArticle` on `/news/[slug]` — **correct**
- **Routing:** Correctly redirected from `/blog/[slug]` to `/news/[slug]`
- **Blocker:** None

---

## Implementation Plan

### Step 1 — Add `blogPostSchemas()` to `schema.ts`

**File:** `src/lib/seo/schema.ts`

```ts
/**
 * Builds the correct JSON-LD array for a CMS blog post based on its typeSlug.
 * Returns multiple schema objects when a primary type + BlogPosting are both needed.
 */
export function blogPostSchemas(post: {
  typeSlug?: string;
  title: string;
  excerpt?: string;
  featuredImage?: string;
  authorName?: string;
  datePublished?: string;
  dateModified?: string;
  path: string;
  tags?: string[];
  categoryName?: string;
  blocks?: Array<{ type: string; content: any }>;
}): object[] {
  const url = absoluteUrl(post.path);

  // Shared BlogPosting base (always included as a secondary or fallback)
  const base = {
    "@type": "BlogPosting",
    headline: post.title,
    ...(post.excerpt       ? { description:    post.excerpt }                  : {}),
    ...(post.featuredImage ? { image: [absoluteUrl(post.featuredImage)] }      : {}),
    ...(post.tags?.length  ? { keywords:       post.tags.join(", ") }          : {}),
    ...(post.categoryName  ? { articleSection: post.categoryName }             : {}),
    author:    { "@type": "Person", name: post.authorName || SITE_NAME },
    publisher: { "@id": ORG_ID },
    ...(post.datePublished ? { datePublished: post.datePublished } : {}),
    ...(post.dateModified  ? { dateModified:  post.dateModified  } : {}),
    inLanguage: "en-AU",
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    isPartOf:         { "@id": WEBSITE_ID },
  };

  const type = String(post.typeSlug || "").toLowerCase();

  // FAQ type
  if (type === "faq") {
    const faqItems = extractAccordionItems(post.blocks);
    if (faqItems.length > 0) {
      return [
        {
          "@context": "https://schema.org",
          "@type":    "FAQPage",
          mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name:    item.title,
            acceptedAnswer: { "@type": "Answer", text: item.content },
          })),
        },
        { "@context": "https://schema.org", ...base },
      ];
    }
  }

  // How-To type
  if (type === "how-to") {
    const steps = extractHowToSteps(post.blocks);
    if (steps.length > 0) {
      return [
        {
          "@context":  "https://schema.org",
          "@type":     "HowTo",
          name:        post.title,
          description: post.excerpt || "",
          url,
          inLanguage:  "en-AU",
          step: steps.map((s, idx) => ({
            "@type":  "HowToStep",
            position: idx + 1,
            name:     s.name,
            text:     s.text,
          })),
        },
        { "@context": "https://schema.org", ...base },
      ];
    }
  }

  // Article type — use Article supertype instead of BlogPosting subtype
  if (type === "article") {
    return [{ "@context": "https://schema.org", ...base, "@type": "Article" }];
  }

  // General Blog / unknown -> BlogPosting (safe default)
  return [{ "@context": "https://schema.org", ...base }];
}

/** Pulls accordion items from blocks for FAQ schema. */
function extractAccordionItems(
  blocks?: Array<{ type: string; content: any }>,
): Array<{ title: string; content: string }> {
  if (!blocks) return [];
  return blocks
    .filter((b) => b.type === "accordion")
    .flatMap((b) => b.content?.items || [])
    .filter((item: any) => item.title && item.content);
}

/**
 * Extracts How-To steps from text and accordion blocks.
 * Each text block becomes one step; the first <h2>/<h3> heading is the step name.
 */
function extractHowToSteps(
  blocks?: Array<{ type: string; content: any }>,
): Array<{ name: string; text: string }> {
  if (!blocks) return [];
  const steps: Array<{ name: string; text: string }> = [];

  blocks.forEach((b, idx) => {
    if (b.type === "text" || b.type === "texteditor") {
      const html: string =
        typeof b.content === "string" ? b.content : b.content?.html || "";
      const headingMatch = html.match(/<h[23][^>]*>(.*?)<\/h[23]>/i);
      const name = headingMatch
        ? headingMatch[1].replace(/<[^>]+>/g, "").trim()
        : `Step ${idx + 1}`;
      const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      if (text) steps.push({ name, text });
    }
    if (b.type === "accordion") {
      (b.content?.items || []).forEach((item: any) => {
        if (item.title && item.content) {
          steps.push({ name: item.title, text: item.content });
        }
      });
    }
  });

  return steps;
}
```

---

### Step 2 — Update `[slug]/page.tsx`

**File:** `src/app/blog/[slug]/page.tsx`

```tsx
// 1. Change import
import { blogPostSchemas, breadcrumbLd } from "@/lib/seo/schema";

// 2. Inside PostPage() — replace the existing schemaJson block:

// BEFORE
const schemaJson = articleLd({
  type: "BlogPosting",
  headline: post.title,
  description: post.excerpt,
  image: post.featuredImage,
  authorName,
  datePublished: post.publishedAt || post.createdAt,
  dateModified: post.updatedAt,
  path: postPath("blog", post.slug || slug),
});

// AFTER
const schemas = blogPostSchemas({
  typeSlug:      post.typeSlug,
  title:         post.title,
  excerpt:       post.excerpt,
  featuredImage: post.featuredImage,
  authorName,
  datePublished: post.publishedAt || post.createdAt,
  dateModified:  post.updatedAt,
  path:          postPath("blog", post.slug || slug),
  tags:          post.tags,
  categoryName:  post.categoryName,
  blocks:        post.blocks,
});

const breadcrumbJson = breadcrumbLd([
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
  { name: post.title, path: postPath("blog", post.slug || slug) },
]);

// 3. In JSX — replace <JsonLd data={schemaJson} />:
{schemas.map((schema, i) => (
  <JsonLd key={i} data={schema} />
))}
<JsonLd data={breadcrumbJson} />
```

---

## Files to Change

| File | Change |
|------|--------|
| `src/lib/seo/schema.ts` | Add `blogPostSchemas()`, `extractAccordionItems()`, `extractHowToSteps()` |
| `src/app/blog/[slug]/page.tsx` | Swap `articleLd` for `blogPostSchemas()`, add `breadcrumbLd` |
| `src/app/news/[slug]/page.tsx` | No changes needed — already correct |

---

## CMS Editor Recommendation for How-To Posts

For the `HowTo` step extraction to work well, editors writing How-To posts should follow this convention:

> **One text block per step. Start each block with an H2 or H3 heading that names the step.**

Consider adding a hint in the CMS editor when the How-To type is selected:

```tsx
// BlogPostEditorPage.tsx — show inline guidance
{watchTypeSlug === 'how-to' && (
  <p className="text-[11px] text-amber-600 bg-amber-50 border border-amber-200 rounded px-3 py-2">
    How-To posts: add one text block per step and start each with an H2 or H3 heading.
    This builds the step-by-step structured schema automatically.
  </p>
)}
```

---

## Result Summary

| Type | Schema Now | Schema After Fix | Rich Result Unlocked |
|------|:---:|:---:|:---:|
| `general-blog` | `BlogPosting` | `BlogPosting` (unchanged) | — |
| `article` | `BlogPosting` | `Article` | AI citation weight |
| `faq` | `BlogPosting` ❌ | `FAQPage` + `BlogPosting` | FAQ accordion in SERP |
| `how-to` | `BlogPosting` ❌ | `HowTo` + `BlogPosting` | Step rich result |
| `news` | `NewsArticle` ✅ | `NewsArticle` (unchanged) | Google News / Discover |

**Two files to change. Zero new dependencies. All data (`typeSlug`, `blocks`) already comes from the API.**
