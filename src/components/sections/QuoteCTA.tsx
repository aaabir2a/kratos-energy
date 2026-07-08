"use client";

import { Icon } from "@/components/ui/Icon";
import { PHONE, PHONE_HREF, EMAIL } from "@/lib/nav";
import { LeadForm } from "@/components/LeadForm";

const PROMISES = [
  "Free consultation & design",
  "No pushy sales tactics",
  "Transparent pricing",
  "25-year warranty",
  "Professional installation",
];

export function QuoteCTA() {
  return (
    <section id="quote" className="bg-forest-900 py-[84px]">
      <div className="container-ke grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        {/* Copy */}
        <div>
          <h2 className="mb-4 font-display text-[clamp(30px,3.4vw,44px)] font-extrabold leading-[1.08] tracking-[-0.02em] text-white">
            Get your free solar quote in under 2 minutes.
          </h2>
          <p className="mb-[26px] max-w-[420px] font-body text-[17px] leading-relaxed text-[#a9c4a3]">
            Tell us a little about your place and we&rsquo;ll tailor the
            numbers. Everything in the list below is included, no exceptions.
          </p>
          <div className="mb-[26px] grid grid-cols-1 gap-3 sm:grid-cols-2">
            {PROMISES.map((p) => (
              <span
                key={p}
                className="flex items-center gap-2.5 font-body text-[14.5px] text-[#eaf3e6]"
              >
                <Icon
                  name="check"
                  size={16}
                  stroke={3}
                  className="flex-none text-green-400"
                />
                {p}
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <a
              href={PHONE_HREF}
              className="flex items-center gap-[11px] font-display text-[18px] font-bold text-white"
            >
              <Icon name="phone" size={20} className="text-green-400" /> {PHONE}
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="flex items-center gap-[11px] font-body text-[15.5px] font-semibold text-[#a9c4a3]"
            >
              <Icon name="mail" size={20} className="text-green-400" /> {EMAIL}
            </a>
            <span className="flex items-center gap-[11px] font-body text-[15.5px] font-semibold text-[#a9c4a3]">
              <Icon name="mapPin" size={20} className="text-green-400" /> Serving
              NSW, Victoria &amp; Western Australia
            </span>
          </div>
        </div>

        {/* Form card — shared LeadForm (CRM schema + fallback). */}
        <LeadForm />
      </div>
    </section>
  );
}
