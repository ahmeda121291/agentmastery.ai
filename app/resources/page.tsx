import { Metadata } from 'next'
import ResourcesClientPage from './ResourcesClientPage'

export const metadata: Metadata = {
  title: 'Free AI Implementation Resources & Templates | AgentMastery',
  description: 'Download free AI strategy templates, implementation checklists, ROI calculators, and training materials. Proven resources used by 15,000+ professionals to accelerate AI adoption.',
  keywords: 'AI templates, implementation guide, AI strategy, ROI calculator, AI training, free resources, AI checklist, automation templates',
  openGraph: {
    title: 'Free AI Implementation Resources & Templates',
    description: 'Download free AI strategy templates, implementation checklists, ROI calculators, and training materials.',
    url: 'https://agentmastery.ai/resources',
    type: 'website',
    images: [
      {
        url: '/og-resources.jpg',
        width: 1200,
        height: 630,
        alt: 'AgentMastery AI Resources'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free AI Implementation Resources & Templates',
    description: 'Download free AI strategy templates, implementation checklists, ROI calculators, and training materials.',
    images: ['/og-resources.jpg']
  }
}

export default function ResourcesPage() {
  return <ResourcesClientPage />
}