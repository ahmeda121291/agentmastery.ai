#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import * as dotenv from 'dotenv'
import OpenAI from 'openai'
import { buildAffiliateUrl } from '../src/lib/affiliate'

// Load env from process.env first, then .env.local, then .env
if (!process.env.OPENAI_API_KEY) {
  const root = process.cwd()
  const envLocal = path.join(root, '.env.local')
  const envFile = path.join(root, '.env')
  if (fs.existsSync(envLocal)) {
    dotenv.config({ path: envLocal })
  } else if (fs.existsSync(envFile)) {
    dotenv.config({ path: envFile })
  }
}

const OPENAI_API_KEY = process.env.OPENAI_API_KEY
if (!OPENAI_API_KEY) {
  console.log('SKIP: No OPENAI_API_KEY')
  process.exit(0)
}

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
})

// Load keywords and config
const keywordsPath = path.join(process.cwd(), 'src/data/keywords.json')
const keywordsData = JSON.parse(fs.readFileSync(keywordsPath, 'utf-8'))
const { min, max } = keywordsData.config.postsPerRun
const postsToGenerate = Math.floor(Math.random() * (max - min + 1)) + min

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

async function generatePost(topic: string, category: string): Promise<GeneratedPost | null> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'You are an expert technical writer creating high-quality, SEO-optimized blog posts about AI tools and automation.'
        },
        {
          role: 'user',
          content: generatePrompt(topic, category)
        }
      ],
      temperature: 0.8,
      max_tokens: 4000,
      response_format: { type: 'json_object' }
    })

    const content = response.choices[0]?.message?.content
    if (!content) return null

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
    console.error('Error generating post:', error)
    return null
  }
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
image: "${ogImage}"
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
  console.log(`🤖 Generating ${postsToGenerate} blog posts...`)

  // Get available topics
  const availableTopics = keywordsData.keywords
    .filter((k: any) => !keywordsData.processed.includes(k.keyword))
    .slice(0, postsToGenerate)

  if (availableTopics.length < postsToGenerate) {
    console.log(`⚠️  Only ${availableTopics.length} unprocessed topics available`)
  }

  const postsDir = path.join(process.cwd(), 'src/content/blog')
  if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true })
  }

  let successCount = 0
  const processedKeywords: string[] = [...keywordsData.processed]

  for (let i = 0; i < Math.min(postsToGenerate, availableTopics.length); i++) {
    const topic = availableTopics[i]
    const category = CATEGORIES[i % CATEGORIES.length]

    console.log(`\n📝 Generating post ${i + 1}/${postsToGenerate}: ${topic.keyword}`)

    const post = await generatePost(topic.keyword, category)

    if (post) {
      const mdxContent = createMDXContent(post)
      const filePath = path.join(postsDir, `${post.slug}.mdx`)

      // Check if file already exists
      if (fs.existsSync(filePath)) {
        console.log(`⏭️  Skipping: ${post.slug} already exists`)
        continue
      }

      fs.writeFileSync(filePath, mdxContent, 'utf-8')
      console.log(`✅ Created: ${post.slug}.mdx`)

      processedKeywords.push(topic.keyword)
      successCount++
    } else {
      console.log(`❌ Failed to generate post for: ${topic.keyword}`)
    }

    // Add delay to avoid rate limits
    if (i < postsToGenerate - 1) {
      await new Promise(resolve => setTimeout(resolve, 2000))
    }
  }

  // Update keywords.json with processed items
  keywordsData.processed = processedKeywords
  keywordsData.lastProcessedDate = new Date().toISOString()
  fs.writeFileSync(keywordsPath, JSON.stringify(keywordsData, null, 2), 'utf-8')

  console.log(`\n🎉 Generated ${successCount} blog posts successfully!`)

  // Remind to change config back to 5/5
  if (postsToGenerate === 10) {
    console.log('\n📌 Remember to change postsPerRun back to min:5, max:5 in keywords.json')
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error)
    process.exit(1)
  })
}