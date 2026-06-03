import { PromoBar } from "./PromoBar";
import { ChromeShell } from "./ChromeShell";
import { Footer } from "./Footer";

/**
 * Standard page wrapper: promo strip + sticky header + footer.
 * Wrap any routed page's content with this for consistent chrome.
 */
export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PromoBar />
      <ChromeShell />
      <main>{children}</main>
      <Footer />
    </>
  );
}
