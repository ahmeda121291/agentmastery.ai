import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SiteLayout } from '@/components/layout/SiteLayout'
import Script from 'next/script'
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  createSchemaScript
} from '@/lib/jsonld'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'AgentMastery - Master AI Tools & Automation',
    template: '%s | AgentMastery'
  },
  description: 'Master AI tools and automation with independent rankings, practical playbooks, and interactive tools. Discover the best AI software for sales, marketing, and productivity.',
  keywords: 'AI tools, automation, sales tools, marketing automation, productivity software, AI reviews',
  authors: [{ name: 'AgentMastery Team' }],
  creator: 'AgentMastery',
  publisher: 'AgentMastery',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://agentmastery.ai'),
  openGraph: {
    title: 'AgentMastery - Master AI Tools & Automation',
    description: 'Master AI tools and automation with independent rankings and practical playbooks.',
    url: 'https://agentmastery.ai',
    siteName: 'AgentMastery',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AgentMastery - Master AI Tools'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AgentMastery - Master AI Tools & Automation',
    description: 'Master AI tools and automation with independent rankings and practical playbooks.',
    images: ['/og-image.jpg'],
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
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Generate site-wide structured data
  const organizationSchema = generateOrganizationSchema({
    name: 'AgentMastery',
    url: 'https://agentmastery.ai',
    logo: 'https://agentmastery.ai/logo.png',
    description: 'Master AI tools and automation with independent rankings, practical playbooks, and interactive tools.',
    sameAs: [
      'https://twitter.com/agentmastery',
      'https://linkedin.com/company/agentmastery'
    ]
  })

  const websiteSchema = generateWebSiteSchema(
    'AgentMastery',
    'https://agentmastery.ai',
    'Master AI tools and automation with independent rankings, practical playbooks, and interactive tools.'
  )

  return (
    <html lang="en" className={inter.className}>
      <head>
        <link rel="canonical" href="https://agentmastery.ai" />
        <link rel="prefetch" href="/tools" />
        <link rel="prefetch" href="/quiz" />
        <link rel="prefetch" href="/leaderboards" />
        <Script
          {...createSchemaScript(organizationSchema, 'organization-schema')}
          strategy="afterInteractive"
        />
        <Script
          {...createSchemaScript(websiteSchema, 'website-schema')}
          strategy="afterInteractive"
        />
        <Script
          defer
          data-domain="agentmastery.ai"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      </head>
      <body>
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  )
}
