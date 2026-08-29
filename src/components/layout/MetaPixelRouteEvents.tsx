"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

declare global {
  interface Window {
    fbq?: ((...args: unknown[]) => void) & { queue?: unknown[] };
  }
}

/**
 * Fires a PageView on client-side navigation. Without this the pixel only ever
 * records the entry page, because App Router swaps routes without a document
 * load and the base snippet in <MetaPixel /> never re-runs.
 *
 * The initial load is skipped — the base snippet already tracked it, and firing
 * here too would double-count every landing.
 *
 * No pixel-ID check needed: `window.fbq` is undefined when the pixel is
 * disabled, still loading, or blocked, and the optional call no-ops.
 *
 * Reads searchParams so `?utm_source=…` variants register as distinct views;
 * that requires a <Suspense> boundary at the mount site, or every static route
 * de-opts to client rendering.
 */
export function MetaPixelRouteEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isInitialLoad = useRef(true);

  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }

    window.fbq?.("track", "PageView");
  }, [pathname, searchParams]);

  return null;
}
