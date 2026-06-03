import { PromoBar } from "./PromoBar";
import { ChromeShell } from "./ChromeShell";
import { Footer } from "./Footer";
import { FloatingActions } from "./FloatingActions";

/**
 * Standard page wrapper: promo strip + sticky header + footer,
 * plus the floating WhatsApp + AI assistant.
 * Wrap any routed page's content with this for consistent chrome.
 */
export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PromoBar />
      <ChromeShell />
      <main>{children}</main>
      <Footer />
      <FloatingActions />
    </>
  );
}
