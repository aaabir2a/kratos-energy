import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { PHONE, EMAIL } from "@/lib/nav";

const COLUMNS: { heading: string; items: { label: string; href: string }[] }[] = [
  {
    heading: "Solar Solutions",
    items: [
      { label: "Residential Solar", href: "/#systems" },
      { label: "Commercial Solar", href: "/systems/50kw" },
      { label: "Battery Storage", href: "/battery-storage" },
      { label: "EV Charging", href: "/ev-charging" },
      { label: "Build Your System", href: "/build" },
    ],
  },
  {
    heading: "Company",
    items: [
      { label: "Blog & Guides", href: "/blog" },
      { label: "Our Projects", href: "/#reviews" },
      { label: "Finance & $0 Upfront", href: "/finance" },
      { label: "Refer a Friend", href: "/refer" },
      { label: "Government Rebates", href: "/rebates" },
    ],
  },
  {
    heading: "Support",
    items: [
      { label: "Get a Quote", href: "/get-a-quote" },
      { label: "Savings Calculator", href: "/savings-calculator" },
      { label: "Warranty & Support", href: "/support" },
      { label: "Contact Us", href: "/get-a-quote" },
      { label: "FAQs", href: "/support" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-[#0a2e20] text-[#bcd4c6]">
      <div className="container-ke py-14 pb-7">
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="mb-4 inline-block rounded-md bg-white px-3.5 py-2.5">
              <Logo className="h-[38px] w-auto" />
            </div>
            <p className="mb-4 max-w-[280px] font-body text-sm leading-relaxed">
              100% Australian-owned solar — from kilowatt rooftops to megawatt
              farms. iAccelerate, University of Wollongong, NSW.
            </p>
            <div className="flex gap-2.5">
              {["25-Year Warranty", "CEC Approved"].map((t) => (
                <span
                  key={t}
                  className="rounded-pill border border-gold-400/35 px-[11px] py-[5px] font-display text-[11.5px] font-bold text-gold-400"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <div className="mb-3.5 font-display text-sm font-bold tracking-[0.04em] text-white">
                {col.heading}
              </div>
              <ul className="flex flex-col gap-2.5">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="font-body text-sm text-[#bcd4c6] transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap justify-between gap-3 border-t border-white/10 pt-[22px] font-body text-[12.5px] text-[#8aa896]">
          <span>
            © 2025 Kratos Energy. All rights reserved. · ABN 12 345 678 901 ·
            Clean Energy Council Approved
          </span>
          <span>
            {PHONE} · {EMAIL}
          </span>
        </div>
      </div>
    </footer>
  );
}
