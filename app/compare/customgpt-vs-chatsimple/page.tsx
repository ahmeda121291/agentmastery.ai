import { metadata } from './metadata'
import ComparisonPage from '@/components/ComparisonPage'
export { metadata }

const comparisonData = {
  toolA: {
    slug: 'customgpt',
    name: 'CustomGPT',
    category: 'Chatbots',
    pricing: 49,
    features: ['No-code chatbot builder', 'Document training', 'API access'],
    affiliateUrl: 'https://customgpt.ai/?fpr=agentmastery'
  },
  toolB: {
    slug: 'chatsimple',
    name: 'ChatSimple',
    category: 'Chatbots',
    pricing: 49,
    features: ['AI chatbot creation', 'Lead qualification', 'Multi-language support'],
    affiliateUrl: 'https://www.chatsimple.ai?via=agentmastery'
  },
  content: {
    intro: 'CustomGPT and ChatSimple both offer no-code chatbot solutions at the same price point, but with different focus areas.',
    toolAOverview: 'CustomGPT specializes in document-trained chatbots with deep knowledge base integration and API flexibility.',
    toolBOverview: 'ChatSimple focuses on lead generation and qualification with multi-language support for global businesses.',
    comparison: 'CustomGPT vs ChatSimple',
    verdict: 'Choose CustomGPT for knowledge base and support chatbots. Pick ChatSimple for lead generation and sales-focused chatbots.',
    pros: {
      toolA: ['Excellent document training', 'Flexible API access', 'Strong knowledge base features'],
      toolB: ['Built for lead generation', 'Multi-language support', 'Sales-focused features']
    },
    cons: {
      toolA: ['Less focus on lead generation'],
      toolB: ['Limited API flexibility']
    }
  },
  slug: 'customgpt-vs-chatsimple'
}

export default function CustomGPTVsChatSimplePage() {
  return <ComparisonPage data={comparisonData} />
}