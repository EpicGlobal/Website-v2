import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: path.resolve('.'),
  async headers() {
    if (process.env.NEXT_PUBLIC_WEBSITE_PREVIEW !== 'true') return [];
    return [{ source: '/:path*', headers: [
      { key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' },
      { key: 'Content-Security-Policy', value: "connect-src 'self' https://unpkg.com; script-src 'self' 'unsafe-inline'; frame-src 'none'; form-action 'self'; img-src 'self' data: blob: https://unpkg.com; object-src 'none'; base-uri 'self'" },
    ] }];
  },
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
