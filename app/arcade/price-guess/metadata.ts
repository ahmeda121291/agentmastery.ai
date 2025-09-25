import { canonical } from '@/lib/seo'
import type { Metadata } from 'next'

const title = 'AI Tool Price Guessing Game | Test Your Market Knowledge'
const description = 'How well do you know AI tool pricing? Test your knowledge by guessing the monthly cost of popular AI and SaaS tools. Challenge yourself with 70+ tools!'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: canonical('/arcade/price-guess')
  },
  openGraph: {
    title,
    description,
    url: canonical('/arcade/price-guess'),
    type: 'website',
    images: [
      {
        url: canonical('/api/og/game?title=' + encodeURIComponent('Tool Price Challenge')),
        width: 1200,
        height: 630,
        alt: title
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description
  }
}