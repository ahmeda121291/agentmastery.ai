import { metadata } from './metadata'
import ComparisonPage from '@/components/ComparisonPage'

export { metadata }

const comparisonData = {
  "toolA": {
    "slug": "hubspot",
    "name": "HubSpot",
    "category": "CRM",
    "pricing": 50,
    "features": [
      "Deal Pipeline",
      "Email Tracking",
      "Meeting Scheduler",
      "Live Chat",
      "Basic Automation"
    ],
    "affiliateUrl": null
  },
  "toolB": {
    "slug": "salesforce",
    "name": "Salesforce",
    "category": "CRM",
    "pricing": 150,
    "features": [
      "Full CRM Suite",
      "Custom Objects",
      "Process Builder",
      "Advanced Reports",
      "API Access"
    ],
    "affiliateUrl": null
  },
  "content": {
    "intro": "HubSpot and Salesforce represent two different philosophies in CRM: HubSpot's all-in-one inbound marketing platform versus Salesforce's powerful, customizable enterprise platform. The choice often comes down to company size, technical resources, and growth trajectory.",
    "toolAOverview": "HubSpot CRM offers a user-friendly, integrated platform that combines CRM, marketing, sales, and service hubs. It's known for exceptional ease of use, transparent pricing, and a generous free tier. HubSpot excels at inbound marketing automation and provides everything growing businesses need out of the box.",
    "toolBOverview": "Salesforce is the world's leading CRM platform, offering unlimited customization and scalability for enterprise organizations. It provides advanced features through its cloud ecosystem, extensive third-party integrations, and powerful automation via Process Builder and Flow. Salesforce is built for complex sales processes and large teams.",
    "comparison": "HubSpot starts at $50/user/month with no hidden costs, while Salesforce begins at $150/user/month but often requires additional investments in implementation and add-ons. HubSpot is ready to use immediately, while Salesforce typically needs customization. HubSpot suits companies up to 1000 employees, while Salesforce scales infinitely. HubSpot includes marketing automation natively, while Salesforce requires Pardot or Marketing Cloud.",
    "verdict": "Choose HubSpot if you want an easy-to-use, all-in-one platform with transparent pricing and built-in marketing tools. Choose Salesforce if you need unlimited customization, have complex processes, and have the resources for implementation and maintenance.",
    "metaDescription": "HubSpot vs Salesforce CRM comparison: HubSpot at $50/mo for simplicity vs Salesforce at $150/mo for customization. Which CRM fits your business?",
    "pros": {
      "toolA": [
        "Intuitive interface with minimal training needed",
        "All-in-one marketing, sales, and service",
        "Transparent, predictable pricing"
      ],
      "toolB": [
        "Unlimited customization possibilities",
        "Massive ecosystem of apps and integrations",
        "Scales to any enterprise size"
      ]
    },
    "cons": {
      "toolA": [
        "Limited customization compared to Salesforce",
        "Less suitable for complex enterprise needs"
      ],
      "toolB": [
        "Steep learning curve and complexity",
        "Expensive with hidden implementation costs"
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
      "integrations": "yes",
      "data_export": "yes",
      "workflows": "yes",
      "templates": "yes",
      "white_label": "no",
      "sso": "no",
      "bulk_operations": "partial",
      "real_time": "partial"
    },
    "toolB": {
      "ai_capabilities": "yes",
      "automation": "yes",
      "api": "yes",
      "team": "yes",
      "analytics": "yes",
      "support": "yes",
      "mobile": "partial",
      "integrations": "yes",
      "data_export": "yes",
      "workflows": "yes",
      "templates": "yes",
      "white_label": "partial",
      "sso": "yes",
      "bulk_operations": "yes",
      "real_time": "yes"
    }
  }
  },
  "slug": "hubspot-vs-salesforce"
}

export default function HubSpotVsSalesforcePage() {
  return <ComparisonPage data={comparisonData} />
}
