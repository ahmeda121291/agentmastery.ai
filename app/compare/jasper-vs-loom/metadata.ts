import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Jasper vs Loom',
  description: 'Compare Jasper and Loom to find out which tool best suits your writing and video communication needs. Learn about features, pricing, and more.',
  routeInfo: { pathname: '/compare/jasper-vs-loom' }
});
