import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Cold Call Calculator | AgentMastery',
  description: 'Interactive cold call calculator calculator and tool',
  routeInfo: { pathname: '/arcade/cold-call-calculator' }
});
