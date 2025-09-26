#!/usr/bin/env tsx

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

interface PageInfo {
  url: string
  type: 'page' | 'blog' | 'compare' | 'arcade' | 'calculator' | 'tool' | 'other'
  title?: string
  inboundLinks: Set<string>
  outboundLinks: Set<string>
}

// Map to store all pages and their link relationships
const pages = new Map<string, PageInfo>()

// Helper to extract links from content
function extractLinks(content: string): string[] {
  const links: string[] = []

  // Match href patterns
  const hrefPattern = /href=["']([^"']+)["']/g
  let match
  while ((match = hrefPattern.exec(content)) !== null) {
    const link = match[1]
    // Only internal links
    if (link.startsWith('/') && !link.startsWith('//')) {
      links.push(link.split('#')[0].split('?')[0]) // Remove anchors and params
    }
  }

  // Match Link component patterns
  const linkPattern = /<Link[^>]+href=["']([^"']+)["']/g
  while ((match = linkPattern.exec(content)) !== null) {
    const link = match[1]
    if (link.startsWith('/') && !link.startsWith('//')) {
      links.push(link.split('#')[0].split('?')[0])
    }
  }

  return Array.from(new Set(links)) // Unique links only
}

// Scan all source files for pages and links
async function scanSourceFiles() {
  console.log('📂 Scanning source files...\n')

  // 1. Scan app directory pages
  const appDir = path.join(process.cwd(), 'app')
  scanAppDirectory(appDir, '')

  // 2. Scan blog content
  const blogDir = path.join(process.cwd(), 'content', 'blog')
  if (fs.existsSync(blogDir)) {
    const files = fs.readdirSync(blogDir)
    for (const file of files) {
      if (file.endsWith('.md') || file.endsWith('.mdx')) {
        const slug = file.replace(/\.mdx?$/, '')
        const url = `/blog/${slug}`
        const content = fs.readFileSync(path.join(blogDir, file), 'utf-8')
        const { data } = matter(content)

        if (!pages.has(url)) {
          pages.set(url, {
            url,
            type: 'blog',
            title: data.title || slug,
            inboundLinks: new Set(),
            outboundLinks: new Set()
          })
        }

        // Extract outbound links
        const links = extractLinks(content)
        const page = pages.get(url)!
        links.forEach(link => page.outboundLinks.add(link))
      }
    }
  }

  // 3. Scan comparison pages
  const compareDir = path.join(process.cwd(), 'app', 'compare')
  if (fs.existsSync(compareDir)) {
    const dirs = fs.readdirSync(compareDir).filter(d =>
      fs.statSync(path.join(compareDir, d)).isDirectory() &&
      !d.startsWith('[') && !d.startsWith('_')
    )

    for (const dir of dirs) {
      const url = `/compare/${dir}`
      const pagePath = path.join(compareDir, dir, 'page.tsx')

      if (fs.existsSync(pagePath)) {
        const content = fs.readFileSync(pagePath, 'utf-8')

        if (!pages.has(url)) {
          pages.set(url, {
            url,
            type: 'compare',
            title: dir.replace(/-/g, ' '),
            inboundLinks: new Set(),
            outboundLinks: new Set()
          })
        }

        const links = extractLinks(content)
        const page = pages.get(url)!
        links.forEach(link => page.outboundLinks.add(link))
      }
    }
  }

  // 4. Scan arcade/calculator pages
  const arcadePages = [
    '/arcade',
    '/arcade/ad-roi',
    '/arcade/seo-content-roi',
    '/arcade/affiliate-earnings',
    '/arcade/price-guess',
    '/calculators/roi',
    '/calculators/email-warmup',
    '/calculators/cold-email-volume',
    '/games/bingo'
  ]

  for (const url of arcadePages) {
    const filePath = path.join(process.cwd(), 'app', ...url.split('/'), 'page.tsx')
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8')

      if (!pages.has(url)) {
        pages.set(url, {
          url,
          type: url.includes('calculat') ? 'calculator' : 'arcade',
          title: url.split('/').pop()?.replace(/-/g, ' '),
          inboundLinks: new Set(),
          outboundLinks: new Set()
        })
      }

      const links = extractLinks(content)
      const page = pages.get(url)!
      links.forEach(link => page.outboundLinks.add(link))
    }
  }

  // 5. Add main pages
  const mainPages = ['/', '/tools', '/leaderboards', '/quiz', '/blog', '/answers', '/updates', '/resources', '/about']
  for (const url of mainPages) {
    if (!pages.has(url)) {
      pages.set(url, {
        url,
        type: 'page',
        title: url === '/' ? 'Home' : url.slice(1),
        inboundLinks: new Set(),
        outboundLinks: new Set()
      })
    }
  }
}

