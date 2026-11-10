import type { Metadata } from 'next';
import { CampaignMarketplaceAssessment } from '@/app/pages/CampaignMarketplaceAssessment';

export const metadata: Metadata = {
  title: 'Marketplace Assessment',
  description:
    'Request a marketplace assessment from Epic Global Inc. for catalog readiness, channel performance, and international expansion fit.',
  // Kept out of search results, but links are followed: /contact redirects here, so its links still count.
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
    },
  },
};

export default function MarketplaceAssessmentCampaignPage() {
  return <CampaignMarketplaceAssessment />;
}
