import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "unsplash.com",
        pathname: "/**",
      },
    ],
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
};

export default nextConfig;
