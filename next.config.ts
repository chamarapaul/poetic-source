// next.config.ts
import type { NextConfig } from "next";
import { ensurePoemsDirectoryStructure } from './src/lib/poems';

// Run directory structure check in development
if (process.env.NODE_ENV === 'development' &&
  typeof window === 'undefined' &&
  !process.env.POEMS_STRUCTURE_CHECKED) {
  console.log('Ensuring poems directory structure...');
  ensurePoemsDirectoryStructure();
  process.env.POEMS_STRUCTURE_CHECKED = 'true';
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.infrastructureLogging = {
        level: 'error', // Only show errors
      };
    }
    return config;
  },
};

export default nextConfig;