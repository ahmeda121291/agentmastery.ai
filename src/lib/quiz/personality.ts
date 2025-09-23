export interface PersonalityQuestion {
  id: number
  question: string
  answers: {
    text: string
    weights: Record<PersonalityType, number>
  }[]
}

export type PersonalityType =
  | 'claude-bro'
  | 'chatgpt-hustler'
  | 'midjourney-dreamer'
  | 'excel-wizard'
  | 'autogpt-ops'
  | 'research-owl'

export interface PersonalityResult {
  type: PersonalityType
  name: string
  emoji: string
  tagline: string
  description: string
  strengths: string[]
  bestFor: string[]
  recommendedTools: {
    name: string
    href: string
    description: string
  }[]
  color: string
  gradient: string
  shareText: {
    reddit: string
    x: string
    linkedin: string
  }
  recommendedReads: {
    title: string
    href: string
  }[]
}

export const PERSONALITY_QUESTIONS: PersonalityQuestion[] = [
  {
    id: 1,
    question: "How do you prefer to start your workday?",
    answers: [
      {
        text: "Deep dive into research and documentation 📚",
        weights: { 'claude-bro': 3, 'research-owl': 4, 'chatgpt-hustler': 1, 'midjourney-dreamer': 0, 'excel-wizard': 2, 'autogpt-ops': 1 }
      },
      {
        text: "Quick wins and rapid iterations ⚡",
        weights: { 'chatgpt-hustler': 4, 'autogpt-ops': 3, 'claude-bro': 1, 'research-owl': 0, 'midjourney-dreamer': 2, 'excel-wizard': 2 }
      },
      {
        text: "Visualizing the big picture 🎨",
        weights: { 'midjourney-dreamer': 4, 'claude-bro': 2, 'chatgpt-hustler': 1, 'research-owl': 1, 'excel-wizard': 0, 'autogpt-ops': 1 }
      },
      {
        text: "Organizing data and processes 📊",
        weights: { 'excel-wizard': 4, 'autogpt-ops': 3, 'claude-bro': 2, 'research-owl': 2, 'chatgpt-hustler': 1, 'midjourney-dreamer': 0 }
      }
    ]
  },
  {
    id: 2,
    question: "Your ideal AI assistant would help you:",
    answers: [
      {
        text: "Write thoughtful, nuanced content",
        weights: { 'claude-bro': 4, 'research-owl': 3, 'chatgpt-hustler': 1, 'midjourney-dreamer': 0, 'excel-wizard': 1, 'autogpt-ops': 0 }
      },
      {
        text: "Generate quick ideas and responses",
        weights: { 'chatgpt-hustler': 4, 'claude-bro': 2, 'research-owl': 1, 'midjourney-dreamer': 1, 'excel-wizard': 1, 'autogpt-ops': 2 }
      },
      {
        text: "Create stunning visuals and designs",
        weights: { 'midjourney-dreamer': 5, 'claude-bro': 0, 'chatgpt-hustler': 1, 'research-owl': 0, 'excel-wizard': 0, 'autogpt-ops': 0 }
      },
      {
        text: "Automate repetitive tasks",
        weights: { 'autogpt-ops': 5, 'excel-wizard': 3, 'claude-bro': 1, 'chatgpt-hustler': 2, 'research-owl': 1, 'midjourney-dreamer': 0 }
      }
    ]
  },
  {
    id: 3,
    question: "How do you handle complex problems?",
    answers: [
      {
        text: "Break them down methodically",
        weights: { 'claude-bro': 4, 'excel-wizard': 3, 'research-owl': 3, 'autogpt-ops': 2, 'chatgpt-hustler': 1, 'midjourney-dreamer': 0 }
      },
      {
        text: "Try multiple quick solutions",
        weights: { 'chatgpt-hustler': 4, 'autogpt-ops': 2, 'claude-bro': 1, 'excel-wizard': 1, 'research-owl': 0, 'midjourney-dreamer': 1 }
      },
      {
        text: "Research extensively first",
        weights: { 'research-owl': 5, 'claude-bro': 3, 'excel-wizard': 2, 'chatgpt-hustler': 0, 'autogpt-ops': 1, 'midjourney-dreamer': 0 }
      },
      {
        text: "Visualize different scenarios",
        weights: { 'midjourney-dreamer': 4, 'claude-bro': 2, 'chatgpt-hustler': 1, 'research-owl': 1, 'excel-wizard': 1, 'autogpt-ops': 0 }
      }
    ]
  },
  {
    id: 4,
    question: "Your friends describe you as:",
    answers: [
      {
        text: "The thoughtful philosopher 🤔",
        weights: { 'claude-bro': 5, 'research-owl': 3, 'chatgpt-hustler': 0, 'midjourney-dreamer': 1, 'excel-wizard': 1, 'autogpt-ops': 0 }
      },
      {
        text: "The creative visionary 🌟",
        weights: { 'midjourney-dreamer': 5, 'claude-bro': 1, 'chatgpt-hustler': 2, 'research-owl': 0, 'excel-wizard': 0, 'autogpt-ops': 1 }
      },
      {
        text: "The efficiency expert 📈",
        weights: { 'excel-wizard': 4, 'autogpt-ops': 4, 'chatgpt-hustler': 2, 'claude-bro': 1, 'research-owl': 1, 'midjourney-dreamer': 0 }
      },
      {
        text: "The quick-witted problem solver ⚡",
        weights: { 'chatgpt-hustler': 5, 'autogpt-ops': 2, 'claude-bro': 1, 'excel-wizard': 2, 'research-owl': 0, 'midjourney-dreamer': 1 }
      }
    ]
  },
  {
    id: 5,
    question: "Your favorite type of content to consume:",
    answers: [
      {
        text: "Long-form analysis and deep dives",
        weights: { 'research-owl': 5, 'claude-bro': 4, 'excel-wizard': 1, 'chatgpt-hustler': 0, 'autogpt-ops': 1, 'midjourney-dreamer': 0 }
      },
      {
        text: "Quick tips and hacks",
        weights: { 'chatgpt-hustler': 5, 'autogpt-ops': 3, 'excel-wizard': 2, 'claude-bro': 0, 'research-owl': 0, 'midjourney-dreamer': 1 }
      },
      {
        text: "Visual stories and infographics",
        weights: { 'midjourney-dreamer': 5, 'chatgpt-hustler': 1, 'claude-bro': 0, 'research-owl': 0, 'excel-wizard': 1, 'autogpt-ops': 0 }
      },
      {
        text: "Data reports and case studies",
        weights: { 'excel-wizard': 5, 'research-owl': 3, 'claude-bro': 2, 'autogpt-ops': 2, 'chatgpt-hustler': 1, 'midjourney-dreamer': 0 }
      }
    ]
  },
  {
    id: 6,
    question: "When learning something new, you:",
    answers: [
      {
        text: "Read everything available first",
        weights: { 'research-owl': 5, 'claude-bro': 3, 'excel-wizard': 2, 'chatgpt-hustler': 0, 'autogpt-ops': 1, 'midjourney-dreamer': 0 }
      },
      {
        text: "Jump in and figure it out",
        weights: { 'chatgpt-hustler': 5, 'autogpt-ops': 3, 'midjourney-dreamer': 2, 'claude-bro': 0, 'research-owl': 0, 'excel-wizard': 1 }
      },
      {
        text: "Look for patterns and systems",
        weights: { 'excel-wizard': 4, 'autogpt-ops': 4, 'claude-bro': 3, 'research-owl': 2, 'chatgpt-hustler': 1, 'midjourney-dreamer': 0 }
      },
      {
        text: "Find visual examples and tutorials",
        weights: { 'midjourney-dreamer': 5, 'chatgpt-hustler': 2, 'claude-bro': 1, 'research-owl': 1, 'excel-wizard': 1, 'autogpt-ops': 0 }
      }
    ]
  },
  {
    id: 7,
    question: "Your productivity superpower is:",
    answers: [
      {
        text: "Deep focus for hours",
        weights: { 'claude-bro': 4, 'research-owl': 5, 'excel-wizard': 2, 'midjourney-dreamer': 1, 'chatgpt-hustler': 0, 'autogpt-ops': 1 }
      },
      {
        text: "Rapid context switching",
        weights: { 'chatgpt-hustler': 5, 'autogpt-ops': 3, 'claude-bro': 0, 'research-owl': 0, 'midjourney-dreamer': 2, 'excel-wizard': 2 }
      },
      {
        text: "Building automated systems",
        weights: { 'autogpt-ops': 5, 'excel-wizard': 4, 'claude-bro': 1, 'chatgpt-hustler': 2, 'research-owl': 1, 'midjourney-dreamer': 0 }
      },
      {
        text: "Creative problem solving",
        weights: { 'midjourney-dreamer': 4, 'claude-bro': 3, 'chatgpt-hustler': 2, 'research-owl': 1, 'excel-wizard': 0, 'autogpt-ops': 1 }
      }
    ]
  },
  {
    id: 8,
    question: "Your dream AI workflow involves:",
    answers: [
      {
        text: "Having deep conversations with AI",
        weights: { 'claude-bro': 5, 'research-owl': 3, 'chatgpt-hustler': 1, 'midjourney-dreamer': 0, 'excel-wizard': 0, 'autogpt-ops': 0 }
      },
      {
        text: "Quick prompts, instant results",
        weights: { 'chatgpt-hustler': 5, 'autogpt-ops': 2, 'claude-bro': 1, 'research-owl': 0, 'midjourney-dreamer': 1, 'excel-wizard': 2 }
      },
      {
        text: "AI handling everything automatically",
        weights: { 'autogpt-ops': 5, 'excel-wizard': 3, 'chatgpt-hustler': 2, 'claude-bro': 0, 'research-owl': 0, 'midjourney-dreamer': 0 }
      },
      {
        text: "Collaborating on creative projects",
        weights: { 'midjourney-dreamer': 5, 'claude-bro': 2, 'chatgpt-hustler': 1, 'research-owl': 0, 'excel-wizard': 0, 'autogpt-ops': 1 }
      }
    ]
  },
  {
    id: 9,
    question: "In meetings, you're the one who:",
    answers: [
      {
        text: "Asks the deep questions",
        weights: { 'claude-bro': 5, 'research-owl': 4, 'excel-wizard': 1, 'chatgpt-hustler': 0, 'autogpt-ops': 0, 'midjourney-dreamer': 1 }
      },
      {
        text: "Drives quick decisions",
        weights: { 'chatgpt-hustler': 5, 'autogpt-ops': 3, 'excel-wizard': 2, 'claude-bro': 0, 'research-owl': 0, 'midjourney-dreamer': 0 }
      },
      {
        text: "Presents the data",
        weights: { 'excel-wizard': 5, 'research-owl': 3, 'autogpt-ops': 2, 'claude-bro': 1, 'chatgpt-hustler': 1, 'midjourney-dreamer': 0 }
      },
      {
        text: "Sketches ideas on the whiteboard",
        weights: { 'midjourney-dreamer': 5, 'claude-bro': 1, 'chatgpt-hustler': 2, 'research-owl': 0, 'excel-wizard': 0, 'autogpt-ops': 0 }
      }
    ]
  },
  {
    id: 10,
    question: "Your motto for AI tools is:",
    answers: [
      {
        text: "Quality over speed, always",
        weights: { 'claude-bro': 5, 'research-owl': 4, 'excel-wizard': 2, 'midjourney-dreamer': 1, 'chatgpt-hustler': 0, 'autogpt-ops': 0 }
      },
      {
        text: "Ship fast, iterate faster",
        weights: { 'chatgpt-hustler': 5, 'autogpt-ops': 3, 'claude-bro': 0, 'research-owl': 0, 'midjourney-dreamer': 1, 'excel-wizard': 1 }
      },
      {
        text: "Automate or die trying",
        weights: { 'autogpt-ops': 5, 'excel-wizard': 3, 'chatgpt-hustler': 2, 'claude-bro': 0, 'research-owl': 0, 'midjourney-dreamer': 0 }
      },
      {
        text: "Make it beautiful",
        weights: { 'midjourney-dreamer': 5, 'claude-bro': 1, 'chatgpt-hustler': 1, 'research-owl': 0, 'excel-wizard': 0, 'autogpt-ops': 0 }
      }
    ]
  }
]

