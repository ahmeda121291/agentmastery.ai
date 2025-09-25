export interface AffiliateLink {
  id: string
  name: string
  description: string
  url: string
  category: string
  commission?: string
  specialOffer?: string
  ctaText: string
  featured: boolean
  tags: string[]
  priority: number
  trackingParams?: Record<string, string>
}

export interface InternalCrossLink {
  id: string
  title: string
  description: string
  url: string
  type: 'quiz' | 'blog' | 'tool' | 'comparison' | 'calculator' | 'arcade'
  category: string
  ctaText: string
  featured: boolean
  tags: string[]
  priority: number
}

export interface ResourceCTA {
  id: string
  title: string
  description: string
  type: 'affiliate' | 'internal' | 'external'
  url: string
  ctaText: string
  placement: 'sidebar' | 'inline' | 'footer' | 'modal'
  category?: string
  conditions?: {
    showAfterDownloads?: number
    showOnCategories?: string[]
    showOnResources?: string[]
  }
}

// Affiliate links for monetization
export const affiliateLinks: AffiliateLink[] = [
  {
    id: 'notion-affiliate',
    name: 'Notion',
    description: 'All-in-one workspace for teams. Perfect for organizing your AI implementation plans and tracking progress.',
    url: 'https://affiliate.notion.so/agentmastery',
    category: 'productivity',
    commission: '20%',
    specialOffer: 'Get 6 months free on annual plans',
    ctaText: 'Try Notion Free →',
    featured: true,
    tags: ['productivity', 'planning', 'collaboration'],
    priority: 1,
    trackingParams: {
      utm_source: 'agentmastery',
      utm_medium: 'resources',
      utm_campaign: 'notion_affiliate'
    }
  },
  {
    id: 'airtable-affiliate',
    name: 'Airtable',
    description: 'Database-spreadsheet hybrid perfect for tracking AI tool evaluations and implementation progress.',
    url: 'https://airtable.com/invite/r/agentmastery',
    category: 'database',
    commission: '15%',
    ctaText: 'Start with Airtable →',
    featured: true,
    tags: ['database', 'tracking', 'organization'],
    priority: 2
  },
  {
    id: 'figma-affiliate',
    name: 'Figma',
    description: 'Design collaboration platform. Great for creating AI tool workflow diagrams and process maps.',
    url: 'https://www.figma.com/?fuid=agentmastery',
    category: 'design',
    commission: '25%',
    ctaText: 'Design with Figma →',
    featured: false,
    tags: ['design', 'collaboration', 'workflows'],
    priority: 3
  },
  {
    id: 'canva-affiliate',
    name: 'Canva Pro',
    description: 'Create stunning presentations and reports for your AI strategy and results. Professional templates included.',
    url: 'https://www.canva.com/join/agentmastery',
    category: 'design',
    commission: '30%',
    specialOffer: '45-day free trial',
    ctaText: 'Design Better →',
    featured: true,
    tags: ['design', 'presentations', 'reports'],
    priority: 4
  },
  {
    id: 'zapier-affiliate',
    name: 'Zapier',
    description: 'Automate workflows between your AI tools and existing software. Perfect for seamless integrations.',
    url: 'https://zapier.com/sign-up?utm_campaign=agentmastery',
    category: 'automation',
    commission: '20%',
    ctaText: 'Automate Workflows →',
    featured: true,
    tags: ['automation', 'integration', 'workflows'],
    priority: 5
  },
  {
    id: 'microsoft365-affiliate',
    name: 'Microsoft 365',
    description: 'Complete productivity suite with AI-powered features. Includes Teams, SharePoint, and advanced analytics.',
    url: 'https://www.microsoft.com/microsoft-365/buy/compare-all-microsoft-365-products?rtc=1&activetab=tab%3aprimaryr2&ref=agentmastery',
    category: 'productivity',
    commission: '10%',
    ctaText: 'Get Microsoft 365 →',
    featured: false,
    tags: ['productivity', 'collaboration', 'analytics'],
    priority: 6
  }
]

// Internal cross-links to increase engagement
export const internalCrossLinks: InternalCrossLink[] = [
  {
    id: 'ai-tool-finder-quiz',
    title: 'Find Your Perfect AI Tool',
    description: 'Take our comprehensive quiz to discover which AI tools best fit your needs and budget.',
    url: '/quiz',
    type: 'quiz',
    category: 'assessment',
    ctaText: 'Take the Quiz →',
    featured: true,
    tags: ['quiz', 'tool-selection', 'assessment'],
    priority: 1
  },
  {
    id: 'ai-tools-comparison',
    title: 'Compare AI Tools Side-by-Side',
    description: 'Use our interactive comparison tool to evaluate features, pricing, and performance across top AI tools.',
    url: '/compare',
    type: 'comparison',
    category: 'tools',
    ctaText: 'Compare Tools →',
    featured: true,
    tags: ['comparison', 'evaluation', 'tools'],
    priority: 2
  },
  {
    id: 'roi-calculator',
    title: 'AI ROI Calculator',
    description: 'Calculate the potential return on investment for your AI tool implementations.',
    url: '/calculators/ai-roi',
    type: 'calculator',
    category: 'roi',
    ctaText: 'Calculate ROI →',
    featured: true,
    tags: ['calculator', 'roi', 'financial'],
    priority: 3
  },
  {
    id: 'ai-strategy-guide',
    title: 'AI Strategy Implementation Guide',
    description: 'Comprehensive guide on developing and executing your AI strategy.',
    url: '/blog/ai-strategy-implementation-guide',
    type: 'blog',
    category: 'strategy',
    ctaText: 'Read Guide →',
    featured: true,
    tags: ['strategy', 'implementation', 'guide'],
    priority: 4
  },
  {
    id: 'ai-leaderboards',
    title: 'Top-Rated AI Tools',
    description: 'See which AI tools are leading in user ratings, features, and performance.',
    url: '/leaderboards',
    type: 'tool',
    category: 'rankings',
    ctaText: 'View Rankings →',
    featured: false,
    tags: ['rankings', 'ratings', 'tools'],
    priority: 5
  },
  {
    id: 'team-readiness-assessment',
    title: 'Team AI Readiness Assessment',
    description: 'Evaluate your team\'s readiness for AI tool adoption and implementation.',
    url: '/quiz/team-readiness',
    type: 'quiz',
    category: 'assessment',
    ctaText: 'Assess Readiness →',
    featured: false,
    tags: ['assessment', 'team', 'readiness'],
    priority: 6
  },
  {
    id: 'agent-arcade',
    title: 'Agent Arcade',
    description: 'Explore interactive tools, quizzes, and calculators to master AI implementation.',
    url: '/arcade',
    type: 'arcade',
    category: 'interactive',
    ctaText: 'Explore Arcade →',
    featured: true,
    tags: ['interactive', 'games', 'learning'],
    priority: 7
  }
]

