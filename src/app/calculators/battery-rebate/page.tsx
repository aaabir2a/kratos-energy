import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/sections/PageHero";
import { BatteryRebateCalculator } from "@/components/sections/BatteryRebateCalculator";
import { QuoteCTA } from "@/components/sections/QuoteCTA";
import { Icon } from "@/components/ui/Icon";
import { faqLd, breadcrumbLd, calculatorLd } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo/metadata";
import { RelatedCalculators } from "@/components/sections/RelatedCalculators";

export const metadata = pageMetadata({
  title: "Australian Battery Rebate Calculator 2026 — Federal & State",
  description:
    "Calculate your 2026 Australian federal home battery rebate under the Cheaper Home Batteries Program — tiered amounts per usable kWh, plus state support by postcode.",
  path: "/calculators/battery-rebate",
  keywords: [
    "battery rebate calculator Australia",
    "Cheaper Home Batteries Program Australia",
    "home battery rebate 2026 Australia",
  ],
});

const FAQ: { q: string; a: string }[] = [
  {
    q: "What is the federal battery rebate?",
    a: "The Cheaper Home Batteries Program gives households roughly a 30% discount on the cost of installing an eligible home battery (5–100 kWh). The discount is delivered through Small-scale Technology Certificates and is usually applied upfront by your installer.",
  },
  {
    q: "How much is the battery rebate per kWh?",
    a: "From 1 May 2026 the rebate is tiered: about $252 per usable kWh for the first 14 kWh, 60% of that (≈$151) from 14–28 kWh, and 15% (≈$38) from 28–50 kWh. Usable capacity above 50 kWh receives no extra rebate.",
  },
  {
    q: "Why did the battery rebate change in May 2026?",
    a: "The program was overhauled to stretch funding further: the full rate now applies only to the first 14 kWh, with larger batteries receiving a reduced top-up. This rewards right-sized batteries while still supporting bigger systems.",
  },
  {
    q: "Can I get a state battery rebate too?",
    a: "Often yes. Several states and territories run their own battery rebates or interest-free loans on top of the federal rebate. These change frequently, so we link you to your state's official scheme rather than estimate a figure that may be out of date.",
  },
  {
    q: "Are these numbers accurate?",
    a: "The federal per-kWh rates are taken from the published Cheaper Home Batteries Program and date-stamped on the calculator. Results are estimates, not quotes — your final rebate depends on the certified usable capacity and the certificate price at installation.",
  },
];

export default function BatteryRebatePage() {
  const structuredData = [
    faqLd(FAQ),
    breadcrumbLd([
      { name: "Calculators", path: "/calculators" },
      { name: "Battery Rebate Calculator", path: "/calculators/battery-rebate" },
    ]),
    calculatorLd({
      name: "Battery Rebate Calculator",
      description:
        "Calculate your federal home battery rebate under the Cheaper Home Batteries Program, including the tiered rate per usable kWh.",
      path: "/calculators/battery-rebate",
      featureList: ["Tiered rate per usable kWh", "State battery support", "Postcode aware"],
    }),
  ];

  return (
    <SiteLayout>
      {structuredData.map((data, i) => (
        <JsonLd key={i} data={data} />
      ))}

      <PageHero
        eyebrow="Battery Rebate"
        title={
          <>
            Your battery rebate, <span className="text-green-600">tier by tier.</span>
          </>
        }
        subtitle="Estimate your 2026 federal Cheaper Home Batteries rebate by usable kWh, with the tapered rates that took effect on 1 May 2026."
      />

      <section className="bg-paper py-14">
        <div className="container-ke">
          <BatteryRebateCalculator />
        </div>
      </section>

      <section className="bg-white py-[78px]">
        <div className="container-ke max-w-[820px]">
          <h2 className="font-display text-[clamp(26px,3vw,38px)] font-extrabold tracking-[-0.02em] text-navy-800">
            How the battery rebate works
          </h2>
          <p className="mt-4 font-body text-[16.5px] leading-relaxed text-ash-700">
            The Cheaper Home Batteries Program discounts the upfront cost of an eligible battery by issuing
            certificates against its usable capacity. Since 1 May 2026 the rate tapers as the battery gets
            bigger, so the strongest value is in the first 14 kWh — enough to cover most family homes&apos;
            overnight needs.
          </p>

          <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              ["battery", "Sized on usable kWh", "Rebate is based on certified usable capacity, not the nameplate figure."],
              ["trend", "Tapered tiers", "Full rate to 14 kWh, 60% to 28 kWh, 15% to the 50 kWh cap."],
              ["shield", "State on top", "Many states add their own rebate or interest-free loan."],
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
      <RelatedCalculators currentPath="/calculators/battery-rebate" />

    </SiteLayout>
  );
}
