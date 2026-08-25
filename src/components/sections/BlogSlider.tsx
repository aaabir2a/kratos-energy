"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { PostSummary } from "@/lib/api";
import { displayTitle } from "@/lib/postTitle";

/**
 * "Latest guides" slider for the homepage. Same snap-scroll mechanics as
 * ProjectShowcase so the two sliders behave identically.
 *
 * Renders nothing when the CMS has no posts — an empty carousel reads as a
 * broken page, and the homepage flows fine without it.
 */
export function BlogSlider({ posts }: { posts: PostSummary[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  if (posts.length === 0) return null;

  const scrollBy = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.9, 360), behavior: "smooth" });
  };

  return (
    <section id="latest-guides" className="bg-white py-[84px]">
      <div className="container-ke">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
          <div className="max-w-[560px]">
            <div className="mb-2 flex items-center gap-3">
              <span className="h-px w-9 bg-green-500/70" />
              <span className="font-display text-[13px] font-bold uppercase tracking-[0.16em] text-green-600">
                Solar Guides
              </span>
            </div>
            <h2 className="font-display text-[clamp(28px,3.4vw,44px)] font-extrabold tracking-[-0.02em] text-navy-700">
              Work out the numbers before you buy.
            </h2>
            <p className="mt-3 font-body text-[17px] leading-relaxed text-ash-700">
              Plain-English guides on rebates, batteries and payback — written by
              the team that does the installs.
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Previous guides"
              className="ke-press flex h-11 w-11 items-center justify-center rounded-full border border-ash-300 text-forest-700 hover:border-green-500 hover:text-green-600"
            >
              <Icon name="chevron" size={20} className="rotate-90" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Next guides"
              className="ke-press flex h-11 w-11 items-center justify-center rounded-full border border-ash-300 text-forest-700 hover:border-green-500 hover:text-green-600"
            >
              <Icon name="chevron" size={20} className="-rotate-90" />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="-mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {posts.map((p) => (
            <article key={p.slug} className="w-[300px] flex-none snap-start sm:w-[352px]">
              <Link
                href={`/blog/${p.slug}`}
                className="ke-lift group flex h-full flex-col overflow-hidden rounded-xl border border-ash-200 bg-white shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="relative h-[190px] bg-ash-100">
                  {p.cover && (
                    <Image
                      src={p.cover}
                      alt={displayTitle(p.title)}
                      fill
                      sizes="(max-width: 640px) 300px, 352px"
                      className="object-cover"
                    />
                  )}
                  {(p.category || p.categoryName) && (
                    <span className="absolute left-3 top-3 rounded-full border border-ash-200 bg-white/95 px-2.5 py-1 font-display text-[11px] font-bold text-forest-700 shadow-sm">
                      {p.category || p.categoryName}
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-2 font-body text-[12.5px] text-ash-500">
                    {formatDate(p.date)}
                    {p.readMins ? ` · ${p.readMins} min read` : ""}
                  </div>
                  <h3 className="font-display text-[18px] font-bold leading-[1.25] tracking-[-0.01em] text-navy-700 transition-colors group-hover:text-forest-700 line-clamp-2">
                    {displayTitle(p.title)}
                  </h3>
                  {p.excerpt && (
                    <p className="mt-2.5 flex-1 font-body text-[14px] leading-relaxed text-ash-700 line-clamp-3">
                      {p.excerpt}
                    </p>
                  )}
                  <span className="mt-4 inline-flex items-center gap-1.5 font-display text-[13.5px] font-bold text-forest-700 group-hover:underline">
                    Read guide <Icon name="arrow" size={15} stroke={2.4} />
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Link
            href="/blog"
            className="ke-press inline-flex items-center justify-center gap-2.5 rounded-pill bg-green-500 px-[30px] py-[14px] font-display text-[15.5px] font-bold text-white shadow-green hover:bg-green-600"
          >
            Read all guides <Icon name="arrow" size={19} stroke={2.4} />
          </Link>
          <Link
            href="/calculators"
            className="ke-lift inline-flex items-center gap-2 rounded-pill border border-ash-300 bg-white px-6 py-[13px] font-display text-[14.5px] font-bold text-forest-700"
          >
            Try the calculators <Icon name="arrow" size={16} stroke={2.4} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function formatDate(d?: string) {
  if (!d) return "";
  const parsed = new Date(d);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" });
}
