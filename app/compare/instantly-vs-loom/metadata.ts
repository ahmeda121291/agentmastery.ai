import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Instantly vs Loom',
  description: 'Compare Loom and Instantly in terms of features, pricing, and use cases to find the right tool for your needs.',
  routeInfo: { pathname: '/compare/instantly-vs-loom' }
});
