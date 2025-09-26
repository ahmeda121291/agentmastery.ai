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
    "intro": "Jasper and Copy.ai are leading AI writing assistants that help marketers and content creators produce copy at scale. Both leverage advanced language models but target different use cases and user segments with distinct features and pricing.",
    "toolAOverview": "Jasper is positioned as the premium AI writing platform for businesses, offering advanced features like brand voice, team collaboration, and 50+ templates. It integrates with popular marketing tools and provides SEO mode for content optimization. Jasper is designed for content teams and agencies producing high-volume marketing copy.",
    "toolBOverview": "Copy.ai focuses on simplicity and accessibility, making AI writing available to everyone with 90+ templates and a generous free tier. It excels at short-form copy like ads, emails, and social posts. Copy.ai offers brand voice features and API access at competitive pricing for growing businesses.",
    "comparison": "Jasper costs $39/month versus Copy.ai at $36/month, making them similarly priced. Jasper offers more advanced features for long-form content and SEO optimization, while Copy.ai provides more templates and easier onboarding. Jasper has better team collaboration features, while Copy.ai has a more generous free plan. Both offer brand voice customization, but Jasper's is more sophisticated.",
    "verdict": "Choose Jasper if you need advanced content creation features, SEO optimization, and team collaboration. Choose Copy.ai if you want more templates, easier setup, and primarily create short-form marketing copy.",
    "metaDescription": "Jasper vs Copy.ai comparison: Jasper at $39/mo offers advanced features while Copy.ai at $36/mo provides 90+ templates. Find your ideal AI writer.",
    "pros": {
      "toolA": [
        "Advanced SEO optimization features",
        "Better for long-form content",
        "Superior team collaboration"
      ],
      "toolB": [
        "90+ templates available",
        "More generous free plan",
        "Easier to get started"
      ]
    },
    "cons": {
      "toolA": [
        "Steeper learning curve",
        "More expensive for basic needs"
      ],
      "toolB": [
        "Limited long-form capabilities",
        "Fewer integration options"
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
      "bulk_operations": "partial",
      "real_time": "partial"
    }
  }
  },
  "slug": "copy-ai-vs-jasper"
}

export default function JasperVsCopyaiPage() {
  return <ComparisonPage data={comparisonData} />
}
