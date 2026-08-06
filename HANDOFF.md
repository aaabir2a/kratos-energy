# Kratos-Energy — session handoff

Marketing site. **Next.js 16 (App Router) + TS + Tailwind**. Dir: `D:\Kratos-office\kratos-energy` (separate from `D:\Kratos-Backend`). Repo: github.com/aaabir2a/kratos-energy, branch **main** (team pushes in parallel — always `git pull --rebase` before push). Deployed: **kratos-energy.com** (Cloudflare → VPS nginx :443 → Docker container `:3006`). API base `https://api.kratos-energy.com/api/v1` (env `NEXT_PUBLIC_API_BASE`; falls back to prod in `src/lib/api.ts`).

## Run / verify
- Dev: `npm run dev` (:3000). Server wedges often → kill port 3000 proc, `rm -rf .next`, restart. First route hit compiles slowly (curl 000 = compile latency, retry ~50s).
- Check: `npx tsc --noEmit` + `npx eslint <files>` (run from project dir; slow, may background). Browser pane pixel/viewport reads are flaky (report 0-width) — use text/DOM assertions, not screenshots.
- Verify pages via curl `%{http_code}` and browser `javascript_tool` DOM checks. Don't test lead submit (live DB).

## Key architecture
- **API bindings** `src/lib/api.ts`: `request()` wraps fetch (throws `ApiError` code NETWORK on failure). Endpoints: hero-images, products(`?category=Battery`), packages, **projects** (`/public/projects`), lead-form (`/public/lead-form/:id` path, no id=global), **landing page** (`getLandingPageServer(slug)` → `/p/:slug`), `submitLead` (POST `/leads/submit`, body `{website:"",...payload}`). `*Server` variants = ISR (`next:{revalidate}`).
- **Store** `src/lib/store.ts` (zustand): products, packages, **`leadForms: Record<id,Slice>`** (keyed by id|"global" — must stay per-id so campaign forms don't collide with global). `loadLeadForm(id?)`.
- **Remote images**: CRM images use native `<img loading=lazy>` (no next/image config). Blog uses `next/image` → hosts allowlisted in `next.config.mjs` remotePatterns (`api.kratos-energy.com/blogs/**` + `/kratos-uploads/**`). **next.config is build-time → rebuild container after changes.**

## LeadForm `src/components/LeadForm.tsx`
Renders CRM dynamic form (fetched by `formId` or global) with static fallback. Submit: coerces fields, maps `field.maps_to` → top-level firstName/email/phone, keeps all in `customFields` (by field_name), sends `customLeadFormId`+`landingPageSlug`+utm+referrer, honeypot input name `website_spam`. Props: `formId`, `landingPageSlug`, `staticTitle/staticSubmitLabel/successNote/className`. Used by: contact, get-a-quote, QuoteCTA (global), luxury-getaway (`formId="2f859ddd-beca-4399-a893-c2ac3e83aae7"` = "Claim Your Free Quote & Getaway": first_name/email/phone/package).

## Pages of note (`src/app/`)
- `/` home (`page.tsx` async, ISR-fetches hero+projects). Sections in `src/components/sections/`.
- `/residential-solar`,`/commercial-solar` → `SolarSegment.tsx` (hero+services+system cards → `/systems/<slug>`). Large-scale: `/systems/large-scale`.
- `/systems/[slug]` (data `src/lib/systems.ts`: residential 6-6kw/10kw/13-2kw, commercial 30kw/50kw/100kw).
- `/projects` + home `ProjectShowcase` (`Projects.tsx`: wide cards + lightbox; CRM `/public/projects`, currently **0 in DB** → empty state). `/luxury-getaway` (campaign, GetawayPromoSection on home).
- `/rebates` (`RebateExplorer`), calculators under `/calculators/*`. Rebate engine `src/lib/rebates/` (postcode→zone→STC, STATE_SCHEMES, computed live). `/solar/[state]` = NSW/VIC/ACT only (`src/lib/states.ts`).

## Brand / conventions
Green `#6cae34`, forest `#0c3b28`, navy, gold. Fonts: Bricolage (display) + Hanken (body). Utils: `container-ke`, `ke-lift`, `ke-press`, `rounded-pill`. **Australian spelling.** GST clarity on prices ("incl. GST, after STC rebate"). **Service locations = NSW / Victoria / ACT** (WA removed). No WhatsApp (FloatingActions = "Call us" tel:). Email `info@kratos-energy.com` (nav.ts const). Socials in PromoBar + Footer (`Socials.tsx`). Refer commented out of nav/footer. ChatWidget = 3rd-party shadow-DOM (widget.js), mobile keyboard fixed via visualViewport on `.rc-panel`.

## Recent state (all pushed to main)
Client-feedback round (units→m², ranges/estimates on build tool, homes-powered unified 2,847+), NSW/VIC/ACT, socials, projects page+API, battery-storage grid from API, get-a-quote uses LeadForm, per-id lead form isolation + landingPageSlug support. `QuoteFunnel.tsx` now unused (dead). Test subdomain SEO: recommended removing `test.kratos-energy.com` nginx symlink + Cloudflare DNS (user deciding).
