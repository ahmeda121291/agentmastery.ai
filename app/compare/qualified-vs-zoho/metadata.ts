import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Zoho CRM vs Qualified: Which AI Tool Wins in 2025? | AgentMastery',
  description: 'Compare Zoho CRM and Qualified to find the best tool for your sales and customer engagement needs. Explore features, pricing, and use cases.',
  routeInfo: { pathname: '/compare/qualified-vs-zoho' }
});
