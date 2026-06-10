import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { BATTERIES } from "@/lib/batteries";

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
          {BATTERIES.map((b) => (
            <article
              key={b.brand}
              className="ke-lift flex flex-col overflow-hidden rounded-xl border border-ash-200 bg-white shadow-md"
            >
              <div className="relative aspect-square border-b border-ash-200 bg-white">
                <Image
                  src={b.image}
                  alt={`${b.brand} ${b.model} home battery`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-contain p-6"
                />
                <span className="absolute left-4 top-4 rounded-pill bg-forest-900/90 px-3 py-1.5 font-display text-[12px] font-bold text-white">
                  {b.brand}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-[19px] font-bold text-navy-700">
                  {b.model}
                </h3>
                <div className="mt-1 font-display text-[15px] font-extrabold text-green-600">
                  {b.capacity}
                </div>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {b.features.map((f) => (
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
          ))}
        </div>
      </div>
    </section>
  );
}
