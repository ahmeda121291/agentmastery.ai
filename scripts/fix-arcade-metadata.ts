#!/usr/bin/env tsx

import fs from 'fs/promises';
import path from 'path';

const ARCADE_DIR = path.join(process.cwd(), 'app/arcade');

const arcadePages = [
  'ad-roi',
  'affiliate-earnings',
  'chatbot-savings',
  'cold-call-calculator',
  'price-guess',
  'seo-content-roi',
  'video-production-cost'
];

async function fixArcadeMetadata() {
  for (const page of arcadePages) {
    const metadataPath = path.join(ARCADE_DIR, page, 'metadata.ts');

    try {
      const content = await fs.readFile(metadataPath, 'utf-8');

      // Extract title and description
      const titleMatch = content.match(/(?:const\s+)?title\s*=\s*['"`]([^'"`]+)['"`]/);
      const descMatch = content.match(/(?:const\s+)?description\s*=\s*['"`]([^'"`]+)['"`]/);

      const title = titleMatch?.[1] || `${page.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} | AgentMastery`;
      const description = descMatch?.[1] || `Interactive ${page} calculator and tool`;

      // Generate new metadata file
      const newContent = `import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: '${title}',
  description: '${description}',
  routeInfo: { pathname: '/arcade/${page}' }
});
`;

      await fs.writeFile(metadataPath, newContent);
      console.log(`✅ Fixed: arcade/${page}/metadata.ts`);
    } catch (error) {
      // If file doesn't exist, create it
      try {
        await fs.mkdir(path.join(ARCADE_DIR, page), { recursive: true });

        const title = `${page.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} | AgentMastery`;
        const description = `Interactive ${page.replace(/-/g, ' ')} calculator and tool`;

        const newContent = `import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: '${title}',
  description: '${description}',
  routeInfo: { pathname: '/arcade/${page}' }
});
`;

        await fs.writeFile(metadataPath, newContent);
        console.log(`✅ Created: arcade/${page}/metadata.ts`);
      } catch (createError) {
        console.error(`❌ Error with arcade/${page}/metadata.ts:`, createError);
      }
    }
  }
}

fixArcadeMetadata().catch(console.error);