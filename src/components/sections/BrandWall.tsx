import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { BRANDS } from "@/lib/systems";

/**
 * "We install CEC-approved panels, inverters & batteries" — brand wall.
 * Wordmark chips are used as tasteful placeholders; swap for licensed
 * brand logos (SVG/PNG) in production.
 */
export function BrandWall() {
  return (
    <section className="border-y border-ash-200 bg-paper py-16">
      <div className="container-ke">
        <div className="mb-9 text-center">
          <Eyebrow center>Premium Hardware Only</Eyebrow>
          <h2 className="mt-3 font-display text-[clamp(24px,2.8vw,34px)] font-extrabold tracking-[-0.02em] text-navy-700">
            We install CEC-approved panels, inverters &amp; batteries.
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {BRANDS.map((b) => (
            <div
              key={b}
              className="flex items-center justify-center gap-2 rounded-md border border-ash-200 bg-white px-4 py-5 text-center transition-shadow hover:shadow-sm"
            >
              <Icon
                name="sun"
                size={16}
                stroke={2.2}
                className="flex-none text-green-500"
              />
              <span className="font-display text-[14.5px] font-bold tracking-[-0.01em] text-ash-700">
                {b}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
