import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'CustomGPT vs ChatSimple',
  description: 'Side-by-side comparison of CustomGPT vs ChatSimple—features, pricing, and best use cases to help you pick the right chatbot platform.',
  routeInfo: { pathname: '/compare/customgpt-vs-chatsimple' }
});
