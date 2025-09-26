// app/robots.ts
import type { MetadataRoute } from 'next'
import { origin } from '@/lib/seo/canonical'

export default function robots(): MetadataRoute.Robots {
  const SITE_URL = origin()

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/static/',
        ],
      },
      // Allow major AI crawlers you actually want
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
    ],
    // Next supports string or string[]
    sitemap: [
      `${SITE_URL}/sitemap.xml`,
      `${SITE_URL}/arcade.xml`,
      `${SITE_URL}/blog.xml`,
      `${SITE_URL}/comparisons.xml`,
      `${SITE_URL}/tools.xml`,
    ],
    host: SITE_URL,
  }
}
