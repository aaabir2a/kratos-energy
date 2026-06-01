"use client";

import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { NAV, PHONE, PHONE_HREF } from "@/lib/nav";
import { cn, scrollToId } from "@/lib/utils";

/** Full-screen mobile navigation overlay. */
export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const go = (id: string) => {
    scrollToId(id);
    onClose();
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-[80] flex flex-col overflow-y-auto bg-forest-900 p-5 transition-transform duration-[400ms] ease-soft sm:p-6",
        open ? "translate-y-0" : "-translate-y-full",
      )}
    >
      <div className="flex items-center">
        <Logo className="h-[42px] w-auto" light />
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="ml-auto flex h-[46px] w-[46px] items-center justify-center rounded-[12px] border border-white/25 bg-white/10 text-white"
        >
          <Icon name="x" size={24} />
        </button>
      </div>

      <nav className="mt-6 flex flex-col">
        {NAV.map((item) => (
          <button
            key={item.label}
            onClick={() => go(item.id)}
            className="border-b border-white/10 py-3.5 text-left font-display text-[23px] font-bold text-white"
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-7 flex flex-col gap-4">
        <a
          href={PHONE_HREF}
          className="flex items-center gap-[11px] font-display text-[22px] font-bold text-white"
        >
          <Icon name="phone" size={22} className="text-green-400" /> {PHONE}
        </a>
        <Button
          variant="primary"
          size="lg"
          icon="arrow"
          fullWidth
          onClick={() => go("quote")}
        >
          Get a Free Quote
        </Button>
      </div>
    </div>
  );
}