// Scan app directory recursively
function scanAppDirectory(dir: string, urlPath: string) {
  const items = fs.readdirSync(dir)

  for (const item of items) {
    const itemPath = path.join(dir, item)
    const stat = fs.statSync(itemPath)

    if (stat.isDirectory()) {
      // Skip special directories
      if (item.startsWith('_') || item.startsWith('.') || item === 'api') continue

      const newUrlPath = urlPath + '/' + item

      // Check for page.tsx
      const pagePath = path.join(itemPath, 'page.tsx')
      if (fs.existsSync(pagePath)) {
        const content = fs.readFileSync(pagePath, 'utf-8')
        const url = newUrlPath || '/'

        if (!pages.has(url)) {
          pages.set(url, {
            url,
            type: 'page',
            title: item,
            inboundLinks: new Set(),
            outboundLinks: new Set()
          })
        }

        const links = extractLinks(content)
        const page = pages.get(url)!
        links.forEach(link => page.outboundLinks.add(link))
      }

      // Recurse into subdirectories
      if (!item.startsWith('[')) {
        scanAppDirectory(itemPath, newUrlPath)
      }
    }
  }
}

// Build inbound links from outbound links
function buildInboundLinks() {
  for (const [url, page] of pages.entries()) {
    for (const outboundLink of page.outboundLinks) {
      const targetPage = pages.get(outboundLink)
      if (targetPage) {
        targetPage.inboundLinks.add(url)
      }
    }
  }
}

// Find orphan pages
function findOrphans() {
  const orphans: PageInfo[] = []
  const lowLink: PageInfo[] = []

  for (const page of pages.values()) {
    // Skip home page and special pages
    if (page.url === '/' || page.url.startsWith('/api')) continue

    const inboundCount = page.inboundLinks.size

    if (inboundCount === 0) {
      orphans.push(page)
    } else if (inboundCount < 3) {
      lowLink.push(page)
    }
  }

  return { orphans, lowLink }
}

// Analyze hub pages
function analyzeHubPages() {
  const hubPages = [
    { url: '/tools', expectedChildren: 50 },
    { url: '/blog', expectedChildren: 10 },
    { url: '/arcade', expectedChildren: 4 },
    { url: '/compare', expectedChildren: 20 },
    { url: '/updates', expectedChildren: 10 }
  ]

  const issues: string[] = []

  for (const hub of hubPages) {
    const page = pages.get(hub.url)
    if (!page) continue

    const childLinks = Array.from(page.outboundLinks).filter(link =>
      link.startsWith(hub.url + '/')
    )

    if (childLinks.length < hub.expectedChildren) {
      issues.push(`${hub.url} only links to ${childLinks.length}/${hub.expectedChildren} expected children`)
    }
  }

  return issues
}

// Main execution
async function main() {
  console.log('🔍 Finding Orphan Pages\n')
  console.log('=' .repeat(60) + '\n')

  // Scan all files
  await scanSourceFiles()

  // Build link relationships
  buildInboundLinks()

  // Find orphans
  const { orphans, lowLink } = findOrphans()

  // Report findings
  console.log(`📊 Summary:`)
  console.log(`   Total pages scanned: ${pages.size}`)
  console.log(`   Orphan pages (0 inbound): ${orphans.length}`)
  console.log(`   Low-link pages (<3 inbound): ${lowLink.length}\n`)

  if (orphans.length > 0) {
    console.log('❌ Orphan Pages (No Inbound Links):\n')
    for (const page of orphans) {
      console.log(`   • ${page.url}`)
      if (page.title) console.log(`     Title: ${page.title}`)
      console.log(`     Type: ${page.type}`)
      console.log(`     Outbound links: ${page.outboundLinks.size}`)
      console.log()
    }
  }

  if (lowLink.length > 0) {
    console.log('⚠️  Low-Link Pages (Less than 3 Inbound):\n')
    for (const page of lowLink) {
      console.log(`   • ${page.url}`)
      if (page.title) console.log(`     Title: ${page.title}`)
      console.log(`     Inbound links: ${page.inboundLinks.size}`)
      console.log(`     From: ${Array.from(page.inboundLinks).slice(0, 3).join(', ')}`)
      console.log()
    }
  }

  // Check hub pages
  console.log('🔗 Hub Page Analysis:\n')
  const hubIssues = analyzeHubPages()
  if (hubIssues.length > 0) {
    for (const issue of hubIssues) {
      console.log(`   ⚠️  ${issue}`)
    }
  } else {
    console.log('   ✅ All hub pages link to sufficient children')
  }

  console.log('\n' + '=' .repeat(60))

  // Return exit code based on findings
  if (orphans.length > 0) {
    console.log('\n❌ Found orphan pages - please add internal links to these pages')
    process.exit(1)
  } else if (lowLink.length > 5) {
    console.log('\n⚠️  Many pages have insufficient internal links')
    process.exit(1)
  } else {
    console.log('\n✅ Internal linking looks good!')
    process.exit(0)
  }
}

// Run the script
main().catch(console.error)