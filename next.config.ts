import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  // Use static export for production, standard mode for development (to support API routes)
  output: isDevelopment ? undefined : 'export',
  
  // Enable trailing slash for proper static hosting routing
  trailingSlash: true,
  
  // Configure images for static export
  images: {
    unoptimized: true, // Required for static export
    domains: ['avatars.githubusercontent.com'],
  },
};

export default nextConfig;