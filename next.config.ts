import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standard Next.js configuration for Vercel deployment
  // No static export needed - Vercel supports full Next.js features including API routes
  
  // Configure images
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
  
  // Standard trailing slash behavior
  trailingSlash: false,
};

export default nextConfig;
