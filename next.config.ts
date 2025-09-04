// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    // ✅ Ignore TS errors during build
    ignoreBuildErrors: true,
  },
  eslint: {
    // ✅ Skip linting during build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
