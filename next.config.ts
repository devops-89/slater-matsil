
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
    return [
      {
        source: "/backend-api/users-create",
        destination: "http://3.92.74.11/api/users/",
      },
      {
        source: "/backend-api/contact-support",
        destination: "http://3.92.74.11/api/contact-support/",
      },
      {
        source: "/backend-api/contact-support/:id",
        destination: "http://3.92.74.11/api/contact-support/:id/",
      },
      {
        source: "/backend-api/careers",
        destination: "http://3.92.74.11/api/careers/",
      },
      {
        source: "/backend-api/careers/:id",
        destination: "http://3.92.74.11/api/careers/:id/",
      },
      {
        source: "/backend-api/:path*",
        destination: "http://3.92.74.11/api/:path*", // Proxy to backend to fix CORS
      },
    ];
  },
};

export default nextConfig;
