import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPosts, getRelatedPosts } from '@/src/lib/blog'
import { generateBlogMetadata, formatDate } from '@/src/lib/seo'
import {
  generateArticleSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  createSchemaScript
} from '@/src/lib/jsonld'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Clock,
  Calendar,
  User,
  Tag,
  Share2,
  Twitter,
  Linkedin,
  Link2,
  ChevronRight,
  BookOpen
} from 'lucide-react'
import Link from 'next/link'
import Script from 'next/script'
import { Callout, ProsCons } from '@/src/components/mdx'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) return { title: 'Post Not Found' }

  return generateBlogMetadata(
    {
      title: post.title,
      description: post.description,
      date: post.date,
      author: post.author,
      category: post.category,
      tags: post.tags,
      image: post.image,
      faq: post.faq
    },
    params.slug
  )
}

const components = {
  Callout,
  ProsCons,
  a: ({ href, children, ...props }: any) => {
    // Add affiliate link attributes
    const isAffiliate = href?.includes('?') && (
      href.includes('fpr=') ||
      href.includes('via=') ||
      href.includes('ref=') ||
      href.includes('aff=')
    )

    if (isAffiliate) {
      return (
        <a
          href={href}
          target="_blank"
          rel="nofollow sponsored noopener"
          className="text-primary hover:underline font-medium"
          {...props}
        >
          {children}
        </a>
      )
    }

    return (
      <a
        href={href}
        className="text-primary hover:underline"
        {...props}
      >
        {children}
      </a>
    )
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(params.slug)

  // Generate structured data using consolidated helpers
  const articleSchema = generateArticleSchema({
    headline: post.title,
    description: post.description,
    author: post.author,
    datePublished: post.date,
    dateModified: post.date,
    image: post.image,
    keywords: post.tags,
    articleBody: post.content,
    url: `https://agentmastery.ai/blog/${params.slug}`
  })

  const faqSchema = post.faq ? generateFAQSchema(post.faq) : null

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://agentmastery.ai' },
    { name: 'Blog', url: 'https://agentmastery.ai/blog' },
    { name: post.title, url: `https://agentmastery.ai/blog/${params.slug}` }
  ])

  // Generate TOC from content
  const headings = post.content.match(/^#{2,3}\s.+$/gm) || []
  const toc = headings.map(heading => {
    const level = heading.match(/^#+/)?.[0].length || 2
    const text = heading.replace(/^#+\s/, '')
    const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
    return { level, text, id }
  })

  return (
    <>
      {/* Structured Data */}
      <Script {...createSchemaScript(articleSchema, `article-${params.slug}`)} />
      {faqSchema && <Script {...createSchemaScript(faqSchema, `faq-${params.slug}`)} />}
      <Script {...createSchemaScript(breadcrumbSchema, `breadcrumb-${params.slug}`)} />

      <article className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            {/* Breadcrumbs */}
            <nav className="mb-6">
              <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/" className="hover:text-foreground">Home</Link>
                </li>
                <li>/</li>
                <li>
                  <Link href="/blog" className="hover:text-foreground">Blog</Link>
                </li>
                <li>/</li>
                <li className="text-foreground font-medium line-clamp-1">{post.title}</li>
              </ol>
            </nav>

            {/* Category & Reading Time */}
            <div className="flex items-center gap-4 mb-4">
              <Badge>{post.category}</Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{post.readingTime}</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              {post.title}
            </h1>

            {/* Description */}
            <p className="text-xl text-muted-foreground mb-6">
              {post.description}
            </p>

            {/* Meta Info */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.date)}</span>
              </div>
              {post.tags.length > 0 && (
                <div className="flex items-center gap-1">
                  <Tag className="h-4 w-4" />
                  <div className="flex gap-1">
                    {post.tags.map(tag => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Separator />
          </header>

          <div className="grid lg:grid-cols-[1fr,300px] gap-8">
            {/* Main Content */}
            <div className="prose prose-lg max-w-none">
              <MDXRemote source={post.content} components={components} />

              {/* FAQ Section */}
              {post.faq && post.faq.length > 0 && (
                <div className="mt-12">
                  <h2 id="faq">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {post.faq.map((item, index) => (
                      <div key={index} className="border-l-4 border-primary/20 pl-4">
                        <h3 className="font-semibold mb-2">{item.question}</h3>
                        <p className="text-muted-foreground">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Table of Contents */}
              {toc.length > 0 && (
                <Card className="sticky top-4">
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      Table of Contents
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <nav className="space-y-2">
                      {toc.map((item, index) => (
                        <a
                          key={index}
                          href={`#${item.id}`}
                          className={`block text-sm hover:text-primary transition-colors ${
                            item.level === 3 ? 'pl-4' : ''
                          }`}
                        >
                          {item.text}
                        </a>
                      ))}
                      {post.faq && post.faq.length > 0 && (
                        <a
                          href="#faq"
                          className="block text-sm hover:text-primary transition-colors"
                        >
                          FAQ
                        </a>
                      )}
                    </nav>
                  </CardContent>
                </Card>
              )}

              {/* Social Share */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Share2 className="h-4 w-4" />
                    Share Article
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      asChild
                    >
                      <a
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://agentmastery.ai/blog/${params.slug}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Twitter className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      asChild
                    >
                      <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://agentmastery.ai/blog/${params.slug}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        navigator.clipboard.writeText(`https://agentmastery.ai/blog/${params.slug}`)
                      }}
                    >
                      <Link2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </aside>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {relatedPosts.map(relatedPost => (
                  <Card key={relatedPost.slug} className="group hover:shadow-md transition-shadow">
                    <CardHeader>
                      <Badge variant="outline" className="mb-2 w-fit">{relatedPost.category}</Badge>
                      <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                        {relatedPost.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="line-clamp-2 mb-4">
                        {relatedPost.description}
                      </CardDescription>
                      <Button asChild variant="ghost" size="sm" className="group">
                        <Link href={`/blog/${relatedPost.slug}`} className="flex items-center gap-1">
                          Read More
                          <ChevronRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  )
}