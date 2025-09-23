#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import { PRICING } from '../src/data/pricing'

// High-priority comparison pairs with pre-written content
const STATIC_COMPARISONS = [
  {
    toolA: 'apollo',
    toolB: 'zoominfo',
    content: {
      intro: "Apollo and ZoomInfo are two leading B2B sales intelligence platforms that help teams find and connect with potential customers. While both offer comprehensive contact databases and sales engagement features, they differ significantly in pricing, ease of use, and target market.",
      toolAOverview: "Apollo combines a massive B2B database with built-in sales engagement tools at an affordable price point. It's designed for startups and SMBs looking for an all-in-one prospecting solution. Apollo offers email sequencing, a Chrome extension, and CRM integration alongside its 275M+ contact database.",
      toolBOverview: "ZoomInfo is the premium enterprise solution for B2B data and sales intelligence. It offers the most comprehensive and accurate B2B database with advanced features like intent data, technographics, and org charts. ZoomInfo is built for enterprise sales teams that need the highest quality data and sophisticated analytics.",
      comparison: "The main difference lies in pricing and target market. Apollo starts at $59/user/month while ZoomInfo typically costs $1,250+/user/month with a 3-seat minimum. Apollo is more accessible for smaller teams, while ZoomInfo offers superior data quality and enterprise features. Apollo includes built-in sales engagement, while ZoomInfo focuses on data intelligence. For ROI, Apollo works best for high-volume outreach, while ZoomInfo excels at targeted enterprise selling.",
      verdict: "Choose Apollo if you're a startup or SMB looking for affordable prospecting with integrated engagement tools. Choose ZoomInfo if you're an enterprise team that needs premium data quality, intent signals, and can justify the higher investment.",
      metaDescription: "Compare Apollo vs ZoomInfo: pricing, features, and data quality. Apollo at $59/mo vs ZoomInfo at $1,250/mo - find the right B2B database for your team.",
      pros: {
        toolA: ["Affordable at $59/user/month", "Built-in email sequencing and dialer", "No minimum seats required"],
        toolB: ["Most accurate B2B data available", "Advanced intent and technographic data", "Enterprise-grade integrations"]
      },
      cons: {
        toolA: ["Lower data accuracy than premium tools", "Limited intent data capabilities"],
        toolB: ["Very expensive ($15,000+ annual minimum)", "3-seat minimum requirement"]
      }
    }
  },
  {
    toolA: 'jasper',
    toolB: 'copy-ai',
    content: {
      intro: "Jasper and Copy.ai are leading AI writing assistants that help marketers and content creators produce copy at scale. Both leverage advanced language models but target different use cases and user segments with distinct features and pricing.",
      toolAOverview: "Jasper is positioned as the premium AI writing platform for businesses, offering advanced features like brand voice, team collaboration, and 50+ templates. It integrates with popular marketing tools and provides SEO mode for content optimization. Jasper is designed for content teams and agencies producing high-volume marketing copy.",
      toolBOverview: "Copy.ai focuses on simplicity and accessibility, making AI writing available to everyone with 90+ templates and a generous free tier. It excels at short-form copy like ads, emails, and social posts. Copy.ai offers brand voice features and API access at competitive pricing for growing businesses.",
      comparison: "Jasper costs $39/month versus Copy.ai at $36/month, making them similarly priced. Jasper offers more advanced features for long-form content and SEO optimization, while Copy.ai provides more templates and easier onboarding. Jasper has better team collaboration features, while Copy.ai has a more generous free plan. Both offer brand voice customization, but Jasper's is more sophisticated.",
      verdict: "Choose Jasper if you need advanced content creation features, SEO optimization, and team collaboration. Choose Copy.ai if you want more templates, easier setup, and primarily create short-form marketing copy.",
      metaDescription: "Jasper vs Copy.ai comparison: Jasper at $39/mo offers advanced features while Copy.ai at $36/mo provides 90+ templates. Find your ideal AI writer.",
      pros: {
        toolA: ["Advanced SEO optimization features", "Better for long-form content", "Superior team collaboration"],
        toolB: ["90+ templates available", "More generous free plan", "Easier to get started"]
      },
      cons: {
        toolA: ["Steeper learning curve", "More expensive for basic needs"],
        toolB: ["Limited long-form capabilities", "Fewer integration options"]
      }
    }
  },
  {
    toolA: 'hubspot',
    toolB: 'salesforce',
    content: {
      intro: "HubSpot and Salesforce represent two different philosophies in CRM: HubSpot's all-in-one inbound marketing platform versus Salesforce's powerful, customizable enterprise platform. The choice often comes down to company size, technical resources, and growth trajectory.",
      toolAOverview: "HubSpot CRM offers a user-friendly, integrated platform that combines CRM, marketing, sales, and service hubs. It's known for exceptional ease of use, transparent pricing, and a generous free tier. HubSpot excels at inbound marketing automation and provides everything growing businesses need out of the box.",
      toolBOverview: "Salesforce is the world's leading CRM platform, offering unlimited customization and scalability for enterprise organizations. It provides advanced features through its cloud ecosystem, extensive third-party integrations, and powerful automation via Process Builder and Flow. Salesforce is built for complex sales processes and large teams.",
      comparison: "HubSpot starts at $50/user/month with no hidden costs, while Salesforce begins at $150/user/month but often requires additional investments in implementation and add-ons. HubSpot is ready to use immediately, while Salesforce typically needs customization. HubSpot suits companies up to 1000 employees, while Salesforce scales infinitely. HubSpot includes marketing automation natively, while Salesforce requires Pardot or Marketing Cloud.",
      verdict: "Choose HubSpot if you want an easy-to-use, all-in-one platform with transparent pricing and built-in marketing tools. Choose Salesforce if you need unlimited customization, have complex processes, and have the resources for implementation and maintenance.",
      metaDescription: "HubSpot vs Salesforce CRM comparison: HubSpot at $50/mo for simplicity vs Salesforce at $150/mo for customization. Which CRM fits your business?",
      pros: {
        toolA: ["Intuitive interface with minimal training needed", "All-in-one marketing, sales, and service", "Transparent, predictable pricing"],
        toolB: ["Unlimited customization possibilities", "Massive ecosystem of apps and integrations", "Scales to any enterprise size"]
      },
      cons: {
        toolA: ["Limited customization compared to Salesforce", "Less suitable for complex enterprise needs"],
        toolB: ["Steep learning curve and complexity", "Expensive with hidden implementation costs"]
      }
    }
  },
  {
    toolA: 'instantly',
    toolB: 'smartlead',
    content: {
      intro: "Instantly and SmartLead are specialized cold email platforms designed for high-volume outbound campaigns. Both focus on deliverability and scale, but offer different approaches to email warming, campaign management, and pricing.",
      toolAOverview: "Instantly provides a streamlined cold email platform with built-in email warmup, campaign analytics, and inbox rotation. It's known for its simple interface and competitive pricing at $37/month. Instantly focuses on the essentials of cold email without unnecessary complexity.",
      toolBOverview: "SmartLead offers a comprehensive cold email system with unlimited email warmup, AI personalization, and multi-channel capabilities. At $39/month, it provides advanced features like subsequences, A/B testing, and white-label options for agencies. SmartLead emphasizes maximizing reply rates through intelligent automation.",
      comparison: "Both tools are similarly priced ($37 vs $39/month) but differ in features. SmartLead includes unlimited email warmup in all plans, while Instantly may limit warmup seats. SmartLead offers more advanced personalization and subsequence features, while Instantly has a cleaner, simpler interface. SmartLead provides white-label options for agencies, while Instantly focuses on individual users and small teams.",
      verdict: "Choose Instantly if you want a simple, straightforward cold email tool with essential features. Choose SmartLead if you need advanced personalization, unlimited warmup, or run an agency requiring white-label capabilities.",
      metaDescription: "Instantly vs SmartLead: Compare cold email platforms. Instantly at $37/mo for simplicity vs SmartLead at $39/mo with unlimited warmup.",
      pros: {
        toolA: ["Simpler, cleaner interface", "Faster setup and onboarding", "Strong deliverability focus"],
        toolB: ["Unlimited email warmup included", "Advanced AI personalization", "White-label agency options"]
      },
      cons: {
        toolA: ["Limited warmup seats on basic plans", "Fewer advanced features"],
        toolB: ["Steeper learning curve", "Can be overwhelming for beginners"]
      }
    }
  },
  {
    toolA: 'intercom',
    toolB: 'drift',
    content: {
      intro: "Intercom and Drift are leading conversational marketing platforms that help businesses engage with website visitors and customers in real-time. While both offer AI-powered chatbots and live chat, they target different use cases and customer segments.",
      toolAOverview: "Intercom is a complete customer communication platform combining live chat, help desk, and product tours. At $65/month, it offers AI-powered chatbots, a unified inbox for support teams, and comprehensive customer data. Intercom excels at the entire customer lifecycle from acquisition to support.",
      toolBOverview: "Drift pioneered conversational marketing, focusing on turning website visitors into qualified leads through intelligent chatbots. At $50/month, it offers meeting booking, email fallback, and ABM features. Drift is built specifically for B2B sales and marketing teams looking to accelerate their pipeline.",
      comparison: "Intercom is broader at $65/month, covering support, marketing, and product teams. Drift at $50/month focuses specifically on sales and marketing conversion. Intercom has better help desk features and knowledge base, while Drift excels at sales-specific features like meeting booking and account-based marketing. Intercom suits product-led companies, while Drift works best for sales-led B2B organizations.",
      verdict: "Choose Intercom if you need a complete customer communication platform spanning support, marketing, and product. Choose Drift if you're a B2B company focused on using conversational marketing to drive sales.",
      metaDescription: "Intercom vs Drift comparison: Intercom at $65/mo for complete support vs Drift at $50/mo for sales conversion. Find your ideal chat platform.",
      pros: {
        toolA: ["Complete customer communication suite", "Superior help desk features", "Product tours and onboarding"],
        toolB: ["Built for B2B sales conversion", "Advanced meeting booking", "ABM integration features"]
      },
      cons: {
        toolA: ["More expensive for basic chat", "Can be overwhelming for small teams"],
        toolB: ["Limited customer support features", "Less suitable for product companies"]
      }
    }
  },
  {
    toolA: 'synthesia',
    toolB: 'heygen',
    content: {
      intro: "Synthesia and HeyGen are leading AI video generation platforms that create professional videos using AI avatars. Both eliminate the need for cameras, actors, and studios, but offer different features, languages, and customization options.",
      toolAOverview: "Synthesia is the enterprise-grade AI video platform trusted by Fortune 500 companies. At $30/month, it offers 120+ languages, custom avatars, and professional templates. Synthesia focuses on corporate training, learning content, and marketing videos with strict content moderation.",
      toolBOverview: "HeyGen provides accessible AI video creation with innovative features like voice cloning and video translation. At $29/month, it offers realistic avatars, API access, and quick turnaround times. HeyGen appeals to content creators, marketers, and businesses needing scalable video production.",
      comparison: "Both are similarly priced ($30 vs $29/month) but target different users. Synthesia offers more languages (120+ vs 40+) and better enterprise features, while HeyGen provides voice cloning and faster rendering. Synthesia has stricter content guidelines for brand safety, while HeyGen is more flexible. Synthesia excels at corporate training videos, while HeyGen is better for marketing and social content.",
      verdict: "Choose Synthesia if you're an enterprise needing professional training videos with multiple languages and custom avatars. Choose HeyGen if you want voice cloning, video translation, and faster content creation for marketing.",
      metaDescription: "Synthesia vs HeyGen AI video comparison: Synthesia at $30/mo with 120+ languages vs HeyGen at $29/mo with voice cloning. Pick your AI video tool.",
      pros: {
        toolA: ["120+ language support", "Enterprise-grade security", "Custom avatar creation"],
        toolB: ["Voice cloning capability", "Faster video rendering", "Video translation features"]
      },
      cons: {
        toolA: ["Stricter content guidelines", "Slower rendering times"],
        toolB: ["Fewer language options", "Less enterprise features"]
      }
    }
  },
  {
    toolA: 'salesloft',
    toolB: 'outreach',
    content: {
      intro: "Salesloft and Outreach are the two dominant sales engagement platforms that help teams execute multi-channel outreach at scale. Both offer similar core features but differ in their approach to AI, analytics, and user experience.",
      toolAOverview: "Salesloft provides a sales engagement platform focused on workflow efficiency and coaching. At $125/month, it offers cadence management, call recording, and detailed analytics. Salesloft emphasizes ease of use and helping reps build better relationships through its Rhythm workflow engine.",
      toolBOverview: "Outreach positions itself as a complete revenue intelligence platform beyond just engagement. At $130/month, it includes AI-powered coaching, revenue forecasting, and advanced analytics. Outreach focuses on data-driven selling with features like sentiment analysis and deal intelligence.",
      comparison: "Pricing is nearly identical ($125 vs $130/month), but philosophies differ. Salesloft prioritizes user experience and workflow simplicity, while Outreach emphasizes AI and analytics. Salesloft has better email tools and templates, while Outreach offers superior forecasting and intelligence features. Both integrate well with CRMs, but Outreach has more native Salesforce features.",
      verdict: "Choose Salesloft if you want a user-friendly platform focused on engagement workflows and team coaching. Choose Outreach if you need advanced AI features, revenue intelligence, and predictive analytics.",
      metaDescription: "Salesloft vs Outreach comparison: Salesloft at $125/mo for workflows vs Outreach at $130/mo for AI intelligence. Compare top sales platforms.",
      pros: {
        toolA: ["More intuitive user interface", "Better email templates and tools", "Simpler onboarding process"],
        toolB: ["Advanced AI and ML capabilities", "Superior revenue forecasting", "Better analytics and insights"]
      },
      cons: {
        toolA: ["Less advanced AI features", "Limited revenue intelligence"],
        toolB: ["Steeper learning curve", "Can be overwhelming for small teams"]
      }
    }
  },
  {
    toolA: 'clay',
    toolB: 'leadiq',
    content: {
      intro: "Clay and LeadIQ represent different approaches to B2B data enrichment and prospecting. Clay offers a flexible data orchestration platform, while LeadIQ focuses on streamlined contact capture and CRM integration.",
      toolAOverview: "Clay is a powerful data enrichment and workflow automation platform for go-to-market teams. At $149/month, it combines multiple data sources, offers custom web scraping, and enables complex enrichment workflows. Clay is designed for teams that want to build sophisticated prospecting systems.",
      toolBOverview: "LeadIQ simplifies the prospecting workflow with one-click contact capture and automatic CRM sync. At $120/month, it provides verified contact data, email finder, and seamless Salesforce integration. LeadIQ focuses on making sales reps more efficient without complex setup.",
      comparison: "Clay at $149/month is more expensive but offers greater flexibility and power. LeadIQ at $120/month provides a simpler, more focused solution. Clay excels at complex data workflows and custom enrichment, while LeadIQ is better for quick contact capture and CRM workflow. Clay suits ops teams and power users, while LeadIQ is perfect for sales reps who want simplicity.",
      verdict: "Choose Clay if you need flexible data orchestration and want to build custom prospecting workflows. Choose LeadIQ if you want simple, fast contact capture with automatic CRM sync.",
      metaDescription: "Clay vs LeadIQ comparison: Clay at $149/mo for data workflows vs LeadIQ at $120/mo for contact capture. Find your B2B data solution.",
      pros: {
        toolA: ["Powerful workflow automation", "Multiple data source integration", "Custom web scraping capability"],
        toolB: ["One-click contact capture", "Seamless CRM integration", "Simpler learning curve"]
      },
      cons: {
        toolA: ["Steeper learning curve", "Higher price point"],
        toolB: ["Less flexibility for complex workflows", "Limited data sources"]
      }
    }
  },
  {
    toolA: 'aiseo',
    toolB: 'surfer',
    content: {
      intro: "AISEO and SurferSEO help content creators optimize their writing for search engines, but take different approaches. AISEO focuses on AI-powered content generation, while SurferSEO emphasizes data-driven optimization based on SERP analysis.",
      toolAOverview: "AISEO combines AI writing with SEO optimization in one affordable platform. At $29/month, it generates SEO-optimized content, provides readability analysis, and supports multiple languages. AISEO is perfect for content creators who want AI assistance with built-in optimization.",
      toolBOverview: "SurferSEO is the data-driven SEO content optimization tool used by serious content teams. At $89/month, it provides detailed SERP analysis, content editor with real-time scoring, and keyword research. Surfer helps you match and beat top-ranking content through comprehensive competitive analysis.",
      comparison: "AISEO at $29/month is more affordable and includes AI writing, while SurferSEO at $89/month focuses purely on optimization. AISEO generates content from scratch, while Surfer optimizes existing content. Surfer provides more detailed SERP analysis and competitor insights, while AISEO offers better multilingual support. AISEO suits solo creators, while Surfer is built for SEO teams.",
      verdict: "Choose AISEO if you want affordable AI content generation with basic SEO optimization. Choose SurferSEO if you need comprehensive SERP analysis and data-driven optimization for serious content marketing.",
      metaDescription: "AISEO vs SurferSEO: AISEO at $29/mo for AI writing vs Surfer at $89/mo for SERP analysis. Compare SEO content tools for your needs.",
      pros: {
        toolA: ["AI content generation included", "More affordable pricing", "Better multilingual support"],
        toolB: ["Comprehensive SERP analysis", "Real-time content scoring", "Advanced keyword research"]
      },
      cons: {
        toolA: ["Less detailed optimization data", "Basic competitor analysis"],
        toolB: ["No content generation", "Higher price point"]
      }
    }
  },
  {
    toolA: 'loom',
    toolB: 'vidyard',
    content: {
      intro: "Loom and Vidyard are video communication platforms that help teams share information asynchronously. While Loom focuses on quick screen recordings, Vidyard offers more advanced video hosting and analytics features for sales and marketing teams.",
      toolAOverview: "Loom revolutionized async video communication with its instant recording and sharing capabilities. At $15/month, it offers screen and webcam recording, instant sharing links, and basic viewer insights. Loom is perfect for internal communication, quick tutorials, and team updates.",
      toolBOverview: "Vidyard is a comprehensive video platform built for sales and marketing teams. At $29/month, it provides video hosting, email gates, detailed analytics, and CRM integration. Vidyard helps teams use video throughout the customer journey, from prospecting to customer success.",
      comparison: "Loom is simpler and cheaper at $15/month, focusing on quick internal communication. Vidyard at $29/month offers more business-focused features like email gates, video SEO, and sales analytics. Loom excels at team collaboration, while Vidyard is better for customer-facing videos. Loom has faster recording and sharing, while Vidyard provides better analytics and lead generation features.",
      verdict: "Choose Loom if you need quick, simple video messaging for internal team communication. Choose Vidyard if you want to use video for sales enablement, marketing, and lead generation with advanced analytics.",
      metaDescription: "Loom vs Vidyard comparison: Loom at $15/mo for team communication vs Vidyard at $29/mo for sales video. Find the right video platform.",
      pros: {
        toolA: ["Incredibly fast recording and sharing", "Simple, intuitive interface", "Great for internal communication"],
        toolB: ["Advanced video analytics", "Lead generation with email gates", "CRM integration for sales teams"]
      },
      cons: {
        toolA: ["Limited marketing features", "Basic analytics only"],
        toolB: ["More complex setup", "Higher price point"]
      }
    }
  }
]

