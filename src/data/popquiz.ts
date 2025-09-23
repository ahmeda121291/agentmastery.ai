export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  category?: string
  relatedTool?: {
    name: string
    slug: string
    reason: string
  }
}

export const popQuizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'What percentage of cold emails typically land in spam without proper warmup?',
    options: ['10-20%', '30-40%', '50-70%', '80-90%'],
    correctAnswer: 2,
    explanation: 'Without proper email warmup, 50-70% of cold emails can end up in spam folders, drastically reducing your outreach effectiveness.',
    relatedTool: {
      name: 'SmartLead',
      slug: 'smartlead',
      reason: 'SmartLead includes unlimited email warmup to ensure your emails reach the inbox'
    }
  },
  {
    id: 'q2',
    question: 'How many B2B contacts does Apollo.io claim to have in their database?',
    options: ['50 million+', '100 million+', '275 million+', '500 million+'],
    correctAnswer: 2,
    explanation: 'Apollo.io boasts over 275 million B2B contacts, making it one of the largest sales intelligence databases available.',
    relatedTool: {
      name: 'Apollo',
      slug: 'apollo',
      reason: 'Apollo provides access to this massive B2B contact database'
    }
  },
  {
    id: 'q3',
    question: 'What is the ideal length for a cold email subject line?',
    options: ['Under 10 characters', '30-50 characters', '60-80 characters', 'Over 100 characters'],
    correctAnswer: 1,
    explanation: 'Subject lines between 30-50 characters have the highest open rates, as they display fully on most devices while being descriptive enough.',
    relatedTool: {
      name: 'SmartLead',
      slug: 'smartlead',
      reason: 'SmartLead helps A/B test subject lines to find what works best'
    }
  },
  {
    id: 'q4',
    question: 'How many AI avatars does Synthesia offer for video creation?',
    options: ['20+', '50+', '140+', '200+'],
    correctAnswer: 2,
    explanation: 'Synthesia offers over 140 AI avatars, providing diverse options for creating professional videos without cameras.',
    relatedTool: {
      name: 'Synthesia',
      slug: 'synthesia',
      reason: 'Synthesia provides these AI avatars for video creation'
    }
  },
  {
    id: 'q5',
    question: 'What is the average ROI of email marketing according to industry studies?',
    options: ['$10 per $1 spent', '$22 per $1 spent', '$42 per $1 spent', '$65 per $1 spent'],
    correctAnswer: 2,
    explanation: 'Email marketing generates an average ROI of $42 for every $1 spent, making it one of the most effective marketing channels.',
    relatedTool: {
      name: 'SmartLead',
      slug: 'smartlead',
      reason: 'SmartLead helps maximize email ROI through better deliverability'
    }
  },
  {
    id: 'q6',
    question: 'How much time can AI scheduling tools like Motion save per day?',
    options: ['30 minutes', '1 hour', '2+ hours', '4+ hours'],
    correctAnswer: 2,
    explanation: 'AI scheduling tools like Motion typically save users 2+ hours per day by automating calendar management and task prioritization.',
    relatedTool: {
      name: 'Motion',
      slug: 'motion',
      reason: 'Motion uses AI to automatically schedule your tasks and meetings'
    }
  },
  {
    id: 'q7',
    question: 'What is the minimum number of voice samples ElevenLabs needs to clone a voice?',
    options: ['1 minute', '5 minutes', '30 minutes', '1 hour'],
    correctAnswer: 0,
    explanation: 'ElevenLabs can clone a voice with as little as 1 minute of audio samples, though more samples improve quality.',
    relatedTool: {
      name: 'ElevenLabs',
      slug: 'elevenlabs',
      reason: 'ElevenLabs offers industry-leading voice cloning technology'
    }
  },
  {
    id: 'q8',
    question: 'What percentage improvement in reply rates do personalized emails typically see?',
    options: ['10-20%', '30-50%', '100-200%', '300-400%'],
    correctAnswer: 2,
    explanation: 'Personalized emails typically see 100-200% improvement in reply rates compared to generic templates.',
    relatedTool: {
      name: 'Apollo',
      slug: 'apollo',
      reason: 'Apollo provides data for better personalization at scale'
    }
  },
  {
    id: 'q9',
    question: 'How many tools does the average sales team use in their tech stack?',
    options: ['3-5', '6-10', '11-15', '16-20'],
    correctAnswer: 1,
    explanation: 'The average sales team uses 6-10 different tools in their tech stack, highlighting the importance of integration.',
    relatedTool: {
      name: 'Close',
      slug: 'close',
      reason: 'Close CRM combines multiple tools in one platform'
    }
  },
  {
    id: 'q10',
    question: 'What is the average cost of ZoomInfo per seat per month?',
    options: ['$250', '$500', '$1,250', '$2,000'],
    correctAnswer: 2,
    explanation: 'ZoomInfo typically costs around $1,250 per seat per month, making it one of the most expensive sales intelligence tools.',
    relatedTool: {
      name: 'Apollo',
      slug: 'apollo',
      reason: 'Apollo offers similar features at a fraction of the cost'
    }
  },
  {
    id: 'q11',
    question: 'How many languages can Synthesia generate videos in?',
    options: ['20+', '60+', '120+', '200+'],
    correctAnswer: 2,
    explanation: 'Synthesia supports video generation in over 120 languages, making it ideal for global content creation.',
    relatedTool: {
      name: 'Synthesia',
      slug: 'synthesia',
      reason: 'Synthesia supports this extensive language range'
    }
  },
  {
    id: 'q12',
    question: 'What percentage of B2B buyers prefer to self-serve information rather than talk to sales?',
    options: ['33%', '50%', '67%', '87%'],
    correctAnswer: 3,
    explanation: 'Studies show that 87% of B2B buyers prefer to self-serve information, making content and automation crucial.',
    relatedTool: {
      name: 'CustomGPT',
      slug: 'customgpt',
      reason: 'CustomGPT creates AI chatbots for self-service information'
    }
  },
  {
    id: 'q13',
    question: 'What is the average open rate for B2B cold emails?',
    options: ['5-10%', '15-25%', '30-40%', '50-60%'],
    correctAnswer: 1,
    explanation: 'B2B cold emails typically achieve 15-25% open rates when properly executed with good subject lines and sender reputation.',
    relatedTool: {
      name: 'SmartLead',
      slug: 'smartlead',
      reason: 'SmartLead helps improve open rates through better deliverability'
    }
  },
  {
    id: 'q14',
    question: 'How long does it take to create a 5-minute AI video with Synthesia?',
    options: ['5 minutes', '15 minutes', '1 hour', '4 hours'],
    correctAnswer: 1,
    explanation: 'Creating a 5-minute AI video with Synthesia typically takes about 15 minutes, compared to hours or days for traditional video.',
    relatedTool: {
      name: 'Synthesia',
      slug: 'synthesia',
      reason: 'Synthesia enables rapid video creation without filming'
    }
  },
  {
    id: 'q15',
    question: 'What percentage of sales emails never get a response?',
    options: ['50%', '70%', '85%', '95%'],
    correctAnswer: 2,
    explanation: 'Approximately 85% of sales emails never receive a response, highlighting the importance of volume and personalization.',
    relatedTool: {
      name: 'SmartLead',
      slug: 'smartlead',
      reason: 'SmartLead helps improve response rates through AI personalization'
    }
  }
]

