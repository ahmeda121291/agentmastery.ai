'use client'

import { useState, useMemo } from 'react'
import { tools } from '@/src/data/tools'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export default function ToolsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(tools.map(tool => tool.category))
    return ['all', ...Array.from(cats).sort()]
  }, [])

  // Filter tools based on search and category
  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      const matchesSearch = searchQuery === '' ||
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.blurb.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">AI Tools Directory</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover the best AI tools for automation, productivity, and growth.
          Curated and tested by experts.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:gap-4">
        {/* Search Box */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="capitalize"
            >
              {category === 'all' ? 'All Tools' : category}
            </Button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6 text-muted-foreground">
        Showing {filteredTools.length} of {tools.length} tools
      </div>

      {/* Tools Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTools.map(tool => (
          <Card key={tool.slug} className="group hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-xl">{tool.name}</CardTitle>
                <Badge variant="secondary" className="text-xs">
                  {tool.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription className="line-clamp-3">
                {tool.blurb}
              </CardDescription>

              {/* Badges */}
              {tool.badges && tool.badges.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {tool.badges.map(badge => (
                    <Badge key={badge} variant="outline" className="text-xs">
                      {badge}
                    </Badge>
                  ))}
                </div>
              )}

              {/* CTAs */}
              <div className="flex gap-2">
                <Button
                  asChild
                  className="flex-1"
                  size="sm"
                >
                  <a
                    href={tool.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    Try {tool.name}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                >
                  <Link href={`/tools/${tool.slug}`}>
                    Learn More
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredTools.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No tools found matching your criteria. Try adjusting your filters.
          </p>
        </div>
      )}
    </div>
  )
}