'use client'

import { useState, useMemo } from 'react'
import { getAllPosts, getCategories } from '@/lib/blog'
import { formatDate } from '@/lib/seo'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/input'
import {
  Clock,
  Calendar,
  User,
  Tag,
  ArrowRight,
  Search,
  Sparkles,
  TrendingUp,
  BookOpen,
  Filter
} from 'lucide-react'
import Link from 'next/link'

// Define Editor's picks for fallback
const EDITORS_PICKS_SLUGS = [
  'ai-tools-2024-guide',
  'automation-workflow-best-practices',
  'chatgpt-business-use-cases'
]

export default function BlogPage() {
  const allPosts = getAllPosts()
  const categories = getCategories()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Filter posts based on search and category
  const filteredPosts = useMemo(() => {
    return allPosts.filter(post => {
      const matchesSearch = !searchQuery ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = !selectedCategory || post.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [allPosts, searchQuery, selectedCategory])

  // Get featured post (most recent)
  const featuredPost = allPosts[0]

  // Get Editor's picks
  const editorsPicks = allPosts.filter(post =>
    EDITORS_PICKS_SLUGS.includes(post.slug)
  ).slice(0, 3)

  // If no Editor's picks found, use top 3 posts
  const displayPicks = editorsPicks.length > 0 ? editorsPicks : allPosts.slice(1, 4)

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <Badge className="mb-4 bg-green/10 text-green border-green/20">
          <BookOpen className="h-3 w-3 mr-1" />
          Expert Insights
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          AI Tools & Automation Blog
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Expert insights, in-depth reviews, and practical guides to help you master AI tools and automation.
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md mx-auto md:mx-0">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Clear Filters */}
          {(searchQuery || selectedCategory) && (
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory(null)
              }}
            >
              Clear Filters
            </Button>
          )}
        </div>

        {/* Categories */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            <Button
              variant={selectedCategory === null ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              All Posts
            </Button>
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* No posts or search results */}
      {filteredPosts.length === 0 ? (
        <div className="py-16">
          <Card className="max-w-2xl mx-auto text-center">
            <CardContent className="py-12">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No articles found</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery
                  ? `No articles matching "${searchQuery}"${selectedCategory ? ` in ${selectedCategory}` : ''}`
                  : 'No blog posts yet. Check back soon!'}
              </p>
              {searchQuery && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory(null)
                  }}
                >
                  Clear search
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Editor's Picks Fallback */}
          {displayPicks.length > 0 && (
            <div className="mt-16">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-bold">Editor's Picks</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {displayPicks.map(post => (
                  <Card key={post.slug} className="group hover:shadow-lg transition-all">
                    <CardHeader>
                      <Badge variant="outline" className="mb-2 w-fit">{post.category}</Badge>
                      <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="line-clamp-2 mb-4">
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
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Featured Post (only show if no filters active) */}
          {!searchQuery && !selectedCategory && featuredPost && (
            <Card className="mb-12 overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="aspect-video md:aspect-auto bg-gradient-to-br from-forest to-green relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Badge className="bg-white/20 text-white border-white/30">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  <Badge variant="secondary" className="mb-3 w-fit">
                    {featuredPost.category}
                  </Badge>
                  <h2 className="text-2xl md:text-3xl font-bold mb-3">
                    <Link href={`/blog/${featuredPost.slug}`} className="hover:text-primary transition-colors">
                      {featuredPost.title}
                    </Link>
                  </h2>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {featuredPost.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{featuredPost.readingTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(featuredPost.date)}</span>
                    </div>
                  </div>
                  <Button asChild variant="primary" className="w-fit" magnetic>
                    <Link href={`/blog/${featuredPost.slug}`} className="flex items-center gap-2">
                      Read Featured Article
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Results Count */}
          <div className="mb-6 text-muted-foreground">
            Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
            {searchQuery && ` matching "${searchQuery}"`}
            {selectedCategory && ` in ${selectedCategory}`}
          </div>

          {/* Blog Posts Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map(post => (
              <Card key={post.slug} className="group hover:shadow-lg transition-all h-full flex flex-col">
                {/* Category Badge on top */}
                <div className="p-4 pb-0">
                  <Badge variant="outline" className="mb-2">
                    {post.category}
                  </Badge>
                </div>

                <CardHeader className="pt-2">
                  <CardTitle className="text-xl line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex-grow flex flex-col">
                  <CardDescription className="line-clamp-3 mb-4 flex-grow">
                    {post.description}
                  </CardDescription>

                  {/* Meta Info */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{post.readingTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(post.date)}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    {post.tags.length > 0 && (
                      <div className="flex items-center gap-1">
                        <Tag className="h-3 w-3 text-muted-foreground" />
                        <div className="flex flex-wrap gap-1">
                          {post.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="text-xs text-muted-foreground">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Read More */}
                    <Button asChild variant="ghost" className="w-full group mt-4">
                      <Link href={`/blog/${post.slug}`} className="flex items-center justify-center gap-2">
                        Read Article
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* Newsletter CTA */}
      <Card className="mt-16 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-forest to-green opacity-10" />
        <CardContent className="relative text-center py-12">
          <Sparkles className="h-10 w-10 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Stay Ahead of the Curve</h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Get weekly insights on the latest AI tools, automation strategies, and productivity hacks delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1"
            />
            <Button variant="primary" magnetic>
              Subscribe
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            No spam. Unsubscribe anytime.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}