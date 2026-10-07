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
      // Old service pages -> the plain-language services (lib/services.ts).
      { source: '/services/performance-ads', destination: '/services/ads', permanent: true },
      { source: '/services/cro', destination: '/services/website', permanent: true },
      { source: '/services/retention', destination: '/services/d2c', permanent: true },
      { source: '/services/automation', destination: '/services/d2c', permanent: true },
      { source: '/services/creative', destination: '/services/social-media', permanent: true },
      { source: '/services/influencer', destination: '/services/social-media', permanent: true },
    ];
  },
};

export default nextConfig;
