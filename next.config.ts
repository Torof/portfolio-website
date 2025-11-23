import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standard Next.js configuration for Vercel deployment
  // No static export needed - Vercel supports full Next.js features including API routes
  
  // Configure images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.sstatic.net',
        pathname: '/**',
      },
    ],
  },
  
  // Standard trailing slash behavior
  trailingSlash: false,
};

export default nextConfig;
