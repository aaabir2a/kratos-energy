import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { PHONE, EMAIL } from "@/lib/nav";
import { Socials } from "./Socials";

/**
 * Sitewide link block — it renders on every page, so these links carry most of
 * the internal link equity. Every entry points at a real route (not a homepage
 * anchor) with keyword-bearing anchor text.
 */
const COLUMNS: { heading: string; items: { label: string; href: string }[] }[] = [
  {
    heading: "Solar Solutions",
    items: [
      { label: "Residential Solar", href: "/residential-solar" },
      { label: "Commercial Solar", href: "/commercial-solar" },
      { label: "Battery Storage", href: "/products/battery" },
      { label: "EV Charging", href: "/products/ev-charging" },
      { label: "Build Your System", href: "/build" },
    ],
  },
  {
    heading: "Calculators",
    items: [
      { label: "All Calculators", href: "/calculators" },
      { label: "Solar Rebate Calculator", href: "/calculators/solar-rebate" },
      { label: "Battery Rebate Calculator", href: "/calculators/battery-rebate" },
      { label: "Savings & Payback", href: "/savings-calculator" },
      { label: "Feed-in Tariff", href: "/calculators/feed-in-tariff" },
      { label: "Solar Output", href: "/calculators/solar-output" },
    ],
  },
  {
    heading: "Company",
    items: [
      { label: "Blog & Guides", href: "/blog" },
      { label: "News & Updates", href: "/news" },
      { label: "Our Projects", href: "/projects" },
      { label: "Finance & $0 Upfront", href: "/finance" },
      { label: "Government Rebates", href: "/rebates" },
      { label: "Solar by State", href: "/solar" },
    ],
  },
  {
    heading: "Support",
    items: [
      { label: "Get a Quote", href: "/get-a-quote" },
      { label: "Warranty & Support", href: "/support" },
      { label: "Contact Us", href: "/contact" },
      { label: "FAQs", href: "/support" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-[#0a2e20] text-[#bcd4c6]">
      <div className="container-ke py-14 pb-7">
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
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

            <address className="mt-6 flex max-w-[280px] items-start gap-2.5 not-italic font-body text-sm leading-relaxed">
              <Icon name="mapPin" size={17} stroke={2.1} className="mt-0.5 flex-none text-green-400" />
              <span>
                SmartSpace | Suite 66, 1st Floor, Enterprise 1
                <br />
                Innovation Campus, Squires Way
                <br />
                North Wollongong NSW 2500 Australia
              </span>
            </address>

            <div className="mt-6">
              <div className="mb-2.5 font-display text-[12.5px] font-bold uppercase tracking-[0.06em] text-[#8aa896]">
                Follow us
              </div>
              <Socials variant="footer" />
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
            © 2026 Kratos Energy. All rights reserved. Clean Energy Council Approved
          </span>
          <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <Link
              href="/privacy"
              className="transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>
            <span aria-hidden>·</span>
            <span>
              {PHONE} · {EMAIL}
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}
