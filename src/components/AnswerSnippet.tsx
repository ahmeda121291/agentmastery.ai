'use client'

import Script from 'next/script'
import { Check, Info, Lightbulb, BookOpen } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface AnswerSnippetProps {
  title: string
  summary: string
  bullets?: string[]
  schemaType?: 'Article' | 'WebPage' | 'SoftwareApplication' | 'FAQPage' | 'HowTo' | 'Review'
  datePublished?: string
  dateModified?: string
  url?: string
  author?: string
}

export default function AnswerSnippet({
  title,
  summary,
  bullets,
  schemaType = 'WebPage',
  datePublished,
  dateModified,
  url,
  author = 'AgentMastery.ai'
}: AnswerSnippetProps) {
  // Generate JSON-LD schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': schemaType,
    headline: title,
    description: summary,
    url: url || (typeof window !== 'undefined' ? window.location.href : ''),
    author: {
      '@type': 'Organization',
      name: author,
      url: 'https://agentmastery.ai'
    },
    publisher: {
      '@type': 'Organization',
      name: 'AgentMastery.ai',
      logo: {
        '@type': 'ImageObject',
        url: 'https://agentmastery.ai/logo.png'
      }
    },
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    ...(schemaType === 'Article' && {
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': url || (typeof window !== 'undefined' ? window.location.href : '')
      }
    })
  }

  return (
    <>
      {/* JSON-LD Schema */}
      <Script
        id={`answer-snippet-schema-${title.replace(/\s+/g, '-').toLowerCase()}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Visual Answer Snippet */}
      <div className="answer-snippet mb-8 relative">
        {/* Gradient background with subtle pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-green/5 via-forest/3 to-transparent rounded-2xl" />

        <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-green/20 shadow-sm p-6">
          {/* Header with icon */}
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2 bg-green/10 rounded-lg">
              <Lightbulb className="h-5 w-5 text-green" />
            </div>
            <div className="flex-1">
              <Badge className="mb-2 bg-green/10 text-green border-green/20">
                Quick Answer
              </Badge>
              <h2 className="text-xl font-semibold text-gray-900">
                {title}
              </h2>
            </div>
          </div>

          {/* Summary paragraph */}
          <div className="prose prose-gray max-w-none mb-4">
            <p className="text-gray-700 leading-relaxed text-base">
              {summary}
            </p>
          </div>

          {/* Optional bullet points */}
          {bullets && bullets.length > 0 && (
            <div className="space-y-2 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-600">Key Points:</span>
              </div>
              <ul className="space-y-2">
                {bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Meta info footer */}
          {(dateModified || schemaType) && (
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Info className="h-3 w-3" />
                <span>{schemaType}</span>
              </div>
              {dateModified && (
                <div className="text-xs text-gray-500">
                  Updated: {new Date(dateModified).toLocaleDateString()}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}