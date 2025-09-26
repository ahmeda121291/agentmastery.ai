#!/usr/bin/env tsx

import fs from 'fs/promises';
import path from 'path';

const COMPARE_DIR = path.join(process.cwd(), 'app/compare');

async function fixCompareMetadata() {
  const dirs = await fs.readdir(COMPARE_DIR);

  for (const dir of dirs) {
    // Skip non-directories and special directories
    if (dir.startsWith('_') || dir === 'page.tsx' || !dir.includes('-vs-')) {
      continue;
    }

    const metadataPath = path.join(COMPARE_DIR, dir, 'metadata.ts');
    const slug = dir;

    try {
      const content = await fs.readFile(metadataPath, 'utf-8');

      // Extract title and description
      const titleMatch = content.match(/title:\s*['"`]([^'"`]+)['"`]/);
      const descMatch = content.match(/description:\s*['"`]([^'"`]+)['"`]/);

      if (!titleMatch || !descMatch) continue;

      const title = titleMatch[1];
      const description = descMatch[1];

      // Generate new metadata file
      const newContent = `import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: '${title}',
  description: '${description}',
  routeInfo: { pathname: '/compare/${slug}' }
});
`;

      await fs.writeFile(metadataPath, newContent);
      console.log(`✅ Fixed: ${dir}/metadata.ts`);
    } catch (error) {
      console.error(`❌ Error fixing ${dir}/metadata.ts:`, error);
    }
  }
}

fixCompareMetadata().catch(console.error);