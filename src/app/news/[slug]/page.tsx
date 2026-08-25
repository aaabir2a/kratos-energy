import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Icon } from "@/components/ui/Icon";
import { BlogBlockRenderer } from "@/components/blog/BlogBlockRenderer";
import { SYSTEMS } from "@/lib/systems";
import { absoluteUrl, postPath } from "@/lib/seo/site";
import { articleLd, breadcrumbLd } from "@/lib/seo/schema";
import { wordCountFromBlocks } from "@/lib/seo/postType";
import { imageSize } from "@/lib/seo/imageSize";
import { JsonLd } from "@/components/seo/JsonLd";

type Params = { params: Promise<{ slug: string }> };

export const revalidate = 60; // ISR

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://192.168.0.220:4000/api/v1";

/**
 * Prebuild news posts for the same reason the blog template does — only the
 * `news` type lives on this route, so everything else is filtered out. Falls
 * back to on-demand rendering when the CMS is unreachable at build time.
 */
export async function generateStaticParams() {
  const PER_PAGE = 100;
  const MAX_PAGES = 10;
  const slugs: { slug: string }[] = [];

  try {
    for (let page = 1; page <= MAX_PAGES; page++) {
      const res = await fetch(`${API_BASE}/public/blog/posts?page=${page}&limit=${PER_PAGE}`, {
        next: { revalidate: 3600 },
      });
      if (!res.ok) break;
      const data = await res.json();
      const posts = data.data?.posts || [];

      for (const p of posts as { slug?: string; typeSlug?: string }[]) {
        if (!p.slug) continue;
        if (String(p.typeSlug || "").toLowerCase() !== "news") continue;
        slugs.push({ slug: p.slug });
      }

      const totalPages = data.data?.pagination?.totalPages ?? 1;
      if (posts.length === 0 || page >= totalPages) break;
    }
  } catch (e) {
    console.error("generateStaticParams: could not list news posts:", e);
    return [];
  }

  return slugs;
}

