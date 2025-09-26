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
  'https://agentmastery.ai/sitemap.xml',
  'https://agentmastery.ai/arcade.xml',
  'https://agentmastery.ai/blog.xml',
  'https://agentmastery.ai/comparisons.xml',
  'https://agentmastery.ai/tools.xml'
]
    host: SITE_URL,
  }
}
