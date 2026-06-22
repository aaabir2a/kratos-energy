import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/sections/PageHero";
import { QuoteCTA } from "@/components/sections/QuoteCTA";
import { Icon } from "@/components/ui/Icon";
import { STATE_META, stateBySlug } from "@/lib/states";
import {
  STATE_SCHEMES,
  ZONE_RATING,
  calcFederalBatteryRebate,
  calcStc,
  money,
  zoneForPostcode,
} from "@/lib/rebates";
import { ENERGY_BY_STATE, annualCo2Saved, annualGeneration } from "@/lib/energy";

const YEAR = 2026;
const SYSTEMS = [6.6, 10, 13.2];

export function generateStaticParams() {
  return STATE_META.map((s) => ({ state: s.slug }));
}

export function generateMetadata({ params }: { params: { state: string } }): Metadata {
  const s = stateBySlug(params.state);
  if (!s) return {};
  return {
    title: `Solar Rebates & Costs in ${s.name} ${YEAR} — STC, Battery & Savings`,
    description: `Solar in ${s.name}: ${YEAR} STC rebate amounts, the federal battery rebate, generation, feed-in tariffs and savings for ${s.capital} and beyond. Free calculators from Kratos Energy.`,
    alternates: { canonical: `/solar/${s.slug}` },
    openGraph: {
      title: `Solar Rebates & Costs in ${s.name} ${YEAR}`,
      description: `STC rebates, battery rebate, generation and feed-in tariffs for ${s.name}.`,
      type: "website",
    },
  };
}

