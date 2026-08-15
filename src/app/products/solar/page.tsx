import Link from "next/link";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/sections/PageHero";
import { BrandCarousel } from "@/components/sections/BrandCarousel";
import { QuoteCTA } from "@/components/sections/QuoteCTA";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { INVERTER_BRANDS, PANEL_BRANDS } from "@/lib/brands";
import { pageMetadata } from "@/lib/seo/metadata";
import { serviceLd, breadcrumbLd } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata = pageMetadata({
  title: "Solar Panels & Inverters",
  description:
    "The solar panels and inverters Kratos Energy installs — Tier 1 modules plus FoxESS, GoodWe, Sungrow, Sigenergy, ESY and Sofar inverters, fitted across NSW, Victoria and the ACT.",
  path: "/products/solar",
  keywords: [
    "solar panel brands Australia",
    "solar inverter brands",
    "Sungrow inverter",
    "FoxESS inverter",
    "Tier 1 solar panels",
  ],
});

const PANEL_POINTS = [
  ["sun", "Tier 1 modules only", "Every panel we fit is CEC-approved and comes from a Tier 1 manufacturer with an Australian support presence."],
  ["shield", "25-year product warranty", "Not just performance cover — the panel itself is warranted for 25 years, backed locally."],
  ["trend", "High output per square metre", "Efficient N-type and mono modules mean more generation from the roof space you actually have."],
  ["leaf", "Built for Australian roofs", "Rated for local heat, salt-spray coastal air and wind loads, with certified mounting throughout."],
];

const INVERTER_POINTS = [
  ["zap", "Hybrid and battery-ready", "Add storage later without replacing the inverter — the hybrid units below take a battery when you are ready."],
  ["clock", "Monitoring from your phone", "See generation, consumption and export live, so you can tell the system is earning its keep."],
  ["wrench", "Serviceable in Australia", "We stock brands with local warranty channels, so a fault is a callout rather than a shipping saga."],
  ["shield", "10-year standard warranty", "Most units carry a 10-year warranty, extendable on selected models."],
];

function PointGrid({ points }: { points: string[][] }) {
  return (
    <div className="mt-9 grid gap-3.5 sm:grid-cols-2">
      {points.map(([icon, title, body]) => (
        <div key={title} className="rounded-lg border border-ash-200 bg-white p-6">
          <Icon name={icon} size={22} stroke={2.2} className="text-green-500" />
          <h3 className="mt-3.5 font-display text-[17.5px] font-bold tracking-[-0.01em] text-navy-800">
            {title}
          </h3>
          <p className="mt-2 font-body text-[15px] leading-relaxed text-ash-700">
            {body}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function SolarProductsPage() {
  return (
    <SiteLayout>
      <JsonLd
        data={serviceLd({
          name: "Solar Panel & Inverter Supply and Installation",
          description:
            "Supply and installation of Tier 1 solar panels and hybrid inverters for homes and businesses across NSW, Victoria and the ACT.",
          path: "/products/solar",
          serviceType: "Solar panel and inverter installation",
        })}
      />
      <JsonLd
        data={breadcrumbLd([
          { name: "Our Products", path: "/products" },
          { name: "Solar", path: "/products/solar" },
        ])}
      />

      <PageHero
        eyebrow="Panels · Inverters"
        title="The solar gear we actually install."
        subtitle="No mystery hardware. These are the panel and inverter brands we fit, why we chose them, and what they cost to run over 25 years."
      >
        <Link
          href="/get-a-quote"
          className="ke-lift ke-press inline-flex items-center gap-2 rounded-pill bg-green-500 px-7 py-3.5 font-display text-[15px] font-bold text-white shadow-green"
        >
          Get a free quote <Icon name="arrow" size={17} stroke={2.4} />
        </Link>
      </PageHero>

      {/* Solar panels */}
      <section className="bg-paper py-16 sm:py-20">
        <div className="container-ke">
          <div className="max-w-[680px]">
            <Eyebrow>Solar panels</Eyebrow>
            <h2 className="mt-3 font-display text-[clamp(26px,3.2vw,38px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-navy-700 [text-wrap:balance]">
              Tier 1 panels, chosen for Australian conditions.
            </h2>
            <p className="mt-4 font-body text-[17px] leading-relaxed text-ash-700">
              A solar panel is a 25-year purchase, so we only fit modules from
              manufacturers with a local warranty presence. If a panel fails in
              year twelve, someone in Australia answers the phone.
            </p>
          </div>

          <PointGrid points={PANEL_POINTS} />

          <div className="mt-12">
            <p className="mb-5 font-display text-[13px] font-bold uppercase tracking-[0.14em] text-ash-600">
              Panel &amp; mounting brands we install
            </p>
            <BrandCarousel
              brands={PANEL_BRANDS}
              icon="sun"
              label="Solar panel and mounting brands Kratos Energy installs"
            />
          </div>
        </div>
      </section>

      {/* Inverters */}
      <section className="border-t border-ash-200 bg-white py-16 sm:py-20">
        <div className="container-ke">
          <div className="max-w-[680px]">
            <Eyebrow>Inverters</Eyebrow>
            <h2 className="mt-3 font-display text-[clamp(26px,3.2vw,38px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-navy-700 [text-wrap:balance]">
              The inverter decides what your system is worth.
            </h2>
            <p className="mt-4 font-body text-[17px] leading-relaxed text-ash-700">
              Panels collect the energy; the inverter converts it, reports it and
              decides how much you keep. It is the part most likely to need
              service, which is why we fit hybrid units that take a battery later
              and are supported here rather than overseas.
            </p>
          </div>

          <PointGrid points={INVERTER_POINTS} />

          <div className="mt-12">
            <p className="mb-5 font-display text-[13px] font-bold uppercase tracking-[0.14em] text-ash-600">
              Inverter brands we install
            </p>
            <BrandCarousel
              brands={INVERTER_BRANDS}
              icon="zap"
              label="Inverter brands Kratos Energy installs"
              surface="white"
            />
          </div>

          <div className="mt-11 flex flex-wrap gap-3.5">
            <Link
              href="/products/battery"
              className="ke-lift inline-flex items-center gap-2 rounded-pill border border-ash-300 bg-white px-6 py-3 font-display text-[14.5px] font-bold text-forest-700"
            >
              Pair it with a battery <Icon name="arrow" size={16} stroke={2.4} />
            </Link>
            <Link
              href="/packages/6-6kw"
              className="ke-lift inline-flex items-center gap-2 rounded-pill border border-ash-300 bg-white px-6 py-3 font-display text-[14.5px] font-bold text-forest-700"
            >
              See system packages <Icon name="arrow" size={16} stroke={2.4} />
            </Link>
          </div>
        </div>
      </section>

      <QuoteCTA />
    </SiteLayout>
  );
}
