import { metadata } from './metadata'
import ComparisonPage from '@/components/ComparisonPage'

export { metadata }

const comparisonData = {
  "toolA": {
    "slug": "aiseo",
    "name": "AISEO",
    "category": "Writing/SEO",
    "pricing": 29,
    "features": [
      "SEO-Optimized Content",
      "Readability Analysis",
      "Keyword Research",
      "Multi-language"
    ],
    "affiliateUrl": null
  },
  "toolB": {
    "slug": "surfer",
    "name": "SurferSEO",
    "category": "Writing/SEO",
    "pricing": 89,
    "features": [
      "Content Editor",
      "SERP Analysis",
      "Keyword Research",
      "Content Audit"
    ],
    "affiliateUrl": null
  },
  "content": {
    "intro": "AISEO and SurferSEO help content creators optimize their writing for search engines, but take different approaches. AISEO focuses on AI-powered content generation, while SurferSEO emphasizes data-driven optimization based on SERP analysis.",
    "toolAOverview": "AISEO combines AI writing with SEO optimization in one affordable platform. At $29/month, it generates SEO-optimized content, provides readability analysis, and supports multiple languages. AISEO is perfect for content creators who want AI assistance with built-in optimization.",
    "toolBOverview": "SurferSEO is the data-driven SEO content optimization tool used by serious content teams. At $89/month, it provides detailed SERP analysis, content editor with real-time scoring, and keyword research. Surfer helps you match and beat top-ranking content through comprehensive competitive analysis.",
    "comparison": "AISEO at $29/month is more affordable and includes AI writing, while SurferSEO at $89/month focuses purely on optimization. AISEO generates content from scratch, while Surfer optimizes existing content. Surfer provides more detailed SERP analysis and competitor insights, while AISEO offers better multilingual support. AISEO suits solo creators, while Surfer is built for SEO teams.",
    "verdict": "Choose AISEO if you want affordable AI content generation with basic SEO optimization. Choose SurferSEO if you need comprehensive SERP analysis and data-driven optimization for serious content marketing.",
    "metaDescription": "AISEO vs SurferSEO: AISEO at $29/mo for AI writing vs Surfer at $89/mo for SERP analysis. Compare SEO content tools for your needs.",
    "pros": {
      "toolA": [
        "AI content generation included",
        "More affordable pricing",
        "Better multilingual support"
      ],
      "toolB": [
        "Comprehensive SERP analysis",
        "Real-time content scoring",
        "Advanced keyword research"
      ]
    },
    "cons": {
      "toolA": [
        "Less detailed optimization data",
        "Basic competitor analysis"
      ],
      "toolB": [
        "No content generation",
        "Higher price point"
      ]
    }
  },
  "slug": "aiseo-vs-surfer"
}

export default function AISEOVsSurferSEOPage() {
  return <ComparisonPage data={comparisonData} />
}
