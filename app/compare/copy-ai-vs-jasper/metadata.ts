import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Copy.ai vs Jasper',
  description: 'Jasper vs Copy.ai comparison: Jasper at $39/mo offers advanced features while Copy.ai at $36/mo provides 90+ templates. Find your ideal AI writer.',
  routeInfo: { pathname: '/compare/copy-ai-vs-jasper' }
});
