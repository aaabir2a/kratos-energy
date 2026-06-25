"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { NAV, PHONE, PHONE_HREF } from "@/lib/nav";
import { cn } from "@/lib/utils";

/** Full-screen mobile navigation overlay with expandable submenus. */
export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[80] flex flex-col overflow-y-auto bg-forest-900 p-5 transition-transform duration-[400ms] ease-soft sm:p-6",
        open ? "translate-y-0" : "-translate-y-full",
      )}
    >
      <div className="flex items-center">
        <Logo className="h-[50px] w-auto" light />
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="ml-auto flex h-[46px] w-[46px] items-center justify-center rounded-[12px] border border-white/25 bg-white/10 text-white"
        >
          <Icon name="x" size={24} />
        </button>
      </div>

      <nav className="mt-6 flex flex-col">
        {NAV.map((item, i) => {
          if (!item.menu) {
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                className="border-b border-white/10 py-3.5 text-left font-display text-[22px] font-bold text-white"
              >
                {item.label}
              </Link>
            );
          }

          const expanded = openIdx === i;
          return (
            <div key={item.label} className="border-b border-white/10">
              <button
                onClick={() => setOpenIdx(expanded ? null : i)}
                aria-expanded={expanded}
                className="flex w-full items-center justify-between py-3.5 text-left font-display text-[22px] font-bold text-white"
              >
                {item.label}
                <Icon
                  name="chevron"
                  size={22}
                  className={cn("opacity-70 transition-transform", expanded && "rotate-180")}
                />
              </button>
              <div
                className={cn(
                  "grid transition-all duration-300 ease-soft",
                  expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                )}
              >
                <div className="overflow-hidden">
                  <div className="flex flex-col pb-3 pl-1">
                    {item.menu.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        onClick={onClose}
                        className="flex items-center gap-2.5 py-2.5 font-body text-[16.5px] font-semibold text-[#cfe0c6]"
                      >
                        <span className="h-1.5 w-1.5 flex-none rounded-full bg-green-400" />
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </nav>

      <div className="mt-7 flex flex-col gap-4">
        <a
          href={PHONE_HREF}
          className="flex items-center gap-[11px] font-display text-[22px] font-bold text-white"
        >
          <Icon name="phone" size={22} className="text-green-400" /> {PHONE}
        </a>
        <Link
          href="/get-a-quote"
          onClick={onClose}
          className="ke-press inline-flex items-center justify-center gap-2.5 rounded-pill bg-green-500 px-[34px] py-[17px] font-display text-[17px] font-bold text-white shadow-green hover:bg-green-600"
        >
          Design My Solar Plan <Icon name="arrow" size={21} stroke={2.4} />
        </Link>
      </div>
    </div>
  );
}
