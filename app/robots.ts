// app/robots.ts
import type { MetadataRoute } from 'next'
import { origin } from '@/lib/seo/canonical'

export default function robots(): MetadataRoute.Robots {
  const SITE_URL = origin()

  return {
    // Keep it simple: allow everything except server APIs.
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'], // do NOT block /_next or /static; that causes "blocked resources" warnings
      },
      // Explicitly allow AI crawlers you want (tweak to taste)
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
    ],
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
