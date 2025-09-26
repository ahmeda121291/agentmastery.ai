import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Drift vs Intercom',
  description: 'Intercom vs Drift comparison: Intercom at $65/mo for complete support vs Drift at $50/mo for sales conversion. Find your ideal chat platform.',
  routeInfo: { pathname: '/compare/drift-vs-intercom' }
});
