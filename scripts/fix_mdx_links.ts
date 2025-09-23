#!/usr/bin/env tsx

import { readdir, readFile, writeFile } from 'fs/promises'
import { join } from 'path'
import { mdxSanitize } from '../src/lib/mdxSanitize'

/**
 * Script to normalize links in existing MDX blog posts
 * - Ensures all http(s) links have explicit https:// prefix
 * - Converts bare affiliate hosts to full https:// URLs
 * - Leaves mailto:, tel: untouched
 */

async function fixMDXLinks() {
  const contentDir = join(process.cwd(), 'content', 'blog')
  const files = await readdir(contentDir)
  const mdxFiles = files.filter(file => file.endsWith('.mdx'))

  console.log(`Found ${mdxFiles.length} MDX files to process\n`)

  let totalChanges = 0
  const changes: Record<string, string[]> = {}

  for (const file of mdxFiles) {
    const filePath = join(contentDir, file)
    const originalContent = await readFile(filePath, 'utf-8')
    const sanitizedContent = mdxSanitize(originalContent)

    if (originalContent !== sanitizedContent) {
      // Track changes for this file
      changes[file] = []

      // Find and log specific changes
      const originalLines = originalContent.split('\n')
      const sanitizedLines = sanitizedContent.split('\n')

      for (let i = 0; i < Math.max(originalLines.length, sanitizedLines.length); i++) {
        if (originalLines[i] !== sanitizedLines[i]) {
          changes[file].push(`Line ${i + 1}: Changed`)
          totalChanges++
        }
      }

      // Write the sanitized content back
      await writeFile(filePath, sanitizedContent, 'utf-8')
      console.log(`✅ Fixed ${file} (${changes[file].length} changes)`)
    } else {
      console.log(`⏭️  Skipped ${file} (no changes needed)`)
    }
  }

  console.log('\n' + '='.repeat(50))
  console.log('Summary:')
  console.log('='.repeat(50))
  console.log(`Total files processed: ${mdxFiles.length}`)
  console.log(`Files modified: ${Object.keys(changes).length}`)
  console.log(`Total changes made: ${totalChanges}`)

  if (Object.keys(changes).length > 0) {
    console.log('\nDetailed changes:')
    for (const [file, fileChanges] of Object.entries(changes)) {
      console.log(`\n${file}:`)
      fileChanges.forEach(change => console.log(`  - ${change}`))
    }
  }

  console.log('\n✨ MDX link fixing complete!')
}

// Run the script
fixMDXLinks().catch(error => {
  console.error('Error fixing MDX links:', error)
  process.exit(1)
})