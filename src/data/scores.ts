import { Tool } from './tools'

// Define scoring categories
export const categories = [
  'Writing/SEO',
  'Video',
  'Data/Prospecting',
  'Outbound/Campaigns',
  'CRM',
  'Landing Pages',
  'Audio',
  'Audio/Video',
  'Calendar/PM',
  'Monitoring',
  'Telephony',
  'Social',
  'Chatbots',
  'Dev/Builders',
  'Email/Newsletters',
  'Email/Warmup'
] as const

export type Category = typeof categories[number]

// Define scoring dimensions
export type Dimensions = {
  value: number          // Cost-effectiveness and ROI
  quality: number        // Accuracy, reliability, output quality
  momentum: number       // Market adoption, growth trajectory
  ux: number            // User experience and ease of use
}

// Category-specific dimension weights (0-1)
export const categoryWeights: Record<string, Dimensions> = {
  'Writing/SEO': { value: 0.25, quality: 0.35, momentum: 0.15, ux: 0.25 },
  'Video': { value: 0.20, quality: 0.40, momentum: 0.20, ux: 0.20 },
  'Data/Prospecting': { value: 0.30, quality: 0.35, momentum: 0.20, ux: 0.15 },
  'Outbound/Campaigns': { value: 0.25, quality: 0.25, momentum: 0.25, ux: 0.25 },
  'CRM': { value: 0.30, quality: 0.20, momentum: 0.20, ux: 0.30 },
  'Landing Pages': { value: 0.25, quality: 0.20, momentum: 0.15, ux: 0.40 },
  'Audio': { value: 0.20, quality: 0.45, momentum: 0.20, ux: 0.15 },
  'Audio/Video': { value: 0.25, quality: 0.35, momentum: 0.20, ux: 0.20 },
  'Calendar/PM': { value: 0.25, quality: 0.20, momentum: 0.20, ux: 0.35 },
  'Monitoring': { value: 0.30, quality: 0.30, momentum: 0.20, ux: 0.20 },
  'Telephony': { value: 0.35, quality: 0.25, momentum: 0.15, ux: 0.25 },
  'Social': { value: 0.25, quality: 0.20, momentum: 0.30, ux: 0.25 },
  'Chatbots': { value: 0.25, quality: 0.25, momentum: 0.25, ux: 0.25 },
  'Dev/Builders': { value: 0.20, quality: 0.30, momentum: 0.25, ux: 0.25 },
  'Email/Newsletters': { value: 0.30, quality: 0.20, momentum: 0.25, ux: 0.25 },
  'Email/Warmup': { value: 0.35, quality: 0.30, momentum: 0.15, ux: 0.20 },
}

// Keywords that boost specific dimensions
const dimensionKeywords = {
  value: {
    positive: ['free', 'affordable', 'cost-effective', 'unlimited', 'included', 'no additional', 'budget'],
    negative: ['expensive', 'costly', 'high pricing', 'enterprise pricing', 'premium'],
  },
  quality: {
    positive: ['accurate', 'reliable', 'high-quality', 'professional', 'comprehensive', 'advanced', 'powerful', 'best', 'realistic', 'verified'],
    negative: ['inaccurate', 'limited', 'basic', 'generic', 'issues', 'errors', 'slow'],
  },
  momentum: {
    positive: ['popular', 'growing', 'trending', 'market leader', 'widely', 'thousands', 'millions', '275M+', '140+', '120+', '100+'],
    negative: ['outdated', 'legacy', 'declining', 'niche'],
  },
  ux: {
    positive: ['easy', 'simple', 'intuitive', 'user-friendly', 'quick', 'seamless', 'drag-and-drop', 'no-code', '5-minute', 'one-click', 'automated'],
    negative: ['complex', 'difficult', 'steep learning curve', 'confusing', 'overwhelming', 'technical'],
  },
}

export interface ScoredTool extends Tool {
  dimensions: Dimensions
  totalScore: number
  rank?: number
}

