import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'AISEO vs GetGenie',
  description: 'Side-by-side comparison of AISEO vs GetGenie—features, pricing, and best use cases to help you pick the right AI writing tool.',
  routeInfo: { pathname: '/compare/aiseo-vs-getgenie' }
});
