import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
import { PERSONALITY_RESULTS } from '@/lib/quiz/personality'

export const runtime = 'edge'

export async function GET(
  req: NextRequest,
  { params }: { params: { result: string } }
) {
  const result = params.result
  const personalityData = PERSONALITY_RESULTS[result as keyof typeof PERSONALITY_RESULTS]

  if (!personalityData) {
    return new Response('Not found', { status: 404 })
  }

  // Extract gradient colors from the color string
  const gradientMatch = personalityData.color.match(/from-(\w+)-\d+\s+to-(\w+)-\d+/)
  const fromColor = gradientMatch?.[1] || 'violet'
  const toColor = gradientMatch?.[2] || 'pink'

  // Color mappings for gradients
  const colorMap: Record<string, string> = {
    purple: '#9333ea',
    indigo: '#6366f1',
    violet: '#8b5cf6',
    pink: '#ec4899',
    rose: '#f43f5e',
    emerald: '#10b981',
    teal: '#14b8a6',
    green: '#22c55e',
    orange: '#f97316',
    red: '#ef4444',
    amber: '#f59e0b',
    blue: '#3b82f6',
    cyan: '#06b6d4',
    fuchsia: '#d946ef'
  }

  const fromHex = colorMap[fromColor] || '#8b5cf6'
  const toHex = colorMap[toColor] || '#ec4899'

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: `linear-gradient(135deg, ${fromHex}20 0%, ${toHex}20 100%)`,
          backgroundColor: '#fafafa',
        }}
      >
        {/* Background decoration */}
        <div
          style={{
            position: 'absolute',
            top: -100,
            left: -100,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${fromHex}40, ${toHex}40)`,
            filter: 'blur(120px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${toHex}40, ${fromHex}40)`,
            filter: 'blur(120px)',
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: 60,
            zIndex: 10,
          }}
        >
          {/* Emoji */}
          <div
            style={{
              fontSize: 120,
              marginBottom: 20,
            }}
          >
            {personalityData.emoji}
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 60,
              fontWeight: 700,
              color: '#111',
              marginBottom: 10,
            }}
          >
            {personalityData.name}
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 32,
              color: '#666',
              marginBottom: 40,
            }}
          >
            {personalityData.tagline}
          </div>

          {/* Quiz name */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              fontSize: 24,
              color: '#888',
            }}
          >
            <span>AI Tool Personality Quiz</span>
            <span style={{ color: '#ccc' }}>•</span>
            <span>AgentMastery.ai</span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}