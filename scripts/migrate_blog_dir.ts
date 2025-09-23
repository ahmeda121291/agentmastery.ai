#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'

const OLD_DIR = path.join(process.cwd(), 'src/content/blog')
const NEW_DIR = path.join(process.cwd(), 'content/blog')

async function migrate() {
  console.log('🔄 Blog Directory Migration')
  console.log('From:', OLD_DIR)
  console.log('To:', NEW_DIR)

  // Check if old directory exists
  if (!fs.existsSync(OLD_DIR)) {
    console.log('✅ No migration needed - old directory does not exist')
    return
  }

  // Get all files from old directory
  const files = fs.readdirSync(OLD_DIR)
  if (files.length === 0) {
    console.log('✅ No migration needed - old directory is empty')
    return
  }

  console.log(`Found ${files.length} files to migrate`)

  // Create new directory if it doesn't exist
  if (!fs.existsSync(NEW_DIR)) {
    fs.mkdirSync(NEW_DIR, { recursive: true })
    console.log('📁 Created new directory:', NEW_DIR)
  }

  // Move each file
  let movedCount = 0
  for (const file of files) {
    const oldPath = path.join(OLD_DIR, file)
    const newPath = path.join(NEW_DIR, file)

    // Skip if file already exists in new location
    if (fs.existsSync(newPath)) {
      console.log(`⏭️  Skipping ${file} - already exists in new location`)
      continue
    }

    // Copy file to new location
    try {
      fs.copyFileSync(oldPath, newPath)
      console.log(`✅ Migrated: ${file}`)
      movedCount++
    } catch (error) {
      console.error(`❌ Failed to migrate ${file}:`, error)
    }
  }

  console.log(`\n📊 Migration complete: ${movedCount} files moved`)

  // Optional: Remove old directory after successful migration
  if (movedCount > 0) {
    console.log('\n⚠️  Old directory still exists at:', OLD_DIR)
    console.log('   Run "rm -rf src/content/blog" to remove it after verifying migration')
  }
}

// Run migration
if (require.main === module) {
  migrate().catch(error => {
    console.error('Migration failed:', error)
    process.exit(1)
  })
}