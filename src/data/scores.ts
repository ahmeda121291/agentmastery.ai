import { Tool } from './tools'
import fs from 'fs'
import path from 'path'

export interface ScoreDimensions {
  value: number // Cost-effectiveness, ROI
  quality: number // Accuracy, reliability, output quality
  adoption: number // Market momentum, user growth
  ux: number // Ease of use, learning curve, support
}

export interface ToolScore {
  slug: string
  name: string
  category: string
  totalScore: number
  dimensions: ScoreDimensions
  rank?: number
  rankDelta?: number
  scoreDelta?: number
  explanation?: string
}

export interface CategoryScores {
  category: string
  tools: ToolScore[]
  editorCallout?: string
}

export interface Snapshot {
  week: string // YYYY-WW format
  timestamp: string
  categories: CategoryScores[]
}

// Category-specific scoring weights
const CATEGORY_WEIGHTS: Record<string, Partial<ScoreDimensions>> = {
  'Writing/SEO': { quality: 0.35, value: 0.25, adoption: 0.20, ux: 0.20 },
  'Video': { quality: 0.40, ux: 0.25, value: 0.20, adoption: 0.15 },
  'Audio': { quality: 0.45, ux: 0.25, value: 0.20, adoption: 0.10 },
  'Outbound/Campaigns': { adoption: 0.30, value: 0.30, quality: 0.25, ux: 0.15 },
  'Data/Prospecting': { quality: 0.35, adoption: 0.30, value: 0.20, ux: 0.15 },
  'Chatbots': { ux: 0.35, quality: 0.30, value: 0.20, adoption: 0.15 },
  'Dev/Builders': { quality: 0.35, ux: 0.30, value: 0.20, adoption: 0.15 },
  'Productivity': { ux: 0.40, value: 0.25, quality: 0.20, adoption: 0.15 },
  'Social': { adoption: 0.35, ux: 0.30, value: 0.20, quality: 0.15 },
  'Email/Newsletters': { adoption: 0.30, ux: 0.30, value: 0.25, quality: 0.15 },
  'Telephony': { quality: 0.35, value: 0.30, ux: 0.20, adoption: 0.15 },
  'Sales/CRM': { adoption: 0.35, ux: 0.25, value: 0.25, quality: 0.15 },
}

// Default weights if category not specified
const DEFAULT_WEIGHTS: ScoreDimensions = {
  value: 0.25,
  quality: 0.30,
  adoption: 0.25,
  ux: 0.20,
}

// Special boosts for specific tools
const TOOL_BOOSTS: Record<string, Partial<ScoreDimensions>> = {
  'zoominfo': { adoption: 10 }, // Mobile coverage boost for Data category
  'apollo': { adoption: 8 },
  'synthesia': { quality: 5 },
  'elevenlabs': { quality: 8 },
  'motion': { ux: 5 },
}

// Editor callouts by category
export const EDITOR_CALLOUTS: Record<string, string> = {
  'Data/Prospecting': 'ZoomInfo leads with mobile coverage, but Apollo offers better value.',
  'Video': 'Synthesia maintains dominance despite new AI video entrants.',
  'Audio': 'ElevenLabs quality gap over competitors continues to widen.',
  'Outbound/Campaigns': 'SmartLead\'s unlimited warmup gives it the edge in deliverability.',
  'Productivity': 'Motion\'s AI scheduling is unmatched, justifying premium pricing.',
}

