#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import * as dotenv from 'dotenv'
import OpenAI from 'openai'

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

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
})

// Built-in evergreen topics for backfill
const EVERGREEN_TOPICS = [
  'ai automation tools for small business',
  'best crm software comparison guide',
  'email marketing automation strategies',
  'sales pipeline optimization techniques',
  'content creation workflow automation',
  'customer support chatbot implementation',
  'lead scoring models explained',
  'marketing attribution models comparison',
  'data enrichment tools for b2b sales',
  'video marketing automation platforms',
  'social media scheduling best practices',
  'seo content optimization with ai',
  'conversion rate optimization strategies',
  'account based marketing tools',
  'predictive analytics for sales',
  'workflow automation with zapier alternatives',
  'ai copywriting tools comparison',
  'sales engagement platform features',
  'marketing analytics dashboard setup',
  'customer journey mapping tools',
  'ai powered personalization strategies',
  'outbound sales automation guide',
  'content repurposing with ai tools',
  'voice of customer analysis tools',
  'competitive intelligence automation',
  'marketing ops tech stack guide',
  'revenue operations best practices',
  'ai meeting assistants comparison',
  'sales forecasting with machine learning',
  'dynamic pricing strategies with ai'
]

// Categories with example topics
const CATEGORIES = ['Writing', 'Video', 'Data', 'Outbound', 'CRM']

// Tool slugs for internal linking
const TOOL_SLUGS = [
  'jasper', 'copy-ai', 'writesonic', 'synthesia', 'heygen', 'loom',
  'apollo', 'zoominfo', 'clearbit', 'smartlead', 'instantly', 'lemlist',
  'hubspot', 'salesforce', 'pipedrive', 'clay', 'phantombuster', 'n8n'
]

interface GeneratedPost {
  title: string
  slug: string
  category: string
  excerpt: string
  tags: string[]
  content: string
  date: string
  localGenerated?: boolean
}

interface HistoryEntry {
  topic: string
  lastUsedAt: string
}

