"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";

const inputClass =
  "w-full rounded-md border-[1.5px] border-ash-300 bg-white px-[15px] py-[13px] font-body text-[15px] text-ink outline-none";

export function ReferForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="rounded-xl border border-ash-200 bg-white p-10 text-center shadow-md">
        <span className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
          <Icon name="check" size={34} stroke={3} />
        </span>
        <h3 className="mb-2 font-display text-[24px] font-extrabold text-navy-700">
          Referral sent! 🎉
        </h3>
        <p className="font-body text-[16px] leading-relaxed text-ash-700">
          Thanks for spreading the word. We&rsquo;ll be in touch when your friend
          goes solar so we can send your reward.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="rounded-xl border border-ash-200 bg-white p-7 shadow-md sm:p-9"
    >
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block font-display text-[13px] font-bold text-ash-700">
            Your name
          </label>
          <input className={inputClass} placeholder="Your full name" required />
        </div>
        <div>
          <label className="mb-1.5 block font-display text-[13px] font-bold text-ash-700">
            Your email
          </label>
          <input className={inputClass} type="email" placeholder="you@email.com" required />
        </div>
        <div>
          <label className="mb-1.5 block font-display text-[13px] font-bold text-ash-700">
            Friend&rsquo;s name
          </label>
          <input className={inputClass} placeholder="Friend's name" required />
        </div>
        <div>
          <label className="mb-1.5 block font-display text-[13px] font-bold text-ash-700">
            Friend&rsquo;s email or phone
          </label>
          <input className={inputClass} placeholder="So we can say hello" required />
        </div>
      </div>
      <button
        type="submit"
        className="ke-press mt-5 inline-flex w-full items-center justify-center gap-2.5 rounded-pill bg-green-500 px-7 py-[15px] font-display text-[16px] font-bold text-white shadow-green hover:bg-green-600"
      >
        Send Referral <Icon name="arrow" size={19} stroke={2.4} />
      </button>
    </form>
  );
}
