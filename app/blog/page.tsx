import { getAllPosts, getCategories } from '@/src/lib/blog'
import { formatDate } from '@/src/lib/seo'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, Calendar, User, Tag, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog - AI Tools & Automation Insights',
  description: 'Expert insights on AI tools, automation strategies, and productivity tips. Stay ahead with our in-depth reviews and guides.',
  openGraph: {
    title: 'Blog - AI Tools & Automation Insights',
    description: 'Expert insights on AI tools, automation strategies, and productivity tips.',
    type: 'website',
    url: 'https://agentmastery.ai/blog',
  }
}

export default function BlogPage() {
  const posts = getAllPosts()
  const categories = getCategories()

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          AI Tools & Automation Blog
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Expert insights, in-depth reviews, and practical guides to help you master AI tools and automation.
        </p>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2 justify-center">
          {categories.map(category => (
            <Badge key={category} variant="secondary" className="text-sm">
              {category}
            </Badge>
          ))}
        </div>
      )}

      {/* Blog Posts Grid */}
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No blog posts yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map(post => (
            <Card key={post.slug} className="group hover:shadow-lg transition-all">
              {/* Post Image */}
              {post.image && (
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl font-bold text-primary/20">
                      {post.title.charAt(0)}
                    </span>
                  </div>
                </div>
              )}

              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">{post.category}</Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{post.readingTime}</span>
                  </div>
                </div>
                <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <CardDescription className="line-clamp-3">
                  {post.description}
                </CardDescription>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span>{post.author}</span>
                  </div>
                </div>

                {/* Tags */}
                {post.tags.length > 0 && (
                  <div className="flex items-center gap-1">
                    <Tag className="h-3 w-3 text-muted-foreground" />
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-xs text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Read More */}
                <Button asChild variant="ghost" className="w-full group">
                  <Link href={`/blog/${post.slug}`} className="flex items-center justify-center gap-2">
                    Read More
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Newsletter CTA */}
      <Card className="mt-16 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Get the latest AI tools reviews and automation strategies delivered to your inbox.
          </p>
          <Button size="lg">
            Subscribe to Newsletter
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}