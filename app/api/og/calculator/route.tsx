import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const type = searchParams.get('type') || 'roi'
    const revenue = searchParams.get('revenue') || '0'
    const roi = searchParams.get('roi') || '0'
    const savings = searchParams.get('savings') || '0'
    const current = searchParams.get('current') || ''
    const percent = searchParams.get('percent') || '0'
    const payback = searchParams.get('payback') || '0'

    if (type === 'roi') {
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
                  marginBottom: '20px',
                }}
              >
                ROI Calculator Results
              </h1>

              <div
                style={{
                  fontSize: '96px',
                  fontWeight: 'bold',
                  color: '#4ADE80',
                  marginBottom: '40px',
                }}
              >
                +${revenue}/month
              </div>

              <div style={{ display: 'flex', gap: '40px', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '8px' }}>
                    ROI
                  </div>
                  <div style={{ fontSize: '48px', color: 'white', fontWeight: 'bold' }}>
                    {roi}%
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '8px' }}>
                    Payback
                  </div>
                  <div style={{ fontSize: '48px', color: 'white', fontWeight: 'bold' }}>
                    {payback} days
                  </div>
                </div>
              </div>

              <div
                style={{
                  marginTop: '60px',
                  fontSize: '28px',
                  color: 'rgba(255, 255, 255, 0.9)',
                }}
              >
                Calculate your ROI at AgentMastery.ai
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

    // Switch savings type
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
                fontSize: '64px',
                fontWeight: 'bold',
                color: 'white',
                marginBottom: '20px',
              }}
            >
              Switch from {current} & Save
            </h1>

            <div
              style={{
                fontSize: '96px',
                fontWeight: 'bold',
                color: '#4ADE80',
                marginBottom: '20px',
              }}
            >
              ${savings}/year
            </div>

            <div
              style={{
                fontSize: '48px',
                color: 'rgba(255, 255, 255, 0.9)',
                marginBottom: '40px',
              }}
            >
              Save {percent}%
            </div>

            <div
              style={{
                marginTop: '40px',
                fontSize: '28px',
                color: 'rgba(255, 255, 255, 0.9)',
              }}
            >
              Compare tools at AgentMastery.ai
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
    console.error('Calculator OG Image generation error:', e?.message)
    return new Response(`Failed to generate image`, {
      status: 500,
    })
  }
}