export type Dimension = 'Writing' | 'Video' | 'Outbound' | 'Data' | 'CRM' | 'Automation'

export interface Answer {
  text: string
  dimensions: Partial<Record<Dimension, number>>
}

export interface Question {
  id: string
  question: string
  description?: string
  answers: Answer[]
}

export const quizQuestions: Question[] = [
  {
    id: 'primary-goal',
    question: "What's your primary goal with AI tools?",
    description: "This helps us understand your main use case",
    answers: [
      {
        text: "Create content at scale",
        dimensions: { Writing: 3, Video: 1, Automation: 1 }
      },
      {
        text: "Generate more leads and sales",
        dimensions: { Outbound: 3, Data: 2, CRM: 1 }
      },
      {
        text: "Automate repetitive tasks",
        dimensions: { Automation: 3, CRM: 1 }
      },
      {
        text: "Build better customer relationships",
        dimensions: { CRM: 3, Data: 1, Automation: 1 }
      },
      {
        text: "Create engaging videos and media",
        dimensions: { Video: 3, Writing: 1 }
      },
      {
        text: "Research and analyze market data",
        dimensions: { Data: 3, Automation: 1 }
      }
    ]
  },
  {
    id: 'team-size',
    question: "What's your team size?",
    description: "Different tools work better for different team scales",
    answers: [
      {
        text: "Solo/Freelancer",
        dimensions: { Writing: 2, Video: 1, Automation: 2 }
      },
      {
        text: "Small team (2-10)",
        dimensions: { CRM: 2, Outbound: 2, Automation: 1 }
      },
      {
        text: "Medium team (11-50)",
        dimensions: { CRM: 2, Data: 2, Outbound: 1, Automation: 1 }
      },
      {
        text: "Large team (50+)",
        dimensions: { Data: 3, CRM: 2, Automation: 1 }
      }
    ]
  },
  {
    id: 'budget',
    question: "What's your monthly budget for AI tools?",
    description: "We'll recommend tools that fit your budget",
    answers: [
      {
        text: "Under $50/month",
        dimensions: { Writing: 2, Automation: 1 }
      },
      {
        text: "$50-200/month",
        dimensions: { Outbound: 2, CRM: 1, Writing: 1 }
      },
      {
        text: "$200-500/month",
        dimensions: { CRM: 2, Outbound: 2, Data: 1 }
      },
      {
        text: "$500-1000/month",
        dimensions: { Data: 2, CRM: 2, Video: 1 }
      },
      {
        text: "Over $1000/month",
        dimensions: { Data: 3, CRM: 1, Video: 1 }
      }
    ]
  },
  {
    id: 'technical-level',
    question: "How would you describe your technical expertise?",
    description: "This helps us recommend tools that match your skill level",
    answers: [
      {
        text: "Beginner - I prefer simple, no-code tools",
        dimensions: { Writing: 2, Video: 2, Automation: 1 }
      },
      {
        text: "Intermediate - I can handle some complexity",
        dimensions: { CRM: 2, Outbound: 2, Writing: 1 }
      },
      {
        text: "Advanced - I enjoy technical tools",
        dimensions: { Data: 2, Automation: 3, CRM: 1 }
      },
      {
        text: "Expert - I can integrate and customize anything",
        dimensions: { Data: 3, Automation: 2, Outbound: 1 }
      }
    ]
  },
  {
    id: 'content-type',
    question: "What type of content or output matters most?",
    description: "Different tools excel at different outputs",
    answers: [
      {
        text: "Written content (blogs, emails, copy)",
        dimensions: { Writing: 3, Outbound: 1 }
      },
      {
        text: "Visual content (videos, presentations)",
        dimensions: { Video: 3, Writing: 1 }
      },
      {
        text: "Data and insights (reports, analytics)",
        dimensions: { Data: 3, CRM: 1 }
      },
      {
        text: "Customer communications (emails, chat)",
        dimensions: { Outbound: 2, CRM: 2, Automation: 1 }
      },
      {
        text: "Internal processes (workflows, tasks)",
        dimensions: { Automation: 3, CRM: 1 }
      }
    ]
  },
  {
    id: 'integration',
    question: "How important are integrations with your existing tools?",
    description: "Some tools play better with others",
    answers: [
      {
        text: "Critical - Must integrate with everything",
        dimensions: { CRM: 3, Data: 2, Automation: 2 }
      },
      {
        text: "Important - Need key integrations",
        dimensions: { CRM: 2, Outbound: 2, Data: 1 }
      },
      {
        text: "Nice to have - But not essential",
        dimensions: { Writing: 2, Video: 1, Outbound: 1 }
      },
      {
        text: "Not important - Standalone is fine",
        dimensions: { Writing: 2, Video: 2, Automation: 1 }
      }
    ]
  }
]

export interface QuizResult {
  dimensions: Record<Dimension, number>
  topDimensions: Dimension[]
}

export function calculateQuizResults(answers: number[]): QuizResult {
  const dimensions: Record<Dimension, number> = {
    Writing: 0,
    Video: 0,
    Outbound: 0,
    Data: 0,
    CRM: 0,
    Automation: 0
  }

  // Sum up dimension scores from all answers
  answers.forEach((answerIndex, questionIndex) => {
    const question = quizQuestions[questionIndex]
    const answer = question.answers[answerIndex]

    Object.entries(answer.dimensions).forEach(([dim, score]) => {
      dimensions[dim as Dimension] += score
    })
  })

  // Normalize scores to 0-100
  const maxScore = Math.max(...Object.values(dimensions))
  if (maxScore > 0) {
    Object.keys(dimensions).forEach(dim => {
      dimensions[dim as Dimension] = Math.round((dimensions[dim as Dimension] / maxScore) * 100)
    })
  }

  // Get top 3 dimensions
  const topDimensions = Object.entries(dimensions)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([dim]) => dim as Dimension)

  return {
    dimensions,
    topDimensions
  }
}