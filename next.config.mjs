import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: path.resolve('.'),
  poweredByHeader: false,
  // Render <title>, description and canonical in <head> for every visitor, so crawlers that
  // only read the head (many AI bots) see them on dynamic pages like /knowledge-base.
  htmlLimitedBots: /.*/,
  async headers() {
    const common = [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
    ];
    if (process.env.NEXT_PUBLIC_WEBSITE_PREVIEW !== 'true') return [{ source: '/:path*', headers: common }];
    return [{ source: '/:path*', headers: [
      ...common,
      { key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' },
      { key: 'Content-Security-Policy', value: "connect-src 'self' https://unpkg.com; script-src 'self' 'unsafe-inline'; frame-src 'none'; form-action 'self'; img-src 'self' data: blob: https://unpkg.com; object-src 'none'; base-uri 'self'" },
    ] }];
  },
  // Escape hatch if Amplify's image optimization fails on the preview: set NEXT_IMAGE_UNOPTIMIZED=true
  // in Amplify's environment variables and rebuild. Images then load as before this change.
  images: {
    unoptimized: process.env.NEXT_IMAGE_UNOPTIMIZED === 'true',
    // Fewer srcset widths keeps the homepage HTML smaller (116 images).
    deviceSizes: [640, 828, 1200, 1920],
    imageSizes: [32, 64, 128, 256],
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
      // Removed contact page that Google still crawls (404 in Search Console, Oct 26 2026).
      {
        source: '/contact',
        destination: '/campaigns/marketplace-assessment',
        permanent: true,
      },
      // About page address from the previous site.
      {
        source: '/about-1',
        destination: '/about',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
