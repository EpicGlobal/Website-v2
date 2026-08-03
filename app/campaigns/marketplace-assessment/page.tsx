import type { Metadata } from 'next';
import { CampaignMarketplaceAssessment } from '@/app/pages/CampaignMarketplaceAssessment';

export const metadata: Metadata = {
  title: 'Marketplace Assessment',
  description:
    'Request a marketplace assessment from Epic Global Inc. for catalog readiness, channel performance, and international expansion fit.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function MarketplaceAssessmentCampaignPage() {
  return <CampaignMarketplaceAssessment />;
}
