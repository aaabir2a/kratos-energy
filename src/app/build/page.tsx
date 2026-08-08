import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/sections/PageHero";
import { SystemConfigurator } from "@/components/sections/SystemConfigurator";
import { QuoteCTA } from "@/components/sections/QuoteCTA";
import { pageMetadata } from "@/lib/seo/metadata";
import { RelatedCalculators } from "@/components/sections/RelatedCalculators";
import { SystemSizingGuide, SIZING_STEPS } from "@/components/sections/SystemSizingGuide";
import { Icon } from "@/components/ui/Icon";
import { breadcrumbLd, calculatorLd, howToLd, faqLd } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata = pageMetadata({
  title: "Build Your Solar System — Live Pricing",
  description:
    "Design your own solar system in minutes: pick panels, inverter, battery and EV charging, and see live Australian pricing including GST and your STC rebate.",
  path: "/build",
  keywords: ["build solar system", "solar system builder", "solar package pricing Australia"],
});

const FAQ: { q: string; a: string }[] = [
  {
    q: "What size solar system do I need?",
    a: "Divide your average daily usage in kWh by about four — each kW of solar generates roughly 4 kWh a day across most of Australia. A typical family home using 20 kWh a day is well matched by a 6.6kW system; add headroom if you have ducted air-conditioning, a pool, an EV or plan to add a battery.",
  },
  {
    q: "Are the prices shown the final price?",
    a: "Prices include GST and already have the federal STC rebate deducted, so they reflect what you pay. The only variables are non-standard installation factors like a tile-to-tin transition, a switchboard upgrade or a long cable run, which we confirm during the free site design.",
  },
  {
    q: "Should I add a battery now or later?",
    a: "Adding a battery at installation is cheaper than retrofitting, because the mounting, wiring and inspection all happen once. The federal Cheaper Home Batteries rebate discounts it per usable kWh, which shortens payback considerably compared to previous years.",
  },
  {
    q: "Can I add more panels later?",
    a: "Sometimes — it depends on spare inverter capacity and your network's export limit. It is almost always cheaper to size a few kW larger up front than to run a second installation later.",
  },
  {
    q: "Do you install outside NSW, Victoria and the ACT?",
    a: "Not currently. Kratos Energy installs across New South Wales, Victoria and the Australian Capital Territory. You're welcome to use the builder and calculators wherever you are.",
  },
];

export default function BuildPage() {
  const structuredData = [
    breadcrumbLd([
      { name: "Calculators", path: "/calculators" },
      { name: "Build Your System", path: "/build" },
    ]),
    calculatorLd({
      name: "Solar System Builder",
      description:
        "Design a solar system by choosing panels, inverter, battery and EV charging, and see live Australian pricing including GST and the STC rebate.",
      path: "/build",
      featureList: ["Live pricing", "Panel, inverter and battery options", "GST and STC rebate included"],
    }),
    howToLd({
      name: "How to size your solar system",
      description:
        "Five steps to work out the right solar system size for an Australian home, from daily usage to battery and EV charging.",
      path: "/build",
      steps: SIZING_STEPS,
    }),
    faqLd(FAQ),
  ];

  return (
    <SiteLayout>
      {structuredData.map((data, i) => (
        <JsonLd key={i} data={data} />
      ))}

      <PageHero
        eyebrow="Build Your System"
        title={
          <>
            Design your solar, <span className="text-green-600">your way.</span>
          </>
        }
        subtitle="Mix and match panels, inverter, battery and EV charging — watch the price update live, then request your build."
      />

      <section className="bg-paper py-14">
        <div className="container-ke">
          <SystemConfigurator />
        </div>
      </section>

      {/* Server-rendered content — the configurator above is client-side, so
          without this there is nothing on the page for a crawler to read. */}
      <section className="bg-white py-14 sm:py-[72px]">
        <div className="container-ke max-w-[900px]">
          <SystemSizingGuide />
        </div>
      </section>

      <section className="bg-paper py-14">
        <div className="container-ke max-w-[900px]">
          <h2 className="font-display text-[clamp(24px,3vw,34px)] font-extrabold tracking-[-0.02em] text-navy-700">
            Building your system: common questions
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

      <RelatedCalculators currentPath="/build" />
      <QuoteCTA />

    </SiteLayout>
  );
}
