import React from 'react'
import Link from 'next/link'
import { tools } from '@/data/tools'
import { buildAffiliateUrl } from '@/lib/seo'

export function linkifyInternal(text: string, source: 'tool' | 'blog' | 'answers' | 'answers-cta' | 'quiz' | 'calculator' = 'answers'): React.ReactNode {
  const fragments: React.ReactNode[] = []
  let lastIndex = 0

  // Pattern to match markdown links and plain tool/leaderboard mentions
  const pattern = /\[([^\]]+)\]\(([^)]+)\)|(?:^|\s)(\/tools\/[a-z0-9-]+|leaderboards?|\/leaderboards?)(?:\s|$)/gi
  let match

  while ((match = pattern.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      fragments.push(text.slice(lastIndex, match.index))
    }

    if (match[1] && match[2]) {
      // Markdown link format
      const linkText = match[1]
      const linkUrl = match[2]

      if (linkUrl.startsWith('/tools/')) {
        const toolSlug = linkUrl.replace('/tools/', '')
        const tool = tools.find(t => t.slug === toolSlug)

        if (tool && tool.affiliateUrl) {
          const affiliateUrl = buildAffiliateUrl(tool.affiliateUrl, source, toolSlug)
          fragments.push(
            React.createElement('a', {
              key: `link-${match.index}`,
              href: affiliateUrl,
              target: '_blank',
              rel: 'noopener noreferrer sponsored',
              className: 'text-green hover:text-forest underline font-medium'
            }, linkText)
          )
        } else {
          fragments.push(
            React.createElement(Link, {
              key: `link-${match.index}`,
              href: linkUrl,
              className: 'text-green hover:text-forest underline font-medium'
            }, linkText)
          )
        }
      } else if (linkUrl.startsWith('/')) {
        // Internal link
        fragments.push(
          React.createElement(Link, {
            key: `link-${match.index}`,
            href: linkUrl,
            className: 'text-green hover:text-forest underline font-medium'
          }, linkText)
        )
      } else {
        // External link
        const url = linkUrl.startsWith('http') ? linkUrl : `https://${linkUrl}`
        fragments.push(
          React.createElement('a', {
            key: `link-${match.index}`,
            href: url,
            target: '_blank',
            rel: 'noopener noreferrer',
            className: 'text-green hover:text-forest underline font-medium'
          }, linkText)
        )
      }
    } else if (match[3]) {
      // Plain text mention
      const mention = match[3].trim()

      if (mention.startsWith('/tools/')) {
        const toolSlug = mention.replace('/tools/', '')
        const tool = tools.find(t => t.slug === toolSlug)

        if (tool && tool.affiliateUrl) {
          const affiliateUrl = buildAffiliateUrl(tool.affiliateUrl, source, toolSlug)
          fragments.push(
            match[0].startsWith(' ') ? ' ' : '',
            React.createElement('a', {
              key: `mention-${match.index}`,
              href: affiliateUrl,
              target: '_blank',
              rel: 'noopener noreferrer sponsored',
              className: 'text-green hover:text-forest underline font-medium'
            }, tool.name),
            match[0].endsWith(' ') ? ' ' : ''
          )
        } else {
          fragments.push(match[0])
        }
      } else if (mention.match(/^\/?\bleaderboards?\b/i)) {
        fragments.push(
          match[0].startsWith(' ') ? ' ' : '',
          React.createElement(Link, {
            key: `leaderboard-${match.index}`,
            href: '/leaderboards',
            className: 'text-green hover:text-forest underline font-medium'
          }, 'leaderboards'),
          match[0].endsWith(' ') ? ' ' : ''
        )
      } else {
        fragments.push(match[0])
      }
    }

    lastIndex = pattern.lastIndex
  }

  // Add remaining text
  if (lastIndex < text.length) {
    fragments.push(text.slice(lastIndex))
  }

  return React.createElement(React.Fragment, null, ...fragments)
}

export function sanitizeAnswer(text: string): string {
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
    // Remove markdown formatting
    .replace(/\*\*/g, '')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/~~([^~]+)~~/g, '$1')
    // Fix duplicated words (like "leaderboardsleaderboards")
    .replace(/\b(\w+)\1\b/g, '$1')
    .trim()
}

export function renderAnswer(text: string, source: 'tool' | 'blog' | 'answers' | 'answers-cta' | 'quiz' | 'calculator' = 'answers'): React.ReactNode {
  const sanitized = sanitizeAnswer(text)
  return React.createElement('div', { className: 'space-y-2' },
    React.createElement('p', null, linkifyInternal(sanitized, source))
  )
}