import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  env: {},

  webpack: (config) => {
    return config;
  },
};

export default nextConfig;
