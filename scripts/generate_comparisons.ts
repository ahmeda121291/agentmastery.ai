#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import dotenv from 'dotenv'
import OpenAI from 'openai'
import { tools } from '../src/data/tools'
import { PRICING } from '../src/data/pricing'

// Standardized env loading
if (!process.env.OPENAI_API_KEY) {
  const root = process.cwd()
  const envLocal = path.join(root, '.env.local')
  const envFile = path.join(root, '.env')
  if (fs.existsSync(envLocal)) dotenv.config({ path: envLocal })
  else if (fs.existsSync(envFile)) dotenv.config({ path: envFile })
}

const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini'

if (!OPENAI_API_KEY) {
  console.log('SKIP: No OPENAI_API_KEY')
  process.exit(0)
}

// Parse CLI arguments
const args = process.argv.slice(2)
const countArg = args.find(arg => arg.startsWith('--count='))
const defaultCount = countArg ? parseInt(countArg.split('=')[1]) : 5
const forceArg = args.includes('--force')

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
})

// High-priority comparison pairs
const HIGH_PRIORITY_PAIRS = [
  ['chatgpt', 'claude'],
  ['jasper', 'copy-ai'],
  ['midjourney', 'dall-e'],
  ['synthesia', 'heygen'],
  ['apollo', 'zoominfo'],
  ['salesloft', 'outreach'],
  ['hubspot', 'salesforce'],
  ['loom', 'vidyard'],
  ['intercom', 'drift'],
  ['smartlead', 'instantly']
]

// Get all tool slugs from pricing data
const ALL_TOOL_SLUGS = PRICING.map(t => t.slug)

// Load existing comparisons
function loadExistingComparisons(): Set<string> {
  const comparisonsDir = path.join(process.cwd(), 'app/compare')
  const existing = new Set<string>()

  if (fs.existsSync(comparisonsDir)) {
    const dirs = fs.readdirSync(comparisonsDir)
    dirs.forEach(dir => {
      if (dir.includes('-vs-')) {
        existing.add(dir)
      }
    })
  }

  return existing
}

// Generate comparison slug
function getComparisonSlug(toolA: string, toolB: string): string {
  // Alphabetically sort to avoid duplicates
  const sorted = [toolA, toolB].sort()
  return `${sorted[0]}-vs-${sorted[1]}`
}

// Select comparison pairs
function selectComparisonPairs(count: number): Array<[string, string]> {
  const existing = loadExistingComparisons()
  const pairs: Array<[string, string]> = []

  // First add high priority pairs that don't exist
  for (const [a, b] of HIGH_PRIORITY_PAIRS) {
    if (!ALL_TOOL_SLUGS.includes(a) || !ALL_TOOL_SLUGS.includes(b)) continue

    const slug = getComparisonSlug(a, b)
    if (!existing.has(slug) && pairs.length < count) {
      pairs.push([a, b])
      existing.add(slug)
    }
  }

  // Fill remaining with random pairs
  const maxAttempts = 100
  let attempts = 0

  while (pairs.length < count && attempts < maxAttempts) {
    attempts++

    // Pick two random tools
    const toolA = ALL_TOOL_SLUGS[Math.floor(Math.random() * ALL_TOOL_SLUGS.length)]
    const toolB = ALL_TOOL_SLUGS[Math.floor(Math.random() * ALL_TOOL_SLUGS.length)]

    if (toolA === toolB) continue

    const slug = getComparisonSlug(toolA, toolB)
    if (!existing.has(slug)) {
      pairs.push([toolA, toolB])
      existing.add(slug)
    }
  }

  return pairs
}

// Get tool info
function getToolInfo(slug: string) {
  const pricingTool = PRICING.find(t => t.slug === slug)
  const toolInfo = tools.find(t => t.slug === slug)

  return {
    name: pricingTool?.name || toolInfo?.name || slug,
    category: pricingTool?.category || toolInfo?.category || 'General',
    pricing: pricingTool?.seatMonthly || 0,
    features: pricingTool?.features || [],
    affiliateUrl: pricingTool?.affiliateUrl || toolInfo?.affiliateUrl || null
  }
}

