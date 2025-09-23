import { metadata } from './metadata'
import ComparisonPage from '@/components/ComparisonPage'

export { metadata }

const comparisonData = {
  "toolA": {
    "slug": "loom",
    "name": "Loom",
    "category": "Video",
    "pricing": 15,
    "features": [
      "Screen Recording",
      "Webcam",
      "Instant Sharing",
      "Comments"
    ],
    "affiliateUrl": null
  },
  "toolB": {
    "slug": "vidyard",
    "name": "Vidyard",
    "category": "Video",
    "pricing": 29,
    "features": [
      "Video Hosting",
      "Email Gates",
      "Analytics",
      "CRM Integration"
    ],
    "affiliateUrl": null
  },
  "content": {
    "intro": "Loom and Vidyard are video communication platforms that help teams share information asynchronously. While Loom focuses on quick screen recordings, Vidyard offers more advanced video hosting and analytics features for sales and marketing teams.",
    "toolAOverview": "Loom revolutionized async video communication with its instant recording and sharing capabilities. At $15/month, it offers screen and webcam recording, instant sharing links, and basic viewer insights. Loom is perfect for internal communication, quick tutorials, and team updates.",
    "toolBOverview": "Vidyard is a comprehensive video platform built for sales and marketing teams. At $29/month, it provides video hosting, email gates, detailed analytics, and CRM integration. Vidyard helps teams use video throughout the customer journey, from prospecting to customer success.",
    "comparison": "Loom is simpler and cheaper at $15/month, focusing on quick internal communication. Vidyard at $29/month offers more business-focused features like email gates, video SEO, and sales analytics. Loom excels at team collaboration, while Vidyard is better for customer-facing videos. Loom has faster recording and sharing, while Vidyard provides better analytics and lead generation features.",
    "verdict": "Choose Loom if you need quick, simple video messaging for internal team communication. Choose Vidyard if you want to use video for sales enablement, marketing, and lead generation with advanced analytics.",
    "metaDescription": "Loom vs Vidyard comparison: Loom at $15/mo for team communication vs Vidyard at $29/mo for sales video. Find the right video platform.",
    "pros": {
      "toolA": [
        "Incredibly fast recording and sharing",
        "Simple, intuitive interface",
        "Great for internal communication"
      ],
      "toolB": [
        "Advanced video analytics",
        "Lead generation with email gates",
        "CRM integration for sales teams"
      ]
    },
    "cons": {
      "toolA": [
        "Limited marketing features",
        "Basic analytics only"
      ],
      "toolB": [
        "More complex setup",
        "Higher price point"
      ]
    }
  },
  "slug": "loom-vs-vidyard"
}

export default function LoomVsVidyardPage() {
  return <ComparisonPage data={comparisonData} />
}
