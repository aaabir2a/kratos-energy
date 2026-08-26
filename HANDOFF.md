# Kratos Energy — session handoff

Marketing site. **Next.js 16 (App Router) + TS + Tailwind 3 + zustand**.
Dir `D:\Kratos-office\kratos-energy` (backend is a separate repo: `D:\Kratos-Backend`).
Repo github.com/aaabir2a/kratos-energy, branch **main** — team pushes in parallel, always
`git pull --rebase` before push. Live: **kratos-energy.com** (Cloudflare → VPS nginx :443 →
Docker container `:3006`). API base `https://api.kratos-energy.com/api/v1`
(env `NEXT_PUBLIC_API_BASE`, falls back to prod in `src/lib/api.ts`).

_Last updated 26 Aug 2026._

---

## Run / verify

```bash
npm run dev          # :3000
npx tsc --noEmit     # typecheck (slow, run from project dir)
npx eslint <files>   # lint
npm run build        # production build
```

**The LAN dev API `http://192.168.0.220:4000` is frequently down.** `.env.local` points at it, so
`npm run dev` renders every CMS-driven section empty (hero, projects, blog slider, news band) and
the log fills with `ECONNREFUSED`. That is environmental, not a bug — every loader degrades to an
empty section on purpose.

**To verify CMS-driven work, build against production and serve that:**

```bash
NEXT_PUBLIC_API_BASE=https://api.kratos-energy.com/api/v1 npm run build
npx next start -p 4700
```

Then assert against the served HTML. Prerendered output also lands on disk at
`.next/server/app/**.html`, which is the fastest way to check static routes without a server.

### Environment gotchas (cost hours last session)

- **The Browser pane is unreliable here.** It reports a 0×0 viewport, resets `location` to `/`,
  and `preview_start` dev servers often die the moment the call returns. Prefer text/DOM
  assertions over screenshots. Serving a production build in a **backgrounded** `npx next start`
  and driving it over HTTP worked reliably.
- **`server.kill()` does not kill the process tree on Windows** when spawned with `shell: true`.
  Orphaned `next start` servers keep holding their port, and a later run silently hits the *old*
  build — this produced a false test failure. Use a fresh port per run.
- **eslint reports 6 pre-existing `no-explicit-any` errors** (`BlogBlockRenderer.tsx`,
  `blog/[slug]/page.tsx`). Not introduced by recent work — check against `HEAD~1` before blaming a
  change.

---

## Key architecture

- **API bindings** `src/lib/api.ts` — `request()` wraps fetch, unwraps `{success,data}`, throws
  `ApiError` (code `NETWORK` on failure). Endpoints: hero-images, products, packages, projects,
  lead-form (`/public/lead-form/:id`, no id = global), landing pages (`/p/:slug`), `submitLead`
  (POST `/leads/submit`, body `{website:"",...payload}`). `*Server` variants are ISR-cached.
  `getPostsServer({limit,type})` feeds the homepage blog/news sections and returns `[]` on failure.
- **Store** `src/lib/store.ts` (zustand): products, packages, `leadForms: Record<id,Slice>` keyed
  by `id|"global"` — **must stay per-id** so campaign forms don't collide with the global one.
- **Images**: local assets use `next/image`. **CMS images bypass the optimiser** — remote hosts are
  allowlisted in `next.config.mjs` `remotePatterns` for blog covers, but article and hero images
  are served full-size (349–583 KB). `next.config.mjs` is build-time: **rebuild the container after
  changing it.**
- **LeadForm** `src/components/LeadForm.tsx` — renders the CRM dynamic form with a static
  fallback. Maps `field.maps_to` → top-level lead columns, keeps everything in `customFields`,
  honeypot `website_spam`, sends `customLeadFormId` + `landingPageSlug` + utm + referrer.
  ⚠️ `maps_to` is gated on a hardcoded `KNOWN_LEAD_KEYS` allowlist
  ([LeadForm.tsx:273](src/components/LeadForm.tsx)), so a CMS column outside that list (e.g.
  `enquiryType`) never reaches the lead — the value only lands in `customFields`. A fix was written
  and **reverted at the user's request**; leave it alone unless asked.
  **Never test lead submit — it writes to the live DB.**

---

## Routes

`/` · `/residential-solar` · `/commercial-solar` · `/support` · `/finance` · `/contact` ·
`/get-a-quote` (noindex) · `/refer` (noindex) · `/privacy` · `/projects` + `/projects/[title]` ·
`/blog` + `/blog/[slug]` · `/news` + `/news/[slug]` · `/rebates` · `/savings-calculator` ·
`/build` · `/solar` + `/solar/[state]` (NSW/VIC/ACT only) · `/luxury-getaway` (campaign) ·
`/calculators` + 5 tools (solar-rebate, battery-rebate, solar-output, feed-in-tariff,
ev-charging-cost)

**Recently renamed — permanent redirects live in `next.config.mjs`:**

| Old | New |
|---|---|
| `/systems/:slug` | `/packages/:slug` |
| `/battery-storage` | `/products/battery` |
| `/ev-charging` | `/products/ev-charging` |

