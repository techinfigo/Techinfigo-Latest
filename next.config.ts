import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/agra-landing',
        destination: '/digital-marketing-agency-agra',
        permanent: true,
      },
      // Merged into one plain-language "How We Work" page.
      { source: '/system', destination: '/how-it-works', permanent: true },
      { source: '/profit-breakdown', destination: '/how-it-works', permanent: true },
    ];
  },
};

export default nextConfig;
