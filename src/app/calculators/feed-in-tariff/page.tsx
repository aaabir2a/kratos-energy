import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/sections/PageHero";
import { FeedInCalculator } from "@/components/sections/FeedInCalculator";
import { QuoteCTA } from "@/components/sections/QuoteCTA";
import { Icon } from "@/components/ui/Icon";
import { faqLd, breadcrumbLd, calculatorLd } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo/metadata";
import { RelatedCalculators } from "@/components/sections/RelatedCalculators";

export const metadata = pageMetadata({
  title: "Feed-in Tariff Calculator 2026 (by State)",
  description:
    "Estimate what your exported solar is worth with 2026 feed-in tariffs by state. See annual export earnings by postcode, system size and feed-in rate.",
  path: "/calculators/feed-in-tariff",
  keywords: ["feed-in tariff calculator", "solar feed in tariff 2026", "solar export earnings"],
});

const FAQ: { q: string; a: string }[] = [
  {
    q: "What is a solar feed-in tariff?",
    a: "A feed-in tariff (FiT) is the per-kWh credit your retailer pays for surplus solar you export to the grid. It's applied to your bill on top of the savings from using solar in your home.",
  },
  {
    q: "What are feed-in tariffs in 2026?",
    a: "They're low — generally around 3–8 c/kWh depending on state and retailer, and some plans pay nothing during the sunny midday window. Western Australia and a few retailers offer higher rates for evening exports.",
  },
  {
    q: "Should I export or self-consume?",
    a: "With import power costing 25–40 c/kWh and exports paying only a few cents, using your own solar is worth far more than selling it. Shifting appliances to daytime — or adding a battery — beats exporting in 2026.",
  },
  {
    q: "Are these figures exact?",
    a: "We pre-fill a typical rate for your state, but feed-in tariffs vary by retailer and plan. Enter your own rate from your bill for an accurate figure — the result is an estimate, not a quote.",
  },
];

export default function FeedInPage() {
  const structuredData = [
    faqLd(FAQ),
    breadcrumbLd([
      { name: "Calculators", path: "/calculators" },
      { name: "Feed-in Tariff Calculator", path: "/calculators/feed-in-tariff" },
    ]),
    calculatorLd({
      name: "Feed-in Tariff Calculator",
      description:
        "Estimate what your exported solar is worth using 2026 feed-in tariffs by Australian state.",
      path: "/calculators/feed-in-tariff",
      featureList: ["2026 feed-in rates by state", "Annual export earnings", "By system size"],
    }),
  ];

  return (
    <SiteLayout>
      {structuredData.map((data, i) => (
        <JsonLd key={i} data={data} />
      ))}

      <PageHero
        eyebrow="Feed-in Tariff"
        title={
          <>
            What is your exported solar <span className="text-green-600">worth?</span>
          </>
        }
        subtitle="Estimate your annual feed-in earnings with 2026 export rates by state — and see why self-consumption now wins."
      />

      <section className="bg-paper py-14">
        <div className="container-ke">
          <FeedInCalculator />
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
      <RelatedCalculators currentPath="/calculators/feed-in-tariff" />

    </SiteLayout>
  );
}
