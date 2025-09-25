import fs from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import { generateBlogMetadata, formatDate, canonical } from '@/lib/seo'
import {
  generateArticleSchema,
  faqPageSchema,
  breadcrumbSchema,
  createSchemaScript
} from '@/lib/jsonld'
import { MDX } from '@/lib/mdx'
import { processMDXContent } from '@/lib/mdxSanitize'
import { buildAffiliateUrl } from '@/lib/affiliate'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Clock,
  Calendar,
  User,
  Tag,
  ChevronRight,
  BookOpen,
  TrendingUp,
  Sparkles,
  ArrowRight,
  BarChart3
} from 'lucide-react'
import Link from 'next/link'
import Script from 'next/script'
import dynamic from 'next/dynamic'
import { ShareButtons } from '@/components/ShareButtons'

// Dynamic import for client-side progress rail
const ProgressRail = dynamic(() => import('@/components/blog/ProgressRail'), {
  ssr: false,
  loading: () => null
})

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

export async function generateStaticParams() {
  try {
    const files = await fs.readdir(BLOG_DIR)
    return files
      .filter(f => f.endsWith('.md') || f.endsWith('.mdx'))
      .map(f => ({ slug: f.replace(/\.mdx?$/, '') }))
  } catch {
    return []
  }
}

async function getPost(slug: string) {
  try {
    const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
    const fileExists = await fs.access(filePath).then(() => true).catch(() => false)

    if (!fileExists) {
      // Try .md extension
      const mdPath = path.join(BLOG_DIR, `${slug}.md`)
      const mdExists = await fs.access(mdPath).then(() => true).catch(() => false)
      if (!mdExists) return null

      const raw = await fs.readFile(mdPath, 'utf8')
      const { content, data } = matter(raw)
      return { content, meta: data }
    }

    const raw = await fs.readFile(filePath, 'utf8')
    const { content, data } = matter(raw)
    return { content, meta: data }
  } catch {
    return null
  }
}

