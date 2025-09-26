import { metadata } from './metadata'
import ComparisonPage from '@/components/ComparisonPage'
export { metadata }

const comparisonData = {
  toolA: {
    slug: 'pictory',
    name: 'Pictory',
    category: 'Video',
    pricing: 29,
    features: ['Text-to-video', 'Stock footage & templates', 'Auto-captions'],
    affiliateUrl: 'https://pictory.ai?ref=bex2x'
  },
  toolB: {
    slug: 'synthesia',
    name: 'Synthesia',
    category: 'Video',
    pricing: 30,
    features: ['AI avatars', 'Studio scenes', 'Voiceover library'],
    affiliateUrl: 'https://www.synthesia.io/?via=agentmastery'
  },
  content: {
    intro: 'Pictory and Synthesia both speed up video creation, but they target different workflows and budgets.',
    toolAOverview: 'Pictory streamlines text-to-video repurposing with templates and stock assets.',
    toolBOverview: 'Synthesia focuses on avatar-led production and studio-grade scenes at scale.',
    comparison: 'Pictory vs Synthesia',
    verdict: 'Choose Pictory for fast, cost-effective repurposing. Pick Synthesia when you need polished avatar videos and more control.',
    pros: {
      toolA: ['Fast text-to-video', 'Templates & stock library', 'Affordable starter plan'],
      toolB: ['High-quality avatars', 'Scalable scene builder', 'Enterprise-friendly']
    },
    cons: {
      toolA: ['Less control than full editors'],
      toolB: ['Higher price at scale']
    }
  },
  availability: {
    toolA: {
      ai_capabilities: "yes",
      automation: "partial",
      api: "no",
      team: "partial",
      analytics: "partial",
      support: "partial",
      mobile: "no",
      integrations: "partial",
      data_export: "yes",
      workflows: "partial",
      templates: "yes",
      white_label: "no",
      sso: "no",
      bulk_operations: "partial",
      real_time: "no"
    },
    toolB: {
      ai_capabilities: "yes",
      automation: "partial",
      api: "partial",
      team: "yes",
      analytics: "yes",
      support: "yes",
      mobile: "no",
      integrations: "yes",
      data_export: "yes",
      workflows: "yes",
      templates: "yes",
      white_label: "partial",
      sso: "partial",
      bulk_operations: "yes",
      real_time: "no"
    }
  },
  slug: 'pictory-vs-synthesia'
}

export default function PictoryVsSynthesiaPage() {
  return <ComparisonPage data={comparisonData} />
}