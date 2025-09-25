import { NextResponse } from 'next/server'
import { SITE_URL } from '@/lib/seo'
import fs from 'node:fs'
import path from 'node:path'

export const runtime = 'nodejs'

function urls() {
  const compareDir = path.join(process.cwd(), 'app', 'compare')
  const out: string[] = []
  if (fs.existsSync(compareDir)) {
    const dirs = fs.readdirSync(compareDir, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => d.name)
    dirs.forEach(dir => out.push(`${SITE_URL}/compare/${dir}`))
  }
  return out
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