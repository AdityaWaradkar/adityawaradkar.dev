import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
 images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co', // Spotify
      },
      {
        protocol: 'https',
        hostname: 'miro.medium.com', // Medium
      },
      {
        protocol: 'https',
        hostname: 'cdn-images-1.medium.com', // Medium older images
      }
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
