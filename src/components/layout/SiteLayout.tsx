import Script from "next/script";
import { PromoBar } from "./PromoBar";
import { ChromeShell } from "./ChromeShell";
import { Footer } from "./Footer";
import { FloatingActions } from "./FloatingActions";

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
      <FloatingActions />
      <script
        src="https://api.ambrosianuk.com/widget.js"
        data-api-url="https://api.ambrosianuk.com"
        data-api-key="sk__qDL1B2opmjj3vZEhJSQzor2XRTuo2-yFluwhH76cm4"
        data-chatbot-id="bb7f52662f124ba5b188978d8549c165"
        data-primary-color="#5b5bf5"
        data-title="Support"
        data-position="bottom-right"></script>

    </>
  );
}
