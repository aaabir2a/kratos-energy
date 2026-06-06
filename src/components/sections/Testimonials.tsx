import { Stars } from "@/components/ui/Stars";

type Review = {
  q: string;
  n: string;
  loc: string;
  sys: string;
  when: string;
};

const REVIEWS: Review[] = [
  {
    q: "Saved $420 on my first bill after installation. The team was professional and the system works perfectly. Highly recommend Kratos Energy.",
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

function Avatar({ name, size = 42 }: { name: string; size?: number }) {
  return (
    <span
      className="flex flex-none items-center justify-center rounded-full bg-green-100 font-display font-extrabold text-forest-700"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {name[0]}
    </span>
  );
}

/** Lead testimonial — large pull-quote anchoring the section. */
function FeaturedReview({ r }: { r: Review }) {
  return (
    <figure className="flex h-full flex-col rounded-xl border border-green-200 bg-white p-8 shadow-lg sm:p-10">
      <Stars size={22} />
      <blockquote className="my-6 flex-1 font-display text-[clamp(20px,2.1vw,26px)] font-semibold leading-[1.35] tracking-[-0.01em] text-navy-800 [text-wrap:balance]">
        &ldquo;{r.q}&rdquo;
      </blockquote>
      <figcaption className="flex items-center gap-3.5 border-t border-ash-200 pt-5">
        <Avatar name={r.n} size={52} />
        <div>
          <div className="font-display text-[16px] font-bold text-navy-700">
            {r.n}
          </div>
          <div className="font-body text-[13px] text-ash-500">
            {r.loc} ·{" "}
            <span className="font-bold text-green-600">Verified · {r.sys}</span>
          </div>
        </div>
      </figcaption>
    </figure>
  );
}

/** Compact supporting review — denser row beside the feature. */
function CompactReview({ r }: { r: Review }) {
  return (
    <figure className="flex flex-col rounded-lg border border-ash-200 bg-white p-5 shadow-md">
      <div className="mb-2.5 flex items-center justify-between">
        <Stars size={15} />
        <span className="font-body text-[12px] text-ash-500">{r.when}</span>
      </div>
      <blockquote className="mb-3.5 font-body text-[14.5px] leading-relaxed text-ink">
        &ldquo;{r.q}&rdquo;
      </blockquote>
      <figcaption className="mt-auto flex items-center gap-2.5">
        <Avatar name={r.n} size={34} />
        <div className="font-body text-[12.5px] text-ash-500">
          <span className="font-display text-[13.5px] font-bold text-navy-700">
            {r.n}
          </span>{" "}
          · {r.loc} ·{" "}
          <span className="font-bold text-green-600">{r.sys}</span>
        </div>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const [featured, ...rest] = REVIEWS;

  return (
    <section id="reviews" className="bg-paper py-[84px]">
      <div className="container-ke">
        <div className="mb-11 text-center">
          <h2 className="mb-2.5 font-display text-[clamp(30px,3.6vw,46px)] font-extrabold tracking-[-0.02em] text-navy-700">
            Join thousands saving with solar.
          </h2>
          <div className="inline-flex items-center gap-2.5 font-body font-bold text-ash-700">
            <Stars size={18} /> 4.9/5 average · 1,400+ reviews
          </div>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-[1.25fr_1fr]">
          <FeaturedReview r={featured} />
          <div className="flex flex-col gap-4">
            {rest.map((r) => (
              <CompactReview key={r.n} r={r} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
