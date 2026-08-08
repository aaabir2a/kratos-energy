import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/sections/PageHero";
import { pageMetadata } from "@/lib/seo/metadata";

export const revalidate = 60; // ISR revalidation every 60 seconds

type SearchParams = Promise<{ category?: string; page?: string }>;

/**
 * Self-referencing canonical that keeps ?page and ?category. Pointing page 2 at
 * page 1 would orphan every post that only appears deeper in the list.
 */
export async function generateMetadata(props: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const sp = await props.searchParams;
  const page = parseInt(sp.page || "1") || 1;
  const category = sp.category || "";

  const query = new URLSearchParams();
  if (category) query.set("category", category);
  if (page > 1) query.set("page", String(page));
  const qs = query.toString();

  const suffix = page > 1 ? ` — Page ${page}` : "";
  return pageMetadata({
    title: `Solar Blog & Guides${suffix}`,
    description:
      "Practical, no-jargon Australian guides on solar costs, batteries, rebates and getting the most from your system — written by the Kratos Energy team.",
    path: `/blog${qs ? `?${qs}` : ""}`,
  });
}

async function fetchBlogData(category = "", page = 1) {
  const base = process.env.NEXT_PUBLIC_API_BASE || "http://192.168.0.220:4000/api/v1";
  try {
    const [postsRes, catsRes] = await Promise.all([
      fetch(`${base}/public/blog/posts?page=${page}&limit=10&category=${category}`, {
        next: { revalidate: 60 },
      }),
      fetch(`${base}/public/blog/categories`, {
        next: { revalidate: 60 },
      }),
    ]);

    const postsData = await postsRes.json();
    const catsData = await catsRes.json();

    return {
      posts: postsData.data?.posts || [],
      pagination: postsData.data?.pagination || { total: 0, page: 1, limit: 10, totalPages: 1 },
      categories: catsData.data || [],
    };
  } catch (e) {
    console.error("Error fetching blog data from backend API:", e);
    return {
      posts: [],
      pagination: { total: 0, page: 1, limit: 10, totalPages: 1 },
      categories: [],
    };
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

export default async function BlogPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const selectedCategory = searchParams.category || "";
  const page = parseInt(searchParams.page || "1") || 1;

  const { posts, pagination, categories } = await fetchBlogData(selectedCategory, page);

  // News items live on /news — never list them on the blog.
  const displayPosts = posts.filter(
    (p: { typeSlug?: string }) => String(p.typeSlug || "").toLowerCase() !== "news",
  );

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Latest News & Insights"
        title={
          <>
            Everything to know <span className="text-green-600">before going solar.</span>
          </>
        }
        subtitle="Expert tips on solar technology, sustainable living, and how to maximize your energy savings in Australia."
      />

      <section className="bg-white py-14">
        <div className="container-ke">

          {/* Category Tabs */}
          <div className="mb-10 flex flex-wrap gap-2 border-b pb-6">
            <Link
              href="/blog"
              className={`rounded-full px-4 py-2 font-display text-[13.5px] font-bold transition-all ${
                !selectedCategory
                  ? "bg-green-600 text-white shadow-sm"
                  : "bg-ash-100 hover:bg-ash-200 text-ash-700"
              }`}
            >
              All Posts
            </Link>
            {categories.map((cat: { id: string | number; slug: string; name: string }) => (
              <Link
                key={cat.id}
                href={`/blog?category=${cat.slug}`}
                className={`rounded-full px-4 py-2 font-display text-[13.5px] font-bold transition-all ${
                  selectedCategory === cat.slug
                    ? "bg-green-600 text-white shadow-sm"
                    : "bg-ash-100 hover:bg-ash-200 text-ash-700"
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>

          {/* Grid of Articles */}
          {displayPosts.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {displayPosts.map((p: { slug: string; cover: string; title: string; category?: string; date: string; readMins: number; excerpt: string }) => (
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
                    <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 font-display text-[11px] font-bold text-forest-700 shadow-sm border">
                      {p.category}
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
              <p className="text-ash-500 font-bold text-[16px]">No articles found in this category.</p>
              <Link href="/blog" className="mt-4 inline-block text-forest-600 underline font-semibold text-sm">
                Back to all posts
              </Link>
            </div>
          )}

          {/* Pagination Controls */}
          {pagination && pagination.totalPages > 1 && (
            <div className="mt-14 flex items-center justify-center gap-2">
              {page > 1 && (
                <Link
                  href={`/blog?page=${page - 1}${selectedCategory ? `&category=${selectedCategory}` : ""}`}
                  className="px-4 py-2 border rounded-lg text-sm font-semibold hover:bg-muted/10 transition-colors"
                >
                  Previous
                </Link>
              )}
              {Array.from({ length: pagination.totalPages }, (_, i) => (
                <Link
                  key={i + 1}
                  href={`/blog?page=${i + 1}${selectedCategory ? `&category=${selectedCategory}` : ""}`}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold transition-all ${
                    page === i + 1
                      ? "bg-green-600 text-white"
                      : "border hover:bg-muted/10"
                  }`}
                >
                  {i + 1}
                </Link>
              ))}
              {page < pagination.totalPages && (
                <Link
                  href={`/blog?page=${page + 1}${selectedCategory ? `&category=${selectedCategory}` : ""}`}
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
