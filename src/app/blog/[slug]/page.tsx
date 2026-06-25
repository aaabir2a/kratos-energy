import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { GuideDownload } from "@/components/sections/GuideDownload";
import { Icon } from "@/components/ui/Icon";
import { POSTS, getPost } from "@/lib/posts";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article not found" };
  return { title: post.title, description: post.excerpt };
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const more = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <SiteLayout>
      <article className="bg-white">
        {/* Header */}
        <div className="container-ke max-w-[760px] pb-10 pt-12">
          <nav className="mb-6 flex items-center gap-2 font-body text-[13.5px] text-ash-500">
            <Link href="/" className="hover:text-forest-700">
              Home
            </Link>
            <Icon name="chevron" size={14} className="-rotate-90 opacity-50" />
            <Link href="/blog" className="hover:text-forest-700">
              Blog
            </Link>
          </nav>
          <span className="rounded-pill bg-green-50 px-3 py-1 font-display text-[12px] font-bold text-forest-700">
            {post.category}
          </span>
          <h1 className="mt-4 font-display text-[clamp(30px,4vw,48px)] font-extrabold leading-[1.08] tracking-[-0.025em] text-navy-800">
            {post.title}
          </h1>
          <div className="mt-4 flex items-center gap-3 font-body text-[14px] text-ash-500">
            <span className="font-semibold text-forest-700">{post.author}</span>
            <span>·</span>
            <span>{formatDate(post.date)}</span>
            <span>·</span>
            <span>{post.readMins} min read</span>
          </div>
        </div>

        {/* Cover */}
        <div className="container-ke max-w-[920px]">
          <div className="relative h-[280px] overflow-hidden rounded-xl shadow-md sm:h-[420px]">
            <Image
              src={post.cover}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 920px) 100vw, 920px"
              className="object-cover"
            />
          </div>
        </div>

        {/* Body */}
        <div className="container-ke max-w-[720px] py-12">
          {post.body.map((block, i) => {
            if (block.type === "h2") {
              return (
                <h2
                  key={i}
                  className="mb-3 mt-9 font-display text-[26px] font-extrabold tracking-[-0.02em] text-navy-700"
                >
                  {block.text}
                </h2>
              );
            }
            if (block.type === "ul") {
              return (
                <ul key={i} className="mb-5 flex flex-col gap-2.5">
                  {block.items?.map((it) => (
                    <li
                      key={it}
                      className="flex items-start gap-3 font-body text-[17px] leading-relaxed text-ink"
                    >
                      <Icon
                        name="check"
                        size={18}
                        stroke={3}
                        className="mt-1 flex-none text-green-500"
                      />
                      {it}
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p
                key={i}
                className="mb-5 font-body text-[17px] leading-[1.7] text-ash-700"
              >
                {block.text}
              </p>
            );
          })}
        </div>
      </article>

      {/* More articles */}
      <section className="border-t border-ash-200 bg-paper py-[70px]">
        <div className="container-ke">
          <h2 className="mb-8 font-display text-[clamp(24px,2.8vw,32px)] font-extrabold tracking-[-0.02em] text-navy-700">
            Keep reading
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {more.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="ke-lift group flex flex-col overflow-hidden rounded-lg border border-ash-200 bg-white shadow-md"
              >
                <div className="relative h-40">
                  <Image
                    src={p.cover}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-[16.5px] font-bold leading-[1.2] text-navy-700">
                    {p.title}
                  </h3>
                  <span className="mt-3 font-display text-[13px] font-bold text-forest-700 group-hover:underline">
                    Read more →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <GuideDownload />
    </SiteLayout>
  );
}
