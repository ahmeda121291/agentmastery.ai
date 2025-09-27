import { metadata } from './metadata'
import ComparisonPage from '@/components/ComparisonPage'

export { metadata }

const comparisonData = {
  "toolA": {
    "slug": "close",
    "name": "Close",
    "category": "Sales Engagement",
    "pricing": 99,
    "features": [
      "Built-in Calling",
      "Email & SMS",
      "Pipeline Management",
      "Reporting",
      "Workflow Automation"
    ],
    "affiliateUrl": "https://refer.close.com/lvdqjdm97t92-fetl0j"
  },
  "toolB": {
    "slug": "synthesia",
    "name": "Synthesia",
    "category": "Video",
    "pricing": 30,
    "features": [
      "AI Avatars",
      "120+ Languages",
      "Custom Avatars",
      "Templates"
    ],
    "affiliateUrl": "https://www.synthesia.io/?via=agentmastery"
  },
  "content": {
    "intro": "In today's digital landscape, choosing the right tools for sales engagement and video production can significantly impact your business's efficiency and outreach. This comparison explores Close and Synthesia, two distinct tools tailored for different needs.",
    "toolAOverview": "Close is a comprehensive sales engagement platform designed to streamline communication and manage sales pipelines effectively. It offers features such as built-in calling, email and SMS integration, and robust reporting capabilities. With workflow automation, Close aims to enhance productivity for sales teams by minimizing manual tasks. Its pricing starts at $99 per month, making it a powerful tool for businesses focusing on sales efficiency.",
    "toolBOverview": "Synthesia is a cutting-edge video creation platform that leverages AI technology to produce engaging content with ease. Users can create videos featuring custom avatars and select from over 120 languages, which makes it a versatile choice for diverse audiences. The platform also provides a variety of templates to help users quickly generate video content. With a more affordable price point of $30 per month, Synthesia is appealing for individuals and businesses looking to enhance their video marketing efforts.",
    "comparison": "Close and Synthesia serve fundamentally different purposes; Close focuses on sales engagement while Synthesia specializes in video production. In terms of pricing, Close is significantly more expensive at $99/month compared to Synthesia's $30/month, which may influence smaller businesses or individuals. User experience varies; Close may require a steeper learning curve due to its complex features, while Synthesia is designed for simplicity in video creation. Performance-wise, both tools excel within their environments, but the choice depends on whether a user prioritizes sales efficiency or video content creation.",
    "verdict": "Ultimately, the decision between Close and Synthesia comes down to your specific needs. If your focus is on enhancing sales engagement, Close is the better choice. Conversely, if video production is your priority, Synthesia offers an excellent solution at an accessible price point.",
    "metaDescription": "Compare Close and Synthesia to find the right tool for sales engagement or video production based on features, pricing, and use cases.",
    "pros": {
      "toolA": [
        "Comprehensive sales engagement features including calling and SMS.",
        "Robust pipeline management and reporting tools.",
        "Workflow automation to enhance team productivity."
      ],
      "toolB": [
        "Affordable pricing for video creation at $30/month.",
        "AI avatars and support for over 120 languages.",
        "User-friendly interface with customizable templates."
      ]
    },
    "cons": {
      "toolA": [
        "Higher price point may be a barrier for smaller businesses.",
        "Complex features can lead to a steeper learning curve."
      ],
      "toolB": [
        "Limited to video content, lacking sales engagement tools.",
        "Less robust features compared to specialized video software."
      ]
    }
  },
  "slug": "close-vs-synthesia"
}

export default function CloseVsSynthesiaPage() {
  return <ComparisonPage data={comparisonData} />
}
