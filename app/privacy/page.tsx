import { Privacy } from '@/app/pages/Privacy';
import { createPageMetadata } from '@/site/site-config';

export const metadata = createPageMetadata({
  title: 'Privacy Policy',
  description: 'Privacy policy for Epic Global Inc. and the information we collect, use, and protect.',
  path: '/privacy',
  keywords: ['privacy policy', 'data protection', 'epic global privacy'],
});

export default function PrivacyPage() {
  return <Privacy />;
}
