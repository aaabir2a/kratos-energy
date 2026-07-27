"use client";

/**
 * Rotating rebate strip for the PromoBar. Cycles the regions Kratos serves
 * (NSW, VIC, ACT), naming each region's actual government scheme from the
 * rebate engine — never a federal figure mislabeled as a state rebate. The
 * whole strip links to /rebates, where the exact amounts are calculated.
 */
import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { STATE_SCHEMES, type StateCode } from "@/lib/rebates";

const ROTATE_MS = 4500;

/** Regions to feature + their compact display label. */
const TICKER: { code: StateCode; region: string }[] = [
  { code: "NSW", region: "NSW" },
  { code: "VIC", region: "Victoria" },
  { code: "ACT", region: "ACT" },
];

export function RebateTicker() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce || paused || TICKER.length < 2) return;
    const t = setInterval(() => setI((p) => (p + 1) % TICKER.length), ROTATE_MS);
    return () => clearInterval(t);
  }, [paused]);

  const item = TICKER[i];
  const scheme = STATE_SCHEMES[item.code];

  return (
    <Link
      href="/rebates"
      aria-label="Government solar and battery rebates by state"
      className="group flex min-w-0 items-center gap-2 font-semibold"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Icon
        name="zap"
        size={13}
        fill="#f4ce47"
        stroke={0}
        className="flex-none text-gold-400"
      />
      {/* Keyed so the animation replays on each change. */}
      <span key={i} className="animate-ticker flex min-w-0 items-center gap-1.5">
        <b className="flex-none text-gold-400">{item.region} rebates</b>
        <span className="truncate text-[#eaf3e6]/90">{scheme.short}</span>
      </span>
      <span className="ml-0.5 hidden flex-none items-center gap-0.5 text-gold-400/90 underline-offset-2 group-hover:underline lg:inline-flex">
        Check eligibility
        <Icon name="arrow" size={12} stroke={2.4} />
      </span>
    </Link>
  );
}