Nav order: **Our Packages → Our Products → Solar Savings → Projects → Blog → News → Contact**.
"Our Services" is commented out in `src/lib/nav.ts` (pages stay live, footer still links them).
Packages data lives in `src/lib/systems.ts` (module name unchanged, URLs are `/packages/*`).

---

## SEO system (`src/lib/seo/`)

| File | Purpose |
|---|---|
| `site.ts` | `SITE_URL`, `IS_INDEXABLE`, `absoluteUrl()`, `postPath()` |
| `schema.ts` | All JSON-LD builders (`articleLd`, `breadcrumbLd`, `itemListLd`, `faqLd`, …) |
| `postType.ts` | CMS type → schema mapping, FAQ extraction, `wordCountFromBlocks()` |
| `imageSize.ts` | Reads real image dimensions from header bytes for OG tags |
| `metadata.ts` · `routes.ts` · `dynamicUrls.ts` · `sitemap.ts` | Metadata + sitemaps |

**Post type → schema** (`schemaForPostType`, one table, add new types there):

| CMS type | Emits |
|---|---|
| `general-blog` | `BlogPosting` |
| `article` | `Article` |
| `news` | `NewsArticle` |
| `faq` | `BlogPosting` + `FAQPage` (only when ≥2 real Q&A pairs are found) |
| `how-to` | `BlogPosting` — deliberately **not** `HowTo`, which requires a `step` list |

Blog/news posts are prebuilt via `generateStaticParams`; `dynamicParams` stays **on** so posts
published after a deploy still render. OG images carry **measured** width/height — never hardcode
1200×630, the CMS ships six different aspect ratios.

---

## Brand / conventions

Green `#6cae34`, forest `#0c3b28`, navy, gold `#f4ce47`. Fonts Bricolage (display) + Hanken (body).
Utilities `container-ke`, `ke-lift`, `ke-press`, `rounded-pill`. **Australian spelling.** GST
clarity on prices ("incl. GST, after STC rebate"). Service area **NSW / VIC / ACT**. No WhatsApp
(FloatingActions = "Call us"). Email `info@kratos-energy.com` (`nav.ts`). Calculators must stamp
"Estimate only — not a quote". ChatWidget is a third-party shadow-DOM widget.

---

## Recent work (Aug 2026)

- **Nav/routes**: `/systems` → `/packages`, new **Our Products** section (`/products`,
  `/products/solar` with inverter + panel brand carousels), battery & EV moved under it.
  Brand logos in `public/assets/brands/` — Sigenergy and Clenergy still missing (their sites block
  automated download); both fall back to wordmark chips via `src/lib/brands.ts`.
- **SEO audit `docs/seo-geo-blog-audit.md` — fixes 1,2,3,4,5,6,7,9 + GEO-2 all shipped.**
  Fix 8 (`readMins` in the CMS editor) **skipped by decision** — obsolete once `wordCount` was
  counted from the real body. GEO-3 (`hreflang`) **declined**: `<html lang="en-AU">` already covers
  it, and the suggested root-layout `alternates.languages` would make every page claim the homepage
  as its alternate.
- **Homepage**: `CaseStudies.tsx` deleted (hardcoded fake testimonials), replaced by
  `BlogSlider.tsx` (client, snap-scroll, mirrors `ProjectShowcase`) and `NewsUpdates.tsx` (server
  component, dated list on the forest band — deliberately not a second carousel).
  `src/lib/postTitle.ts` strips the `| Kratos Energy` suffix authors type into CMS titles.

---

## Outstanding — start here

Full findings in the SEO audit artifact; the live-site items are **not in this repo**:

1. **Cloudflare blocks every AI crawler.** Managed `robots.txt` disallows GPTBot, ClaudeBot,
   Google-Extended, CCBot + 5 more, and sets `ai-train=no`. This negates the GEO work (FAQPage,
   `speakable`, `about` entities). Normal Google search is unaffected. **Business decision, not a
   bug** — the user has been told and has not yet chosen.
2. **Cloudflare caches zero HTML.** Next sends correct `s-maxage`, every page returns
   `cf-cache-status: DYNAMIC`. One Cache Rule would fix it. Homepage measured 2.3 s first hit.
3. **Duplicate post in the CMS** — `…costs-by-6/` and `…costs-by-6` are the same article, both
   indexed, splitting rank. Another slug has a trailing apostrophe. CMS data, not code.
4. **CMS titles double-branded** — authors type `| Kratos Energy`, the template appends
   `· Kratos Energy`; 20 of 55 pages exceed 60 chars. The homepage now strips it for display, but
   `<title>` and search results still show it.
5. **7 posts have multiple H1s** (template H1 + body H1). CMS content issue.
6. **CMS images unoptimised** — biggest win left in this repo; route them through `next/image`.
7. `/projects` still shows an empty state until projects are added in the CRM.
8. `QuoteFunnel.tsx` is dead code.

**Every code change needs a container rebuild to reach production**, and the Docker build must be
able to reach the CMS API or `generateStaticParams` silently returns `[]` and no post pages get
prebuilt — check the build log for `●` markers on `/blog/[slug]`.
