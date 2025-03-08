const nextConfig = {
  env: {},

  webpack: (config) => {
    return config;
  },

  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
