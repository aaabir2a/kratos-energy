"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PHONE, PHONE_HREF, EMAIL } from "@/lib/nav";

const PROMISES = [
  "Free consultation & design",
  "No pushy sales tactics",
  "Transparent pricing",
  "25-year warranty",
  "Professional installation",
];

const inputClass =
  "w-full rounded-md border-[1.5px] border-ash-300 bg-white px-[15px] py-[13px] font-body text-[15px] text-ink outline-none";

export function QuoteCTA() {
  const [sent, setSent] = useState(false);

  return (
    <section id="quote" className="bg-forest-900 py-[84px]">
      <div className="container-ke grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        {/* Copy */}
        <div>
          <Eyebrow light>Ready to Start Saving?</Eyebrow>
          <h2 className="my-3 mb-4 font-display text-[clamp(30px,3.4vw,44px)] font-extrabold leading-[1.08] tracking-[-0.02em] text-white">
            Get your free solar quote in under 2 minutes.
          </h2>
          <p className="mb-[26px] max-w-[420px] font-body text-[17px] leading-relaxed text-[#a9c4a3]">
            No obligations, no pushy sales calls. Tell us a little about your
            place and we&rsquo;ll tailor the numbers.
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
              NSW, VIC, SA, ACT &amp; QLD
            </span>
          </div>
        </div>

        {/* Form card */}
        <div className="rounded-xl bg-white p-[30px] shadow-lg">
          {!sent ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <h3 className="mb-[18px] font-display text-[21px] font-bold text-navy-700">
                Get Your FREE Quote
              </h3>
              <div className="mb-3 grid grid-cols-2 gap-3">
                <input className={inputClass} placeholder="First name" required />
                <input className={inputClass} placeholder="Last name" required />
              </div>
              <div className="mb-[18px] flex flex-col gap-3">
                <input
                  className={inputClass}
                  type="email"
                  placeholder="Email address"
                  required
                />
                <div className="grid grid-cols-2 gap-3">
                  <input className={inputClass} placeholder="Phone" required />
                  <input className={inputClass} placeholder="Suburb" required />
                </div>
                <select className={inputClass} defaultValue="">
                  <option value="" disabled>
                    Monthly electricity bill
                  </option>
                  <option>$100 – $250</option>
                  <option>$250 – $400</option>
                  <option>$400 – $600</option>
                  <option>$600+</option>
                </select>
              </div>
              <Button type="submit" variant="primary" size="lg" icon="arrow" fullWidth>
                Get My FREE Quote
              </Button>
              <p className="mt-3.5 text-center font-body text-xs text-ash-500">
                <Icon
                  name="shield"
                  size={13}
                  stroke={2}
                  className="-mb-0.5 mr-1 inline-block"
                />
                Your information is 100% secure and never shared.
              </p>
            </form>
          ) : (
            <div className="px-2.5 py-[30px] text-center">
              <span className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
                <Icon name="check" size={34} stroke={3} />
              </span>
              <h3 className="mb-2 font-display text-2xl font-extrabold text-navy-700">
                You&rsquo;re all set! 🌱
              </h3>
              <p className="mb-[22px] font-body text-base leading-relaxed text-ash-700">
                Thanks — a Kratos Energy specialist will call you within one
                business day with your tailored quote.
              </p>
              <Button variant="ghost" size="md" onClick={() => setSent(false)}>
                Submit another
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
