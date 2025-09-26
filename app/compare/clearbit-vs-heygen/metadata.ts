import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Clearbit vs HeyGen',
  description: 'Compare HeyGen vs Clearbit: Explore features, pricing, and use cases for video creation and data management tools.',
  routeInfo: { pathname: '/compare/clearbit-vs-heygen' }
});
