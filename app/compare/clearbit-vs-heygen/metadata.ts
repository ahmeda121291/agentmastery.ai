import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'HeyGen vs Clearbit: Which AI Tool Wins in 2025? | AgentMastery',
  description: 'Compare HeyGen vs Clearbit: Explore features, pricing, and use cases for video creation and data management tools.',
  routeInfo: { pathname: '/compare/clearbit-vs-heygen' }
});
