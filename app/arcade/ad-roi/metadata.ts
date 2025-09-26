import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Ad Spend ROI Calculator | ROAS & Payback Analysis',
  description: 'Calculate your advertising return on investment (ROAS), net ROI, and payback period. Optimize ad spend with data-driven insights for PPC, social media, and display campaigns.',
  routeInfo: { pathname: '/arcade/ad-roi' }
});
