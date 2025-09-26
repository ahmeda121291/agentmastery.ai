import { metadata } from './metadata'
import ComparisonPage from '@/components/ComparisonPage'

export { metadata }

const comparisonData = {
  "toolA": {
    "slug": "heygen",
    "name": "HeyGen",
    "category": "Video",
    "pricing": 29,
    "features": [
      "AI Avatars",
      "Voice Cloning",
      "Video Translation",
      "API Access"
    ],
    "affiliateUrl": null
  },
  "toolB": {
    "slug": "clearbit",
    "name": "Clearbit",
    "category": "Database",
    "pricing": 199,
    "features": [
      "Company Data",
      "Contact Enrichment",
      "Intent Signals",
      "API Access"
    ],
    "affiliateUrl": null
  },
  "content": {
    "intro": "In the ever-evolving landscape of digital tools, HeyGen and Clearbit serve distinct purposes in video creation and data management, respectively. While HeyGen focuses on enhancing video content with AI technologies, Clearbit emphasizes enriching contact and company data for business insights. This comparison explores the unique features and use cases of both tools to help users make informed decisions.",
    "toolAOverview": "HeyGen is a video creation tool that leverages artificial intelligence to provide users with innovative features such as AI avatars, voice cloning, and video translation. Priced at $29 per month, it caters to content creators looking to enhance their video production with cutting-edge technology. The tool also offers API access, allowing developers to integrate its capabilities into their own applications. Overall, HeyGen is designed for those who want to create engaging video content quickly and efficiently.",
    "toolBOverview": "Clearbit is a robust database tool that specializes in providing comprehensive company data and contact enrichment services. At a price of $199 per month, it is tailored for businesses that need to gain insights into their target markets and enhance their lead generation efforts. Clearbit’s features include intent signals and API access, making it a powerful resource for sales and marketing teams. With a focus on data-driven decision-making, Clearbit helps organizations improve their outreach and engagement strategies.",
    "comparison": "HeyGen and Clearbit serve different markets, with HeyGen targeting content creators and video marketers, while Clearbit focuses on sales and marketing professionals looking to leverage data. The pricing reflects this distinction, with HeyGen being significantly more affordable at $29/month compared to Clearbit's $199/month. In terms of user experience, HeyGen offers a creative and intuitive interface for video production, whereas Clearbit provides a data-centric platform designed for data analysis and integration. Performance-wise, HeyGen excels in video rendering and customization, while Clearbit shines in data accuracy and enrichment capabilities. Ultimately, the choice between the two depends on the specific needs of the user or organization.",
    "verdict": "Both HeyGen and Clearbit are powerful tools within their respective domains. Users seeking to create compelling video content may find HeyGen to be a cost-effective solution, while those needing comprehensive data for sales and marketing may prefer the robust capabilities of Clearbit.",
    "metaDescription": "Compare HeyGen vs Clearbit: Explore features, pricing, and use cases for video creation and data management tools.",
    "pros": {
      "toolA": [
        "Affordable pricing at $29/month makes it accessible for individuals and small teams.",
        "Innovative features like AI avatars and voice cloning enhance video content significantly.",
        "User-friendly interface allows for quick and efficient video production."
      ],
      "toolB": [
        "Comprehensive company and contact data helps improve lead generation and outreach.",
        "Robust API access allows for seamless integration into existing workflows.",
        "Offers intent signals that can help identify potential leads and engagement opportunities."
      ]
    },
    "cons": {
      "toolA": [
        "Limited to video-related features, which may not suit all users.",
        "May lack some advanced functionalities found in more expensive video creation tools."
      ],
      "toolB": [
        "Higher price point may be a barrier for small businesses or individual users.",
        "Focus on data may not appeal to users looking for creative content solutions."
      ]
    },
  "availability": {
    "toolA": {
      "ai_capabilities": "yes",
      "automation": "partial",
      "api": "partial",
      "team": "partial",
      "analytics": "yes",
      "support": "partial",
      "mobile": "no",
      "integrations": "partial",
      "data_export": "yes",
      "workflows": "partial",
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
  "slug": "clearbit-vs-heygen"
}

export default function HeyGenVsClearbitPage() {
  return <ComparisonPage data={comparisonData} />
}
