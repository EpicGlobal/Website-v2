import { Terms } from '@/app/pages/Terms';
import { createPageMetadata } from '@/site/site-config';

export const metadata = createPageMetadata({
  title: 'Terms of Service',
  description: 'Terms of service governing Epic Global Inc. website usage and marketplace operating services.',
  path: '/terms',
  keywords: ['terms of service', 'legal', 'epic global terms'],
});

export default function TermsPage() {
  return <Terms />;
}
