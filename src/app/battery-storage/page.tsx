import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { QuoteCTA } from "@/components/sections/QuoteCTA";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Home Battery Storage",
  description:
    "Store your daytime solar and power your home after dark. Kratos Energy installs Tesla, Enphase and Sungrow batteries with generous state rebates.",
};

const BENEFITS = [
  ["leaf", "Use solar after dark", "Store excess daytime generation and run your home all evening on free solar."],
  ["shield", "Blackout protection", "Keep the lights, fridge and Wi-Fi on during grid outages with backup-capable batteries."],
  ["trend", "Bigger bill savings", "Stop exporting cheaply and buying back expensively — self-consume up to 90%."],
  ["zap", "EV & smart ready", "Charge your car from stored solar and automate it all from one app."],
];

const BATTERIES = [
  ["Tesla Powerwall 3", "13.5 kWh", "Whole-home backup"],
  ["Enphase IQ Battery 5P", "5.0 kWh", "Modular & expandable"],
  ["Sungrow SBR", "9.6–25.6 kWh", "Stackable high-voltage"],
];

export default function BatteryPage() {
  return (
    <SiteLayout>
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
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {BATTERIES.map(([name, cap, tag]) => (
              <div key={name} className="ke-lift rounded-lg border border-ash-200 bg-white p-7 shadow-md">
                <Icon name="battery" size={30} className="text-green-600" />
                <h3 className="mt-4 font-display text-[20px] font-bold text-navy-700">
                  {name}
                </h3>
                <div className="mt-1 font-display text-[15px] font-extrabold text-green-600">
                  {cap}
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
