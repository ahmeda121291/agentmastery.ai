import { metadata } from './metadata'
import ComparisonPage from '@/components/ComparisonPage'

export { metadata }

const comparisonData = {
  "toolA": {
    "slug": "salesloft",
    "name": "Salesloft",
    "category": "Sales Engagement",
    "pricing": 125,
    "features": [
      "Cadence Management",
      "Call Recording",
      "Email Tracking",
      "Analytics Dashboard"
    ],
    "affiliateUrl": null
  },
  "toolB": {
    "slug": "outreach",
    "name": "Outreach",
    "category": "Sales Engagement",
    "pricing": 130,
    "features": [
      "Multi-channel Sequences",
      "AI Coaching",
      "Revenue Intelligence",
      "Forecasting"
    ],
    "affiliateUrl": null
  },
  "content": {
    "intro": "Salesloft and Outreach are the two dominant sales engagement platforms that help teams execute multi-channel outreach at scale. Both offer similar core features but differ in their approach to AI, analytics, and user experience.",
    "toolAOverview": "Salesloft provides a sales engagement platform focused on workflow efficiency and coaching. At $125/month, it offers cadence management, call recording, and detailed analytics. Salesloft emphasizes ease of use and helping reps build better relationships through its Rhythm workflow engine.",
    "toolBOverview": "Outreach positions itself as a complete revenue intelligence platform beyond just engagement. At $130/month, it includes AI-powered coaching, revenue forecasting, and advanced analytics. Outreach focuses on data-driven selling with features like sentiment analysis and deal intelligence.",
    "comparison": "Pricing is nearly identical ($125 vs $130/month), but philosophies differ. Salesloft prioritizes user experience and workflow simplicity, while Outreach emphasizes AI and analytics. Salesloft has better email tools and templates, while Outreach offers superior forecasting and intelligence features. Both integrate well with CRMs, but Outreach has more native Salesforce features.",
    "verdict": "Choose Salesloft if you want a user-friendly platform focused on engagement workflows and team coaching. Choose Outreach if you need advanced AI features, revenue intelligence, and predictive analytics.",
    "metaDescription": "Salesloft vs Outreach comparison: Salesloft at $125/mo for workflows vs Outreach at $130/mo for AI intelligence. Compare top sales platforms.",
    "pros": {
      "toolA": [
        "More intuitive user interface",
        "Better email templates and tools",
        "Simpler onboarding process"
      ],
      "toolB": [
        "Advanced AI and ML capabilities",
        "Superior revenue forecasting",
        "Better analytics and insights"
      ]
    },
    "cons": {
      "toolA": [
        "Less advanced AI features",
        "Limited revenue intelligence"
      ],
      "toolB": [
        "Steeper learning curve",
        "Can be overwhelming for small teams"
      ]
    },
  "availability": {
    "toolA": {
      "ai_capabilities": "yes",
      "automation": "yes",
      "api": "partial",
      "team": "yes",
      "analytics": "yes",
      "support": "partial",
      "mobile": "partial",
      "integrations": "yes",
      "data_export": "yes",
      "workflows": "yes",
      "templates": "yes",
      "white_label": "no",
      "sso": "yes",
      "bulk_operations": "yes",
      "real_time": "yes"
    },
    "toolB": {
      "ai_capabilities": "yes",
      "automation": "yes",
      "api": "partial",
      "team": "yes",
      "analytics": "yes",
      "support": "partial",
      "mobile": "partial",
      "integrations": "yes",
      "data_export": "yes",
      "workflows": "yes",
      "templates": "yes",
      "white_label": "no",
      "sso": "yes",
      "bulk_operations": "yes",
      "real_time": "yes"
    }
  }
  },
  "slug": "outreach-vs-salesloft"
}

export default function SalesloftVsOutreachPage() {
  return <ComparisonPage data={comparisonData} />
}
