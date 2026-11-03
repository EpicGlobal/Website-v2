import { Terms } from '@/app/pages/Terms';
import { createPageMetadata } from '@/site/site-config';

export const metadata = createPageMetadata({
  title: 'Terms of Service',
  description: 'The terms of service for Epic Global Inc.: the rules for using epicglobalinc.com and the terms that govern Epic\'s marketplace operating services for brands.',
  path: '/terms',
  keywords: ['terms of service', 'legal', 'epic global terms'],
});

export default function TermsPage() {
  return <Terms />;
}
