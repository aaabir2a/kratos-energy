"use client";

import { useEffect, useState, useRef } from "react";
import Script from "next/script";
import { Icon } from "@/components/ui/Icon";

// Brand sun glyph (gold), matching <Icon name="sun" className="text-gold-400" />.
const SUN_SVG =
  '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f4ce47" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';

// Calm attention cue: a slow green halo that breathes outward, drawing the
// eye without the bouncy motion the brand explicitly avoids. Pauses on hover
// and on the open panel; fully disabled under reduced-motion.
const LAUNCHER_CSS = `
@keyframes ke-rc-halo {
  0%   { box-shadow: 0 6px 24px rgba(0,0,0,0.22), 0 0 0 0 rgba(108,174,52,0.55); }
  70%  { box-shadow: 0 6px 24px rgba(0,0,0,0.22), 0 0 0 14px rgba(108,174,52,0); }
  100% { box-shadow: 0 6px 24px rgba(0,0,0,0.22), 0 0 0 0 rgba(108,174,52,0); }
}
.rc-launcher {
  animation: ke-rc-halo 2.6s cubic-bezier(0.22, 1, 0.36, 1) infinite;
}
.rc-launcher:hover { animation-play-state: paused; }
.rc-launcher.rc-hidden { animation: none; }
@media (prefers-reduced-motion: reduce) {
  .rc-launcher { animation: none; }
}
/* Mobile: the widget panel (.rc-panel) is fixed at height:560px/max-height:
   calc(100vh-130px), which ignores the on-screen keyboard. On phones make it a
   full-screen sheet; visualViewport JS then pins it to the visible area so the
   composer sits right above the keyboard with the messages list filling the
   rest (no empty gap). */
@media (max-width: 640px) {
  .rc-panel {
    top: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    left: 0 !important;
    width: 100% !important;
    max-width: 100% !important;
    height: 100dvh !important;
    max-height: 100dvh !important;
    border-radius: 0 !important;
  }
}
`;

let vvBound = false;

/**
 * On mobile, size the panel to the *visible* viewport. When the keyboard opens
 * `visualViewport.height` shrinks; we set the panel height to it and pin the
 * top so the composer ends up directly above the keyboard, the flex messages
 * list fills the space, and nothing sits behind the keyboard.
 */
function syncChatViewport() {
  const root = document.querySelector("[data-ragchat]")?.shadowRoot;
  const panel = root?.querySelector(".rc-panel") as HTMLElement | null;
  if (!panel) return;

  const vv = window.visualViewport;
  const isMobile = window.innerWidth <= 640;

  if (isMobile && vv) {
    panel.style.setProperty("height", `${Math.round(vv.height)}px`, "important");
    panel.style.setProperty("max-height", `${Math.round(vv.height)}px`, "important");
    panel.style.setProperty("top", `${Math.round(vv.offsetTop)}px`, "important");
    panel.style.setProperty("bottom", "auto", "important");
  } else {
    panel.style.removeProperty("height");
    panel.style.removeProperty("max-height");
    panel.style.removeProperty("top");
    panel.style.removeProperty("bottom");
  }
}

/** Inject the brand sun icon + attention halo into the widget's shadow DOM. */
function setupLauncher() {
  const start = Date.now();
  const tick = () => {
    const root = document.querySelector("[data-ragchat]")?.shadowRoot;
    const launcher = root?.querySelector(".rc-launcher");
    if (root && launcher) {
      launcher.innerHTML = SUN_SVG;

      if (!root.getElementById("ke-rc-style")) {
        const style = document.createElement("style");
        style.id = "ke-rc-style";
        style.textContent = LAUNCHER_CSS;
        root.appendChild(style);
      }

      // Keep the panel matched to the visible viewport as the keyboard opens.
      syncChatViewport();
      if (!vvBound && window.visualViewport) {
        vvBound = true;
        window.visualViewport.addEventListener("resize", syncChatViewport);
        window.visualViewport.addEventListener("scroll", syncChatViewport);
        window.addEventListener("orientationchange", syncChatViewport);
      }
      return;
    }
    if (Date.now() - start < 8000) requestAnimationFrame(tick);
  };
  tick();
}

