"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Stars } from "@/components/ui/Stars";
import { Icon } from "@/components/ui/Icon";

type Review = {
  /** Verbatim review text. */
  q: string;
  /** Reviewer name as shown on Google. */
  n: string;
  /** Relative time as shown on Google. */
  when: string;
  /** Only set when the reviewer named their system. */
  sys?: string;
};

/** Verbatim 5-star Google reviews (data/Customer Reviews.pdf). */
const REVIEWS: Review[] = [
  {
    q: "I am very happy to recommend Kratos Energy to anyone planning to install a solar panel and battery system at home. I found their pricing fair and affordable, and the service both before and on installation day was excellent. Thank you, Nessar and Wei.",
    n: "Robyn Brookfield",
    when: "9 months ago",
  },
  {
    q: "Kratos Energy completed our solar system seamlessly, and we are very satisfied with the entire process and results. They offered a very reasonable price for the same products and services compared to other providers. A special mention to Nessar, who worked hard and efficiently throughout the process. Highly recommended to future customers.",
    n: "Alan Gui",
    when: "1 year ago",
  },
  {
    q: "I'd like to thank Nessar and my neighbour Hasan for doing a wonderful job organizing the installation of solar panels on my house. Wei and his team worked incredibly hard, especially since my home is double-storey, making the installation quite challenging. They spent the entire day ensuring everything was completed correctly. I'm very happy with the service.",
    n: "Legend",
    when: "9 months ago",
  },
  {
    q: "I am more than happy to recommend this company. Communication throughout the entire process was clear and prompt. Wei and the installation team kept me informed, left the property clean, and removed all rubbish. Mike, my salesperson, was knowledgeable, thorough, and genuinely took the time to answer my questions. Excellent service from start to finish.",
    n: "Jo Lister",
    when: "1 year ago",
  },
  {
    q: "I installed a 10.13kW solar system and am extremely happy with the product (Sungrow inverter and Trina panels) as well as the price. Mr. Nessar, CEO of Kratos Energy, is dependable and true to his word. He provided detailed information, a competitive quotation, and completed the installation within a week. The electricians were highly professional and took great care with my roof tiles.",
    n: "Md. Mijanur Rahman",
    when: "1 year ago",
    sys: "10.13kW System",
  },
  {
    q: "Kratos Energy arranged my solar battery installation, and the entire process went very smoothly. I was kept informed every step of the way. Logan from LJ Electrical arrived on time and completed an excellent installation. He explained everything clearly and even helped me install the monitoring app before leaving.",
    n: "Paul Phillips",
    when: "8 months ago",
  },
  {
    q: "We added a battery to our existing solar system, and the service was handled with minimal interruption. Ordering the parts and arranging installation was smooth and efficient. Kratos Energy and their team were wonderful to deal with, and I highly recommend them for their professionalism and ongoing customer support.",
    n: "Natalie Cootes",
    when: "3 years ago",
  },
  {
    q: "Highly appreciated and recommended. As a customer, you can deal directly with Nessar Khan and his team, ask questions, and receive clear answers for complete peace of mind. Thank you to Nessar and the team.",
    n: "Saleem Muhammad",
    when: "1 year ago",
  },
  {
    q: "I'm so pleased I chose Kratos Energy after comparing three different providers while building my home. Their pricing, product choices, and installation quality exceeded my expectations.",
    n: "Sukhneet Kaur",
    when: "4 years ago",
  },
  {
    q: "Friendly and professional throughout the entire process. The contractors were trustworthy and kept us well informed from beginning to end.",
    n: "Monir Younan",
    when: "8 months ago",
  },
  {
    q: "Loved the service and the quality of the products provided. The analysis and recommendations before installation were extremely helpful. Highly recommended.",
    n: "Areed Mohammad Nur",
    when: "1 year ago",
  },
  {
    q: "Kratos Energy offers different pricing options, allowing customers to choose what suits their needs. The quality of work was absolutely worth it, and the team went above and beyond during our solar installation.",
    n: "Sreejit Guha",
    when: "4 years ago",
  },
  {
    q: "I'm very happy with the installation, as well as the post-purchase follow-up and customer service. I will definitely recommend Kratos Energy to my friends and family.",
    n: "Natasha Miller",
    when: "4 years ago",
  },
  {
    q: "Informative website, excellent workmanship, and a great overall experience. Highly recommended.",
    n: "Rumne Khan",
    when: "4 years ago",
  },
];

