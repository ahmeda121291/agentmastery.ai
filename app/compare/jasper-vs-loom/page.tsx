import { metadata } from './metadata'
import ComparisonPage from '@/components/ComparisonPage'

export { metadata }

const comparisonData = {
  "toolA": {
    "slug": "jasper",
    "name": "Jasper",
    "category": "Writing/SEO",
    "pricing": 39,
    "features": [
      "AI Content Generation",
      "50+ Templates",
      "Brand Voice",
      "SEO Mode"
    ],
    "affiliateUrl": null
  },
  "toolB": {
    "slug": "loom",
    "name": "Loom",
    "category": "Video",
    "pricing": 15,
    "features": [
      "Screen Recording",
      "Webcam",
      "Instant Sharing",
      "Comments"
    ],
    "affiliateUrl": null
  },
  "content": {
    "intro": "In today's digital landscape, content creation and communication tools are essential for businesses and individuals alike. This comparison examines Jasper, a writing and SEO tool, against Loom, a video communication platform, to help you determine which might best fit your needs.",
    "toolAOverview": "Jasper is a powerful AI-driven writing tool designed to assist users in generating high-quality content efficiently. With over 50 templates, it caters to various writing needs, including blog posts, marketing copy, and social media updates. Jasper also features a brand voice setting, allowing users to maintain consistency in their messaging. Additionally, its SEO mode helps optimize content for better search engine rankings.",
    "toolBOverview": "Loom is a versatile video communication tool focused on simplifying screen recording and sharing. It enables users to create video messages combining screen captures and webcam recordings, making it ideal for tutorials, presentations, and feedback sessions. Loom's instant sharing feature streamlines communication by allowing users to send videos quickly, while the comments functionality facilitates real-time feedback. With its user-friendly interface, Loom is designed to enhance remote collaboration.",
    "comparison": "Both Jasper and Loom serve distinct purposes; Jasper excels in content creation while Loom specializes in video communication. In terms of pricing, Jasper is more expensive at $39/month compared to Loom's $15/month, making Loom a more budget-friendly option for users focused on video. User experience for both tools is generally positive, with Jasper offering a comprehensive writing interface and Loom providing a straightforward video recording process. Performance-wise, Jasper's AI capabilities can produce content quickly, while Loom's video rendering and sharing are efficient and seamless.",
    "verdict": "Ultimately, the choice between Jasper and Loom hinges on your specific needs. If you require robust writing and SEO capabilities, Jasper is a strong contender. Conversely, if video communication and collaboration are your priorities, Loom is an excellent choice.",
    "metaDescription": "Compare Jasper and Loom to find out which tool best suits your writing and video communication needs. Learn about features, pricing, and more.",
    "pros": {
      "toolA": [
        "Offers advanced AI content generation for various writing needs.",
        "Includes over 50 templates for different content types.",
        "SEO Mode helps optimize content for search engines."
      ],
      "toolB": [
        "User-friendly interface for easy screen recording and sharing.",
        "Allows for quick feedback with integrated comments.",
        "Affordable pricing at $15/month compared to many competitors."
      ]
    },
    "cons": {
      "toolA": [
        "Higher price point may be a barrier for some users.",
        "AI-generated content may require editing for tone and style."
      ],
      "toolB": [
        "Limited to video communication, lacking broader features.",
        "May not be suitable for users who prefer text-based content."
      ]
    },
  "availability": {
    "toolA": {
      "ai_capabilities": "yes",
      "automation": "partial",
      "api": "no",
      "team": "yes",
      "analytics": "yes",
      "support": "partial",
      "mobile": "partial",
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
      "ai_capabilities": "partial",
      "automation": "partial",
      "api": "no",
      "team": "yes",
      "analytics": "yes",
      "support": "partial",
      "mobile": "yes",
      "integrations": "partial",
      "data_export": "yes",
      "workflows": "partial",
      "templates": "yes",
      "white_label": "no",
      "sso": "no",
      "bulk_operations": "partial",
      "real_time": "no"
    }
  }
  },
  "slug": "jasper-vs-loom"
}

export default function JasperVsLoomPage() {
  return <ComparisonPage data={comparisonData} />
}
