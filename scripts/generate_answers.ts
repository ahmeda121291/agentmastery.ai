#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import OpenAI from 'openai'
import { tools } from '../src/data/tools'

// Check for API key
if (!process.env.OPENAI_API_KEY) {
  console.log('SKIP: No OPENAI_API_KEY')
  process.exit(0)
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Load keywords if available
let keywords: string[] = []
try {
  const keywordsPath = path.join(process.cwd(), 'src/data/keywords.json')
  if (fs.existsSync(keywordsPath)) {
    keywords = JSON.parse(fs.readFileSync(keywordsPath, 'utf-8'))
  }
} catch (e) {
  keywords = []
}

// Categories from tools
const CATEGORIES = [
  'Writing', 'Video', 'Data', 'Outbound', 'CRM', 'Landing',
  'Audio', 'Calendar/PM', 'Monitoring', 'Telephony', 'Social', 'Chatbots', 'General'
]

// Get unique tool categories and names for context
const toolCategories = Array.from(new Set(tools.map(t => t.category)))
const toolNames = tools.map(t => ({ name: t.name, slug: t.slug, category: t.category }))

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

// Generate Q&A prompt
function generatePrompt(): string {
  const topicSamples = keywords.slice(0, 20).join(', ')
  const toolSamples = toolNames.slice(0, 10).map(t => t.name).join(', ')

  return `Generate 20 high-quality Q&A pairs for an AI tools knowledge base.

Context:
- Categories: ${CATEGORIES.join(', ')}
- Sample tools: ${toolSamples}
- Topic keywords: ${topicSamples || 'AI automation, productivity, sales, marketing, content creation'}

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

async function generateAnswers(): Promise<any[]> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'You are an AI tools expert creating AEO-optimized Q&As. Be specific, practical, and include internal links to relevant pages.'
        },
        {
          role: 'user',
          content: generatePrompt()
        }
      ],
      temperature: 0.8,
      max_tokens: 3000,
      response_format: { type: 'json_object' }
    })

    const content = response.choices[0]?.message?.content
    if (!content) throw new Error('No response from OpenAI')

    const parsed = JSON.parse(content)
    return Array.isArray(parsed) ? parsed : (parsed.answers || parsed.items || [])
  } catch (error) {
    console.error('Error generating answers:', error)
    return []
  }
}

async function main() {
  console.log('🤖 Generating AEO Q&As...')

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

  // Generate new answers
  const newAnswers = await generateAnswers()
  console.log(`🎲 Generated ${newAnswers.length} candidate answers`)

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

    // Add with metadata
    existingAnswers.push({
      id: `gen-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      q: answer.q.trim(),
      a: answer.a.trim(),
      category: answer.category || 'General',
      createdAt: timestamp
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
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error)
    process.exit(1)
  })
}