import { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Agent Arcade | Interactive AI Tools Hub',
  description: 'Play with quizzes, calculators, and games designed to level up your AI game. Explore interactive tools for AI sales, cold email ROI, and more.',
  keywords: 'AI tools, interactive quizzes, AI calculators, sales games, cold email ROI, AI stack builder, agent arcade',
  openGraph: {
    title: 'Agent Arcade - Interactive AI Tools Hub',
    description: 'Play with quizzes, calculators, and games designed to level up your AI game.',
    url: 'https://agentmastery.ai/arcade',
    siteName: 'AgentMastery',
    type: 'website',
    images: [
      {
        url: 'https://agentmastery.ai/og-arcade.jpg',
        width: 1200,
        height: 630,
        alt: 'Agent Arcade - Interactive AI Tools'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agent Arcade | Interactive AI Tools Hub',
    description: 'Play with quizzes, calculators, and games designed to level up your AI game.',
    images: ['https://agentmastery.ai/og-arcade.jpg']
  },
  alternates: {
    canonical: 'https://agentmastery.ai/arcade'
  }
}

export default function ArcadeLayout({
  children
}: {
  children: ReactNode
}) {
  return children
}