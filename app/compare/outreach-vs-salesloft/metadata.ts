import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Outreach vs SalesLoft',
  description: 'Salesloft vs Outreach comparison: Salesloft at $125/mo for workflows vs Outreach at $130/mo for AI intelligence. Compare top sales platforms.',
  routeInfo: { pathname: '/compare/outreach-vs-salesloft' }
});
