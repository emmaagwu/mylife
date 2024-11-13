import type { NextConfig } from "next";

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['source.unsplash.com', 'images.unsplash.com'],
  },
} as NextConfig;

export default nextConfig;