// Get a random selection of questions
export function getRandomQuestions(count: number = 10): QuizQuestion[] {
  const shuffled = [...popQuizQuestions].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

// Calculate score and recommendations
export interface QuizResult {
  score: number
  totalQuestions: number
  percentage: number
  incorrectQuestions: QuizQuestion[]
  recommendedTools: Array<{
    name: string
    slug: string
    reasons: string[]
  }>
}

export function calculateQuizResult(
  questions: QuizQuestion[],
  answers: (number | null)[]
): QuizResult {
  let correctCount = 0
  const incorrectQuestions: QuizQuestion[] = []
  const toolRecommendations = new Map<string, Set<string>>()

  questions.forEach((question, index) => {
    const userAnswer = answers[index]

    if (userAnswer === question.correctAnswer) {
      correctCount++
    } else {
      incorrectQuestions.push(question)

      // Add tool recommendation if available
      if (question.relatedTool) {
        const { slug, reason } = question.relatedTool
        if (!toolRecommendations.has(slug)) {
          toolRecommendations.set(slug, new Set())
        }
        toolRecommendations.get(slug)!.add(reason)
      }
    }
  })

  // Convert tool recommendations to array format
  const recommendedTools = Array.from(toolRecommendations.entries())
    .map(([slug, reasons]) => {
      const tool = questions.find(q => q.relatedTool?.slug === slug)?.relatedTool
      return {
        name: tool?.name || '',
        slug,
        reasons: Array.from(reasons)
      }
    })
    .slice(0, 3) // Limit to top 3 recommendations

  return {
    score: correctCount,
    totalQuestions: questions.length,
    percentage: Math.round((correctCount / questions.length) * 100),
    incorrectQuestions,
    recommendedTools
  }
}

// Get achievement level based on score
export function getAchievementLevel(percentage: number): {
  level: string
  message: string
  emoji: string
} {
  if (percentage >= 90) {
    return {
      level: 'AI Sales Master',
      message: 'Outstanding! You really know your AI sales tools.',
      emoji: '🏆'
    }
  } else if (percentage >= 70) {
    return {
      level: 'AI Sales Expert',
      message: 'Great job! You have solid knowledge of AI sales.',
      emoji: '⭐'
    }
  } else if (percentage >= 50) {
    return {
      level: 'AI Sales Practitioner',
      message: 'Good effort! Keep learning about AI sales tools.',
      emoji: '👍'
    }
  } else {
    return {
      level: 'AI Sales Beginner',
      message: 'Keep practicing! Check out our recommended tools to learn more.',
      emoji: '📚'
    }
  }
}