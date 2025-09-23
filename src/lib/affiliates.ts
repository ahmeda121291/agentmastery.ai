export interface AffiliateTool {
  name: string
  href: string
  description: string
  category: 'data' | 'outreach' | 'sales' | 'closing' | 'ai' | 'video' | 'crm' | 'scheduling'
  useCases: string[]
}

// Centralized affiliate tool configuration
// Only tools with verified affiliate/partner links should be listed here
export const AFFILIATE_TOOLS: Record<string, AffiliateTool> = {
  apollo: {
    name: 'Apollo',
    href: 'https://get.apollo.io/qq0iw5w2fskf',
    description: 'All-in-one sales intelligence platform with verified contacts',
    category: 'data',
    useCases: ['connect-rate', 'prospecting', 'data-enrichment', 'email-outreach']
  },
  close: {
    name: 'Close CRM',
    href: 'https://refer.close.com/lvdqjdm97t92-fetl0j',
    description: 'CRM with built-in calling and automated follow-up',
    category: 'closing',
    useCases: ['closing', 'crm', 'calling', 'follow-up', 'pipeline']
  },
  instantly: {
    name: 'Instantly',
    href: 'https://instantly.ai/?fp_ref=ahmed26',
    description: 'Cold email automation with unlimited accounts',
    category: 'outreach',
    useCases: ['email-outreach', 'cold-email', 'deliverability', 'scale']
  },
  smartlead: {
    name: 'SmartLead',
    href: 'https://smartlead.ai/?ref=ahmed',
    description: 'Multi-channel cold outreach automation',
    category: 'outreach',
    useCases: ['email-outreach', 'multi-channel', 'personalization', 'scale']
  },
  clay: {
    name: 'Clay',
    href: 'https://clay.com/?ref=agentmastery',
    description: 'Data enrichment and personalization at scale',
    category: 'data',
    useCases: ['data-enrichment', 'personalization', 'research', 'prospecting']
  },
  orum: {
    name: 'Orum',
    href: 'https://orum.com/?ref=agentmastery',
    description: 'AI-powered parallel dialer for 10x more connects',
    category: 'sales',
    useCases: ['calling', 'connect-rate', 'volume', 'efficiency']
  },
  gong: {
    name: 'Gong',
    href: 'https://gong.io/?ref=agentmastery',
    description: 'Revenue intelligence and conversation analytics',
    category: 'sales',
    useCases: ['conversation', 'coaching', 'analytics', 'closing']
  },
  outreach: {
    name: 'Outreach',
    href: 'https://outreach.io/?ref=agentmastery',
    description: 'Sales engagement platform for enterprise teams',
    category: 'outreach',
    useCases: ['sequences', 'multi-channel', 'enterprise', 'automation']
  },
  hubspot: {
    name: 'HubSpot Sales',
    href: 'https://hubspot.com/products/sales?ref=agentmastery',
    description: 'Free CRM with sales automation tools',
    category: 'crm',
    useCases: ['crm', 'automation', 'free-tier', 'all-in-one']
  },
  pipedrive: {
    name: 'Pipedrive',
    href: 'https://pipedrive.com/?ref=agentmastery',
    description: 'Visual sales pipeline management',
    category: 'crm',
    useCases: ['pipeline', 'visualization', 'forecasting', 'deals']
  },
  lemlist: {
    name: 'Lemlist',
    href: 'https://lemlist.com/?ref=agentmastery',
    description: 'Personalized cold email outreach with images',
    category: 'outreach',
    useCases: ['personalization', 'cold-email', 'images', 'creative']
  },
  reply: {
    name: 'Reply.io',
    href: 'https://reply.io/?ref=agentmastery',
    description: 'Multichannel sales engagement with AI',
    category: 'outreach',
    useCases: ['multi-channel', 'ai-personalization', 'sequences', 'linkedin']
  }
}

// Get affiliate tools by use case
export function getAffiliateToolsByUseCase(useCase: string): AffiliateTool[] {
  return Object.values(AFFILIATE_TOOLS).filter(tool =>
    tool.useCases.includes(useCase)
  )
}

// Get affiliate tools by category
export function getAffiliateToolsByCategory(category: AffiliateTool['category']): AffiliateTool[] {
  return Object.values(AFFILIATE_TOOLS).filter(tool =>
    tool.category === category
  )
}

// Get specific affiliate tool
export function getAffiliateTool(key: string): AffiliateTool | null {
  return AFFILIATE_TOOLS[key] || null
}

// Track affiliate click with Plausible
export function trackAffiliateClick(toolName: string, source: 'calculator' | 'quiz' | 'leaderboard', context?: string) {
  if (typeof window !== 'undefined' && (window as any).plausible) {
    (window as any).plausible('Affiliate Link Clicked', {
      props: {
        tool: toolName,
        source,
        context: context || 'general'
      }
    })
  }
}

// Fallback message when no affiliate tools match
export const NO_AFFILIATE_FALLBACK = {
  message: "No affiliate match available yet. Explore our AI Stack for more options.",
  linkText: "Browse AI Stack →",
  linkHref: "/tools"
}