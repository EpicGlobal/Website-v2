import type { Metadata } from 'next';
import { PrivacyChoices } from '@/app/pages/PrivacyChoices';
import { createPageMetadata } from '@/site/site-config';

export const metadata: Metadata = createPageMetadata({
  title: 'Your Privacy Choices',
  description: 'Control optional analytics and advertising technologies used on the Epic Global website.',
  path: '/privacy-choices',
  keywords: ['privacy choices', 'do not sell or share', 'targeted advertising opt out'],
});

export default function PrivacyChoicesPage() {
  return <PrivacyChoices />;
}
