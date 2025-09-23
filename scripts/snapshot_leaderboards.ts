#!/usr/bin/env ts-node

import { tools } from '../src/data/tools'
import {
  computeScores,
  saveSnapshot,
  loadLastSnapshot,
  getCurrentWeek,
  computeDeltas
} from '../src/data/scores'
import fs from 'fs'
import path from 'path'

async function main() {
  console.log('🏆 Computing leaderboard scores...')

  // Compute current scores
  const currentScores = computeScores(tools)

  // Load last snapshot if exists
  const lastSnapshot = loadLastSnapshot()

  // If we have a last snapshot, compute deltas
  let scoresWithDeltas = currentScores
  if (lastSnapshot) {
    console.log(`📊 Found last snapshot from week ${lastSnapshot.week}`)
    scoresWithDeltas = computeDeltas(currentScores, lastSnapshot.categories)
  } else {
    console.log('📊 No previous snapshot found, creating initial snapshot')
  }

  // Check if this week's snapshot already exists
  const week = getCurrentWeek()
  const snapshotPath = path.join(process.cwd(), 'public', 'snapshots', `${week}.json`)

  if (fs.existsSync(snapshotPath)) {
    console.log(`✅ Snapshot for week ${week} already exists, skipping`)
    process.exit(0)
  }

  // Save new snapshot
  await saveSnapshot(scoresWithDeltas)
  console.log(`💾 Saved snapshot for week ${week}`)

  // Report on significant changes
  if (lastSnapshot) {
    let significantChanges = 0
    scoresWithDeltas.forEach(category => {
      category.tools.forEach(tool => {
        if (Math.abs(tool.scoreDelta || 0) > 5) {
          significantChanges++
          const direction = tool.scoreDelta! > 0 ? '📈' : '📉'
          console.log(`${direction} ${tool.name}: ${tool.scoreDelta > 0 ? '+' : ''}${tool.scoreDelta} points`)
        }
      })
    })

    if (significantChanges > 0) {
      console.log(`\n🔄 Found ${significantChanges} significant score changes`)
    } else {
      console.log('\n✨ No significant score changes this week')
    }
  }

  console.log('✅ Leaderboard snapshot complete!')
  process.exit(0)
}

main().catch(error => {
  console.error('❌ Error creating snapshot:', error)
  process.exit(1)
})