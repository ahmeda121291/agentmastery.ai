import { metadata } from './metadata'
import ComparisonPage from '@/components/ComparisonPage'

export { metadata }

const comparisonData = {
  "toolA": {
    "slug": "intercom",
    "name": "Intercom",
    "category": "Chatbots",
    "pricing": 65,
    "features": [
      "AI Chatbot",
      "Help Center",
      "Team Inbox",
      "Product Tours"
    ],
    "affiliateUrl": null
  },
  "toolB": {
    "slug": "instantly",
    "name": "Instantly",
    "category": "Sales Engagement",
    "pricing": 37,
    "features": [
      "Email Warmup",
      "Campaign Builder",
      "Inbox Rotation",
      "Analytics"
    ],
    "affiliateUrl": null
  },
  "content": {
    "intro": "Intercom and Instantly serve different purposes in the realm of digital communication and sales. While Intercom focuses on customer support through chatbots, Instantly is geared towards enhancing sales engagement. This comparison will help you determine which tool best meets your needs.",
    "toolAOverview": "Intercom is a powerful chatbot platform designed to improve customer engagement through automated interactions. It features an AI chatbot that can provide instant responses, a help center for self-service support, a team inbox for managing customer queries, and product tours to guide users through your offerings. With a pricing model of $65/month, Intercom aims to streamline communication and enhance customer satisfaction.",
    "toolBOverview": "Instantly is a sales engagement tool that optimizes outreach and follow-up processes for sales teams. Priced at $37/month, it offers features like email warmup to improve deliverability, a campaign builder for crafting targeted email campaigns, inbox rotation to manage responses effectively, and analytics to track performance metrics. Instantly focuses on maximizing sales efficiency and engagement with prospects.",
    "comparison": "Intercom is well-suited for businesses looking to enhance customer support and interaction through chatbots and automated responses, while Instantly excels in facilitating email outreach and engagement for sales teams. In terms of pricing, Instantly is more affordable at $37/month compared to Intercom's $65/month. User experience varies, with Intercom offering a more visually interactive platform, whereas Instantly focuses on email-centric functionalities. Performance-wise, both tools are effective in their respective domains, yet they cater to different audiences and use cases.",
    "verdict": "Choosing between Intercom and Instantly ultimately depends on your specific goals. If your focus is on customer support and chatbot functionality, Intercom is the better choice. Conversely, if your primary need is sales engagement through email campaigns, Instantly may be more appropriate.",
    "metaDescription": "Compare Intercom and Instantly to find the best tool for customer support or sales engagement needs. Explore features, pricing, and pros/cons.",
    "pros": {
      "toolA": [
        "Comprehensive AI chatbot capabilities for instant customer support.",
        "Integrated help center for self-service options.",
        "User-friendly interface with team collaboration features."
      ],
      "toolB": [
        "Cost-effective solution for sales engagement.",
        "Powerful analytics features to track campaign performance.",
        "Email warmup feature to enhance deliverability rates."
      ]
    },
    "cons": {
      "toolA": [
        "Higher price point may be a barrier for smaller businesses.",
        "May require time to set up and customize effectively."
      ],
      "toolB": [
        "Limited to email engagement, lacking comprehensive support features.",
        "Less focus on real-time customer interaction."
      ]
    }
  },
  "slug": "instantly-vs-intercom"
}

export default function IntercomVsInstantlyPage() {
  return <ComparisonPage data={comparisonData} />
}
