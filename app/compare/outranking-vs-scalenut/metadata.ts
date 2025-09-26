import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Outranking vs Scalenut',
  description: 'Side-by-side comparison of Outranking vs Scalenut—features, pricing, and best use cases to help you pick the right SEO content tool.',
  routeInfo: { pathname: '/compare/outranking-vs-scalenut' }
});
