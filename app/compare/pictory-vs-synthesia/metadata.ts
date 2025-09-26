import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Pictory vs Synthesia',
  description: 'Side-by-side comparison of Pictory vs Synthesia—features, pricing, and best use cases to help you pick the right AI video tool.',
  routeInfo: { pathname: '/compare/pictory-vs-synthesia' }
});
