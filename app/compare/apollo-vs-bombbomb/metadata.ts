import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Apollo vs BombBomb',
  description: 'Compare Apollo and BombBomb for lead generation vs. video communication; discover features, pricing, and pros/cons of each tool.',
  routeInfo: { pathname: '/compare/apollo-vs-bombbomb' }
});
