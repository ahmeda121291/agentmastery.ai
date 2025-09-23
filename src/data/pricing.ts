// Pricing data for comparison calculators
// Note: These are placeholder estimates for calculation purposes
// Actual pricing may vary based on plan details and negotiations

export type ToolCategory =
  | "Database"
  | "Sales Engagement"
  | "CRM"
  | "Video"
  | "Writing/SEO"
  | "Chatbots"

export interface ToolPricing {
  name: string
  slug: string
  category: ToolCategory
  seatMonthly: number
  dataAddOnMonthly?: number
  notes?: string[]
  affiliateUrl?: string
  minSeats?: number
  features?: string[]
}

export const PRICING: ToolPricing[] = [
  // Database Tools
  {
    name: "ZoomInfo",
    slug: "zoominfo",
    category: "Database",
    seatMonthly: 1250,
    dataAddOnMonthly: 200,
    notes: ["Premium B2B DB", "Intent", "Technographics"],
    minSeats: 3,
    features: [
      'Premium B2B Database',
      'Intent Data',
      'Technographics',
      'Org Charts',
      'Workflow Automation'
    ]
  },
  {
    name: "Apollo",
    slug: "apollo",
    category: "Database",
    seatMonthly: 59,
    dataAddOnMonthly: 30,
    notes: ["Prospecting", "Email", "Dialer"],
    affiliateUrl: 'https://get.apollo.io/qq0iw5w2fskf',
    features: [
      '275M+ Contacts',
      'Email Sequencing',
      'Chrome Extension',
      'CRM Integration',
      'Basic Intent Signals'
    ]
  },
  {
    name: "Clay",
    slug: "clay",
    category: "Database",
    seatMonthly: 149,
    notes: ["Enrichment", "Workflows"],
    features: [
      'Data Enrichment',
      'Workflow Automation',
      'API Integrations',
      'Custom Scrapers'
    ]
  },
  {
    name: "LeadIQ",
    slug: "leadiq",
    category: "Database",
    seatMonthly: 120,
    notes: ["Capture", "Enrich"],
    features: [
      'Contact Capture',
      'CRM Sync',
      'Email Finder',
      'Data Verification'
    ]
  },
  {
    name: "Lusha",
    slug: "lusha",
    category: "Database",
    seatMonthly: 79,
    notes: ["Contact Data", "Chrome Extension"],
    features: [
      'Direct Dials',
      'Email Finder',
      'Chrome Extension',
      'CRM Integration'
    ]
  },
  {
    name: "Clearbit",
    slug: "clearbit",
    category: "Database",
    seatMonthly: 199,
    notes: ["Enrichment", "Intent"],
    features: [
      'Company Data',
      'Contact Enrichment',
      'Intent Signals',
      'API Access'
    ]
  },

  // Sales Engagement Tools
  {
    name: "Close",
    slug: "close",
    category: "Sales Engagement",
    seatMonthly: 99,
    notes: ["Sequences", "Dialer"],
    affiliateUrl: 'https://refer.close.com/lvdqjdm97t92-fetl0j',
    features: [
      'Built-in Calling',
      'Email & SMS',
      'Pipeline Management',
      'Reporting',
      'Workflow Automation'
    ]
  },
  {
    name: "Salesloft",
    slug: "salesloft",
    category: "Sales Engagement",
    seatMonthly: 125,
    notes: ["Sequences", "Analytics"],
    features: [
      'Cadence Management',
      'Call Recording',
      'Email Tracking',
      'Analytics Dashboard'
    ]
  },
  {
    name: "Outreach",
    slug: "outreach",
    category: "Sales Engagement",
    seatMonthly: 130,
    notes: ["Sequences", "AI Coach"],
    features: [
      'Multi-channel Sequences',
      'AI Coaching',
      'Revenue Intelligence',
      'Forecasting'
    ]
  },
  {
    name: "SmartLead",
    slug: "smartlead",
    category: "Sales Engagement",
    seatMonthly: 39,
    notes: ["Cold Email", "Warmup"],
    affiliateUrl: 'https://smartlead.ai/?via=masteryagent',
    features: [
      'Unlimited Email Warmup',
      'Multi-inbox Rotation',
      'AI Personalization',
      'Email Validation',
      'Campaign Analytics'
    ]
  },
  {
    name: "Reply.io",
    slug: "reply",
    category: "Sales Engagement",
    seatMonthly: 70,
    notes: ["Multichannel", "AI"],
    features: [
      'Email & LinkedIn',
      'AI Assistant',
      'Team Collaboration',
      'CRM Sync'
    ]
  },
  {
    name: "Instantly",
    slug: "instantly",
    category: "Sales Engagement",
    seatMonthly: 37,
    notes: ["Cold Email", "Deliverability"],
    features: [
      'Email Warmup',
      'Campaign Builder',
      'Inbox Rotation',
      'Analytics'
    ]
  },

  // CRM Tools
  {
    name: "HubSpot",
    slug: "hubspot",
    category: "CRM",
    seatMonthly: 50,
    notes: ["CRM Core", "Free Tier"],
    features: [
      'Deal Pipeline',
      'Email Tracking',
      'Meeting Scheduler',
      'Live Chat',
      'Basic Automation'
    ]
  },
  {
    name: "Salesforce",
    slug: "salesforce",
    category: "CRM",
    seatMonthly: 150,
    dataAddOnMonthly: 50,
    notes: ["Platform", "Customizable"],
    minSeats: 5,
    features: [
      'Full CRM Suite',
      'Custom Objects',
      'Process Builder',
      'Advanced Reports',
      'API Access'
    ]
  },
  {
    name: "Pipedrive",
    slug: "pipedrive",
    category: "CRM",
    seatMonthly: 49,
    notes: ["Visual Pipeline", "Simple"],
    features: [
      'Visual Sales Pipeline',
      'Activity Reminders',
      'Email Integration',
      'Mobile App'
    ]
  },
  {
    name: "Monday Sales",
    slug: "monday",
    category: "CRM",
    seatMonthly: 40,
    notes: ["Flexible", "Visual"],
    features: [
      'Customizable Boards',
      'Automation',
      'Timeline View',
      'Forms'
    ]
  },
  {
    name: "Zoho CRM",
    slug: "zoho",
    category: "CRM",
    seatMonthly: 30,
    notes: ["Affordable", "Full-featured"],
    features: [
      'Sales Automation',
      'Analytics',
      'Workflow Rules',
      'Multi-channel'
    ]
  },

  // Video Tools
  {
    name: "Synthesia",
    slug: "synthesia",
    category: "Video",
    seatMonthly: 30,
    notes: ["AI Video", "Avatars"],
    features: [
      'AI Avatars',
      '120+ Languages',
      'Custom Avatars',
      'Templates'
    ]
  },
  {
    name: "HeyGen",
    slug: "heygen",
    category: "Video",
    seatMonthly: 29,
    notes: ["AI Avatar", "Voice Clone"],
    features: [
      'AI Avatars',
      'Voice Cloning',
      'Video Translation',
      'API Access'
    ]
  },
  {
    name: "Loom",
    slug: "loom",
    category: "Video",
    seatMonthly: 15,
    notes: ["Screen Recording", "Async"],
    features: [
      'Screen Recording',
      'Webcam',
      'Instant Sharing',
      'Comments'
    ]
  },
  {
    name: "Vidyard",
    slug: "vidyard",
    category: "Video",
    seatMonthly: 29,
    notes: ["Sales Video", "Analytics"],
    features: [
      'Video Hosting',
      'Email Gates',
      'Analytics',
      'CRM Integration'
    ]
  },
  {
    name: "BombBomb",
    slug: "bombbomb",
    category: "Video",
    seatMonthly: 39,
    notes: ["Video Email", "Tracking"],
    features: [
      'Video Email',
      'Screen Recording',
      'Tracking',
      'Mobile App'
    ]
  },

  // Writing/SEO Tools
  {
    name: "Jasper",
    slug: "jasper",
    category: "Writing/SEO",
    seatMonthly: 39,
    notes: ["AI Writing", "Templates"],
    features: [
      'AI Content Generation',
      '50+ Templates',
      'Brand Voice',
      'SEO Mode'
    ]
  },
  {
    name: "AISEO",
    slug: "aiseo",
    category: "Writing/SEO",
    seatMonthly: 29,
    notes: ["SEO Writing", "Optimization"],
    features: [
      'SEO-Optimized Content',
      'Readability Analysis',
      'Keyword Research',
      'Multi-language'
    ]
  },
  {
    name: "Copy.ai",
    slug: "copy-ai",
    category: "Writing/SEO",
    seatMonthly: 36,
    notes: ["Copywriting", "Templates"],
    features: [
      '90+ Templates',
      'Brand Voice',
      'Collaboration',
      'API Access'
    ]
  },
  {
    name: "Writesonic",
    slug: "writesonic",
    category: "Writing/SEO",
    seatMonthly: 19,
    notes: ["AI Writer", "Affordable"],
    features: [
      'Article Writer',
      'Product Descriptions',
      'Ad Copy',
      'Landing Pages'
    ]
  },
  {
    name: "SurferSEO",
    slug: "surfer",
    category: "Writing/SEO",
    seatMonthly: 89,
    notes: ["SEO Analysis", "Optimization"],
    features: [
      'Content Editor',
      'SERP Analysis',
      'Keyword Research',
      'Content Audit'
    ]
  },

  // Chatbot Tools
  {
    name: "Intercom",
    slug: "intercom",
    category: "Chatbots",
    seatMonthly: 65,
    notes: ["Support AI", "Inbox"],
    features: [
      'AI Chatbot',
      'Help Center',
      'Team Inbox',
      'Product Tours'
    ]
  },
  {
    name: "Drift",
    slug: "drift",
    category: "Chatbots",
    seatMonthly: 50,
    notes: ["Conv. Marketing", "Sales"],
    features: [
      'Conversational AI',
      'Meeting Booking',
      'Email Fallback',
      'ABM Features'
    ]
  },
  {
    name: "Qualified",
    slug: "qualified",
    category: "Chatbots",
    seatMonthly: 250,
    notes: ["B2B Sales", "Pipeline"],
    features: [
      'Sales Chat',
      'Meeting Booking',
      'Salesforce Native',
      'Visitor Intel'
    ]
  },
  {
    name: "Tidio",
    slug: "tidio",
    category: "Chatbots",
    seatMonthly: 25,
    notes: ["Simple", "Affordable"],
    features: [
      'Live Chat',
      'Chatbots',
      'Email Integration',
      'Mobile App'
    ]
  },
  {
    name: "ManyChat",
    slug: "manychat",
    category: "Chatbots",
    seatMonthly: 15,
    notes: ["Social Media", "Marketing"],
    features: [
      'Facebook Messenger',
      'Instagram DM',
      'SMS',
      'Email'
    ]
  }
]

