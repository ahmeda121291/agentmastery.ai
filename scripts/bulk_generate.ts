#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import { spawn } from 'node:child_process'

// Parse command line arguments
const args = process.argv.slice(2)
const postsArg = args.find(arg => arg.startsWith('--posts='))
const answersArg = args.find(arg => arg.startsWith('--answers='))

const postsCount = postsArg ? parseInt(postsArg.split('=')[1]) : 20
const answersCount = answersArg ? parseInt(answersArg.split('=')[1]) : 50

console.log('🚀 Bulk Content Generation')
console.log(`📝 Blog Posts: ${postsCount}`)
console.log(`❓ Q&A Pairs: ${answersCount}`)
console.log('')

async function runCommand(command: string, args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args, {
      stdio: 'inherit',
      shell: true
    })

    proc.on('close', (code) => {
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`Command failed with code ${code}`))
      }
    })
  })
}

async function generateBulkContent() {
  try {
    // Temporarily update config for blog posts
    const keywordsPath = path.join(process.cwd(), 'src/data/keywords.json')
    let originalConfig: any = null

    if (fs.existsSync(keywordsPath)) {
      const data = JSON.parse(fs.readFileSync(keywordsPath, 'utf-8'))
      originalConfig = data.config?.postsPerRun
      data.config = data.config || {}
      data.config.postsPerRun = { min: postsCount, max: postsCount }
      fs.writeFileSync(keywordsPath, JSON.stringify(data, null, 2))
    }

    // Generate blog posts
    console.log(`\n📝 Generating ${postsCount} blog posts...`)
    console.log('=' .repeat(50))
    await runCommand('pnpm', ['run', 'generate:posts'])

    // Restore original config
    if (originalConfig && fs.existsSync(keywordsPath)) {
      const data = JSON.parse(fs.readFileSync(keywordsPath, 'utf-8'))
      data.config = data.config || {}
      data.config.postsPerRun = originalConfig || { min: 5, max: 5 }
      fs.writeFileSync(keywordsPath, JSON.stringify(data, null, 2))
    }

    // Generate answers
    console.log(`\n❓ Generating ${answersCount} Q&A pairs...`)
    console.log('=' .repeat(50))
    await runCommand('pnpm', ['run', 'generate:answers', `--count=${answersCount}`])

    console.log('\n' + '=' .repeat(50))
    console.log('✅ Bulk generation complete!')
    console.log('')
    console.log('Next steps:')
    console.log('1. Review the generated content')
    console.log('2. Run: git status')
    console.log('3. Commit: git add . && git commit -m "feat: bulk content generation"')
    console.log('4. Push: git push')

  } catch (error) {
    console.error('❌ Bulk generation failed:', error)
    process.exit(1)
  }
}

// Run if called directly
if (require.main === module) {
  generateBulkContent().catch(error => {
    console.error('Fatal error:', error)
    process.exit(1)
  })
}