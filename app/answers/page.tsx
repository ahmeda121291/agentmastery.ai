'use client'

import { useState, useMemo, useCallback } from 'react'
import { tools } from '@/data/tools'
import { buildAffiliateUrl } from '@/lib/affiliate'
import { renderAnswer, sanitizeAnswer } from '@/lib/linkify'
import { ChevronDown, Search, X, ExternalLink, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Script from 'next/script'
import { buildFaqJsonLd } from '@/lib/jsonld'

// Import answers data from JSON file
import answersRaw from '@/data/answers.json'

const CATEGORIES = [
  'Writing', 'Video', 'Data', 'Outbound', 'CRM', 'Landing',
  'Audio', 'Calendar/PM', 'Monitoring', 'Telephony', 'Social', 'Chatbots', 'General'
]

interface FAQItem {
  id: string
  q: string
  a: string
  category: string
  createdAt?: string
  source?: 'tool' | 'blog' | 'generated'
  slug?: string
}

// Load all answers and sort by most recent
const ALL_ANSWERS: FAQItem[] = Array.isArray(answersRaw) ? answersRaw as FAQItem[] : []
const SORTED_ANSWERS = ALL_ANSWERS
  .slice()
  .sort((a, b) => {
    const aTime = a.createdAt ? Date.parse(a.createdAt) : 0
    const bTime = b.createdAt ? Date.parse(b.createdAt) : 0
    return bTime - aTime
  })
  .slice(0, 100) // Show up to 100 newest


export default function AnswersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  // Filter answers based on search and category
  const filteredAnswers = useMemo(() => {
    return SORTED_ANSWERS.filter(item => {
      const matchesSearch = !searchQuery ||
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.a.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = !selectedCategory || item.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  // Get category counts
  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>()
    SORTED_ANSWERS.forEach(item => {
      counts.set(item.category, (counts.get(item.category) || 0) + 1)
    })
    return counts
  }, [])

  const toggleExpanded = useCallback((id: string) => {
    setExpandedItems(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }, [])

  // Generate FAQ JSON-LD
  const faqJsonLd = useMemo(() => {
    const topQuestions = filteredAnswers.slice(0, 10).map(item => ({
      q: item.q,
      a: sanitizeAnswer(item.a) // Clean text for JSON-LD
    }))

    return buildFaqJsonLd(topQuestions)
  }, [filteredAnswers])

  return (
    <div className="min-h-screen bg-gradient-to-b from-mist to-paper">
      {/* Add FAQ JSON-LD for SEO */}
      {faqJsonLd && (
        <Script
          id="faq-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-forest to-green text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-white/20 text-white border-white/30 mb-4">
              <Sparkles className="h-3 w-3 mr-1" />
              AI-Powered Q&A Hub
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Quick Takes
            </h1>
            <p className="mt-3 text-white/90 text-base md:text-lg text-center max-w-2xl mx-auto">
              Your AI questions, answered fast. Clear, practical, and bias-free.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search questions and answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green focus:border-green"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === null ? "primary" : "outline"}
                onClick={() => setSelectedCategory(null)}
                size="sm"
              >
                All Categories ({SORTED_ANSWERS.length})
              </Button>
              {CATEGORIES.map(category => {
                const count = categoryCounts.get(category) || 0
                if (count === 0) return null

                return (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "primary" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    size="sm"
                  >
                    {category} ({count})
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Results Count */}
          <div className="text-sm text-gray-600 mb-4">
            Showing {filteredAnswers.length} of {SORTED_ANSWERS.length} answers
            {searchQuery && ` for "${searchQuery}"`}
            {selectedCategory && ` in ${selectedCategory}`}
          </div>

          {/* FAQ Items */}
          <div className="max-w-3xl mx-auto px-6 md:px-8 space-y-4 md:space-y-6">
            {filteredAnswers.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => toggleExpanded(item.id)}
                  className="w-full px-6 py-4 text-left flex items-start justify-between gap-4"
                >
                  <div className="flex-1">
                    <h2 className="text-ink font-semibold text-lg md:text-xl leading-tight">
                      {item.q}
                    </h2>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary" className="inline-flex items-center px-2.5 py-1 rounded-full border border-forest/20 text-xs text-ink/80">
                        {item.category}
                      </Badge>
                      {item.source && (
                        <Badge variant="outline" className="text-xs">
                          {item.source}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-400 transition-transform ${
                      expandedItems.has(item.id) ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {expandedItems.has(item.id) && (
                  <div className="px-6 pb-4 border-t border-gray-100">
                    <div className="prose-am text-ink/90 mt-2 md:mt-3">
                      {renderAnswer(item.a, 'answers')}
                    </div>

                    {/* Related Tool CTA if applicable */}
                    {item.slug && (() => {
                      const tool = tools.find(t => t.slug === item.slug)
                      if (!tool) return null

                      return (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <a
                            href={tool.affiliate
                              ? buildAffiliateUrl(tool.affiliateUrl!, 'answers-cta', tool.slug)
                              : tool.siteUrl
                            }
                            target="_blank"
                            rel={tool.affiliate ? "noopener noreferrer sponsored" : "noopener noreferrer"}
                            className="inline-flex items-center gap-2 text-sm font-medium text-green hover:text-forest"
                          >
                            {tool.affiliate ? `Try ${tool.name}` : 'Visit Website'}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      )
                    })()}
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredAnswers.length === 0 && (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <p className="text-gray-600 mb-4">No answers found matching your criteria.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory(null)
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-12 bg-gradient-to-r from-forest to-green rounded-lg p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">
              Can't find what you're looking for?
            </h2>
            <p className="mb-6 text-green-100">
              Take our personalized quiz to get AI tool recommendations
            </p>
            <Link href="/quiz">
              <Button size="lg" variant="secondary">
                <Sparkles className="h-4 w-4 mr-2" />
                Take the Quiz
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}