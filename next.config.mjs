/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Emit a self-contained server bundle (.next/standalone) for a small Docker image.
  output: "standalone",
  trailingSlash: false,
  images: {
    // Modern formats cut hero and blog image weight substantially; the long
    // cache TTL keeps optimised variants around between deploys.
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2678400,
    remotePatterns: [
      { protocol: "http", hostname: "75.119.149.137", port: "9000", pathname: "/blogs/**" },
      { protocol: "http", hostname: "75.119.149.137", port: "9000", pathname: "/kratos-uploads/**" },
      // Production API host — blog + upload images served over HTTPS.
      { protocol: "https", hostname: "api.kratos-energy.com", pathname: "/blogs/**" },
      { protocol: "https", hostname: "api.kratos-energy.com", pathname: "/kratos-uploads/**" },
    ],
  },
  // Permanent redirects to preserve link equity and resolve GSC canonical issues.
  async redirects() {
    return [
      // 1. Enforce www -> non-www (Resolves 7 out of 8 Canonical Tag issues in GSC)
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.kratos-energy.com" }],
        destination: "https://kratos-energy.com/:path*",
        permanent: true,
      },
      // 2. Legacy system paths
      { source: "/systems/:slug", destination: "/packages/:slug", permanent: true },
      { source: "/systems", destination: "/packages/large-scale", permanent: true },
      // Battery and EV charging moved under /products in the same nav rework.
      { source: "/battery-storage", destination: "/products/battery", permanent: true },
      { source: "/ev-charging", destination: "/products/ev-charging", permanent: true },
      // Natural redirect for about page variant
      { source: "/about-us", destination: "/about", permanent: true },
      // 3. Legacy WordPress paths (fixes 404s and crawled-not-indexed tag pages)
      { source: "/our-projects", destination: "/projects", permanent: true },
      { source: "/our-projects/:path*", destination: "/projects", permanent: true },
      { source: "/news/tag/:tag*", destination: "/news", permanent: true },
      // 4. Malformed slug with trailing single quote found in GSC
      {
        source: "/blog/nsw-solar-rebates-your-complete-guide-to-claiming-thousands-in-government-incentives'",
        destination: "/blog/nsw-solar-rebates-your-complete-guide-to-claiming-thousands-in-government-incentives",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