// Strategic CTAs for the resources page
export const resourceCTAs: ResourceCTA[] = [
  {
    id: 'newsletter-signup',
    title: 'Get Weekly AI Insights',
    description: 'Join 15,000+ professionals getting weekly AI tool updates and exclusive resources.',
    type: 'internal',
    url: '/newsletter',
    ctaText: 'Subscribe Free →',
    placement: 'sidebar'
  },
  {
    id: 'quiz-after-download',
    title: 'Find Your Perfect AI Stack',
    description: 'You\'ve got the resources, now discover which tools will work best for your specific needs.',
    type: 'internal',
    url: '/quiz',
    ctaText: 'Take the Quiz →',
    placement: 'modal',
    conditions: {
      showAfterDownloads: 2
    }
  },
  {
    id: 'consultation-cta',
    title: 'Need Expert Help?',
    description: 'Book a 30-minute consultation to discuss your AI strategy and implementation plan.',
    type: 'external',
    url: 'https://calendly.com/agentmastery/consultation',
    ctaText: 'Book Consultation →',
    placement: 'sidebar',
    conditions: {
      showOnCategories: ['ai-strategy', 'implementation']
    }
  },
  {
    id: 'affiliate-notion-strategic',
    title: 'Organize Your AI Journey',
    description: 'Use Notion to track your progress through these resources and implementation steps.',
    type: 'affiliate',
    url: 'https://affiliate.notion.so/agentmastery?utm_source=resources',
    ctaText: 'Try Notion Free →',
    placement: 'inline',
    conditions: {
      showOnCategories: ['ai-strategy', 'implementation', 'roi-tracking']
    }
  },
  {
    id: 'tools-database-cta',
    title: 'Explore 200+ AI Tools',
    description: 'Browse our comprehensive database of AI tools with detailed reviews and comparisons.',
    type: 'internal',
    url: '/tools',
    ctaText: 'Browse Tools →',
    placement: 'footer'
  }
]

// Helper functions
export function getFeaturedAffiliateLinks(): AffiliateLink[] {
  return affiliateLinks
    .filter(link => link.featured)
    .sort((a, b) => a.priority - b.priority)
}

export function getFeaturedInternalLinks(): InternalCrossLink[] {
  return internalCrossLinks
    .filter(link => link.featured)
    .sort((a, b) => a.priority - b.priority)
}

export function getAffiliatesByCategory(category: string): AffiliateLink[] {
  return affiliateLinks.filter(link => link.category === category)
}

export function getInternalLinksByType(type: InternalCrossLink['type']): InternalCrossLink[] {
  return internalCrossLinks.filter(link => link.type === type)
}

export function getCTAsByPlacement(placement: ResourceCTA['placement']): ResourceCTA[] {
  return resourceCTAs.filter(cta => cta.placement === placement)
}

export function getCTAsForCategory(category: string): ResourceCTA[] {
  return resourceCTAs.filter(cta =>
    !cta.conditions?.showOnCategories ||
    cta.conditions.showOnCategories.includes(category)
  )
}

export function getCTAsForResource(resourceId: string): ResourceCTA[] {
  return resourceCTAs.filter(cta =>
    !cta.conditions?.showOnResources ||
    cta.conditions.showOnResources.includes(resourceId)
  )
}

// Tracking utilities
export function getTrackingUrl(link: AffiliateLink): string {
  if (!link.trackingParams) return link.url

  const url = new URL(link.url)
  Object.entries(link.trackingParams).forEach(([key, value]) => {
    url.searchParams.set(key, value)
  })

  return url.toString()
}

export function trackDownload(resourceId: string, downloadType: 'internal' | 'external' | 'affiliate') {
  // This would integrate with your analytics system (Plausible, GA, etc.)
  if (typeof window !== 'undefined') {
    // Plausible tracking
    if (window.plausible) {
      window.plausible('Download', {
        props: {
          resource: resourceId,
          type: downloadType
        }
      })
    }
  }
}

export function trackClick(linkId: string, linkType: 'affiliate' | 'internal' | 'external') {
  if (typeof window !== 'undefined') {
    // Plausible tracking
    if (window.plausible) {
      window.plausible('Link Click', {
        props: {
          link: linkId,
          type: linkType
        }
      })
    }
  }
}

// TypeScript declaration for window.plausible
declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: Record<string, any> }) => void
  }
}