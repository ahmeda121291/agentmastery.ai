import { NextResponse } from 'next/server'
import { tools } from '@/data/tools'
import {
  computeScores,
  loadLastSnapshot,
  computeDeltas,
  getTopMovers,
  getCurrentWeek,
  type CategoryScores,
  type ToolScore,
} from '@/data/scores'

export async function GET() {
  try {
    // Compute fresh scores
    const freshScores = computeScores(tools)

    // Try to load last snapshot and compute deltas
    const lastSnapshot = loadLastSnapshot()
    let scoresWithDeltas = freshScores
    let movers: ToolScore[] = []

    if (lastSnapshot) {
      scoresWithDeltas = computeDeltas(freshScores, lastSnapshot.categories)
      movers = getTopMovers(scoresWithDeltas, 5)
    }

    const week = getCurrentWeek()

    return NextResponse.json({
      scores: scoresWithDeltas,
      movers,
      week,
    })
  } catch (error) {
    console.error('Error computing leaderboard data:', error)
    return NextResponse.json(
      { error: 'Failed to compute leaderboard data' },
      { status: 500 }
    )
  }
}