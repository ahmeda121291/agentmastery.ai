export type ToolPrice = {
  slug: string
  name: string
  logo?: string
  price: number
  plan: string
  currency?: 'USD'
  asOf: string
  affiliateUrl?: string | null
  category: string
}

// All prices are in USD per month unless otherwise noted
// Including all affiliate partners first, then other popular tools
export const TOOL_PRICES: ToolPrice[] = [
  // Affiliate partners (from tools.ts)
  {
    slug: 'aiseo',
    name: 'AISEO',
    price: 19,
    plan: 'Grow',
    asOf: '2025-01',
    affiliateUrl: 'https://aiseo.ai/?fpr=agentmastery',
    category: 'Writing/SEO'
  },
  {
    slug: 'synthesia',
    name: 'Synthesia',
    price: 22,
    plan: 'Starter',
    asOf: '2025-01',
    affiliateUrl: 'https://www.synthesia.io/?via=agentmastery',
    category: 'Video'
  },
  {
    slug: 'smartlead',
    name: 'SmartLead',
    price: 39,
    plan: 'Basic',
    asOf: '2025-01',
    affiliateUrl: 'https://smartlead.ai/?via=masteryagent',
    category: 'Outbound'
  },
  {
    slug: 'lovable',
    name: 'Lovable',
    price: 20,
    plan: 'Starter',
    asOf: '2025-01',
    affiliateUrl: 'https://lovable.dev?via=agentmastery',
    category: 'Dev/Builders'
  },
  {
    slug: 'customgpt',
    name: 'CustomGPT',
    price: 89,
    plan: 'Standard',
    asOf: '2025-01',
    affiliateUrl: 'https://customgpt.ai/?fpr=agentmastery',
    category: 'Chatbots'
  },
  {
    slug: 'chatsimple',
    name: 'Chatsimple',
    price: 29,
    plan: 'Starter',
    asOf: '2025-01',
    affiliateUrl: 'https://www.chatsimple.ai?via=agentmastery',
    category: 'Chatbots'
  },
  {
    slug: 'outranking',
    name: 'Outranking',
    price: 79,
    plan: 'SEO Writer',
    asOf: '2025-01',
    affiliateUrl: 'https://www.outranking.io?via=agentmastery',
    category: 'Writing/SEO'
  },
  {
    slug: 'getgenie',
    name: 'GetGenie',
    price: 19,
    plan: 'Writer',
    asOf: '2025-01',
    affiliateUrl: 'https://getgenie.ai/agentmastery/?rui=3361',
    category: 'Writing/SEO'
  },
  {
    slug: 'ocean-io',
    name: 'Ocean.io',
    price: 99,
    plan: 'Pro',
    asOf: '2025-01',
    affiliateUrl: 'https://www.ocean.io?aff=L4njck497fJg',
    category: 'Lead Gen'
  },
  {
    slug: 'beehiiv',
    name: 'beehiiv',
    price: 39,
    plan: 'Grow',
    asOf: '2025-01',
    affiliateUrl: 'https://www.beehiiv.com?via=agentmastery',
    category: 'Email Marketing'
  },
  {
    slug: 'hypefury',
    name: 'HypeFury',
    price: 19,
    plan: 'Standard',
    asOf: '2025-01',
    affiliateUrl: 'https://hypefury.com/?via=agentmastery',
    category: 'Social Media'
  },
  {
    slug: 'elevenlabs',
    name: 'ElevenLabs',
    price: 5,
    plan: 'Starter',
    asOf: '2025-01',
    affiliateUrl: 'https://try.elevenlabs.io/agentmastery',
    category: 'Voice/Audio'
  },
  {
    slug: 'warmy',
    name: 'Warmy',
    price: 49,
    plan: 'Basic',
    asOf: '2025-01',
    affiliateUrl: 'https://warmy.io?fpr=agentmastery',
    category: 'Email Warmup'
  },
  {
    slug: 'apollo',
    name: 'Apollo.io',
    price: 49,
    plan: 'Basic',
    asOf: '2025-01',
    affiliateUrl: 'https://get.apollo.io/qq0iw5w2fskf',
    category: 'Lead Gen'
  },
  {
    slug: 'scalenut',
    name: 'Scalenut',
    price: 39,
    plan: 'Essential',
    asOf: '2025-01',
    affiliateUrl: 'https://scalenut.com/?fpr=agentmastery',
    category: 'Writing/SEO'
  },
  {
    slug: 'krispcall',
    name: 'KrispCall',
    price: 15,
    plan: 'Essential',
    asOf: '2025-01',
    affiliateUrl: 'https://try.krispcall.com/agentmastery',
    category: 'Phone/VoIP'
  },
  {
    slug: 'murf',
    name: 'Murf',
    price: 29,
    plan: 'Basic',
    asOf: '2025-01',
    affiliateUrl: 'https://get.murf.ai/text-to-speech-zf1b3ywztvno',
    category: 'Voice/Audio'
  },
  {
    slug: 'brand24',
    name: 'Brand24',
    price: 119,
    plan: 'Individual',
    asOf: '2025-01',
    affiliateUrl: 'https://try.brand24.com/agentmastery',
    category: 'Social Monitoring'
  },
  {
    slug: 'landingi',
    name: 'Landingi',
    price: 29,
    plan: 'Core',
    asOf: '2025-01',
    affiliateUrl: 'https://try.landingi.com/agentmastery',
    category: 'Landing Pages'
  },
  {
    slug: 'zoominfo',
    name: 'ZoomInfo',
    price: 15000,
    plan: 'Professional',
    asOf: '2025-01',
    affiliateUrl: 'https://try.zoominfo.com/agentmastery',
    category: 'Lead Gen'
  },
  {
    slug: 'close',
    name: 'Close',
    price: 49,
    plan: 'Startup',
    asOf: '2025-01',
    affiliateUrl: 'https://refer.close.com/lvdqjdm97t92-fetl0j',
    category: 'CRM/Sales'
  },
  {
    slug: 'pictory',
    name: 'Pictory',
    price: 23,
    plan: 'Starter',
    asOf: '2025-01',
    affiliateUrl: 'https://pictory.ai?ref=bex2x',
    category: 'Video'
  },
  {
    slug: 'motion',
    name: 'Motion',
    price: 34,
    plan: 'Individual',
    asOf: '2025-01',
    affiliateUrl: 'https://get.usemotion.com/63fjeh0l8zw4',
    category: 'Productivity'
  },
  {
    slug: 'leadpages',
    name: 'Leadpages',
    price: 37,
    plan: 'Standard',
    asOf: '2025-01',
    affiliateUrl: 'https://try.leadpages.com/agentmastery',
    category: 'Landing Pages'
  },
  {
    slug: 'descript',
    name: 'Descript',
    price: 12,
    plan: 'Creator',
    asOf: '2025-01',
    affiliateUrl: 'https://get.descript.com/agentmastery',
    category: 'Video/Audio'
  },

  // Non-affiliate popular tools for variety
  {
    slug: 'chatgpt',
    name: 'ChatGPT Plus',
    price: 20,
    plan: 'Plus',
    asOf: '2025-01',
    affiliateUrl: null,
    category: 'AI Assistant'
  },
  {
    slug: 'claude',
    name: 'Claude Pro',
    price: 20,
    plan: 'Pro',
    asOf: '2025-01',
    affiliateUrl: null,
    category: 'AI Assistant'
  },
  {
    slug: 'jasper',
    name: 'Jasper',
    price: 39,
    plan: 'Creator',
    asOf: '2025-01',
    affiliateUrl: null,
    category: 'Writing'
  },
  {
    slug: 'copy-ai',
    name: 'Copy.ai',
    price: 49,
    plan: 'Pro',
    asOf: '2025-01',
    affiliateUrl: null,
    category: 'Writing'
  },
  {
    slug: 'instantly',
    name: 'Instantly',
    price: 37,
    plan: 'Growth',
    asOf: '2025-01',
    affiliateUrl: null,
    category: 'Outbound'
  },
  {
    slug: 'hubspot',
    name: 'HubSpot',
    price: 15,
    plan: 'Starter CRM',
    asOf: '2025-01',
    affiliateUrl: null,
    category: 'CRM/Sales'
  },
  {
    slug: 'salesforce',
    name: 'Salesforce',
    price: 25,
    plan: 'Essentials',
    asOf: '2025-01',
    affiliateUrl: null,
    category: 'CRM/Sales'
  },
  {
    slug: 'loom',
    name: 'Loom',
    price: 15,
    plan: 'Business',
    asOf: '2025-01',
    affiliateUrl: null,
    category: 'Video'
  },
  {
    slug: 'vidyard',
    name: 'Vidyard',
    price: 29,
    plan: 'Pro',
    asOf: '2025-01',
    affiliateUrl: null,
    category: 'Video'
  },
  {
    slug: 'drift',
    name: 'Drift',
    price: 2500,
    plan: 'Premium',
    asOf: '2025-01',
    affiliateUrl: null,
    category: 'Chatbots'
  },
  {
    slug: 'intercom',
    name: 'Intercom',
    price: 74,
    plan: 'Essential',
    asOf: '2025-01',
    affiliateUrl: null,
    category: 'Chatbots'
  },
  {
    slug: 'outreach',
    name: 'Outreach',
    price: 100,
    plan: 'Standard',
    asOf: '2025-01',
    affiliateUrl: null,
    category: 'Sales Engagement'
  },
  {
    slug: 'salesloft',
    name: 'SalesLoft',
    price: 125,
    plan: 'Essentials',
    asOf: '2025-01',
    affiliateUrl: null,
    category: 'Sales Engagement'
  },
  {
    slug: 'heygen',
    name: 'HeyGen',
    price: 29,
    plan: 'Creator',
    asOf: '2025-01',
    affiliateUrl: null,
    category: 'Video'
  },
  {
    slug: 'd-id',
    name: 'D-ID',
    price: 49,
    plan: 'Lite',
    asOf: '2025-01',
    affiliateUrl: null,
    category: 'Video'
  },
  {
    slug: 'clay',
    name: 'Clay',
    price: 149,
    plan: 'Starter',
    asOf: '2025-01',
    affiliateUrl: null,
    category: 'Lead Gen'
  },
  {
    slug: 'leadiq',
    name: 'LeadIQ',
    price: 45,
    plan: 'Essential',
    asOf: '2025-01',
    affiliateUrl: null,
    category: 'Lead Gen'
  },
  {
    slug: 'clearbit',
    name: 'Clearbit',
    price: 99,
    plan: 'Growth',
    asOf: '2025-01',
    affiliateUrl: null,
    category: 'Data Enrichment'
  },
  {
    slug: 'lusha',
    name: 'Lusha',
    price: 49,
    plan: 'Pro',
    asOf: '2025-01',
    affiliateUrl: null,
    category: 'Lead Gen'
  },
  {
    slug: 'manychat',
    name: 'ManyChat',
    price: 15,
    plan: 'Pro',
    asOf: '2025-01',
    affiliateUrl: null,
    category: 'Chatbots'
  },
  {
    slug: 'pipedrive',
    name: 'Pipedrive',
    price: 12,
    plan: 'Essential',
    asOf: '2025-01',
    affiliateUrl: null,
    category: 'CRM/Sales'
  },
  {
    slug: 'qualified',
    name: 'Qualified',
    price: 3000,
    plan: 'Growth',
    asOf: '2025-01',
    affiliateUrl: null,
    category: 'Conversational Sales'
  },
  {
    slug: 'zoho-crm',
    name: 'Zoho CRM',
    price: 14,
    plan: 'Standard',
    asOf: '2025-01',
    affiliateUrl: null,
    category: 'CRM/Sales'
  },
  {
    slug: 'bombbomb',
    name: 'BombBomb',
    price: 33,
    plan: 'Essentials',
    asOf: '2025-01',
    affiliateUrl: null,
    category: 'Video Email'
  },
  {
    slug: 'writesonic',
    name: 'Writesonic',
    price: 19,
    plan: 'Small Team',
    asOf: '2025-01',
    affiliateUrl: null,
    category: 'Writing'
  },
  {
    slug: 'surfer',
    name: 'Surfer SEO',
    price: 89,
    plan: 'Essential',
    asOf: '2025-01',
    affiliateUrl: null,
    category: 'SEO'
  },
  {
    slug: 'semrush',
    name: 'Semrush',
    price: 139,
    plan: 'Pro',
    asOf: '2025-01',
    affiliateUrl: null,
    category: 'SEO'
  },
  {
    slug: 'ahrefs',
    name: 'Ahrefs',
    price: 99,
    plan: 'Lite',
    asOf: '2025-01',
    affiliateUrl: null,
    category: 'SEO'
  },
  {
    slug: 'canva',
    name: 'Canva',
    price: 15,
    plan: 'Pro',
    asOf: '2025-01',
    affiliateUrl: null,
    category: 'Design'
  },
  {
    slug: 'figma',
    name: 'Figma',
    price: 15,
    plan: 'Professional',
    asOf: '2025-01',
    affiliateUrl: null,
    category: 'Design'
  },
  {
    slug: 'notion',
    name: 'Notion',
    price: 10,
    plan: 'Plus',
    asOf: '2025-01',
    affiliateUrl: null,
    category: 'Productivity'
  },
  {
    slug: 'clickup',
    name: 'ClickUp',
    price: 9,
    plan: 'Unlimited',
    asOf: '2025-01',
    affiliateUrl: null,
    category: 'Project Management'
  },
  {
    slug: 'monday',
    name: 'Monday.com',
    price: 12,
    plan: 'Basic',
    asOf: '2025-01',
    affiliateUrl: null,
    category: 'Project Management'
  },
  {
    slug: 'asana',
    name: 'Asana',
    price: 13,
    plan: 'Starter',
    asOf: '2025-01',
    affiliateUrl: null,
    category: 'Project Management'
  },
  {
    slug: 'slack',
    name: 'Slack',
    price: 7,
    plan: 'Pro',
    asOf: '2025-01',
    affiliateUrl: null,
    category: 'Communication'
  },
  {
    slug: 'zoom',
    name: 'Zoom',
    price: 15,
    plan: 'Pro',
    asOf: '2025-01',
    affiliateUrl: null,
    category: 'Video Conferencing'
  },
  {
    slug: 'midjourney',
    name: 'Midjourney',
    price: 10,
    plan: 'Basic',
    asOf: '2025-01',
    affiliateUrl: null,
    category: 'AI Art'
  },
  {
    slug: 'github-copilot',
    name: 'GitHub Copilot',
    price: 10,
    plan: 'Individual',
    asOf: '2025-01',
    affiliateUrl: null,
    category: 'Dev Tools'
  },
  {
    slug: 'grammarly',
    name: 'Grammarly',
    price: 12,
    plan: 'Premium',
    asOf: '2025-01',
    affiliateUrl: null,
    category: 'Writing'
  },
  {
    slug: 'mailchimp',
    name: 'Mailchimp',
    price: 20,
    plan: 'Essentials',
    asOf: '2025-01',
    affiliateUrl: null,
    category: 'Email Marketing'
  }
]

// Shuffle function for game randomization
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}