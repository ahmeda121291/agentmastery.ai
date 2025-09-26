import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Instantly vs Smartlead',
  description: 'Instantly vs SmartLead: Compare cold email platforms. Instantly at $37/mo for simplicity vs SmartLead at $39/mo with unlimited warmup.',
  routeInfo: { pathname: '/compare/instantly-vs-smartlead' }
});
