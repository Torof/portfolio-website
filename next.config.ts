import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for IPFS deployment
  output: 'export',
  
  // Use relative paths for IPFS compatibility - key change for IPFS
  basePath: '',
  assetPrefix: '.', // Changed from './' to '.' for better IPFS compatibility
  
  // Optimize for static hosting
  trailingSlash: false, // Changed to false to avoid issues with IPFS paths
  
  // Configure images for static export
  images: {
    unoptimized: true, // Required for static export
    domains: ['avatars.githubusercontent.com'],
  },
  
  // Disable server-side features for static export
  experimental: {
    // Ensure static generation works properly
  },
};

export default nextConfig;
