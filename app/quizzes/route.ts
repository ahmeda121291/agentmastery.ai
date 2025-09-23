import { NextResponse } from 'next/server'

export function GET() {
  return NextResponse.redirect('https://agentmastery.ai/quiz', 308)
}