import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'ManyChat vs Pipedrive',
  description: 'Compare Pipedrive and ManyChat to understand which tool fits your business needs for CRM and customer engagement.',
  routeInfo: { pathname: '/compare/manychat-vs-pipedrive' }
});
