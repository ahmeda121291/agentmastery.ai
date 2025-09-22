#!/usr/bin/env node

import * as fs from 'fs'
import * as path from 'path'
import OpenAI from 'openai'
import { tools } from '../src/data/tools'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

interface Keyword {
  keyword: string
  priority: string
  category: string
  suggestedPushLevel: string
}

interface KeywordData {
  keywords: Keyword[]
  processed: string[]
  lastProcessedDate: string | null
  config: {
    postsPerRun: {
      min: number
      max: number
    }
    pushLevelDistribution: Record<string, number>
  }
}

type PushLevel = 'heavy' | 'medium' | 'light' | 'none'

// Check for API key
if (!process.env.OPENAI_API_KEY) {
  console.log('SKIP: No OPENAI_API_KEY')
  process.exit(0)
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

// File paths
const KEYWORDS_PATH = path.join(__dirname, '../src/data/keywords.json')
const BLOG_DIR = path.join(__dirname, '../content/blog')

// Ensure blog directory exists
if (!fs.existsSync(BLOG_DIR)) {
  fs.mkdirSync(BLOG_DIR, { recursive: true })
}

// Load keywords
function loadKeywords(): KeywordData {
  const data = fs.readFileSync(KEYWORDS_PATH, 'utf-8')
  return JSON.parse(data)
}

// Save keywords
function saveKeywords(data: KeywordData) {
  fs.writeFileSync(KEYWORDS_PATH, JSON.stringify(data, null, 2))
}

// Get random push level based on distribution
function getRandomPushLevel(distribution: Record<string, number>): PushLevel {
  const rand = Math.random()
  let cumulative = 0

  for (const [level, probability] of Object.entries(distribution)) {
    cumulative += probability
    if (rand <= cumulative) {
      return level as PushLevel
    }
  }

  return 'light' // fallback
}

// Get relevant tools for a category
function getRelevantTools(category: string, count: number = 3): typeof tools {
  const categoryTools = tools.filter(tool =>
    tool.category === category ||
    tool.category.includes(category.split('/')[0])
  )

  // Shuffle and return requested count
  return categoryTools
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.min(count, categoryTools.length))
}

// Generate affiliate links based on push level
function generateAffiliateLinks(pushLevel: PushLevel, category: string): string[] {
  const affiliateLinks: string[] = []

  switch (pushLevel) {
    case 'heavy':
      // 5-8 affiliate links
      const heavyTools = getRelevantTools(category, 8)
      heavyTools.forEach(tool => {
        affiliateLinks.push(tool.affiliateUrl)
      })
      break
    case 'medium':
      // 3-4 affiliate links
      const mediumTools = getRelevantTools(category, 4)
      mediumTools.forEach(tool => {
        affiliateLinks.push(tool.affiliateUrl)
      })
      break
    case 'light':
      // 1-2 affiliate links
      const lightTools = getRelevantTools(category, 2)
      lightTools.forEach(tool => {
        affiliateLinks.push(tool.affiliateUrl)
      })
      break
    case 'none':
      // No affiliate links
      break
  }

  return affiliateLinks
}

