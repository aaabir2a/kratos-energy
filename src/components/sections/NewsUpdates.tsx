import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { PostSummary } from "@/lib/api";
import { displayTitle } from "@/lib/postTitle";

/**
 * "Industry updates" band for the homepage.
 *
 * Deliberately not a second carousel: news is scanned by date, not browsed by
 * picture, so it is a dated list on the dark brand band. That also keeps it a
 * server component — no JS ships for this section — and gives the eye a break
 * between the white blog slider above and whatever follows.
 *
 * Renders nothing when there is no news to show.
 */
export function NewsUpdates({ posts }: { posts: PostSummary[] }) {
  if (posts.length === 0) return null;

  const [lead, ...rest] = posts;

  return (
    <section className="bg-forest-900 py-[84px] text-white">
      <div className="container-ke">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-16">
          {/* Standing head */}
          <div>
            <div className="mb-2 flex items-center gap-3">
              <span className="h-px w-9 bg-green-400/70" />
              <span className="font-display text-[13px] font-bold uppercase tracking-[0.16em] text-green-400">
                Industry Updates
              </span>
            </div>
            <h2 className="font-display text-[clamp(28px,3.2vw,40px)] font-extrabold leading-[1.1] tracking-[-0.02em] [text-wrap:balance]">
              Rebates and rules change. We track them.
            </h2>
            <p className="mt-4 font-body text-[16px] leading-relaxed text-white/70">
              Government schemes, tariff changes and market shifts that affect
              what your system costs and what it earns.
            </p>
            <Link
              href="/news"
              className="ke-press mt-7 inline-flex items-center gap-2 rounded-pill border border-white/25 bg-white/10 px-6 py-3 font-display text-[14.5px] font-bold text-white transition-colors hover:bg-white/20"
            >
              All news &amp; updates <Icon name="arrow" size={16} stroke={2.4} />
            </Link>
          </div>

          {/* Dated list — newest first, lead item given more room */}
          <div className="flex flex-col">
            <Link
              href={`/news/${lead.slug}`}
              className="group border-b border-white/15 pb-7 transition-colors"
            >
              <div className="flex flex-wrap items-center gap-3 font-display text-[12px] font-bold uppercase tracking-[0.12em] text-green-400">
                <span>{formatDate(lead.date)}</span>
                {(lead.category || lead.categoryName) && (
                  <>
                    <span className="h-1 w-1 rounded-full bg-white/30" />
                    <span className="text-white/50">{lead.category || lead.categoryName}</span>
                  </>
                )}
              </div>
              <h3 className="mt-3 font-display text-[clamp(20px,2.2vw,27px)] font-bold leading-[1.22] tracking-[-0.015em] text-white [text-wrap:balance] group-hover:text-green-300">
                {displayTitle(lead.title)}
              </h3>
              {lead.excerpt && (
                <p className="mt-3 max-w-[62ch] font-body text-[15px] leading-relaxed text-white/70 line-clamp-2">
                  {lead.excerpt}
                </p>
              )}
              <span className="mt-4 inline-flex items-center gap-1.5 font-display text-[13.5px] font-bold text-green-400">
                Read update <Icon name="arrow" size={15} stroke={2.4} />
              </span>
            </Link>

            {rest.map((p) => (
              <Link
                key={p.slug}
                href={`/news/${p.slug}`}
                className="group flex flex-col gap-1.5 border-b border-white/15 py-5 sm:flex-row sm:items-baseline sm:gap-6"
              >
                <span className="flex-none font-display text-[12px] font-bold uppercase tracking-[0.12em] text-green-400 sm:w-[104px]">
                  {formatDate(p.date)}
                </span>
                <span className="font-display text-[16.5px] font-semibold leading-[1.35] text-white/90 group-hover:text-green-300">
                  {displayTitle(p.title)}
                </span>
              </Link>
            ))}
          </div>
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
