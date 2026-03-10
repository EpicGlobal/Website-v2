import { FAQ } from '@/app/pages/FAQ';
import { createPageMetadata } from '@/site/site-config';

export const metadata = createPageMetadata({
  title: 'FAQ',
  description:
    "Answers to common questions about Epic Global Inc.'s zero-risk commerce model, operating process, timelines, and marketplace coverage.",
  path: '/faq',
  keywords: ['faq', 'marketplace operator faq', 'zero risk commerce faq'],
});

export default function FAQPage() {
  return <FAQ />;
}
