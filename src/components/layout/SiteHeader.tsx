"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { CECBadge } from "./CECBadge";
import { NAV } from "@/lib/nav";
import { cn } from "@/lib/utils";

/** Solid white sticky header: brand + CEC badge + full menu with dropdowns. */
export function SiteHeader({ onMenu }: { onMenu: () => void }) {
  const [open, setOpen] = useState<number | null>(null);
  const [shadow, setShadow] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setShadow(window.scrollY > 6);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href.startsWith("/") && !href.includes("#") && href !== "/"
      ? pathname.startsWith(href)
      : false;

  return (
    <header
      className={cn(
        "sticky top-0 z-[55] border-b border-ash-200 bg-white/95 backdrop-blur-md transition-shadow duration-200",
        shadow && "shadow-md",
      )}
    >
      <div className="container-ke flex h-[78px] items-center gap-[22px]">
        {/* Brand cluster */}
        <Link href="/" className="flex flex-none items-center" aria-label="Kratos Energy home">
          <Logo className="h-[46px] w-auto" priority />
        </Link>
        <div className="hidden h-11 w-px flex-none bg-ash-300 md:block" />
        <div className="hidden flex-none md:block">
          <CECBadge />
        </div>

        {/* Desktop nav */}
        <nav className="ml-auto hidden items-center gap-0.5 nav:flex">
          {NAV.map((item, i) => {
            const active = isActive(item.href);
            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpen(item.menu ? i : null)}
                onMouseLeave={() => setOpen(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "inline-flex items-center gap-[5px] whitespace-nowrap rounded-sm border-b-2 px-[9px] py-2 font-display text-[14px] font-semibold transition-colors",
                    active
                      ? "border-green-500 text-green-600"
                      : "border-transparent text-ash-700 hover:text-green-600",
                  )}
                >
                  {item.label}
                  {item.menu && (
                    <Icon
                      name="chevron"
                      size={11}
                      stroke={2.4}
                      className={cn(
                        "mt-px opacity-65 transition-transform",
                        open === i && "rotate-180",
                      )}
                    />
                  )}
                </Link>

                {item.menu && (
                  <div
                    className={cn(
                      "absolute left-0 top-full pt-[10px] transition-all duration-200 ease-soft",
                      open === i
                        ? "visible translate-y-0 opacity-100"
                        : "pointer-events-none invisible translate-y-[6px] opacity-0",
                    )}
                  >
                    <div className="min-w-[230px] rounded-md border border-ash-200 bg-white p-2 shadow-lg">
                      {item.menu.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className="flex w-full items-center gap-2.5 rounded-sm px-3 py-2.5 text-left font-body text-[14.5px] font-semibold text-ash-700 transition-colors hover:bg-green-50 hover:text-forest-700"
                        >
                          <span className="h-1.5 w-1.5 flex-none rounded-full bg-green-500" />
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Mobile trigger */}
        <button
          onClick={onMenu}
          aria-label="Open menu"
          className="ml-auto flex h-[46px] w-[46px] items-center justify-center rounded-[12px] border border-green-200 bg-green-50 text-forest-700 nav:hidden"
        >
          <Icon name="menu" size={24} />
        </button>
      </div>
    </header>
  );
}
