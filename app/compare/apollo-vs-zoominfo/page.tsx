import { metadata } from './metadata'
import ComparisonPage from '@/components/ComparisonPage'

export { metadata }

const comparisonData = {
  "toolA": {
    "slug": "apollo",
    "name": "Apollo",
    "category": "Database",
    "pricing": 59,
    "features": [
      "275M+ Contacts",
      "Email Sequencing",
      "Chrome Extension",
      "CRM Integration",
      "Basic Intent Signals"
    ],
    "affiliateUrl": "https://get.apollo.io/qq0iw5w2fskf"
  },
  "toolB": {
    "slug": "zoominfo",
    "name": "ZoomInfo",
    "category": "Database",
    "pricing": 1250,
    "features": [
      "Premium B2B Database",
      "Intent Data",
      "Technographics",
      "Org Charts",
      "Workflow Automation"
    ],
    "affiliateUrl": null
  },
  "content": {
    "intro": "Apollo and ZoomInfo are two leading B2B sales intelligence platforms that help teams find and connect with potential customers. While both offer comprehensive contact databases and sales engagement features, they differ significantly in pricing, ease of use, and target market.",
    "toolAOverview": "Apollo combines a massive B2B database with built-in sales engagement tools at an affordable price point. It's designed for startups and SMBs looking for an all-in-one prospecting solution. Apollo offers email sequencing, a Chrome extension, and CRM integration alongside its 275M+ contact database.",
    "toolBOverview": "ZoomInfo is the premium enterprise solution for B2B data and sales intelligence. It offers the most comprehensive and accurate B2B database with advanced features like intent data, technographics, and org charts. ZoomInfo is built for enterprise sales teams that need the highest quality data and sophisticated analytics.",
    "comparison": "The main difference lies in pricing and target market. Apollo starts at $59/user/month while ZoomInfo typically costs $1,250+/user/month with a 3-seat minimum. Apollo is more accessible for smaller teams, while ZoomInfo offers superior data quality and enterprise features. Apollo includes built-in sales engagement, while ZoomInfo focuses on data intelligence. For ROI, Apollo works best for high-volume outreach, while ZoomInfo excels at targeted enterprise selling.",
    "verdict": "Choose Apollo if you're a startup or SMB looking for affordable prospecting with integrated engagement tools. Choose ZoomInfo if you're an enterprise team that needs premium data quality, intent signals, and can justify the higher investment.",
    "metaDescription": "Compare Apollo vs ZoomInfo: pricing, features, and data quality. Apollo at $59/mo vs ZoomInfo at $1,250/mo - find the right B2B database for your team.",
    "pros": {
      "toolA": [
        "Affordable at $59/user/month",
        "Built-in email sequencing and dialer",
        "No minimum seats required"
      ],
      "toolB": [
        "Most accurate B2B data available",
        "Advanced intent and technographic data",
        "Enterprise-grade integrations"
      ]
    },
    "cons": {
      "toolA": [
        "Lower data accuracy than premium tools",
        "Limited intent data capabilities"
      ],
      "toolB": [
        "Very expensive ($15,000+ annual minimum)",
        "3-seat minimum requirement"
      ]
    }
  },
  "slug": "apollo-vs-zoominfo"
}

export default function ApolloVsZoomInfoPage() {
  return <ComparisonPage data={comparisonData} />
}
