import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { relatedCalculators } from "@/lib/calculators";

/**
 * Contextual in-body links between the calculators. These carry more weight
 * than the nav or footer because they sit inside the content, and they give
 * every calculator a route back to the hub.
 */
export function RelatedCalculators({
  currentPath,
  heading = "Related calculators",
  limit = 3,
}: {
  currentPath: string;
  heading?: string;
  limit?: number;
}) {
  const items = relatedCalculators(currentPath, limit);

  return (
    <section className="border-t border-ash-200 bg-white py-14">
      <div className="container-ke">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="font-display text-[clamp(20px,2.4vw,28px)] font-extrabold tracking-[-0.02em] text-navy-700">
            {heading}
          </h2>
          <Link
            href="/calculators"
            className="inline-flex items-center gap-1.5 font-display text-[14.5px] font-bold text-green-600 hover:text-green-700"
          >
            All solar calculators
            <Icon name="arrow" size={16} stroke={2.4} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {items.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="ke-lift flex flex-col rounded-xl border border-ash-200 bg-paper p-5"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-[11px] bg-green-50 text-green-600">
                <Icon name={c.icon} size={20} />
              </span>
              <span className="mt-3 font-display text-[16px] font-extrabold text-navy-800">
                {c.title}
              </span>
              <span className="mt-1 font-body text-[13.5px] leading-relaxed text-ash-700">
                {c.desc}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
