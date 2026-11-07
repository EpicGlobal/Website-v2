import type { MetadataRoute } from 'next';
import { siteConfig } from '@/site/site-config';

/** Used when someone saves the site to a phone's home screen: name, colors and a crisp Epic icon. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: 'Epic Global',
    description: siteConfig.description,
    start_url: '/',
    display: 'browser',
    background_color: '#0B1020',
    theme_color: '#0B1020',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
