export interface Tool {
  slug: string
  name: string
  affiliateUrl: string
  category: string
  blurb: string
  pros: string[]
  cons: string[]
  pricingNote: string
  badges?: string[]
  promo?: string
  nearestCompetitorSlug?: string
  riskWarnings?: string[]
  editorNote?: string
  faq?: Array<{
    question: string
    answer: string
  }>
}

export const tools: Tool[] = [
  {
    slug: 'aiseo',
    name: 'AISEO',
    affiliateUrl: 'https://aiseo.ai/?fpr=agentmastery',
    category: 'Writing/SEO',
    blurb: 'AI-powered content generation and SEO optimization platform that creates long-form articles and blog posts. Combines keyword research with content creation to improve search rankings.',
    pros: [
      'One-click article generation with SEO focus',
      'Built-in readability and SEO scoring',
      'Supports multiple languages'
    ],
    cons: [
      'Generated content may need editing for brand voice',
      'Limited customization for technical topics'
    ],
    pricingNote: '$19-$99/month',
    badges: ['SEO-Optimized', 'Multi-language'],
    nearestCompetitorSlug: 'jasper',
    editorNote: 'Best for SEO-focused content creators who need quick, optimized articles. The built-in SEO scoring saves hours of optimization work.'
  },
  {
    slug: 'synthesia',
    name: 'Synthesia',
    affiliateUrl: 'https://www.synthesia.io/?via=agentmastery',
    category: 'Video',
    blurb: 'Create professional videos with AI avatars and voiceovers without cameras or studios. Transform text into engaging video content in minutes with customizable presenters.',
    pros: [
      '140+ AI avatars and 120+ languages',
      'No filming equipment needed',
      'Professional templates and brand customization'
    ],
    cons: [
      'Avatars can feel less personal than real presenters',
      'Expensive for frequent video production'
    ],
    pricingNote: '$22-$67/month',
    badges: ['Enterprise-Ready', 'No-Camera'],
    nearestCompetitorSlug: 'd-id',
    promo: 'Get 20% off first 3 months',
    editorNote: 'Industry leader in AI video generation. Perfect for training videos, product demos, and multilingual content at scale.'
  },
  {
    slug: 'smartlead',
    name: 'SmartLead',
    affiliateUrl: 'https://smartlead.ai/?via=masteryagent',
    category: 'Outbound/Campaigns',
    blurb: 'Cold email automation platform with unlimited email warmup and AI personalization. Manages multiple sending accounts and campaigns from a single dashboard.',
    pros: [
      'Unlimited email warmup included',
      'Multi-inbox rotation prevents spam flags',
      'Built-in email validation and bounce handling'
    ],
    cons: [
      'Learning curve for advanced features',
      'Limited CRM integrations'
    ],
    pricingNote: '$39-$94/month',
    badges: ['Unlimited Warmup', 'Multi-Inbox'],
    nearestCompetitorSlug: 'instantly',
    editorNote: 'Top choice for cold email outreach. The unlimited warmup and multi-inbox rotation give you a real edge in deliverability.'
  },
  {
    slug: 'lovable',
    name: 'Lovable',
    affiliateUrl: 'https://lovable.dev?via=agentmastery',
    category: 'Dev/Builders',
    blurb: 'AI-powered full-stack development platform that turns ideas into working web applications. Build production-ready apps through natural language without writing code.',
    pros: [
      'Generates complete full-stack applications',
      'Real-time preview and editing',
      'Export code or deploy directly'
    ],
    cons: [
      'Limited to web applications',
      'Complex logic may require manual coding'
    ],
    pricingNote: 'Free tier, $20+/month',
    badges: ['No-Code', 'Full-Stack'],
    nearestCompetitorSlug: 'v0',
    editorNote: 'Revolutionary for rapid prototyping. Builds surprisingly sophisticated apps from simple prompts - perfect for MVPs.'
  },
  {
    slug: 'customgpt',
    name: 'CustomGPT',
    affiliateUrl: 'https://customgpt.ai/?fpr=agentmastery',
    category: 'Chatbots',
    blurb: 'Build custom ChatGPT-powered chatbots trained on your business data and documents. Deploy intelligent assistants without coding that understand your specific domain.',
    pros: [
      'Easy document and website ingestion',
      'No coding required for deployment',
      'Multiple integration options'
    ],
    cons: [
      'Limited conversation flow customization',
      'Token limits on lower tiers'
    ],
    pricingNote: '$89-$449/month',
    badges: ['GPT-Powered', 'No-Code'],
    nearestCompetitorSlug: 'chatsimple',
    editorNote: 'Best for knowledge-heavy businesses. Excels at ingesting documentation and providing accurate, context-aware responses.'
  },
  {
    slug: 'chatsimple',
    name: 'ChatSimple',
    affiliateUrl: 'https://www.chatsimple.ai?via=agentmastery',
    category: 'Chatbots',
    blurb: 'Convert website visitors into customers with AI chatbots that speak 175+ languages. Quick setup with lead capture, appointment booking, and CRM integration.',
    pros: [
      '5-minute setup with website crawler',
      'Multilingual support out of the box',
      'Built-in lead qualification'
    ],
    cons: [
      'Template designs could be more modern',
      'Analytics dashboard is basic'
    ],
    pricingNote: '$29-$99/month',
    badges: ['175+ Languages', 'Quick Setup'],
    nearestCompetitorSlug: 'customgpt',
    promo: 'First month 50% off',
    editorNote: 'Fastest setup in the category. Great for SMBs who need multilingual support without complexity.'
  },
  {
    slug: 'outranking',
    name: 'OutRanking',
    affiliateUrl: 'https://www.outranking.io?via=agentmastery',
    category: 'Writing/SEO',
    blurb: 'SEO content optimization software that analyzes SERP data to create winning content. Uses AI to generate outlines and content that outperforms competitors.',
    pros: [
      'Real-time SERP analysis and scoring',
      'Automatic internal linking suggestions',
      'Content gap identification'
    ],
    cons: [
      'Steep learning curve for beginners',
      'Can be slow with large documents',
      'Limited keyword tracking features'
    ],
    pricingNote: 'Plans from $79/month for solopreneurs',
    badges: ['SERP Analysis', 'AI Outlines']
  },
  {
    slug: 'getgenie',
    name: 'GetGenie',
    affiliateUrl: 'https://getgenie.ai/agentmastery/?rui=3361',
    category: 'Writing/SEO',
    blurb: 'WordPress-integrated AI writing assistant with built-in SEO features. Generate and optimize content directly in WordPress with competitor analysis and SERP insights.',
    pros: [
      'Native WordPress integration',
      'One-click blog post generation',
      'Competitor content analysis'
    ],
    cons: [
      'WordPress-only limits flexibility',
      'Credit system can be restrictive',
      'Occasional formatting issues'
    ],
    pricingNote: 'From $19/month, lifetime deals available',
    badges: ['WordPress Native', 'SEO Suite']
  },
  {
    slug: 'ocean',
    name: 'Ocean.io',
    affiliateUrl: 'https://www.ocean.io?aff=L4njck497fJg',
    category: 'Data/Prospecting',
    blurb: 'B2B data platform providing company and contact intelligence for sales teams. Access verified business emails and build targeted lead lists with advanced filters.',
    pros: [
      'High-quality verified B2B data',
      'Advanced company technographic filters',
      'CRM integration and enrichment'
    ],
    cons: [
      'Expensive for small teams',
      'Limited coverage in some regions',
      'Credits expire monthly'
    ],
    pricingNote: 'Custom pricing, typically starts at $500/month',
    badges: ['B2B Focused', 'Verified Data']
  },
  {
    slug: 'beehiiv',
    name: 'Beehiiv',
    affiliateUrl: 'https://www.beehiiv.com?via=agentmastery',
    category: 'Email/Newsletters',
    blurb: 'Newsletter platform built for growth with native monetization and referral features. Created by former Morning Brew team for serious newsletter publishers.',
    pros: [
      'Built-in referral program system',
      'Native ad network for monetization',
      'Advanced analytics and segmentation'
    ],
    cons: [
      'Limited design customization options',
      'Migration tools could be better',
      'Higher pricing than basic ESP tools'
    ],
    pricingNote: 'Free up to 2,500 subscribers, then $42/month',
    badges: ['Referral System', 'Monetization']
  },
  {
    slug: 'hypefury',
    name: 'Hypefury',
    affiliateUrl: 'https://hypefury.com/?via=agentmastery',
    category: 'Social',
    blurb: 'Social media scheduling and automation tool focused on Twitter/X growth. Auto-repost best content, create threads, and grow your following on autopilot.',
    pros: [
      'Automatic reposting of top tweets',
      'Thread creation and scheduling',
      'Engagement automation features'
    ],
    cons: [
      'Primarily Twitter/X focused',
      'Auto-DM can feel spammy',
      'Limited analytics compared to enterprise tools'
    ],
    pricingNote: 'From $19/month for personal brand',
    badges: ['Twitter Focus', 'Auto-Engage']
  },
  {
    slug: 'elevenlabs',
    name: 'ElevenLabs',
    affiliateUrl: 'https://try.elevenlabs.io/agentmastery',
    category: 'Audio',
    blurb: 'Industry-leading AI voice generation with natural-sounding speech synthesis. Create realistic voiceovers, clone voices, and generate audio content in multiple languages.',
    pros: [
      'Most realistic AI voices available',
      'Voice cloning with minimal samples',
      'Extensive language support'
    ],
    cons: [
      'Character limits on lower tiers',
      'Voice cloning requires verification',
      'Can be expensive for long-form content'
    ],
    pricingNote: 'Free tier available, paid from $5/month',
    badges: ['Best Quality', 'Voice Clone']
  },
  {
    slug: 'warmy',
    name: 'Warmy',
    affiliateUrl: 'https://warmy.io?fpr=agentmastery',
    category: 'Email/Warmup',
    blurb: 'Automated email warmup service that improves deliverability and sender reputation. Gradually increases sending volume while monitoring blacklists and inbox placement.',
    pros: [
      'Fully automated warmup process',
      'Real inbox placement monitoring',
      'Works with all major ESP providers'
    ],
    cons: [
      'Takes weeks to see full results',
      'No direct campaign sending features',
      'Limited control over warmup conversations'
    ],
    pricingNote: 'From $49/month per mailbox',
    badges: ['Auto-Warmup', 'Deliverability']
  },
  {
    slug: 'apollo',
    name: 'Apollo',
    affiliateUrl: 'https://get.apollo.io/qq0iw5w2fskf',
    category: 'Data/Prospecting',
    blurb: 'All-in-one sales intelligence platform with 275M+ contacts and engagement tools. Find leads, enrich data, and run multi-channel outbound campaigns from one platform.',
    pros: [
      'Massive B2B contact database',
      'Built-in email sequencing',
      'Chrome extension for LinkedIn'
    ],
    cons: [
      'Data accuracy varies by region',
      'UI can be overwhelming for new users',
      'Email sending limits on basic plans'
    ],
    pricingNote: 'Free tier available, paid from $49/user/month',
    badges: ['275M+ Contacts', 'All-in-One']
  },
  {
    slug: 'scalenut',
    name: 'ScaleNut',
    affiliateUrl: 'https://scalenut.com/?fpr=agentmastery',
    category: 'Writing/SEO',
    blurb: 'AI-powered SEO and content marketing platform for the entire content lifecycle. From keyword planning to content creation and optimization with automated workflows.',
    pros: [
      'Comprehensive keyword clustering',
      'Cruise Mode for automated articles',
      'Content brief generation'
    ],
    cons: [
      'Can produce generic content',
      'Expensive for individual creators',
      'Limited fact-checking capabilities'
    ],
    pricingNote: 'From $39/month for essential features',
    badges: ['Full Lifecycle', 'Clustering']
  },
  {
    slug: 'krispcall',
    name: 'KrispCall',
    affiliateUrl: 'https://try.krispcall.com/agentmastery',
    category: 'Telephony',
    blurb: 'Cloud-based business phone system with virtual numbers in 100+ countries. Integrates with CRMs and provides call analytics for remote and distributed teams.',
    pros: [
      'Easy setup without hardware',
      'Global virtual phone numbers',
      'CRM integrations and call recording'
    ],
    cons: [
      'Call quality depends on internet',
      'Limited advanced IVR features',
      'Mobile app could be more stable'
    ],
    pricingNote: 'From $15/user/month for basic plan',
    badges: ['100+ Countries', 'Cloud-Based']
  },
  {
    slug: 'murfai',
    name: 'MurfAI',
    affiliateUrl: 'https://get.murf.ai/text-to-speech-zf1b3ywztvno',
    category: 'Audio',
    blurb: 'Professional AI voiceover platform with studio-quality voices for videos and presentations. Features voice editing, emphasis control, and background music integration.',
    pros: [
      '120+ natural-sounding voices',
      'Voice style and emphasis control',
      'Sync with video editing'
    ],
    cons: [
      'Limited voice cloning options',
      'Render times can be slow',
      'Pronunciation issues with unique terms'
    ],
    pricingNote: 'From $19/month for basic access',
    badges: ['Studio Quality', '120+ Voices']
  },
  {
    slug: 'brand24',
    name: 'Brand24',
    affiliateUrl: 'https://try.brand24.com/agentmastery',
    category: 'Monitoring',
    blurb: 'Social media monitoring tool that tracks mentions across the web in real-time. Monitor brand reputation, analyze sentiment, and identify influencers in your industry.',
    pros: [
      'Real-time mention alerts',
      'Sentiment analysis included',
      'Influencer identification features'
    ],
    cons: [
      'Historical data limited by plan',
      'Some platforms require higher tiers',
      'Alert customization could be better'
    ],
    pricingNote: 'From $79/month for individual plan',
    badges: ['Real-Time', 'Sentiment AI']
  },
  {
    slug: 'landingi',
    name: 'Landingi',
    affiliateUrl: 'https://try.landingi.com/agentmastery',
    category: 'Landing Pages',
    blurb: 'Drag-and-drop landing page builder with 400+ templates and A/B testing. Create high-converting pages without coding and integrate with marketing tools.',
    pros: [
      'Extensive template library',
      'Built-in A/B testing',
      'EventTracker for micro-conversions'
    ],
    cons: [
      'Limited design flexibility',
      'Can be slow with complex pages',
      'Basic analytics without integration'
    ],
    pricingNote: 'From $29/month for core features',
    badges: ['400+ Templates', 'A/B Testing']
  },
  {
    slug: 'zoominfo',
    name: 'ZoomInfo',
    affiliateUrl: 'https://try.zoominfo.com/agentmastery',
    category: 'Data/Prospecting',
    blurb: 'Enterprise B2B database with advanced intent data and buying signals. Identify companies researching your solutions and reach decision-makers with verified contact info.',
    pros: [
      'Most comprehensive B2B database',
      'Advanced intent and technographic data',
      'Workflow automation capabilities'
    ],
    cons: [
      'Very expensive for small businesses',
      'Requires training to use effectively',
      'Annual contracts only'
    ],
    pricingNote: 'Enterprise pricing, typically $15,000+/year',
    badges: ['Enterprise', 'Intent Data']
  },
  {
    slug: 'close',
    name: 'Close',
    affiliateUrl: 'https://refer.close.com/lvdqjdm97t92-fetl0j',
    category: 'CRM',
    blurb: 'Inside sales CRM with built-in calling, emailing, and SMS. Designed for SMBs and startups to manage leads and close deals without switching between tools.',
    pros: [
      'Built-in multichannel communication',
      'Smart views and workflow automation',
      'Excellent reporting and analytics'
    ],
    cons: [
      'Limited customization options',
      'No free tier available',
      'Integrations could be broader'
    ],
    pricingNote: 'From $29/user/month for starter plan',
    badges: ['All-in-One', 'SMB Focus']
  },
  {
    slug: 'pictory',
    name: 'Pictory',
    affiliateUrl: 'https://pictory.ai?ref=bex2x',
    category: 'Video',
    blurb: 'Transform long-form content into short branded videos automatically. Convert blog posts, scripts, and recordings into engaging video content with AI-powered editing.',
    pros: [
      'Auto-generates videos from articles',
      'Automatic caption generation',
      'Large stock footage library'
    ],
    cons: [
      'Limited creative control',
      'Watermark on free plan',
      'Voice options are limited'
    ],
    pricingNote: 'From $19/month for starter plan',
    badges: ['Auto-Edit', 'Blog-to-Video']
  },
  {
    slug: 'motion',
    name: 'Motion',
    affiliateUrl: 'https://get.usemotion.com/63fjeh0l8zw4',
    category: 'Calendar/PM',
    blurb: 'AI-powered calendar and project management that automatically schedules your tasks. Intelligently plans your day around meetings, deadlines, and priorities.',
    pros: [
      'Automatic task scheduling',
      'Intelligent priority management',
      'Meeting scheduler included'
    ],
    cons: [
      'Steep learning curve',
      'Can over-schedule your calendar',
      'Limited team collaboration features'
    ],
    pricingNote: 'From $19/month for individuals',
    badges: ['AI Scheduling', 'Auto-Prioritize']
  },
  {
    slug: 'leadpages',
    name: 'Leadpages',
    affiliateUrl: 'https://try.leadpages.com/agentmastery',
    category: 'Landing Pages',
    blurb: 'Conversion-focused landing page platform with proven high-converting templates. Built-in conversion tools like alert bars, pop-ups, and checkout pages.',
    pros: [
      'High-converting template designs',
      'Built-in payment processing',
      'Unlimited pop-ups and alert bars'
    ],
    cons: [
      'Templates can feel dated',
      'Limited customization without coding',
      'A/B testing requires higher plan'
    ],
    pricingNote: 'From $37/month for standard plan',
    badges: ['Conversion Focus', 'Payments']
  },
  {
    slug: 'descript',
    name: 'Descript',
    affiliateUrl: 'https://get.descript.com/agentmastery',
    category: 'Audio/Video',
    blurb: 'Edit audio and video by editing text transcripts, like editing a document. Revolutionary approach to content editing with AI-powered features like voice cloning and filler word removal.',
    pros: [
      'Edit video like editing text',
      'Automatic transcript generation',
      'One-click filler word removal'
    ],
    cons: [
      'Requires decent hardware',
      'Export times can be lengthy',
      'Collaboration features are basic'
    ],
    pricingNote: 'Free tier available, paid from $12/month',
    badges: ['Text-Edit Video', 'Transcription']
  }
]

export const featuredWeekly: Tool[] = [
  tools.find(t => t.slug === 'synthesia')!,
  tools.find(t => t.slug === 'smartlead')!,
  tools.find(t => t.slug === 'elevenlabs')!,
  tools.find(t => t.slug === 'motion')!,
  tools.find(t => t.slug === 'apollo')!,
]