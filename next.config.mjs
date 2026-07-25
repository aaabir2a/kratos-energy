/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Emit a self-contained server bundle (.next/standalone) for a small Docker image.
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "75.119.149.137", port: "9000", pathname: "/blogs/**" },
      { protocol: "http", hostname: "75.119.149.137", port: "9000", pathname: "/kratos-uploads/**" },
    ],
  },
};

export default nextConfig;
