import { MetadataRoute } from 'next'
import fs from 'node:fs'
import path from 'node:path'

export const BASE_URL = 'https://agentmastery.ai'
export const SITEMAP_SIZE_LIMIT = 5000

// Helper to get file modification time
export function getFileModTime(filePath: string): string {
  try {
    const stats = fs.statSync(filePath)
    return stats.mtime.toISOString()
  } catch {
    return new Date().toISOString()
  }
}

// Helper to get lastmod for a route based on its page.tsx file
export function getRouteLastMod(routePath: string): string {
  const pagePath = path.join(process.cwd(), 'app', routePath, 'page.tsx')
  return getFileModTime(pagePath)
}

// Helper to chunk array into smaller arrays
export function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size))
  }
  return chunks
}

// Helper to create sitemap index
export function createSitemapIndex(sitemapUrls: string[]): string {
  const currentDate = new Date().toISOString()
  const sitemapEntries = sitemapUrls.map(url => `
    <sitemap>
      <loc>${url}</loc>
      <lastmod>${currentDate}</lastmod>
    </sitemap>
  `).join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemapEntries}
</sitemapindex>`
}

// Helper to format sitemap entries
export function formatSitemapXML(entries: MetadataRoute.Sitemap): string {
  const urlEntries = entries.map(entry => {
    const changeFreq = entry.changeFrequency ? `<changefreq>${entry.changeFrequency}</changefreq>` : ''
    const priority = entry.priority !== undefined ? `<priority>${entry.priority}</priority>` : ''
    const lastmod = entry.lastModified ? `<lastmod>${entry.lastModified}</lastmod>` : ''

    return `
    <url>
      <loc>${entry.url}</loc>
      ${lastmod}
      ${changeFreq}
      ${priority}
    </url>`
  }).join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urlEntries}
</urlset>`
}