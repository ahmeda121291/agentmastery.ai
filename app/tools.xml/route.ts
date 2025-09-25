import { NextResponse } from 'next/server'
import { SITE_URL } from '@/lib/seo'
import fs from 'node:fs'
import path from 'node:path'

export const runtime = 'nodejs'

function urls() {
  // Try to get from tools registry first
  try {
    const { tools } = require('@/data/tools')
    return tools.map((t: any) => `${SITE_URL}/tools/${t.slug}`)
  } catch {
    // Fallback to scanning directories
    const toolsDir = path.join(process.cwd(), 'app', 'tools')
    const out: string[] = []
    if (fs.existsSync(toolsDir)) {
      const slugs = fs.readdirSync(toolsDir, { withFileTypes: true })
        .filter(d => d.isDirectory())
        .map(d => d.name)
      slugs.forEach(slug => out.push(`${SITE_URL}/tools/${slug}`))
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
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n')}
</urlset>`

  return new NextResponse(xml, {
    headers: { 'content-type': 'application/xml; charset=utf-8' }
  })
}