interface KeywordsConfig {
  postsPerRun?: number | { min: number; max: number }
  topics?: string[]
  keywords?: Array<{ keyword: string } | string>
  processed?: string[]
  config?: {
    postsPerRun?: { min: number; max: number }
  }
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function getRandomElements<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

// Load topics from keywords.json with flexible format support
function loadTopics(): string[] {
  try {
    const keywordsPath = path.join(process.cwd(), 'src/data/keywords.json')
    if (fs.existsSync(keywordsPath)) {
      const data: KeywordsConfig = JSON.parse(fs.readFileSync(keywordsPath, 'utf-8'))

      // Support array of strings
      if (Array.isArray(data)) {
        return data.filter(Boolean)
      }

      // Support object with topics array
      if (data.topics && Array.isArray(data.topics)) {
        return data.topics.filter(Boolean)
      }

      // Support object with keywords array (current format)
      if (data.keywords && Array.isArray(data.keywords)) {
        return data.keywords.map(k =>
          typeof k === 'string' ? k : k.keyword
        ).filter(Boolean)
      }
    }
  } catch (e) {
    console.log('Note: Could not parse keywords.json, using evergreen topics')
  }

  return []
}

// Load and manage topic history with LRU
function loadHistory(): HistoryEntry[] {
  const historyPath = path.join(process.cwd(), 'src/data/.posts_history.json')
  if (fs.existsSync(historyPath)) {
    try {
      return JSON.parse(fs.readFileSync(historyPath, 'utf-8'))
    } catch (e) {
      console.log('Creating new history file')
    }
  }
  return []
}

function saveHistory(history: HistoryEntry[]) {
  const historyPath = path.join(process.cwd(), 'src/data/.posts_history.json')
  fs.writeFileSync(historyPath, JSON.stringify(history, null, 2), 'utf-8')
}

// Select topics using LRU with backfill
function selectTopicsWithLRU(
  availableTopics: string[],
  count: number,
  daysThreshold: number = 7
): { topics: string[], fromLRU: number, fromBackfill: number } {
  const history = loadHistory()
  const now = new Date()
  const thresholdDate = new Date(now.getTime() - daysThreshold * 24 * 60 * 60 * 1000)

  // Create set of all topics (available + evergreen)
  const allTopicsSet = new Set([...availableTopics, ...EVERGREEN_TOPICS])

  // Map topics to their last used date
  const topicLastUsed = new Map<string, Date>()
  history.forEach(h => {
    topicLastUsed.set(h.topic, new Date(h.lastUsedAt))
  })

  // Find topics not used recently
  const eligibleTopics = Array.from(allTopicsSet).filter(topic => {
    const lastUsed = topicLastUsed.get(topic)
    return !lastUsed || lastUsed < thresholdDate
  })

  // Sort by LRU (oldest first, never used topics at the beginning)
  eligibleTopics.sort((a, b) => {
    const aDate = topicLastUsed.get(a)
    const bDate = topicLastUsed.get(b)
    if (!aDate && !bDate) return 0
    if (!aDate) return -1
    if (!bDate) return 1
    return aDate.getTime() - bDate.getTime()
  })

  // Select topics
  const selectedTopics = eligibleTopics.slice(0, count)

  // If we don't have enough, backfill from evergreen pool
  if (selectedTopics.length < count) {
    const needed = count - selectedTopics.length
    const backfillCandidates = EVERGREEN_TOPICS.filter(t => !selectedTopics.includes(t))
    const backfill = getRandomElements(backfillCandidates, needed)
    selectedTopics.push(...backfill)
  }

  // Count sources
  const fromLRU = selectedTopics.filter(t => availableTopics.includes(t)).length
  const fromBackfill = selectedTopics.length - fromLRU

  return {
    topics: selectedTopics.slice(0, count),
    fromLRU,
    fromBackfill
  }
}

// Generate fallback content when API fails
function generateFallbackPost(topic: string, category: string): GeneratedPost {
  const title = topic
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

  const slug = generateSlug(title)
  const date = new Date().toISOString().split('T')[0]

  const content = `## Executive Summary

${title} represents a critical component in modern business automation strategies. Organizations implementing these solutions typically see 30-50% improvements in operational efficiency within the first quarter of deployment.

The landscape of ${topic} has evolved significantly, with AI-powered solutions now dominating the market. Understanding the key players and implementation strategies is essential for maintaining competitive advantage.

## Feature Comparison Table

| Tool/Approach | Key Strength | Pricing Model | Best For |
|---------------|--------------|---------------|----------|
| Enterprise Solution | Comprehensive features | $500-2000/mo | Large teams (50+) |
| Mid-Market Option | Balance of features/cost | $100-500/mo | Growing teams (10-50) |
| Starter Tool | Easy to implement | $20-100/mo | Small teams (<10) |

## Implementation Checklist

- [ ] Define clear objectives and KPIs for ${category.toLowerCase()} automation
- [ ] Audit existing workflows and identify automation opportunities
- [ ] Evaluate tool compatibility with current tech stack
- [ ] Create pilot program with measurable success criteria
- [ ] Develop training materials and onboarding process
- [ ] Establish monitoring and optimization protocols
- [ ] Schedule regular performance reviews and adjustments

## Key Considerations

When evaluating ${topic}, consider these critical factors:

1. **Integration Capabilities**: Ensure seamless connection with your existing [CRM](/tools/hubspot) and marketing tools
2. **Scalability**: Choose solutions that can grow with your business needs
3. **ROI Timeline**: Most organizations see positive ROI within 3-6 months
4. **Support Quality**: Prioritize vendors with responsive technical support

**Editor's Note:** After analyzing hundreds of implementations, we've found that success with ${topic} depends more on proper change management than technical capabilities. Organizations that invest in team training and gradual rollout consistently outperform those attempting rapid, company-wide deployments. Start small, measure everything, and scale based on proven results.

## Getting Started

Ready to transform your ${category.toLowerCase()} operations? Take our [personalized quiz](/quiz) to discover which tools match your specific needs. Browse our comprehensive [leaderboards](/leaderboards) to compare top solutions side-by-side.

## Internal Resources

- [Complete Tool Directory](/tools/jasper)
- [Industry Leaderboards](/leaderboards)
- [Personalization Quiz](/quiz)

## Conclusion

The future of ${topic} lies in intelligent automation and data-driven optimization. Organizations that embrace these technologies today will define tomorrow's industry standards.`

  return {
    title,
    slug,
    category,
    excerpt: `Comprehensive guide to ${topic} covering implementation strategies, tool comparisons, and best practices for ${category.toLowerCase()} automation.`,
    tags: [category.toLowerCase(), 'automation', 'ai-tools'],
    content,
    date,
    localGenerated: true
  }
}

function generatePrompt(topic: string, category: string): string {
  const randomTools = getRandomElements(TOOL_SLUGS, 6)

  return `Write a comprehensive, high-quality blog post about "${topic}" for the ${category} category.

Requirements:
1. MUST include ONE comparison table comparing 3 specific tools or frameworks (use markdown table syntax)
2. MUST include ONE actionable checklist with 5-7 items (use markdown checkbox syntax)
3. MUST include ONE "Editor's Note:" paragraph starting with **Editor's Note:** that gives an opinionated, insider perspective
4. MUST include EXACTLY THREE internal links:
   - One to a tool page like [ToolName](/tools/${randomTools[0]})
   - One to [leaderboards](/leaderboards)
   - One to [quiz](/quiz)
5. Include affiliate links using format: ${randomTools[1]}.com?ref=agentmastery
6. Write in a professional yet conversational tone
7. Include practical examples and actionable advice
8. Length: 1200-1500 words
9. Use proper markdown formatting with ## and ### headers
10. Include a strong introduction and conclusion

Format the response as JSON with these fields:
{
  "title": "compelling title",
  "excerpt": "150-char excerpt",
  "tags": ["tag1", "tag2", "tag3"],
  "content": "full markdown content"
}`
}

async function generatePostWithRetries(
  topic: string,
  category: string,
  maxRetries: number = 2
): Promise<GeneratedPost | null> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      console.log(`  Attempt ${attempt + 1}/${maxRetries + 1}...`)

