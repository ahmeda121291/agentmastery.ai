import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Copy.ai vs Pipedrive',
  description: 'Compare Pipedrive and Copy.ai to find the right tool for CRM or content generation. Explore features, pricing, and use cases to make an informed decision.',
  routeInfo: { pathname: '/compare/copy-ai-vs-pipedrive' }
});
