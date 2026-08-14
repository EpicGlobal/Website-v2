import { Contact } from '@/app/pages/Contact';
import { createPageMetadata } from '@/site/site-config';

export const metadata = createPageMetadata({
  title: 'Contact',
  description:
    'Contact Epic Global Inc. about your catalog, marketplaces, international expansion goals, or general questions.',
  path: '/contact',
  keywords: ['contact epic global', 'marketplace operations', 'brand partnerships'],
});

export default function ContactPage() {
  return <Contact />;
}
