import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Qualified vs Zoho',
  description: 'Compare Zoho CRM and Qualified to find the best tool for your sales and customer engagement needs. Explore features, pricing, and use cases.',
  routeInfo: { pathname: '/compare/qualified-vs-zoho' }
});
