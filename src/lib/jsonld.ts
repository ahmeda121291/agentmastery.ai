// Consolidated JSON-LD helpers for structured data

export interface FAQItem {
  question: string
  answer: string
}

export interface ProductData {
  name: string
  description: string
  image?: string
  brand?: string
  offers?: {
    price?: string | number
    priceCurrency?: string
    availability?: string
    url?: string
  }
  aggregateRating?: {
    ratingValue: number
    ratingCount?: number
    reviewCount?: number
    bestRating?: number
  }
  review?: {
    author: string
    reviewRating: {
      ratingValue: number
      bestRating?: number
    }
    reviewBody?: string
  }
}

export interface ArticleData {
  headline: string
  description: string
  author: string | { name: string; url?: string }
  datePublished: string
  dateModified?: string
  image?: string | string[]
  keywords?: string[]
  articleBody?: string
  url: string
}

export interface OrganizationData {
  name: string
  url: string
  logo?: string
  description?: string
  sameAs?: string[]
  contactPoint?: {
    telephone?: string
    email?: string
    contactType?: string
  }
}

export interface BreadcrumbItem {
  name: string
  url: string
}

// Generate FAQ Schema
export function generateFAQSchema(faqs: FAQItem[], url?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    ...(url && { mainEntity: url }),
    mainEntity: faqs.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  }
}

// Generate Product Schema (for tools)
export function generateProductSchema(product: ProductData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    ...(product.image && { image: product.image }),
    ...(product.brand && {
      brand: {
        '@type': 'Brand',
        name: product.brand
      }
    }),
    ...(product.offers && {
      offers: {
        '@type': 'Offer',
        ...(product.offers.price && { price: product.offers.price }),
        ...(product.offers.priceCurrency && { priceCurrency: product.offers.priceCurrency }),
        ...(product.offers.availability && { availability: `https://schema.org/${product.offers.availability}` }),
        ...(product.offers.url && { url: product.offers.url })
      }
    }),
    ...(product.aggregateRating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.aggregateRating.ratingValue,
        bestRating: product.aggregateRating.bestRating || 5,
        ...(product.aggregateRating.ratingCount && { ratingCount: product.aggregateRating.ratingCount }),
        ...(product.aggregateRating.reviewCount && { reviewCount: product.aggregateRating.reviewCount })
      }
    }),
    ...(product.review && {
      review: {
        '@type': 'Review',
        author: {
          '@type': typeof product.review.author === 'string' ? 'Person' : 'Organization',
          name: product.review.author
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: product.review.reviewRating.ratingValue,
          bestRating: product.review.reviewRating.bestRating || 5
        },
        ...(product.review.reviewBody && { reviewBody: product.review.reviewBody })
      }
    })
  }
}

// Generate Article Schema (for blog posts)
export function generateArticleSchema(article: ArticleData) {
  const author = typeof article.author === 'string'
    ? { '@type': 'Person', name: article.author }
    : {
        '@type': 'Person',
        name: article.author.name,
        ...(article.author.url && { url: article.author.url })
      }

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.headline,
    description: article.description,
    author,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    ...(article.image && {
      image: Array.isArray(article.image) ? article.image : [article.image]
    }),
    ...(article.keywords && { keywords: article.keywords.join(', ') }),
    ...(article.articleBody && { articleBody: article.articleBody }),
    url: article.url,
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
      '@id': article.url
    }
  }
}

// Generate Organization Schema (for main site)
export function generateOrganizationSchema(org: OrganizationData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: org.name,
    url: org.url,
    ...(org.logo && {
      logo: {
        '@type': 'ImageObject',
        url: org.logo
      }
    }),
    ...(org.description && { description: org.description }),
    ...(org.sameAs && { sameAs: org.sameAs }),
    ...(org.contactPoint && {
      contactPoint: {
        '@type': 'ContactPoint',
        ...(org.contactPoint.telephone && { telephone: org.contactPoint.telephone }),
        ...(org.contactPoint.email && { email: org.contactPoint.email }),
        ...(org.contactPoint.contactType && { contactType: org.contactPoint.contactType })
      }
    })
  }
}

// Generate Breadcrumb Schema
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }
}

// Generate WebSite Schema with search action
export function generateWebSiteSchema(siteName: string, url: string, description?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url,
    ...(description && { description }),
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${url}/search?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  }
}

