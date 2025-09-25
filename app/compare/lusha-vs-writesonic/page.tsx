import { metadata } from './metadata'
import ComparisonPage from '@/components/ComparisonPage'

export { metadata }

const comparisonData = {
  "toolA": {
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
  "toolB": {
    "slug": "lusha",
    "name": "Lusha",
    "category": "Database",
    "pricing": 79,
    "features": [
      "Direct Dials",
      "Email Finder",
      "Chrome Extension",
      "CRM Integration"
    ],
    "affiliateUrl": null
  },
  "content": {
    "intro": "In the realm of digital tools, Writesonic and Lusha cater to distinct needs. While Writesonic focuses on content creation and SEO optimization, Lusha provides valuable data for B2B outreach and lead generation.",
    "toolAOverview": "Writesonic is a writing and SEO tool designed to help users generate high-quality content efficiently. Its features include an article writer, product descriptions, ad copy, and landing page creation. With a user-friendly interface, it aims to assist marketers and content creators in enhancing their online presence. Priced at $19 per month, it offers a cost-effective solution for those looking to produce written content.",
    "toolBOverview": "Lusha is a database tool that specializes in providing direct contact information for professionals, making it ideal for sales teams and recruiters. Key features include direct dials, an email finder, a Chrome extension, and CRM integration, which streamline the process of finding and contacting leads. At $79 per month, Lusha is a more premium option aimed at businesses that require extensive outreach capabilities and accurate data.",
    "comparison": "Writesonic and Lusha serve different purposes, making them suitable for different user needs. Writesonic is much more budget-friendly at $19 per month, while Lusha's $79 price tag reflects its specialized data services. In terms of user experience, Writesonic is designed for those looking to create content quickly, whereas Lusha offers tools that enhance lead generation and outreach. Performance-wise, Writesonic excels in generating diverse types of content, while Lusha ensures users have access to reliable contact information. Depending on your requirements, one tool may be more beneficial than the other.",
    "verdict": "Ultimately, the choice between Writesonic and Lusha depends on your specific needs. If content creation is your priority, Writesonic may be the better option, while Lusha is ideal for businesses focused on lead generation and contact management.",
    "metaDescription": "Compare Writesonic vs Lusha for content creation and lead generation. Discover features, pricing, pros, and cons to make an informed choice.",
    "pros": {
      "toolA": [
        "Affordable pricing at $19/month.",
        "User-friendly interface for easy content creation.",
        "Versatile features for various content types."
      ],
      "toolB": [
        "Robust data for lead generation and outreach.",
        "Integration with CRM systems for streamlined workflow.",
        "Chrome extension for quick access to contact information."
      ]
    },
    "cons": {
      "toolA": [
        "Limited features compared to more comprehensive writing tools.",
        "May require additional SEO tools for in-depth analysis."
      ],
      "toolB": [
        "Higher price point at $79/month.",
        "Focus primarily on B2B, which may not suit all users."
      ]
    }
  },
  "slug": "lusha-vs-writesonic"
}

export default function WritesonicVsLushaPage() {
  return <ComparisonPage data={comparisonData} />
}
