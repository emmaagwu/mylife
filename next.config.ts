import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      'images.unsplash.com', // Add your image domains here
      // Add other domains as needed
    ],
  },
};

export default nextConfig;
