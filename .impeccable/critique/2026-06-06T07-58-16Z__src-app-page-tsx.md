---
target: homepage
total_score: 26
p0_count: 0
p1_count: 3
timestamp: 2026-06-06T07-58-16Z
slug: src-app-page-tsx
---
# Critique — Homepage (`src/app/page.tsx`)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Calculator updates live, form shows success; no submit/loading feedback |
| 2 | Match System / Real World | 3 | Plain AU money language; commercial-tier jargon (EPC/O&M/PPA) leaks |
| 3 | User Control and Freedom | 3 | Solid; no real traps |
| 4 | Consistency and Standards | 2 | Same "2,847" used for homes/systems/reviews; "since 2016" vs "15+ years"; inputs labeled in one form, not the other |
| 5 | Error Prevention | 3 | Native required/email/select constraints; phone unvalidated |
| 6 | Recognition Rather Than Recall | 3 | Mostly labeled, nav visible |
| 7 | Flexibility and Efficiency | 3 | Fine for a marketing surface |
| 8 | Aesthetic and Minimalist Design | 2 | Eyebrow on every section, 4 near-identical card grids, hero number overload |
| 9 | Error Recovery | 2 | Browser-default validation only; no designed inline error states |
| 10 | Help and Documentation | 2 | Phone/email + disclaimers only; no inline help/FAQ |
| **Total** | | **26/40** | **Acceptable — competent but generic; trust details leak** |

## Anti-Patterns Verdict

**Does this look AI-generated? Yes, leans that way.** Execution is clean, but the scaffolding is textbook-generated marketing.

**LLM assessment:**
- **Eyebrow above every section** — the single biggest tell. `Eyebrow` is a named, documented component ("Uppercase tracking label that sits above section headings") used on SystemPricing, Services, Testimonials, CaseStudies, SavingsCalculator, QuoteCTA — plus Hero has its own uppercase kicker. That is the 2023-era AI grammar institutionalized in code. Banned pattern.
- **Identical card grids** — Services (3), SystemPricing (4), Testimonials (3), CaseStudies (3): all `rounded-lg` + `shadow-md` + `border-ash-200` white cards, alternating white/paper backgrounds. Section after section of the same affordance. Banned pattern.
- **Rounded-square icon tile above headings** (`bg-green-50` 52px square + icon) repeated on Services/calculator/cards — "screams template" per brand bans.
- **Green = solar** is the first-order category reflex. Could anyone guess the palette from "solar company"? Yes. The palette itself is competently built, but the hue choice is the obvious one.

**Deterministic scan:** `detect.mjs` returned 1 warning — `border-accent-on-rounded` at `SiteHeader.tsx:61` (`border-b-2`). This is a header underline, not a thick accent on a rounded card → **false positive**. No other automated hits, which fits: the slop here is structural (repetition, scaffolding), not the kind the regex catches.

**Visual overlays:** Browser injection not run (no dev server started for this pass). No user-visible overlay claimed.

## Overall Impression

Competently built, on-brand-ish, and it would not embarrass anyone — but it is exactly the page a generator produces for "Australian solar company." The bones are good (real photos, dark calculator/quote sections break the rhythm, sensible token system). The biggest opportunity: kill the eyebrow-on-every-section reflex and vary the section affordances so the page stops reading as a stack of identical card decks. Second: a "trustworthy" brand cannot ship inconsistent trust numbers.

## What's Working

1. **Real imagery, used well.** Hero family photo with floating proof cards, case-study before/after photos. The brief implies imagery and you shipped it — no colored-block placeholders.
2. **Two dark `forest-900` sections** (calculator, quote) punctuate the white/paper rhythm and give the page two clear "moments." Good pacing instinct.
3. **Disciplined token system.** Tailwind theme maps brand colors/shadows/radii cleanly; `Button` variants, `ke-press`/`ke-lift` micro-interactions are consistent and restrained — no bounce.

## Priority Issues

**[P1] Trust numbers contradict each other** — Hero "2,847 homes", TrustBar "2,847 Systems Installed", Testimonials "2,847 reviews": one figure reused for three different metrics. And Hero "since 2016" (≈10 yrs) vs TrustBar "15+ Years Experience".
- *Why it matters:* The whole brand is "trustworthy, local, expert." A skeptical homeowner comparing solar quotes notices the same number doing three jobs and the math not adding up. It reads as fabricated, which is the worst failure for this audience.
- *Fix:* One canonical set of stats in `src/lib/`. Homes ≠ reviews ≠ years. Reconcile founding year with the experience claim.
- *Command:* `/impeccable clarify`

