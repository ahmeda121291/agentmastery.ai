import { NextResponse } from 'next/server'
import { origin } from '@/lib/seo/canonical'
import { COMPARES } from '../compare/_data/compare-registry'
import fs from 'node:fs'
import path from 'node:path'

export const runtime = 'nodejs'

function urls() {
  const SITE_URL = origin()
  // Only include canonical URLs from registry
  return COMPARES.map(compare => `${SITE_URL}/compare/${compare.canonical}`)
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