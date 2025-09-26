import { metadata } from './metadata'
import ComparisonPage from '@/components/ComparisonPage'

export { metadata }

const comparisonData = {
  "toolA": {
    "slug": "tidio",
    "name": "Tidio",
    "category": "Chatbots",
    "pricing": 25,
    "features": [
      "Live Chat",
      "Chatbots",
      "Email Integration",
      "Mobile App"
    ],
    "affiliateUrl": null
  },
  "toolB": {
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
  "content": {
    "intro": "In the realm of customer engagement and relationship management, Tidio and Zoho CRM serve distinct purposes. While Tidio focuses primarily on enhancing communication through chatbots and live chat, Zoho CRM provides a comprehensive suite for managing customer relationships and sales processes.",
    "toolAOverview": "Tidio is a versatile chatbot solution that allows businesses to engage with customers in real-time through live chat and automated responses. Priced at $25 per month, it includes features like email integration and a mobile app, making it accessible and convenient for users on the go. Its primary aim is to improve customer service and engagement, providing a user-friendly platform for businesses of all sizes. Tidio is particularly well-suited for those looking to enhance their online communication without complex setups.",
    "toolBOverview": "Zoho CRM, at a price of $30 per month, is a robust customer relationship management tool designed to streamline sales processes and improve customer interactions. With features such as sales automation, analytics, and multi-channel communication, Zoho CRM is ideal for businesses looking to enhance their sales efficiency and gain insights into customer behavior. Its workflow rules and customizable options cater to a wide range of industries, making it a flexible choice for managing customer relationships. Zoho CRM is particularly beneficial for teams focused on sales and customer data management.",
    "comparison": "When comparing Tidio and Zoho CRM, the primary difference lies in their focus and functionality. Tidio excels in providing immediate customer support through live chat and chatbots, making it ideal for businesses prioritizing real-time engagement. On the other hand, Zoho CRM offers a more comprehensive approach to customer management, with tools for sales automation and analytics that cater to larger teams. In terms of pricing, Tidio is slightly more affordable at $25/month compared to Zoho CRM's $30/month. Both tools offer user-friendly experiences, but their performance varies based on the specific business needs they address.",
    "verdict": "Ultimately, the choice between Tidio and Zoho CRM depends on whether your priority is customer engagement or comprehensive sales management. For businesses focused on enhancing live communication, Tidio is a strong choice, while those needing a full-fledged CRM should consider Zoho CRM.",
    "metaDescription": "Compare Tidio and Zoho CRM to find the best tool for customer engagement vs. relationship management for your business needs.",
    "pros": {
      "toolA": [
        "User-friendly interface for quick setup and use.",
        "Effective real-time customer engagement through live chat.",
        "Affordable pricing for small to medium-sized businesses."
      ],
      "toolB": [
        "Comprehensive features for sales automation and analytics.",
        "Flexible and customizable to suit various business needs.",
        "Strong multi-channel communication options."
      ]
    },
    "cons": {
      "toolA": [
        "Limited functionality beyond customer engagement.",
        "May not integrate well with complex CRM systems."
      ],
      "toolB": [
        "Higher price point compared to some other CRM solutions.",
        "Can be overwhelming for users due to its extensive features."
      ]
    }
  },
  "slug": "tidio-vs-zoho"
}

export default function TidioVsZohoCRMPage() {
  return <ComparisonPage data={comparisonData} />
}
