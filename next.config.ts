import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ✅ This lets the build succeed even with ESLint errors
    ignoreDuringBuilds: true,
  },
  /* other config options here */
};

export default nextConfig;
