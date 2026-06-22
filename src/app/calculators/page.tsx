import type { Metadata } from "next";
import Link from "next/link";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/sections/PageHero";
import { QuoteCTA } from "@/components/sections/QuoteCTA";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Solar & Battery Calculators — Rebates, Savings & System Builder",
  description:
    "Free Australian solar calculators: estimate your STC solar rebate and federal battery rebate by postcode, model your savings and payback, and build your own system.",
  alternates: { canonical: "/calculators" },
};

type Calc = {
  href: string;
  icon: string;
  title: string;
  desc: string;
  tag: string;
};

const CALCULATORS: Calc[] = [
  {
    href: "/calculators/solar-rebate",
    icon: "sun",
    title: "Solar Rebate Calculator",
    desc: "Estimate your federal STC solar rebate by postcode, using official Clean Energy Regulator zone ratings.",
    tag: "By postcode",
  },
  {
    href: "/calculators/battery-rebate",
    icon: "battery",
    title: "Battery Rebate Calculator",
    desc: "See your Cheaper Home Batteries rebate per usable kWh, with the tapered 2026 tiers and state support.",
    tag: "Cheaper Home Batteries",
  },
  {
    href: "/savings-calculator",
    icon: "trend",
    title: "Savings & Payback Calculator",
    desc: "Model your yearly bill savings, payback period and 25-year return from going solar.",
    tag: "Bill savings",
  },
  {
    href: "/calculators/solar-output",
    icon: "sun",
    title: "Solar Output Calculator",
    desc: "Estimate how many kWh your system generates per day, month and year, plus CO₂ avoided.",
    tag: "Generation",
  },
  {
    href: "/calculators/feed-in-tariff",
    icon: "zap",
    title: "Feed-in Tariff Calculator",
    desc: "See what your exported solar earns with 2026 feed-in rates by state.",
    tag: "Export earnings",
  },
  {
    href: "/calculators/ev-charging-cost",
    icon: "battery",
    title: "EV Charging Cost Calculator",
    desc: "Compare the yearly cost of charging your EV on solar versus the grid.",
    tag: "EV charging",
  },
  {
    href: "/build",
    icon: "wrench",
    title: "Build Your System",
    desc: "Design a system from your roof up — panels, inverter, battery and EV charging with live pricing.",
    tag: "System builder",
  },
];

export default function CalculatorsHub() {
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: CALCULATORS.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.title,
      url: c.href,
    })),
  };

  return (
    <SiteLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />

      <PageHero
        eyebrow="Calculators"
        title={
          <>
            Know your numbers <span className="text-green-600">before you commit.</span>
          </>
        }
        subtitle="Free tools to estimate your rebates, savings and the right system — built on official Australian data, no sign-up required."
      />

      <section className="bg-paper py-14 sm:py-[72px]">
        <div className="container-ke">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {CALCULATORS.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="ke-lift group flex flex-col rounded-xl border border-ash-200 bg-white p-7 shadow-md"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 flex-none items-center justify-center rounded-[13px] bg-green-50 text-green-600">
                    <Icon name={c.icon} size={24} />
                  </span>
                  <span className="rounded-pill bg-paper px-2.5 py-1 font-display text-[11px] font-bold uppercase tracking-[0.04em] text-ash-500">
                    {c.tag}
                  </span>
                </div>
                <h2 className="mt-4 font-display text-[20px] font-extrabold tracking-[-0.01em] text-navy-800">
                  {c.title}
                </h2>
                <p className="mt-1.5 flex-1 font-body text-[14.5px] leading-relaxed text-ash-700">{c.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 font-display text-[14px] font-bold text-green-600">
                  Open calculator
                  <Icon
                    name="arrow"
                    size={16}
                    stroke={2.4}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <QuoteCTA />
    </SiteLayout>
  );
}
