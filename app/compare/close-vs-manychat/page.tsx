import { metadata } from './metadata'
import ComparisonPage from '@/components/ComparisonPage'

export { metadata }

const comparisonData = {
  "toolA": {
    "slug": "manychat",
    "name": "ManyChat",
    "category": "Chatbots",
    "pricing": 15,
    "features": [
      "Facebook Messenger",
      "Instagram DM",
      "SMS",
      "Email"
    ],
    "affiliateUrl": null
  },
  "toolB": {
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
  "content": {
    "intro": "In today's digital landscape, choosing the right communication tool can significantly impact business operations. This comparison delves into ManyChat, a robust chatbot platform, and Close, a comprehensive sales engagement tool, to help you determine which best fits your needs.",
    "toolAOverview": "ManyChat is a leading chatbot platform that focuses on automating communication through popular messaging channels like Facebook Messenger, Instagram DM, SMS, and Email. With a user-friendly interface, it empowers businesses to engage with customers efficiently and effectively. ManyChat is particularly well-suited for marketing and customer support, allowing for personalized interactions at scale. Its pricing starts at an affordable $15 per month, making it accessible for small to medium-sized businesses.",
    "toolBOverview": "Close is a powerful sales engagement platform designed for sales teams to streamline their communication and manage customer relationships effectively. It offers a suite of features including built-in calling, email and SMS capabilities, pipeline management, detailed reporting, and workflow automation. This tool aims to enhance productivity and facilitate better tracking of sales activities. Priced at $99 per month, Close caters primarily to organizations looking for a comprehensive solution to optimize their sales processes.",
    "comparison": "When comparing ManyChat and Close, it's essential to consider their primary use cases. ManyChat excels in marketing automation and customer engagement, primarily through messaging platforms, while Close focuses on sales engagement and pipeline management. In terms of pricing, ManyChat is significantly more affordable at $15/month compared to Close's $99/month, making it a better option for smaller businesses. User experience varies, with ManyChat being more straightforward for marketers and Close offering in-depth tools for sales professionals. Overall, each tool serves distinct purposes, making the choice dependent on your specific business needs.",
    "verdict": "Ultimately, the decision between ManyChat and Close hinges on your primary objectives. If you're looking for affordable customer engagement solutions, ManyChat is a strong contender. Conversely, if your focus is on enhancing sales processes and workflow automation, Close may be the better fit.",
    "metaDescription": "Compare ManyChat and Close to find the best tool for chatbot marketing or sales engagement solutions in your business.",
    "pros": {
      "toolA": [
        "Affordable pricing at $15/month is suitable for small businesses.",
        "Supports multiple messaging platforms including Facebook and Instagram.",
        "User-friendly interface makes it easy to create and manage chatbots."
      ],
      "toolB": [
        "Comprehensive sales engagement features including built-in calling.",
        "Offers advanced pipeline management and reporting tools.",
        "Automates workflows, enhancing sales team productivity."
      ]
    },
    "cons": {
      "toolA": [
        "Limited in-depth analytics compared to more complex CRM tools.",
        "Primarily focused on messaging rather than full sales cycle management."
      ],
      "toolB": [
        "Higher price point at $99/month may be prohibitive for startups.",
        "Steeper learning curve due to the complexity of features."
      ]
    }
  },
  "slug": "close-vs-manychat"
}

export default function ManyChatVsClosePage() {
  return <ComparisonPage data={comparisonData} />
}
