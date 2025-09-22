import { SiteLayout } from '@/src/components/layout/SiteLayout'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | AI Tools Directory - AgentMastery',
    default: 'AI Tools Directory - AgentMastery'
  },
  description: 'Discover and compare the best AI tools for automation, productivity, and business growth. Expert reviews, real-world testing, and honest recommendations.',
  keywords: 'AI tools, automation tools, productivity software, AI software, business tools, marketing automation, sales tools, content creation',
  openGraph: {
    title: 'AI Tools Directory - AgentMastery',
    description: 'Discover and compare the best AI tools for automation, productivity, and business growth.',
    type: 'website',
    url: 'https://agentmastery.ai/tools',
    siteName: 'AgentMastery',
    images: [
      {
        url: '/og-tools.jpg',
        width: 1200,
        height: 630,
        alt: 'AgentMastery AI Tools Directory'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Tools Directory - AgentMastery',
    description: 'Discover and compare the best AI tools for automation, productivity, and business growth.',
    images: ['/og-tools.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  alternates: {
    canonical: 'https://agentmastery.ai/tools'
  }
}

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SiteLayout>
      {children}
    </SiteLayout>
  )
}