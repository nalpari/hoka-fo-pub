import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'dms.deckers.com', pathname: '/hoka/image/upload/**' },
    ],
  },
};

export default nextConfig;