async function fetchPost(slug: string) {
  try {
    const res = await fetch(`${API_BASE}/public/blog/posts/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data || null;
  } catch (e) {
    console.error(`Error fetching news ${slug} from backend:`, e);
    return null;
  }
}

/** Other NEWS items, excluding the current one. */
async function fetchRelatedNews(currentSlug: string) {
  try {
    const res = await fetch(`${API_BASE}/public/blog/posts?page=1&limit=100`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const list = (await res.json()).data?.posts || [];
    return list
      .filter(
        (p: { typeSlug?: string; slug: string }) =>
          String(p.typeSlug || "").toLowerCase() === "news" && p.slug !== currentSlug,
      )
      .slice(0, 3);
  } catch (e) {
    console.error("Error fetching related news:", e);
    return [];
  }
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPost(slug);
  if (!post) return { title: "Update not found" };

  // Measured rather than assumed — see the blog template.
  const size = await imageSize(post.featuredImage);
  const ogImages = post.featuredImage
    ? [{ url: post.featuredImage, alt: post.title, ...(size ?? {}) }]
    : undefined;
  const tags = Array.isArray(post.tags) ? post.tags.filter(Boolean) : [];

  return {
    // The root template appends " · Kratos Energy" — no manual suffix.
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    alternates: {
      canonical: post.canonicalUrl || absoluteUrl(postPath("news", post.slug || slug)),
    },
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      url: absoluteUrl(postPath("news", post.slug || slug)),
      images: ogImages,
      type: "article",
      ...(tags.length ? { tags } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      ...(post.featuredImage
        ? { images: [{ url: post.featuredImage, alt: post.title }] }
        : {}),
    },
  };
}

function formatDate(d: string) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });
}

function SidebarPackages() {
  const residentialSystems = SYSTEMS.filter((s) => s.category === "residential");

  return (
    <div className="space-y-6 lg:sticky lg:top-28">
      <div className="border-b pb-4">
        <h3 className="font-display font-extrabold text-[19px] text-navy-800">
          Solar System Packages
        </h3>
        <p className="font-body text-xs text-ash-500 mt-1">
          Tier 1 panels &amp; CEC accredited installation.
        </p>
      </div>

      {residentialSystems.map((s) => (
        <div
          key={s.slug}
          className={`relative flex flex-col rounded-xl p-6 bg-white border transition-all duration-300 ${
            s.recommended
              ? "border-green-500 shadow-md ring-1 ring-green-500/20"
              : "border-ash-200 shadow-sm hover:shadow-md"
          }`}
        >
          {s.recommended && (
            <span className="absolute -top-3 left-6 rounded-full bg-green-500 px-3 py-0.5 font-display text-[10px] font-bold uppercase tracking-[0.06em] text-white">
              Recommended
            </span>
          )}

          <div className="font-display text-[26px] font-extrabold leading-none text-navy-800">
            {s.size}
          </div>
          <div className="mt-1 font-body text-xs text-ash-600">{s.audience}</div>

          <div className="my-4 border-t border-b border-ash-100 py-3.5">
            <span className="font-body text-[11px] font-bold uppercase tracking-[0.06em] text-ash-500 block">
              Save up to
            </span>
            <div className="flex items-end gap-1.5 mt-0.5">
              <span className="font-display text-[24px] font-extrabold leading-none text-green-600">
                ${s.savingsPerYear.toLocaleString()}
              </span>
              <span className="pb-0.5 font-body text-[12px] font-semibold text-ash-500">/ year</span>
            </div>
          </div>

          <ul className="mb-5 flex flex-col gap-2">
            {s.specs.map((spec) => (
              <li
                key={spec}
                className="flex items-start gap-2 font-body text-[12.5px] text-gray-700 leading-tight"
              >
                <Icon name="check" size={13} stroke={3} className="flex-none text-green-500 mt-0.5" />
                <span>{spec}</span>
              </li>
            ))}
          </ul>

          <div className="space-y-2.5">
            <Link
              href="/get-a-quote"
              className="flex w-full items-center justify-center gap-1.5 rounded-lg px-4 py-2.5 font-display text-[13px] font-bold transition-all shadow-sm bg-navy-800 text-white hover:bg-forest-700 hover:text-white"
            >
              Get My Price
            </Link>
            <Link
              href={`/packages/${s.slug}`}
              className="block text-center font-display text-[12px] font-bold text-forest-700 hover:underline"
            >
              Learn more about system →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function NewsPostPage({ params }: Params) {
  const { slug } = await params;
  const post = await fetchPost(slug);
  if (!post) notFound();
  // Only NEWS items live under /news — a blog post accessed here 404s.
  if (String(post.typeSlug || "").toLowerCase() !== "news") notFound();

  const related = await fetchRelatedNews(post.slug);
  const authorName = post.author || "Kratos Energy";

  const schemaJson = articleLd({
    type: "NewsArticle",
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage,
    authorName,
    datePublished: post.publishedAt || post.createdAt,
    dateModified: post.updatedAt,
    path: postPath("news", post.slug || slug),
    keywords: post.tags,
    articleSection: post.categoryName || undefined,
    wordCount: wordCountFromBlocks(post.blocks) || undefined,
  });

  // Mirrors the breadcrumb rendered below, matching /blog/[slug].
  const breadcrumbJson = breadcrumbLd([
    { name: "Home", path: "/" },
    { name: "News", path: "/news" },
    { name: post.title, path: postPath("news", post.slug || slug) },
  ]);

  return (
    <SiteLayout>
      <JsonLd data={schemaJson} />
      <JsonLd data={breadcrumbJson} />

      <article className="bg-white">
        <div className="relative w-full overflow-hidden bg-[#0e4a31] text-white min-h-[300px] flex items-center">
          {post.featuredImage && (
            <div className="absolute inset-0 z-0">
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                priority
                className="object-cover opacity-25"
              />
              <div className="absolute inset-0 bg-[#0e4a31]/85 mix-blend-multiply" />
            </div>
          )}

          <div className="container-ke max-w-[1100px] relative z-10 py-10 sm:py-14">
            <nav className="mb-5 flex flex-wrap items-center gap-2 font-body text-[13px] text-white/70">
              <Link href="/" className="hover:text-green-400 transition-colors">
                Home
              </Link>
              <span>&gt;</span>
              <Link href="/news" className="hover:text-green-400 transition-colors">
                News
              </Link>
              <span>&gt;</span>
              <span className="text-white line-clamp-1">{post.title}</span>
            </nav>

            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-green-600 px-4 py-1.5 font-display text-[12px] font-bold text-white shadow">
                {post.categoryName || "News"}
              </span>
            </div>

            <h1 className="font-display text-[clamp(28px,4vw,40px)] font-extrabold leading-[1.12] tracking-[-0.025em] text-white max-w-4xl">
              {post.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-[13px] font-body text-white/80">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                {formatDate(post.date)}
              </span>
              <span className="text-white/40">•</span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                {post.readMins || 5} min read
              </span>
            </div>

            {post.excerpt && (
              <p className="article-excerpt mt-5 font-body text-[14.5px] leading-relaxed text-white/80 max-w-3xl">
                {post.excerpt}
              </p>
            )}

            {post.tags && post.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2.5">
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/10 hover:bg-white/15 text-white/90 border border-white/20 px-3.5 py-1 text-xs font-semibold tracking-wide transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white py-14">
          <div className="container-ke max-w-[1100px]">
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-10">
              <div className="lg:col-span-7 space-y-12">
                <BlogBlockRenderer blocks={post.blocks || []} postTitle={post.title} />
              </div>
              <div className="lg:col-span-3">
                <SidebarPackages />
              </div>
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-ash-200 bg-paper py-16">
          <div className="container-ke">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <h2 className="font-display text-[26px] font-extrabold tracking-[-0.02em] text-navy-800">
                  More News &amp; Updates
                </h2>
                <p className="text-sm text-ash-500 mt-1">The latest from the Kratos Energy team.</p>
              </div>
              <Link href="/news" className="inline-flex items-center gap-1 font-display text-sm font-bold text-forest-700 hover:underline">
                View all News <Icon name="chevron" size={10} className="-rotate-90" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              {related.map((p: { slug: string; cover: string; title: string; category?: string }) => (
                <Link
                  key={p.slug}
                  href={`/news/${p.slug}`}
                  className="ke-lift group flex flex-col overflow-hidden rounded-xl border border-ash-200 bg-white shadow-md"
                >
                  <div className="relative h-44 bg-muted/10">
                    <Image
                      src={p.cover}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <span className="text-[11px] font-bold text-forest-600 mb-1">
                      {p.category || "News"}
                    </span>
                    <h3 className="font-display text-[16px] font-bold leading-[1.25] text-navy-700 group-hover:text-forest-700 transition-colors line-clamp-2">
                      {p.title}
                    </h3>
                    <span className="mt-4 font-display text-[13px] font-bold text-forest-700 group-hover:underline">
                      Read update →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </SiteLayout>
  );
}
