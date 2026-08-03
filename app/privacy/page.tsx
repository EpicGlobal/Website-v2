import { Privacy } from '@/app/pages/Privacy';
import { createPageMetadata } from '@/site/site-config';

export const metadata = createPageMetadata({
  title: 'Data Protection and Privacy Policy',
  description: 'Data protection and privacy policy for Epic Global Inc., including website, software, service, and connected-platform data practices.',
  path: '/privacy',
  keywords: ['data protection policy', 'privacy policy', 'API integration privacy', 'epic global privacy'],
});

export default function PrivacyPage() {
  return <Privacy />;
}
