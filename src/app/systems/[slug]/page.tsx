import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { QuoteCTA } from "@/components/sections/QuoteCTA";
import { Icon } from "@/components/ui/Icon";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Stars } from "@/components/ui/Stars";
import {
  SYSTEMS,
  getSystem,
  systemsByCategory,
  type SolarSystem,
} from "@/lib/systems";

type Params = { params: Promise<{ slug: string }> };

// Pre-render every system page at build time.
export function generateStaticParams() {
  return SYSTEMS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const system = getSystem(slug);
  if (!system) return { title: "System not found" };
  return {
    title: `${system.size} Solar System`,
    description: `${system.tagline} ${system.size} solar from Kratos Energy — Tier 1 panels, CEC-accredited install and a 25-year warranty.`,
  };
}

function RelatedCard({ s }: { s: SolarSystem }) {
  return (
    <Link
      href={`/systems/${s.slug}`}
      className="ke-lift flex flex-col rounded-lg border border-ash-200 bg-white p-6"
    >
      <div className="font-display text-[26px] font-extrabold text-navy-800">
        {s.size}
      </div>
      <div className="mt-1.5 font-body text-[13.5px] text-ash-700">
        {s.audience}
      </div>
      <span className="mt-4 inline-flex items-center gap-1.5 font-display text-[13.5px] font-bold text-forest-700">
        View system <Icon name="arrow" size={15} stroke={2.4} />
      </span>
    </Link>
  );
}

