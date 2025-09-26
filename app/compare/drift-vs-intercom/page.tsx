import { metadata } from './metadata'
import ComparisonPage from '@/components/ComparisonPage'

export { metadata }

const comparisonData = {
  "toolA": {
    "slug": "intercom",
    "name": "Intercom",
    "category": "Chatbots",
    "pricing": 65,
    "features": [
      "AI Chatbot",
      "Help Center",
      "Team Inbox",
      "Product Tours"
    ],
    "affiliateUrl": null
  },
  "toolB": {
    "slug": "drift",
    "name": "Drift",
    "category": "Chatbots",
    "pricing": 50,
    "features": [
      "Conversational AI",
      "Meeting Booking",
      "Email Fallback",
      "ABM Features"
    ],
    "affiliateUrl": null
  },
  "content": {
    "intro": "Intercom and Drift are leading conversational marketing platforms that help businesses engage with website visitors and customers in real-time. While both offer AI-powered chatbots and live chat, they target different use cases and customer segments.",
    "toolAOverview": "Intercom is a complete customer communication platform combining live chat, help desk, and product tours. At $65/month, it offers AI-powered chatbots, a unified inbox for support teams, and comprehensive customer data. Intercom excels at the entire customer lifecycle from acquisition to support.",
    "toolBOverview": "Drift pioneered conversational marketing, focusing on turning website visitors into qualified leads through intelligent chatbots. At $50/month, it offers meeting booking, email fallback, and ABM features. Drift is built specifically for B2B sales and marketing teams looking to accelerate their pipeline.",
    "comparison": "Intercom is broader at $65/month, covering support, marketing, and product teams. Drift at $50/month focuses specifically on sales and marketing conversion. Intercom has better help desk features and knowledge base, while Drift excels at sales-specific features like meeting booking and account-based marketing. Intercom suits product-led companies, while Drift works best for sales-led B2B organizations.",
    "verdict": "Choose Intercom if you need a complete customer communication platform spanning support, marketing, and product. Choose Drift if you're a B2B company focused on using conversational marketing to drive sales.",
    "metaDescription": "Intercom vs Drift comparison: Intercom at $65/mo for complete support vs Drift at $50/mo for sales conversion. Find your ideal chat platform.",
    "pros": {
      "toolA": [
        "Complete customer communication suite",
        "Superior help desk features",
        "Product tours and onboarding"
      ],
      "toolB": [
        "Built for B2B sales conversion",
        "Advanced meeting booking",
        "ABM integration features"
      ]
    },
    "cons": {
      "toolA": [
        "More expensive for basic chat",
        "Can be overwhelming for small teams"
      ],
      "toolB": [
        "Limited customer support features",
        "Less suitable for product companies"
      ]
    },
  "availability": {
    "toolA": {
      "ai_capabilities": "partial",
      "automation": "yes",
      "api": "yes",
      "team": "yes",
      "analytics": "yes",
      "support": "partial",
      "mobile": "yes",
      "integrations": "yes",
      "data_export": "yes",
      "workflows": "partial",
      "templates": "yes",
      "white_label": "no",
      "sso": "no",
      "bulk_operations": "yes",
      "real_time": "yes"
    },
    "toolB": {
      "ai_capabilities": "partial",
      "automation": "yes",
      "api": "no",
      "team": "partial",
      "analytics": "yes",
      "support": "partial",
      "mobile": "partial",
      "integrations": "yes",
      "data_export": "yes",
      "workflows": "partial",
      "templates": "yes",
      "white_label": "no",
      "sso": "no",
      "bulk_operations": "partial",
      "real_time": "yes"
    }
  }
  },
  "slug": "drift-vs-intercom"
}

export default function IntercomVsDriftPage() {
  return <ComparisonPage data={comparisonData} />
}
