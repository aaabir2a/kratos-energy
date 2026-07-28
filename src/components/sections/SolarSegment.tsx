import Link from "next/link";
import type { ReactNode } from "react";
import { QuoteCTA } from "@/components/sections/QuoteCTA";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon, type IconName } from "@/components/ui/Icon";
import { systemsByCategory, type SystemCategory } from "@/lib/systems";

export type Service = { icon: IconName; title: string; body: string };

const AUD = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  maximumFractionDigits: 0,
});

/**
 * Reusable "solar segment" landing page (Residential / Commercial). Renders a
 * hero, the services we provide for that segment, and cards for every system
 * in the category — each linking to that product's /systems/<slug> page.
 */
export function SolarSegment({
  category,
  eyebrow,
  title,
  subtitle,
  heroBgImage,
  services,
  servicesHeading,
  systemsHeading,
  systemsIntro,
}: {
  category: SystemCategory;
  eyebrow: string;
  title: ReactNode;
  subtitle: string;
  heroBgImage: string;
  services: Service[];
  servicesHeading: string;
  systemsHeading: string;
  systemsIntro: string;
}) {
  const systems = systemsByCategory(category);

  return (
    <>
      {/* Hero */}
      <section className="pb-16 pt-12 relative isolate bg-forest-900 text-white min-h-[500px] flex flex-col justify-center overflow-hidden py-16 lg:py-20">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroBgImage}
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(105deg,#0c3b28_6%,rgba(12,59,40,0.85)_40%,rgba(12,59,40,0.40)_70%,rgba(12,59,40,0.12)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-900 via-forest-900/30 to-transparent" />

        <div className="container-ke relative z-10">
          <div className="max-w-[760px]">
            <Eyebrow light>{eyebrow}</Eyebrow>
            <h1 className="mt-3 font-display text-[clamp(40px,5vw,60px)] font-extrabold leading-[1.02] tracking-[-0.025em] text-white [text-wrap:balance]">
              {title}
            </h1>
            <p className="mt-4 max-w-[560px] font-body text-[18px] leading-relaxed text-white/85">
              {subtitle}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/get-a-quote"
                className="ke-press inline-flex items-center justify-center gap-2.5 rounded-pill bg-green-500 px-[32px] py-[15px] font-display text-[16px] font-bold text-white shadow-green hover:bg-green-600"
              >
                Get a Free Quote <Icon name="arrow" size={20} stroke={2.4} />
              </Link>
              <Link
                href="/build"
                className="ke-press inline-flex items-center gap-2.5 rounded-pill border-[1.5px] border-white/25 bg-white/10 px-7 py-[14px] font-display text-[16px] font-bold text-white hover:bg-white/20 transition-colors"
              >
                Build your system
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services we provide */}
      <section className="bg-paper py-[78px]">
        <div className="container-ke">
          <div className="mb-11 max-w-[620px]">
            <h2 className="font-display text-[clamp(26px,3vw,40px)] font-extrabold tracking-[-0.02em] text-navy-700">
              {servicesHeading}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div
                key={s.title}
                className="ke-lift flex flex-col rounded-xl border border-ash-200 bg-white p-7 shadow-md"
              >
                <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-[15px] bg-green-50 text-green-600">
                  <Icon name={s.icon} size={26} />
                </span>
                <h3 className="mb-2 font-display text-[18px] font-bold text-navy-700">
                  {s.title}
                </h3>
                <p className="font-body text-[14.5px] leading-relaxed text-ash-700">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Systems in this category — each links to its /systems/<slug> page */}
      <section className="bg-white py-[78px]">
        <div className="container-ke">
          <div className="mb-11 max-w-[640px]">
            <Eyebrow>Our Systems</Eyebrow>
            <h2 className="mt-3 font-display text-[clamp(26px,3vw,40px)] font-extrabold tracking-[-0.02em] text-navy-700">
              {systemsHeading}
            </h2>
            <p className="mt-3 font-body text-[16.5px] leading-relaxed text-ash-700">
              {systemsIntro}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {systems.map((s) => (
              <Link
                key={s.slug}
                href={`/systems/${s.slug}`}
                className="ke-lift group relative flex flex-col rounded-xl border border-ash-200 bg-white p-7 shadow-md transition-colors hover:border-green-500"
              >
                {s.recommended && (
                  <span className="absolute right-5 top-5 rounded-pill bg-gold-400 px-2.5 py-[3px] font-display text-[10.5px] font-bold text-forest-900">
                    MOST POPULAR
                  </span>
                )}
                <div className="font-display text-[34px] font-extrabold leading-none text-navy-800">
                  {s.size}
                </div>
                <div className="mt-1.5 font-body text-[13.5px] font-semibold text-ash-700">
                  {s.audience}
                </div>
                <p className="mt-3 font-body text-[14px] leading-relaxed text-ash-700">
                  {s.tagline}
                </p>

                <ul className="mt-4 flex flex-col gap-2">
                  {s.specs.slice(0, 3).map((spec) => (
                    <li
                      key={spec}
                      className="flex items-start gap-2 font-body text-[13.5px] text-ink"
                    >
                      <Icon name="check" size={15} stroke={3} className="mt-0.5 flex-none text-green-500" />
                      {spec}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex items-end justify-between border-t border-ash-200 pt-4">
                  <div>
                    <div className="font-body text-[11.5px] font-bold uppercase tracking-[0.05em] text-ash-500">
                      {s.price !== null ? "From" : ""}
                    </div>
                    <div className="font-display text-[20px] font-extrabold text-green-600">
                      {s.price !== null ? AUD.format(s.price) : "Enquire"}
                    </div>
                    <div className="mt-0.5 font-body text-[12px] text-ash-500">
                      ~{AUD.format(s.savingsPerYear)}/yr saved
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 font-display text-[13.5px] font-bold text-forest-700 group-hover:text-green-600">
                    View system
                    <Icon name="arrow" size={15} stroke={2.4} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <QuoteCTA />
    </>
  );
}
