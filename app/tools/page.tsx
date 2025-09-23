'use client'

import { useState, useMemo } from 'react'
import { tools } from '@/data/tools'
import { buildAffiliateUrl } from '@/lib/seo'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, ExternalLink, TrendingUp, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { MobileStickyQuizCTA } from '@/components/layout/MobileStickyQuizCTA'

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

  // Popular picks for fallback
  const popularPicks = tools.filter(tool =>
    ['synthesia', 'smartlead', 'apollo', 'elevenlabs', 'motion', 'customgpt'].includes(tool.slug)
  )

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <Badge className="mb-4 bg-green/10 text-green border-green/20">
          <Sparkles className="h-3 w-3 mr-1" />
          250+ Tools Reviewed
        </Badge>
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
              variant={selectedCategory === category ? 'primary' : 'ghost'}
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
      {filteredTools.length > 0 && (
        <div className="mb-6 text-muted-foreground">
          Showing {filteredTools.length} of {tools.length} tools
        </div>
      )}

      {/* Tools Grid or No Results Fallback */}
      {filteredTools.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTools.map(tool => {
            const ctaUrl = tool.affiliate
              ? buildAffiliateUrl(tool.affiliateUrl!, 'tool', tool.slug)
              : tool.siteUrl
            const ctaText = tool.affiliate ? `Try ${tool.name}` : 'Visit Website'

            return (
              <Card key={tool.slug}>
                <div className="p-6 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold">{tool.name}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {tool.category}
                    </Badge>
                  </div>

                  <p className="text-muted-foreground line-clamp-3 mb-4 flex-grow">
                    {tool.blurb}
                  </p>

                  {/* Pricing & Promo */}
                  <div className="mb-4">
                    <p className="text-sm font-medium">{tool.pricingNote}</p>
                    {tool.promo && (
                      <p className="text-xs text-green mt-1">{tool.promo}</p>
                    )}
                  </div>

                  {/* Badges */}
                  {tool.badges && tool.badges.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {tool.badges.slice(0, 3).map(badge => (
                        <Badge key={badge} variant="outline" className="text-xs">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* CTAs */}
                  <div className="flex gap-2 mt-auto">
                    <Button
                      asChild
                      variant="primary"
                      size="sm"
                      className="flex-1"
                      magnetic
                    >
                      <a
                        href={ctaUrl}
                        target="_blank"
                        rel={tool.affiliate ? "noopener noreferrer sponsored" : "noopener noreferrer"}
                        className="flex items-center justify-center gap-2"
                      >
                        {ctaText}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                    >
                      <Link href={`/tools/${tool.slug}`}>
                        Details
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      ) : (
        /* No Results - Show Popular Picks */
        <div>
          <div className="text-center py-8 mb-8">
            <p className="text-muted-foreground mb-2">
              No tools found matching "{searchQuery}" in {selectedCategory === 'all' ? 'all categories' : selectedCategory}.
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
              }}
            >
              Clear filters
            </Button>
          </div>

          {/* Popular Picks Fallback */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="h-5 w-5 text-green" />
              <h2 className="text-2xl font-bold">Popular Picks</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {popularPicks.map(tool => {
                const ctaUrl = tool.affiliate
                  ? buildAffiliateUrl(tool.affiliateUrl!, 'tool', tool.slug)
                  : tool.siteUrl
                const ctaText = tool.affiliate ? `Try ${tool.name}` : 'Visit Website'

                return (
                  <Card key={tool.slug} className="border-green/20">
                    <div className="p-6 h-full flex flex-col">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold">{tool.name}</h3>
                        <Badge className="text-xs bg-green/10 text-green border-green/20">
                          Popular
                        </Badge>
                      </div>

                      <p className="text-muted-foreground line-clamp-3 mb-4 flex-grow">
                        {tool.blurb}
                      </p>

                      {/* Editor Note if exists */}
                      {tool.editorNote && (
                        <p className="text-sm italic text-muted-foreground mb-4 line-clamp-2">
                          "{tool.editorNote}"
                        </p>
                      )}

                      {/* Pricing */}
                      <div className="mb-4">
                        <p className="text-sm font-medium">{tool.pricingNote}</p>
                        {tool.promo && (
                          <p className="text-xs text-green mt-1">{tool.promo}</p>
                        )}
                      </div>

                      {/* CTAs */}
                      <div className="flex gap-2 mt-auto">
                        <Button
                          asChild
                          variant="primary"
                          size="sm"
                          className="flex-1"
                          magnetic
                        >
                          <a
                            href={ctaUrl}
                            target="_blank"
                            rel={tool.affiliate ? "noopener noreferrer sponsored" : "noopener noreferrer"}
                            className="flex items-center justify-center gap-2"
                          >
                            {ctaText}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </Button>
                        <Button
                          asChild
                          variant="ghost"
                          size="sm"
                        >
                          <Link href={`/tools/${tool.slug}`}>
                            Learn More
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="mt-16 text-center">
        <div className="inline-block p-6 bg-gradient-to-r from-forest/5 to-green/5 rounded-2xl border border-green/20">
          <h2 className="text-2xl font-bold mb-3">Can't find the right tool?</h2>
          <p className="text-muted-foreground mb-4">
            Take our AI tool matcher quiz and get personalized recommendations
          </p>
          <Button variant="primary" size="lg" magnetic asChild>
            <Link href="/quiz" className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Take the Tool Matcher Quiz
            </Link>
          </Button>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <MobileStickyQuizCTA showOn={['tools']} />
    </div>
  )
}