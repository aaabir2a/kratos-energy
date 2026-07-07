"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { scrollToId } from "@/lib/utils";
import { useContentStore } from "@/lib/store";
import type { Package } from "@/lib/api";

const AUD = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  maximumFractionDigits: 0,
});

type Service = {
  icon: string;
  title: string;
  tag: string | null;
  body: string;
  points: string[];
};

const FEATURED: Service = {
  icon: "sun",
  title: "Residential Solar",
  tag: "Most Popular",
  body: "Power your home with clean, reliable solar. Perfect for families looking to slash bills.",
  points: [
    "Systems from 3kW to 15kW",
    "From $5,990 after rebates",
    "Free design & installation",
  ],
};

const SECONDARY: Service[] = [
  {
    icon: "building",
    title: "Commercial Solar",
    tag: null,
    body: "Smart energy to power your operations and cut overhead with predictable, lower costs.",
    points: [
      "Systems from 20kW to 500kW+",
      "Flexible payment plans & finance options",
      "Energy monitoring included",
    ],
  },
  {
    icon: "zap",
    title: "Utility Scale",
    tag: null,
    body: "Scalable solar farms engineered for performance: shovel-ready projects for investors.",
    points: [
      "Megawatt-scale projects",
      "Custom engineering & procurement",
      "Professional operations & maintenance",
    ],
  },
];

function PointList({
  points,
  className,
}: {
  points: string[];
  className?: string;
}) {
  return (
    <ul className={className}>
      {points.map((p) => (
        <li
          key={p}
          className="flex items-center gap-2.5 font-body text-[14.5px] text-ink"
        >
          <Icon
            name="check"
            size={16}
            stroke={3}
            className="flex-none text-green-500"
          />
          {p}
        </li>
      ))}
    </ul>
  );
}

/** Large primary panel — the residential offer carries the most weight. */
function FeaturePanel({ s }: { s: Service }) {
  return (
    <div className="ke-lift relative flex flex-col rounded-xl border-2 border-green-500 bg-white p-8 shadow-lg sm:p-10">
      {s.tag && (
        <span className="absolute -top-3 left-8 rounded-pill bg-green-500 px-4 py-[5px] font-display text-[11px] font-bold uppercase tracking-[0.06em] text-white">
          {s.tag}
        </span>
      )}
      <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-[18px] bg-green-50 text-green-600">
        <Icon name={s.icon} size={36} />
      </span>
      <h3 className="mb-2.5 font-display text-[clamp(26px,2.4vw,32px)] font-extrabold tracking-[-0.01em] text-navy-700">
        {s.title}
      </h3>
      <p className="mb-6 max-w-[420px] font-body text-[16.5px] leading-relaxed text-ash-700">
        {s.body}
      </p>
      <PointList points={s.points} className="mb-8 flex flex-col gap-3" />
      <div className="mt-auto">
        <Button
          variant="primary"
          size="lg"
          icon="arrow"
          onClick={() => scrollToId("quote")}
        >
          Get a residential quote
        </Button>
      </div>
    </div>
  );
}

/** Compact secondary card — commercial & utility, denser and quieter. */
function SecondaryCard({ s }: { s: Service }) {
  return (
    <div className="ke-lift flex flex-1 flex-col rounded-lg border border-ash-200 bg-white p-6 shadow-md">
      <div className="mb-3.5 flex items-center gap-3.5">
        <span className="flex h-11 w-11 flex-none items-center justify-center rounded-[12px] bg-green-50 text-green-600">
          <Icon name={s.icon} size={24} />
        </span>
        <h3 className="font-display text-[19px] font-bold text-navy-700">
          {s.title}
        </h3>
      </div>
      <p className="mb-4 font-body text-[14.5px] leading-relaxed text-ash-700">
        {s.body}
      </p>
      <PointList points={s.points} className="mb-5 flex flex-col gap-2" />
      <button
        onClick={() => scrollToId("quote")}
        className="mt-auto inline-flex items-center gap-1.5 self-start font-display text-[14px] font-bold text-forest-700 underline-offset-4 hover:underline"
      >
        Get a quote <Icon name="arrow" size={15} stroke={2.4} />
      </button>
    </div>
  );
}

/** CRM-managed system package. Headline price = displayPrice. */
function PackageCard({ p }: { p: Package }) {
  const remote = p.imageUrl && /^https?:\/\//.test(p.imageUrl);
  return (
    <div className="ke-lift flex flex-col overflow-hidden rounded-xl border border-ash-200 bg-white shadow-md">
      <div className="relative aspect-[16/10] border-b border-ash-200 bg-green-50">
        {p.imageUrl ? (
          remote ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={p.imageUrl}
              alt={p.name}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <Image
              src={p.imageUrl}
              alt={p.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          )
        ) : (
          <span className="flex h-full items-center justify-center text-green-600">
            <Icon name="sun" size={44} />
          </span>
        )}
        {p.power && (
          <span className="absolute left-4 top-4 rounded-pill bg-forest-900/90 px-3 py-1.5 font-display text-[12px] font-bold text-white">
            {p.power}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-[19px] font-bold text-navy-700">
          {p.name}
        </h3>
        {p.description && (
          <p className="mt-2 font-body text-[14.5px] leading-relaxed text-ash-700">
            {p.description}
          </p>
        )}
        {p.displayPrice > 0 && (
          <div className="mt-4 font-body text-[14px] text-ash-700">
            From{" "}
            <span className="font-display text-[22px] font-extrabold text-green-600">
              {AUD.format(p.displayPrice)}
            </span>
          </div>
        )}
        <button
          onClick={() => scrollToId("quote")}
          className="mt-auto inline-flex items-center gap-1.5 self-start pt-5 font-display text-[14px] font-bold text-forest-700 underline-offset-4 hover:underline"
        >
          Get a quote <Icon name="arrow" size={15} stroke={2.4} />
        </button>
      </div>
    </div>
  );
}

export function Services() {
  const { status, data } = useContentStore((s) => s.packages);
  const loadPackages = useContentStore((s) => s.loadPackages);

  useEffect(() => {
    loadPackages();
  }, [loadPackages]);

  const showPackages = status === "ready" && data.length > 0;

  return (
    <section id="services" className="bg-paper py-[84px]">
      <div className="container-ke">
        <div className="mb-12 text-center">
          <h2 className="font-display text-[clamp(30px,3.6vw,46px)] font-extrabold tracking-[-0.02em] text-navy-700">
            {showPackages ? "Solar systems built for your home." : "From consultation to switch-on."}
          </h2>
          <p className="mx-auto mt-3 max-w-[540px] font-body text-lg text-ash-700">
            {showPackages
              ? "Fully-installed packages, priced after rebates. Every system designed, installed and supported by one Australian-owned team."
              : "One Australian-owned team handles design, install and support — kilowatt to megawatt."}
          </p>
        </div>

        {showPackages ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((p) => (
              <PackageCard key={p.id} p={p} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-[1.5fr_1fr]">
            <FeaturePanel s={FEATURED} />
            <div className="flex flex-col gap-6">
              {SECONDARY.map((s) => (
                <SecondaryCard key={s.title} s={s} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
