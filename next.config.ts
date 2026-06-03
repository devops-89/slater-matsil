
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  experimental: {
    proxyClientMaxBodySize: 50 * 1024 * 1024,
  },

  /* config options here */
  transpilePackages: ["mui-tel-input"],
  allowedDevOrigins: ["192.168.220.1"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/backend-api/:path*",
        destination: "http://3.92.74.11/api/:path*", // Proxy to backend to fix CORS
      },
    ];
  },
};

export default nextConfig;
