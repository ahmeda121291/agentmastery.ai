import { metadata } from './metadata'
import ComparisonPage from '@/components/ComparisonPage'

export { metadata }

const comparisonData = {
  "toolA": {
    "slug": "pipedrive",
    "name": "Pipedrive",
    "category": "CRM",
    "pricing": 49,
    "features": [
      "Visual Sales Pipeline",
      "Activity Reminders",
      "Email Integration",
      "Mobile App"
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
    "intro": "In this comparison, we will explore Pipedrive and Copy.ai, two tools designed for different purposes. While Pipedrive focuses on customer relationship management (CRM), Copy.ai is tailored for writing and SEO tasks. Understanding their features, pricing, and use cases can help you determine which tool best suits your needs.",
    "toolAOverview": "Pipedrive is a CRM tool that emphasizes a visual sales pipeline, making it easy for sales teams to track their deals and manage customer relationships. It offers features like activity reminders, email integration, and a mobile app to ensure that users remain productive on the go. With a monthly subscription of $49, Pipedrive aims to streamline the sales process and enhance team collaboration. Its user-friendly interface is designed to minimize complexity and improve sales efficiency.",
    "toolBOverview": "Copy.ai is a writing and SEO tool that provides users with over 90 templates to create various types of content quickly and efficiently. Priced at $36 per month, it helps users develop a distinct brand voice and facilitates collaboration among team members. The tool also offers API access for those who want to integrate its capabilities into their own applications. With a focus on enhancing productivity, Copy.ai is ideal for marketers, content creators, and businesses looking to generate high-quality written content.",
    "comparison": "Pipedrive and Copy.ai serve vastly different purposes, with Pipedrive specializing in CRM functionalities and Copy.ai focusing on content generation and SEO. In terms of pricing, Copy.ai is slightly more affordable at $36/month compared to Pipedrive's $49/month. User experience varies based on the tool's application; Pipedrive features a visual interface suited for sales tracking, while Copy.ai offers a template-driven approach to content creation. Performance-wise, both tools excel in their respective domains, with Pipedrive improving sales workflows and Copy.ai enhancing writing efficiency. Choosing between them largely depends on whether you need CRM support or content generation capabilities.",
    "verdict": "Ultimately, the choice between Pipedrive and Copy.ai hinges on your specific needs. For sales teams looking to streamline their customer relationships, Pipedrive is a strong contender. In contrast, businesses focused on content creation and SEO may find Copy.ai more beneficial.",
    "metaDescription": "Compare Pipedrive and Copy.ai to find the right tool for CRM or content generation. Explore features, pricing, and use cases to make an informed decision.",
    "pros": {
      "toolA": [
        "User-friendly interface that simplifies sales tracking.",
        "Visual sales pipeline enhances deal management.",
        "Mobile app allows for productivity on the go."
      ],
      "toolB": [
        "Offers over 90 templates for diverse content needs.",
        "Facilitates collaboration among team members.",
        "API access enables integration with other applications."
      ]
    },
    "cons": {
      "toolA": [
        "Higher pricing compared to some other CRM tools.",
        "Limited advanced analytics features."
      ],
      "toolB": [
        "May not fully replace human creativity in writing.",
        "Focus on templates might limit unique content generation."
      ]
    }
  },
  "slug": "copy-ai-vs-pipedrive"
}

export default function PipedriveVsCopyaiPage() {
  return <ComparisonPage data={comparisonData} />
}
