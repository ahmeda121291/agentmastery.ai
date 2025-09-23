'use client'

import { useState, useMemo, useCallback } from 'react'
import { tools } from '@/data/tools'
import { getAllPosts } from '@/lib/blog'
import { buildAffiliateUrl } from '@/lib/affiliate'
import { ChevronDown, Search, X, ExternalLink, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Script from 'next/script'
import { buildFaqJsonLd } from '@/lib/jsonld'

// Import answers data (will be generated)
let answersData: any[] = []
try {
  answersData = require('@/data/answers.json')
} catch {
  answersData = []
}

const CATEGORIES = [
  'Writing', 'Video', 'Data', 'Outbound', 'CRM', 'Landing',
  'Audio', 'Calendar/PM', 'Monitoring', 'Telephony', 'Social', 'Chatbots', 'General'
]

interface FAQItem {
  id: string
  q: string
  a: string
  category: string
  source?: 'tool' | 'blog' | 'generated'
  slug?: string
}

// Sanitize legacy answer text
function sanitizeLegacyAnswer(text: string): string {
  return text
    // Remove empty brackets and artifacts
    .replace(/\[\]/g, '')
    .replace(/\(\)/g, '')
    // Fix unmatched parentheses/brackets
    .replace(/\([^)]*$/g, '')
    .replace(/^[^(]*\)/g, '')
    .replace(/\[[^\]]*$/g, '')
    .replace(/^[^\[]*\]/g, '')
    // Clean double spaces and normalize
    .replace(/\s+/g, ' ')
    .replace(/\*\*/g, '')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/~~([^~]+)~~/g, '$1')
    .trim()
}

// Convert internal markdown links to Link components with UTM tracking
function renderAnswerWithLinks(text: string): React.ReactNode {
  const parts = text.split(/(\[([^\]]+)\]\(([^)]+)\))/g)

  return parts.map((part, index) => {
    // Check if this part is a markdown link
    const linkMatch = part.match(/\[([^\]]+)\]\(([^)]+)\)/)

    if (linkMatch) {
      const [, linkText, linkUrl] = linkMatch

      // Check if it's an internal tool link
      if (linkUrl.startsWith('/tools/')) {
        const toolSlug = linkUrl.replace('/tools/', '')
        const tool = tools.find(t => t.slug === toolSlug)

        if (tool) {
          // Use appropriate URL and CTA based on affiliate status
          const ctaUrl = tool.affiliate
            ? buildAffiliateUrl(tool.affiliateUrl!, 'answers', toolSlug)
            : tool.siteUrl
          const ctaText = tool.affiliate ? `Try ${tool.name}` : 'Visit Website'
          return (
            <a
              key={index}
              href={ctaUrl}
              target="_blank"
              rel={tool.affiliate ? "noopener noreferrer sponsored" : "noopener noreferrer"}
              className="text-green hover:text-forest underline font-medium"
            >
              {linkText}
            </a>
          )
        }
      }

      // For other internal links, use Next.js Link
      if (linkUrl.startsWith('/')) {
        return (
          <Link
            key={index}
            href={linkUrl}
            className="text-green hover:text-forest underline font-medium"
          >
            {linkText}
          </Link>
        )
      }

      // External links
      return (
        <a
          key={index}
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green hover:text-forest underline font-medium"
        >
          {linkText}
        </a>
      )
    }

    return part
  })
}

// Canonicalize for deduplication
function canonicalize(text: string): string {
  const stopwords = ['a', 'an', 'the', 'to', 'for', 'of', 'and', 'or', 'with', 'in', 'on', 'is', 'are', 'be']
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => !stopwords.includes(word) || ['how', 'what', 'why', 'which', 'when', 'where', 'who'].includes(word))
    .join(' ')
    .trim()
}

// Server-side data aggregation
function aggregateFAQs(): FAQItem[] {
  const items: FAQItem[] = []
  const seen = new Set<string>()

  // 1. Tool FAQs (top 2 micro-FAQs from each tool)
  tools.forEach(tool => {
    if (tool.faq) {
      tool.faq.slice(0, 2).forEach((faq, idx) => {
        const canonical = canonicalize(faq.question)
        if (!seen.has(canonical)) {
          seen.add(canonical)
          items.push({
            id: `tool-${tool.slug}-${idx}`,
            q: faq.question,
            a: faq.answer,
            category: tool.category || 'General',
            source: 'tool',
            slug: tool.slug
          })
        }
      })
    }
  })

  // 2. Blog FAQs (1 from each of 10 most recent posts)
  const posts = getAllPosts().slice(0, 10)
  posts.forEach(post => {
    if (post.faq && post.faq.length > 0) {
      const faq = post.faq[0]
      const canonical = canonicalize(faq.question)
      if (!seen.has(canonical)) {
        seen.add(canonical)
        items.push({
          id: `blog-${post.slug}-0`,
          q: faq.question,
          a: faq.answer,
          category: post.category || 'General',
          source: 'blog',
          slug: post.slug
        })
      }
    }
  })

  // 3. Generated answers (most recent 100) - sanitize legacy items
  answersData.slice(0, 100).forEach(answer => {
    const canonical = canonicalize(answer.q)
    if (!seen.has(canonical)) {
      seen.add(canonical)
      items.push({
        id: answer.id,
        q: sanitizeLegacyAnswer(answer.q),
        a: sanitizeLegacyAnswer(answer.a),
        category: answer.category || 'General',
        source: 'generated'
      })
    }
  })

  return items
}

