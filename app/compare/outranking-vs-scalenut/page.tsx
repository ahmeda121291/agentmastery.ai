import { metadata } from './metadata'
import ComparisonPage from '@/components/ComparisonPage'
export { metadata }

const comparisonData = {
  toolA: {
    slug: 'outranking',
    name: 'Outranking',
    category: 'Writing/SEO',
    pricing: 39,
    features: ['SERP analysis', 'Content optimization', 'AI writing assistant'],
    affiliateUrl: 'https://www.outranking.io?via=agentmastery'
  },
  toolB: {
    slug: 'scalenut',
    name: 'Scalenut',
    category: 'Writing/SEO',
    pricing: 39,
    features: ['Keyword planner', 'Content optimizer', 'AI copywriter'],
    affiliateUrl: 'https://scalenut.com/?fpr=agentmastery'
  },
  content: {
    intro: 'Outranking and Scalenut are both AI-powered SEO content platforms designed to help you create optimized content that ranks.',
    toolAOverview: 'Outranking focuses on deep SERP analysis and content optimization with real-time scoring.',
    toolBOverview: 'Scalenut provides an all-in-one platform combining keyword research, content creation, and optimization.',
    comparison: 'Outranking vs Scalenut',
    verdict: 'Choose Outranking for detailed SERP analysis and optimization. Pick Scalenut for comprehensive keyword planning and content workflow.',
    pros: {
      toolA: ['Superior SERP analysis', 'Real-time optimization scoring', 'Content brief builder'],
      toolB: ['Complete keyword planner', 'Topic clustering', 'Integrated AI copywriter']
    },
    cons: {
      toolA: ['Limited keyword research features'],
      toolB: ['Less detailed SERP insights']
    }
  },
  slug: 'outranking-vs-scalenut'
}

export default function OutrankingVsScalenutPage() {
  return <ComparisonPage data={comparisonData} />
}