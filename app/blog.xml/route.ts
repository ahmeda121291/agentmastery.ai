import { NextResponse } from 'next/server'
import { origin } from '@/lib/seo/canonical'
import fs from 'node:fs'
import path from 'node:path'

export const runtime = 'nodejs'

function urls() {
  const SITE_URL = origin()
  // Try using blog helper first
  try {
    const { getAllPosts } = require('@/lib/blog')
    const posts = getAllPosts()
    return posts.map((p: any) => `${SITE_URL}/blog/${p.slug}`)
  } catch {
    // Fallback to scanning content/blog
    const blogDir = path.join(process.cwd(), 'content', 'blog')
    const out: string[] = []
    if (fs.existsSync(blogDir)) {
      const files = fs.readdirSync(blogDir)
        .filter(f => f.endsWith('.md') || f.endsWith('.mdx'))
        .map(f => f.replace(/\.mdx?$/, ''))
      files.forEach(slug => out.push(`${SITE_URL}/blog/${slug}`))
    }
    return out
  }
}

export async function GET() {
  const list = urls()
  const today = new Date().toISOString()
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${list.map((u: string) => `  <url>
    <loc>${u}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`

  return new NextResponse(xml, {
    headers: { 'content-type': 'application/xml; charset=utf-8' }
  })
}