import Image from "next/image";
import Link from "next/link";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { QuoteCTA } from "@/components/sections/QuoteCTA";
import { BatteryGrid } from "@/components/sections/BatteryGrid";
import { BrandCarousel } from "@/components/sections/BrandCarousel";
import { BATTERY_BRANDS } from "@/lib/brands";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { pageMetadata } from "@/lib/seo/metadata";
import { serviceLd } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata = pageMetadata({
  title: "Solar Battery Storage Australia — NSW, VIC & ACT Rebates",
  description:
    "Store daytime solar for night use in Australia. Fox ESS, GoodWe and Sigenergy batteries installed across NSW, VIC and ACT with 2026 federal battery rebates applied.",
  path: "/products/battery",
  keywords: ["home battery storage Australia", "solar battery rebate Australia", "battery storage NSW VIC ACT"],
});

const BENEFITS = [
  ["leaf", "Use solar after dark", "Store excess daytime generation and run your home all evening on free solar."],
  ["shield", "Blackout protection", "Keep the lights, fridge and Wi-Fi on during grid outages with backup-capable batteries."],
  ["trend", "Bigger bill savings", "Stop exporting cheaply and buying back expensively — self-consume up to 90%."],
  ["zap", "EV & smart ready", "Charge your car from stored solar and automate it all from one app."],
];

export default function BatteryPage() {
  return (
    <SiteLayout>
      <JsonLd
        data={serviceLd({
          name: "Home Battery Installation",
          description:
            "Supply and installation of home battery storage with blackout protection, VPP readiness and federal rebate handling.",
          path: "/products/battery",
          serviceType: "Battery storage installation",
        })}
      />
      {/* Hero */}
      <section className="bg-white pb-16 pt-12">
        <div className="container-ke grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <Eyebrow>Battery Storage</Eyebrow>
            <h1 className="mt-3 font-display text-[clamp(36px,4.6vw,60px)] font-extrabold leading-none tracking-[-0.025em] text-navy-800">
              Keep your solar <span className="text-green-600">after sunset.</span>
            </h1>
            <p className="mt-4 max-w-[460px] font-body text-[18px] leading-relaxed text-ash-700">
              A home battery stores the power your panels make during the day so
              you can use it at night — slashing your grid reliance and keeping
              you on during blackouts.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/get-a-quote"
                className="ke-press inline-flex items-center justify-center gap-2.5 rounded-pill bg-green-500 px-[34px] py-[16px] font-display text-[16px] font-bold text-white shadow-green hover:bg-green-600"
              >
                Get a Battery Quote <Icon name="arrow" size={20} stroke={2.4} />
              </Link>
              <Link
                href="/rebates"
                className="ke-press inline-flex items-center gap-2.5 rounded-pill border-[1.5px] border-green-300 bg-white px-7 py-[15px] font-display text-[16px] font-bold text-forest-700 hover:bg-green-50"
              >
                See battery rebates
              </Link>
            </div>
          </div>
          <div className="relative h-[320px] overflow-hidden rounded-xl shadow-lg lg:h-[440px]">
            <Image
              src="/assets/photo-panel-battery.jpg"
              alt="Home solar battery installation"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-paper py-[78px]">
        <div className="container-ke">
          <div className="mb-10 text-center">
            <Eyebrow center>Why Add Storage</Eyebrow>
            <h2 className="mt-3 font-display text-[clamp(28px,3.2vw,42px)] font-extrabold tracking-[-0.02em] text-navy-700">
              More independence, lower bills.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map(([icon, title, body]) => (
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

      {/* Battery range */}
      <section className="bg-white py-[78px]">
        <div className="container-ke">
          <div className="mb-10 text-center">
            <Eyebrow center>Our Battery Range</Eyebrow>
            <h2 className="mt-3 font-display text-[clamp(28px,3.2vw,42px)] font-extrabold tracking-[-0.02em] text-navy-700">
              Premium, CEC-approved storage.
            </h2>
          </div>
          <BatteryGrid />

          <div className="mt-14">
            <p className="mb-5 text-center font-display text-[13px] font-bold uppercase tracking-[0.14em] text-ash-600">
              Battery brands we install
            </p>
            <BrandCarousel
              brands={BATTERY_BRANDS}
              icon="battery"
              label="Battery brands Kratos Energy installs"
              surface="white"
            />
          </div>
        </div>
      </section>

      <QuoteCTA />
    </SiteLayout>
  );
}
