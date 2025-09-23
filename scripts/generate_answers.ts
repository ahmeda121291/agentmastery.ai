#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import * as dotenv from 'dotenv'
import OpenAI from 'openai'
import { tools } from '../src/data/tools'

// Load env from process.env first (CI), then .env/.env.local if present (dev)
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || (() => {
  const root = process.cwd()
  const envLocal = path.join(root, '.env.local')
  const envFile = path.join(root, '.env')
  if (fs.existsSync(envLocal)) {
    dotenv.config({ path: envLocal })
  } else if (fs.existsSync(envFile)) {
    dotenv.config({ path: envFile })
  }
  return process.env.OPENAI_API_KEY
})()

const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini'

if (!OPENAI_API_KEY) {
  console.log('SKIP: No OPENAI_API_KEY')
  process.exit(0)
}

// Parse CLI arguments
const args = process.argv.slice(2)
const countArg = args.find(arg => arg.startsWith('--count='))
const defaultCount = countArg ? parseInt(countArg.split('=')[1]) : 20

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
})

// Fallback default topics (safe, evergreen)
const DEFAULT_TOPICS = [
  "AI writing tools", "AI video generators", "cold email deliverability",
  "B2B data providers", "CRM migration", "chatbots for support",
  "email warmup best practices", "lead gen automations", "voice cloning",
  "meeting scheduling AI", "sales intelligence platforms", "content repurposing",
  "workflow automation", "AI SEO tools", "transcription services"
]

// Helper to load topics from keywords.json with multiple format support
function loadTopics(): string[] {
  try {
    const keywordsPath = path.join(process.cwd(), 'src/data/keywords.json')
    if (fs.existsSync(keywordsPath)) {
      const raw = JSON.parse(fs.readFileSync(keywordsPath, 'utf-8'))

      // Support multiple formats
      if (Array.isArray(raw)) {
        return raw.filter(Boolean)
      }
      if (raw && Array.isArray(raw.topics)) {
        return raw.topics.filter(Boolean)
      }
      if (raw && Array.isArray(raw.keywords)) {
        // Handle both string and object keywords
        return raw.keywords.map((k: any) =>
          typeof k === 'string' ? k : k.keyword
        ).filter(Boolean)
      }
    }
  } catch (e) {
    console.log('Note: Could not load keywords.json, using defaults')
  }

  return DEFAULT_TOPICS
}

// Categories from tools
const CATEGORIES = [
  'Writing', 'Video', 'Data', 'Outbound', 'CRM', 'Landing',
  'Audio', 'Calendar/PM', 'Monitoring', 'Telephony', 'Social', 'Chatbots', 'General'
]

// Get unique tool categories and names for context
const toolNames = tools.map(t => ({ name: t.name, slug: t.slug, category: t.category }))

// Sanitize answer text - remove stray brackets, artifacts, and cleanup
function sanitizeAnswer(text: string): string {
  return text
    // Remove empty brackets and artifacts
    .replace(/\[\]/g, '')
    .replace(/\(\)/g, '')
    // Fix unmatched parentheses/brackets
    .replace(/\([^)]*$/g, '') // Remove unclosed opening parentheses at end
    .replace(/^[^(]*\)/g, '') // Remove unmatched closing parentheses at start
    .replace(/\[[^\]]*$/g, '') // Remove unclosed opening brackets at end
    .replace(/^[^\[]*\]/g, '') // Remove unmatched closing brackets at start
    // Clean double spaces
    .replace(/\s+/g, ' ')
    // Remove accidental markup
    .replace(/\*\*/g, '')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/~~([^~]+)~~/g, '$1')
    // Trim and normalize
    .trim()
}

