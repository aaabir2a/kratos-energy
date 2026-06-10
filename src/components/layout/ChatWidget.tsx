"use client";

import Script from "next/script";

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
`;

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
  return (
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
  );
}
