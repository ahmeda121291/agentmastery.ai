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
    "intro": "In today's digital landscape, choosing the right tool for your specific needs can significantly impact efficiency and effectiveness. This comparison explores two distinct tools: Clay, a powerful database solution, and Instantly, a focused sales engagement platform.",
    "toolAOverview": "Clay is a comprehensive database tool that specializes in data enrichment and workflow automation. Its robust features include API integrations and custom scrapers, making it ideal for users who require extensive data management capabilities. Priced at $149 per month, Clay caters to businesses looking to streamline their data processes and enhance their operational workflows.",
    "toolBOverview": "Instantly is a sales engagement platform designed to optimize email communication and marketing campaigns. With features like email warmup, a campaign builder, and inbox rotation, it provides essential tools for improving outreach effectiveness. At a more accessible price of $37 per month, Instantly is well-suited for sales teams aiming to enhance their engagement strategies without a hefty investment.",
    "comparison": "Clay is tailored for businesses that need advanced data handling and automation, making it suitable for data-driven teams and larger organizations. In contrast, Instantly focuses on sales engagement, providing essential tools for email campaigns and outreach at a lower cost. While Clay's pricing reflects its comprehensive features, Instantly offers a budget-friendly option for those primarily interested in improving their sales processes. Both tools have distinct user experiences: Clay may appeal more to technical users, while Instantly offers a straightforward interface for quick campaign management. Performance-wise, Clay excels in data processing, whereas Instantly shines in email engagement metrics.",
    "verdict": "Ultimately, the choice between Clay and Instantly hinges on your specific needs. If data management and automation are your priorities, Clay may be the better fit, while Instantly is ideal for focused sales engagement efforts.",
    "metaDescription": "Compare Clay and Instantly to find the best tool for database management or sales engagement needs.",
    "pros": {
      "toolA": [
        "Comprehensive data enrichment capabilities.",
        "Strong workflow automation features.",
        "Custom scrapers allow for tailored data collection."
      ],
      "toolB": [
        "Cost-effective pricing for small to medium businesses.",
        "User-friendly interface for easy campaign management.",
        "Effective tools for improving email outreach and engagement."
      ]
    },
    "cons": {
      "toolA": [
        "Higher price point may be a barrier for smaller businesses.",
        "Complexity may require a learning curve for new users."
      ],
      "toolB": [
        "Limited features compared to more robust database tools.",
        "May not meet the needs of larger organizations with advanced requirements."
      ]
    }
  },
  "slug": "clay-vs-instantly"
}

export default function ClayVsInstantlyPage() {
  return <ComparisonPage data={comparisonData} />
}
