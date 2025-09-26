import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'AISEO vs Surfer',
  description: 'AISEO vs SurferSEO: AISEO at $29/mo for AI writing vs Surfer at $89/mo for SERP analysis. Compare SEO content tools for your needs.',
  routeInfo: { pathname: '/compare/aiseo-vs-surfer' }
});