async function getRelatedPosts(currentSlug: string, category?: string, tags?: string[]) {
  try {
    const files = await fs.readdir(BLOG_DIR)
    const mdxFiles = files.filter(f => f.endsWith('.md') || f.endsWith('.mdx'))

    const posts = await Promise.all(
      mdxFiles
        .filter(f => f.replace(/\.mdx?$/, '') !== currentSlug)
        .slice(0, 10) // Limit to check first 10
        .map(async (file) => {
          const slug = file.replace(/\.mdx?$/, '')
          const raw = await fs.readFile(path.join(BLOG_DIR, file), 'utf8')
          const { data } = matter(raw)

          let score = 0
          if (category && data.category === category) score += 10
          if (tags && data.tags) {
            const matchingTags = tags.filter((t: string) => data.tags?.includes(t))
            score += matchingTags.length * 5
          }

          return {
            slug,
            title: data.title || slug.replace(/-/g, ' '),
            description: data.description || data.excerpt || '',
            category: data.category,
            score
          }
        })
    )

    return posts
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  if (!post) return { title: 'Post Not Found' }

  const metadata = generateBlogMetadata(
    {
      title: post.meta.title,
      description: post.meta.description || post.meta.excerpt,
      date: post.meta.date,
      author: post.meta.author,
      category: post.meta.category,
      tags: post.meta.tags,
      image: post.meta.image,
      faq: post.meta.faq
    },
    params.slug
  )

  return {
    ...metadata,
    alternates: {
      canonical: canonical(`/blog/${params.slug}`),
    },
  }
}


// Helper to estimate reading time
function estimateReadingTime(content: string): string {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min read`
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = await getRelatedPosts(params.slug, post.meta.category, post.meta.tags)
  const readingTime = estimateReadingTime(post.content)

  // Process MDX content
  const processedContent = processMDXContent(post.content)

  // Generate JSON-LD schemas
  const articleData = generateArticleSchema({
    headline: post.meta.title,
    description: post.meta.description || post.meta.excerpt,
    datePublished: post.meta.date,
    author: post.meta.author || 'AgentMastery Team',
    image: post.meta.image,
    url: canonical(`/blog/${params.slug}`),
  })

  const breadcrumbData = breadcrumbSchema([
    { name: 'Home', url: canonical('/') },
    { name: 'Deep Dives', url: canonical('/blog') },
    { name: post.meta.title, url: canonical(`/blog/${params.slug}`) },
  ])

  const faqData = post.meta.faq ? faqPageSchema(post.meta.faq, canonical(`/blog/${params.slug}`)) : null

  return (
    <>
      <ProgressRail />
      <article className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Schema.org structured data */}
        <Script {...createSchemaScript([articleData, breadcrumbData, faqData].filter(Boolean), `blog-schema-${params.slug}`)} />

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-forest to-green text-white">
          <div className="container mx-auto px-4 py-12 md:py-20">
            <div className="max-w-4xl mx-auto">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
                <Link href="/" className="hover:text-white">Home</Link>
                <ChevronRight className="h-3 w-3" />
                <Link href="/blog" className="hover:text-white">Deep Dives</Link>
                <ChevronRight className="h-3 w-3" />
                <span className="text-white truncate max-w-[200px]">{post.meta.title}</span>
              </nav>

              {/* Category Badge */}
              {post.meta.category && (
                <Badge className="bg-white/20 text-white border-white/30 mb-4">
                  {post.meta.category}
                </Badge>
              )}

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {post.meta.title}
              </h1>

              {/* Description */}
              {(post.meta.description || post.meta.excerpt) && (
                <p className="text-xl text-white/90 mb-6">
                  {post.meta.description || post.meta.excerpt}
                </p>
              )}

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
                <span className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {post.meta.author || 'AgentMastery Team'}
                </span>
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {post.meta.date ? formatDate(post.meta.date) : 'Recently'}
                </span>
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {readingTime}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 py-12">
          {/* Direct Answer Block for AEO */}
          {(post.meta.summary || post.meta.excerpt) && (
            <div className="max-w-4xl mx-auto mb-8">
              <div className="rounded-lg border border-green/20 bg-green/5 p-4">
                <p className="text-sm font-medium text-gray-900 mb-1">Summary:</p>
                <p className="text-sm text-gray-700">{post.meta.summary || post.meta.excerpt}</p>
              </div>
            </div>
          )}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
              {/* Tags */}
              {post.meta.tags && post.meta.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {post.meta.tags.map((tag: string) => (
                    <Badge key={tag} variant="secondary">
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* MDX Content */}
              <div className="prose-am max-w-none">
                <MDX source={processedContent} />
              </div>

              {/* Share Buttons */}
              <div className="mt-12 pt-8 border-t">
                <ShareButtons
                  slug={params.slug}
                  title={post.meta.title}
                />
              </div>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <BookOpen className="h-6 w-6 mr-2 text-green" />
                  Related Articles
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedPosts.map((related) => (
                    <Link key={related.slug} href={`/blog/${related.slug}`}>
                      <Card className="h-full hover:shadow-lg transition-shadow">
                        <CardHeader>
                          {related.category && (
                            <Badge variant="outline" className="w-fit mb-2">
                              {related.category}
                            </Badge>
                          )}
                          <CardTitle className="line-clamp-2">{related.title}</CardTitle>
                          <CardDescription className="line-clamp-3">
                            {related.description}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Section */}
            <div className="mt-12 bg-gradient-to-r from-forest to-green rounded-lg p-8 text-white text-center">
              <h2 className="text-2xl font-bold mb-4">
                Ready to Master AI Agents?
              </h2>
              <p className="mb-6 text-white/90">
                Find the perfect AI tools for your business needs
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/quiz">
                  <Button size="lg" variant="secondary">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Take the Quiz
                  </Button>
                </Link>
                <Link href="/tools">
                  <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
                    Browse Tools
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}