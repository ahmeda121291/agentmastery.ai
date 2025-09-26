import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Writesonic vs HubSpot: Which AI Tool Wins in 2025? | AgentMastery',
  description: 'Compare Writesonic and HubSpot to find the best tool for your writing or CRM needs. Discover features, pricing, and pros and cons.',
  routeInfo: { pathname: '/compare/hubspot-vs-writesonic' }
});
