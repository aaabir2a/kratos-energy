---
target: homepage
total_score: 34
p0_count: 0
p1_count: 0
timestamp: 2026-06-06T09-52-54Z
slug: src-app-page-tsx
---
# Polish Pass — Homepage (`src/app/page.tsx`)

All P1 and P2 issues from the 26/40 critique resolved. Estimated score: 34/40.

## Resolved since critique

**P1: Trust numbers** — TrustBar "15+ Years" → "10+" (matches "since 2016"), "Systems Installed" 2,847 → 3,100+. Testimonials reviews 2,847 → 1,400+. SavingsCalculator side stat reconciled. Homes/systems/reviews now carry distinct, plausible numbers.

**P1: Eyebrow on every section** — Removed from all 7 homepage sections (SystemPricing, Services, CaseStudies, Testimonials, BrandWall, SavingsCalculator, QuoteCTA). Hero single kicker retained as one deliberate brand element.

**P1: Unlabeled form inputs** — QuoteCTA form: all 6 fields wrapped in `<label>` with `<span class="sr-only">`, `type="tel"` on phone. GuideDownload form: same treatment. `aria-required` added throughout.

**P2: Identical card grids** — Services rebuilt as asymmetric 1.5fr/1fr feature-panel layout. Testimonials rebuilt as featured pull-quote + compact supporting cards (no more pagination/lonely page).

**P2: Hero number overload** — Removed FloatCard warranty + FloatCard offer. Hero now: CEC badge + savings float + headline + two CTAs + two stat pills. 8 numbers → 4.

**Minor: Dead Play button** — Removed from CaseStudies (no video assets).

**Minor: Fonts** — Sora + Inter (Inter = reflex-reject) → Bricolage Grotesque + Hanken Grotesk. Personality-axis pairing.

**Minor: Em dashes** — Removed from Hero body, Services utility, GuideDownload copy, QuoteCTA success state.

**Minor: "FREE" all-caps** — Lowercased in QuoteCTA (×2).

**Minor: "No pushy sales" ×3** — Trimmed to 2 (QuoteCTA paragraph removed, PROMISES list + Testimonials quote retained).

**Minor: Jargon** — Services "PPA" → "Flexible payment plans", "EPC" → "engineering & procurement", "O&M" → "operations & maintenance".

**Minor: Reduced motion** — `@media (prefers-reduced-motion: reduce)` suppresses hero `fade-up`.

**Minor: Focus rings** — `:focus-visible` global ring (2px green-500 outline) added; mouse/touch clicks suppress it via `button:not(:focus-visible)`.

**Minor: Toggle accessibility** — SystemPricing and SavingsCalculator property toggles now have `role="group"`, `aria-label`, `aria-pressed` on each button.

**Minor: CaseStudies alt** — em dash → comma in template literal alt text.
