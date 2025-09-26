import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Pipedrive vs ManyChat: Which AI Tool Wins in 2025? | AgentMastery',
  description: 'Compare Pipedrive and ManyChat to understand which tool fits your business needs for CRM and customer engagement.',
  routeInfo: { pathname: '/compare/manychat-vs-pipedrive' }
});
