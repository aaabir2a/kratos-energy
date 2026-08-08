import Link from "next/link";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/sections/PageHero";
import { QuoteCTA } from "@/components/sections/QuoteCTA";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { pageMetadata } from "@/lib/seo/metadata";
import { serviceLd } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata = pageMetadata({
  title: "Home EV Charger Installation",
  description:
    "Charge your electric vehicle from your own solar. Smart 7kW and 22kW home EV chargers installed by licensed electricians across NSW, Victoria and the ACT.",
  path: "/ev-charging",
  keywords: ["home EV charger installation", "EV charger Australia", "solar EV charging"],
});

const FEATURES = [
  ["sun", "Charge from solar", "Top up your car on free daytime solar instead of grid power."],
  ["zap", "Fast 7kW & 22kW", "Add hundreds of kilometres of range overnight, or in a few hours."],
  ["calculator", "Smart scheduling", "Automate charging for the cheapest tariffs and surplus solar."],
  ["shield", "Licensed install", "A fully licensed electrician installs and activates your charger."],
];

const CHARGERS = [
  ["Smart 7kW AC", "Single-phase", "Ideal for overnight home charging"],
  ["Smart 22kW AC", "Three-phase", "Fastest AC charging for two-car homes"],
  ["Solar-Matched", "Dynamic", "Only charges from surplus solar export"],
];

export default function EVChargerPage() {
  return (
    <SiteLayout>
      <JsonLd
        data={serviceLd({
          name: "EV Charger Installation",
          description:
            "Supply and licensed installation of 7kW and 22kW smart home EV chargers, integrated with your solar.",
          path: "/ev-charging",
          serviceType: "EV charger installation",
        })}
      />
      <PageHero
        eyebrow="Smart EV Charging"
        title={
          <>
            Fuel your car <span className="text-green-600">with sunshine.</span>
          </>
        }
        subtitle="Pair your solar with a smart home charger and run your EV on power you generate yourself — installed by licensed Kratos electricians."
      >
        <Link
          href="/get-a-quote"
          className="ke-press inline-flex items-center justify-center gap-2.5 rounded-pill bg-green-500 px-[34px] py-[16px] font-display text-[16px] font-bold text-white shadow-green hover:bg-green-600"
        >
          Get an EV Charger Quote <Icon name="arrow" size={20} stroke={2.4} />
        </Link>
      </PageHero>

      {/* Features */}
      <section className="bg-white py-[78px]">
        <div className="container-ke">
          <div className="mb-10 text-center">
            <Eyebrow center>Why Charge at Home</Eyebrow>
            <h2 className="mt-3 font-display text-[clamp(28px,3.2vw,42px)] font-extrabold tracking-[-0.02em] text-navy-700">
              The cheapest fuel is your own roof.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map(([icon, title, body]) => (
              <div key={title} className="rounded-lg border border-ash-200 bg-white p-6 shadow-md">
                <span className="mb-4 flex h-[52px] w-[52px] items-center justify-center rounded-[14px] bg-green-50 text-green-600">
                  <Icon name={icon} size={26} />
                </span>
                <h3 className="mb-2 font-display text-[17px] font-bold text-navy-700">
                  {title}
                </h3>
                <p className="font-body text-[14px] leading-relaxed text-ash-700">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Charger range */}
      <section className="bg-paper py-[78px]">
        <div className="container-ke">
          <div className="mb-10 text-center">
            <Eyebrow center>Charger Options</Eyebrow>
            <h2 className="mt-3 font-display text-[clamp(28px,3.2vw,42px)] font-extrabold tracking-[-0.02em] text-navy-700">
              A charger for every driveway.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {CHARGERS.map(([name, type, tag]) => (
              <div key={name} className="ke-lift rounded-lg border border-ash-200 bg-white p-7 shadow-md">
                <Icon name="zap" size={30} className="text-green-600" />
                <h3 className="mt-4 font-display text-[20px] font-bold text-navy-700">
                  {name}
                </h3>
                <div className="mt-1 font-display text-[15px] font-extrabold text-green-600">
                  {type}
                </div>
                <p className="mt-2 font-body text-[14px] text-ash-700">{tag}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <QuoteCTA />
    </SiteLayout>
  );
}
