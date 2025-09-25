import { metadata } from './metadata'
import ComparisonPage from '@/components/ComparisonPage'
export { metadata }

const comparisonData = {
  toolA: {
    slug: 'aiseo',
    name: 'AISEO',
    category: 'Writing/SEO',
    pricing: 15,
    features: ['AI article writer', 'Paraphrasing tool', 'Readability improver'],
    affiliateUrl: 'https://aiseo.ai/?fpr=agentmastery'
  },
  toolB: {
    slug: 'getgenie',
    name: 'GetGenie',
    category: 'Writing/SEO',
    pricing: 19,
    features: ['WordPress plugin', 'SERP competitor analysis', 'Content scoring'],
    affiliateUrl: 'https://getgenie.ai/agentmastery/?rui=3361'
  },
  content: {
    intro: 'AISEO and GetGenie are affordable AI writing tools focused on SEO content creation for bloggers and marketers.',
    toolAOverview: 'AISEO provides straightforward AI writing with paraphrasing and readability optimization tools.',
    toolBOverview: 'GetGenie integrates directly with WordPress and includes SERP analysis and content scoring features.',
    comparison: 'AISEO vs GetGenie',
    verdict: 'Choose AISEO for simple, affordable AI writing. Pick GetGenie if you use WordPress and want integrated SEO analysis.',
    pros: {
      toolA: ['Very affordable pricing', 'Simple interface', 'Strong paraphrasing tools'],
      toolB: ['WordPress integration', 'SERP analysis included', 'Content scoring system']
    },
    cons: {
      toolA: ['Limited SEO features'],
      toolB: ['Best for WordPress users only']
    }
  },
  slug: 'aiseo-vs-getgenie'
}

export default function AiseoVsGetGeniePage() {
  return <ComparisonPage data={comparisonData} />
}