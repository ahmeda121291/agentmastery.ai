import { metadata } from './metadata'
import ComparisonPage from '@/components/ComparisonPage'

export { metadata }

const comparisonData = {
  "toolA": {
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
    "affiliateUrl": null
  },
  "toolB": {
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
  "content": {
    "intro": "Synthesia and HeyGen are leading AI video generation platforms that create professional videos using AI avatars. Both eliminate the need for cameras, actors, and studios, but offer different features, languages, and customization options.",
    "toolAOverview": "Synthesia is the enterprise-grade AI video platform trusted by Fortune 500 companies. At $30/month, it offers 120+ languages, custom avatars, and professional templates. Synthesia focuses on corporate training, learning content, and marketing videos with strict content moderation.",
    "toolBOverview": "HeyGen provides accessible AI video creation with innovative features like voice cloning and video translation. At $29/month, it offers realistic avatars, API access, and quick turnaround times. HeyGen appeals to content creators, marketers, and businesses needing scalable video production.",
    "comparison": "Both are similarly priced ($30 vs $29/month) but target different users. Synthesia offers more languages (120+ vs 40+) and better enterprise features, while HeyGen provides voice cloning and faster rendering. Synthesia has stricter content guidelines for brand safety, while HeyGen is more flexible. Synthesia excels at corporate training videos, while HeyGen is better for marketing and social content.",
    "verdict": "Choose Synthesia if you're an enterprise needing professional training videos with multiple languages and custom avatars. Choose HeyGen if you want voice cloning, video translation, and faster content creation for marketing.",
    "metaDescription": "Synthesia vs HeyGen AI video comparison: Synthesia at $30/mo with 120+ languages vs HeyGen at $29/mo with voice cloning. Pick your AI video tool.",
    "pros": {
      "toolA": [
        "120+ language support",
        "Enterprise-grade security",
        "Custom avatar creation"
      ],
      "toolB": [
        "Voice cloning capability",
        "Faster video rendering",
        "Video translation features"
      ]
    },
    "cons": {
      "toolA": [
        "Stricter content guidelines",
        "Slower rendering times"
      ],
      "toolB": [
        "Fewer language options",
        "Less enterprise features"
      ]
    },
  "availability": {
    "toolA": {
      "ai_capabilities": "yes",
      "automation": "partial",
      "api": "no",
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
    }
  }
  },
  "slug": "heygen-vs-synthesia"
}

export default function SynthesiaVsHeyGenPage() {
  return <ComparisonPage data={comparisonData} />
}
