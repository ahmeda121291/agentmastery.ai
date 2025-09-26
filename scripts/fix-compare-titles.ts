#!/usr/bin/env tsx

import { readFileSync, writeFileSync } from 'fs'
import { glob } from 'glob'
import path from 'path'

async function fixCompareTitles() {
  const files = await glob('app/compare/*/metadata.ts')

  for (const file of files) {
    const content = readFileSync(file, 'utf-8')

    // Extract the comparison names from the file path
    const folderName = path.basename(path.dirname(file))
    if (folderName === 'compare') continue // Skip the root compare metadata

    // Parse the vs comparison from folder name
    const [tool1, tool2] = folderName.split('-vs-')
    if (!tool1 || !tool2) continue

    // Capitalize tool names
    const formatName = (name: string) => {
      // Special cases for known tools
      const specialCases: Record<string, string> = {
        'apollo': 'Apollo',
        'zoominfo': 'ZoomInfo',
        'hubspot': 'HubSpot',
        'salesforce': 'Salesforce',
        'jasper': 'Jasper',
        'copy-ai': 'Copy.ai',
        'aiseo': 'AISEO',
        'heygen': 'HeyGen',
        'bombbomb': 'BombBomb',
        'leadiq': 'LeadIQ',
        'clearbit': 'Clearbit',
        'pipedrive': 'Pipedrive',
        'drift': 'Drift',
        'intercom': 'Intercom',
        'instantly': 'Instantly',
        'smartlead': 'Smartlead',
        'loom': 'Loom',
        'vidyard': 'Vidyard',
        'writesonic': 'Writesonic',
        'manychat': 'ManyChat',
        'outreach': 'Outreach',
        'salesloft': 'SalesLoft',
        'ocean': 'Ocean',
        'surfer': 'Surfer',
        'getgenie': 'GetGenie',
        'customgpt': 'CustomGPT',
        'chatsimple': 'ChatSimple',
        'synthesia': 'Synthesia',
        'lusha': 'Lusha',
        'qualified': 'Qualified',
        'zoho': 'Zoho',
        'outranking': 'Outranking',
        'scalenut': 'Scalenut',
        'pictory': 'Pictory'
      }

      return specialCases[name] || name.charAt(0).toUpperCase() + name.slice(1)
    }

    const name1 = formatName(tool1)
    const name2 = formatName(tool2)

    // Create new concise title
    const newTitle = `${name1} vs ${name2}`

    // Replace the title line
    const newContent = content.replace(
      /title:\s*'[^']+'/,
      `title: '${newTitle}'`
    )

    if (newContent !== content) {
      writeFileSync(file, newContent)
      console.log(`Fixed: ${file} -> "${newTitle}"`)
    }
  }
}

fixCompareTitles().catch(console.error)