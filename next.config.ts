import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ["mui-tel-input"],
   allowedDevOrigins: ["192.168.1.41"],
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
