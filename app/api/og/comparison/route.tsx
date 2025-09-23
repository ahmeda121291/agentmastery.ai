import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const toolA = searchParams.get('toolA') || 'Tool A'
  const toolB = searchParams.get('toolB') || 'Tool B'

  // Format tool names (replace hyphens with spaces and capitalize)
  const formatName = (slug: string) => {
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const toolAName = formatName(toolA)
  const toolBName = formatName(toolB)

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
          backgroundColor: '#014421',
          backgroundImage: 'linear-gradient(135deg, #014421 0%, #28A745 100%)',
        }}
      >
        {/* Top Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            padding: '8px 24px',
            borderRadius: 9999,
            marginBottom: 32,
          }}
        >
          <div style={{ fontSize: 20, color: '#FFD700' }}>⚡</div>
          <div style={{ fontSize: 18, color: 'white', fontWeight: 600 }}>
            AI TOOL COMPARISON
          </div>
        </div>

        {/* VS Layout */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 48,
            marginBottom: 32,
          }}
        >
          {/* Tool A */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              padding: '32px 48px',
              borderRadius: 16,
            }}
          >
            <div
              style={{
                fontSize: 48,
                fontWeight: 'bold',
                color: 'white',
                marginBottom: 8,
              }}
            >
              {toolAName}
            </div>
          </div>

          {/* VS Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 80,
              height: 80,
              backgroundColor: '#FFD700',
              borderRadius: 9999,
              fontSize: 32,
              fontWeight: 'bold',
              color: '#014421',
            }}
          >
            VS
          </div>

          {/* Tool B */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              padding: '32px 48px',
              borderRadius: 16,
            }}
          >
            <div
              style={{
                fontSize: 48,
                fontWeight: 'bold',
                color: 'white',
                marginBottom: 8,
              }}
            >
              {toolBName}
            </div>
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 32,
            fontWeight: 600,
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: 16,
          }}
        >
          Which AI Tool Wins in 2025?
        </div>

        {/* Bottom Branding */}
        <div
          style={{
            position: 'absolute',
            bottom: 32,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            AgentMastery.ai
          </div>
          <div
            style={{
              fontSize: 18,
              color: 'rgba(255, 255, 255, 0.7)',
            }}
          >
            Independent AI Tool Rankings
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