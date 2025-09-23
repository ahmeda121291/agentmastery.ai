import { Metadata } from 'next'

interface BlogFrontmatter {
  title: string
  description: string
  date: string
  author?: string
  category?: string
  tags?: string[]
  image?: string
  faq?: Array<{
    question: string
    answer: string
  }>
}

export function generateBlogMetadata(
  frontmatter: BlogFrontmatter,
  slug: string
): Metadata {
  const url = `https://agentmastery.ai/blog/${slug}`

  // Generate dynamic OG image URL
  const ogImageUrl = frontmatter.image || `/api/og?${new URLSearchParams({
    title: frontmatter.title,
    description: frontmatter.description,
    type: 'blog',
    category: frontmatter.category || '',
    author: frontmatter.author || 'AgentMastery Team',
    readingTime: '' // Will be added if we have reading time
  }).toString()}`

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    authors: frontmatter.author ? [{ name: frontmatter.author }] : undefined,
    keywords: frontmatter.tags?.join(', '),
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      type: 'article',
      publishedTime: frontmatter.date,
      authors: frontmatter.author ? [frontmatter.author] : undefined,
      url,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: frontmatter.title
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description: frontmatter.description,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: url
    }
  }
}

export function generateFAQSchema(
  faq: Array<{ question: string; answer: string }>,
  url: string
) {
  if (!faq || faq.length === 0) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  }
}

export function generateArticleSchema(
  frontmatter: BlogFrontmatter,
  slug: string,
  content?: string
) {
  const url = `https://agentmastery.ai/blog/${slug}`

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: frontmatter.title,
    description: frontmatter.description,
    author: {
      '@type': 'Person',
      name: frontmatter.author || 'AgentMastery Team'
    },
    datePublished: frontmatter.date,
    dateModified: frontmatter.date,
    image: frontmatter.image,
    url,
    publisher: {
      '@type': 'Organization',
      name: 'AgentMastery',
      logo: {
        '@type': 'ImageObject',
        url: 'https://agentmastery.ai/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    },
    keywords: frontmatter.tags?.join(', '),
    articleBody: content
  }
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function buildAffiliateUrl(
  url: string,
  source: 'tool' | 'blog' | 'quiz' | 'calculator',
  slug: string
): string {
  // Don't modify if URL already has UTM params
  if (url.includes('utm_')) {
    return url
  }

  const separator = url.includes('?') ? '&' : '?'
  const utmParams = new URLSearchParams({
    utm_source: 'agentmastery',
    utm_medium: source,
    utm_campaign: slug
  })

  return `${url}${separator}${utmParams.toString()}`
}