export default async function SystemPage({ params }: Params) {
  const { slug } = await params;
  const system = getSystem(slug);
  if (!system) notFound();

  const enquire = system.price === null;
  const related = systemsByCategory(system.category)
    .filter((s) => s.slug !== system.slug)
    .slice(0, 3);

  const isResidential = system.category === "residential";
  const bgImage = isResidential
    ? "https://api.kratos-energy.com/kratos-uploads/hero/desktop/dd403ceb-d379-48e9-8102-589925043402/optimized.webp"
    : "https://api.kratos-energy.com/kratos-uploads/hero/desktop/fc169765-17c9-4c33-a532-19a323767493/optimized.webp";

  return (
    <SiteLayout>
      {/* Hero */}
      <section
        className="pb-16 pt-12 relative isolate bg-forest-900 text-white min-h-[500px] flex flex-col justify-center overflow-hidden py-16 lg:py-20"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bgImage}
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(105deg,#0c3b28_6%,rgba(12,59,40,0.85)_40%,rgba(12,59,40,0.40)_70%,rgba(12,59,40,0.12)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-900 via-forest-900/30 to-transparent" />

        <div className="container-ke relative z-10">
          {/* Breadcrumb */}
          <nav className="mb-7 flex items-center gap-2 font-body text-[13.5px] text-white/60">
            <Link
              href="/"
              className="hover:text-white"
            >
              Home
            </Link>
            <Icon name="chevron" size={14} className="-rotate-90 opacity-50" />
            <span className="text-green-300 font-semibold capitalize">
              {system.category} Solar
            </span>
            <Icon name="chevron" size={14} className="-rotate-90 opacity-50" />
            <span className="font-semibold text-white">
              {system.size} System
            </span>
          </nav>

          <div className="max-w-[680px]">
            {/* Copy */}
            <div>
              <Eyebrow className="capitalize" light>
                {system.category} Solar System
              </Eyebrow>
              <h1 className="mt-3 font-display text-[clamp(40px,5vw,64px)] font-extrabold leading-none tracking-[-0.025em] text-white">
                {system.size}
                <span className="text-green-300">
                  {" "}
                  solar
                </span>
              </h1>
              <p className="mt-4 max-w-[460px] font-body text-[18px] leading-relaxed text-white/85">
                {system.tagline}
              </p>

              {/* Price / savings */}
              <div className="mt-7 flex flex-wrap items-end gap-8">
                {!enquire && (
                  <div>
                    <div className="font-body text-[12.5px] font-bold uppercase tracking-[0.06em] text-white/40">
                      From
                    </div>
                    <div className="font-display text-[40px] font-extrabold leading-none text-white">
                      ${system.price?.toLocaleString()}
                    </div>
                    <div className="mt-1 font-body text-[13px] text-white/50">
                      or ${system.perDay}/day · {system.termMonths}mo · after
                      rebate
                    </div>
                  </div>
                )}
                <div>
                  <div className="font-body text-[12.5px] font-bold uppercase tracking-[0.06em] text-white/40">
                    Est. savings
                  </div>
                  <div className="font-display text-[40px] font-extrabold leading-none text-green-300">
                    ${system.savingsPerYear.toLocaleString()}
                    <span className="ml-1 font-body text-[15px] font-semibold text-white/50">
                      /yr
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#quote"
                  className="ke-press inline-flex items-center justify-center gap-2.5 rounded-pill bg-green-500 px-[34px] py-[17px] font-display text-[17px] font-bold text-white shadow-green hover:bg-green-600"
                >
                  Get a Free Quote <Icon name="arrow" size={21} stroke={2.4} />
                </a>
                <a
                  href="tel:1300089547"
                  className="ke-press inline-flex items-center gap-2.5 rounded-pill border-[1.5px] border-white/25 bg-white/10 px-7 py-[15px] font-display text-[17px] font-bold text-white hover:bg-white/20 transition-colors"
                >
                  <Icon name="phone" size={19} /> 1300 089 547
                </a>
              </div>

              <div className="mt-6 inline-flex items-center gap-2.5 font-body text-[13.5px] font-bold text-white/80">
                <Stars size={15} /> 4.9/5 · CEC-accredited installation
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stat band */}
      <section className="bg-forest-900 py-12">
        <div className="container-ke grid grid-cols-2 gap-6 md:grid-cols-4">
          {system.stats.map((st) => (
            <div key={st.label} className="text-center">
              <div className="font-display text-[clamp(28px,3.4vw,40px)] font-extrabold leading-none text-gold-400">
                {st.value}
              </div>
              <div className="mt-2 font-body text-[13px] font-semibold text-[#a9c4a3]">
                {st.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What's included */}
      <section className="bg-white py-[78px]">
        <div className="container-ke grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>What&rsquo;s Included</Eyebrow>
            <h2 className="mt-3 font-display text-[clamp(28px,3.2vw,40px)] font-extrabold tracking-[-0.02em] text-navy-700">
              Everything, done by one team.
            </h2>
            <p className="mt-3 max-w-[420px] font-body text-[16.5px] leading-relaxed text-ash-700">
              From the first site assessment to grid connection and monitoring,
              your {system.size} system is designed, installed and supported by
              Kratos Energy — no subcontractor handballing.
            </p>
            <div className="mt-7">
              <a
                href="#quote"
                className="ke-press inline-flex items-center justify-center gap-2.5 rounded-pill bg-navy-700 px-[26px] py-[14px] font-display text-[15px] font-bold text-white hover:bg-navy-800"
              >
                Book a free site assessment{" "}
                <Icon name="arrow" size={19} stroke={2.4} />
              </a>
            </div>
          </div>

          <ul className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            {system.includes.map((inc) => (
              <li
                key={inc}
                className="flex items-start gap-3 rounded-md border border-ash-200 bg-paper p-4 font-body text-[14.5px] font-semibold text-ink"
              >
                <Icon
                  name="check"
                  size={18}
                  stroke={3}
                  className="mt-0.5 flex-none text-green-500"
                />
                {inc}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Related systems */}
      {related.length > 0 && (
        <section className="bg-paper py-[70px]">
          <div className="container-ke">
            <h2 className="mb-8 font-display text-[clamp(24px,2.8vw,34px)] font-extrabold tracking-[-0.02em] text-navy-700">
              Compare other {system.category} systems
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {related.map((s) => (
                <RelatedCard key={s.slug} s={s} />
              ))}
            </div>
          </div>
        </section>
      )}

      <QuoteCTA />
    </SiteLayout>
  );
}
