import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Video Production Cost Calculator',
  description: 'Calculate video production costs, ROI, and budget requirements for marketing videos',
  routeInfo: { pathname: '/arcade/video-production-cost' }
});