/**
 * Embedded support chat widget. Loads the shadow-DOM bubble (bottom-right),
 * themes it to brand green, swaps the launcher emoji for the brand sun, and
 * adds a calm halo so visitors notice it.
 */
export function ChatWidget() {
  const [showBubble, setShowBubble] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Show initially after loaded
  useEffect(() => {
    if (dismissed) return;
    const t = setTimeout(() => setShowBubble(true), 1500);
    return () => clearTimeout(t);
  }, [dismissed]);

  // Hide on scroll, reschedule after interval
  useEffect(() => {
    if (dismissed) return;

    const handleScroll = () => {
      setShowBubble(false);

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      // Pop up again after 15 seconds of no scrolling
      scrollTimeout.current = setTimeout(() => {
        if (!dismissed) setShowBubble(true);
      }, 3000);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, [dismissed]);

  return (
    <>
      <style>{`
        @keyframes ke-breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-breathe {
          animation: ke-breathe 2.5s ease-in-out infinite;
        }
      `}</style>
      <Script
        src="https://api.ambrosianuk.com/widget.js"
        strategy="afterInteractive"
        data-api-url="https://api.ambrosianuk.com"
        data-api-key="sk__qDL1B2opmjj3vZEhJSQzor2XRTuo2-yFluwhH76cm4"
        data-chatbot-id="bb7f52662f124ba5b188978d8549c165"
        data-primary-color="#6cae34"
        data-title="Support"
        data-position="bottom-right"
        onReady={setupLauncher}
        onLoad={setupLauncher}
      />

      {showBubble && !dismissed && (
        <div className="pointer-events-none fixed bottom-[22px] right-[86px] z-[9999] animate-in slide-in-from-right-4 fade-in duration-500">
          <div className="animate-breathe origin-right pointer-events-auto relative flex w-[260px] items-center justify-between rounded-[24px] bg-white py-3 pl-4 pr-3 shadow-[0_8px_30px_rgb(0,0,0,0.12)] ring-1 ring-ash-200">

            <div
              className="flex cursor-pointer items-center gap-3 pr-2 flex-1 group"
              onClick={() => {
                const root = document.querySelector("[data-ragchat]")?.shadowRoot;
                const launcher = root?.querySelector(".rc-launcher") as HTMLElement;
                if (launcher) launcher.click();
                setShowBubble(false);
                setDismissed(true);
              }}
            >
              <div className="relative flex h-[38px] w-[38px] flex-none items-center justify-center rounded-full bg-green-500 text-white shadow-[0_0_15px_rgba(108,174,52,0.3)] transition-transform group-hover:scale-110">
                <Icon name="sun" size={20} stroke={2.5} />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-[14px] font-extrabold leading-tight text-navy-800">
                  Want to go solar?
                </span>
                <span className="font-body text-[12.5px] font-semibold text-green-600">
                  Ask our AI expert <Icon name="arrow" size={10} className="inline rotate-45 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setDismissed(true);
                setShowBubble(false);
              }}
              aria-label="Close"
              className="ke-press flex h-7 w-7 flex-none items-center justify-center rounded-full bg-ash-100 text-ash-500 transition-colors hover:bg-ash-200 hover:text-navy-800"
            >
              <Icon name="x" size={14} stroke={2.5} />
            </button>

            {/* Callout Tail - Right-pointing horizontal tail */}
            <div className="absolute -right-[6px] top-1/2 -mt-[6px] h-[12px] w-[12px] rotate-45 border-r border-t border-ash-200 bg-white" />
          </div>
        </div>
      )}
    </>
  );
}
