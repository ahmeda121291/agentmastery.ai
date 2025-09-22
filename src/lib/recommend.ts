import { Tool, tools } from '@/src/data/tools'
import { Dimension, QuizResult } from '@/src/data/quiz'

export interface RecommendedTool extends Tool {
  score: number
  matchReasons: string[]
}

// Map dimensions to tool categories
const dimensionCategoryMap: Record<Dimension, string[]> = {
  Writing: ['Writing/SEO'],
  Video: ['Video', 'Audio/Video'],
  Outbound: ['Outbound/Campaigns', 'Email/Warmup', 'Email/Newsletters'],
  Data: ['Data/Prospecting'],
  CRM: ['CRM', 'Chatbots'],
  Automation: ['Dev/Builders', 'Calendar/PM', 'Monitoring', 'Landing Pages', 'Social']
}

// Keywords that boost tool scores for each dimension
const dimensionKeywords: Record<Dimension, string[]> = {
  Writing: ['content', 'seo', 'article', 'blog', 'writing', 'copy', 'text'],
  Video: ['video', 'avatar', 'presentation', 'visual', 'media', 'camera'],
  Outbound: ['email', 'outreach', 'cold', 'campaign', 'leads', 'warmup'],
  Data: ['data', 'analytics', 'database', 'contacts', 'intelligence', 'b2b'],
  CRM: ['crm', 'customer', 'relationship', 'pipeline', 'deals', 'sales'],
  Automation: ['automate', 'workflow', 'no-code', 'builder', 'schedule', 'task']
}

// Badge preferences for each dimension
const dimensionBadges: Record<Dimension, string[]> = {
  Writing: ['SEO-Optimized', 'Multi-language', 'AI Outlines', 'Full Lifecycle'],
  Video: ['No-Camera', 'Enterprise-Ready', 'Studio Quality', '120+ Voices'],
  Outbound: ['Unlimited Warmup', 'Multi-Inbox', 'Auto-Warmup', 'Deliverability'],
  Data: ['B2B Focused', 'Verified Data', 'Intent Data', '275M+ Contacts'],
  CRM: ['All-in-One', 'SMB Focus'],
  Automation: ['No-Code', 'Full-Stack', 'AI Scheduling', 'Auto-Prioritize', 'Quick Setup']
}

export function recommendTools(quizResult: QuizResult): RecommendedTool[] {
  const scoredTools: RecommendedTool[] = tools.map(tool => {
    let score = 0
    const matchReasons: string[] = []

    // Score based on category match with top dimensions
    quizResult.topDimensions.forEach((dimension, index) => {
      const weight = 3 - index // Higher weight for top dimension
      const categories = dimensionCategoryMap[dimension]

      if (categories.includes(tool.category)) {
        score += weight * 30
        if (index === 0) {
          matchReasons.push(`Perfect for ${dimension.toLowerCase()} needs`)
        } else {
          matchReasons.push(`Strong ${dimension.toLowerCase()} capabilities`)
        }
      }
    })

    // Score based on dimension scores and keywords
    Object.entries(quizResult.dimensions).forEach(([dim, dimScore]) => {
      const dimension = dim as Dimension
      const keywords = dimensionKeywords[dimension]

      // Check tool description and features for keywords
      const toolText = [
        tool.blurb,
        ...tool.pros,
        ...tool.cons,
        tool.category
      ].join(' ').toLowerCase()

      const keywordMatches = keywords.filter(keyword =>
        toolText.includes(keyword.toLowerCase())
      ).length

      if (keywordMatches > 0) {
        score += (dimScore / 100) * keywordMatches * 5
      }

      // Badge matching
      const badges = dimensionBadges[dimension]
      const badgeMatches = tool.badges?.filter(badge =>
        badges.some(b => b.toLowerCase() === badge.toLowerCase())
      ).length || 0

      if (badgeMatches > 0) {
        score += (dimScore / 100) * badgeMatches * 10
        if (dimScore > 50 && badgeMatches > 0) {
          matchReasons.push(`Features align with your requirements`)
        }
      }
    })

    // Special boosts for standout tools
    if (tool.slug === 'apollo' && quizResult.topDimensions.includes('Outbound')) {
      score += 20
      matchReasons.push('All-in-one solution for sales teams')
    }
    if (tool.slug === 'synthesia' && quizResult.topDimensions.includes('Video')) {
      score += 20
      matchReasons.push('Industry leader in AI video creation')
    }
    if (tool.slug === 'aiseo' && quizResult.topDimensions.includes('Writing')) {
      score += 20
      matchReasons.push('SEO-focused content generation')
    }
    if (tool.slug === 'zoominfo' && quizResult.topDimensions.includes('Data')) {
      score += 25
      matchReasons.push('Most comprehensive B2B database')
    }
    if (tool.slug === 'close' && quizResult.topDimensions.includes('CRM')) {
      score += 20
      matchReasons.push('Built-in communication tools')
    }
    if (tool.slug === 'lovable' && quizResult.topDimensions.includes('Automation')) {
      score += 20
      matchReasons.push('No-code app development')
    }

    // Add pricing consideration
    const budgetAnswer = quizResult.dimensions.Data > 70 ? 'enterprise' : 'affordable'
    if (budgetAnswer === 'affordable' && tool.pricingNote.toLowerCase().includes('free')) {
      score += 10
      matchReasons.push('Offers free tier')
    }
    if (budgetAnswer === 'enterprise' && tool.pricingNote.toLowerCase().includes('enterprise')) {
      score += 10
      matchReasons.push('Enterprise-grade solution')
    }

    // Ensure we have at least one match reason
    if (matchReasons.length === 0 && score > 0) {
      matchReasons.push('Matches your tool preferences')
    }

    return {
      ...tool,
      score: Math.round(score),
      matchReasons
    }
  })

  // Sort by score and return top 3
  return scoredTools
    .filter(tool => tool.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
}

export function getMatchPercentage(score: number): number {
  // Normalize score to percentage (max expected score ~200)
  return Math.min(Math.round((score / 200) * 100), 99)
}