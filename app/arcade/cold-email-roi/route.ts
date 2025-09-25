import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const url = new URL('/calculators/roi', request.url)
  return NextResponse.redirect(url, 308)
}