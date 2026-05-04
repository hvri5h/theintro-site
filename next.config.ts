import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: "/avatars/**",
      },
    ],
  },
};

export default nextConfig;
