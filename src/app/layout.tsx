import type { Metadata, Viewport } from "next";
import { Poppins, Nunito_Sans } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kratos-energy.com"),
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
  openGraph: {
    title: "Kratos Energy — Solar for Every Australian Home",
    description:
      "Premium panels, accredited installation and a 25-year warranty — turning Australian power bills into savings since 2016.",
    type: "website",
    locale: "en_AU",
  },
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
    <html lang="en" className={`${poppins.variable} ${nunito.variable}`}>
      <body>{children}</body>
    </html>
  );
}
