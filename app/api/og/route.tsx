import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Get parameters
    const title = searchParams.get('title') || 'AgentMastery.ai'
    const description = searchParams.get('description') || 'Master AI Tools for Business Growth'
    const type = searchParams.get('type') || 'default'
    const category = searchParams.get('category') || ''
    const author = searchParams.get('author') || 'AgentMastery Team'
    const readingTime = searchParams.get('readingTime') || ''

    // Different layouts based on type
    if (type === 'blog') {
      return new ImageResponse(
        (
          <div
            style={{
              height: '100%',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              backgroundImage: 'linear-gradient(135deg, #014421 0%, #28A745 100%)',
              padding: '60px',
            }}
          >
            {/* Top Section */}
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              {/* Category & Reading Time */}
              <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                {category && (
                  <div
                    style={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '100px',
                      fontSize: '24px',
                      fontWeight: 600,
                    }}
                  >
                    {category}
                  </div>
                )}
                {readingTime && (
                  <div
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '100px',
                      fontSize: '24px',
                    }}
                  >
                    {readingTime}
                  </div>
                )}
              </div>

              {/* Title */}
              <h1
                style={{
                  fontSize: '72px',
                  fontWeight: 'bold',
                  color: 'white',
                  lineHeight: 1.1,
                  marginBottom: '20px',
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
              >
                {title.length > 60 ? `${title.substring(0, 60)}...` : title}
              </h1>

              {/* Description */}
              {description && (
                <p
                  style={{
                    fontSize: '32px',
                    color: 'rgba(255, 255, 255, 0.9)',
                    lineHeight: 1.4,
                  }}
                >
                  {description.length > 120 ? `${description.substring(0, 120)}...` : description}
                </p>
              )}
            </div>

            {/* Bottom Section */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.2)',
                  }}
                />
                <span style={{ color: 'white', fontSize: '28px' }}>
                  {author}
                </span>
              </div>

              {/* Logo */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    background: 'white',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                  }}
                >
                  🚀
                </div>
                <span style={{ color: 'white', fontSize: '32px', fontWeight: 'bold' }}>
                  AgentMastery.ai
                </span>
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

    if (type === 'tool') {
      const badges = searchParams.get('badges') || ''
      const pricing = searchParams.get('pricing') || ''

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
            {/* Category Badge */}
            {category && (
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '100px',
                  fontSize: '24px',
                  fontWeight: 600,
                  marginBottom: '30px',
                }}
              >
                {category}
              </div>
            )}

            {/* Tool Name */}
            <h1
              style={{
                fontSize: '96px',
                fontWeight: 'bold',
                color: 'white',
                marginBottom: '20px',
                textAlign: 'center',
                textShadow: '0 4px 8px rgba(0,0,0,0.2)',
              }}
            >
              {title}
            </h1>

            {/* Description */}
            <p
              style={{
                fontSize: '36px',
                color: 'rgba(255, 255, 255, 0.9)',
                textAlign: 'center',
                marginBottom: '40px',
                maxWidth: '900px',
              }}
            >
              {description}
            </p>

            {/* Badges */}
            {badges && (
              <div style={{ display: 'flex', gap: '16px', marginBottom: '30px' }}>
                {badges.split(',').slice(0, 3).map((badge, i) => (
                  <div
                    key={i}
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontSize: '24px',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                    }}
                  >
                    {badge.trim()}
                  </div>
                ))}
              </div>
            )}

            {/* Pricing */}
            {pricing && (
              <div
                style={{
                  fontSize: '32px',
                  color: 'white',
                  fontWeight: 600,
                  marginBottom: '40px',
                }}
              >
                {pricing}
              </div>
            )}

            {/* Bottom Logo */}
            <div
              style={{
                position: 'absolute',
                bottom: '40px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '28px' }}>
                Reviewed on
              </span>
              <span style={{ color: 'white', fontSize: '32px', fontWeight: 'bold' }}>
                AgentMastery.ai
              </span>
            </div>
          </div>
        ),
        {
          width: 1200,
          height: 630,
        }
      )
    }

    // Default OG image
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
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              marginBottom: '40px',
            }}
          >
            <div
              style={{
                width: '80px',
                height: '80px',
                background: 'white',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '48px',
              }}
            >
              🚀
            </div>
          </div>

          <h1
            style={{
              fontSize: '96px',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '20px',
              textShadow: '0 4px 8px rgba(0,0,0,0.2)',
            }}
          >
            {title}
          </h1>

          <p
            style={{
              fontSize: '36px',
              color: 'rgba(255, 255, 255, 0.9)',
              textAlign: 'center',
            }}
          >
            {description}
          </p>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: any) {
    console.error('OG Image generation error:', e?.message)
    return new Response(`Failed to generate image`, {
      status: 500,
    })
  }
}