import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPosts, getRelatedPosts, getEndcapVariant } from '@/lib/blog'
import { generateBlogMetadata, formatDate } from '@/lib/seo'
import {
  generateArticleSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  createSchemaScript
} from '@/lib/jsonld'
import { MDXRemote } from 'next-mdx-remote/rsc'
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
import { Callout, ProsCons, GlossaryTerm } from '@/components/mdx'
import dynamic from 'next/dynamic'
import { ShareButtons } from '@/components/ShareButtons'

// Dynamic import for client-side progress rail
const ProgressRail = dynamic(() => import('@/components/blog/ProgressRail'), {
  ssr: false,
  loading: () => null
})

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) return { title: 'Post Not Found' }

  const metadata = generateBlogMetadata(
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

  return {
    ...metadata,
    alternates: {
      canonical: `https://agentmastery.ai/blog/${params.slug}`,
    },
  }
}

const components = {
  Callout,
  ProsCons,
  GlossaryTerm,
  a: ({ href, children, ...props }: any) => {
    // Handle internal tool links with UTM parameters
    if (href?.startsWith('INTERNAL_TOOL:')) {
      const [, slug, source] = href.split(':')

      // Find the tool to get its affiliate URL
      const tools = require('@/data/tools').tools
      const tool = tools.find((t: any) => t.slug === slug)

      if (tool?.affiliateUrl) {
        const affiliateUrl = buildAffiliateUrl(tool.affiliateUrl, source || 'blog', slug)
        return (
          <Link
            href={affiliateUrl}
            className="text-primary hover:underline font-medium"
            {...props}
          >
            {children}
          </Link>
        )
      }

      // Fallback to regular tool page if no affiliate URL
      return (
        <Link
          href={`/tools/${slug}`}
          className="text-primary hover:underline font-medium"
          {...props}
        >
          {children}
        </Link>
      )
    }

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

    // External links
    if (href?.startsWith('http')) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
          {...props}
        >
          {children}
        </a>
      )
    }

    // Internal links
    return (
      <Link
        href={href}
        className="text-primary hover:underline"
        {...props}
      >
        {children}
      </Link>
    )
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(params.slug)
  const endcapVariant = getEndcapVariant(params.slug)

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

      {/* Progress Rail */}
      <ProgressRail />

      <article className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Split Header with Related Posts */}
          <header className="mb-12 overflow-hidden">
            <div className="grid lg:grid-cols-[1fr,380px] gap-8 safe-area-padding">
              {/* Left: Main Article Header */}
              <div>
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
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
                        {post.tags.slice(0, 2).map(tag => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="lg:border-l lg:pl-8 overflow-x-hidden">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                    Continue Reading
                  </h3>
                  <div className="space-y-4">
                    {relatedPosts.map(relatedPost => (
                      <Link
                        key={relatedPost.slug}
                        href={`/blog/${relatedPost.slug}`}
                        className="block group touch-target p-2 -m-2 rounded"
                      >
                        <div className="space-y-1">
                          <Badge variant="outline" className="text-xs mb-1">
                            {relatedPost.category}
                          </Badge>
                          <h4 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                            {relatedPost.title}
                          </h4>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {relatedPost.description}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{relatedPost.readingTime}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Separator className="mt-8" />
          </header>

          <div className="grid lg:grid-cols-[1fr,300px] gap-8">
            {/* Main Content */}
            <div className="prose prose-lg max-w-none">
              <MDXRemote source={processMDXContent(post.content, 'blog')} components={components} />

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

              {/* Rotating Endcap */}
              <div className="mt-16 not-prose">
                <Separator className="mb-8" />

                {endcapVariant === 'topic-cluster' && relatedPosts.length > 0 && (
                  <div className="p-8 bg-gradient-to-br from-muted/50 to-muted/20 rounded-lg">
                    <h3 className="text-2xl font-bold mb-2">Continue Your Journey</h3>
                    <p className="text-muted-foreground mb-6">
                      Deepen your understanding with these related guides
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4 mb-6">
                      {relatedPosts.slice(0, 2).map(post => (
                        <Card key={post.slug} className="hover:shadow-md transition-shadow">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg line-clamp-2">
                              {post.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <CardDescription className="line-clamp-2 mb-3">
                              {post.description}
                            </CardDescription>
                            <Button asChild variant="ghost" size="sm" className="group">
                              <Link href={`/blog/${post.slug}`} className="flex items-center gap-1">
                                Read Article
                                <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                              </Link>
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/blog">
                        View All Articles
                      </Link>
                    </Button>
                  </div>
                )}

                {endcapVariant === 'compare-tools' && (
                  <div className="p-8 bg-gradient-to-br from-primary/5 to-green/5 rounded-lg border border-primary/10">
                    <div className="flex items-start gap-4 mb-6">
                      <BarChart3 className="h-8 w-8 text-primary mt-1" />
                      <div>
                        <h3 className="text-2xl font-bold mb-2">Compare AI Tools Side-by-Side</h3>
                        <p className="text-muted-foreground">
                          See how top tools stack up in our AI-powered rankings
                        </p>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-3 mb-6">
                      <div className="text-center p-4 bg-background rounded-lg">
                        <TrendingUp className="h-8 w-8 text-green mx-auto mb-2" />
                        <div className="font-bold text-2xl mb-1">200+</div>
                        <div className="text-sm text-muted-foreground">Tools Ranked</div>
                      </div>
                      <div className="text-center p-4 bg-background rounded-lg">
                        <Sparkles className="h-8 w-8 text-primary mx-auto mb-2" />
                        <div className="font-bold text-2xl mb-1">4</div>
                        <div className="text-sm text-muted-foreground">Scoring Dimensions</div>
                      </div>
                      <div className="text-center p-4 bg-background rounded-lg">
                        <Clock className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                        <div className="font-bold text-2xl mb-1">Weekly</div>
                        <div className="text-sm text-muted-foreground">Updates</div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button asChild variant="primary" className="flex-1" magnetic>
                        <Link href="/leaderboards">
                          View Leaderboards
                        </Link>
                      </Button>
                      <Button asChild variant="outline" className="flex-1">
                        <Link href="/tools">
                          Browse All Tools
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}

                {endcapVariant === 'quiz-cta' && (
                  <div className="relative overflow-hidden p-8 bg-gradient-to-br from-forest to-green rounded-lg text-white">
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="h-6 w-6" />
                        <Badge className="bg-white/20 text-white border-white/30">
                          Personalized Recommendations
                        </Badge>
                      </div>
                      <h3 className="text-3xl font-bold mb-3">
                        Find Your Perfect AI Tool Match
                      </h3>
                      <p className="text-lg text-white/90 mb-6 max-w-2xl">
                        Take our 6-question quiz and get personalized tool recommendations
                        based on your specific needs and use case.
                      </p>
                      <div className="flex flex-wrap gap-4 mb-6">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                            ✓
                          </div>
                          <span>6 Quick Questions</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                            ✓
                          </div>
                          <span>Personalized Results</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                            ✓
                          </div>
                          <span>No Email Required</span>
                        </div>
                      </div>
                      <Button
                        asChild
                        size="lg"
                        className="bg-white text-forest hover:bg-white/90"
                        magnetic
                      >
                        <Link href="/quiz" className="flex items-center gap-2">
                          <Sparkles className="h-5 w-5" />
                          Take the Tool Matcher Quiz
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Table of Contents */}
              {toc.length > 0 && (
                <Card className="sticky top-20">
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
              <ShareButtons slug={params.slug} title={post.title} />
            </aside>
          </div>
        </div>
      </article>
    </>
  )
}