      const response = await openai.chat.completions.create({
        model: OPENAI_MODEL,
        messages: [
          {
            role: 'system',
            content: 'You are an expert technical writer creating high-quality, SEO-optimized blog posts about AI tools and automation.'
          },
          {
            role: 'user',
            content: attempt > 0
              ? `Generate a blog post about "${topic}". Focus on practical implementation and tool comparisons. Include a comparison table, checklist, and editor's note. Format as JSON.`
              : generatePrompt(topic, category)
          }
        ],
        temperature: 0.8,
        max_tokens: 4000,
        response_format: { type: 'json_object' }
      })

      const content = response.choices[0]?.message?.content
      if (!content) {
        console.log(`  Attempt ${attempt + 1} returned empty`)
        continue
      }

      const parsed = JSON.parse(content)
      const slug = generateSlug(parsed.title)
      const date = new Date().toISOString().split('T')[0]

      return {
        title: parsed.title,
        slug,
        category,
        excerpt: parsed.excerpt,
        tags: parsed.tags,
        content: parsed.content,
        date
      }
    } catch (error) {
      console.log(`  Attempt ${attempt + 1} failed:`, error instanceof Error ? error.message : 'Unknown error')
      if (attempt === maxRetries) {
        return null
      }
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, 2000))
    }
  }

  return null
}

function createMDXContent(post: GeneratedPost): string {
  // Generate unique OG image URL
  const ogImage = `/api/og?title=${encodeURIComponent(post.title)}&type=blog&category=${post.category}`

  return `---
title: "${post.title}"
date: "${post.date}"
category: "${post.category}"
excerpt: "${post.excerpt}"
tags: ${JSON.stringify(post.tags)}
author: "AI Research Team"
image: "${ogImage}"${post.localGenerated ? '\nlocalGenerated: true' : ''}
faq:
  - question: "What are the key benefits discussed?"
    answer: "The post covers automation efficiency, cost savings, and implementation strategies for ${post.category.toLowerCase()} tools."
  - question: "Who should read this guide?"
    answer: "This guide is ideal for professionals looking to optimize their ${post.category.toLowerCase()} workflows with AI-powered solutions."
---

${post.content}
`
}

