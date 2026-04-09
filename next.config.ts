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
    ];
  },
};

export default nextConfig;
