import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'HubSpot vs Salesforce',
  description: 'HubSpot vs Salesforce CRM comparison: HubSpot at $50/mo for simplicity vs Salesforce at $150/mo for customization. Which CRM fits your business?',
  routeInfo: { pathname: '/compare/hubspot-vs-salesforce' }
});