export default function StatePage({ params }: { params: { state: string } }) {
  const s = stateBySlug(params.state);
  if (!s) notFound();

  const zone = zoneForPostcode(s.capitalPostcode)!;
  const energy = ENERGY_BY_STATE[s.code];
  const scheme = STATE_SCHEMES[s.code];
  const battery13 = calcFederalBatteryRebate(13.5);
  const gen66 = annualGeneration(6.6, s.code);
  const co266 = annualCo2Saved(gen66);

  const stcRows = SYSTEMS.map((kw) => ({ kw, stc: calcStc(kw, s.capitalPostcode, YEAR)! }));

  const KEY_STATS: [string, string, string][] = [
    ["sun", `Zone ${zone}`, `STC zone (rating ${ZONE_RATING[zone]})`],
    ["zap", `${energy.genPerKwDay} kWh`, "per kW each day"],
    ["trend", `${energy.importTariff}c`, "typical grid rate /kWh"],
    ["battery", `${energy.feedInTariff}c`, "typical feed-in /kWh"],
  ];

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What solar rebate can I get in ${s.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${s.capital} is in STC Zone ${zone}. In ${YEAR} a 6.6 kW system earns about ${money(
            stcRows[0].stc.rebate,
          )} in STCs, a 10 kW system about ${money(stcRows[1].stc.rebate)}. A home battery adds the federal Cheaper Home Batteries rebate on top.`,
        },
      },
      {
        "@type": "Question",
        name: `How much solar power will I generate in ${s.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Around ${energy.genPerKwDay} kWh per kW per day on average near ${s.capital} — about ${gen66.toLocaleString()} kWh a year from a 6.6 kW system.`,
        },
      },
      {
        "@type": "Question",
        name: `Is there a battery rebate in ${s.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes — the federal Cheaper Home Batteries rebate applies Australia-wide (about ${money(
            battery13,
          )} on a 13.5 kWh battery). ${scheme.battery}`,
        },
      },
    ],
  };

  return (
    <SiteLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <PageHero
        eyebrow={`Solar in ${s.name}`}
        title={
          <>
            Solar rebates & savings in{" "}
            <span className="text-green-600">{s.capital}.</span>
          </>
        }
        subtitle={s.intro}
      />

      {/* Key stats */}
      <section className="bg-paper py-12">
        <div className="container-ke">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {KEY_STATS.map(([icon, value, label]) => (
              <div key={label} className="rounded-xl border border-ash-200 bg-white p-5 shadow-sm">
                <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-[12px] bg-green-50 text-green-600">
                  <Icon name={icon} size={22} />
                </span>
                <div className="font-display text-[26px] font-extrabold leading-none text-navy-800">
                  {value}
                </div>
                <div className="mt-1.5 font-body text-[12.5px] text-ash-500">{label}</div>
              </div>
            ))}
          </div>
          <p className="mt-4 font-body text-[13px] text-ash-500">{s.zoneNote}</p>
        </div>
      </section>

      {/* STC rebate table */}
      <section className="bg-white py-[72px]">
        <div className="container-ke max-w-[860px]">
          <h2 className="font-display text-[clamp(26px,3vw,38px)] font-extrabold tracking-[-0.02em] text-navy-800">
            {YEAR} solar rebates in {s.name}
          </h2>
          <p className="mt-3 font-body text-[16.5px] leading-relaxed text-ash-700">
            With {s.capital} in STC Zone {zone}, here&apos;s the approximate federal STC rebate by system
            size this year. The rebate shrinks each year toward the {2030} scheme end, so installing sooner
            locks in more.
          </p>

          <div className="mt-6 overflow-hidden rounded-xl border border-ash-200">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-paper font-display text-[13px] font-bold text-ash-700">
                  <th className="px-5 py-3.5">System size</th>
                  <th className="px-5 py-3.5">STCs</th>
                  <th className="px-5 py-3.5 text-right">Est. STC rebate</th>
                </tr>
              </thead>
              <tbody className="font-body text-[14.5px]">
                {stcRows.map((r) => (
                  <tr key={r.kw} className="border-t border-ash-200">
                    <td className="px-5 py-3.5 font-display font-bold text-navy-700">{r.kw} kW</td>
                    <td className="px-5 py-3.5 text-ash-700">{r.stc.stcCount}</td>
                    <td className="px-5 py-3.5 text-right font-display font-extrabold text-green-600">
                      {money(r.stc.rebate)}
                    </td>
                  </tr>
                ))}
                <tr className="border-t border-ash-200 bg-green-50">
                  <td className="px-5 py-3.5 font-display font-bold text-navy-700">
                    + 13.5 kWh battery
                  </td>
                  <td className="px-5 py-3.5 text-ash-700">Federal</td>
                  <td className="px-5 py-3.5 text-right font-display font-extrabold text-green-600">
                    {money(battery13)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 font-body text-[12px] text-ash-500">
            Estimates only, based on an STC price of {money(stcRows[0].stc.stcPrice)} and{" "}
            {stcRows[0].stc.deemingYears}-year deeming. Confirmed at installation.
          </p>

          {/* State scheme */}
          <div className="mt-8 rounded-xl border border-ash-200 bg-paper p-6">
            <div className="flex items-center gap-2 font-display text-[16px] font-bold text-navy-700">
              <Icon name="shield" size={19} className="text-forest-700" /> {s.name} state support
            </div>
            <p className="mt-2 font-body text-[14.5px] leading-relaxed text-ash-700">{scheme.battery}</p>
            <a
              href={scheme.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 font-display text-[13.5px] font-bold text-green-600 hover:text-green-700"
            >
              View official scheme <Icon name="arrow" size={14} stroke={2.4} />
            </a>
          </div>

          {/* Generation note */}
          <h2 className="mt-12 font-display text-[clamp(24px,2.6vw,32px)] font-extrabold tracking-[-0.02em] text-navy-800">
            What you&apos;ll generate
          </h2>
          <p className="mt-3 font-body text-[16.5px] leading-relaxed text-ash-700">
            Near {s.capital}, expect roughly {energy.genPerKwDay} kWh per kW each day — about{" "}
            <strong className="text-forest-700">{gen66.toLocaleString()} kWh a year</strong> from a 6.6 kW
            system, avoiding around {co266.toLocaleString()} kg of CO₂. Grid power costs about{" "}
            {energy.importTariff}c/kWh here, so self-consuming that solar is where the savings come from.
          </p>

          {/* Calculator links */}
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              ["Solar Rebate Calculator", "/calculators/solar-rebate", "sun"],
              ["Battery Rebate Calculator", "/calculators/battery-rebate", "battery"],
              ["Solar Output Calculator", "/calculators/solar-output", "zap"],
              ["Savings & Payback", "/savings-calculator", "trend"],
            ].map(([label, href, icon]) => (
              <Link
                key={href}
                href={href}
                className="ke-lift group flex items-center gap-3 rounded-lg border border-ash-200 bg-white p-4 shadow-sm"
              >
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-[11px] bg-green-50 text-green-600">
                  <Icon name={icon} size={20} />
                </span>
                <span className="font-display text-[14.5px] font-bold text-navy-700">{label}</span>
                <Icon
                  name="arrow"
                  size={16}
                  stroke={2.4}
                  className="ml-auto text-green-600 transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            ))}
          </div>

          {/* Other states */}
          <h2 className="mt-12 font-display text-[clamp(24px,2.6vw,32px)] font-extrabold tracking-[-0.02em] text-navy-800">
            Solar in other states
          </h2>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {STATE_META.filter((o) => o.code !== s.code).map((o) => (
              <Link
                key={o.slug}
                href={`/solar/${o.slug}`}
                className="rounded-pill border border-ash-300 px-4 py-2 font-display text-[13.5px] font-bold text-ash-700 transition-colors hover:border-green-400 hover:text-forest-700"
              >
                {o.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <QuoteCTA />
    </SiteLayout>
  );
}
