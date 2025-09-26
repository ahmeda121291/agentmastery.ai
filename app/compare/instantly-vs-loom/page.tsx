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
  "content": {
    "intro": "In the ever-evolving landscape of digital tools, Loom and Instantly cater to different needs within their respective categories. Loom focuses on video communication, while Instantly specializes in sales engagement. This comparison aims to highlight their unique features and use cases to help you make an informed decision.",
    "toolAOverview": "Loom is a video communication tool that allows users to create screen recordings and webcam videos easily. Priced at $15 per month, it offers instant sharing capabilities and enables viewers to leave comments on videos. This makes it particularly useful for teams needing to collaborate visually or provide feedback on projects. Overall, Loom is designed to enhance communication through visual means.",
    "toolBOverview": "Instantly is a sales engagement platform priced at $37 per month, tailored for professionals looking to streamline their outreach. It includes features like email warmup, a campaign builder for managing outreach strategies, inbox rotation to optimize deliverability, and analytics for performance tracking. Instantly is geared towards sales teams seeking to improve their email response rates and engagement metrics. Its tools are designed to facilitate effective communication with potential clients.",
    "comparison": "While Loom focuses on enhancing visual communication through video, Instantly is dedicated to improving sales outreach via email. Pricing-wise, Loom is more affordable at $15/month compared to Instantly's $37/month. In terms of user experience, Loom provides a straightforward interface for recording and sharing videos, while Instantly's features are more complex, catering specifically to sales professionals. Performance-wise, Loom excels in visual collaboration, whereas Instantly offers robust analytics for email campaigns. Each tool serves distinct use cases: Loom is ideal for businesses needing video communication, while Instantly is tailored for sales engagement.",
    "verdict": "Ultimately, the choice between Loom and Instantly depends on your specific needs. If video communication is your priority, Loom stands out as an effective tool. Conversely, for sales engagement and email outreach, Instantly offers the right features to enhance your strategy.",
    "metaDescription": "Compare Loom and Instantly in terms of features, pricing, and use cases to find the right tool for your needs.",
    "pros": {
      "toolA": [
        "User-friendly interface for screen recording",
        "Instant sharing capabilities enhance collaboration",
        "Allows viewer comments for feedback"
      ],
      "toolB": [
        "Comprehensive email warmup feature",
        "Robust analytics for tracking campaign performance",
        "Campaign builder simplifies outreach management"
      ]
    },
    "cons": {
      "toolA": [
        "Limited to video communication only",
        "May not integrate well with all project management tools"
      ],
      "toolB": [
        "Higher price point may not suit all budgets",
        "Complexity may overwhelm new users"
      ]
    },
  "availability": {
    "toolA": {
      "ai_capabilities": "partial",
      "automation": "partial",
      "api": "no",
      "team": "yes",
      "analytics": "yes",
      "support": "partial",
      "mobile": "yes",
      "integrations": "partial",
      "data_export": "yes",
      "workflows": "partial",
      "templates": "yes",
      "white_label": "no",
      "sso": "no",
      "bulk_operations": "partial",
      "real_time": "no"
    },
    "toolB": {
      "ai_capabilities": "partial",
      "automation": "yes",
      "api": "no",
      "team": "partial",
      "analytics": "yes",
      "support": "partial",
      "mobile": "partial",
      "integrations": "partial",
      "data_export": "yes",
      "workflows": "partial",
      "templates": "yes",
      "white_label": "no",
      "sso": "no",
      "bulk_operations": "yes",
      "real_time": "partial"
    }
  }
  },
  "slug": "instantly-vs-loom"
}

export default function LoomVsInstantlyPage() {
  return <ComparisonPage data={comparisonData} />
}
