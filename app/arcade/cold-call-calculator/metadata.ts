import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Cold Call Calculator',
  description: 'Calculate cold call metrics, conversion rates, and ROI for your sales outreach campaigns',
  routeInfo: { pathname: '/arcade/cold-call-calculator' }
});