// Calculate base dimensions for a tool
function calculateDimensions(tool: Tool): ScoreDimensions {
  // Base scoring from tool attributes
  const hasFreeTier = tool.pricingNote.toLowerCase().includes('free')
  const isEnterprise = tool.badges?.includes('Enterprise-Ready')
  const hasQuickSetup = tool.badges?.some(b => b.toLowerCase().includes('quick') || b.toLowerCase().includes('easy'))
  const prosCount = tool.pros.length
  const consCount = tool.cons.length
  const hasPromo = !!tool.promo

  // Value score (0-100)
  let value = 50
  if (hasFreeTier) value += 20
  if (hasPromo) value += 10
  if (tool.pricingNote.includes('$')) {
    const priceMatch = tool.pricingNote.match(/\$(\d+)/)
    if (priceMatch) {
      const basePrice = parseInt(priceMatch[1])
      if (basePrice < 20) value += 15
      else if (basePrice < 50) value += 10
      else if (basePrice < 100) value += 5
      else value -= 5
    }
  }
  value = Math.min(100, Math.max(0, value + (prosCount - consCount) * 3))

  // Quality score (0-100)
  let quality = 60
  if (tool.badges?.includes('Best Quality')) quality += 20
  if (tool.badges?.includes('AI-Powered')) quality += 10
  if (tool.badges?.includes('GPT-Powered')) quality += 10
  if (isEnterprise) quality += 10
  quality = Math.min(100, Math.max(0, quality + prosCount * 5 - consCount * 3))

  // Adoption score (0-100)
  let adoption = 40
  if (tool.badges?.includes('Largest Database')) adoption += 20
  if (tool.badges?.includes('275M+ Contacts')) adoption += 15
  if (tool.badges?.includes('Most Popular')) adoption += 15
  if (isEnterprise) adoption += 10
  if (tool.editorNote?.includes('leader') || tool.editorNote?.includes('standard')) adoption += 15
  adoption = Math.min(100, Math.max(0, adoption + Math.random() * 20)) // Some variance

  // UX score (0-100)
  let ux = 50
  if (hasQuickSetup) ux += 20
  if (tool.badges?.includes('No-Code')) ux += 15
  if (tool.badges?.includes('5-minute setup')) ux += 15
  if (tool.cons.some(c => c.toLowerCase().includes('learning curve'))) ux -= 10
  if (tool.cons.some(c => c.toLowerCase().includes('complex'))) ux -= 10
  ux = Math.min(100, Math.max(0, ux + (5 - consCount) * 5))

  // Apply special boosts
  const boosts = TOOL_BOOSTS[tool.slug]
  if (boosts) {
    if (boosts.value) value = Math.min(100, value + boosts.value)
    if (boosts.quality) quality = Math.min(100, quality + boosts.quality)
    if (boosts.adoption) adoption = Math.min(100, adoption + boosts.adoption)
    if (boosts.ux) ux = Math.min(100, ux + boosts.ux)
  }

  return { value, quality, adoption, ux }
}

// Compute total score using category weights
function computeTotalScore(dimensions: ScoreDimensions, category: string): number {
  const weights = CATEGORY_WEIGHTS[category] || DEFAULT_WEIGHTS

  const totalWeight = weights.value! + weights.quality! + weights.adoption! + weights.ux!
  const normalizedWeights = {
    value: weights.value! / totalWeight,
    quality: weights.quality! / totalWeight,
    adoption: weights.adoption! / totalWeight,
    ux: weights.ux! / totalWeight,
  }

  return Math.round(
    dimensions.value * normalizedWeights.value +
    dimensions.quality * normalizedWeights.quality +
    dimensions.adoption * normalizedWeights.adoption +
    dimensions.ux * normalizedWeights.ux
  )
}

// Generate explanation based on top dimensions
function generateExplanation(dimensions: ScoreDimensions, category: string): string {
  const weights = CATEGORY_WEIGHTS[category] || DEFAULT_WEIGHTS
  const scores = [
    { name: 'value', score: dimensions.value, weight: weights.value! },
    { name: 'quality', score: dimensions.quality, weight: weights.quality! },
    { name: 'adoption', score: dimensions.adoption, weight: weights.adoption! },
    { name: 'UX', score: dimensions.ux, weight: weights.ux! },
  ]

  // Sort by weighted contribution
  scores.sort((a, b) => (b.score * b.weight) - (a.score * a.weight))

  const top1 = scores[0]
  const top2 = scores[1]

  const explanations: Record<string, string> = {
    value: 'Strong cost-effectiveness and ROI',
    quality: 'Superior accuracy and output quality',
    adoption: 'High market momentum and user growth',
    UX: 'Excellent user experience and ease of use',
  }

  return `${explanations[top1.name]} combined with ${explanations[top2.name].toLowerCase()}.`
}

