import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SiteLayout } from '@/src/components/layout/SiteLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AgentMastery.ai - Master AI Agent Development',
  description: 'Learn, practice, and excel in AI agent development with interactive tools, comprehensive tutorials, and competitive leaderboards.',
  keywords: 'AI agents, machine learning, artificial intelligence, development tools, tutorials, leaderboards',
  authors: [{ name: 'AgentMastery.ai' }],
  openGraph: {
    title: 'AgentMastery.ai - Master AI Agent Development',
    description: 'Learn, practice, and excel in AI agent development',
    type: 'website',
    locale: 'en_US',
    siteName: 'AgentMastery.ai',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AgentMastery.ai',
    description: 'Master AI Agent Development',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  )
}
