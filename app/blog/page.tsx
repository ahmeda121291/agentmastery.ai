import fs from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'
import { formatDate } from '@/lib/seo'
import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Clock,
  Calendar,
  User,
  Tag,
  ArrowRight,
  Sparkles,
  TrendingUp,
  BookOpen,
  Filter
} from 'lucide-react'
import Link from 'next/link'
import { MobileStickyQuizCTA } from '@/components/layout/MobileStickyQuizCTA'
import BlogFilters from './BlogFilters'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

export const metadata: Metadata = {
  title: 'Deep Dives | AI Tool Reviews & Industry Insights',
  description: 'In-depth reviews, manuals, and trends shaping AI. Expert analysis on AI agents, automation tools, and emerging technologies.',
  openGraph: {
    title: 'Deep Dives - AgentMastery',
    description: 'In-depth reviews, manuals, and trends shaping AI.',
  }
}

type PostMeta = {
  slug: string
  title: string
  description?: string
  date?: string
  tags?: string[]
  category?: string
  author?: string
  image?: string
  published?: boolean
  excerpt?: string
  url?: string
}

async function getAllPosts(): Promise<PostMeta[]> {
  try {
    const files = await fs.readdir(BLOG_DIR)
    const mdx = files.filter(f => f.endsWith('.md') || f.endsWith('.mdx'))
    const posts = await Promise.all(
      mdx.map(async (file) => {
        const slug = file.replace(/\.mdx?$/, '')
        const raw = await fs.readFile(path.join(BLOG_DIR, file), 'utf8')
        const { data } = matter(raw)
        return {
          slug,
          title: data.title ?? slug.replace(/-/g, ' '),
          description: data.description ?? data.excerpt ?? '',
          excerpt: data.excerpt ?? data.description ?? '',
          date: data.date ?? null,
          tags: data.tags ?? [],
          category: data.category ?? 'General',
          author: data.author ?? 'AgentMastery Team',
          image: data.image,
          published: data.published !== false, // default true
          url: `/blog/${slug}`,
        } as PostMeta
      })
    )
    return posts
      .filter(p => p.published !== false)
      .sort((a, b) => (b.date ? Date.parse(b.date) : 0) - (a.date ? Date.parse(a.date) : 0))
  } catch (error) {
    console.error('Error loading posts:', error)
    return []
  }
}

async function getAllComparisons(): Promise<PostMeta[]> {
  try {
    const compareDir = path.join(process.cwd(), 'app', 'compare')
    const dirs = await fs.readdir(compareDir, { withFileTypes: true })
    const comparisonDirs = dirs.filter(d => d.isDirectory()).map(d => d.name)

    const comparisons = await Promise.all(
      comparisonDirs.map(async (dir) => {
        try {
          // Read metadata.ts to get title and description
          const metadataPath = path.join(compareDir, dir, 'metadata.ts')
          const metadataContent = await fs.readFile(metadataPath, 'utf8')

          // Extract title and description from metadata
          const titleMatch = metadataContent.match(/title:\s*['"]([^'"]+)['"]/)
          const descMatch = metadataContent.match(/description:\s*['"]([^'"]+)['"]/)

          const title = titleMatch ? titleMatch[1] : dir.replace(/-/g, ' ')
          const description = descMatch ? descMatch[1] : ''

          // Extract tool names from directory name
          const [toolA, toolB] = dir.split('-vs-')

          return {
            slug: dir,
            url: `/compare/${dir}`,
            title: title.replace(' | AgentMastery', ''),
            description,
            category: 'Comparisons',
            tags: [toolA, toolB, 'Comparison'].filter(Boolean),
            image: `/api/og/comparison?toolA=${toolA}&toolB=${toolB}`,
            published: true,
            date: new Date().toISOString().split('T')[0],
          } as PostMeta
        } catch (error) {
          console.error(`Error loading comparison ${dir}:`, error)
          return null
        }
      })
    )

    return comparisons.filter(Boolean) as PostMeta[]
  } catch (error) {
    console.error('Error loading comparisons:', error)
    return []
  }
}

function getCategories(posts: PostMeta[]): string[] {
  const categories = new Set(posts.map(p => p.category || 'General'))
  return Array.from(categories).sort()
}

// Define Editor's picks for fallback
const EDITORS_PICKS_SLUGS = [
  'ai-tools-2024-guide',
  'automation-workflow-best-practices',
  'chatgpt-business-use-cases'
]

export default async function BlogPage() {
  const blogPosts = await getAllPosts()
  const comparisons = await getAllComparisons()
  const allPosts = [...comparisons, ...blogPosts]
  const categories = getCategories(allPosts)

  // Get featured and editor's picks
  const editorsPicks = allPosts.filter(post => EDITORS_PICKS_SLUGS.includes(post.slug))
  const latestPosts = allPosts.slice(0, 6)
  const featuredPost = allPosts[0] // Most recent as featured

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-forest to-green text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-white/20 text-white border-white/30 mb-4">
              <Sparkles className="h-3 w-3 mr-1" />
              AI-Powered Insights
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
              Deep Dives
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              In-depth reviews, manuals, and trends shaping AI
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {allPosts.length === 0 ? (
          // Empty State
          <div className="max-w-2xl mx-auto text-center py-16">
            <div className="bg-gray-50 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <BookOpen className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">No articles found</h2>
            <p className="text-gray-600 mb-8">
              We're working on bringing you fresh content. Check back soon for insights on AI agents and automation!
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/quiz">
                <Button>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Take the Quiz
                </Button>
              </Link>
              <Link href="/tools">
                <Button variant="outline">
                  Browse Tools
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featuredPost && (
              <section className="mx-auto max-w-6xl px-6 md:px-8 py-10">
                <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
                  <article className="card relative overflow-hidden p-6 md:p-8 bg-gradient-to-br from-forest to-green text-white">
                    <div className="absolute inset-0 opacity-[0.10] pointer-events-none animate-pulse" />
                    <h3 className="text-2xl md:text-3xl font-bold relative z-10">{featuredPost.title}</h3>
                    <p className="mt-2 text-white/90 line-clamp-3 relative z-10">{featuredPost.description || featuredPost.excerpt}</p>
                    <div className="mt-6 flex flex-wrap gap-3 relative z-10">
                      <Link className="btn bg-white text-ink hover:bg-gray-100" href={`/blog/${featuredPost.slug}`}>Read Post</Link>
                      <Link className="btn bg-white/20 text-white border border-white/30 hover:bg-white/30" href="/leaderboards">View Rankings</Link>
                    </div>
                  </article>
                  <aside className="card p-4 md:p-6">
                    <h4 className="font-semibold text-ink">Latest Posts</h4>
                    <ul className="mt-3 space-y-2">
                      {latestPosts.slice(1, 6).map(post => (
                        <li key={post.slug}>
                          <Link
                            href={`/blog/${post.slug}`}
                            className="text-sm text-gray-600 hover:text-green transition-colors line-clamp-2"
                          >
                            {post.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </aside>
                </div>
              </section>
            )}

            {/* Client-side filtering component */}
            <BlogFilters posts={allPosts} categories={categories} />
          </>
        )}
      </div>

      <MobileStickyQuizCTA />
    </div>
  )
}