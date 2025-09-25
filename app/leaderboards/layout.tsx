import { Metadata } from 'next'
import React from 'react'
import Script from 'next/script'
import { itemListSchema, breadcrumbSchema, createSchemaScript } from '@/lib/jsonld'
import { canonical } from '@/lib/seo'
import { tools } from '@/data/tools'

export const metadata: Metadata = {
  title: {
    template: '%s | AI Tools Leaderboards - AgentMastery',
    default: 'AI Tools Leaderboards - AgentMastery'
  },
  description: 'Unbiased AI tools rankings based on value, quality, momentum, and user experience. Compare the best tools in each category with transparent scoring.',
  keywords: 'AI tools leaderboard, AI software rankings, best AI tools, AI tool comparison, AI software reviews, productivity tool rankings',
  openGraph: {
    title: 'AI Tools Leaderboards - AgentMastery',
    description: 'Unbiased AI tools rankings based on value, quality, momentum, and user experience.',
    type: 'website',
    url: 'https://agentmastery.ai/leaderboards',
    siteName: 'AgentMastery',
    images: [
      {
        url: '/og-leaderboards.jpg',
        width: 1200,
        height: 630,
        alt: 'AgentMastery AI Tools Leaderboards'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Tools Leaderboards - AgentMastery',
    description: 'Unbiased AI tools rankings based on value, quality, momentum, and user experience.',
    images: ['/og-leaderboards.jpg']
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
    canonical: 'https://agentmastery.ai/leaderboards'
  }
}

export default function LeaderboardsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Generate ItemList schema for SEO
  const topTools = tools.slice(0, 20).map((tool, idx) => ({
    name: tool.name,
    url: canonical(`/tools/${tool.slug}`),
    position: idx + 1
  }))

  const schemas = [
    breadcrumbSchema([
      { name: 'Home', url: canonical('/') },
      { name: 'Leaderboards', url: canonical('/leaderboards') },
    ]),
    itemListSchema(topTools, 'Top AI Tools Leaderboard')
  ]

  return (
    <>
      <Script {...createSchemaScript(schemas, 'leaderboards-schema')} />
      {/* Gradient Header */}
      <div className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-b">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,rgba(255,255,255,0.1))]" />
        <div className="container mx-auto px-4 py-8 relative">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-primary/10 backdrop-blur-sm">
              <svg
                className="h-6 w-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold">Leaderboards</h1>
              <p className="text-muted-foreground text-sm">Data-driven rankings you can trust</p>
            </div>
          </div>
        </div>
      </div>
      {children}
    </>
  )
}