import { PromoBar } from "./PromoBar";
import { ChromeShell } from "./ChromeShell";
import { Footer } from "./Footer";
import { FloatingActions } from "./FloatingActions";
import { BackToTop } from "./BackToTop";
import { ChatWidget } from "./ChatWidget";

/**
 * Standard page wrapper: promo strip + sticky header + footer,
 * the floating WhatsApp launcher, and the embedded support chat widget.
 * Wrap any routed page's content with this for consistent chrome.
 */
export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PromoBar />
      <ChromeShell />
      <main>{children}</main>
      <Footer />
      <BackToTop />
      <FloatingActions />
      <ChatWidget />

    </>
  );
}
