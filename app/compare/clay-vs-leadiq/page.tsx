import { metadata } from './metadata'
import ComparisonPage from '@/components/ComparisonPage'

export { metadata }

const comparisonData = {
  "toolA": {
    "slug": "clay",
    "name": "Clay",
    "category": "Database",
    "pricing": 149,
    "features": [
      "Data Enrichment",
      "Workflow Automation",
      "API Integrations",
      "Custom Scrapers"
    ],
    "affiliateUrl": null
  },
  "toolB": {
    "slug": "leadiq",
    "name": "LeadIQ",
    "category": "Database",
    "pricing": 120,
    "features": [
      "Contact Capture",
      "CRM Sync",
      "Email Finder",
      "Data Verification"
    ],
    "affiliateUrl": null
  },
  "content": {
    "intro": "Clay and LeadIQ represent different approaches to B2B data enrichment and prospecting. Clay offers a flexible data orchestration platform, while LeadIQ focuses on streamlined contact capture and CRM integration.",
    "toolAOverview": "Clay is a powerful data enrichment and workflow automation platform for go-to-market teams. At $149/month, it combines multiple data sources, offers custom web scraping, and enables complex enrichment workflows. Clay is designed for teams that want to build sophisticated prospecting systems.",
    "toolBOverview": "LeadIQ simplifies the prospecting workflow with one-click contact capture and automatic CRM sync. At $120/month, it provides verified contact data, email finder, and seamless Salesforce integration. LeadIQ focuses on making sales reps more efficient without complex setup.",
    "comparison": "Clay at $149/month is more expensive but offers greater flexibility and power. LeadIQ at $120/month provides a simpler, more focused solution. Clay excels at complex data workflows and custom enrichment, while LeadIQ is better for quick contact capture and CRM workflow. Clay suits ops teams and power users, while LeadIQ is perfect for sales reps who want simplicity.",
    "verdict": "Choose Clay if you need flexible data orchestration and want to build custom prospecting workflows. Choose LeadIQ if you want simple, fast contact capture with automatic CRM sync.",
    "metaDescription": "Clay vs LeadIQ comparison: Clay at $149/mo for data workflows vs LeadIQ at $120/mo for contact capture. Find your B2B data solution.",
    "pros": {
      "toolA": [
        "Powerful workflow automation",
        "Multiple data source integration",
        "Custom web scraping capability"
      ],
      "toolB": [
        "One-click contact capture",
        "Seamless CRM integration",
        "Simpler learning curve"
      ]
    },
    "cons": {
      "toolA": [
        "Steeper learning curve",
        "Higher price point"
      ],
      "toolB": [
        "Less flexibility for complex workflows",
        "Limited data sources"
      ]
    },
  "availability": {
    "toolA": {
      "ai_capabilities": "yes",
      "automation": "yes",
      "api": "yes",
      "team": "yes",
      "analytics": "yes",
      "support": "partial",
      "mobile": "partial",
      "integrations": "yes",
      "data_export": "yes",
      "workflows": "yes",
      "templates": "yes",
      "white_label": "no",
      "sso": "partial",
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
      "sso": "partial",
      "bulk_operations": "yes",
      "real_time": "yes"
    }
  }
  },
  "slug": "clay-vs-leadiq"
}

export default function ClayVsLeadIQPage() {
  return <ComparisonPage data={comparisonData} />
}