export const PERSONALITY_RESULTS: Record<PersonalityType, PersonalityResult> = {
  'claude-bro': {
    type: 'claude-bro',
    name: 'Claude Bro',
    emoji: '🤖',
    tagline: 'The Thoughtful Philosopher',
    description: 'You approach AI tools with depth and nuance. While others rush to conclusions, you craft elegant, well-reasoned solutions.',
    strengths: [
      'Deep analytical thinking',
      'Exceptional writing quality',
      'Nuanced problem-solving'
    ],
    bestFor: [
      'Long-form content creation',
      'Complex reasoning tasks',
      'Ethical considerations'
    ],
    recommendedTools: [
      { name: 'Clay', href: 'https://clay.com/?ref=agentmastery', description: 'Research and enrich data at scale' },
      { name: 'Apollo', href: 'https://get.apollo.io/qq0iw5w2fskf', description: 'Deep contact research and insights' },
      { name: 'Gong', href: 'https://gong.io/?ref=agentmastery', description: 'Conversation intelligence for research' }
    ],
    color: 'from-purple-500 to-indigo-600',
    gradient: 'from-purple-500/20 via-indigo-500/20 to-blue-500/20',
    shareText: {
      reddit: 'I got "Claude Bro 🤖" on AgentMastery\'s AI Tool Personality Quiz — what are you?',
      x: 'I got "Claude Bro 🤖" on AgentMastery\'s AI Tool Personality Quiz. Which AI tool personality are you?',
      linkedin: 'Fun: I\'m a Claude Bro 🤖 on AgentMastery\'s AI Tool Personality Quiz — surprisingly accurate. Try it and post your result:'
    },
    recommendedReads: [
      { title: 'Claude vs ChatGPT Comparison', href: '/compare/claude-vs-chatgpt' },
      { title: 'AI Writing Tools Guide', href: '/blog/choosing-the-right-ai-sales-automation-tools-a-comprehensive-comparison' },
      { title: 'Quick AI Tips', href: '/answers' }
    ]
  },
  'chatgpt-hustler': {
    type: 'chatgpt-hustler',
    name: 'ChatGPT Hustler',
    emoji: '⚡',
    tagline: 'The Speed Demon',
    description: 'You\'re all about velocity and iteration. Why spend an hour perfecting when you can ship 10 versions and A/B test?',
    strengths: [
      'Lightning-fast execution',
      'Rapid prototyping',
      'Quick wit and adaptability'
    ],
    bestFor: [
      'Brainstorming sessions',
      'Quick content generation',
      'Rapid iterations'
    ],
    recommendedTools: [
      { name: 'Instantly', href: 'https://instantly.ai/?fp_ref=ahmed26', description: 'Fast cold email automation' },
      { name: 'SmartLead', href: 'https://smartlead.ai/?ref=ahmed', description: 'Multi-channel outreach at scale' },
      { name: 'Reply.io', href: 'https://reply.io/?ref=agentmastery', description: 'AI-powered sales engagement' }
    ],
    color: 'from-emerald-500 to-teal-600',
    gradient: 'from-emerald-500/20 via-teal-500/20 to-cyan-500/20',
    shareText: {
      reddit: 'I got "ChatGPT Hustler ⚡" on AgentMastery\'s AI Tool Personality Quiz — what are you?',
      x: 'I got "ChatGPT Hustler ⚡" on AgentMastery\'s AI Tool Personality Quiz. Which AI tool personality are you?',
      linkedin: 'Fun: I\'m a ChatGPT Hustler ⚡ on AgentMastery\'s AI Tool Personality Quiz — surprisingly accurate. Try it and post your result:'
    },
    recommendedReads: [
      { title: 'Jasper vs Copy.ai Comparison', href: '/compare/jasper-vs-copy-ai' },
      { title: 'B2B Lead Generation Strategies', href: '/blog/innovative-b2b-lead-generation-strategies-for-2025-outbound-approaches-that-work' },
      { title: 'Tool Matcher Quiz', href: '/quiz' }
    ]
  },
  'midjourney-dreamer': {
    type: 'midjourney-dreamer',
    name: 'MidJourney Dreamer',
    emoji: '🎨',
    tagline: 'The Visual Virtuoso',
    description: 'You see the world in pixels and palettes. While others write essays, you\'re creating visual stories that speak louder than words.',
    strengths: [
      'Visual storytelling',
      'Creative ideation',
      'Aesthetic excellence'
    ],
    bestFor: [
      'Brand design',
      'Content visualization',
      'Creative campaigns'
    ],
    recommendedTools: [
      { name: 'Lemlist', href: 'https://lemlist.com/?ref=agentmastery', description: 'Creative personalized outreach' },
      { name: 'Close CRM', href: 'https://refer.close.com/lvdqjdm97t92-fetl0j', description: 'Visual pipeline management' },
      { name: 'Pipedrive', href: 'https://pipedrive.com/?ref=agentmastery', description: 'Visual sales CRM' }
    ],
    color: 'from-pink-500 to-rose-600',
    gradient: 'from-pink-500/20 via-rose-500/20 to-fuchsia-500/20',
    shareText: {
      reddit: 'I got "MidJourney Dreamer 🎨" on AgentMastery\'s AI Tool Personality Quiz — what are you?',
      x: 'I got "MidJourney Dreamer 🎨" on AgentMastery\'s AI Tool Personality Quiz. Which AI tool personality are you?',
      linkedin: 'Fun: I\'m a MidJourney Dreamer 🎨 on AgentMastery\'s AI Tool Personality Quiz — surprisingly accurate. Try it and post your result:'
    },
    recommendedReads: [
      { title: 'HeyGen vs Synthesia Comparison', href: '/compare/heygen-vs-synthesia' },
      { title: 'Loom vs Vidyard Guide', href: '/compare/loom-vs-vidyard' },
      { title: 'AI Tool Arcade', href: '/arcade' }
    ]
  },
  'excel-wizard': {
    type: 'excel-wizard',
    name: 'Excel Wizard',
    emoji: '📊',
    tagline: 'The Data Dynamo',
    description: 'You turn chaos into spreadsheets and spreadsheets into strategy. Data doesn\'t lie, and neither do your meticulously crafted formulas.',
    strengths: [
      'Data organization',
      'Process optimization',
      'Systematic thinking'
    ],
    bestFor: [
      'Data analysis',
      'Report automation',
      'Process documentation'
    ],
    recommendedTools: [
      { name: 'Clay', href: 'https://clay.com/?ref=agentmastery', description: 'Spreadsheet-powered data enrichment' },
      { name: 'Apollo', href: 'https://get.apollo.io/qq0iw5w2fskf', description: 'Data-driven prospecting platform' },
      { name: 'HubSpot', href: 'https://hubspot.com/products/sales?ref=agentmastery', description: 'Data analytics and CRM' }
    ],
    color: 'from-green-500 to-emerald-600',
    gradient: 'from-green-500/20 via-emerald-500/20 to-teal-500/20',
    shareText: {
      reddit: 'I got "Excel Wizard 📊" on AgentMastery\'s AI Tool Personality Quiz — what are you?',
      x: 'I got "Excel Wizard 📊" on AgentMastery\'s AI Tool Personality Quiz. Which AI tool personality are you?',
      linkedin: 'Fun: I\'m an Excel Wizard 📊 on AgentMastery\'s AI Tool Personality Quiz — surprisingly accurate. Try it and post your result:'
    },
    recommendedReads: [
      { title: 'Apollo vs ZoomInfo Analysis', href: '/compare/apollo-vs-zoominfo' },
      { title: 'ROI Calculator', href: '/calculators/roi' },
      { title: 'Switch & Save Calculator', href: '/calculators/switch-savings' }
    ]
  },
  'autogpt-ops': {
    type: 'autogpt-ops',
    name: 'AutoGPT Ops',
    emoji: '🛠️',
    tagline: 'The Automation Architect',
    description: 'Why do it manually when AI can do it for you? You\'re building the self-running systems that make everyone else wonder how you have so much free time.',
    strengths: [
      'Workflow automation',
      'System integration',
      'Scalable solutions'
    ],
    bestFor: [
      'Process automation',
      'Tool integration',
      'Scaling operations'
    ],
    recommendedTools: [
      { name: 'Outreach', href: 'https://outreach.io/?ref=agentmastery', description: 'Automated sales workflows' },
      { name: 'Orum', href: 'https://orum.com/?ref=agentmastery', description: 'AI-powered dialer automation' },
      { name: 'SmartLead', href: 'https://smartlead.ai/?ref=ahmed', description: 'Automated multi-channel campaigns' }
    ],
    color: 'from-orange-500 to-red-600',
    gradient: 'from-orange-500/20 via-red-500/20 to-amber-500/20',
    shareText: {
      reddit: 'I got "AutoGPT Ops 🛠️" on AgentMastery\'s AI Tool Personality Quiz — what are you?',
      x: 'I got "AutoGPT Ops 🛠️" on AgentMastery\'s AI Tool Personality Quiz. Which AI tool personality are you?',
      linkedin: 'Fun: I\'m an AutoGPT Ops 🛠️ on AgentMastery\'s AI Tool Personality Quiz — surprisingly accurate. Try it and post your result:'
    },
    recommendedReads: [
      { title: 'SmartLead vs Instantly Guide', href: '/compare/instantly-vs-smartlead' },
      { title: 'HubSpot vs Salesforce', href: '/compare/hubspot-vs-salesforce' },
      { title: 'AI Leaderboards', href: '/leaderboards' }
    ]
  },
  'research-owl': {
    type: 'research-owl',
    name: 'Research Owl',
    emoji: '🦉',
    tagline: 'The Knowledge Navigator',
    description: 'You don\'t just find answers, you uncover truths. Your superpower is connecting dots others don\'t even see.',
    strengths: [
      'Deep research skills',
      'Information synthesis',
      'Pattern recognition'
    ],
    bestFor: [
      'Market research',
      'Competitive analysis',
      'Knowledge management'
    ],
    recommendedTools: [
      { name: 'Clay', href: 'https://clay.com/?ref=agentmastery', description: 'Deep research automation' },
      { name: 'Gong', href: 'https://gong.io/?ref=agentmastery', description: 'Call recording analysis' },
      { name: 'Apollo', href: 'https://get.apollo.io/qq0iw5w2fskf', description: 'Contact research platform' }
    ],
    color: 'from-indigo-500 to-purple-600',
    gradient: 'from-indigo-500/20 via-purple-500/20 to-violet-500/20',
    shareText: {
      reddit: 'I got "Research Owl 🦉" on AgentMastery\'s AI Tool Personality Quiz — what are you?',
      x: 'I got "Research Owl 🦉" on AgentMastery\'s AI Tool Personality Quiz. Which AI tool personality are you?',
      linkedin: 'Fun: I\'m a Research Owl 🦉 on AgentMastery\'s AI Tool Personality Quiz — surprisingly accurate. Try it and post your result:'
    },
    recommendedReads: [
      { title: 'AI Sales Tools Guide 2025', href: '/blog/best-ai-sales-tools-2025' },
      { title: 'Drift vs Intercom Analysis', href: '/compare/drift-vs-intercom' },
      { title: 'Blog Insights', href: '/blog' }
    ]
  }
}

