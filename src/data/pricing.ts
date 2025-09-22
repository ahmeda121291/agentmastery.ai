// Pricing data for comparison calculators
// Note: These are placeholder estimates for calculation purposes
// Actual pricing may vary based on plan details and negotiations

export interface ToolPricing {
  name: string
  slug: string
  affiliateUrl: string
  basePricePerSeat: number
  minSeats?: number
  dataAddonPerSeat?: number
  unlimitedDataPrice?: number
  features: string[]
}

export const pricingData: Record<string, ToolPricing> = {
  zoominfo: {
    name: 'ZoomInfo',
    slug: 'zoominfo',
    affiliateUrl: 'https://try.zoominfo.com/agentmastery',
    basePricePerSeat: 1250, // Estimated $15k/year for 12 seats = $1250/month/seat
    minSeats: 3,
    dataAddonPerSeat: 200,
    features: [
      'Premium B2B Database',
      'Intent Data',
      'Technographics',
      'Org Charts',
      'Workflow Automation'
    ]
  },
  apollo: {
    name: 'Apollo',
    slug: 'apollo',
    affiliateUrl: 'https://get.apollo.io/qq0iw5w2fskf',
    basePricePerSeat: 49, // Basic plan
    minSeats: 1,
    dataAddonPerSeat: 30, // For additional credits
    unlimitedDataPrice: 149, // Unlimited credits per seat
    features: [
      '275M+ Contacts',
      'Email Sequencing',
      'Chrome Extension',
      'CRM Integration',
      'Basic Intent Signals'
    ]
  },
  close: {
    name: 'Close',
    slug: 'close',
    affiliateUrl: 'https://refer.close.com/lvdqjdm97t92-fetl0j',
    basePricePerSeat: 29, // Starter plan
    minSeats: 1,
    dataAddonPerSeat: 0,
    features: [
      'Built-in Calling',
      'Email & SMS',
      'Pipeline Management',
      'Reporting',
      'Workflow Automation'
    ]
  },
  salesforce: {
    name: 'Salesforce',
    slug: 'salesforce',
    affiliateUrl: '', // No affiliate
    basePricePerSeat: 75, // Professional plan
    minSeats: 5,
    dataAddonPerSeat: 50, // Data.com addon estimate
    features: [
      'Full CRM Suite',
      'Custom Objects',
      'Process Builder',
      'Advanced Reports',
      'API Access'
    ]
  },
  hubspot: {
    name: 'HubSpot Sales',
    slug: 'hubspot',
    affiliateUrl: '', // No affiliate
    basePricePerSeat: 45, // Sales Hub Starter
    minSeats: 2,
    dataAddonPerSeat: 0,
    features: [
      'Deal Pipeline',
      'Email Tracking',
      'Meeting Scheduler',
      'Live Chat',
      'Basic Automation'
    ]
  },
  smartlead: {
    name: 'SmartLead',
    slug: 'smartlead',
    affiliateUrl: 'https://smartlead.ai/?via=masteryagent',
    basePricePerSeat: 39, // Basic plan for 2000 leads
    minSeats: 1,
    dataAddonPerSeat: 0,
    features: [
      'Unlimited Email Warmup',
      'Multi-inbox Rotation',
      'AI Personalization',
      'Email Validation',
      'Campaign Analytics'
    ]
  }
}

// SmartLead performance uplift estimates (based on case studies)
export const smartLeadUplift = {
  deliveryRate: {
    min: 10,
    max: 30,
    default: 20 // +20% improvement in delivery rate
  },
  replyRate: {
    min: 15,
    max: 50,
    default: 30 // +30% improvement in reply rate
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