export default function AnswersPage() {
  const allFAQs = useMemo(() => aggregateFAQs(), [])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const [displayCount, setDisplayCount] = useState(20)

  // Debounced search
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const debounceTimer = useCallback((value: string) => {
    const timer = setTimeout(() => setDebouncedQuery(value), 300)
    return () => clearTimeout(timer)
  }, [])

  // Filter FAQs
  const filteredFAQs = useMemo(() => {
    let filtered = allFAQs

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(faq => faq.category === selectedCategory)
    }

    // Search filter
    if (debouncedQuery) {
      const query = debouncedQuery.toLowerCase()
      filtered = filtered.filter(faq =>
        faq.q.toLowerCase().includes(query) ||
        faq.a.toLowerCase().includes(query)
      )
    }

    return filtered
  }, [allFAQs, selectedCategory, debouncedQuery])

  // Paginated display
  const displayedFAQs = filteredFAQs.slice(0, displayCount)

  // JSON-LD
  const jsonLdScript = useMemo(() => {
    const faqItems = displayedFAQs.slice(0, 50).map(faq => ({
      q: faq.q,
      a: faq.a
    }))
    return buildFaqJsonLd(faqItems)
  }, [displayedFAQs])

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedItems(newExpanded)
  }

  const highlightText = (text: string, query: string) => {
    if (!query) return text
    const parts = text.split(new RegExp(`(${query})`, 'gi'))
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={i} className="bg-yellow-200 dark:bg-yellow-900 px-0.5">
          {part}
        </mark>
      ) : (
        part
      )
    )
  }

  return (
    <>
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript }}
      />

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-green/10 text-green border-green/20">
            <Sparkles className="h-3 w-3 mr-1" />
            Answer Engine Optimized
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            AI Tools Answers Hub
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Quick answers to your questions about AI tools, automation, and productivity
          </p>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search questions and answers..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                debounceTimer(e.target.value)
              }}
              className="w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green/50 focus:border-green"
              aria-label="Search FAQs"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('')
                  setDebouncedQuery('')
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              All Categories
            </Button>
            {CATEGORIES.map(cat => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Results Count */}
          <p className="text-sm text-muted-foreground">
            Showing {displayedFAQs.length} of {filteredFAQs.length} answers
            {debouncedQuery && ` matching "${debouncedQuery}"`}
            {selectedCategory && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* FAQ Accordion */}
        {displayedFAQs.length > 0 ? (
          <div className="space-y-3">
            {displayedFAQs.map(faq => (
              <div
                key={faq.id}
                className="border border-forest/20 rounded-lg bg-white dark:bg-gray-900 overflow-hidden"
              >
                <button
                  onClick={() => toggleExpanded(faq.id)}
                  className="w-full px-6 py-4 flex items-start justify-between text-left hover:bg-muted/50 transition-colors focus:outline-none focus:ring-2 focus:ring-green/50"
                  aria-expanded={expandedItems.has(faq.id)}
                  aria-controls={`answer-${faq.id}`}
                >
                  <div className="flex-1 pr-4">
                    <h3 className="font-semibold text-lg">
                      {highlightText(faq.q, debouncedQuery)}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary" className="text-xs">
                        {faq.category}
                      </Badge>
                      {faq.source === 'tool' && (
                        <Badge variant="outline" className="text-xs">
                          from {faq.slug}
                        </Badge>
                      )}
                      {faq.source === 'blog' && (
                        <Badge variant="outline" className="text-xs">
                          from blog
                        </Badge>
                      )}
                    </div>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-muted-foreground transition-transform ${
                      expandedItems.has(faq.id) ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {expandedItems.has(faq.id) && (
                  <div
                    id={`answer-${faq.id}`}
                    className="px-6 pb-4 border-t border-forest/10"
                  >
                    <div className="prose prose-sm max-w-none pt-4">
                      <p>
                        {debouncedQuery
                          ? highlightText(faq.a, debouncedQuery)
                          : renderAnswerWithLinks(faq.a)
                        }
                      </p>
                    </div>
                    {faq.source === 'tool' && faq.slug && (
                      <Link
                        href={`/tools/${faq.slug}`}
                        className="inline-flex items-center gap-1 mt-3 text-sm text-primary hover:underline"
                      >
                        Learn more about this tool
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    )}
                    {faq.source === 'blog' && faq.slug && (
                      <Link
                        href={`/blog/${faq.slug}`}
                        className="inline-flex items-center gap-1 mt-3 text-sm text-primary hover:underline"
                      >
                        Read full article
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Load More */}
            {filteredFAQs.length > displayedFAQs.length && (
              <div className="text-center pt-6">
                <Button
                  variant="outline"
                  onClick={() => setDisplayCount(prev => prev + 20)}
                >
                  Load More ({filteredFAQs.length - displayedFAQs.length} remaining)
                </Button>
              </div>
            )}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <h3 className="text-xl font-semibold mb-3">No answers found</h3>
              <p className="text-muted-foreground mb-6">
                {debouncedQuery
                  ? `No results for "${debouncedQuery}". Try different keywords.`
                  : 'Explore our tools and resources to find what you need.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild variant="primary">
                  <Link href="/tools">Explore Tools</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/leaderboards">View Leaderboards</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/quiz">Take the Quiz</Link>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Meta Description */}
        <div className="mt-12 p-6 bg-muted/50 rounded-lg text-center">
          <p className="text-sm text-muted-foreground">
            This answers hub aggregates FAQs from our tool reviews, blog posts, and AI-generated content.
            Updated nightly with new questions and answers optimized for answer engines.
          </p>
        </div>
      </div>
    </>
  )
}