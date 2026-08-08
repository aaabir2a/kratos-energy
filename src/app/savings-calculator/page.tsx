import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/sections/PageHero";
import { ROICalculator } from "@/components/sections/ROICalculator";
import { pageMetadata } from "@/lib/seo/metadata";
import { RelatedCalculators } from "@/components/sections/RelatedCalculators";
import { PaybackGuide } from "@/components/sections/PaybackGuide";
import { Icon } from "@/components/ui/Icon";
import { breadcrumbLd, calculatorLd, faqLd } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/JsonLd";
// import { GuideDownload } from "@/components/sections/GuideDownload";

export const metadata = pageMetadata({
  title: "Solar Savings & Payback Calculator",
  description:
    "Work out your solar payback period and 25-year net benefit in seconds. Adjust system size and power bill to see exactly when your solar pays for itself.",
  path: "/savings-calculator",
  keywords: ["solar savings calculator", "solar payback period Australia", "is solar worth it"],
});

const FAQ: { q: string; a: string }[] = [
  {
    q: "How long does solar take to pay for itself in Australia?",
    a: "Most Australian homes see payback in three to five years. A 6.6kW system on a typical household bill usually pays for itself in under four years, and panels are warranted for 25 — so the majority of the system's life is pure return.",
  },
  {
    q: "Is solar still worth it in 2026?",
    a: "Yes, though the maths has shifted. Feed-in tariffs are lower than they once were, so the value now comes from using your own generation rather than exporting it. That makes self-consumption — and increasingly a battery — the deciding factor rather than raw system size.",
  },
  {
    q: "What is a realistic annual saving from solar?",
    a: "Between about $1,800 and $3,000 a year for a typical home, depending on system size, how much generation you use on site, and your retail tariff. Households home during the day sit at the upper end.",
  },
  {
    q: "Does a battery improve the payback period?",
    a: "A battery lengthens simple payback because it adds cost, but it raises total savings by letting you use solar after dark instead of exporting it. With the federal Cheaper Home Batteries rebate applied, the gap has narrowed considerably.",
  },
  {
    q: "Are these savings figures guaranteed?",
    a: "No — they're estimates based on indicative pricing and average generation under Clean Energy Council guidelines. Your actual saving depends on usage, tariff, feed-in rate, roof orientation and shading, all of which we assess during the free design.",
  },
];

export default function SavingsCalculatorPage() {
  const structuredData = [
    breadcrumbLd([
      { name: "Calculators", path: "/calculators" },
      { name: "Savings & Payback Calculator", path: "/savings-calculator" },
    ]),
    calculatorLd({
      name: "Solar Savings & Payback Calculator",
      description:
        "Model your solar payback period and 25-year net benefit by system size and power bill.",
      path: "/savings-calculator",
      featureList: ["Payback period", "25-year net benefit", "By system size and bill"],
    }),
    faqLd(FAQ),
  ];

  return (
    <SiteLayout>
      {structuredData.map((data, i) => (
        <JsonLd key={i} data={data} />
      ))}

      <PageHero
        eyebrow="Savings & ROI Calculator"
        title={
          <>
            See exactly when <span className="text-green-600">solar pays off.</span>
          </>
        }
        subtitle="Adjust your system size and power bill to model your payback period and 25-year return — no email required."
      />

      <section className="bg-paper py-14">
        <div className="container-ke">
          <ROICalculator />
          <p className="mx-auto mt-8 max-w-[680px] text-center font-body text-[12.5px] leading-relaxed text-ash-500">
            *Estimates only, based on indicative pricing and average generation
            under CEC guidelines. Actual savings vary with usage, tariff, feed-in
            rate and site conditions.
          </p>
        </div>
      </section>

      {/* Server-rendered content — ROICalculator above is client-side. */}
      <section className="bg-white py-14 sm:py-[72px]">
        <div className="container-ke max-w-[900px]">
          <PaybackGuide />
        </div>
      </section>

      <section className="bg-paper py-14">
        <div className="container-ke max-w-[900px]">
          <h2 className="font-display text-[clamp(24px,3vw,34px)] font-extrabold tracking-[-0.02em] text-navy-700">
            Solar savings questions
          </h2>
          <div className="mt-6 flex flex-col gap-3.5">
            {FAQ.map((f) => (
              <details
                key={f.q}
                className="group rounded-lg border border-ash-200 bg-white p-5 shadow-sm [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-display text-[16.5px] font-bold text-navy-700">
                  <h3 className="m-0 font-display text-[16.5px] font-bold">{f.q}</h3>
                  <Icon
                    name="chevron"
                    size={20}
                    className="flex-none text-green-500 transition-transform group-open:rotate-180"
                  />
                </summary>
                <p className="mt-3 font-body text-[15px] leading-relaxed text-ash-700">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* <GuideDownload /> */}
      <RelatedCalculators currentPath="/savings-calculator" />

    </SiteLayout>
  );
}
