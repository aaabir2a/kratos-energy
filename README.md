# Kratos Energy

Marketing website for **Kratos Energy** — a 100% Australian-owned solar
company. Built with **Next.js 14 (App Router)**, **TypeScript**, and
**Tailwind CSS**.

This is a production-ready port of the brand design system and homepage
prototype: every brand token (colors, type, radii, shadows) is mapped into the
Tailwind theme, and each marketing section is an isolated, reusable component.

---

## Tech stack

| Layer        | Choice                                  |
| ------------ | --------------------------------------- |
| Framework    | Next.js 14 (App Router, RSC)            |
| Language     | TypeScript (strict)                     |
| Styling      | Tailwind CSS 3 + brand theme tokens     |
| Fonts        | `next/font` — Bricolage Grotesque (display), Hanken Grotesk (body) |
| Images       | `next/image`                            |
| Lint         | ESLint (`next/core-web-vitals`)         |

---

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint
```

> Requires Node.js 18.17+.

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx        # Root layout, fonts, metadata
│   ├── page.tsx          # Homepage composition
│   └── globals.css       # Tailwind layers + brand base styles
├── components/
│   ├── ui/               # Primitives: Button, Icon, Logo, Eyebrow, Stars
│   ├── layout/           # Site chrome: PromoBar, SiteHeader, CECBadge,
│   │                     #              MobileMenu, ChromeShell, Footer
│   └── sections/         # Page sections: Hero, TrustBar, SavingsCalculator,
│                         #                Services, Testimonials, RebateBanner,
│                         #                QuoteCTA
└── lib/
    ├── nav.ts            # Navigation data + contact constants
    └── utils.ts          # cn() + scrollToId()
```

### Architecture notes

- **Server vs. client** — static sections (`PromoBar`, `TrustBar`, `Footer`)
  are React Server Components. Anything with state or event handlers
  (`Hero`, `Services`, `SavingsCalculator`, `Testimonials`, `RebateBanner`,
  `QuoteCTA`, and the header/menu) is marked `"use client"`.
- **`ChromeShell`** is a thin client wrapper that owns the mobile-menu state so
  `page.tsx` can remain a server component.
- **Design tokens** live in `tailwind.config.ts` (`green`, `forest`, `navy`,
  `gold`, neutrals, `shadow-green`, `rounded-pill`, `font-display`, …). Use the
  utilities directly instead of hard-coded values.
- **Navigation** is data-driven from `src/lib/nav.ts`. Section anchors are used
  as ids for this single-page build; swap them for real routes as additional
  pages (Services, Products, Projects, Blog…) are added under `src/app/`.

---

## Brand tokens (quick reference)

| Token            | Tailwind class        | Value     |
| ---------------- | --------------------- | --------- |
| Primary green    | `bg-green-500`        | `#6cae34` |
| Forest (dark bg) | `bg-forest-900`       | `#0c3b28` |
| Heading navy     | `text-navy-700`       | `#1e3a8a` |
| Accent gold      | `bg-gold-400`         | `#f4ce47` |
| CEC orange       | `text-cec`            | `#F39200` |
| Display font     | `font-display`        | Bricolage Grotesque |
| Body font        | `font-body`           | Hanken Grotesk |

---

## Notes

- The savings calculator and quote form use a believable client-side model and
  a local success state — wire them to your CRM / pricing API for production.
- Nav links currently scroll to homepage sections; replace with `next/link`
  routes when the corresponding pages are built.
- Images live in `public/assets/`.

© 2026 Kratos Energy. All rights reserved.
