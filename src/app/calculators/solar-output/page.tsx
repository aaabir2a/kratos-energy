import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/sections/PageHero";
import { SolarOutputCalculator } from "@/components/sections/SolarOutputCalculator";
import { QuoteCTA } from "@/components/sections/QuoteCTA";
import { Icon } from "@/components/ui/Icon";
import { faqLd, breadcrumbLd, calculatorLd } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo/metadata";
import { RelatedCalculators } from "@/components/sections/RelatedCalculators";

export const metadata = pageMetadata({
  title: "Solar Output Calculator Australia — kWh by Postcode & State",
  description:
    "Estimate how many kWh your solar will generate per day, month and year by Australian postcode, plus the CO2 you avoid. Based on Australian city generation averages.",
  path: "/calculators/solar-output",
  keywords: [
    "solar output calculator Australia",
    "solar generation by postcode Australia",
    "how much power will my solar generate Australia",
  ],
});

const FAQ: { q: string; a: string }[] = [
  {
    q: "How much power does a solar system generate?",
    a: "In Australia each 1 kW of panels produces roughly 3.3–4.4 kWh per day on average, depending on your location. A 6.6 kW system makes about 25–30 kWh a day in most capital cities across the year.",
  },
  {
    q: "Why does my postcode matter?",
    a: "Solar output tracks sunlight. Sunnier regions like Perth, Brisbane and Adelaide generate more per kW than cooler, cloudier ones like Melbourne and Hobart. We use city-level generation averages to estimate your output.",
  },
  {
    q: "Will I really get this much every day?",
    a: "No — it's an annual average. Summer days generate well above the figure and winter days below it. Orientation, tilt, shading and panel quality also shift the real number.",
  },
  {
    q: "How much CO₂ does solar save?",
    a: "Each kWh of solar displaces roughly 0.66 kg of CO₂ from Australia's grid. A typical 6.6 kW system avoids several tonnes a year — the calculator shows the equivalent in trees planted.",
  },
];

export default function SolarOutputPage() {
  const structuredData = [
    faqLd(FAQ),
    breadcrumbLd([
      { name: "Calculators", path: "/calculators" },
      { name: "Solar Output Calculator", path: "/calculators/solar-output" },
    ]),
    calculatorLd({
      name: "Solar Output Calculator",
      description:
        "Estimate how many kWh your solar system will generate each day, month and year by postcode, plus the CO2 you avoid.",
      path: "/calculators/solar-output",
      featureList: ["Daily, monthly and annual kWh", "By postcode and system size", "CO2 avoided"],
    }),
  ];

  return (
    <SiteLayout>
      {structuredData.map((data, i) => (
        <JsonLd key={i} data={data} />
      ))}

      <PageHero
        eyebrow="Solar Output"
        title={
          <>
            How much will your solar <span className="text-green-600">generate?</span>
          </>
        }
        subtitle="Estimate your daily, monthly and yearly solar output by postcode and system size, plus the CO₂ you'll avoid."
      />

      <section className="bg-paper py-14">
        <div className="container-ke">
          <SolarOutputCalculator />
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
      <RelatedCalculators currentPath="/calculators/solar-output" />

    </SiteLayout>
  );
}
