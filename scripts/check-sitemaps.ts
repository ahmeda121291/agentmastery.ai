#!/usr/bin/env tsx

import { origin } from '../src/lib/seo/canonical';

interface SitemapCheckResult {
  sitemap: string;
  url: string;
  status: 'OK' | 'REDIRECT' | 'ERROR' | 'CANONICAL_MISMATCH';
  httpStatus?: number;
  canonicalUrl?: string;
  error?: string;
}

const results: SitemapCheckResult[] = [];
let errorCount = 0;

// Parse sitemap XML
function parseSitemap(xml: string): string[] {
  const urls: string[] = [];
  const locRegex = /<loc>(.*?)<\/loc>/g;
  let match;

  while ((match = locRegex.exec(xml)) !== null) {
    urls.push(match[1]);
  }

  return urls;
}

// Check a single URL
async function checkUrl(sitemapName: string, url: string) {
  try {
    // HEAD request to check status
    const headResponse = await fetch(url, { method: 'HEAD' });

    if (headResponse.status >= 300 && headResponse.status < 400) {
      results.push({
        sitemap: sitemapName,
        url,
        status: 'REDIRECT',
        httpStatus: headResponse.status,
        error: `Redirects (${headResponse.status})`
      });
      errorCount++;
      return;
    }

    if (headResponse.status !== 200) {
      results.push({
        sitemap: sitemapName,
        url,
        status: 'ERROR',
        httpStatus: headResponse.status,
        error: `HTTP ${headResponse.status}`
      });
      errorCount++;
      return;
    }

    // GET request to check canonical
    const getResponse = await fetch(url);
    const html = await getResponse.text();

    // Extract canonical from HTML
    const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i);
    const canonicalUrl = canonicalMatch ? canonicalMatch[1] : null;

    if (!canonicalUrl) {
      results.push({
        sitemap: sitemapName,
        url,
        status: 'ERROR',
        error: 'No canonical found'
      });
      errorCount++;
    } else if (canonicalUrl !== url) {
      results.push({
        sitemap: sitemapName,
        url,
        status: 'CANONICAL_MISMATCH',
        canonicalUrl,
        error: `Canonical mismatch`
      });
      errorCount++;
    } else {
      results.push({
        sitemap: sitemapName,
        url,
        status: 'OK',
        canonicalUrl
      });
    }
  } catch (error) {
    results.push({
      sitemap: sitemapName,
      url,
      status: 'ERROR',
      error: String(error)
    });
    errorCount++;
  }
}

// Check a sitemap
async function checkSitemap(sitemapPath: string) {
  const siteUrl = origin();
  const sitemapUrl = `${siteUrl}${sitemapPath}`;
  const sitemapName = sitemapPath.replace('/', '');

  console.log(`\n📍 Checking ${sitemapName}...`);

  try {
    const response = await fetch(sitemapUrl);

    if (!response.ok) {
      console.error(`❌ Failed to fetch ${sitemapName}: HTTP ${response.status}`);
      errorCount++;
      return;
    }

    const xml = await response.text();
    const urls = parseSitemap(xml);

    console.log(`Found ${urls.length} URLs in ${sitemapName}`);

    for (const url of urls) {
      await checkUrl(sitemapName, url);
      // Small delay to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  } catch (error) {
    console.error(`❌ Error checking ${sitemapName}:`, error);
    errorCount++;
  }
}

async function main() {
  console.log('🔍 Checking sitemaps...');
  console.log(`Site URL: ${origin()}\n`);

  // List of sitemaps to check
  const sitemaps = [
    '/sitemap.xml',
    '/arcade.xml',
    '/blog.xml',
    '/comparisons.xml',
    '/tools.xml'
  ];

  // Check each sitemap
  for (const sitemap of sitemaps) {
    await checkSitemap(sitemap);
  }

  // Generate report
  const report: string[] = ['# Sitemap Check Report\n'];
  report.push(`Generated: ${new Date().toISOString()}\n`);
  report.push(`Total URLs checked: ${results.length}`);
  report.push(`Failed checks: ${errorCount}\n`);

  // Group errors by type
  const redirects = results.filter(r => r.status === 'REDIRECT');
  const canonicalMismatches = results.filter(r => r.status === 'CANONICAL_MISMATCH');
  const errors = results.filter(r => r.status === 'ERROR');

  if (redirects.length > 0) {
    report.push('## ❌ Redirect Issues\n');
    report.push('Sitemap URLs should not redirect. These need to be updated to canonical URLs:\n');
    redirects.forEach(r => {
      report.push(`- ${r.sitemap}: ${r.url} (${r.error})`);
    });
    report.push('');
  }

  if (canonicalMismatches.length > 0) {
    report.push('## ❌ Canonical Mismatches\n');
    report.push('Sitemap URLs should match their canonical URLs exactly:\n');
    canonicalMismatches.forEach(r => {
      report.push(`- ${r.sitemap}: ${r.url}`);
      report.push(`  Canonical: ${r.canonicalUrl}`);
    });
    report.push('');
  }

  if (errors.length > 0) {
    report.push('## ❌ Other Errors\n');
    errors.forEach(r => {
      report.push(`- ${r.sitemap}: ${r.url} (${r.error})`);
    });
    report.push('');
  }

  // Summary by sitemap
  report.push('## Summary by Sitemap\n');
  const sitemapNames = Array.from(new Set(results.map(r => r.sitemap)));
  sitemapNames.forEach(name => {
    const sitemapResults = results.filter(r => r.sitemap === name);
    const okCount = sitemapResults.filter(r => r.status === 'OK').length;
    const totalCount = sitemapResults.length;
    report.push(`- ${name}: ${okCount}/${totalCount} OK`);
  });

  // Write report
  const fs = await import('fs/promises');
  await fs.mkdir('reports', { recursive: true });
  await fs.writeFile('reports/sitemap-check.md', report.join('\n'));
  console.log('\n📄 Report written to reports/sitemap-check.md');

  // Exit with error if there are failures
  if (errorCount > 0) {
    console.error(`\n❌ Found ${errorCount} sitemap issues!`);
    process.exit(1);
  }

  console.log('\n✅ All sitemap URLs are valid!');
}

main().catch(console.error);