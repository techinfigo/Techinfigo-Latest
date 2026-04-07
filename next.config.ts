import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