async function main() {
  // Load configuration
  const keywordsPath = path.join(process.cwd(), 'src/data/keywords.json')
  let desiredCount = 5 // Default

  try {
    if (fs.existsSync(keywordsPath)) {
      const data: KeywordsConfig = JSON.parse(fs.readFileSync(keywordsPath, 'utf-8'))

      // Check for postsPerRun config
      if (data.postsPerRun) {
        if (typeof data.postsPerRun === 'number') {
          desiredCount = data.postsPerRun
        } else if (data.postsPerRun.min && data.postsPerRun.max) {
          const { min, max } = data.postsPerRun
          desiredCount = Math.floor(Math.random() * (max - min + 1)) + min
        }
      } else if (data.config?.postsPerRun) {
        const { min, max } = data.config.postsPerRun
        desiredCount = Math.floor(Math.random() * (max - min + 1)) + min
      }
    }
  } catch (e) {
    console.log('Using default post count: 5')
  }

  console.log(`🤖 Generating ${desiredCount} blog posts...`)

  // Load topics
  const availableTopics = loadTopics()
  console.log(`📚 Loaded ${availableTopics.length} topics from keywords.json`)

  // Select topics using LRU
  const { topics, fromLRU, fromBackfill } = selectTopicsWithLRU(availableTopics, desiredCount)
  console.log(`📋 Selected ${topics.length} topics (${fromLRU} from keywords, ${fromBackfill} from evergreen backfill)`)

  // Create posts directory - NORMALIZED PATH
  const BLOG_DIR = path.join(process.cwd(), 'content/blog')
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true })
  }

  // Track results
  let successCount = 0
  let retryCount = 0
  let fallbackCount = 0
  const history = loadHistory()
  const processedTopics: string[] = []
  const createdFiles: string[] = []

  // Process each topic
  for (let i = 0; i < topics.length; i++) {
    const topic = topics[i]
    const category = CATEGORIES[i % CATEGORIES.length]

    console.log(`\n📝 Generating post ${i + 1}/${topics.length}: ${topic}`)

    // Try API generation with retries
    let post = await generatePostWithRetries(topic, category)

    if (!post) {
      // Use fallback generator
      console.log(`  Using fallback generator for: ${topic}`)
      post = generateFallbackPost(topic, category)
      fallbackCount++
    } else if (post && !post.localGenerated) {
      retryCount++ // Count if we needed retries
    }

    // Write the post
    const mdxContent = createMDXContent(post)
    const filePath = path.join(BLOG_DIR, `${post.slug}.mdx`)

    // Check if file already exists
    if (fs.existsSync(filePath)) {
      console.log(`  ⏭️  Skipping: ${post.slug} already exists`)
      continue
    }

    fs.writeFileSync(filePath, mdxContent, 'utf-8')
    console.log(`  ✅ Created: ${post.slug}.mdx${post.localGenerated ? ' (fallback)' : ''}`)

    processedTopics.push(topic)
    createdFiles.push(`${post.slug}.mdx`)
    successCount++

    // Add delay between API calls
    if (i < topics.length - 1 && !post.localGenerated) {
      await new Promise(resolve => setTimeout(resolve, 2000))
    }
  }

  // Update history
  const now = new Date().toISOString()
  processedTopics.forEach(topic => {
    const existing = history.findIndex(h => h.topic === topic)
    if (existing >= 0) {
      history[existing].lastUsedAt = now
    } else {
      history.push({ topic, lastUsedAt: now })
    }
  })
  saveHistory(history)

  // Update processed list in keywords.json if it exists
  try {
    if (fs.existsSync(keywordsPath)) {
      const data: KeywordsConfig = JSON.parse(fs.readFileSync(keywordsPath, 'utf-8'))
      const processed = data.processed || []

      // Add newly processed topics from available topics only
      processedTopics.forEach(topic => {
        if (availableTopics.includes(topic) && !processed.includes(topic)) {
          processed.push(topic)
        }
      })

      data.processed = processed
      fs.writeFileSync(keywordsPath, JSON.stringify(data, null, 2), 'utf-8')
    }
  } catch (e) {
    console.log('Note: Could not update processed topics in keywords.json')
  }

  console.log(`\n🎉 Generated ${successCount} blog posts successfully!`)
  console.log(`📊 Stats: ${fromLRU} from keywords, ${fromBackfill} from backfill, ${fallbackCount} using fallback`)

  if (createdFiles.length > 0) {
    console.log(`\n📝 Created files:`)
    createdFiles.forEach(file => console.log(`   - ${file}`))
  }

  if (successCount === 0) {
    console.error('❌ No posts were generated!')
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