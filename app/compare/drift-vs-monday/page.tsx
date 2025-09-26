import { metadata } from './metadata'
import ComparisonPage from '@/components/ComparisonPage'

export { metadata }

const comparisonData = {
  "toolA": {
    "slug": "monday",
    "name": "Monday Sales",
    "category": "CRM",
    "pricing": 40,
    "features": [
      "Customizable Boards",
      "Automation",
      "Timeline View",
      "Forms"
    ],
    "affiliateUrl": null
  },
  "toolB": {
    "slug": "drift",
    "name": "Drift",
    "category": "Chatbots",
    "pricing": 50,
    "features": [
      "Conversational AI",
      "Meeting Booking",
      "Email Fallback",
      "ABM Features"
    ],
    "affiliateUrl": null
  },
  "content": {
    "intro": "In the realm of sales tools, Monday Sales and Drift serve different purposes but both aim to enhance business efficiency. This comparison highlights their features, pricing, and functionality to help you determine which tool best suits your needs.",
    "toolAOverview": "Monday Sales is a CRM tool designed to streamline sales processes with customizable boards that adapt to various workflows. Its automation capabilities allow users to save time on repetitive tasks, while the timeline view provides a visual representation of sales activities. Additionally, forms can be created to capture leads directly from potential customers, enhancing engagement.",
    "toolBOverview": "Drift is a chatbot-focused platform aimed at improving customer interactions through conversational AI. It enables users to engage visitors in real-time, book meetings directly through the chat interface, and utilize email fallback for continued communication. Drift also includes account-based marketing (ABM) features, making it suitable for teams focused on targeted outreach and engagement.",
    "comparison": "While Monday Sales provides a structured environment for managing sales processes, Drift focuses on real-time customer engagement through chat solutions. In terms of pricing, Monday Sales is slightly more affordable at $40/month compared to Drift's $50/month. Both tools offer unique user experiences, with Monday Sales emphasizing customization and organization, whereas Drift prioritizes interactive communication. Performance-wise, Monday Sales is ideal for teams looking to enhance their CRM capabilities, while Drift excels in driving real-time conversations and bookings.",
    "verdict": "Both Monday Sales and Drift cater to specific business needs, with Monday Sales being better suited for CRM management and Drift excelling in customer engagement. Your choice should depend on whether you prioritize structured sales processes or interactive chat solutions.",
    "metaDescription": "Compare Monday Sales and Drift to find the right tool for CRM management or chatbot engagement for your business needs.",
    "pros": {
      "toolA": [
        "Highly customizable boards for tailored workflows",
        "Automation features that save time on repetitive tasks",
        "Visual timeline view for efficient sales tracking"
      ],
      "toolB": [
        "Real-time customer engagement through conversational AI",
        "Seamless meeting booking integration",
        "Effective ABM features for targeted outreach"
      ]
    },
    "cons": {
      "toolA": [
        "May require time to set up and customize effectively",
        "Lacks advanced features specific to real-time communication"
      ],
      "toolB": [
        "Higher price point compared to some competitors",
        "Limited functionality in areas outside of chat and engagement"
      ]
    }
  },
  "slug": "drift-vs-monday"
}

export default function MondaySalesVsDriftPage() {
  return <ComparisonPage data={comparisonData} />
}
