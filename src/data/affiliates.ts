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

// Affiliate links for monetization (simplified to key partners only)
export const affiliateLinks: AffiliateLink[] = [
  {
    id: 'notion-affiliate',
    name: 'Notion',
    description: 'All-in-one workspace for organizing your AI implementation plans.',
    url: 'https://affiliate.notion.so/agentmastery',
    category: 'productivity',
    commission: '20%',
    specialOffer: 'Get 6 months free',
    ctaText: 'Try Notion Free →',
    featured: true,
    tags: ['productivity', 'planning'],
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
    description: 'Database-spreadsheet hybrid for tracking tool evaluations.',
    url: 'https://airtable.com/invite/r/agentmastery',
    category: 'database',
    commission: '15%',
    ctaText: 'Start with Airtable →',
    featured: true,
    tags: ['database', 'tracking'],
    priority: 2
  },
  {
    id: 'zapier-affiliate',
    name: 'Zapier',
    description: 'Automate workflows between AI tools and existing software.',
    url: 'https://zapier.com/sign-up?utm_campaign=agentmastery',
    category: 'automation',
    commission: '20%',
    ctaText: 'Automate Now →',
    featured: true,
    tags: ['automation', 'integration'],
    priority: 3
  }
]

// Internal cross-links to increase engagement (simplified to key pages)
export const internalCrossLinks: InternalCrossLink[] = [
  {
    id: 'agent-arcade',
    title: 'Agent Arcade',
    description: 'Interactive calculators and games to master AI ROI.',
    url: '/arcade',
    type: 'arcade',
    category: 'interactive',
    ctaText: 'Explore Arcade →',
    featured: true,
    tags: ['interactive', 'calculators', 'learning'],
    priority: 1
  },
  {
    id: 'ai-tools-comparison',
    title: 'Compare AI Tools',
    description: 'Side-by-side comparison of 200+ AI tools and features.',
    url: '/compare',
    type: 'comparison',
    category: 'tools',
    ctaText: 'Compare Tools →',
    featured: true,
    tags: ['comparison', 'evaluation'],
    priority: 2
  },
  {
    id: 'ai-strategy-guide',
    title: 'AI Implementation Guide',
    description: 'Step-by-step guide for AI adoption in your organization.',
    url: '/blog/ai-strategy-implementation-guide',
    type: 'blog',
    category: 'strategy',
    ctaText: 'Read Guide →',
    featured: true,
    tags: ['strategy', 'implementation'],
    priority: 3
  }
]

// Strategic CTAs for the resources page (simplified)
export const resourceCTAs: ResourceCTA[] = [
  {
    id: 'arcade-cta',
    title: 'Try Our Interactive Tools',
    description: 'Explore ROI calculators and pricing games.',
    type: 'internal',
    url: '/arcade',
    ctaText: 'Visit Arcade →',
    placement: 'sidebar'
  },
  {
    id: 'affiliate-notion-strategic',
    title: 'Track Your Progress',
    description: 'Use Notion to organize your AI implementation.',
    type: 'affiliate',
    url: 'https://affiliate.notion.so/agentmastery?utm_source=resources',
    ctaText: 'Try Notion Free →',
    placement: 'sidebar'
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