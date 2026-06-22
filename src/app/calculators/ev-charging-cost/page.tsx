import type { Metadata } from "next";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/sections/PageHero";
import { EvChargingCalculator } from "@/components/sections/EvChargingCalculator";
import { QuoteCTA } from "@/components/sections/QuoteCTA";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "EV Charging Cost Calculator — Solar vs Grid Charging Savings",
  description:
    "Work out what it costs to charge your electric car each year, and how much you save charging from solar instead of the grid. By postcode and driving distance.",
  alternates: { canonical: "/calculators/ev-charging-cost" },
  openGraph: {
    title: "EV Charging Cost Calculator — Solar vs Grid",
    description: "Compare the yearly cost of charging your EV on solar versus the grid.",
    type: "website",
  },
};

const FAQ: { q: string; a: string }[] = [
  {
    q: "How much does it cost to charge an EV at home?",
    a: "Most electric cars use about 16 kWh per 100 km. On a grid rate of 30 c/kWh that's roughly $4.80 per 100 km; charging from your own solar can drop that to well under a dollar.",
  },
  {
    q: "How much can solar save on EV charging?",
    a: "Charging from solar you'd otherwise export costs only the feed-in rate (a few cents), versus 25–40 c/kWh from the grid. For an average driver that's often $700–$1,500 saved a year.",
  },
  {
    q: "Do I need a special EV charger?",
    a: "A 7 kW single-phase charger suits most homes and charges overnight or during a sunny day. Three-phase homes can add a 22 kW charger for faster top-ups. Either pairs well with solar and a battery.",
  },
  {
    q: "Are these numbers exact?",
    a: "They're an estimate based on 16 kWh/100 km and the rates you enter. Your real cost depends on your car's efficiency, your tariff and how much you charge from solar versus the grid.",
  },
];

export default function EvChargingPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Calculators", item: "/calculators" },
      { "@type": "ListItem", position: 2, name: "EV Charging Cost Calculator", item: "/calculators/ev-charging-cost" },
    ],
  };

  return (
    <SiteLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <PageHero
        eyebrow="EV Charging"
        title={
          <>
            Charge your car on <span className="text-green-600">sunshine.</span>
          </>
        }
        subtitle="See what charging your EV costs each year, and how much you save running it on solar instead of the grid."
      />

      <section className="bg-paper py-14">
        <div className="container-ke">
          <EvChargingCalculator />
        </div>
      </section>

      <section className="bg-white py-[78px]">
        <div className="container-ke max-w-[820px]">
          <h2 className="font-display text-[clamp(26px,3vw,38px)] font-extrabold tracking-[-0.02em] text-navy-800">
            Frequently asked questions
          </h2>
          <div className="mt-6 divide-y divide-ash-200 border-y border-ash-200">
            {FAQ.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-display text-[16px] font-bold text-navy-700 marker:content-['']">
                  {f.q}
                  <Icon
                    name="chevron"
                    size={18}
                    className="flex-none text-ash-500 transition-transform group-open:rotate-180"
                  />
                </summary>
                <p className="mt-2.5 font-body text-[14.5px] leading-relaxed text-ash-700">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <QuoteCTA />
    </SiteLayout>
  );
}
