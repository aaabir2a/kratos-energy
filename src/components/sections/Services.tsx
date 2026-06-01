"use client";

import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn, scrollToId } from "@/lib/utils";

type Service = {
  icon: string;
  title: string;
  tag: string | null;
  accent: boolean;
  body: string;
  points: string[];
};

const SERVICES: Service[] = [
  {
    icon: "sun",
    title: "Residential Solar",
    tag: "Most Popular",
    accent: true,
    body: "Power your home with clean, reliable solar. Perfect for families looking to slash bills.",
    points: [
      "Systems from 3kW to 15kW",
      "From $5,990 after rebates",
      "Free design & installation",
    ],
  },
  {
    icon: "building",
    title: "Commercial Solar",
    tag: null,
    accent: false,
    body: "Smart energy to power your operations and cut overhead with predictable, lower costs.",
    points: [
      "Systems from 20kW to 500kW+",
      "Flexible PPA & finance options",
      "Energy monitoring included",
    ],
  },
  {
    icon: "zap",
    title: "Utility Scale",
    tag: null,
    accent: false,
    body: "Scalable solar farms engineered for performance — shovel-ready projects for investors.",
    points: [
      "Megawatt-scale projects",
      "Custom engineering & EPC",
      "Professional O&M",
    ],
  },
];

function ServiceCard({ s }: { s: Service }) {
  return (
    <div
      className={cn(
        "ke-lift relative flex flex-col rounded-lg bg-white p-7",
        s.accent
          ? "border-2 border-green-500 shadow-lg"
          : "border border-ash-200 shadow-md",
      )}
    >
      {s.tag && (
        <span className="absolute -top-3 left-[26px] rounded-pill bg-green-500 px-3.5 py-[5px] font-display text-[11px] font-bold uppercase tracking-[0.06em] text-white">
          {s.tag}
        </span>
      )}
      <span className="mb-4 flex h-[52px] w-[52px] items-center justify-center rounded-[14px] bg-green-50 text-green-600">
        <Icon name={s.icon} size={28} />
      </span>
      <h3 className="mb-2 font-display text-[22px] font-bold text-navy-700">
        {s.title}
      </h3>
      <p className="mb-[18px] font-body text-[15px] leading-relaxed text-ash-700">
        {s.body}
      </p>
      <ul className="mb-[22px] flex flex-col gap-2.5">
        {s.points.map((p) => (
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
      <div className="mt-auto">
        <Button
          variant={s.accent ? "primary" : "navy"}
          size="md"
          icon="arrow"
          onClick={() => scrollToId("quote")}
        >
          Get Quote
        </Button>
      </div>
    </div>
  );
}

export function Services() {
  return (
    <section id="services" className="bg-paper py-[84px]">
      <div className="container-ke">
        <div className="mb-12 text-center">
          <Eyebrow center>Complete Solar Solutions</Eyebrow>
          <h2 className="mt-3 font-display text-[clamp(30px,3.6vw,46px)] font-extrabold tracking-[-0.02em] text-navy-700">
            From consultation to switch-on.
          </h2>
          <p className="mx-auto mt-3 max-w-[540px] font-body text-lg text-ash-700">
            One Australian-owned team handles design, install and support —
            kilowatt to megawatt.
          </p>
        </div>
        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <ServiceCard key={s.title} s={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
