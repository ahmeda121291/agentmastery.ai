#!/usr/bin/env tsx

import { spawn } from 'child_process';
import { JSDOM } from 'jsdom';
import { origin } from '../src/lib/seo/canonical';
import { COMPARES } from '../app/compare/_data/compare-registry';

interface CanonicalCheckResult {
  url: string;
  expectedCanonical: string;
  actualCanonical: string | null;
  canonicalCount: number;
  status: 'OK' | 'FAIL';
  error?: string;
}

const results: CanonicalCheckResult[] = [];
let errorCount = 0;

// Get expected canonical URL for a route
function getExpectedCanonical(path: string): string {
  const base = origin();
  const normalized = path === '/' ? '/' : path.replace(/\/+$/, '');
  return `${base}${normalized}`;
}

// Start local Next.js server
async function startServer(): Promise<() => void> {
  return new Promise((resolve, reject) => {
    console.log('🚀 Starting local Next.js server...');

    const server = spawn('npm', ['run', 'dev'], {
      env: { ...process.env, PORT: '3333' },
      stdio: 'pipe'
    });

    let serverReady = false;

    server.stdout?.on('data', (data) => {
      const output = data.toString();
      if (!serverReady && output.includes('Ready in')) {
        serverReady = true;
        console.log('✅ Server ready\n');
        resolve(() => {
          server.kill();
        });
      }
    });

    server.stderr?.on('data', (data) => {
      const error = data.toString();
      // Ignore non-critical warnings
      if (!error.includes('Warning') && !error.includes('info')) {
        console.error('Server error:', error);
      }
    });

    // Timeout after 30 seconds
    setTimeout(() => {
      if (!serverReady) {
        server.kill();
        reject(new Error('Server failed to start within 30 seconds'));
      }
    }, 30000);
  });
}

// Fetch and check canonical for a URL
async function checkCanonical(path: string) {
  const url = `http://localhost:3333${path}`;
  const expectedCanonical = getExpectedCanonical(path);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      results.push({
        url: path,
        expectedCanonical,
        actualCanonical: null,
        canonicalCount: 0,
        status: 'FAIL',
        error: `HTTP ${response.status}`
      });
      errorCount++;
      return;
    }

    const html = await response.text();
    const dom = new JSDOM(html);
    const canonicalElements = dom.window.document.querySelectorAll('link[rel="canonical"]');

    if (canonicalElements.length === 0) {
      results.push({
        url: path,
        expectedCanonical,
        actualCanonical: null,
        canonicalCount: 0,
        status: 'FAIL',
        error: 'No canonical found'
      });
      errorCount++;
    } else if (canonicalElements.length > 1) {
      const canonicals = Array.from(canonicalElements).map(el => el.getAttribute('href'));
      results.push({
        url: path,
        expectedCanonical,
        actualCanonical: canonicals.join(', '),
        canonicalCount: canonicalElements.length,
        status: 'FAIL',
        error: `Multiple canonicals (${canonicalElements.length})`
      });
      errorCount++;
    } else {
      const actualCanonical = canonicalElements[0].getAttribute('href');
      if (actualCanonical === expectedCanonical) {
        results.push({
          url: path,
          expectedCanonical,
          actualCanonical,
          canonicalCount: 1,
          status: 'OK'
        });
      } else {
        results.push({
          url: path,
          expectedCanonical,
          actualCanonical,
          canonicalCount: 1,
          status: 'FAIL',
          error: 'Canonical mismatch'
        });
        errorCount++;
      }
    }
  } catch (error) {
    results.push({
      url: path,
      expectedCanonical,
      actualCanonical: null,
      canonicalCount: 0,
      status: 'FAIL',
      error: String(error)
    });
    errorCount++;
  }
}

async function main() {
  // Build list of URLs to check
  const urlsToCheck = [
    // Hubs
    '/',
    '/arcade',
    '/blog',
    '/compare',
    '/tools',
    '/leaderboards',
    '/updates',

    // Sample detail pages
    '/arcade/ad-roi',
    '/arcade/seo-content-roi',
    '/tools/jasper',
    '/tools/copy-ai',
  ];

  // Add sample compare pages
  const sampleCompares = COMPARES.slice(0, 5);
  sampleCompares.forEach(compare => {
    urlsToCheck.push(`/compare/${compare.canonical}`);
  });

  // Start server
  let stopServer: (() => void) | null = null;
  try {
    stopServer = await startServer();
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }

  // Check each URL
  console.log(`🔍 Checking canonicals for ${urlsToCheck.length} pages...\n`);

  for (const url of urlsToCheck) {
    await checkCanonical(url);
    // Small delay to avoid overwhelming the server
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // Stop server
  if (stopServer) {
    stopServer();
  }

  // Generate report
  const report: string[] = ['# Canonical Check Report\n'];
  report.push(`Generated: ${new Date().toISOString()}\n`);
  report.push(`Total pages checked: ${results.length}`);
  report.push(`Failed checks: ${errorCount}\n`);

  if (errorCount > 0) {
    report.push('## ❌ Failed Checks\n');
    results
      .filter(r => r.status === 'FAIL')
      .forEach(r => {
        report.push(`### ${r.url}`);
        report.push(`- Expected: ${r.expectedCanonical}`);
        report.push(`- Actual: ${r.actualCanonical || 'none'}`);
        report.push(`- Error: ${r.error}`);
        report.push('');
      });
  }

  report.push('## ✅ Passed Checks\n');
  results
    .filter(r => r.status === 'OK')
    .forEach(r => {
      report.push(`- ${r.url} → ${r.actualCanonical}`);
    });

  // Write report
  const fs = await import('fs/promises');
  await fs.mkdir('reports', { recursive: true });
  await fs.writeFile('reports/canonical-check.md', report.join('\n'));
  console.log('\n📄 Report written to reports/canonical-check.md');

  // Exit with error if there are failures
  if (errorCount > 0) {
    console.error(`\n❌ Found ${errorCount} canonical issues!`);
    process.exit(1);
  }

  console.log('\n✅ All canonicals are correct!');
}

main().catch(console.error);