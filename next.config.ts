import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV === 'development';
const enableAPI = process.env.ENABLE_API_ROUTES === 'true' || isDevelopment;

const nextConfig: NextConfig = {
  // Enable static export for IPFS deployment (disable for API routes in development)
  output: enableAPI ? undefined : 'export',
  
  // Use relative paths for IPFS compatibility - key change for IPFS
  basePath: '',
  assetPrefix: enableAPI ? undefined : '.', // Use default for API routes, '.' for static export
  
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
