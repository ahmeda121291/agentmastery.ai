import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Clay vs LeadIQ: Which AI Tool Wins in 2025? | AgentMastery',
  description: 'Clay vs LeadIQ comparison: Clay at $149/mo for data workflows vs LeadIQ at $120/mo for contact capture. Find your B2B data solution.',
  routeInfo: { pathname: '/compare/clay-vs-leadiq' }
});
