import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Video Production Cost | AgentMastery',
  description: 'Interactive video production cost calculator and tool',
  routeInfo: { pathname: '/arcade/video-production-cost' }
});
