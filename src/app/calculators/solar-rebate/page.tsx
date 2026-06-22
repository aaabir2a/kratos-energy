import type { Metadata } from "next";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/sections/PageHero";
import { RebateCalculator } from "@/components/sections/RebateCalculator";
import { QuoteCTA } from "@/components/sections/QuoteCTA";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Solar Rebate Calculator 2026 — STC & Battery Rebates by Postcode",
  description:
    "Calculate your 2026 solar STC rebate and federal battery rebate by postcode. Accurate Clean Energy Regulator zone ratings and the Cheaper Home Batteries Program, updated for Australia.",
  alternates: { canonical: "/calculators/solar-rebate" },
  openGraph: {
    title: "Solar Rebate Calculator — STC & Battery Rebates by Postcode",
    description:
      "Enter your postcode to estimate your solar STC rebate and federal battery rebate, using official CER zone ratings.",
    type: "website",
  },
};

const FAQ: { q: string; a: string }[] = [
  {
    q: "What is the solar STC rebate?",
    a: "Small-scale Technology Certificates (STCs) are the federal government's main solar rebate. Your system is awarded a number of certificates based on its size, your postcode's solar zone, and how many years remain in the scheme. Installers usually apply the value as an upfront discount.",
  },
  {
    q: "How is my STC rebate calculated?",
    a: "STCs = system size (kW) × your postcode zone rating × the deeming period (years until the scheme ends in 2030), rounded down. That number is multiplied by the STC market price (around $38 after fees) to give your rebate.",
  },
  {
    q: "What are postcode solar zones?",
    a: "The Clean Energy Regulator divides Australia into four zones by solar radiation. Zone 1 (highest sun, rating 1.622) creates the most certificates; Zone 4 (rating 1.185) the fewest. Sydney, Brisbane, Perth and Adelaide are Zone 3; Melbourne and Tasmania are Zone 4.",
  },
  {
    q: "Does the rebate get smaller each year?",
    a: "Yes. The deeming period drops by one year every January because the scheme is legislated to end on 31 December 2030. Installing sooner means more certificates and a larger rebate.",
  },
  {
    q: "How much is the federal battery rebate?",
    a: "Under the Cheaper Home Batteries Program (tiered from 1 May 2026), batteries earn roughly $252 per usable kWh for the first 14 kWh, 60% of that from 14–28 kWh, and 15% from 28–50 kWh. Capacity above 50 kWh receives no extra support.",
  },
  {
    q: "Are these figures accurate?",
    a: "We use the official CER postcode zone table and the published Cheaper Home Batteries rates, date-stamped on the calculator. Results are estimates, not quotes — the STC price moves with the market and state schemes change, so your final figure is confirmed at installation.",
  },
];

export default function SolarRebatePage() {
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
      { "@type": "ListItem", position: 2, name: "Solar Rebate Calculator", item: "/calculators/solar-rebate" },
    ],
  };

  return (
    <SiteLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <PageHero
        eyebrow="Rebate Calculator"
        title={
          <>
            Your solar rebate, <span className="text-green-600">by postcode.</span>
          </>
        }
        subtitle="Estimate your 2026 STC solar rebate and federal battery rebate using official Clean Energy Regulator zone ratings. Accurate, sourced and updated."
      />

      <section className="bg-paper py-14">
        <div className="container-ke">
          <RebateCalculator />
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-[78px]">
        <div className="container-ke max-w-[820px]">
          <h2 className="font-display text-[clamp(26px,3vw,38px)] font-extrabold tracking-[-0.02em] text-navy-800">
            How the solar rebate works
          </h2>
          <p className="mt-4 font-body text-[16.5px] leading-relaxed text-ash-700">
            Australia&apos;s main solar incentive is the federal STC scheme. When you install a system, it
            earns Small-scale Technology Certificates based on three things: how big the system is, how much
            sun your postcode gets, and how many years are left in the scheme. Your installer typically
            redeems those certificates and passes the value back as an upfront discount.
          </p>

          <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              ["sun", "System size & zone", "Bigger systems in sunnier zones create more certificates."],
              ["clock", "Deeming period", "Years until the scheme ends in 2030 — it shrinks annually."],
              ["battery", "Battery on top", "The Cheaper Home Batteries Program adds a separate rebate per usable kWh."],
            ].map(([icon, title, body]) => (
              <div key={title} className="rounded-lg border border-ash-200 bg-paper p-5">
                <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-[12px] bg-green-50 text-green-600">
                  <Icon name={icon} size={22} />
                </span>
                <h3 className="font-display text-[15.5px] font-bold text-navy-700">{title}</h3>
                <p className="mt-1 font-body text-[13.5px] leading-relaxed text-ash-700">{body}</p>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <h2 className="mt-14 font-display text-[clamp(26px,3vw,38px)] font-extrabold tracking-[-0.02em] text-navy-800">
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
