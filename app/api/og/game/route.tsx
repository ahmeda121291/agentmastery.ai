import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const type = searchParams.get('type') || 'bingo'
    const checked = searchParams.get('checked') || '0'
    const seed = searchParams.get('seed') || ''
    const won = searchParams.get('won') === '1'
    const score = searchParams.get('score') || '0'

    if (type === 'bingo') {
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
              backgroundImage: 'linear-gradient(135deg, #014421 0%, #28A745 100%)',
              padding: '60px',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              {won && (
                <div
                  style={{
                    fontSize: '48px',
                    marginBottom: '20px',
                    color: '#FFD700',
                  }}
                >
                  🏆 BINGO! 🏆
                </div>
              )}

              <h1
                style={{
                  fontSize: '72px',
                  fontWeight: 'bold',
                  color: 'white',
                  marginBottom: '40px',
                }}
              >
                AI Sales Bingo
              </h1>

              <div
                style={{
                  display: 'flex',
                  gap: '60px',
                  justifyContent: 'center',
                  marginBottom: '40px',
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '64px', fontWeight: 'bold', color: '#4ADE80' }}>
                    {checked}/25
                  </div>
                  <div style={{ fontSize: '24px', color: 'rgba(255, 255, 255, 0.8)' }}>
                    Squares Completed
                  </div>
                </div>
              </div>

              {seed && (
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    padding: '12px 24px',
                    borderRadius: '100px',
                    fontSize: '20px',
                    color: 'rgba(255, 255, 255, 0.9)',
                    marginBottom: '30px',
                  }}
                >
                  Board ID: {seed.slice(0, 8)}
                </div>
              )}

              <div
                style={{
                  fontSize: '28px',
                  color: 'rgba(255, 255, 255, 0.9)',
                }}
              >
                Play at AgentMastery.ai/games/bingo
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

    // Pop quiz type
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
            backgroundImage: 'linear-gradient(135deg, #014421 0%, #28A745 100%)',
            padding: '60px',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <h1
              style={{
                fontSize: '72px',
                fontWeight: 'bold',
                color: 'white',
                marginBottom: '40px',
              }}
            >
              Pop Quiz Score
            </h1>

            <div
              style={{
                fontSize: '120px',
                fontWeight: 'bold',
                color: '#4ADE80',
                marginBottom: '20px',
              }}
            >
              {score}
            </div>

            <div
              style={{
                fontSize: '36px',
                color: 'rgba(255, 255, 255, 0.9)',
                marginBottom: '40px',
              }}
            >
              points
            </div>

            <div
              style={{
                fontSize: '28px',
                color: 'rgba(255, 255, 255, 0.9)',
              }}
            >
              Test your knowledge at AgentMastery.ai
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: any) {
    console.error('Game OG Image generation error:', e?.message)
    return new Response(`Failed to generate image`, {
      status: 500,
    })
  }
}