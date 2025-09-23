'use client'

import { useEffect, useState, useRef, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Share2,
  Download,
  RefreshCw,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  TrendingUp,
  Users,
  Star
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import {
  PERSONALITY_RESULTS,
  getShareUrl,
  getShareContent,
  type PersonalityType,
  type PersonalityResult
} from '@/lib/quiz/personality'
import { track, QUIZ_EVENTS } from '@/lib/analytics'

// Simple confetti animation with CSS
function Confetti({ show }: { show: boolean }) {
  if (!show) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="absolute animate-fall"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        >
          <div
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor: ['#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'][Math.floor(Math.random() * 5)]
            }}
          />
        </div>
      ))}
      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-fall {
          animation: fall linear;
        }
      `}</style>
    </div>
  )
}

// Component wrapper for search params
function ResultContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const resultType = searchParams.get('r') as PersonalityType
  const [copied, setCopied] = useState(false)
  const [showConfetti, setShowConfetti] = useState(true)
  const [mockDistribution] = useState({
    'claude-bro': 22,
    'chatgpt-hustler': 28,
    'midjourney-dreamer': 15,
    'excel-wizard': 18,
    'autogpt-ops': 12,
    'research-owl': 5
  })
  const cardRef = useRef<HTMLDivElement>(null)

  const result = PERSONALITY_RESULTS[resultType] || PERSONALITY_RESULTS['claude-bro']

  useEffect(() => {
    // Hide confetti after 5 seconds
    const timer = setTimeout(() => setShowConfetti(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  const handleShare = (network: 'reddit' | 'x' | 'linkedin') => {
    track(QUIZ_EVENTS.QUIZ_SHARE_CLICKED, {
      quiz: 'AI Tool Personality v1',
      result: resultType,
      network
    })

    const content = getShareContent(result, network)

    switch (network) {
      case 'reddit':
        window.open(
          `https://www.reddit.com/submit?title=${encodeURIComponent(content.title || '')}&url=${encodeURIComponent(content.url)}`,
          '_blank'
        )
        break
      case 'x':
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(content.text || '')}`,
          '_blank'
        )
        break
      case 'linkedin':
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(content.url)}`,
          '_blank'
        )
        break
    }
  }

  const handleCopyLink = () => {
    const url = getShareUrl(resultType, 'copy')
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)

    track(QUIZ_EVENTS.QUIZ_SHARE_CLICKED, {
      quiz: 'AI Tool Personality v1',
      result: resultType,
      network: 'copy'
    })
  }

  const handleDownload = () => {
    track(QUIZ_EVENTS.RESULT_DOWNLOADED, {
      quiz: 'AI Tool Personality v1',
      result: resultType
    })

    // Open OG image in new tab for manual save
    const ogImageUrl = `/api/og/quiz/${resultType}`
    window.open(ogImageUrl, '_blank')
  }

  const handleCTA = (cta: string, href: string) => {
    track(QUIZ_EVENTS.RESULT_CTA_CLICKED, {
      quiz: 'AI Tool Personality v1',
      result: resultType,
      cta
    })
    router.push(href)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-amber-50 relative overflow-hidden">
      {/* Confetti */}
      <Confetti show={showConfetti} />

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-1/4 -left-48 w-96 h-96 rounded-full blur-3xl opacity-20 bg-gradient-to-r ${result.color}`} />
        <div className={`absolute bottom-1/4 -right-48 w-96 h-96 rounded-full blur-3xl opacity-20 bg-gradient-to-l ${result.color}`} />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Result Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <Card
            ref={cardRef}
            className={`p-8 backdrop-blur-sm bg-gradient-to-br ${result.gradient} border-2 border-white/50 shadow-2xl`}
          >
            {/* Header */}
            <div className="text-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="text-8xl mb-4"
              >
                {result.emoji}
              </motion.div>

              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-4xl font-bold mb-2"
              >
                You're a {result.name}!
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-muted-foreground mb-4"
              >
                {result.tagline}
              </motion.p>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-lg"
              >
                {result.description}
              </motion.p>
            </div>

            {/* Strengths */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="grid md:grid-cols-3 gap-4 mb-6"
            >
              <div className="bg-white/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  Strengths
                </h3>
                <ul className="text-sm space-y-1">
                  {result.strengths.map((strength, i) => (
                    <li key={i}>• {strength}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Best For
                </h3>
                <ul className="text-sm space-y-1">
                  {result.bestFor.map((use, i) => (
                    <li key={i}>• {use}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Your Tools
                </h3>
                <ul className="text-sm space-y-1">
                  {result.recommendedTools.map((tool, i) => (
                    <li key={i}>• {tool}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </Card>
        </motion.div>

        {/* Share Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="max-w-2xl mx-auto mt-8"
        >
          <Card className="p-6 backdrop-blur-sm bg-white/90">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Share Your Result
            </h2>

            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <Button
                onClick={() => handleShare('reddit')}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share on Reddit
              </Button>

              <Button
                onClick={() => handleShare('x')}
                className="bg-black hover:bg-gray-800 text-white"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share on X
              </Button>

              <Button
                onClick={() => handleShare('linkedin')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share on LinkedIn
              </Button>

              <Button
                onClick={handleCopyLink}
                variant="outline"
                className="border-2"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Link
                  </>
                )}
              </Button>
            </div>

            <div className="flex justify-center">
              <Button
                onClick={handleDownload}
                variant="ghost"
                className="text-sm"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Result Card
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          className="max-w-2xl mx-auto mt-6"
        >
          <Card className="p-4 backdrop-blur-sm bg-white/90">
            <div className="flex items-center gap-2 mb-3">
              <Users className="h-4 w-4" />
              <span className="text-sm font-medium">Most Common Results This Week</span>
            </div>
            <div className="space-y-2">
              {Object.entries(mockDistribution).map(([type, percentage]) => {
                const typeResult = PERSONALITY_RESULTS[type as PersonalityType]
                return (
                  <div key={type} className="flex items-center gap-3">
                    <span className="text-lg">{typeResult.emoji}</span>
                    <div className="flex-1">
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${typeResult.color}`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground w-10">{percentage}%</span>
                  </div>
                )
              })}
            </div>
          </Card>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="max-w-2xl mx-auto mt-8 text-center"
        >
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <Button
              onClick={() => handleCTA('retake', '/quiz/personality')}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Retake Quiz
            </Button>

            <Button
              onClick={() => handleCTA('explore_stack', '/quiz')}
              className="bg-gradient-to-r from-violet-500 to-pink-500 text-white hover:from-violet-600 hover:to-pink-600"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Explore Your AI Stack
            </Button>
          </div>

          {/* Recommended Reads */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Recommended for {result.name}s</h3>
            <div className="grid md:grid-cols-3 gap-3">
              {result.recommendedReads.map((read, i) => (
                <Link
                  key={i}
                  href={read.href}
                  onClick={() => handleCTA('recommended_read', read.href)}
                  className="p-3 bg-white/80 rounded-lg hover:bg-white transition-colors text-sm font-medium flex items-center justify-between group"
                >
                  <span>{read.title}</span>
                  <ExternalLink className="h-3 w-3 opacity-50 group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Main component with Suspense boundary
export default function PersonalityResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="h-8 w-8 animate-pulse mx-auto mb-4" />
          <p>Loading your result...</p>
        </div>
      </div>
    }>
      <ResultContent />
    </Suspense>
  )
}