// Get tool info from pricing data
function getToolInfo(slug: string) {
  const tool = PRICING.find(t => t.slug === slug)
  if (!tool) {
    throw new Error(`Tool ${slug} not found in pricing data`)
  }
  return tool
}

// Generate comparison slug
function getComparisonSlug(toolA: string, toolB: string): string {
  const sorted = [toolA, toolB].sort()
  return `${sorted[0]}-vs-${sorted[1]}`
}

// Create comparison page
function createComparisonPage(comparison: typeof STATIC_COMPARISONS[0]) {
  const { toolA, toolB, content } = comparison
  const toolAInfo = getToolInfo(toolA)
  const toolBInfo = getToolInfo(toolB)

  const slug = getComparisonSlug(toolA, toolB)
  const pageDir = path.join(process.cwd(), 'app/compare', slug)

  // Create directory
  fs.mkdirSync(pageDir, { recursive: true })

  // Create metadata.ts
  const metadataContent = `import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '${toolAInfo.name} vs ${toolBInfo.name}: Which AI Tool Wins in 2025? | AgentMastery',
  description: '${content.metaDescription}',
  openGraph: {
    title: '${toolAInfo.name} vs ${toolBInfo.name} Comparison',
    description: '${content.metaDescription}',
    images: ['/api/og/comparison?toolA=${toolA}&toolB=${toolB}'],
  },
}
`

  fs.writeFileSync(path.join(pageDir, 'metadata.ts'), metadataContent)

  // Create page.tsx
  const pageContent = `import { metadata } from './metadata'
import ComparisonPage from '@/components/ComparisonPage'

export { metadata }

const comparisonData = ${JSON.stringify({
  toolA: {
    slug: toolA,
    name: toolAInfo.name,
    category: toolAInfo.category,
    pricing: toolAInfo.seatMonthly,
    features: toolAInfo.features || [],
    affiliateUrl: toolAInfo.affiliateUrl || null
  },
  toolB: {
    slug: toolB,
    name: toolBInfo.name,
    category: toolBInfo.category,
    pricing: toolBInfo.seatMonthly,
    features: toolBInfo.features || [],
    affiliateUrl: toolBInfo.affiliateUrl || null
  },
  content,
  slug
}, null, 2)}

export default function ${toolAInfo.name.replace(/[^a-zA-Z]/g, '')}Vs${toolBInfo.name.replace(/[^a-zA-Z]/g, '')}Page() {
  return <ComparisonPage data={comparisonData} />
}
`

  fs.writeFileSync(path.join(pageDir, 'page.tsx'), pageContent)

  console.log(`✅ Created comparison: ${slug}`)
}

// Main function
function main() {
  console.log(`🔄 Generating ${STATIC_COMPARISONS.length} static comparison pages...`)

  let successCount = 0

  for (const comparison of STATIC_COMPARISONS) {
    try {
      createComparisonPage(comparison)
      successCount++
    } catch (error) {
      console.error(`Error creating ${comparison.toolA} vs ${comparison.toolB}:`, error)
    }
  }

  console.log(`✅ Successfully generated ${successCount} comparison pages`)
}

main()