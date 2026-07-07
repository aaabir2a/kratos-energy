import type { Metadata } from "next";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/sections/PageHero";
import { LeadForm } from "@/components/LeadForm";
import { Icon, type IconName } from "@/components/ui/Icon";
import { PHONE, PHONE_HREF, EMAIL } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Contact Kratos Energy",
  description:
    "Talk to Kratos Energy about solar, batteries and EV charging. Call, email or send an enquiry — an Australian-owned team, based in Wollongong NSW.",
};

type Detail = {
  icon: IconName;
  label: string;
  lines: { text: string; href?: string }[];
};

const DETAILS: Detail[] = [
  {
    icon: "phone",
    label: "Call us",
    lines: [{ text: PHONE, href: PHONE_HREF }, { text: "Mon–Fri, 8am – 6pm AEST" }],
  },
  {
    icon: "mail",
    label: "Email us",
    lines: [{ text: EMAIL, href: `mailto:${EMAIL}` }, { text: "We reply within one business day" }],
  },
  {
    icon: "mapPin",
    label: "Visit us",
    lines: [
      { text: "SmartSpace, Suite 66, 1st Floor" },
      { text: "Enterprise 1, Innovation Campus" },
      { text: "Squires Way, North Wollongong" },
      { text: "NSW 2500, Australia" },
    ],
  },
  {
    icon: "clock",
    label: "Office hours",
    lines: [{ text: "Monday – Friday: 8am – 6pm" }, { text: "Saturday: 9am – 1pm" }, { text: "Sunday: Closed" }],
  },
];

const SERVICE_AREAS = ["NSW", "VIC", "QLD", "SA", "ACT"];

export default function ContactPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Contact Us"
        title={
          <>
            Let&rsquo;s talk <span className="text-green-600">solar.</span>
          </>
        }
        subtitle="Questions about a system, a quote or your existing install? Reach the Kratos Energy team directly — no call centres, no pushy sales."
      />

      <section className="bg-white py-14 sm:py-[72px]">
        <div className="container-ke grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_1.05fr]">
          {/* Left — company information */}
          <div>
            <h2 className="font-display text-[clamp(24px,2.6vw,30px)] font-extrabold tracking-[-0.02em] text-navy-700">
              Get in touch
            </h2>
            <p className="mt-3 max-w-[440px] font-body text-[16.5px] leading-relaxed text-ash-700">
              An Australian-owned solar company delivering design, installation
              and support in-house — kilowatt to megawatt.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {DETAILS.map((d) => (
                <div
                  key={d.label}
                  className="rounded-xl border border-ash-200 bg-paper p-5"
                >
                  <div className="mb-2.5 flex items-center gap-2.5">
                    <span className="flex h-10 w-10 flex-none items-center justify-center rounded-[12px] bg-green-50 text-green-600">
                      <Icon name={d.icon} size={20} />
                    </span>
                    <span className="font-display text-[15px] font-bold text-navy-700">
                      {d.label}
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5 font-body text-[14.5px] leading-relaxed text-ash-700">
                    {d.lines.map((l) =>
                      l.href ? (
                        <a
                          key={l.text}
                          href={l.href}
                          className="font-semibold text-forest-700 hover:underline"
                        >
                          {l.text}
                        </a>
                      ) : (
                        <span key={l.text}>{l.text}</span>
                      ),
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-xl bg-forest-900 p-6">
              <div className="flex items-center gap-2.5 font-display text-[14px] font-bold text-white">
                <Icon name="mapPin" size={18} className="text-green-400" />
                Proudly serving
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {SERVICE_AREAS.map((s) => (
                  <span
                    key={s}
                    className="rounded-pill bg-white/10 px-3 py-1.5 font-display text-[12.5px] font-bold text-white ring-1 ring-inset ring-white/15"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right — CRM lead form */}
          <LeadForm
            staticTitle="Send us a message"
            staticSubmitLabel="Send enquiry"
            successNote="Thanks for reaching out. A Kratos Energy specialist will be in touch within one business day."
            className="rounded-xl border border-ash-200 bg-white p-[30px] shadow-lg lg:sticky lg:top-24"
          />
        </div>
      </section>
    </SiteLayout>
  );
}
