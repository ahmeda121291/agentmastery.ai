'use client'

import { useState, useMemo } from 'react'
import { formatDate } from '@/lib/seo'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Clock,
  Calendar,
  User,
  Tag,
  ArrowRight,
  Search,
  Filter
} from 'lucide-react'
import Link from 'next/link'

type PostMeta = {
  slug: string
  title: string
  description?: string
  date?: string
  tags?: string[]
  category?: string
  author?: string
  image?: string
}

interface BlogFiltersProps {
  posts: PostMeta[]
  categories: string[]
}

export default function BlogFilters({ posts, categories }: BlogFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Filter posts based on search and category
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = !searchQuery ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.tags || []).some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = !selectedCategory || post.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [posts, searchQuery, selectedCategory])

  // Get tag counts
  const tagCounts = useMemo(() => {
    const counts = new Map<string, number>()
    posts.forEach(post => {
      (post.tags || []).forEach(tag => {
        counts.set(tag, (counts.get(tag) || 0) + 1)
      })
    })
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
  }, [posts])

  return (
    <>
      {/* Search and Filters */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedCategory === null ? "primary" : "outline"}
              onClick={() => setSelectedCategory(null)}
              size="sm"
            >
              All Categories
            </Button>
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "primary" : "outline"}
                onClick={() => setSelectedCategory(category)}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Popular Tags */}
        {tagCounts.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
              <Tag className="h-4 w-4 mr-1" />
              Popular Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {tagCounts.map(([tag, count]) => (
                <button
                  key={tag}
                  onClick={() => setSearchQuery(tag)}
                  className="focus:outline-none"
                >
                  <Badge
                    variant="secondary"
                    className="cursor-pointer hover:bg-gray-200"
                  >
                    {tag} ({count})
                  </Badge>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-6 text-sm text-gray-600">
        Showing {filteredPosts.length} of {posts.length} articles
        {searchQuery && ` for "${searchQuery}"`}
        {selectedCategory && ` in ${selectedCategory}`}
      </div>

      {/* Blog Posts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map(post => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <span className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {post.date ? formatDate(post.date) : 'Recently'}
                  </span>
                  {post.category && (
                    <Badge variant="outline" className="text-xs">
                      {post.category}
                    </Badge>
                  )}
                </div>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="line-clamp-3">
                  {post.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="h-3 w-3 mr-1" />
                    {post.author || 'AgentMastery Team'}
                  </div>
                  <Button variant="ghost" size="sm">
                    Read More
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No articles found matching your criteria.</p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery('')
              setSelectedCategory(null)
            }}
            className="mt-4"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </>
  )
}