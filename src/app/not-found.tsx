import Link from "next/link";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/sections/PageHero";
import { Icon } from "@/components/ui/Icon";

/**
 * Branded 404. Four dynamic routes call notFound(), and without this they fall
 * through to Next's unstyled default — a dead end for both users and crawlers.
 */
const LINKS: { href: string; label: string; blurb: string }[] = [
  {
    href: "/calculators",
    label: "Solar calculators",
    blurb: "Rebates, savings, output and feed-in tariffs — free, no sign-up.",
  },
  {
    href: "/rebates",
    label: "2026 rebates",
    blurb: "Every federal and state solar and battery rebate explained.",
  },
  {
    href: "/build",
    label: "Build your system",
    blurb: "Pick panels, inverter and battery, and see live pricing.",
  },
  {
    href: "/blog",
    label: "Blog & guides",
    blurb: "Plain-English guides to going solar in Australia.",
  },
];

export default function NotFound() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="404"
        title={
          <>
            We couldn&rsquo;t find <span className="text-green-600">that page.</span>
          </>
        }
        subtitle="It may have moved or never existed. Here are the places people usually want."
      >
        <Link
          href="/"
          className="ke-press inline-flex items-center justify-center gap-2.5 rounded-pill bg-green-500 px-[34px] py-[16px] font-display text-[16px] font-bold text-white shadow-green hover:bg-green-600"
        >
          Back to home <Icon name="arrow" size={20} stroke={2.4} />
        </Link>
      </PageHero>

      <section className="bg-white py-14 sm:py-[72px]">
        <div className="container-ke grid grid-cols-1 gap-5 sm:grid-cols-2">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="ke-lift flex flex-col rounded-xl border border-ash-200 bg-white p-6 shadow-md"
            >
              <span className="font-display text-[18px] font-extrabold text-navy-800">
                {l.label}
              </span>
              <span className="mt-1.5 font-body text-[14.5px] leading-relaxed text-ash-700">
                {l.blurb}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
