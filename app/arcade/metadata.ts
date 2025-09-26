import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'AI Tools Arcade',
  description: 'Explore our interactive arcade of AI tools including ROI calculators, savings estimators, personality quizzes, and fun games to discover your AI needs.',
  routeInfo: { pathname: '/arcade' }
});