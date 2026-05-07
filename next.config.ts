import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: "/avatars/**",
      },
      {
        pathname: "/founders/**",
      },
      {
        pathname: "/coffee-cup.webp",
      },
    ],
  },
};

export default nextConfig;
