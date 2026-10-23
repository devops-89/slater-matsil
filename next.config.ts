import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const analyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  reactStrictMode: false,
  experimental: {
    proxyClientMaxBodySize: 50 * 1024 * 1024,
    optimizePackageImports: [
      "@mui/material",
      "@mui/icons-material",
      "@emotion/react",
      "@emotion/styled",
      "swiper",
      "hamburger-react",
      "react-intersection-observer"
    ],
  },

  /* config options here */
  transpilePackages: ["mui-tel-input"],
  allowedDevOrigins: ["192.168.220.1"],
  images: {
    unoptimized: true,
    qualities: [45, 75],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "slatermatsil-assets.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "slatermatsil-assets.s3.us-east-1.amazonaws.com",
      },
    ],
  },
  async rewrites() {
    const rawBackend =
      process.env.BACKEND_URL ||
      process.env.NEXT_PUBLIC_BACKEND_URL ||
      process.env.BACKEND_IP ||
      "3.92.74.11";
    const backendOrigin =
      rawBackend.startsWith("http://") || rawBackend.startsWith("https://")
        ? rawBackend.replace(/\/+$/, "")
        : `http://${rawBackend.replace(/\/+$/, "")}`;

    return [
      {
        source: "/backend-api/users-create",
        destination: `${backendOrigin}/api/users/`,
      },
      {
        source: "/backend-api/contact-support",
        destination: `${backendOrigin}/api/contact-support/`,
      },
      {
        source: "/backend-api/contact-support/:id",
        destination: `${backendOrigin}/api/contact-support/:id/`,
      },
      {
        source: "/backend-api/careers",
        destination: `${backendOrigin}/api/careers/`,
      },
      {
        source: "/backend-api/careers/:id",
        destination: `${backendOrigin}/api/careers/:id/`,
      },
      {
        source: "/backend-api/:path*",
        destination: `${backendOrigin}/api/:path*`, // Proxy to backend to fix CORS
      },
    ];
  },
};
export default analyzer(nextConfig);
