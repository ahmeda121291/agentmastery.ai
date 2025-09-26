import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Lusha vs Writesonic',
  description: 'Compare Writesonic vs Lusha for content creation and lead generation. Discover features, pricing, pros, and cons to make an informed choice.',
  routeInfo: { pathname: '/compare/lusha-vs-writesonic' }
});
