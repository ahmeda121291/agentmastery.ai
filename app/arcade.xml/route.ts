import { NextResponse } from 'next/server'
import { SITE_URL } from '@/lib/seo'
import fs from 'node:fs'
import path from 'node:path'

export const runtime = 'nodejs'

function urls() {
  const out: string[] = []

  // Add arcade main page
  out.push(`${SITE_URL}/arcade`)

  // Add known arcade pages
  const arcadePages = [
    'cold-call-calculator',
    'chatbot-savings',
    'video-production-cost'
  ]

  arcadePages.forEach(page => {
    out.push(`${SITE_URL}/arcade/${page}`)
  })

  // Add calculators
  const calculatorPages = [
    'roi',
    'switch-savings'
  ]

  calculatorPages.forEach(page => {
    out.push(`${SITE_URL}/calculators/${page}`)
  })

  // Add games
  const gamePages = [
    'bingo',
    'pop-quiz'
  ]

  gamePages.forEach(page => {
    out.push(`${SITE_URL}/games/${page}`)
  })

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
    <priority>0.6</priority>
  </url>`).join('\n')}
</urlset>`

  return new NextResponse(xml, {
    headers: { 'content-type': 'application/xml; charset=utf-8' }
  })
}