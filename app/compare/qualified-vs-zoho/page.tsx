import { metadata } from './metadata'
import ComparisonPage from '@/components/ComparisonPage'

export { metadata }

const comparisonData = {
  "toolA": {
    "slug": "zoho",
    "name": "Zoho CRM",
    "category": "CRM",
    "pricing": 30,
    "features": [
      "Sales Automation",
      "Analytics",
      "Workflow Rules",
      "Multi-channel"
    ],
    "affiliateUrl": null
  },
  "toolB": {
    "slug": "qualified",
    "name": "Qualified",
    "category": "Chatbots",
    "pricing": 250,
    "features": [
      "Sales Chat",
      "Meeting Booking",
      "Salesforce Native",
      "Visitor Intel"
    ],
    "affiliateUrl": null
  },
  "content": {
    "intro": "In today's competitive landscape, choosing the right tool for customer relationship management and engagement is crucial. This comparison highlights Zoho CRM and Qualified, two platforms designed to enhance sales processes and customer interactions.",
    "toolAOverview": "Zoho CRM is a comprehensive customer relationship management tool that provides features aimed at streamlining sales processes. With functionalities like sales automation, analytics, and workflow rules, it helps teams manage customer interactions effectively across multiple channels. Priced at $30 per month, Zoho CRM is designed for businesses seeking an affordable yet powerful solution for managing customer relationships.",
    "toolBOverview": "Qualified is a specialized chatbot platform that focuses on enhancing sales conversations through automated chat features. It offers capabilities such as sales chat, meeting booking, and visitor intelligence, making it a compelling choice for businesses looking to engage visitors in real-time. At $250 per month, Qualified is targeted at organizations that prioritize live interactions and seamless integration with Salesforce.",
    "comparison": "When it comes to use cases, Zoho CRM suits businesses focused on comprehensive customer management through sales automation and analytics, while Qualified excels in real-time customer engagement via chatbots. Pricing reflects this focus, with Zoho CRM being significantly more economical at $30 per month compared to Qualified's $250. In terms of user experience, Zoho CRM offers a robust interface for managing sales pipelines, whereas Qualified provides a streamlined, conversational interface for engaging with visitors. Both tools deliver solid performance, but their effectiveness largely depends on the specific needs of the organization.",
    "verdict": "Ultimately, the choice between Zoho CRM and Qualified hinges on your business's priorities. If you need a broad CRM solution for managing relationships and sales processes, Zoho CRM is the more budget-friendly option. Conversely, if real-time engagement through chat is critical for your sales strategy, Qualified may be the better fit despite its higher price point.",
    "metaDescription": "Compare Zoho CRM and Qualified to find the best tool for your sales and customer engagement needs. Explore features, pricing, and use cases.",
    "pros": {
      "toolA": [
        "Affordable pricing at $30/month makes it accessible for small to medium businesses.",
        "Comprehensive features including sales automation and analytics enhance sales management.",
        "Multi-channel support allows businesses to engage customers across various platforms."
      ],
      "toolB": [
        "Specialized in real-time customer engagement through chat, improving lead conversion.",
        "Salesforce native integration enhances usability for existing Salesforce users.",
        "Visitor intelligence features provide insights into customer behavior and needs."
      ]
    },
    "cons": {
      "toolA": [
        "May lack advanced features found in higher-end CRM systems.",
        "User interface can be complex for new users, requiring some learning curve."
      ],
      "toolB": [
        "Higher price point at $250/month may be prohibitive for smaller businesses.",
        "Limited functionality outside of chatbots, making it less versatile than full CRMs."
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
      "mobile": "partial",
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
  "slug": "qualified-vs-zoho"
}

export default function ZohoCRMVsQualifiedPage() {
  return <ComparisonPage data={comparisonData} />
}
