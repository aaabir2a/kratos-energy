"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";

const POINTS = [
  "How to slash high electricity bills",
  "Choosing CEC-approved panels & inverters",
  "Compare solar batteries side-by-side",
  "Tips to maximise your feed-in returns",
];

/** Lead magnet — free solar buyer's guide in exchange for an email. */
export function GuideDownload() {
  const [sent, setSent] = useState(false);

  return (
    <section className="bg-navy-900 py-[78px]">
      <div className="container-ke grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        {/* Copy */}
        <div>
          <div className="mb-[18px] inline-flex items-center gap-2 rounded-pill border border-gold-400/40 bg-gold-400/15 px-3.5 py-1.5">
            <Icon name="award" size={15} className="text-gold-400" />
            <span className="font-display text-[12.5px] font-bold tracking-[0.04em] text-gold-400">
              FREE DOWNLOAD
            </span>
          </div>
          <h2 className="mb-3 font-display text-[clamp(28px,3.2vw,42px)] font-extrabold leading-[1.08] tracking-[-0.02em] text-white">
            The 2025 Australian Solar Buyer&rsquo;s Guide.
          </h2>
          <p className="mb-6 max-w-[440px] font-body text-[17px] leading-relaxed text-[#c4d2ef]">
            Everything you need to know before going solar — costs, rebates,
            batteries and the questions to ask every installer.
          </p>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {POINTS.map((p) => (
              <li
                key={p}
                className="flex items-center gap-2.5 font-body text-[14.5px] text-[#dbe6fb]"
              >
                <Icon name="check" size={16} stroke={3} className="flex-none text-green-400" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* Form */}
        <div className="rounded-xl bg-white p-8 shadow-lg">
          {!sent ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <h3 className="mb-1 font-display text-[21px] font-bold text-navy-700">
                Download the free guide
              </h3>
              <p className="mb-5 font-body text-[14px] text-ash-500">
                Pop in your email and we&rsquo;ll send the PDF straight away.
              </p>
              <div className="flex flex-col gap-3">
                <label className="flex flex-col gap-1">
                  <span className="sr-only">First name</span>
                  <input
                    className="w-full rounded-md border-[1.5px] border-ash-300 bg-white px-[15px] py-[13px] font-body text-[15px] text-ink outline-none"
                    placeholder="First name"
                    required
                    aria-required="true"
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="sr-only">Email address</span>
                  <input
                    className="w-full rounded-md border-[1.5px] border-ash-300 bg-white px-[15px] py-[13px] font-body text-[15px] text-ink outline-none"
                    type="email"
                    placeholder="Email address"
                    required
                    aria-required="true"
                  />
                </label>
              </div>
              <button
                type="submit"
                className="ke-press mt-5 inline-flex w-full items-center justify-center gap-2.5 rounded-pill bg-green-500 px-7 py-[15px] font-display text-[16px] font-bold text-white shadow-green hover:bg-green-600"
              >
                <Icon name="check" size={19} stroke={2.6} /> Send Me the Guide
              </button>
              <p className="mt-3.5 text-center font-body text-xs text-ash-500">
                No spam. Unsubscribe anytime.
              </p>
            </form>
          ) : (
            <div className="py-6 text-center">
              <span className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
                <Icon name="check" size={34} stroke={3} />
              </span>
              <h3 className="mb-2 font-display text-[22px] font-extrabold text-navy-700">
                Check your inbox! 📩
              </h3>
              <p className="font-body text-[15.5px] leading-relaxed text-ash-700">
                Your free 2025 Solar Buyer&rsquo;s Guide is on its way.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
