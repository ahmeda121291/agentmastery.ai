import { metadata } from './metadata'
import ComparisonPage from '@/components/ComparisonPage'

export { metadata }

const comparisonData = {
  "toolA": {
    "slug": "instantly",
    "name": "Instantly",
    "category": "Sales Engagement",
    "pricing": 37,
    "features": [
      "Email Warmup",
      "Campaign Builder",
      "Inbox Rotation",
      "Analytics"
    ],
    "affiliateUrl": null
  },
  "toolB": {
    "slug": "smartlead",
    "name": "SmartLead",
    "category": "Sales Engagement",
    "pricing": 39,
    "features": [
      "Unlimited Email Warmup",
      "Multi-inbox Rotation",
      "AI Personalization",
      "Email Validation",
      "Campaign Analytics"
    ],
    "affiliateUrl": "https://smartlead.ai/?via=masteryagent"
  },
  "content": {
    "intro": "Instantly and SmartLead are specialized cold email platforms designed for high-volume outbound campaigns. Both focus on deliverability and scale, but offer different approaches to email warming, campaign management, and pricing.",
    "toolAOverview": "Instantly provides a streamlined cold email platform with built-in email warmup, campaign analytics, and inbox rotation. It's known for its simple interface and competitive pricing at $37/month. Instantly focuses on the essentials of cold email without unnecessary complexity.",
    "toolBOverview": "SmartLead offers a comprehensive cold email system with unlimited email warmup, AI personalization, and multi-channel capabilities. At $39/month, it provides advanced features like subsequences, A/B testing, and white-label options for agencies. SmartLead emphasizes maximizing reply rates through intelligent automation.",
    "comparison": "Both tools are similarly priced ($37 vs $39/month) but differ in features. SmartLead includes unlimited email warmup in all plans, while Instantly may limit warmup seats. SmartLead offers more advanced personalization and subsequence features, while Instantly has a cleaner, simpler interface. SmartLead provides white-label options for agencies, while Instantly focuses on individual users and small teams.",
    "verdict": "Choose Instantly if you want a simple, straightforward cold email tool with essential features. Choose SmartLead if you need advanced personalization, unlimited warmup, or run an agency requiring white-label capabilities.",
    "metaDescription": "Instantly vs SmartLead: Compare cold email platforms. Instantly at $37/mo for simplicity vs SmartLead at $39/mo with unlimited warmup.",
    "pros": {
      "toolA": [
        "Simpler, cleaner interface",
        "Faster setup and onboarding",
        "Strong deliverability focus"
      ],
      "toolB": [
        "Unlimited email warmup included",
        "Advanced AI personalization",
        "White-label agency options"
      ]
    },
    "cons": {
      "toolA": [
        "Limited warmup seats on basic plans",
        "Fewer advanced features"
      ],
      "toolB": [
        "Steeper learning curve",
        "Can be overwhelming for beginners"
      ]
    }
  },
  "slug": "instantly-vs-smartlead"
}

export default function InstantlyVsSmartLeadPage() {
  return <ComparisonPage data={comparisonData} />
}
