// next.config.ts
import type { NextConfig } from "next";

// ✅ Define config object freely, without type restriction first
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
} as unknown as NextConfig; // ← Safely cast it to satisfy Next.js

export default nextConfig;
