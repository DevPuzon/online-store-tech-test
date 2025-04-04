import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/shop',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
