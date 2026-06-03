import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/sections/PageHero";
import { GuideDownload } from "@/components/sections/GuideDownload";
import { POSTS } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Solar Blog & Guides",
  description:
    "Practical, no-jargon guides on solar costs, batteries, rebates and getting the most from your system — from the Kratos Energy team.",
};

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function BlogPage() {
  const [feature, ...rest] = POSTS;

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Blog & Guides"
        title={
          <>
            Everything to know <span className="text-green-600">before going solar.</span>
          </>
        }
        subtitle="Honest, practical guides on costs, batteries, rebates and getting the most from your system."
      />

      <section className="bg-white py-14">
        <div className="container-ke">
          {/* Featured */}
          <Link
            href={`/blog/${feature.slug}`}
            className="ke-lift group grid grid-cols-1 overflow-hidden rounded-xl border border-ash-200 bg-white shadow-md lg:grid-cols-2"
          >
            <div className="relative h-60 lg:h-auto">
              <Image
                src={feature.cover}
                alt={feature.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-10">
              <div className="mb-3 flex items-center gap-3">
                <span className="rounded-pill bg-green-50 px-3 py-1 font-display text-[12px] font-bold text-forest-700">
                  {feature.category}
                </span>
                <span className="font-body text-[13px] text-ash-500">
                  {formatDate(feature.date)} · {feature.readMins} min read
                </span>
              </div>
              <h2 className="font-display text-[clamp(24px,2.6vw,32px)] font-extrabold leading-[1.12] tracking-[-0.02em] text-navy-800">
                {feature.title}
              </h2>
              <p className="mt-3 font-body text-[16px] leading-relaxed text-ash-700">
                {feature.excerpt}
              </p>
              <span className="mt-5 font-display text-[14.5px] font-bold text-forest-700 group-hover:underline">
                Read article →
              </span>
            </div>
          </Link>

          {/* Grid */}
          <div className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="ke-lift group flex flex-col overflow-hidden rounded-lg border border-ash-200 bg-white shadow-md"
              >
                <div className="relative h-44">
                  <Image
                    src={p.cover}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <span className="absolute left-3 top-3 rounded-pill bg-white/95 px-2.5 py-1 font-display text-[11px] font-bold text-forest-700 shadow-sm">
                    {p.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-2 font-body text-[12.5px] text-ash-500">
                    {formatDate(p.date)} · {p.readMins} min read
                  </div>
                  <h3 className="font-display text-[18px] font-bold leading-[1.2] text-navy-700">
                    {p.title}
                  </h3>
                  <p className="mt-2 flex-1 font-body text-[14px] leading-relaxed text-ash-700">
                    {p.excerpt}
                  </p>
                  <span className="mt-4 font-display text-[13.5px] font-bold text-forest-700 group-hover:underline">
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
