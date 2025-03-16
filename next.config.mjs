const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['dapi.kakao.com'],
  },

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

  // 카카오맵 스크립트 로드 허용
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `script-src 'self' 'unsafe-eval' 'unsafe-inline' dapi.kakao.com t1.daumcdn.net;`,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
