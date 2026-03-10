import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: path.resolve('.'),
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve('./src'),
      'react-router': path.resolve('./src/compat/react-router.tsx'),
    };

    return config;
  },
  async redirects() {
    return [
      {
        source: '/what-we-are',
        destination: '/our-model',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
