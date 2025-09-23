import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

// Main OG image endpoint for blog and tools
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

    // Quiz results poster
    if (type === 'quiz') {
      const tools = searchParams.get('tools')?.split(',') || []
      const score = searchParams.get('score') || '0'
      const dimensions = searchParams.get('dimensions')?.split(',') || []

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
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '40px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '24px',
              }}
            >
              <h1
                style={{
                  fontSize: '48px',
                  fontWeight: 'bold',
                  color: 'white',
                  margin: 0,
                }}
              >
                My AI Tool Stack
              </h1>

              <div
                style={{
                  display: 'flex',
                  gap: '16px',
                  marginBottom: '16px',
                }}
              >
                {dimensions.map((dim, i) => (
                  <div
                    key={i}
                    style={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      padding: '8px 16px',
                      borderRadius: '100px',
                      color: 'white',
                      fontSize: '20px',
                    }}
                  >
                    {dim}
                  </div>
                ))}
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  width: '100%',
                }}
              >
                {tools.map((tool, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      background: i === 0 ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.15)',
                      padding: '16px 24px',
                      borderRadius: '12px',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '36px',
                        fontWeight: 'bold',
                        color: 'white',
                      }}
                    >
                      {i + 1}
                    </div>
                    <div
                      style={{
                        fontSize: '28px',
                        color: 'white',
                        fontWeight: i === 0 ? 'bold' : 'normal',
                      }}
                    >
                      {tool}
                    </div>
                    {i === 0 && (
                      <div
                        style={{
                          marginLeft: 'auto',
                          background: 'white',
                          color: '#014421',
                          padding: '4px 12px',
                          borderRadius: '100px',
                          fontSize: '18px',
                          fontWeight: 'bold',
                        }}
                      >
                        {score}% Match
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div
                style={{
                  marginTop: '24px',
                  fontSize: '24px',
                  color: 'rgba(255, 255, 255, 0.9)',
                }}
              >
                Take the quiz at AgentMastery.ai
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

    // About page
    if (type === 'about') {
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
            {/* Badge */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                padding: '12px 24px',
                borderRadius: '100px',
                color: 'white',
                fontSize: '24px',
                marginBottom: '40px',
                border: '2px solid rgba(255, 255, 255, 0.3)',
              }}
            >
              ✨ The First AI Blog with Proprietary Scoring
            </div>

            {/* Title */}
            <h1
              style={{
                fontSize: '80px',
                fontWeight: 'bold',
                color: 'white',
                textAlign: 'center',
                lineHeight: 1.1,
                marginBottom: '30px',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              {title}
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontSize: '32px',
                color: 'rgba(255, 255, 255, 0.9)',
                textAlign: 'center',
                lineHeight: 1.4,
                marginBottom: '40px',
                maxWidth: '900px',
              }}
            >
              Transparent methodology • Editorial independence • Weekly updates
            </p>

            {/* Features */}
            <div
              style={{
                display: 'flex',
                gap: '20px',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              {['🎯 Proprietary Scoring', '🛡️ Independent Rankings', '📊 Weekly Updates', '🔍 Fair Assessments'].map((feature, i) => (
                <div
                  key={i}
                  style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    padding: '16px 24px',
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '20px',
                    fontWeight: 'medium',
                  }}
                >
                  {feature}
                </div>
              ))}
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