import { canonical } from '@/lib/seo'
import type { Metadata } from 'next'

const title = 'SEO Content ROI Calculator | Content Marketing Payback Analysis'
const description = 'Calculate the ROI and payback period for SEO content investments. Analyze organic traffic value, conversion metrics, and long-term content returns.'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: canonical('/arcade/seo-content-roi')
  },
  openGraph: {
    title,
    description,
    url: canonical('/arcade/seo-content-roi'),
    type: 'website',
    images: [
      {
        url: canonical('/api/og/calculator?title=' + encodeURIComponent('SEO Content ROI Calculator')),
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