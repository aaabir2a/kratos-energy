import Link from "next/link";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/sections/PageHero";
import { QuoteCTA } from "@/components/sections/QuoteCTA";
import { Icon } from "@/components/ui/Icon";
import { pageMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbLd } from "@/lib/seo/schema";

export const metadata = pageMetadata({
  title: "Our Products",
  description:
    "Solar panels and inverters, home battery storage and EV chargers — the equipment Kratos Energy supplies and installs across NSW, Victoria and the ACT.",
  path: "/products",
  keywords: ["solar products Australia", "solar panels inverters batteries", "EV charger"],
});

const PRODUCTS = [
  {
    icon: "sun",
    title: "Solar",
    href: "/products/solar",
    blurb:
      "Tier 1 panels and hybrid inverters from FoxESS, GoodWe, Sungrow, Sigenergy, ESY and Sofar.",
  },
  {
    icon: "battery",
    title: "Battery",
    href: "/products/battery",
    blurb:
      "Store your daytime solar and run the house after dark, with blackout protection and 2026 rebates applied.",
  },
  {
    icon: "zap",
    title: "EV Charging",
    href: "/products/ev-charging",
    blurb:
      "Smart 7kW and 22kW home chargers, installed by licensed electricians and matched to your solar.",
  },
];

export default function ProductsPage() {
  return (
    <SiteLayout>
      <JsonLd data={breadcrumbLd([{ name: "Our Products", path: "/products" }])} />

      <PageHero
        eyebrow="Panels · Batteries · Chargers"
        title="Everything we install, in one place."
        subtitle="Three product lines that work together — generate it, store it, then drive on it."
      />

      <section className="bg-paper py-16 sm:py-20">
        <div className="container-ke">
          <div className="grid gap-4 md:grid-cols-3">
            {PRODUCTS.map((p) => (
              <Link
                key={p.title}
                href={p.href}
                className="ke-lift flex flex-col rounded-lg border border-ash-200 bg-white p-7"
              >
                <Icon name={p.icon} size={26} stroke={2.2} className="text-green-500" />
                <h2 className="mt-4 font-display text-[22px] font-extrabold tracking-[-0.02em] text-navy-800">
                  {p.title}
                </h2>
                <p className="mt-2.5 grow font-body text-[15px] leading-relaxed text-ash-700">
                  {p.blurb}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 font-display text-[14px] font-bold text-forest-700">
                  Explore {p.title} <Icon name="arrow" size={15} stroke={2.4} />
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
