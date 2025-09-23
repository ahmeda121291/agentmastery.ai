import fs from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'
import { formatDate } from '@/lib/seo'
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
  const allPosts = await getAllPosts()
  const categories = getCategories(allPosts)

  // Get featured and editor's picks
  const editorsPicks = allPosts.filter(post => EDITORS_PICKS_SLUGS.includes(post.slug))
  const latestPosts = allPosts.slice(0, 6)
  const featuredPost = allPosts[0] // Most recent as featured

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-white/20 text-white border-white/30 mb-4">
              <Sparkles className="h-3 w-3 mr-1" />
              AI-Powered Insights
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              AgentMastery Blog
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Master AI agents with expert insights, tutorials, and industry trends
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
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <TrendingUp className="h-6 w-6 mr-2 text-blue-600" />
                  Featured Post
                </h2>
                <Link href={`/blog/${featuredPost.slug}`}>
                  <Card className="hover:shadow-xl transition-shadow overflow-hidden">
                    {featuredPost.image && (
                      <div className="h-64 bg-gradient-to-r from-blue-600 to-indigo-700" />
                    )}
                    <CardHeader>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {featuredPost.date ? formatDate(featuredPost.date) : 'Recently'}
                        </span>
                        <Badge variant="secondary">{featuredPost.category}</Badge>
                      </div>
                      <CardTitle className="text-2xl">{featuredPost.title}</CardTitle>
                      <CardDescription className="text-base">
                        {featuredPost.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              </div>
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