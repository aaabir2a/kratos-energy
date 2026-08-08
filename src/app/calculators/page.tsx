import Link from "next/link";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/sections/PageHero";
import { QuoteCTA } from "@/components/sections/QuoteCTA";
import { Icon } from "@/components/ui/Icon";
import { pageMetadata } from "@/lib/seo/metadata";
import { itemListLd, breadcrumbLd } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { CALCULATORS } from "@/lib/calculators";

export const metadata = pageMetadata({
  title: "Free Solar & Battery Calculators",
  description:
    "Free Australian solar calculators: estimate your 2026 STC rebate and battery rebate by postcode, model savings and payback, and build your own system.",
  path: "/calculators",
  keywords: ["solar calculator Australia", "solar rebate calculator", "battery rebate calculator"],
});


export default function CalculatorsHub() {
  const structuredData = [
    itemListLd(
      CALCULATORS.map((c) => ({ name: c.title, path: c.href, description: c.desc })),
    ),
    breadcrumbLd([{ name: "Calculators", path: "/calculators" }]),
  ];

  return (
    <SiteLayout>
      {structuredData.map((data, i) => (
        <JsonLd key={i} data={data} />
      ))}

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
