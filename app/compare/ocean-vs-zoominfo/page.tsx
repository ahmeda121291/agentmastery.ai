import { metadata } from './metadata'
import ComparisonPage from '@/components/ComparisonPage'
export { metadata }

const comparisonData = {
  toolA: {
    slug: 'ocean',
    name: 'Ocean',
    category: 'Data/Prospecting',
    pricing: 99,
    features: ['B2B contact data', 'Company insights', 'Chrome extension'],
    affiliateUrl: 'https://www.ocean.io?aff=L4njck497fJg'
  },
  toolB: {
    slug: 'zoominfo',
    name: 'ZoomInfo',
    category: 'Data/Prospecting',
    pricing: 1250,
    features: ['Premium B2B database', 'Intent data', 'Org charts'],
    affiliateUrl: 'https://try.zoominfo.com/agentmastery'
  },
  content: {
    intro: 'Ocean and ZoomInfo both provide B2B data and prospecting tools, but at vastly different price points and scales.',
    toolAOverview: 'Ocean offers affordable B2B contact data with company insights and a convenient Chrome extension.',
    toolBOverview: 'ZoomInfo is the enterprise-grade solution with premium data quality, intent signals, and comprehensive org mapping.',
    comparison: 'Ocean vs ZoomInfo',
    verdict: 'Choose Ocean for affordable B2B data at startup scale. Pick ZoomInfo for enterprise-level data quality and advanced features.',
    pros: {
      toolA: ['Affordable at $99/month', 'No seat minimums', 'Easy to get started'],
      toolB: ['Highest data accuracy', 'Intent data included', 'Enterprise integrations']
    },
    cons: {
      toolA: ['Smaller database than ZoomInfo'],
      toolB: ['Very expensive ($15,000+ minimum)']
    }
  },
  slug: 'ocean-vs-zoominfo'
}

export default function OceanVsZoomInfoPage() {
  return <ComparisonPage data={comparisonData} />
}