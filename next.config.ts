import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standard static export for web hosting
  output: 'export',
  
  // Standard configuration for web hosting
  trailingSlash: false,
  
  // Configure images for static export
  images: {
    unoptimized: true, // Required for static export
    domains: ['avatars.githubusercontent.com'],
  },
};

export default nextConfig;