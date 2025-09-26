import { MetadataRoute } from 'next'
import { tools } from '@/data/tools'
import { getAllPosts } from '@/lib/blog'
import fs from 'node:fs'
import path from 'node:path'

const BASE_URL = 'https://agentmastery.ai'

// Helper to get file modification time
function getFileModTime(filePath: string): string {
  try {
    const stats = fs.statSync(filePath)
    return stats.mtime.toISOString()
  } catch {
    return new Date().toISOString()
  }
}

// Helper to get lastmod for a route based on its page.tsx file
function getRouteLastMod(routePath: string): string {
  const pagePath = path.join(process.cwd(), 'app', routePath, 'page.tsx')
  return getFileModTime(pagePath)
}

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString()

  // Static pages with proper lastmod
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: getRouteLastMod(''),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/updates`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/tools`,
      lastModified: getRouteLastMod('tools'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/leaderboards`,
      lastModified: getRouteLastMod('leaderboards'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: getRouteLastMod('blog'),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/arcade`,
      lastModified: getRouteLastMod('arcade'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/answers`,
      lastModified: getRouteLastMod('answers'),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: getRouteLastMod('about'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/resources`,
      lastModified: getRouteLastMod('resources'),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/quiz`,
      lastModified: getRouteLastMod('quiz'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/quiz/personality`,
      lastModified: getRouteLastMod('quiz/personality'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // Tool pages
  const toolPages: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${BASE_URL}/tools/${tool.slug}`,
    lastModified: currentDate, // Tools data doesn't have individual lastmod
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Blog posts with proper dates
  let blogPosts: MetadataRoute.Sitemap = []
  try {
    const posts = getAllPosts()
    blogPosts = posts.map((post) => {
      // Try to get lastmod from MDX file if date is not available
      let lastMod = post.date || currentDate
      if (!post.date) {
        const mdxPath = path.join(process.cwd(), 'content', 'blog', `${post.slug}.mdx`)
        lastMod = getFileModTime(mdxPath)
      }
      return {
        url: `${BASE_URL}/blog/${post.slug}`,
        lastModified: lastMod,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }
    })
  } catch (error) {
    console.log('No blog posts found for sitemap')
  }

  // Compare pages with lastmod from file
  let comparePages: MetadataRoute.Sitemap = []
  try {
    const compareBase = path.join(process.cwd(), 'app', 'compare')
    const entries = fs.readdirSync(compareBase, { withFileTypes: true })
    const dirs = entries.filter(e => e.isDirectory()).map(d => d.name)
    comparePages = dirs.map((dir) => ({
      url: `${BASE_URL}/compare/${dir}`,
      lastModified: getRouteLastMod(`compare/${dir}`),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  } catch (err) {
    console.log('No compare pages found for sitemap')
  }

  // Arcade pages (calculators and interactive tools)
  let arcadePages: MetadataRoute.Sitemap = []
  try {
    const arcadeBase = path.join(process.cwd(), 'app', 'arcade')
    const entries = fs.readdirSync(arcadeBase, { withFileTypes: true })
    const dirs = entries.filter(e => e.isDirectory()).map(d => d.name)

    // Filter out cold-email-roi as it's dynamic
    const validDirs = dirs.filter(dir => dir !== 'cold-email-roi')

    arcadePages = validDirs.map((dir) => ({
      url: `${BASE_URL}/arcade/${dir}`,
      lastModified: getRouteLastMod(`arcade/${dir}`),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  } catch (err) {
    console.log('No arcade pages found for sitemap')
  }

  // Calculator pages
  const calculatorPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/calculators/roi`,
      lastModified: getRouteLastMod('calculators/roi'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/calculators/switch-savings`,
      lastModified: getRouteLastMod('calculators/switch-savings'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // Games pages (include for completeness, lower priority)
  const gamePages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/games/bingo`,
      lastModified: getRouteLastMod('games/bingo'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/games/pop-quiz`,
      lastModified: getRouteLastMod('games/pop-quiz'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  // Combine all pages
  const allPages = [
    ...staticPages,
    ...toolPages,
    ...blogPosts,
    ...comparePages,
    ...arcadePages,
    ...calculatorPages,
    ...gamePages,
  ]

  // Check if we need to split sitemaps (>5000 URLs)
  // Current count: ~150 URLs, so we're safe with a single sitemap
  // If we grow beyond 5000, we'll need to implement sitemap index logic

  return allPages
}

// Export a revalidate time for ISR (cache for 1 hour)
export const revalidate = 3600