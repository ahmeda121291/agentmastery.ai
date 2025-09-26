import { metadata } from './metadata'
import UpdatesClient from './UpdatesClient'
import { getAllPosts } from '@/lib/blog'
import { tools } from '@/data/tools'
import fs from 'fs'
import path from 'path'

export { metadata }

interface ContentItem {
  title: string
  type: 'Blog' | 'Compare' | 'Tool' | 'Calculator' | 'Arcade' | 'Q&A' | 'Resource'
  url: string
  excerpt?: string
  updatedAt: string
  category?: string
}

// Helper to get file modification time
function getFileModTime(filePath: string): Date {
  try {
    const stats = fs.statSync(filePath)
    return stats.mtime
  } catch {
    return new Date()
  }
}

// Helper to get directory modification time
function getDirModTime(dirPath: string): Date {
  try {
    const pagePath = path.join(dirPath, 'page.tsx')
    if (fs.existsSync(pagePath)) {
      return getFileModTime(pagePath)
    }
    return getFileModTime(dirPath)
  } catch {
    return new Date()
  }
}

async function getUpdatesData(): Promise<ContentItem[]> {
  const items: ContentItem[] = []

  // 1. Blog posts
  try {
    const posts = getAllPosts()
    posts.forEach(post => {
      const mdxPath = path.join(process.cwd(), 'content', 'blog', `${post.slug}.mdx`)
      const modTime = post.date ? new Date(post.date) : getFileModTime(mdxPath)

      items.push({
        title: post.title,
        type: 'Blog',
        url: `/blog/${post.slug}`,
        excerpt: (post as any).excerpt || (post as any).description || 'Read our latest insights',
        updatedAt: modTime.toISOString(),
        category: post.category || 'General'
      })
    })
  } catch (e) {
    console.log('Error fetching blog posts for updates')
  }

  // 2. Compare pages
  try {
    const compareBase = path.join(process.cwd(), 'app', 'compare')
    const compareDirs = fs.readdirSync(compareBase, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => d.name)

    compareDirs.forEach(dir => {
      const dirPath = path.join(compareBase, dir)
      const modTime = getDirModTime(dirPath)
      const [toolA, toolB] = dir.split('-vs-')

      items.push({
        title: `${toolA?.charAt(0).toUpperCase()}${toolA?.slice(1)} vs ${toolB?.charAt(0).toUpperCase()}${toolB?.slice(1)}`,
        type: 'Compare',
        url: `/compare/${dir}`,
        excerpt: `Detailed comparison of features, pricing, and capabilities`,
        updatedAt: modTime.toISOString(),
        category: 'Comparison'
      })
    })
  } catch (e) {
    console.log('Error fetching compare pages for updates')
  }

  // 3. Arcade tools
  try {
    const arcadeBase = path.join(process.cwd(), 'app', 'arcade')
    const arcadeDirs = fs.readdirSync(arcadeBase, { withFileTypes: true })
      .filter(d => d.isDirectory() && d.name !== 'cold-email-roi')
      .map(d => d.name)

    const arcadeTitles: Record<string, string> = {
      'ad-roi': 'Ad Spend ROI Calculator',
      'affiliate-earnings': 'Affiliate Earnings Forecaster',
      'chatbot-savings': 'Chatbot Savings Calculator',
      'cold-call-calculator': 'Cold Call Calculator',
      'price-guess': 'Tool Price Guessing Game',
      'seo-content-roi': 'SEO Content ROI Calculator',
      'video-production-cost': 'Video Production Cost Calculator'
    }

    arcadeDirs.forEach(dir => {
      const dirPath = path.join(arcadeBase, dir)
      const modTime = getDirModTime(dirPath)

      items.push({
        title: arcadeTitles[dir] || dir.replace(/-/g, ' '),
        type: 'Arcade',
        url: `/arcade/${dir}`,
        excerpt: 'Interactive calculator and forecasting tool',
        updatedAt: modTime.toISOString(),
        category: 'Interactive'
      })
    })
  } catch (e) {
    console.log('Error fetching arcade pages for updates')
  }

  // 4. Calculator pages
  try {
    const calculatorPages = [
      { slug: 'roi', title: 'Cold Email ROI Calculator', excerpt: 'Calculate your return on investment for email campaigns' },
      { slug: 'switch-savings', title: 'Switch & Save Calculator', excerpt: 'Compare costs between ZoomInfo and Apollo' }
    ]

    calculatorPages.forEach(calc => {
      const pagePath = path.join(process.cwd(), 'app', 'calculators', calc.slug, 'page.tsx')
      const modTime = getFileModTime(pagePath)

      items.push({
        title: calc.title,
        type: 'Calculator',
        url: `/calculators/${calc.slug}`,
        excerpt: calc.excerpt,
        updatedAt: modTime.toISOString(),
        category: 'Calculator'
      })
    })
  } catch (e) {
    console.log('Error fetching calculator pages for updates')
  }

  // 5. Tool pages (sample of recently updated)
  try {
    // Take a sample of tools since there are many
    const toolSample = tools.slice(0, 15)
    toolSample.forEach(tool => {
      items.push({
        title: tool.name,
        type: 'Tool',
        url: `/tools/${tool.slug}`,
        excerpt: tool.blurb,
        updatedAt: new Date().toISOString(), // Tools don't have individual mod times
        category: tool.category
      })
    })
  } catch (e) {
    console.log('Error fetching tool pages for updates')
  }

  // 6. Key static pages
  const staticPages = [
    { path: 'answers', title: 'AI Q&A Hub', type: 'Q&A' as const, excerpt: 'Quick answers to common AI tool questions' },
    { path: 'resources', title: 'AI Resources', type: 'Resource' as const, excerpt: 'Templates, guides, and frameworks' },
    { path: 'leaderboards', title: 'Tool Leaderboards', type: 'Tool' as const, excerpt: 'Weekly rankings and top performers' },
    { path: 'quiz', title: 'Tool Matcher Quiz', type: 'Tool' as const, excerpt: 'Find your ideal AI stack' },
    { path: 'about', title: 'About AgentMastery', type: 'Resource' as const, excerpt: 'Our mission and methodology' }
  ]

  staticPages.forEach(page => {
    const pagePath = path.join(process.cwd(), 'app', page.path, 'page.tsx')
    const modTime = getFileModTime(pagePath)

    items.push({
      title: page.title,
      type: page.type,
      url: `/${page.path}`,
      excerpt: page.excerpt,
      updatedAt: modTime.toISOString(),
      category: 'Static'
    })
  })

  // Sort by updated date (most recent first)
  items.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())

  // Return top 50
  return items.slice(0, 50)
}

export default async function UpdatesPage() {
  const updates = await getUpdatesData()

  return <UpdatesClient initialUpdates={updates} />
}