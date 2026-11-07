import type { Metadata } from 'next';
import { PrivacyChoices } from '@/app/pages/PrivacyChoices';
import { createPageMetadata } from '@/site/site-config';

export const metadata: Metadata = createPageMetadata({
  title: 'Your Privacy Choices',
  description: 'Manage your privacy choices for epicglobalinc.com: decide whether optional analytics and advertising technologies may be used when you visit the website.',
  path: '/privacy-choices',
  keywords: ['privacy choices', 'do not sell or share', 'targeted advertising opt out'],
});

export default function PrivacyChoicesPage() {
  return <PrivacyChoices />;
}
