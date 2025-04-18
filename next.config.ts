import type { NextConfig } from "next";

// TODO: Fix Prisma build issue

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
