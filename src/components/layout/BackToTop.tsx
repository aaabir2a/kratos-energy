"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";

/**
 * Fixed "back to top" button, bottom-left. Hidden until the user scrolls past
 * ~600px, then fades in. Smooth-scrolls to the top on click.
 */
export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
        })
      }
      aria-label="Back to top"
      className={`ke-press fixed bottom-[22px] left-[22px] z-[70] flex h-[52px] w-[52px] items-center justify-center rounded-full border border-ash-200 bg-white text-forest-700 shadow-lg transition-all duration-300 hover:bg-green-50 hover:text-green-600 ${
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <Icon name="chevron" size={24} stroke={2.6} className="rotate-180" />
    </button>
  );
}
