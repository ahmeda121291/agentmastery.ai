#!/usr/bin/env tsx

import fs from 'fs/promises';
import path from 'path';
import { COMPARES } from '../app/compare/_data/compare-registry';

interface LinkCheckResult {
  file: string;
  line: number;
  href: string;
  status: 'OK' | 'REDIRECT' | 'MISSING';
  target?: string;
}

const results: LinkCheckResult[] = [];
let errorCount = 0;

// Build route manifest
async function buildRouteManifest(): Promise<Set<string>> {
  const routes = new Set<string>();

  // Add static routes
  routes.add('/');
  routes.add('/tools');
  routes.add('/blog');
  routes.add('/arcade');
  routes.add('/compare');
  routes.add('/leaderboards');
  routes.add('/updates');
  routes.add('/about');
  routes.add('/resources');
  routes.add('/quiz');
  routes.add('/quiz/personality');
  routes.add('/answers');

  // Add dynamic routes from data
  try {
    const { tools } = await import('../src/data/tools');
    tools.forEach((tool: any) => {
      routes.add(`/tools/${tool.slug}`);
    });
  } catch {}

  // Add compare routes (canonical only)
  COMPARES.forEach(compare => {
    routes.add(`/compare/${compare.canonical}`);
  });

  // Add arcade routes
  const arcadePages = [
    'ad-roi',
    'affiliate-earnings',
    'chatbot-savings',
    'cold-call-calculator',
    'price-guess',
    'seo-content-roi',
    'video-production-cost'
  ];
  arcadePages.forEach(page => {
    routes.add(`/arcade/${page}`);
  });

  // Add calculator routes
  routes.add('/calculators/roi');
  routes.add('/calculators/switch-savings');

  // Add game routes
  routes.add('/games/bingo');
  routes.add('/games/pop-quiz');

  return routes;
}

// Check if a link is an alias that should redirect
function checkCompareAlias(href: string): { isAlias: boolean; canonical?: string } {
  if (!href.startsWith('/compare/')) return { isAlias: false };

  const slug = href.replace('/compare/', '');

  // Check if it's an alias
  for (const compare of COMPARES) {
    if (compare.aliases.includes(slug)) {
      return { isAlias: true, canonical: `/compare/${compare.canonical}` };
    }
  }

  return { isAlias: false };
}

// Scan files for internal links
async function scanFile(filePath: string, routes: Set<string>) {
  const content = await fs.readFile(filePath, 'utf-8');
  const lines = content.split('\n');

  // Match various href patterns
  const patterns = [
    /href=["']([^"']+)["']/g,
    /to=["']([^"']+)["']/g,
    /<Link\s+href=["']([^"']+)["']/g,
  ];

  lines.forEach((line, lineIndex) => {
    patterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(line)) !== null) {
        const href = match[1];

        // Skip external links, anchors, and special links
        if (
          href.startsWith('http') ||
          href.startsWith('#') ||
          href.startsWith('mailto:') ||
          href.startsWith('tel:') ||
          href === ''
        ) {
          continue;
        }

        // Normalize the href
        const normalizedHref = href.startsWith('/') ? href : `/${href}`;
        const cleanHref = normalizedHref.split('#')[0].split('?')[0];

        // Check if it's a valid route
        if (routes.has(cleanHref)) {
          results.push({
            file: filePath,
            line: lineIndex + 1,
            href: cleanHref,
            status: 'OK'
          });
        } else {
          // Check if it's a compare alias
          const aliasCheck = checkCompareAlias(cleanHref);
          if (aliasCheck.isAlias) {
            results.push({
              file: filePath,
              line: lineIndex + 1,
              href: cleanHref,
              status: 'REDIRECT',
              target: aliasCheck.canonical
            });
          } else {
            results.push({
              file: filePath,
              line: lineIndex + 1,
              href: cleanHref,
              status: 'MISSING'
            });
            errorCount++;
          }
        }
      }
    });
  });
}

// Scan directory recursively
async function scanDirectory(dir: string, routes: Set<string>) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Skip node_modules, .next, etc.
      if (
        entry.name === 'node_modules' ||
        entry.name === '.next' ||
        entry.name === '.git' ||
        entry.name === 'dist'
      ) {
        continue;
      }

      await scanDirectory(fullPath, routes);
    } else if (entry.isFile()) {
      // Check TypeScript/JavaScript/MDX files
      if (
        entry.name.endsWith('.tsx') ||
        entry.name.endsWith('.ts') ||
        entry.name.endsWith('.jsx') ||
        entry.name.endsWith('.js') ||
        entry.name.endsWith('.mdx') ||
        entry.name.endsWith('.md')
      ) {
        await scanFile(fullPath, routes);
      }
    }
  }
}

async function main() {
  console.log('🔍 Building route manifest...');
  const routes = await buildRouteManifest();
  console.log(`✅ Found ${routes.size} valid routes\n`);

  console.log('🔍 Scanning for internal links...');
  await scanDirectory(path.join(process.cwd(), 'app'), routes);
  await scanDirectory(path.join(process.cwd(), 'components'), routes);

  // Generate report
  const report: string[] = ['# Internal Link Check Report\n'];
  report.push(`Generated: ${new Date().toISOString()}\n`);
  report.push(`Total links checked: ${results.length}`);
  report.push(`Missing links: ${errorCount}\n`);

  if (errorCount > 0) {
    report.push('## ❌ Missing Links\n');
    results
      .filter(r => r.status === 'MISSING')
      .forEach(r => {
        report.push(`- ${r.file}:${r.line} -> ${r.href}`);
      });
  }

  const redirects = results.filter(r => r.status === 'REDIRECT');
  if (redirects.length > 0) {
    report.push('\n## ⚠️ Redirects (working but could be updated)\n');
    redirects.forEach(r => {
      report.push(`- ${r.file}:${r.line} -> ${r.href} (redirects to ${r.target})`);
    });
  }

  report.push('\n## ✅ Valid Links Summary\n');
  report.push(`- OK: ${results.filter(r => r.status === 'OK').length}`);
  report.push(`- Redirects: ${redirects.length}`);
  report.push(`- Missing: ${errorCount}`);

  // Write report
  await fs.mkdir('reports', { recursive: true });
  await fs.writeFile('reports/internal-link-check.md', report.join('\n'));
  console.log('\n📄 Report written to reports/internal-link-check.md');

  // Exit with error if there are missing links
  if (errorCount > 0) {
    console.error(`\n❌ Found ${errorCount} broken internal links!`);
    process.exit(1);
  }

  console.log('\n✅ All internal links are valid!');
}

main().catch(console.error);