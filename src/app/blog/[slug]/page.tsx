import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Icon } from "@/components/ui/Icon";
import { BlogBlockRenderer } from "@/components/blog/BlogBlockRenderer";
import { SYSTEMS } from "@/lib/systems";
import { absoluteUrl, postPath } from "@/lib/seo/site";
import { articleLd, breadcrumbLd, faqLd } from "@/lib/seo/schema";
import { schemaForPostType, faqPairsFromBlocks, wordCountFromBlocks } from "@/lib/seo/postType";
import { imageSize } from "@/lib/seo/imageSize";
import { JsonLd } from "@/components/seo/JsonLd";

type Params = { params: Promise<{ slug: string }> };

export const revalidate = 60; // ISR revalidation every 60 seconds

async function fetchPost(slug: string) {
  const base = process.env.NEXT_PUBLIC_API_BASE || "http://192.168.0.220:4000/api/v1";
  try {
    const res = await fetch(`${base}/public/blog/posts/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data || null;
  } catch (e) {
    console.error(`Error fetching post ${slug} from backend:`, e);
    return null;
  }
}

async function fetchRelated(categorySlug: string, currentSlug: string) {
  const base = process.env.NEXT_PUBLIC_API_BASE || "http://192.168.0.220:4000/api/v1";
  try {
    const res = await fetch(`${base}/public/blog/posts?category=${categorySlug}&limit=4`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    const list = data.data?.posts || [];
    return list.filter((p: any) => p.slug !== currentSlug).slice(0, 3);
  } catch (e) {
    console.error("Error fetching related posts:", e);
    return [];
  }
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPost(slug);
  if (!post) return { title: "Article not found" };

  // Measured, not assumed — featured images ship in several ratios, so a
  // hardcoded 1200x630 would misdescribe every one of them.
  const size = await imageSize(post.featuredImage);
  const ogImages = post.featuredImage
    ? [{ url: post.featuredImage, alt: post.title, ...(size ?? {}) }]
    : undefined;
  const tags = Array.isArray(post.tags) ? post.tags.filter(Boolean) : [];

  return {
    // No manual brand suffix — the root template already appends
    // " · Kratos Energy".
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    alternates: {
      // Fall back to a self-referencing canonical; a post with no CMS
      // canonicalUrl previously got none at all.
      canonical: post.canonicalUrl || absoluteUrl(postPath("blog", post.slug || slug)),
    },
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      url: absoluteUrl(postPath("blog", post.slug || slug)),
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
  return new Date(d).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
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
          <div className="mt-1 font-body text-xs text-ash-600">
            {s.audience}
          </div>

          <div className="my-4 border-t border-b border-ash-100 py-3.5">
            <span className="font-body text-[11px] font-bold uppercase tracking-[0.06em] text-ash-500 block">
              Save up to
            </span>
            <div className="flex items-end gap-1.5 mt-0.5">
              <span className="font-display text-[24px] font-extrabold leading-none text-green-600">
                ${s.savingsPerYear.toLocaleString()}
              </span>
              <span className="pb-0.5 font-body text-[12px] font-semibold text-ash-500">
                / year
              </span>
            </div>
          </div>

          <ul className="mb-5 flex flex-col gap-2">
            {s.specs.map((spec) => (
              <li
                key={spec}
                className="flex items-start gap-2 font-body text-[12.5px] text-gray-700 leading-tight"
              >
                <Icon
                  name="check"
                  size={13}
                  stroke={3}
                  className="flex-none text-green-500 mt-0.5"
                />
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

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = await fetchPost(slug);
  if (!post) notFound();

  // News articles live at /news/<slug>. Without this guard they render here
  // too, duplicating every news post across two indexable URLs.
  if (String(post.typeSlug || "").toLowerCase() === "news") {
    redirect(postPath("news", post.slug || slug));
  }

  const related = await fetchRelated(post.categorySlug, post.slug);

  // Author initials for avatar icon
  const authorName = post.author || "Kratos Energy";

  // The CMS post type drives the structured data, so a FAQ post is described
  // as one rather than as a plain article.
  const shape = schemaForPostType(post.typeSlug || post.type?.slug);
  const faqPairs = shape.faq ? faqPairsFromBlocks(post.blocks) : [];

  const schemaJson = articleLd({
    type: shape.article,
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage,
    authorName,
    datePublished: post.publishedAt || post.createdAt,
    dateModified: post.updatedAt,
    path: postPath("blog", post.slug || slug),
    keywords: post.tags,
    articleSection: post.categoryName || undefined,
    wordCount: wordCountFromBlocks(post.blocks) || undefined,
  });

  // Mirrors the breadcrumb rendered in the DOM below, so Google can extract
  // the trail for SERP display rather than inferring it from the URL.
  const breadcrumbJson = breadcrumbLd([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: postPath("blog", post.slug || slug) },
  ]);

  return (
    <SiteLayout>
      <JsonLd data={schemaJson} />
      <JsonLd data={breadcrumbJson} />
      {/* Only worth emitting when the body actually yielded Q&A pairs — a
          one-item or empty FAQPage is noise to crawlers. */}
      {faqPairs.length >= 2 && <JsonLd data={faqLd(faqPairs)} />}

      <article className="bg-white">
        {/* Full-width Cover Hero Section */}
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
            {/* Breadcrumb */}
            <nav className="mb-5 flex flex-wrap items-center gap-2 font-body text-[13px] text-white/70">
              <Link href="/" className="hover:text-green-400 transition-colors">
                Home
              </Link>
              <span>&gt;</span>
              <Link href="/blog" className="hover:text-green-400 transition-colors">
                Blog
              </Link>
              <span>&gt;</span>
              <span className="text-white line-clamp-1">{post.title}</span>
            </nav>

            {/* Category badge */}
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-orange-600 hover:bg-orange-700 px-4 py-1.5 font-display text-[12px] font-bold text-white shadow transition-colors">
                {post.categoryName}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display text-[clamp(28px,4vw,40px)] font-extrabold leading-[1.12] tracking-[-0.025em] text-white max-w-4xl">
              {post.title}
            </h1>

            {/* Meta info */}
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

            {/* Excerpt */}
            {post.excerpt && (
              <p className="article-excerpt mt-5 font-body text-[14.5px] leading-relaxed text-white/80 max-w-3xl">
                {post.excerpt}
              </p>
            )}

            {/* Tags list */}
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

        {/* Two Column Content / Sidebar packages grid */}
        <div className="bg-white py-14">
          <div className="container-ke max-w-[1100px]">
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-10">
              {/* Left Column - 70% width */}
              <div className="lg:col-span-7 space-y-12">
                <BlogBlockRenderer blocks={post.blocks || []} />
              </div>

              {/* Right Column - 30% width */}
              <div className="lg:col-span-3">
                <SidebarPackages />
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles Section */}
      {related.length > 0 && (
        <section className="border-t border-ash-200 bg-paper py-16">
          <div className="container-ke">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <h2 className="font-display text-[26px] font-extrabold tracking-[-0.02em] text-navy-800">
                  Related Articles
                </h2>
                <p className="text-sm text-ash-500 mt-1">Continue your journey to sustainable living.</p>
              </div>
              <Link href="/blog" className="inline-flex items-center gap-1 font-display text-sm font-bold text-forest-700 hover:underline">
                View Blog <Icon name="chevron" size={10} className="-rotate-90" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              {related.map((p: any) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
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
                      {p.category}
                    </span>
                    <h3 className="font-display text-[16px] font-bold leading-[1.25] text-navy-700 group-hover:text-forest-700 transition-colors line-clamp-2">
                      {p.title}
                    </h3>
                    <span className="mt-4 font-display text-[13px] font-bold text-forest-700 group-hover:underline">
                      Read article →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Subscribe CTA Banner */}
      <section className="bg-white py-12">
        <div className="container-ke">
          <div className="bg-[#103a30] text-white rounded-3xl p-8 md:p-12 shadow-lg flex flex-col lg:flex-row lg:items-center justify-between gap-8 border border-forest-800">
            <div className="space-y-2.5 max-w-xl">
              <h3 className="font-display text-[clamp(24px,2.5vw,32px)] font-extrabold leading-tight tracking-[-0.025em]">
                Stay ahead of the sun
              </h3>
              <p className="font-body text-[14.5px] leading-relaxed text-forest-200">
                Get the latest insights on solar technology and energy savings delivered straight to your inbox.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:max-w-md shrink-0">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-white/10 hover:bg-white/15 focus:bg-white focus:text-navy-900 border border-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 placeholder:text-white/60 transition-all"
              />
              <button
                type="button"
                className="bg-[#6abf2e] hover:bg-[#5da728] text-navy-950 font-display font-bold px-6 py-3 rounded-xl text-sm transition-colors text-center shadow-sm"
              >
                Subscribe
              </button>
              <button
                type="button"
                className="border border-white/30 hover:bg-white/10 text-white font-display font-bold px-5 py-3 rounded-xl text-sm transition-colors text-center"
              >
                Free Quote
              </button>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
