/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Emit a self-contained server bundle (.next/standalone) for a small Docker image.
  output: "standalone",
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
  // The system pages moved to /packages/*. These paths are already indexed, so
  // hold the old URLs open permanently and pass the ranking on to the new ones.
  async redirects() {
    return [
      { source: "/systems/:slug", destination: "/packages/:slug", permanent: true },
      { source: "/systems", destination: "/packages/large-scale", permanent: true },
      // Battery and EV charging moved under /products in the same nav rework.
      { source: "/battery-storage", destination: "/products/battery", permanent: true },
      { source: "/ev-charging", destination: "/products/ev-charging", permanent: true },
    ];
  },
};

export default nextConfig;