// Convert tool mentions to internal markdown links
function addToolLinks(text: string): string {
  const toolsMap = new Map(tools.map(tool => [tool.name.toLowerCase(), tool.slug]))

  // Sort tool names by length (longest first) to avoid partial matches
  const sortedToolNames = Array.from(toolsMap.keys()).sort((a, b) => b.length - a.length)

  let result = text

  for (const toolName of sortedToolNames) {
    const toolSlug = toolsMap.get(toolName)
    if (!toolSlug) continue

    // Create regex for exact word matches (case insensitive)
    const regex = new RegExp(`\\b${toolName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi')

    // Only replace if not already in a markdown link
    result = result.replace(regex, (match) => {
      // Check if this match is already inside a markdown link
      const beforeMatch = result.substring(0, result.indexOf(match))
      const openBrackets = (beforeMatch.match(/\[/g) || []).length
      const closeBrackets = (beforeMatch.match(/\]/g) || []).length

      // If we're inside an unclosed bracket, don't replace
      if (openBrackets > closeBrackets) {
        return match
      }

      return `[${match}](/tools/${toolSlug})`
    })
  }

  return result
}

// Canonicalize question for deduplication
function canonicalize(text: string): string {
  const stopwords = ['a', 'an', 'the', 'to', 'for', 'of', 'and', 'or', 'with', 'in', 'on', 'is', 'are', 'be']
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => !stopwords.includes(word) || ['how', 'what', 'why', 'which', 'when', 'where', 'who'].includes(word))
    .join(' ')
    .trim()
}

// Shuffle array helper
function shuffle<T>(array: T[]): T[] {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

// Generate fallback Q&A when API fails
function generateFallbackQA(topic: string, index: number): any {
  const category = CATEGORIES[index % CATEGORIES.length]

  const questions = [
    `What are the best ${topic} for small businesses?`,
    `How do ${topic} improve productivity?`,
    `Which ${topic} offer the best ROI?`,
    `How to choose between different ${topic}?`,
    `What features should I look for in ${topic}?`
  ]

  const question = questions[index % questions.length]

  const answer = `${topic.charAt(0).toUpperCase() + topic.slice(1)} can significantly enhance operational efficiency. Key considerations include integration capabilities with your existing tech stack, pricing models that align with your budget, and scalability for future growth. Top solutions in this space offer features like automation, real-time analytics, and seamless team collaboration. For personalized recommendations, take our [quiz](/quiz) or compare options on our [leaderboards](/leaderboards).`

  return {
    q: question,
    a: answer,
    category: category
  }
}

// Generate Q&A prompt
function generatePrompt(keywords: string[]): string {
  const topicSamples = shuffle(keywords).slice(0, 20).join(', ')
  const toolSamples = toolNames.slice(0, 10).map(t => t.name).join(', ')

  return `Generate ${defaultCount} high-quality Q&A pairs for an AI tools knowledge base.

Context:
- Categories: ${CATEGORIES.join(', ')}
- Sample tools: ${toolSamples}
- Topic keywords: ${topicSamples}

Requirements:
1. Questions MUST be phrased as natural user queries starting with: who/what/when/where/why/how/which/compare/cost/best for
2. Answers MUST be 2-5 sentences, direct, practical, non-fluffy
3. Start answers with the direct response in the first sentence
4. Include internal links in markdown format to relevant pages when appropriate:
   - Tool pages: [tool name](/tools/slug)
   - Leaderboards: [leaderboards](/leaderboards)
   - Quiz: [quiz](/quiz)
5. Prefer evergreen, practical how-to and comparison style questions
6. Each Q&A must have a category from the list above
7. Focus on actionable advice, specific features, pricing comparisons, use cases

Return as JSON array with this structure:
[
  {
    "q": "question text",
    "a": "answer text with [internal links](/path) where relevant",
    "category": "Category"
  }
]

Generate diverse questions covering different aspects: features, pricing, comparisons, use cases, integrations, best practices.`
}

async function generateAnswersWithRetries(keywords: string[], maxRetries: number = 2): Promise<any[]> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      console.log(`  Attempt ${attempt + 1}/${maxRetries + 1}...`)

      const prompt = attempt > 0
        ? `Generate ${defaultCount} Q&A pairs about AI tools and automation. Each should have: q (question), a (2-5 sentence answer), category. Focus on: ${keywords.slice(0, 10).join(', ')}. Format as JSON array.`
        : generatePrompt(keywords)

      const response = await openai.chat.completions.create({
        model: OPENAI_MODEL,
        messages: [
          {
            role: 'system',
            content: 'You are an AI tools expert creating AEO-optimized Q&As. Be specific, practical, and include internal links to relevant pages.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.8,
        max_tokens: 3000,
        response_format: { type: 'json_object' }
      })

      const content = response.choices[0]?.message?.content
      if (!content) {
        console.log(`  Attempt ${attempt + 1} returned empty`)
        continue
      }

      const parsed = JSON.parse(content)
      const results = Array.isArray(parsed) ? parsed : (parsed.answers || parsed.items || parsed.data || [])

      if (results.length > 0) {
        return results
      }

      console.log(`  Attempt ${attempt + 1} returned no valid items`)
    } catch (error) {
      console.log(`  Attempt ${attempt + 1} failed:`, error instanceof Error ? error.message : 'Unknown error')
      if (attempt < maxRetries) {
        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, 2000))
      }
    }
  }

  return []
}

async function main() {
  console.log('🤖 Generating AEO Q&As...')

  // Load keywords
  const keywords = loadTopics()
  console.log(`📚 Loaded ${keywords.length} topics`)

  // Load existing answers
  const answersPath = path.join(process.cwd(), 'src/data/answers.json')
  let existingAnswers: any[] = []

  if (fs.existsSync(answersPath)) {
    try {
      existingAnswers = JSON.parse(fs.readFileSync(answersPath, 'utf-8'))
      console.log(`📚 Loaded ${existingAnswers.length} existing answers`)
    } catch (e) {
      console.error('Error loading existing answers:', e)
      existingAnswers = []
    }
  }

  // Build set of canonical existing questions for deduplication
  const existingCanonical = new Set(
    existingAnswers.map(a => canonicalize(a.q))
  )

  console.log(`🎲 Generating ${defaultCount} answers from ${keywords.length} topics`)

  // Try to generate with API
  let newAnswers = await generateAnswersWithRetries(keywords)

  // Track stats
  let apiGenerated = newAnswers.length
  let fallbackGenerated = 0

  // If API didn't generate enough, use fallback
  if (newAnswers.length < defaultCount) {
    const needed = defaultCount - newAnswers.length
    console.log(`📝 Using fallback generator for ${needed} additional Q&As`)

    for (let i = 0; i < needed; i++) {
      const topic = keywords[i % keywords.length]
      const fallbackQA = generateFallbackQA(topic, i)
      newAnswers.push(fallbackQA)
      fallbackGenerated++
    }
  }

  console.log(`📊 Generated ${apiGenerated} via API, ${fallbackGenerated} via fallback`)

  // Process and deduplicate
  let addedCount = 0
  let skippedCount = 0
  const timestamp = new Date().toISOString()

  for (const answer of newAnswers) {
    const canonical = canonicalize(answer.q)

    if (existingCanonical.has(canonical)) {
      skippedCount++
      continue
    }

    // Sanitize and process answer
    const sanitizedQuestion = sanitizeAnswer(answer.q.trim())
    const rawAnswer = sanitizeAnswer(answer.a.trim())
    const processedAnswer = addToolLinks(rawAnswer)

    // Add with metadata
    existingAnswers.push({
      id: `gen-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      q: sanitizedQuestion,
      a: processedAnswer,
      category: answer.category || 'General',
      createdAt: timestamp,
      localGenerated: fallbackGenerated > 0 && newAnswers.indexOf(answer) >= apiGenerated
    })

    existingCanonical.add(canonical)
    addedCount++
  }

  // Keep only most recent 1000 items
  if (existingAnswers.length > 1000) {
    existingAnswers = existingAnswers
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 1000)
    console.log('📦 Capped to most recent 1000 items')
  }

  // Sort by date (newest first) for storage
  existingAnswers.sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  // Write back
  fs.writeFileSync(
    answersPath,
    JSON.stringify(existingAnswers, null, 2),
    'utf-8'
  )

  console.log(`✅ Added ${addedCount} new answers`)
  console.log(`⏭️  Skipped ${skippedCount} duplicates`)
  console.log(`📊 Total answers: ${existingAnswers.length}`)

  if (addedCount === 0) {
    console.error('❌ No new answers were added!')
    // Exit 0 to not fail the job
    process.exit(0)
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error)
    process.exit(1)
  })
}