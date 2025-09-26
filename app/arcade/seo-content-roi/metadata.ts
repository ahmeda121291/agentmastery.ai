import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'SEO Content ROI Calculator',
  description: 'Calculate the ROI and payback period for SEO content investments. Analyze organic traffic value, conversion metrics, and long-term content returns.',
  routeInfo: { pathname: '/arcade/seo-content-roi' }
});
