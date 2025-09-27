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
    "slug": "copy-ai",
    "name": "Copy.ai",
    "category": "Writing/SEO",
    "pricing": 36,
    "features": [
      "90+ Templates",
      "Brand Voice",
      "Collaboration",
      "API Access"
    ],
    "affiliateUrl": null
  },
  "content": {
    "intro": "In the ever-evolving landscape of digital tools, Clay and Copy.ai serve distinct purposes that cater to different user needs. While Clay focuses on database management and automation, Copy.ai specializes in writing and SEO solutions.",
    "toolAOverview": "Clay is a powerful database tool designed for data enrichment and workflow automation. Priced at $149 per month, it offers features such as API integrations and custom scrapers, making it ideal for businesses looking to enhance their data management and streamline processes. With its robust capabilities, Clay is particularly suited for users needing detailed insights and automation in their workflows.",
    "toolBOverview": "Copy.ai is a writing and SEO tool that provides over 90 templates to assist users in crafting high-quality content efficiently. At a more accessible price of $36 per month, it emphasizes brand voice and collaboration features, allowing teams to work together seamlessly. Copy.ai is an excellent choice for marketers, content creators, and businesses aiming to improve their online presence through optimized writing.",
    "comparison": "When comparing Clay and Copy.ai, the key difference lies in their use cases: Clay is tailored for database and workflow automation, whereas Copy.ai focuses on content generation and SEO. In terms of pricing, Copy.ai is significantly more affordable at $36/month compared to Clay's $149/month. User experience varies, as Clay's complexity may require a steeper learning curve for beginners, while Copy.ai is generally user-friendly with its template-driven approach. Performance-wise, both tools excel in their respective areas, with Clay offering deep data insights and Copy.ai delivering quick and effective writing solutions.",
    "verdict": "Ultimately, the choice between Clay and Copy.ai depends on your specific needs. If you require advanced data management and automation, Clay is a solid option, whereas if you're looking for a cost-effective writing tool, Copy.ai may be the better fit.",
    "metaDescription": "Compare Clay and Copy.ai to find the right tool for your data management or writing needs. Explore features, pricing, and use cases.",
    "pros": {
      "toolA": [
        "Robust data enrichment capabilities for better insights.",
        "Advanced workflow automation to streamline processes.",
        "Custom scrapers for tailored data extraction."
      ],
      "toolB": [
        "Wide variety of templates for diverse writing needs.",
        "User-friendly interface that facilitates collaboration.",
        "Affordable pricing makes it accessible for small businesses."
      ]
    },
    "cons": {
      "toolA": [
        "Higher price point may be a barrier for smaller teams.",
        "Complexity can lead to a steeper learning curve."
      ],
      "toolB": [
        "Limited advanced features compared to some competitors.",
        "May not fully meet the needs of users requiring in-depth SEO analysis."
      ]
    }
  },
  "slug": "clay-vs-copy-ai"
}

export default function ClayVsCopyaiPage() {
  return <ComparisonPage data={comparisonData} />
}