/** Multi-colour Google "G" mark. */
function GoogleG({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden focusable="false">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

function Avatar({ name, size = 44 }: { name: string; size?: number }) {
  return (
    <span
      className="flex flex-none items-center justify-center rounded-full bg-green-100 font-display font-extrabold text-forest-700 ring-1 ring-inset ring-green-200"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {name[0]}
    </span>
  );
}

function ReviewCard({ r }: { r: Review }) {
  return (
    <figure
      data-card
      className="flex h-full min-w-[86%] snap-start flex-col rounded-2xl border border-ash-200 bg-white p-6 shadow-md sm:min-w-[48%] sm:p-7 lg:min-w-[calc(33.333%-0.84rem)]"
    >
      <div className="mb-3.5 flex items-center justify-between">
        <Stars size={16} />
        <GoogleG size={20} />
      </div>

      <blockquote className="flex-1 font-body text-[14.5px] leading-relaxed text-ink [overflow-wrap:anywhere]">
        <span className="line-clamp-[8]">&ldquo;{r.q}&rdquo;</span>
      </blockquote>

      <figcaption className="mt-5 flex items-center gap-3 border-t border-ash-200 pt-4">
        <Avatar name={r.n} />
        <div className="min-w-0">
          <div className="truncate font-display text-[14.5px] font-bold text-navy-700">
            {r.n}
          </div>
          <div className="font-body text-[12.5px] text-ash-500">
            {r.when} ·{" "}
            <span className="font-semibold text-green-600">
              {r.sys ? r.sys : "Verified"}
            </span>
          </div>
        </div>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [paused, setPaused] = useState(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const step = useCallback(() => {
    const el = trackRef.current;
    if (!el) return 0;
    const card = el.querySelector<HTMLElement>("[data-card]");
    return card ? card.offsetWidth + 20 : el.clientWidth; // 20px = gap-5
  }, []);

  const onScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const w = step();
    setActive(Math.round(el.scrollLeft / w));
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  }, [step]);

  useEffect(() => {
    onScroll();
    window.addEventListener("resize", onScroll);
    return () => window.removeEventListener("resize", onScroll);
  }, [onScroll]);

  // Autoplay — advances every 4.5s, loops back at the end. Pauses on
  // hover/focus/touch and honours prefers-reduced-motion.
  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      const el = trackRef.current;
      if (!el) return;
      const end = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
      el.scrollTo({ left: end ? 0 : el.scrollLeft + step(), behavior: "smooth" });
    }, 4500);
    return () => clearInterval(id);
  }, [paused, step]);

  // Pause now; for touch, auto-resume after a short idle.
  const hold = (autoResume = false) => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    setPaused(true);
    if (autoResume)
      resumeTimer.current = setTimeout(() => setPaused(false), 6000);
  };
  const release = () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    setPaused(false);
  };

  const nudge = (dir: -1 | 1) => {
    hold(true);
    trackRef.current?.scrollBy({ left: dir * step(), behavior: "smooth" });
  };

  const goTo = (i: number) => {
    hold(true);
    trackRef.current?.scrollTo({ left: i * step(), behavior: "smooth" });
  };

  return (
    <section id="reviews" className="bg-paper py-[84px]">
      <div className="container-ke">
        {/* Header + desktop arrows */}
        <div className="mb-9 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-pill border border-ash-200 bg-white px-3.5 py-1.5 shadow-sm">
              <GoogleG size={16} />
              <span className="font-display text-[13px] font-bold text-navy-700">
                Google Reviews
              </span>
              <span className="h-3.5 w-px bg-ash-200" />
              <span className="inline-flex items-center gap-1.5 font-body text-[13px] font-bold text-ash-700">
                <span className="text-gold-400">★</span> 5.0 · 14 reviews
              </span>
            </div>
            <h2 className="font-display text-[clamp(30px,3.6vw,46px)] font-extrabold tracking-[-0.02em] text-navy-700">
              Rated 5 stars by Australian homes.
            </h2>
          </div>

          <div className="hidden flex-none gap-2.5 sm:flex">
            <button
              onClick={() => nudge(-1)}
              disabled={atStart}
              aria-label="Previous reviews"
              className="ke-press flex h-12 w-12 items-center justify-center rounded-full border border-ash-300 bg-white text-navy-700 transition-colors hover:border-green-500 hover:text-green-600 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-ash-300 disabled:hover:text-navy-700"
            >
              <Icon name="arrow" size={18} stroke={2.4} className="rotate-180" />
            </button>
            <button
              onClick={() => nudge(1)}
              disabled={atEnd}
              aria-label="Next reviews"
              className="ke-press flex h-12 w-12 items-center justify-center rounded-full border border-ash-300 bg-white text-navy-700 transition-colors hover:border-green-500 hover:text-green-600 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-ash-300 disabled:hover:text-navy-700"
            >
              <Icon name="arrow" size={18} stroke={2.4} />
            </button>
          </div>
        </div>

        {/* Slider track — native scroll-snap (momentum swipe on mobile) */}
        <div
          ref={trackRef}
          onScroll={onScroll}
          onMouseEnter={() => hold()}
          onMouseLeave={release}
          onFocusCapture={() => hold()}
          onBlurCapture={release}
          onTouchStart={() => hold(true)}
          className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0"
        >
          {REVIEWS.map((r) => (
            <ReviewCard key={r.n} r={r} />
          ))}
        </div>

        {/* Progress dots */}
        <div className="mt-7 flex flex-wrap justify-center gap-2">
          {REVIEWS.map((r, i) => (
            <button
              key={r.n}
              onClick={() => goTo(i)}
              aria-label={`Go to review ${i + 1}`}
              className={
                active === i
                  ? "h-2 w-6 rounded-pill bg-green-500 transition-all"
                  : "h-2 w-2 rounded-pill bg-ash-300 transition-all hover:bg-ash-500"
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
