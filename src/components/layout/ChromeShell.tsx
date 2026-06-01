"use client";

import { useEffect, useState } from "react";
import { SiteHeader } from "./SiteHeader";
import { MobileMenu } from "./MobileMenu";

/**
 * Client wrapper that owns the mobile-menu open state and wires the
 * sticky header to the overlay. Keeps `page.tsx` a server component.
 */
export function ChromeShell() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <SiteHeader onMenu={() => setMenuOpen(true)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
