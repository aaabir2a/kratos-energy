"use client";

import { useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { BATTERIES } from "@/lib/batteries";
import { useContentStore } from "@/lib/store";

/** Unified card model so live CRM products and the static fallback render
 *  through one template. */
type Card = {
  key: string;
  brand: string;
  title: string;
  capacity: string;
  image: string;
  price: number | null;
  features: string[];
};

const AUD = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  maximumFractionDigits: 0,
});

const isRemote = (src: string) => /^https?:\/\//.test(src);

function CardImage({ src, alt }: { src: string; alt: string }) {
  // Remote CRM images bypass next/image (no domain config needed) and load
  // lazily; local fallback assets keep the optimizer.
  if (isRemote(src)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-contain p-6"
      />
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      className="object-contain p-6"
    />
  );
}

function BatteryCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-ash-200 bg-white shadow-md animate-pulse">
      <div className="relative aspect-square border-b border-ash-200 bg-ash-50 flex items-center justify-center">
        {/* Brand pill placeholder */}
        <div className="absolute left-4 top-4 h-6 w-20 rounded-pill bg-ash-200" />
        {/* Image placeholder */}
        <div className="h-1/2 w-1/2 rounded bg-ash-200/60" />
      </div>

      <div className="flex flex-1 flex-col p-6 space-y-4">
        <div>
          {/* Title placeholder */}
          <div className="h-6 w-3/4 rounded bg-ash-200" />
          {/* Capacity placeholder */}
          <div className="mt-2 h-5 w-1/2 rounded bg-ash-200" />
        </div>
        
        {/* Features placeholders */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center gap-2.5">
            <div className="h-4 w-4 rounded-full bg-ash-200" />
            <div className="h-4 w-5/6 rounded bg-ash-200" />
          </div>
          <div className="flex items-center gap-2.5">
            <div className="h-4 w-4 rounded-full bg-ash-200" />
            <div className="h-4 w-2/3 rounded bg-ash-200" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function BatteryRange() {
  const { status, data } = useContentStore((s) => s.products);
  const loadProducts = useContentStore((s) => s.loadProducts);

  useEffect(() => {
    loadProducts("Battery");
  }, [loadProducts]);

  const isLoading = status === "idle" || status === "loading";

  const cards = useMemo<Card[]>(() => {
    if (status === "ready" && data.length > 0) {
      return data.map((p) => ({
        key: p.id,
        brand: p.brandName,
        title: p.brandName,
        capacity: p.capacity ?? "",
        image: p.imageUrl ?? "/battery/Fox-ess.png",
        price: p.finalPrice > 0 ? p.finalPrice : null,
        features:
          typeof p.stock === "number" && p.stock > 0
            ? ["CEC-approved", "In stock — ready to install"]
            : ["CEC-approved", "Eligible for state rebates"],
      }));
    }
    // Fallback: static brand range until the API responds (or if it fails).
    return BATTERIES.map((b) => ({
      key: b.brand,
      brand: b.brand,
      title: b.model,
      capacity: b.capacity,
      image: b.image,
      price: null,
      features: b.features,
    }));
  }, [status, data]);

  return (
    <section id="battery" className="bg-paper py-[84px]">
      <div className="container-ke">
        {/* Asymmetric header: statement left, trust + link right */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.35fr_1fr] lg:items-end">
          <div>
            <h2 className="font-display text-[clamp(30px,3.6vw,46px)] font-extrabold tracking-[-0.02em] text-navy-700">
              Store the sun. Power the night.
            </h2>
            <p className="mt-3 max-w-[520px] font-body text-lg text-ash-700">
              Add a home battery to any Kratos system and run your house on free
              daytime solar after dark, with backup that keeps the lights on
              through a blackout.
            </p>
          </div>
          <div className="lg:pb-1">
            <div className="flex items-center gap-2.5 font-body text-[14.5px] font-semibold text-forest-700">
              <Icon name="shield" size={18} stroke={2.2} className="flex-none text-green-500" />
              CEC-approved batteries, eligible for state rebates.
            </div>
            <Link
              href="/battery-storage"
              className="mt-3 inline-flex items-center gap-2 font-display text-[15px] font-bold text-forest-700 underline-offset-4 hover:underline"
            >
              Explore battery storage
              <Icon name="arrow" size={16} stroke={2.4} />
            </Link>
          </div>
        </div>

        {/* Brand range */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <BatteryCardSkeleton key={i} />
            ))
          ) : (
            cards.map((c) => (
            <article
              key={c.key}
              className="ke-lift flex flex-col overflow-hidden rounded-xl border border-ash-200 bg-white shadow-md"
            >
              <div className="relative aspect-square border-b border-ash-200 bg-white">
                <CardImage src={c.image} alt={`${c.brand} ${c.title} home battery`} />
                <span className="absolute left-4 top-4 rounded-pill bg-forest-900/90 px-3 py-1.5 font-display text-[12px] font-bold text-white">
                  {c.brand}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-[19px] font-bold text-navy-700">
                  {c.title}
                </h3>
                {c.capacity && (
                  <div className="mt-1 font-display text-[15px] font-extrabold text-green-600">
                    {c.capacity}
                  </div>
                )}
                {c.price !== null && (
                  <div className="mt-2 font-body text-[14px] text-ash-700">
                    From{" "}
                    <span className="font-display text-[17px] font-extrabold text-navy-700">
                      {AUD.format(c.price)}
                    </span>{" "}
                    after rebates
                  </div>
                )}
                <ul className="mt-4 flex flex-col gap-2.5">
                  {c.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2.5 font-body text-[14px] text-ink"
                    >
                      <Icon
                        name="check"
                        size={15}
                        stroke={3}
                        className="flex-none text-green-500"
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          )))}
        </div>
      </div>
    </section>
  );
}
