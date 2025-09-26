import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'New & Updated Content | AgentMastery.ai',
  description: 'Discover the latest AI tool reviews, comparisons, calculators, and insights. Stay up-to-date with our most recent content updates across all categories.',
  keywords: 'new content, recent updates, AI tools, latest reviews, new comparisons, fresh insights, updated calculators',
  openGraph: {
    title: 'New & Updated Content - AgentMastery.ai',
    description: 'Explore our latest AI tool reviews, comparisons, and insights. Fresh content updated daily.',
    url: 'https://agentmastery.ai/updates',
    type: 'website',
    images: [
      {
        url: '/og-updates.jpg',
        width: 1200,
        height: 630,
        alt: 'AgentMastery.ai New & Updated Content'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'New & Updated Content - AgentMastery.ai',
    description: 'Explore our latest AI tool reviews, comparisons, and insights.',
    images: ['/og-updates.jpg']
  },
  alternates: {
    canonical: 'https://agentmastery.ai/updates'
  }
}