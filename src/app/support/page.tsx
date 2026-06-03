import type { Metadata } from "next";
import Link from "next/link";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/sections/PageHero";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { PHONE, PHONE_HREF, EMAIL } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Support & Warranty",
  description:
    "Get help with your Kratos Energy system — monitoring, maintenance, warranty claims and 24/7 support for the life of your system.",
};

const CHANNELS = [
  ["phone", "Call us", PHONE, PHONE_HREF],
  ["mail", "Email support", EMAIL, `mailto:${EMAIL}`],
  ["clock", "Hours", "Mon–Fri 8am–6pm AEST", "#"],
];

const FAQS = [
  ["How do I monitor my system?", "Every Kratos system includes a Wi-Fi monitoring app so you can track generation, consumption and savings in real time."],
  ["What's covered by warranty?", "Tier 1 panels carry a 25-year performance warranty, inverters 5–10 years, and our workmanship is guaranteed for 10 years."],
  ["My system has an alert — what now?", "Lodge a support ticket below or call us. Most issues are diagnosed remotely and resolved the same day."],
  ["Do you service systems you didn't install?", "Yes. Our maintenance and cleaning team services most brands of panels and inverters across our service area."],
];

export default function SupportPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Help & Support"
        title={
          <>
            We&rsquo;ve got your back, <span className="text-green-600">for life.</span>
          </>
        }
        subtitle="As a full-service provider, we support, maintain and monitor your system for as long as you own it."
      >
        <a
          href="#ticket"
          className="ke-press inline-flex items-center justify-center gap-2.5 rounded-pill bg-green-500 px-[34px] py-[16px] font-display text-[16px] font-bold text-white shadow-green hover:bg-green-600"
        >
          Create a Support Ticket <Icon name="arrow" size={20} stroke={2.4} />
        </a>
      </PageHero>

      {/* Channels */}
      <section className="bg-white py-16">
        <div className="container-ke grid grid-cols-1 gap-6 sm:grid-cols-3">
          {CHANNELS.map(([icon, label, val, href]) => (
            <a
              key={label}
              href={href}
              className="ke-lift flex items-center gap-4 rounded-lg border border-ash-200 bg-white p-6 shadow-md"
            >
              <span className="flex h-12 w-12 flex-none items-center justify-center rounded-[13px] bg-green-50 text-green-600">
                <Icon name={icon} size={24} />
              </span>
              <div>
                <div className="font-display text-[13px] font-bold uppercase tracking-[0.05em] text-ash-500">
                  {label}
                </div>
                <div className="font-display text-[16px] font-bold text-navy-700">
                  {val}
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-paper py-[72px]">
        <div className="container-ke max-w-[820px]">
          <div className="mb-9 text-center">
            <Eyebrow center>Common Questions</Eyebrow>
            <h2 className="mt-3 font-display text-[clamp(26px,3vw,40px)] font-extrabold tracking-[-0.02em] text-navy-700">
              Support FAQs
            </h2>
          </div>
          <div className="flex flex-col gap-3.5">
            {FAQS.map(([q, a]) => (
              <details
                key={q}
                className="group rounded-lg border border-ash-200 bg-white p-5 shadow-sm [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-display text-[16.5px] font-bold text-navy-700">
                  {q}
                  <Icon
                    name="chevron"
                    size={20}
                    className="flex-none text-green-500 transition-transform group-open:rotate-180"
                  />
                </summary>
                <p className="mt-3 font-body text-[15px] leading-relaxed text-ash-700">
                  {a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Ticket CTA */}
      <section id="ticket" className="bg-forest-900 py-[72px]">
        <div className="container-ke max-w-[680px] text-center">
          <h2 className="font-display text-[clamp(26px,3vw,40px)] font-extrabold tracking-[-0.02em] text-white">
            Still need a hand?
          </h2>
          <p className="mx-auto mt-3 max-w-[480px] font-body text-[17px] leading-relaxed text-[#a9c4a3]">
            Lodge a ticket and our support team will get back to you within one
            business day — usually much sooner.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              href={PHONE_HREF}
              className="ke-press inline-flex items-center gap-2.5 rounded-pill bg-green-500 px-7 py-[15px] font-display text-[16px] font-bold text-white shadow-green hover:bg-green-600"
            >
              <Icon name="phone" size={19} /> {PHONE}
            </a>
            <Link
              href="/get-a-quote"
              className="ke-press inline-flex items-center gap-2.5 rounded-pill border-[1.5px] border-white/30 bg-white/10 px-7 py-[15px] font-display text-[16px] font-bold text-white hover:bg-white/20"
            >
              Contact a consultant
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
