import type { Metadata } from 'next';
import Script from 'next/script';
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
  return (
    <>
      <Script
        id="copperline-pixel"
        src="https://crm.epicglobalinc.com/public/copperline.js"
        data-workspace="epicglobalinc"
        data-site="epicglobalinc.com"
        strategy="afterInteractive"
      />
      <CampaignMarketplaceAssessment />
    </>
  );
}
