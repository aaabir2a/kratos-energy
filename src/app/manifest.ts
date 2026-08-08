import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/seo/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Solar for Every Australian Home`,
    short_name: "Kratos",
    description:
      "Solar panels, batteries and EV charging for homes and businesses across NSW, Victoria and the ACT.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0c3b28",
    lang: "en-AU",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
