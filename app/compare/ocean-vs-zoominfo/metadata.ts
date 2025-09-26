import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Ocean vs ZoomInfo',
  description: 'Side-by-side comparison of Ocean vs ZoomInfo—features, pricing, and best use cases to help you pick the right B2B data platform.',
  routeInfo: { pathname: '/compare/ocean-vs-zoominfo' }
});
