import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Loom vs Writesonic: Which AI Tool Wins in 2025? | AgentMastery',
  description: 'Compare Loom vs Writesonic: discover features, pricing, pros, and cons of these two unique content creation tools.',
  routeInfo: { pathname: '/compare/loom-vs-writesonic' }
});