// Generate comparison content
async function generateComparisonContent(toolA: string, toolB: string) {
  const toolAInfo = getToolInfo(toolA)
  const toolBInfo = getToolInfo(toolB)

  const prompt = `Generate a comprehensive comparison page for ${toolAInfo.name} vs ${toolBInfo.name}.

Tool A Info:
- Name: ${toolAInfo.name}
- Category: ${toolAInfo.category}
- Price: $${toolAInfo.pricing}/month
- Features: ${toolAInfo.features.join(', ')}

Tool B Info:
- Name: ${toolBInfo.name}
- Category: ${toolBInfo.category}
- Price: $${toolBInfo.pricing}/month
- Features: ${toolBInfo.features.join(', ')}

Return a JSON object with:
{
  "intro": "2-3 sentence intro framing the comparison",
  "toolAOverview": "3-4 sentences about Tool A",
  "toolBOverview": "3-4 sentences about Tool B",
  "comparison": "4-5 sentences comparing use cases, pricing, UX, performance",
  "verdict": "2-3 sentences with neutral final verdict",
  "metaDescription": "120-150 char SEO meta description",
  "pros": {
    "toolA": ["3 pros for tool A"],
    "toolB": ["3 pros for tool B"]
  },
  "cons": {
    "toolA": ["2 cons for tool A"],
    "toolB": ["2 cons for tool B"]
  }
}

Be factual, balanced, and helpful. Don't be salesy.`

  try {
    const response = await openai.chat.completions.create({
      model: OPENAI_MODEL,
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      temperature: 0.7,
      max_tokens: 1500,
    })

    const content = JSON.parse(response.choices[0]?.message?.content || '{}')
    return content
  } catch (error) {
    console.error(`Error generating content for ${toolA} vs ${toolB}:`, error)
    return null
  }
}

// Create comparison page file
async function createComparisonPage(toolA: string, toolB: string) {
  const toolAInfo = getToolInfo(toolA)
  const toolBInfo = getToolInfo(toolB)
  const content = await generateComparisonContent(toolA, toolB)

  if (!content) {
    console.log(`Skipping ${toolA} vs ${toolB} - content generation failed`)
    return false
  }

  const slug = getComparisonSlug(toolA, toolB)
  const pageDir = path.join(process.cwd(), 'app/compare', slug)

  // Create directory
  fs.mkdirSync(pageDir, { recursive: true })

  // Create metadata.ts
  const metadataContent = `import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '${toolAInfo.name} vs ${toolBInfo.name}: Which AI Tool Wins in 2025? | AgentMastery',
  description: '${content.metaDescription}',
  openGraph: {
    title: '${toolAInfo.name} vs ${toolBInfo.name} Comparison',
    description: '${content.metaDescription}',
    images: ['/api/og/comparison?toolA=${toolA}&toolB=${toolB}'],
  },
}
`

  fs.writeFileSync(path.join(pageDir, 'metadata.ts'), metadataContent)

  // Create page.tsx
  const pageContent = `import { metadata } from './metadata'
import ComparisonPage from '@/components/ComparisonPage'

export { metadata }

const comparisonData = ${JSON.stringify({
  toolA: {
    slug: toolA,
    ...toolAInfo
  },
  toolB: {
    slug: toolB,
    ...toolBInfo
  },
  content,
  slug
}, null, 2)}

export default function ${toolAInfo.name.replace(/[^a-zA-Z]/g, '')}Vs${toolBInfo.name.replace(/[^a-zA-Z]/g, '')}Page() {
  return <ComparisonPage data={comparisonData} />
}
`

  fs.writeFileSync(path.join(pageDir, 'page.tsx'), pageContent)

  console.log(`✅ Created comparison: ${slug}`)
  return true
}

// Main function
async function main() {
  console.log(`🔄 Generating ${defaultCount} comparison pages...`)

  const pairs = selectComparisonPairs(defaultCount)
  console.log(`Selected ${pairs.length} comparison pairs`)

  let successCount = 0

  for (const [toolA, toolB] of pairs) {
    const success = await createComparisonPage(toolA, toolB)
    if (success) successCount++

    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  console.log(`✅ Successfully generated ${successCount} comparison pages`)
}

main().catch(console.error)