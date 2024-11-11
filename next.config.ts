// next.config.js
import type { NextConfig } from "next";
import { ensurePoemsDirectoryStructure } from './src/lib/poems';

// Run directory structure check in development
if (process.env.NODE_ENV === 'development') {
  console.log('Ensuring poems directory structure...');
  ensurePoemsDirectoryStructure();
}

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
};

export default nextConfig;
