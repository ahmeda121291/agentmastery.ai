import { canonical } from '@/lib/seo'
import type { Metadata } from 'next'

const title = 'Ad Spend ROI Calculator | ROAS & Payback Analysis'
const description = 'Calculate your advertising return on investment (ROAS), net ROI, and payback period. Optimize ad spend with data-driven insights for PPC, social media, and display campaigns.'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: canonical('/arcade/ad-roi')
  },
  openGraph: {
    title,
    description,
    url: canonical('/arcade/ad-roi'),
    type: 'website',
    images: [
      {
        url: canonical('/api/og/calculator?title=' + encodeURIComponent('Ad Spend ROI Calculator')),
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