export function calculatePersonalityResult(answers: number[]): PersonalityType {
  const scores: Record<PersonalityType, number> = {
    'claude-bro': 0,
    'chatgpt-hustler': 0,
    'midjourney-dreamer': 0,
    'excel-wizard': 0,
    'autogpt-ops': 0,
    'research-owl': 0
  }

  PERSONALITY_QUESTIONS.forEach((question, qIndex) => {
    const answerIndex = answers[qIndex]
    if (answerIndex !== undefined && question.answers[answerIndex]) {
      const weights = question.answers[answerIndex].weights
      Object.entries(weights).forEach(([type, weight]) => {
        scores[type as PersonalityType] += weight
      })
    }
  })

  // Find the personality with the highest score
  let maxScore = 0
  let result: PersonalityType = 'claude-bro'

  Object.entries(scores).forEach(([type, score]) => {
    if (score > maxScore) {
      maxScore = score
      result = type as PersonalityType
    }
  })

  return result
}

export function getShareUrl(result: PersonalityType, network: 'reddit' | 'x' | 'linkedin' | 'copy'): string {
  const baseUrl = `https://agentmastery.ai/quiz/personality?r=${result}`
  const utm = `&utm_source=${network}&utm_medium=social&utm_campaign=quiz_personality`
  return baseUrl + utm
}

export function getShareContent(result: PersonalityResult, network: 'reddit' | 'x' | 'linkedin'): { title?: string; text?: string; url: string } {
  const url = getShareUrl(result.type, network)

  switch(network) {
    case 'reddit':
      return {
        title: result.shareText.reddit,
        url
      }
    case 'x':
      return {
        text: `${result.shareText.x} ${url}`,
        url
      }
    case 'linkedin':
      return {
        text: result.shareText.linkedin,
        url
      }
  }
}