import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = {
  title: "News & Updates | Kratos Energy",
  description:
    "The latest news, announcements and updates from Kratos Energy — new products, rebates, projects and company milestones.",
};

export const revalidate = 60; // ISR

const PER_PAGE = 12;

type SearchParams = Promise<{ page?: string }>;

type NewsPost = {
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  category?: string;
  date: string;
  readMins: number;
  typeSlug?: string;
};

/** News shares the blog API; we fetch all posts and keep only type = "news". */
async function fetchNews(): Promise<NewsPost[]> {
  const base = process.env.NEXT_PUBLIC_API_BASE || "http://192.168.0.220:4000/api/v1";
  try {
    const res = await fetch(`${base}/public/blog/posts?page=1&limit=100`, {
      next: { revalidate: 60 },
    });
    const data = await res.json();
    const all: NewsPost[] = data.data?.posts || [];
    return all.filter((p) => String(p.typeSlug || "").toLowerCase() === "news");
  } catch (e) {
    console.error("Error fetching news from backend API:", e);
    return [];
  }
}

function formatDate(d: string) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function NewsPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const page = parseInt(searchParams.page || "1") || 1;

  const news = await fetchNews();
  const totalPages = Math.max(1, Math.ceil(news.length / PER_PAGE));
  const current = Math.min(page, totalPages);
  const displayPosts = news.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="News & Updates"
        title={
          <>
            The latest from <span className="text-green-600">Kratos Energy.</span>
          </>
        }
        subtitle="Announcements, new products, rebate changes and project milestones — straight from our team."
      />

      <section className="bg-white py-14">
        <div className="container-ke">
          {displayPosts.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {displayPosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="ke-lift group flex flex-col overflow-hidden rounded-xl border border-ash-200 bg-white shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48 bg-muted/10">
                    <Image
                      src={p.cover}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-green-600 px-2.5 py-1 font-display text-[11px] font-bold text-white shadow-sm">
                      {p.category || "News"}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-2 font-body text-[12.5px] text-ash-500">
                      {formatDate(p.date)} · {p.readMins} min read
                    </div>
                    <h3 className="font-display text-[19px] font-bold leading-[1.25] text-navy-700 group-hover:text-forest-700 transition-colors line-clamp-2">
                      {p.title}
                    </h3>
                    <p className="mt-3 flex-1 font-body text-[14px] leading-relaxed text-ash-700 line-clamp-3">
                      {p.excerpt}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1 font-display text-[13.5px] font-bold text-forest-700 group-hover:underline">
                      Read more →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border-2 border-dashed rounded-xl bg-paper">
              <p className="text-ash-500 font-bold text-[16px]">
                No news yet — check back soon.
              </p>
              <Link
                href="/blog"
                className="mt-4 inline-block text-forest-600 underline font-semibold text-sm"
              >
                Read our guides instead
              </Link>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-14 flex items-center justify-center gap-2">
              {current > 1 && (
                <Link
                  href={`/news?page=${current - 1}`}
                  className="px-4 py-2 border rounded-lg text-sm font-semibold hover:bg-muted/10 transition-colors"
                >
                  Previous
                </Link>
              )}
              {Array.from({ length: totalPages }, (_, i) => (
                <Link
                  key={i + 1}
                  href={`/news?page=${i + 1}`}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold transition-all ${
                    current === i + 1 ? "bg-green-600 text-white" : "border hover:bg-muted/10"
                  }`}
                >
                  {i + 1}
                </Link>
              ))}
              {current < totalPages && (
                <Link
                  href={`/news?page=${current + 1}`}
                  className="px-4 py-2 border rounded-lg text-sm font-semibold hover:bg-muted/10 transition-colors"
                >
                  Next
                </Link>
              )}
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