// Compute dimension score based on text analysis
function computeDimensionScore(
  tool: Tool,
  dimension: keyof Dimensions,
  keywords: typeof dimensionKeywords[keyof typeof dimensionKeywords]
): number {
  const text = [
    tool.blurb,
    ...tool.pros,
    ...tool.cons,
    tool.pricingNote,
    ...(tool.badges || [])
  ].join(' ').toLowerCase()

  let score = 50 // Base score

  // Check positive keywords
  keywords.positive.forEach(keyword => {
    if (text.includes(keyword.toLowerCase())) {
      score += 8
    }
  })

  // Check negative keywords
  keywords.negative.forEach(keyword => {
    if (text.includes(keyword.toLowerCase())) {
      score -= 8
    }
  })

  // Special boosts based on specific indicators
  if (dimension === 'value') {
    if (tool.pricingNote.toLowerCase().includes('free')) score += 15
    if (tool.pricingNote.toLowerCase().includes('$')) {
      const priceMatch = tool.pricingNote.match(/\$(\d+)/);
      if (priceMatch) {
        const price = parseInt(priceMatch[1]);
        if (price < 30) score += 10
        else if (price < 50) score += 5
        else if (price > 100) score -= 10
        else if (price > 500) score -= 20
      }
    }
  }

  if (dimension === 'quality') {
    // More pros than cons is a quality indicator
    if (tool.pros.length > tool.cons.length) score += 10
    // Badges indicate quality features
    if (tool.badges && tool.badges.length > 0) score += tool.badges.length * 5
  }

  if (dimension === 'momentum') {
    // Enterprise-ready and scale indicators
    if (tool.badges?.some(b => b.toLowerCase().includes('enterprise'))) score += 15
    if (tool.badges?.some(b => b.toLowerCase().includes('all-in-one'))) score += 10
  }

  if (dimension === 'ux') {
    // No-code and quick setup are UX wins
    if (tool.badges?.some(b => b.toLowerCase().includes('no-code'))) score += 15
    if (tool.badges?.some(b => b.toLowerCase().includes('quick'))) score += 10
  }

  // Special case: ZoomInfo gets boost for Data category
  if (tool.slug === 'zoominfo' && dimension === 'quality') {
    score = 95 // Mobile-contact coverage boost
  }
  if (tool.slug === 'zoominfo' && dimension === 'momentum') {
    score = 90 // Market leader boost
  }

  // Clamp score between 0 and 100
  return Math.max(0, Math.min(100, score))
}

// Main scoring function
export function computeScores(tools: Tool[]): Record<string, ScoredTool[]> {
  const scoresByCategory: Record<string, ScoredTool[]> = {}

  // Group tools by category
  const toolsByCategory = tools.reduce((acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = []
    }
    acc[tool.category].push(tool)
    return acc
  }, {} as Record<string, Tool[]>)

  // Score each category
  Object.entries(toolsByCategory).forEach(([category, categoryTools]) => {
    const weights = categoryWeights[category] || {
      value: 0.25,
      quality: 0.25,
      momentum: 0.25,
      ux: 0.25
    }

    const scoredTools = categoryTools.map(tool => {
      const dimensions: Dimensions = {
        value: computeDimensionScore(tool, 'value', dimensionKeywords.value),
        quality: computeDimensionScore(tool, 'quality', dimensionKeywords.quality),
        momentum: computeDimensionScore(tool, 'momentum', dimensionKeywords.momentum),
        ux: computeDimensionScore(tool, 'ux', dimensionKeywords.ux),
      }

      // Calculate weighted total score
      const totalScore = Math.round(
        dimensions.value * weights.value +
        dimensions.quality * weights.quality +
        dimensions.momentum * weights.momentum +
        dimensions.ux * weights.ux
      )

      return {
        ...tool,
        dimensions,
        totalScore
      }
    })

    // Sort by total score descending and assign ranks
    scoredTools.sort((a, b) => b.totalScore - a.totalScore)
    scoredTools.forEach((tool, index) => {
      tool.rank = index + 1
    })

    scoresByCategory[category] = scoredTools
  })

  return scoresByCategory
}

// Get ranking explanation
export function getRankingExplanation(tool: ScoredTool, category: string): string[] {
  const weights = categoryWeights[category] || {
    value: 0.25,
    quality: 0.25,
    momentum: 0.25,
    ux: 0.25
  }

  const factors: string[] = []

  // Sort dimensions by their contribution to the total score
  const contributions = [
    { name: 'Quality', value: tool.dimensions.quality * weights.quality, raw: tool.dimensions.quality },
    { name: 'Value', value: tool.dimensions.value * weights.value, raw: tool.dimensions.value },
    { name: 'User Experience', value: tool.dimensions.ux * weights.ux, raw: tool.dimensions.ux },
    { name: 'Market Momentum', value: tool.dimensions.momentum * weights.momentum, raw: tool.dimensions.momentum },
  ].sort((a, b) => b.value - a.value)

  contributions.forEach(contrib => {
    if (contrib.raw >= 70) {
      factors.push(`Strong ${contrib.name.toLowerCase()} (${Math.round(contrib.raw)}/100)`)
    } else if (contrib.raw >= 50) {
      factors.push(`Good ${contrib.name.toLowerCase()} (${Math.round(contrib.raw)}/100)`)
    } else {
      factors.push(`Room for improvement in ${contrib.name.toLowerCase()} (${Math.round(contrib.raw)}/100)`)
    }
  })

  // Add specific highlights from badges
  if (tool.badges && tool.badges.length > 0) {
    factors.push(`Key features: ${tool.badges.slice(0, 3).join(', ')}`)
  }

  // Add price point if it's a strength
  if (tool.dimensions.value >= 70) {
    factors.push(`Competitive pricing: ${tool.pricingNote}`)
  }

  return factors
}