// Generate blog post content
async function generateBlogPost(keyword: Keyword, pushLevel: PushLevel): Promise<string> {
  const relevantTools = getRelevantTools(keyword.category, 5)
  const affiliateLinks = generateAffiliateLinks(pushLevel, keyword.category)

  // Create content prompt based on push level
  let contentPrompt = `Write a comprehensive blog post about "${keyword.keyword}" for an AI tools and automation blog.

Category: ${keyword.category}
Push Level: ${pushLevel}
${relevantTools.length > 0 ? `Relevant tools to mention: ${relevantTools.map(t => t.name).join(', ')}` : ''}

Requirements:
`

  switch (pushLevel) {
    case 'heavy':
      contentPrompt += `
- Format: Full review/comparison article (1500-2000 words)
- Include detailed tool comparisons with pros/cons
- Naturally mention and link to these tools: ${relevantTools.slice(0, 5).map(t => `${t.name} (${t.affiliateUrl})`).join(', ')}
- Include pricing comparisons and ROI calculations
- Add "Best For" recommendations for each tool
`
      break
    case 'medium':
      contentPrompt += `
- Format: Listicle or roundup (1000-1500 words)
- Include 5-7 key points or tools
- Naturally mention these tools: ${relevantTools.slice(0, 3).map(t => `${t.name} (${t.affiliateUrl})`).join(', ')}
- Focus on practical tips and use cases
`
      break
    case 'light':
      contentPrompt += `
- Format: How-to guide (800-1200 words)
- Step-by-step instructions
- Optionally mention 1-2 tools: ${relevantTools.slice(0, 2).map(t => `${t.name} (${t.affiliateUrl})`).join(', ')}
- Focus on actionable advice
`
      break
    case 'none':
      contentPrompt += `
- Format: Educational/thought leadership piece (800-1200 words)
- No product promotion
- Focus on industry insights and best practices
- Build trust and authority
`
      break
  }

  contentPrompt += `

Include:
1. Engaging introduction
2. Well-structured main content with subheadings
3. Practical examples
4. Conclusion with key takeaways
5. 3-4 FAQ questions and answers

Format the response as MDX with proper frontmatter.
Use markdown formatting for headings, lists, and emphasis.
For affiliate links, use this format: [Tool Name](affiliate-url?ref=agentmastery&rel=sponsored)
`

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert content writer specializing in AI tools, sales automation, and productivity software. Write engaging, SEO-optimized content that provides value while naturally incorporating affiliate links when appropriate.'
        },
        {
          role: 'user',
          content: contentPrompt
        }
      ],
      temperature: 0.8,
      max_tokens: 3000
    })

    const content = completion.choices[0].message.content || ''

    // Generate MDX frontmatter
    const date = new Date().toISOString().split('T')[0]
    const slug = keyword.keyword.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')

    const frontmatter = `---
title: "${keyword.keyword.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}"
description: "Comprehensive guide on ${keyword.keyword} with expert insights and recommendations."
date: "${date}"
author: "AgentMastery Team"
category: "${keyword.category}"
tags: ${JSON.stringify(keyword.keyword.split(' ').slice(0, 5))}
affiliateLinks: ${JSON.stringify(affiliateLinks)}
pushLevel: "${pushLevel}"
faq:
  - question: "What are the key considerations for ${keyword.keyword}?"
    answer: "Key considerations include cost-effectiveness, integration capabilities, ease of use, and scalability for your specific needs."
  - question: "How much should I budget for ${keyword.keyword.includes('tool') ? 'these tools' : 'this'}?"
    answer: "Budget varies based on team size and needs, typically ranging from $50-500/month for small teams to $1000+ for enterprises."
  - question: "What's the ROI of implementing ${keyword.keyword.includes('tool') ? 'these solutions' : 'this approach'}?"
    answer: "Most businesses see positive ROI within 3-6 months through time savings and improved efficiency."
---

${content}`

    return frontmatter
  } catch (error) {
    console.error(`Error generating content for "${keyword.keyword}":`, error)
    throw error
  }
}

// Main function
async function main() {
  console.log('Starting blog post generation...')

  const keywordData = loadKeywords()

  // Filter unprocessed keywords
  const unprocessedKeywords = keywordData.keywords.filter(
    k => !keywordData.processed.includes(k.keyword)
  )

  if (unprocessedKeywords.length === 0) {
    console.log('No unprocessed keywords found')
    return
  }

  // Determine number of posts to generate
  const { min, max } = keywordData.config.postsPerRun
  const postsToGenerate = Math.floor(Math.random() * (max - min + 1)) + min
  const keywordsToProcess = unprocessedKeywords
    .sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 }
      return (priorityOrder[a.priority] || 2) - (priorityOrder[b.priority] || 2)
    })
    .slice(0, postsToGenerate)

  console.log(`Generating ${keywordsToProcess.length} blog posts...`)

  for (const keyword of keywordsToProcess) {
    try {
      // Determine push level
      const pushLevel = getRandomPushLevel(keywordData.config.pushLevelDistribution)
      console.log(`Processing "${keyword.keyword}" with push level: ${pushLevel}`)

      // Generate content
      const content = await generateBlogPost(keyword, pushLevel)

      // Generate filename
      const slug = keyword.keyword.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
      const filename = `${slug}.mdx`
      const filepath = path.join(BLOG_DIR, filename)

      // Write file
      fs.writeFileSync(filepath, content)
      console.log(`Created: ${filename}`)

      // Mark as processed
      keywordData.processed.push(keyword.keyword)

      // Add delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000))
    } catch (error) {
      console.error(`Failed to process "${keyword.keyword}":`, error)
    }
  }

  // Update last processed date
  keywordData.lastProcessedDate = new Date().toISOString()

  // Save updated keywords
  saveKeywords(keywordData)

  console.log('Blog post generation complete!')
}

// Run the script
main().catch(error => {
  console.error('Fatal error:', error)
  process.exit(1)
})