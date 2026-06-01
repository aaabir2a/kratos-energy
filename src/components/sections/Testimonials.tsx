"use client";

import { useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Stars } from "@/components/ui/Stars";
import { cn } from "@/lib/utils";

type Review = {
  q: string;
  n: string;
  loc: string;
  sys: string;
  when: string;
};

const REVIEWS: Review[] = [
  {
    q: "Saved $420 on my first bill after installation! The team was professional and the system works perfectly. Highly recommend Kratos Energy.",
    n: "Sarah M.",
    loc: "Sydney, NSW",
    sys: "6.6kW System",
    when: "2 days ago",
  },
  {
    q: "The savings calculator was spot on — we're saving exactly what they predicted. Installation was quick and clean from start to finish.",
    n: "James L.",
    loc: "Melbourne, VIC",
    sys: "10kW System",
    when: "1 week ago",
  },
  {
    q: "Best decision ever. My electricity bill went from $380 to $45. They explained everything clearly and handled all the paperwork.",
    n: "Maria R.",
    loc: "Adelaide, SA",
    sys: "8kW System",
    when: "3 weeks ago",
  },
  {
    q: "No pushy sales, transparent pricing, and the PPA meant zero upfront cost for our warehouse. Genuine experts.",
    n: "David T.",
    loc: "Wollongong, NSW",
    sys: "60kW Commercial",
    when: "1 month ago",
  },
];

function ReviewCard({ r }: { r: Review }) {
  return (
    <div className="flex h-full flex-col rounded-lg border border-ash-200 bg-white p-[26px] shadow-md">
      <div className="mb-3.5 flex items-center justify-between">
        <Stars size={17} />
        <span className="font-body text-[12.5px] text-ash-500">{r.when}</span>
      </div>
      <p className="mb-5 flex-1 font-body text-[15.5px] leading-relaxed text-ink">
        &ldquo;{r.q}&rdquo;
      </p>
      <div className="flex items-center gap-3 border-t border-ash-200 pt-4">
        <span className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-green-100 font-display text-base font-extrabold text-forest-700">
          {r.n[0]}
        </span>
        <div>
          <div className="font-display text-[15px] font-bold text-navy-700">
            {r.n}
          </div>
          <div className="font-body text-[12.5px] text-ash-500">
            {r.loc} ·{" "}
            <span className="font-bold text-green-600">Verified · {r.sys}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  const [page, setPage] = useState(0);
  const perPage = 3;
  const pages = Math.ceil(REVIEWS.length / perPage);
  const start = page * perPage;
  const shown = REVIEWS.slice(start, start + perPage);

  return (
    <section id="reviews" className="bg-paper py-[84px]">
      <div className="container-ke">
        <div className="mb-11 text-center">
          <Eyebrow center>What Our Customers Say</Eyebrow>
          <h2 className="mb-2.5 mt-3 font-display text-[clamp(30px,3.6vw,46px)] font-extrabold tracking-[-0.02em] text-navy-700">
            Join thousands saving with solar.
          </h2>
          <div className="inline-flex items-center gap-2.5 font-body font-bold text-ash-700">
            <Stars size={18} /> 4.9/5 average · 2,847 reviews
          </div>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-[22px] md:grid-cols-2 lg:grid-cols-3">
          {shown.map((r, i) => (
            <ReviewCard key={start + i} r={r} />
          ))}
        </div>

        {pages > 1 && (
          <div className="mt-[30px] flex justify-center gap-2">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                aria-label={`Page ${i + 1}`}
                className={cn(
                  "h-2.5 rounded-pill transition-all",
                  i === page ? "w-7 bg-green-500" : "w-2.5 bg-ash-300",
                )}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
