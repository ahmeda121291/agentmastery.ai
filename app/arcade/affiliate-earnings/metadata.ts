import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Affiliate Earnings Calculator | Commission Revenue Forecaster',
  description: 'Calculate potential affiliate marketing earnings based on traffic, conversion rates, and commission structures. Forecast monthly and annual affiliate revenue.',
  routeInfo: { pathname: '/arcade/affiliate-earnings' }
});
