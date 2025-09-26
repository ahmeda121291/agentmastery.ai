import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Apollo vs ZoomInfo',
  description: 'Compare Apollo vs ZoomInfo: pricing, features, and data quality. Apollo at $59/mo vs ZoomInfo at $1,250/mo - find the right B2B database for your team.',
  routeInfo: { pathname: '/compare/apollo-vs-zoominfo' }
});
