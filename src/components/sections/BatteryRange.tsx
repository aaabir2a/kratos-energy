import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { BatteryGrid } from "./BatteryGrid";

export function BatteryRange() {
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
              href="/products/battery"
              className="mt-3 inline-flex items-center gap-2 font-display text-[15px] font-bold text-forest-700 underline-offset-4 hover:underline"
            >
              Explore battery storage
              <Icon name="arrow" size={16} stroke={2.4} />
            </Link>
          </div>
        </div>

        {/* Brand range — CRM products (category=Battery) with static fallback */}
        <BatteryGrid className="mt-10" />
      </div>
    </section>
  );
}