// Generate SoftwareApplication Schema (for tools)
export function generateSoftwareApplicationSchema(app: {
  name: string
  description: string
  applicationCategory: string
  operatingSystem?: string
  offers?: {
    price: string | number
    priceCurrency: string
  }
  aggregateRating?: {
    ratingValue: number
    ratingCount: number
  }
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: app.name,
    description: app.description,
    applicationCategory: app.applicationCategory,
    ...(app.operatingSystem && { operatingSystem: app.operatingSystem }),
    ...(app.offers && {
      offers: {
        '@type': 'Offer',
        price: app.offers.price,
        priceCurrency: app.offers.priceCurrency
      }
    }),
    ...(app.aggregateRating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: app.aggregateRating.ratingValue,
        ratingCount: app.aggregateRating.ratingCount,
        bestRating: 5
      }
    })
  }
}

// Build FAQ JSON-LD with deduplication and truncation
export function buildFaqJsonLd(
  items: { q: string; a: string }[],
  options: { maxItems?: number } = {}
): string {
  const maxItems = options.maxItems || 50
  const seen = new Set<string>()
  const dedupedItems: { q: string; a: string }[] = []

  // Canonicalize for deduplication
  const canonicalize = (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, ' ')
      .replace(/[^\w\s]/g, '')
  }

  // Truncate answer to ~160 words without cutting mid-sentence
  const truncateAnswer = (text: string, maxWords: number = 160): string => {
    const words = text.split(/\s+/)
    if (words.length <= maxWords) return text.trim()

    // Find the last sentence boundary before maxWords
    const truncated = words.slice(0, maxWords).join(' ')
    const lastPeriod = truncated.lastIndexOf('.')
    const lastQuestion = truncated.lastIndexOf('?')
    const lastExclaim = truncated.lastIndexOf('!')

    const lastBoundary = Math.max(lastPeriod, lastQuestion, lastExclaim)

    if (lastBoundary > truncated.length * 0.5) {
      return truncated.substring(0, lastBoundary + 1).trim()
    }

    // If no good boundary, just truncate and add ellipsis
    return truncated.trim() + '...'
  }

  // Dedupe and process items
  for (const item of items) {
    if (dedupedItems.length >= maxItems) break

    const canonical = canonicalize(item.q)
    if (!seen.has(canonical)) {
      seen.add(canonical)
      dedupedItems.push({
        q: item.q.trim(),
        a: truncateAnswer(item.a)
      })
    }
  }

  // Build FAQ schema
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: dedupedItems.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a
      }
    }))
  }

  return JSON.stringify(schema)
}

// Helper to combine multiple schemas
export function combineSchemas(...schemas: any[]) {
  return schemas.filter(Boolean)
}

// Generate ItemList Schema (for leaderboards and listings)
export function itemListSchema(items: { name: string; url: string; position?: number }[], listName?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    ...(listName && { name: listName }),
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: item.position ?? idx + 1,
      name: item.name,
      url: item.url,
    })),
  }
}

// Simplified breadcrumb schema (backwards compatible)
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return generateBreadcrumbSchema(items)
}

// Simplified FAQ schema (backwards compatible)
export function faqPageSchema(items: { question: string; answer: string }[], url?: string) {
  return generateFAQSchema(items.map(i => ({ question: i.question, answer: i.answer })), url)
}

// Simplified software app schema
export function softwareAppSchema(input: {
  name: string
  description?: string
  url?: string
  applicationCategory?: string
  offers?: { price?: number; priceCurrency?: string; url?: string }
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: input.name,
    applicationCategory: input.applicationCategory || 'BusinessApplication',
    ...(input.description && { description: input.description }),
    ...(input.url && { url: input.url }),
    ...(input.offers?.price && {
      offers: {
        '@type': 'Offer',
        price: String(input.offers.price),
        priceCurrency: input.offers.priceCurrency || 'USD',
        ...(input.offers.url && { url: input.offers.url })
      }
    }),
  }
}

// Helper to inject schema into page
export function createSchemaScript(schema: any | any[], id?: string) {
  const schemaData = Array.isArray(schema) ? schema : [schema]
  const filteredData = schemaData.filter(Boolean)

  return {
    ...(id && { id }),
    type: 'application/ld+json',
    dangerouslySetInnerHTML: {
      __html: JSON.stringify(
        filteredData.length === 1 ? filteredData[0] : filteredData
      )
    },
    // Add text property for compatibility with Script component
    text: JSON.stringify(filteredData.length === 1 ? filteredData[0] : filteredData)
  }
}