// Get tools by category
export function getToolsByCategory(category: ToolCategory): ToolPricing[] {
  return PRICING.filter(tool => tool.category === category)
}

// Get all categories
export function getAllCategories(): ToolCategory[] {
  return Array.from(new Set(PRICING.map(tool => tool.category)))
}

// SmartLead performance uplift estimates (backward compatibility)
export const smartLeadUplift = {
  deliveryRate: {
    min: 10,
    max: 30,
    default: 20
  },
  replyRate: {
    min: 15,
    max: 50,
    default: 30
  },
  features: [
    'Unlimited email warmup prevents spam folder',
    'Multi-inbox rotation maintains sender reputation',
    'AI personalization increases engagement',
    'Built-in email validation reduces bounces'
  ]
}

// Industry benchmarks for email outreach
export const emailBenchmarks = {
  deliveryRate: {
    poor: 70,
    average: 85,
    good: 95
  },
  openRate: {
    poor: 15,
    average: 25,
    good: 40
  },
  replyRate: {
    poor: 1,
    average: 3,
    good: 8
  },
  meetingRate: {
    poor: 10,
    average: 20,
    good: 35
  },
  closeRate: {
    poor: 5,
    average: 15,
    good: 30
  }
}

// Legacy support - map old pricingData format
export const pricingData: Record<string, any> = PRICING.reduce((acc, tool) => {
  acc[tool.slug] = {
    ...tool,
    basePricePerSeat: tool.seatMonthly,
    dataAddonPerSeat: tool.dataAddOnMonthly || 0
  }
  return acc
}, {} as Record<string, any>)