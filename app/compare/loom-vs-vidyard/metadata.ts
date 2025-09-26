import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Loom vs Vidyard: Which AI Tool Wins in 2025? | AgentMastery',
  description: 'Loom vs Vidyard comparison: Loom at $15/mo for team communication vs Vidyard at $29/mo for sales video. Find the right video platform.',
  routeInfo: { pathname: '/compare/loom-vs-vidyard' }
});
