import { metadata } from './metadata'
import ComparisonPage from '@/components/ComparisonPage'

export { metadata }

const comparisonData = {
  "toolA": {
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
  "toolB": {
    "slug": "writesonic",
    "name": "Writesonic",
    "category": "Writing/SEO",
    "pricing": 19,
    "features": [
      "Article Writer",
      "Product Descriptions",
      "Ad Copy",
      "Landing Pages"
    ],
    "affiliateUrl": null
  },
  "content": {
    "intro": "In this comparison, we will examine Loom and Writesonic, two tools that cater to different needs in content creation. Loom specializes in video communication, while Writesonic focuses on enhancing writing and SEO efforts.",
    "toolAOverview": "Loom is a video tool designed to facilitate screen recording and webcam integration, making it easy to create instructional videos or share updates. Priced at $15 per month, it allows for instant sharing of recorded content and includes features for viewer comments. This makes Loom particularly useful for teams and individuals looking to enhance communication and collaboration through visual content.",
    "toolBOverview": "Writesonic is a versatile writing and SEO tool aimed at generating high-quality written content quickly. At $19 per month, it offers features such as article writing, product descriptions, ad copy, and landing page creation. This tool is designed for marketers, content creators, and businesses looking to streamline their writing processes and improve their online presence.",
    "comparison": "When comparing Loom and Writesonic, it’s clear they serve different purposes; Loom focuses on video creation while Writesonic centers on text-based content. In terms of pricing, Loom is slightly cheaper at $15/month compared to Writesonic's $19/month. Both tools offer user-friendly interfaces, but Loom's instant sharing feature enhances its usability for real-time communication. Performance-wise, Writesonic excels in generating various written formats quickly, whereas Loom is effective for creating engaging visual content. Ultimately, the choice between them depends on whether you need video or written content.",
    "verdict": "Both Loom and Writesonic are valuable tools in their respective domains. Your choice should depend on your specific needs—whether you require video communication or robust writing capabilities.",
    "metaDescription": "Compare Loom vs Writesonic: discover features, pricing, pros, and cons of these two unique content creation tools.",
    "pros": {
      "toolA": [
        "Easy to use for screen recording and webcam integration.",
        "Facilitates instant sharing of videos for quick communication.",
        "Allows for comments on videos, enhancing collaboration."
      ],
      "toolB": [
        "Generates a variety of written content quickly and efficiently.",
        "Includes SEO features to help improve online visibility.",
        "User-friendly interface suitable for both beginners and professionals."
      ]
    },
    "cons": {
      "toolA": [
        "Limited to video content, not suitable for text-based tasks.",
        "May require a stable internet connection for optimal performance."
      ],
      "toolB": [
        "Pricing is slightly higher than some other writing tools.",
        "Content generated may require additional editing for quality."
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
      "integrations": "partial",
      "data_export": "yes",
      "workflows": "partial",
      "templates": "yes",
      "white_label": "no",
      "sso": "no",
      "bulk_operations": "partial",
      "real_time": "no"
    },
    "toolB": {
      "ai_capabilities": "yes",
      "automation": "partial",
      "api": "no",
      "team": "partial",
      "analytics": "yes",
      "support": "partial",
      "mobile": "partial",
      "integrations": "partial",
      "data_export": "yes",
      "workflows": "partial",
      "templates": "yes",
      "white_label": "no",
      "sso": "no",
      "bulk_operations": "yes",
      "real_time": "partial"
    }
  }
  },
  "slug": "loom-vs-writesonic"
}

export default function LoomVsWritesonicPage() {
  return <ComparisonPage data={comparisonData} />
}
