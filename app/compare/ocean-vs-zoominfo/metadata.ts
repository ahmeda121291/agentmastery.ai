import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Ocean vs ZoomInfo: Which B2B Data Tool is Best in 2025? | AgentMastery',
  description: 'Side-by-side comparison of Ocean vs ZoomInfo—features, pricing, and best use cases to help you pick the right B2B data platform.',
  routeInfo: { pathname: '/compare/ocean-vs-zoominfo' }
});
