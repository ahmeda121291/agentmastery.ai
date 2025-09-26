import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'AI Tool Price Guessing Game | Test Your Market Knowledge',
  description: 'How well do you know AI tool pricing? Test your knowledge by guessing the monthly cost of popular AI and SaaS tools. Challenge yourself with 70+ tools!',
  routeInfo: { pathname: '/arcade/price-guess' }
});
