import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SITE_URL, SITE_NAME, SITE_LOCALE, IS_INDEXABLE } from "@/lib/seo/site";
import { siteGraphLd } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/JsonLd";

// Display — characterful grotesque with warmth and stroke modulation.
// Carries the confident, expert voice without the cold geometry of Sora.
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

// Body — humanist grotesque, open and highly legible for older readers.
// Pairs with the display on a personality axis, not a second geometric sans.
const body = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const GOOGLE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Kratos Energy — Solar for Every Australian Home",
    template: "%s · Kratos Energy",
  },
  description:
    "100% Australian-owned solar. Premium panels, accredited installation and a 25-year warranty. Get a free, tailored solar quote and start saving.",
  keywords: [
    "solar panels Australia",
    "residential solar",
    "commercial solar",
    "battery storage",
    "solar rebates NSW",
    "Clean Energy Council accredited installer",
  ],
  applicationName: SITE_NAME,
  // Icons come from src/app/icon.png + apple-icon.png (file convention) —
  // declaring them here as well would emit duplicate <link rel="icon"> tags.
  // NOTE: no `alternates.canonical` here — Next merges alternates down to every
  // page that doesn't set its own, which would canonicalise the whole site to
  // one URL. Canonicals come from pageMetadata() per page.
  robots: IS_INDEXABLE
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      }
    : { index: false, follow: false, nocache: true },
  openGraph: {
    title: "Kratos Energy — Solar for Every Australian Home",
    description:
      "Premium panels, accredited installation and a 25-year warranty — turning Australian power bills into savings since 2016.",
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: SITE_LOCALE,
  },
  twitter: {
    card: "summary_large_image",
    title: "Kratos Energy — Solar for Every Australian Home",
    description:
      "Premium panels, accredited installation and a 25-year warranty — turning Australian power bills into savings since 2016.",
  },
  // Omitted entirely while the token is blank — an empty meta tag is worse
  // than no tag.
  ...(GOOGLE_VERIFICATION ? { verification: { google: GOOGLE_VERIFICATION } } : {}),
};

export const viewport: Viewport = {
  themeColor: "#0c3b28",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-AU" className={`${display.variable} ${body.variable}`}>
      <head>
        {/* Hero and blog imagery are served cross-origin from the CRM. */}
        <link rel="preconnect" href="https://api.kratos-energy.com" />
        <link rel="dns-prefetch" href="https://api.kratos-energy.com" />
      </head>
      <body suppressHydrationWarning>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1STE29BHZ7"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1STE29BHZ7');
          `}
        </Script>
        <JsonLd data={siteGraphLd()} />
        {children}
      </body>
    </html>
  );
}