// Main scoring function
export function computeScores(tools: Tool[]): CategoryScores[] {
  const categoriesMap = new Map<string, ToolScore[]>()

  // Score all tools
  tools.forEach(tool => {
    const dimensions = calculateDimensions(tool)
    const totalScore = computeTotalScore(dimensions, tool.category)
    const explanation = generateExplanation(dimensions, tool.category)

    const score: ToolScore = {
      slug: tool.slug,
      name: tool.name,
      category: tool.category,
      totalScore,
      dimensions,
      explanation,
    }

    if (!categoriesMap.has(tool.category)) {
      categoriesMap.set(tool.category, [])
    }
    categoriesMap.get(tool.category)!.push(score)
  })

  // Sort and rank within categories
  const categories: CategoryScores[] = []
  categoriesMap.forEach((toolScores, category) => {
    toolScores.sort((a, b) => b.totalScore - a.totalScore)
    toolScores.forEach((tool, index) => {
      tool.rank = index + 1
    })

    categories.push({
      category,
      tools: toolScores,
      editorCallout: EDITOR_CALLOUTS[category],
    })
  })

  return categories
}

// Compute deltas between current and last snapshot
export function computeDeltas(current: CategoryScores[], last: CategoryScores[]): CategoryScores[] {
  const lastMap = new Map<string, Map<string, ToolScore>>()

  // Build lookup map
  last.forEach(category => {
    const toolMap = new Map<string, ToolScore>()
    category.tools.forEach(tool => {
      toolMap.set(tool.slug, tool)
    })
    lastMap.set(category.category, toolMap)
  })

  // Calculate deltas
  current.forEach(category => {
    const lastTools = lastMap.get(category.category)
    if (!lastTools) return

    category.tools.forEach(tool => {
      const lastTool = lastTools.get(tool.slug)
      if (lastTool) {
        tool.rankDelta = (lastTool.rank || 0) - (tool.rank || 0)
        tool.scoreDelta = tool.totalScore - lastTool.totalScore
      }
    })
  })

  return current
}

// Get current week in YYYY-WW format
export function getCurrentWeek(): string {
  const now = new Date()
  const year = now.getFullYear()
  const firstDay = new Date(year, 0, 1)
  const days = Math.floor((now.getTime() - firstDay.getTime()) / (24 * 60 * 60 * 1000))
  const week = Math.ceil((days + firstDay.getDay() + 1) / 7)
  return `${year}-${week.toString().padStart(2, '0')}`
}

// Save snapshot to file
export async function saveSnapshot(scores: CategoryScores[]): Promise<void> {
  const week = getCurrentWeek()
  const snapshot: Snapshot = {
    week,
    timestamp: new Date().toISOString(),
    categories: scores,
  }

  const dir = path.join(process.cwd(), 'public', 'snapshots')
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  const filePath = path.join(dir, `${week}.json`)
  fs.writeFileSync(filePath, JSON.stringify(snapshot, null, 2))
}

// Load last snapshot
export function loadLastSnapshot(): Snapshot | null {
  const dir = path.join(process.cwd(), 'public', 'snapshots')
  if (!fs.existsSync(dir)) return null

  const files = fs.readdirSync(dir)
    .filter(f => f.endsWith('.json'))
    .sort()
    .reverse()

  if (files.length === 0) return null

  const lastFile = files[0]
  const content = fs.readFileSync(path.join(dir, lastFile), 'utf-8')
  return JSON.parse(content) as Snapshot
}

// Get top movers (by absolute score delta)
export function getTopMovers(scores: CategoryScores[], limit = 5): ToolScore[] {
  const allTools: ToolScore[] = []

  scores.forEach(category => {
    category.tools.forEach(tool => {
      if (tool.scoreDelta && Math.abs(tool.scoreDelta) > 0) {
        allTools.push(tool)
      }
    })
  })

  return allTools
    .sort((a, b) => Math.abs(b.scoreDelta || 0) - Math.abs(a.scoreDelta || 0))
    .slice(0, limit)
}