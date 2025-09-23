import { NextResponse } from 'next/server'
import { getAllPosts, getCategories } from '@/lib/blog'

export async function GET() {
  try {
    const posts = getAllPosts()
    const categories = getCategories()

    return NextResponse.json({
      posts,
      categories,
    })
  } catch (error) {
    console.error('Error fetching blog data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog data' },
      { status: 500 }
    )
  }
}