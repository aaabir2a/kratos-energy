import { Icon } from "@/components/ui/Icon";
import type { Brand } from "@/lib/brands";

/**
 * Continuously scrolling brand strip. The track renders the list twice so the
 * -50% translate in `animate-brand-scroll` loops seamlessly; hovering pauses
 * it, and reduced-motion drops the duplicate copy for a static, scrollable row.
 *
 * Brands without a `logo` render as wordmark chips (see src/lib/brands.ts).
 */
export function BrandCarousel({
  brands,
  icon = "sun",
  label,
}: {
  brands: Brand[];
  icon?: "sun" | "battery" | "zap";
  /** Describes the strip for screen readers, e.g. "Inverter brands we install". */
  label: string;
}) {
  const copies: Array<"original" | "duplicate"> = ["original", "duplicate"];

  // A short list would not span a wide screen, leaving a visible gap as the
  // track loops. Repeat it until one copy carries at least 8 chips, then the
  // -50% translate still lands on an identical second copy.
  const repeats = Math.max(1, Math.ceil(8 / brands.length));

  return (
    <div
      className="brand-marquee relative overflow-hidden"
      role="group"
      aria-label={label}
    >
      {/* Soft edges so logos fade out rather than clipping at the boundary. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-paper to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-paper to-transparent" />

      <div className="animate-brand-scroll flex w-max gap-3.5">
        {copies.map((copy) => (
          <div
            key={copy}
            data-brand-copy={copy}
            className="flex gap-3.5"
            aria-hidden={copy === "duplicate"}
          >
            {Array.from({ length: repeats }).flatMap((_, r) =>
              brands.map((b) => (
              <div
                key={`${r}-${b.name}`}
                data-brand-repeat={r}
                title={b.note}
                className="flex h-[86px] w-[190px] flex-none items-center justify-center gap-2 rounded-md border border-ash-200 bg-white px-5 text-center"
              >
                {b.logo ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={b.logo}
                    alt={b.name}
                    loading="lazy"
                    className="max-h-[42px] w-auto max-w-full object-contain"
                  />
                ) : (
                  <>
                    <Icon
                      name={icon}
                      size={16}
                      stroke={2.2}
                      className="flex-none text-green-500"
                    />
                    <span className="font-display text-[15px] font-bold tracking-[-0.01em] text-ash-700">
                      {b.name}
                    </span>
                  </>
                )}
              </div>
              )),
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
