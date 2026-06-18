import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'a.storyblok.com' }],
    qualities: [75, 85, 90],
  },
  async rewrites() {
    return [
      // Storyblok Visual Editor appends story slug to preview URL.
      // Map /home → / so the editor preview loads correctly.
      { source: '/home', destination: '/' },
    ]
  },
};

export default nextConfig;