**[P1] Eyebrow on every section is the dominant AI tell** — 6 sections + Hero kicker all use the tracked-uppercase label.
- *Why it matters:* It is the most-flagged generated-page pattern, and it flattens hierarchy: every section opens identically, so none feels distinct.
- *Fix:* Remove `Eyebrow` as section grammar. Keep at most one deliberate kicker if it earns its place; differentiate sections by headline weight, a number, or a lead image instead.
- *Command:* `/impeccable typeset`

**[P1] Form inputs have no programmatic labels** — `QuoteCTA` form fields are placeholder-only (`placeholder="First name"`), no `<label>` or `aria-label`. (Notably `SavingsCalculator` *does* aria-label its inputs — inconsistent.)
- *Why it matters:* Screen-reader users hear an unlabeled field; once typing begins the placeholder vanishes so sighted users lose the field name too. This is the primary conversion form — the lead path — and the audience skews older.
- *Fix:* Add real `<label>` (visually-hidden if needed) or `aria-label` to every field. Mark required fields visually, not just via the `required` attribute.
- *Command:* `/impeccable harden`

**[P2] Four near-identical card grids in a row** — Services / SystemPricing / Testimonials / CaseStudies are structurally the same deck.
- *Why it matters:* Monotony. The eye learns the pattern by section 2 and stops reading. Nothing signals which section matters most.
- *Fix:* Vary affordances — e.g. pricing as a comparison table or a single featured tier, testimonials as one large pull-quote + supporting, services as an asymmetric feature layout. At least break the uniform card treatment.
- *Command:* `/impeccable layout`

**[P2] Hero is a wall of numbers** — badge rating (4.9/5 · 2,847), "$2,310/yr", "25-Year", "10.12 kW · $5,490 +GST", three stat pills ($2,847+/25yr/$0). ~8 numeric claims competing in one fold.
- *Why it matters:* Exceeds working-memory (≤4); the headline and primary CTA fight three floating cards for attention. The user can't tell what to look at first.
- *Fix:* Keep one hero proof card (the savings number), demote the rest. Let the headline + "Get a Free Quote" own the fold.
- *Command:* `/impeccable distill`

## Persona Red Flags

**Jordan (First-Timer):** Quote-form fields are placeholder-only — after clicking in, the label disappears and Jordan forgets what "Suburb" wanted. No required-field markers until submit fires a terse browser popup. Commercial jargon ("PPA", "EPC", "O&M", "shovel-ready") appears with no explanation.

**Riley (Stress Tester):** The "Play story" button on each case study (`CaseStudies.tsx:80`) has an `aria-label` and a hover-ready green circle but **no `onClick` — it does nothing.** Looks interactive, silently fails. Also: the same "2,847" surfaces three times as three different metrics; "since 2016" contradicts "15+ years". Form submit is instant with no network — refreshing loses the "all set" state.

**Casey (Distracted Mobile):** Hero floating proof cards are absolutely positioned (`-left-6`, `-right-4`, `-bottom-6`) over the image — on narrow screens these can crowd or clip against the 360px image box. Primary "Get a Free Quote" sits mid-page, not in the thumb zone. `FloatingActions` may help; verify reachability.

## Minor Observations

- **Fonts:** Sora + Inter. Inter is on the reflex-reject list (training-data default), and Sora+Inter are both grotesque-ish sans — a low-contrast pairing. README still claims Poppins/Nunito Sans (stale). Consider a real contrast axis or one family in committed weights.
- **Em dashes throughout copy** ("$35 — a genuinely good", "warranty — turning bills into savings"). House style here bans them; use commas/colons/periods.
- **"FREE" in all-caps**, twice ("Get Your FREE Quote", "Get My FREE Quote") — the cheap-door-to-door-solar tell the brief explicitly lists as an anti-reference.
- **"No pushy sales"** stated 3× (calculator, quote promises, a testimonial) — protesting a bit much.
- **No `prefers-reduced-motion` handling** for the hero `fade-up`. Single subtle entrance, but the alternative is one line.
- **Placeholder contrast:** native placeholders default to ~#757575; verify ≥4.5:1 or set an explicit placeholder color.
- Testimonials page 2 shows a single lonely card (4 reviews ÷ 3 per page).

## Questions to Consider

- If you stripped every eyebrow tomorrow, what would actually distinguish one section from the next? If the answer is "nothing," that's the real problem.
- A "trustworthy local expert" — would they let the same number stand for homes, systems, and reviews? What's the *one* real number per claim?
- Solar pages are green by default. What would the confident, non-obvious version of this palette look like — and is green carrying the brand, or just confirming the category?
- Does the hero need eight numbers to be convincing, or would one honest savings figure land harder?
