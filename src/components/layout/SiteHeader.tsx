"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { NETBadge } from "./NETBadge";
import { NAV, PRODUCT_CATEGORIES } from "@/lib/nav";
import { cn } from "@/lib/utils";

/** Solid white sticky header: brand + CEC badge + full menu with dropdowns. */
export function SiteHeader({ onMenu }: { onMenu: () => void }) {
  const [open, setOpen] = useState<number | null>(null);
  const [activeCat, setActiveCat] = useState<string>("residential");
  const [shadow, setShadow] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(null);
    setIsLocked(false);
  }

  useEffect(() => {
    const onScroll = () => setShadow(window.scrollY > 6);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Listen to hash changes and initial page load to auto-open menu
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === "#systems") {
        const productsIndex = NAV.findIndex((item) => item.label === "Our Products");
        if (productsIndex !== -1) {
          setOpen(productsIndex);
          setIsLocked(true);
        }
      }
    };

    checkHash();

    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, [pathname]);

  // Handle outside clicks to close the menu
  useEffect(() => {
    if (!isLocked) return;

    const handleOutsideClick = (e: MouseEvent) => {
      const headerElement = document.querySelector("header");
      if (headerElement) {
        const isClickOutside = !headerElement.contains(e.target as Node);
        const clickedLink = (e.target as Element).closest("a");
        const isClickOnLink = clickedLink !== null;
        const isTrigger = clickedLink?.getAttribute("data-nav-trigger") === "true";

        if (isClickOutside || (isClickOnLink && !isTrigger)) {
          setOpen(null);
          setIsLocked(false);
        }
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isLocked]);

  const isActive = (href: string) =>
    href.startsWith("/") && !href.includes("#") && href !== "/"
      ? pathname.startsWith(href)
      : false;

  return (
    <header
      className={cn(
        "sticky top-[38px] z-[55] border-b border-ash-200 bg-white/95 backdrop-blur-md transition-shadow duration-200",
        shadow && "shadow-md",
      )}
    >
      <div className="flex h-[78px] w-full items-center gap-5 px-5 sm:px-8 relative">
        {/* Brand cluster */}
        <Link href="/" className="flex flex-none items-center" aria-label="Kratos Energy home">
          <Logo className="h-[56px] w-auto" priority />
        </Link>
        <div className="hidden h-11 w-px flex-none bg-ash-300 md:block" />
        <div className="hidden flex-none md:block">
          <NETBadge />
        </div>

        {/* Desktop nav + CTA cluster */}
        <div className="ml-auto hidden items-center gap-4 nav:flex">
        <nav className="flex items-stretch h-[78px] gap-0.5">
          {NAV.map((item, i) => {
            const active = isActive(item.href);
            const isProducts = item.label === "Our Products";
            const hasMenu = item.menu || isProducts;
            return (
              <div
                key={item.label}
                className={cn("h-full flex items-center", !isProducts && "relative")}
                onMouseEnter={() => {
                  if (isLocked) return;
                  if (hasMenu) {
                    setOpen(i);
                    if (isProducts) {
                      setActiveCat("residential");
                    }
                  } else {
                    setOpen(null);
                  }
                }}
                onMouseLeave={() => {
                  if (isLocked) return;
                  setOpen(null);
                }}
              >
                <Link
                  href={item.href}
                  data-nav-trigger={hasMenu ? "true" : undefined}
                  onClick={(e) => {
                    if (hasMenu) {
                      e.preventDefault();
                      if (open === i && isLocked) {
                        setOpen(null);
                        setIsLocked(false);
                      } else {
                        setOpen(i);
                        setIsLocked(true);
                        if (isProducts) {
                          setActiveCat("residential");
                        }
                      }
                    }
                  }}
                  className={cn(
                    "inline-flex items-center gap-[4px] whitespace-nowrap rounded-sm border-b-2 px-[9px] py-2 font-display text-[13.5px] font-semibold transition-colors",
                    active
                      ? "border-green-500 text-green-600"
                      : "border-transparent text-ash-700 hover:text-green-600",
                  )}
                >
                  {item.label}
                  {hasMenu && (
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

                {isProducts && (
                  <div
                    className={cn(
                      "absolute left-5 right-5 sm:left-8 sm:right-8 top-full pt-[10px] transition-all duration-200 ease-soft",
                      open === i
                        ? "visible translate-y-0 opacity-100"
                        : "pointer-events-none invisible translate-y-[6px] opacity-0",
                    )}
                  >
                    <div className="mx-auto w-full rounded-md border border-ash-200 bg-white p-6 shadow-lg">
                      <div className="grid grid-cols-[280px_1fr] gap-8">
                        {/* Left column - Categories */}
                        <div className="flex flex-col gap-1">
                          <span className="font-body text-[11px] font-bold uppercase tracking-[0.08em] text-ash-400 mb-2 px-3">
                            Categories
                          </span>
                          {PRODUCT_CATEGORIES.map((cat) => {
                            const isCatActive = activeCat === cat.id;
                            return (
                              <button
                                key={cat.id}
                                onClick={(e) => {
                                  e.preventDefault();
                                  setActiveCat(cat.id);
                                }}
                                className={cn(
                                  "flex w-full items-center gap-3.5 rounded-sm px-4 py-3 text-left font-display text-[14.5px] font-bold transition-all duration-250 ease-soft",
                                  isCatActive
                                    ? "bg-green-500 text-white shadow-md shadow-green/20"
                                    : "text-ash-700 hover:bg-green-50 hover:text-forest-700"
                                )}
                              >
                                <Icon
                                  name={cat.icon}
                                  size={18}
                                  stroke={2.2}
                                  className={cn(
                                    "transition-colors",
                                    isCatActive ? "text-white" : "text-green-500"
                                  )}
                                />
                                <span className="flex-1">{cat.label}</span>
                                <Icon
                                  name="chevron"
                                  size={14}
                                  stroke={2.5}
                                  className={cn(
                                    "-rotate-90 opacity-60 transition-all duration-200",
                                    isCatActive ? "text-white translate-x-0.5" : "text-ash-400 group-hover:translate-x-0.5"
                                  )}
                                />
                              </button>
                            );
                          })}
                        </div>

                        {/* Right column - Subcategories & Detail */}
                        <div className="border-l border-ash-200 pl-8">
                          {PRODUCT_CATEGORIES.map((cat) => {
                            if (activeCat !== cat.id) return null;
                            return (
                              <div key={cat.id} className="animate-fade-up">
                                <div className="mb-6">
                                  <h3 className="font-display text-[20px] font-extrabold text-navy-800">
                                    {cat.label}
                                  </h3>
                                  <p className="mt-1 max-w-[580px] font-body text-[13.5px] leading-relaxed text-ash-500">
                                    {cat.description}
                                  </p>
                                </div>

                                {cat.subcategories ? (
                                  <div className="grid grid-cols-2 gap-4">
                                    {cat.subcategories.map((sub) => (
                                      <Link
                                        key={sub.label}
                                        href={sub.href}
                                        onClick={() => setOpen(null)}
                                        className="group flex flex-col justify-between rounded-sm border border-ash-200 bg-white p-4 transition-all duration-200 hover:border-green-500 hover:shadow-md"
                                      >
                                        <div>
                                          <div className="flex items-center justify-between font-display text-[14.5px] font-bold text-navy-800 group-hover:text-green-600 transition-colors">
                                            {sub.label}
                                            <Icon
                                              name="arrow"
                                              size={14}
                                              stroke={2.5}
                                              className="text-ash-300 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-green-600"
                                            />
                                          </div>
                                          <p className="mt-1 font-body text-[12.5px] leading-relaxed text-ash-500">
                                            {sub.description}
                                          </p>
                                        </div>
                                      </Link>
                                    ))}
                                  </div>
                                ) : (
                                  // Large Scale custom layout
                                  <div className="flex flex-col gap-4">
                                    <div className="rounded-sm border border-ash-200 bg-white p-4">
                                      <h4 className="font-display text-[15px] font-bold text-navy-800">
                                        {cat.customContent?.title}
                                      </h4>
                                      <p className="mt-1.5 font-body text-[13px] leading-relaxed text-ash-700">
                                        {cat.customContent?.text}
                                      </p>
                                      <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2">
                                        {cat.customContent?.points.map((pt, index) => (
                                          <li key={index} className="flex items-start gap-2 text-[12px] text-ash-700">
                                            <Icon name="check" size={13} stroke={3} className="mt-0.5 text-green-500 flex-none" />
                                            <span>{pt}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-3">
                                      {cat.href && (
                                        <Link
                                          href={cat.href}
                                          onClick={() => setOpen(null)}
                                          className="inline-flex items-center gap-2 rounded-pill bg-green-500 px-4 py-2 font-display text-[12.5px] font-bold text-white shadow-green transition-colors duration-200 hover:bg-green-600"
                                        >
                                          View Large-Scale Systems
                                          <Icon name="arrow" size={13} stroke={2.5} className="text-white" />
                                        </Link>
                                      )}
                                      <Link
                                        href={cat.customContent?.ctaHref || "/contact"}
                                        onClick={() => setOpen(null)}
                                        className="inline-flex items-center gap-2 rounded-pill bg-forest-900 px-4 py-2 font-display text-[12.5px] font-bold text-white transition-colors duration-200 hover:bg-forest-800"
                                      >
                                        {cat.customContent?.ctaText}
                                        <Icon name="arrow" size={13} stroke={2.5} className="text-green-400" />
                                      </Link>
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      
                      {/* Footer Info Bar */}
                      <div className="-mx-6 -mb-6 mt-6 flex items-center justify-between rounded-b-md border-t border-ash-200 bg-paper px-6 py-3">
                        <span className="font-body text-[12.5px] text-ash-500">
                          Need guidance on solar sizing?
                        </span>
                        <Link
                          href="/savings-calculator"
                          onClick={() => setOpen(null)}
                          className="inline-flex items-center gap-1 font-display text-[12.5px] font-bold text-green-600 hover:text-green-700 transition-colors"
                        >
                          Try our Savings Calculator
                          <Icon name="arrow" size={13} stroke={2.5} className="mt-px" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

          {/* hairline divider before the CTA */}
          <span className="h-7 w-px flex-none bg-ash-200" aria-hidden />

          {/* Desktop CTA */}
          <Link
            href="/build"
            className="ke-press group flex flex-none items-center gap-2 whitespace-nowrap rounded-pill bg-forest-900 px-[20px] py-[11px] font-display text-[13.5px] font-bold text-white transition-colors duration-200 hover:bg-forest-800"
          >
            Design My Solar Plan
            <Icon
              name="arrow"
              size={15}
              stroke={2.5}
              className="text-green-400 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none"
            />
          </Link>
        </div>

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
