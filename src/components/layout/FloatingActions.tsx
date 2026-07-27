"use client";

import { Icon } from "@/components/ui/Icon";
import { PHONE, PHONE_HREF } from "@/lib/nav";

/**
 * Floating "Call us" launcher. Sits above the embedded support chat widget
 * (loaded via /widget.js in SiteLayout), which occupies the bottom-right corner.
 */
export function FloatingActions() {
  return (
    <a
      href={PHONE_HREF}
      className="group fixed bottom-[94px] right-[22px] z-[70] flex items-center gap-2.5"
      aria-label={`Call us on ${PHONE}`}
    >
      <span className="pointer-events-none hidden rounded-pill bg-white px-3.5 py-2 font-display text-[13px] font-bold text-forest-700 shadow-md transition-opacity group-hover:opacity-100 sm:block sm:opacity-0">
        Call us on {PHONE}
      </span>
      <span className="ke-press flex h-[52px] w-[52px] items-center justify-center rounded-full bg-green-500 text-white shadow-green">
        <Icon name="phone" size={24} stroke={2.2} />
      </span>
    </a>
  );
}
