import type { Metadata } from "next";
import Link from "next/link";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/sections/PageHero";
import { QuoteCTA } from "@/components/sections/QuoteCTA";
import { Icon } from "@/components/ui/Icon";
import { STATE_META } from "@/lib/states";
import { ZONE_RATING, zoneForPostcode } from "@/lib/rebates";
import { ENERGY_BY_STATE } from "@/lib/energy";

export const metadata: Metadata = {
  title: "Solar Rebates & Costs by State — Australia 2026 Guide",
  description:
    "Solar rebates, generation and feed-in tariffs for every Australian state and territory. Pick your state for 2026 STC rebate amounts, battery rebates and savings.",
  alternates: { canonical: "/solar" },
};

export default function SolarStatesIndex() {
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: STATE_META.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `Solar in ${s.name}`,
      url: `/solar/${s.slug}`,
    })),
  };

  return (
    <SiteLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />

      <PageHero
        eyebrow="Solar by State"
        title={
          <>
            Solar rebates & costs, <span className="text-green-600">state by state.</span>
          </>
        }
        subtitle="Rebates, generation and feed-in tariffs differ across Australia. Choose your state for 2026 figures built on official data."
      />

      <section className="bg-paper py-14 sm:py-[72px]">
        <div className="container-ke">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {STATE_META.map((s) => {
              const zone = zoneForPostcode(s.capitalPostcode)!;
              const energy = ENERGY_BY_STATE[s.code];
              return (
                <Link
                  key={s.slug}
                  href={`/solar/${s.slug}`}
                  className="ke-lift group flex flex-col rounded-xl border border-ash-200 bg-white p-6 shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="font-display text-[20px] font-extrabold tracking-[-0.01em] text-navy-800">
                      {s.name}
                    </h2>
                    <span className="rounded-pill bg-green-50 px-2.5 py-1 font-display text-[11px] font-bold text-forest-700">
                      Zone {zone}
                    </span>
                  </div>
                  <div className="mt-3 flex gap-5 font-body text-[12.5px] text-ash-500">
                    <span>
                      <strong className="font-display text-[15px] text-navy-700">
                        {energy.genPerKwDay}
                      </strong>{" "}
                      kWh/kW·day
                    </span>
                    <span>
                      <strong className="font-display text-[15px] text-navy-700">
                        {ZONE_RATING[zone]}
                      </strong>{" "}
                      rating
                    </span>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1.5 font-display text-[14px] font-bold text-green-600">
                    View {s.capital} solar
                    <Icon
                      name="arrow"
                      size={15}
                      stroke={2.4}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <QuoteCTA />
    </SiteLayout>
  );
}
