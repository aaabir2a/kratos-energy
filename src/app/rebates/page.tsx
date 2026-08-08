import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/sections/PageHero";
import { RebateExplorer } from "@/components/sections/RebateExplorer";
import { RebateSchemeGuide } from "@/components/sections/RebateSchemeGuide";
import { RelatedCalculators } from "@/components/sections/RelatedCalculators";
import { QuoteCTA } from "@/components/sections/QuoteCTA";
import { Icon } from "@/components/ui/Icon";
import { pageMetadata } from "@/lib/seo/metadata";
import { faqLd, breadcrumbLd } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata = pageMetadata({
  title: "Solar Rebates Australia 2026: Every Scheme",
  description:
    "Every 2026 solar and battery rebate in Australia explained — federal STCs, the Cheaper Home Batteries Program and each state scheme, with what you can claim.",
  path: "/rebates",
  keywords: ["solar rebates Australia", "government solar rebate 2026", "battery rebate Australia"],
});

/** Answers here must match the visible copy above — Google requires parity. */
const FAQ: { q: string; a: string }[] = [
  {
    q: "What solar rebates are available in Australia in 2026?",
    a: "Two federal schemes apply everywhere: Small-scale Technology Certificates (STCs) discount your solar panels, and the Cheaper Home Batteries Program discounts battery storage per usable kWh. On top of those, each state and territory runs its own support — mostly zero-interest loans rather than cash rebates.",
  },
  {
    q: "How much is the solar rebate for a 6.6kW system?",
    a: "It depends on your postcode's solar zone. In 2026 a 6.6kW system earns roughly $2,200–$2,900 in STCs, with sunnier Zone 1 and 2 areas at the higher end and Melbourne and Tasmania at the lower end. Your installer applies it as an upfront discount.",
  },
  {
    q: "Does the solar rebate reduce every year?",
    a: "Yes. STCs are calculated on the years remaining until the scheme ends on 31 December 2030, so the deeming period drops by one each January. The same system installed a year later earns fewer certificates and a smaller rebate.",
  },
  {
    q: "Can I claim the solar and battery rebates together?",
    a: "Yes. STCs cover the solar panels and the Cheaper Home Batteries Program covers the battery, and they stack. Many households also qualify for a state loan or incentive on top.",
  },
  {
    q: "Do I have to apply for the rebate myself?",
    a: "No. Kratos Energy handles the STC assignment and the battery rebate paperwork as part of the installation, so the discount is already in the price you're quoted.",
  },
];

export default function RebatesPage() {
  const structuredData = [
    faqLd(FAQ),
    breadcrumbLd([{ name: "Government Rebates", path: "/rebates" }]),
  ];

  return (
    <SiteLayout>
      {structuredData.map((data, i) => (
        <JsonLd key={i} data={data} />
      ))}

      <PageHero
        eyebrow="Government Rebates 2026"
        title={
          <>
            How much can <span className="text-green-600">you claim?</span>
          </>
        }
        subtitle="Solar rebates step down every year. Select your state to see what's available right now — we handle every form for you."
      />

      <section className="bg-paper py-14">
        <div className="container-ke">
          <RebateExplorer />
        </div>
      </section>

      {/* Server-rendered reference. The explorer above is a client component,
          so without this the page has nothing crawlable on it. */}
      <section className="bg-white py-14 sm:py-[72px]">
        <div className="container-ke max-w-[900px]">
          <RebateSchemeGuide />
        </div>
      </section>

      <section className="bg-paper py-14">
        <div className="container-ke max-w-[900px]">
          <h2 className="font-display text-[clamp(24px,3vw,34px)] font-extrabold tracking-[-0.02em] text-navy-700">
            Common questions about solar rebates
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

      <RelatedCalculators currentPath="/rebates" heading="Work out your own numbers" />

      <QuoteCTA />
    </SiteLayout>
  );
}
