import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Synthesia vs HeyGen: Which AI Tool Wins in 2025? | AgentMastery',
  description: 'Synthesia vs HeyGen AI video comparison: Synthesia at $30/mo with 120+ languages vs HeyGen at $29/mo with voice cloning. Pick your AI video tool.',
  routeInfo: { pathname: '/compare/heygen-vs-synthesia' }
});
