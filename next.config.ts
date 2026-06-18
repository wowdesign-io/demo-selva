import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'a.storyblok.com' }],
    qualities: [75, 85, 90],
  },
};

export default nextConfig;
