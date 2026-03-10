import { Contact } from '@/app/pages/Contact';
import { createPageMetadata } from '@/site/site-config';

export const metadata = createPageMetadata({
  title: 'Contact',
  description:
    'Request an assessment and tell Epic Global Inc. about your catalog, marketplaces, and international expansion goals.',
  path: '/contact',
  keywords: ['contact epic global', 'marketplace assessment', 'book a call'],
});

export default function ContactPage() {
  return <Contact />;
}
