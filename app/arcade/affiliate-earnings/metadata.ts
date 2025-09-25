import { canonical } from '@/lib/seo'
import type { Metadata } from 'next'

const title = 'Affiliate Earnings Calculator | Commission Revenue Forecaster'
const description = 'Calculate potential affiliate marketing earnings based on traffic, conversion rates, and commission structures. Forecast monthly and annual affiliate revenue.'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: canonical('/arcade/affiliate-earnings')
  },
  openGraph: {
    title,
    description,
    url: canonical('/arcade/affiliate-earnings'),
    type: 'website',
    images: [
      {
        url: canonical('/api/og/calculator?title=' + encodeURIComponent('Affiliate Earnings Forecaster')),
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