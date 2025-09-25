import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
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
      {
        userAgent: 'GPTBot',
        allow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
      },
      {
        userAgent: 'CCBot',
        allow: '/',
      },
    ],
    sitemap: [
      `${SITE_URL}/sitemap.xml`,
      `${SITE_URL}/tools.xml`,
      `${SITE_URL}/comparisons.xml`,
      `${SITE_URL}/blog.xml`,
      `${SITE_URL}/arcade.xml`,
    ],
    host: SITE_URL,
  }
}