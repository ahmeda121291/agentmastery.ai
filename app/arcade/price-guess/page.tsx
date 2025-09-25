'use client'

import { useState, useEffect, useRef } from 'react'
import ArcadeShell from '@/components/ArcadeShell'
import InlineCTA from '@/components/InlineCTA'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Trophy,
  Target,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Share2,
  Sparkles,
  Zap,
  Star,
  Award,
  ExternalLink,
  DollarSign
} from 'lucide-react'
import { money, formatNumber, formatCompact } from '@/lib/fmt'
import { copyToClipboard } from '@/lib/share'
import { TOOL_PRICES, shuffleArray, type ToolPrice } from '@/data/toolPrices'
import Script from 'next/script'
import { createSchemaScript, faqPageSchema, breadcrumbSchema } from '@/lib/jsonld'
import { canonical } from '@/lib/seo'
// Confetti will be loaded dynamically

// Metadata is exported from separate page file

const ROUNDS_PER_GAME = 10
const EXCELLENT_ERROR = 10
const GOOD_ERROR = 25

type GameState = 'menu' | 'playing' | 'roundResult' | 'gameOver'

type RoundResult = {
  tool: ToolPrice
  guess: number
  error: number
  points: number
}

export default function PriceGuessGame() {
  const [gameState, setGameState] = useState<GameState>('menu')
  const [rulesTab, setRulesTab] = useState('rules')
  const [resultsTab, setResultsTab] = useState('summary')
  const [currentRound, setCurrentRound] = useState(0)
  const [tools, setTools] = useState<ToolPrice[]>([])
  const [currentTool, setCurrentTool] = useState<ToolPrice | null>(null)
  const [guess, setGuess] = useState('')
  const [results, setResults] = useState<RoundResult[]>([])
  const [bestScore, setBestScore] = useState<number | null>(null)
  const [currentStreak, setCurrentStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Load saved stats
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('priceGuessStats')
      if (saved) {
        const stats = JSON.parse(saved)
        setBestScore(stats.bestScore || null)
        setBestStreak(stats.bestStreak || 0)
      }
    }
  }, [])

  const startNewGame = () => {
    const shuffled = shuffleArray(TOOL_PRICES)
    setTools(shuffled.slice(0, ROUNDS_PER_GAME))
    setCurrentRound(0)
    setResults([])
    setCurrentTool(shuffled[0])
    setGuess('')
    setShowHint(false)
    setGameState('playing')
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  const submitGuess = () => {
    if (!currentTool || !guess) return

    const guessNum = parseFloat(guess)
    if (isNaN(guessNum) || guessNum < 0) return

    const actualPrice = currentTool.price
    const error = Math.abs(((guessNum - actualPrice) / actualPrice) * 100)
    const points = Math.max(0, 100 - Math.round(error))

    const result: RoundResult = {
      tool: currentTool,
      guess: guessNum,
      error,
      points
    }

    setResults([...results, result])

    // Update streak
    if (error <= EXCELLENT_ERROR) {
      setCurrentStreak(currentStreak + 1)
      if (currentStreak + 1 > bestStreak) {
        setBestStreak(currentStreak + 1)
      }
    } else {
      setCurrentStreak(0)
    }

    // Celebrate excellent guess
    if (error <= EXCELLENT_ERROR && typeof window !== 'undefined') {
      import('canvas-confetti').then(({ default: confetti }) => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        })
      })
    }

    setGameState('roundResult')
  }

  const nextRound = () => {
    const nextIdx = currentRound + 1
    if (nextIdx >= ROUNDS_PER_GAME) {
      finishGame()
    } else {
      setCurrentRound(nextIdx)
      setCurrentTool(tools[nextIdx])
      setGuess('')
      setShowHint(false)
      setGameState('playing')
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }

  const finishGame = () => {
    const totalError = results.reduce((sum, r) => sum + r.error, 0) / results.length
    const totalPoints = results.reduce((sum, r) => sum + r.points, 0)

    // Save best score
    if (!bestScore || totalError < bestScore) {
      setBestScore(totalError)
      localStorage.setItem('priceGuessStats', JSON.stringify({
        bestScore: totalError,
        bestStreak: bestStreak
      }))

      // Big celebration for new best
      import('canvas-confetti').then(({ default: confetti }) => {
        confetti({
          particleCount: 200,
          spread: 120,
          origin: { y: 0.4 }
        })
      })
    }

    setGameState('gameOver')
  }

  const shareResults = async () => {
    const totalError = results.reduce((sum, r) => sum + r.error, 0) / results.length
    const excellentGuesses = results.filter(r => r.error <= EXCELLENT_ERROR).length

    const text = `🎯 Tool Price Challenge\n` +
      `Average error: ${totalError.toFixed(1)}%\n` +
      `Perfect guesses: ${excellentGuesses}/${ROUNDS_PER_GAME}\n` +
      `Best streak: ${bestStreak}\n\n` +
      `Challenge yourself: agentmastery.ai/arcade/price-guess`

    await copyToClipboard(text)
    alert('Results copied to clipboard!')
  }

  const totalError = results.length > 0
    ? results.reduce((sum, r) => sum + r.error, 0) / results.length
    : 0

  const quickAnswer = gameState === 'menu'
    ? 'Test your knowledge of AI tool pricing across 70+ popular tools. Can you guess within 10% of the actual price?'
    : gameState === 'gameOver'
    ? `Game complete! Your average error was ${totalError.toFixed(1)}%. ${totalError < EXCELLENT_ERROR ? 'Outstanding!' : totalError < GOOD_ERROR ? 'Great job!' : 'Keep practicing!'}`
    : ''

  // JSON-LD Schema
  const faqItems = [
    {
      question: 'Where do the tool prices come from?',
      answer: 'All prices are based on publicly available pricing pages as of January 2025. Prices shown are for entry-level paid plans in USD per month.'
    },
    {
      question: 'Are taxes and add-ons included in the price?',
      answer: 'No, prices shown are base subscription costs before taxes, add-ons, or usage-based fees. Annual billing discounts are not reflected.'
    },
    {
      question: 'What is a good score?',
      answer: 'An average error under 10% is excellent, under 25% is good. The best players can consistently guess within 15% of actual prices.'
    }
  ]

  const schemaList = [
    breadcrumbSchema([
      { name: 'Home', url: canonical('/') },
      { name: 'Agent Arcade', url: canonical('/arcade') },
      { name: 'Price Guessing Game', url: canonical('/arcade/price-guess') }
    ]),
    faqPageSchema(faqItems, canonical('/arcade/price-guess'))
  ]

  return (
    <>
      <Script {...createSchemaScript(schemaList, 'price-guess-schema')} />

      <ArcadeShell
        title="Tool Price Guessing Game"
        subtitle="How well do you know the AI tool market?"
        quickAnswer={quickAnswer}
      >
        {/* Game Stats Bar */}
        {gameState !== 'menu' && (
          <div className="mb-6 flex items-center justify-between">
            <div className="flex gap-4">
              <Badge variant="secondary">
                Round {currentRound + 1}/{ROUNDS_PER_GAME}
              </Badge>
              {currentStreak > 0 && (
                <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
                  <Zap className="h-3 w-3 mr-1" />
                  {currentStreak} Streak
                </Badge>
              )}
            </div>
            {bestScore && (
              <Badge variant="outline">
                Best: {bestScore.toFixed(1)}% error
              </Badge>
            )}
          </div>
        )}

        {/* Game States */}
        {gameState === 'menu' && (
          <div className="space-y-6">
            <Card className="p-8 text-center bg-gradient-to-br from-purple-50 to-pink-50">
              <div className="mb-6">
                <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 mb-4">
                  <Target className="h-12 w-12 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Ready to Test Your Knowledge?</h2>
                <p className="text-muted-foreground">
                  Guess the monthly price of {TOOL_PRICES.length} popular AI and SaaS tools
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                  <p className="text-sm font-medium">10 Rounds</p>
                  <p className="text-xs text-muted-foreground">Per game</p>
                </div>
                <div className="text-center">
                  <Star className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-sm font-medium">70+ Tools</p>
                  <p className="text-xs text-muted-foreground">Including affiliates</p>
                </div>
                <div className="text-center">
                  <Award className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <p className="text-sm font-medium">Track Progress</p>
                  <p className="text-xs text-muted-foreground">Beat your best</p>
                </div>
              </div>

              <Button
                size="lg"
                onClick={startNewGame}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Start Game
              </Button>

              {bestScore && (
                <p className="text-sm text-muted-foreground mt-4">
                  Your best: {bestScore.toFixed(1)}% average error
                </p>
              )}
            </Card>

            <Tabs value={rulesTab} onValueChange={setRulesTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="rules">How to Play</TabsTrigger>
                <TabsTrigger value="scoring">Scoring</TabsTrigger>
              </TabsList>

              <TabsContent value="rules" className="mt-4">
                <Card className="p-6">
                  <h3 className="font-semibold mb-3">Game Rules</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• You'll see 10 random AI/SaaS tools</li>
                    <li>• Guess the monthly subscription price in USD</li>
                    <li>• Prices are for entry-level paid plans</li>
                    <li>• The closer your guess, the more points you earn</li>
                    <li>• Build streaks with accurate guesses (within 10%)</li>
                  </ul>
                </Card>
              </TabsContent>

              <TabsContent value="scoring" className="mt-4">
                <Card className="p-6">
                  <h3 className="font-semibold mb-3">Scoring System</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-2 rounded bg-green-50">
                      <span className="text-sm">Within 10%</span>
                      <Badge className="bg-green-600">Excellent!</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded bg-blue-50">
                      <span className="text-sm">Within 25%</span>
                      <Badge className="bg-blue-600">Good</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded bg-gray-50">
                      <span className="text-sm">Over 25%</span>
                      <Badge variant="secondary">Keep trying</Badge>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {gameState === 'playing' && currentTool && (
          <div className="space-y-6">
            <Card className="p-8 bg-gradient-to-br from-indigo-50 to-blue-50">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-lg mb-4">
                  <DollarSign className="h-10 w-10 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2">{currentTool.name}</h2>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Badge variant="secondary">{currentTool.category}</Badge>
                  <Badge variant="outline">{currentTool.plan} Plan</Badge>
                </div>
              </div>

              <div className="max-w-xs mx-auto space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Your Price Guess (USD/month)
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        $
                      </span>
                      <Input
                        ref={inputRef}
                        type="number"
                        value={guess}
                        onChange={(e) => setGuess(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && submitGuess()}
                        placeholder="0"
                        className="pl-8 text-lg font-mono"
                        min={0}
                        step={1}
                      />
                    </div>
                    <Button
                      onClick={submitGuess}
                      disabled={!guess}
                      className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white"
                    >
                      Submit
                    </Button>
                  </div>
                </div>

                {!showHint && currentRound > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowHint(true)}
                    className="w-full"
                  >
                    Need a hint? (-10 points)
                  </Button>
                )}

                {showHint && (
                  <Card className="p-3 bg-yellow-50 border-yellow-200">
                    <p className="text-xs text-yellow-800">
                      Hint: Most {currentTool.category} tools range from $
                      {currentTool.price < 50 ? '10-100' : currentTool.price < 200 ? '50-300' : '100-1000'}/month
                    </p>
                  </Card>
                )}
              </div>
            </Card>

            <Progress value={(currentRound / ROUNDS_PER_GAME) * 100} className="h-2" />
          </div>
        )}

        {gameState === 'roundResult' && currentTool && results.length > 0 && (
          <div className="space-y-6">
            <Card className="p-8">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4"
                  style={{
                    background: results[results.length - 1].error <= EXCELLENT_ERROR
                      ? 'linear-gradient(135deg, #10b981, #059669)'
                      : results[results.length - 1].error <= GOOD_ERROR
                      ? 'linear-gradient(135deg, #3b82f6, #2563eb)'
                      : 'linear-gradient(135deg, #6b7280, #4b5563)'
                  }}
                >
                  {results[results.length - 1].error <= EXCELLENT_ERROR ? (
                    <Trophy className="h-10 w-10 text-white" />
                  ) : results[results.length - 1].error <= GOOD_ERROR ? (
                    <Star className="h-10 w-10 text-white" />
                  ) : (
                    <Target className="h-10 w-10 text-white" />
                  )}
                </div>

                <h2 className="text-2xl font-bold mb-2">
                  {results[results.length - 1].error <= EXCELLENT_ERROR
                    ? 'Excellent!'
                    : results[results.length - 1].error <= GOOD_ERROR
                    ? 'Good Guess!'
                    : 'Keep Trying!'}
                </h2>
              </div>

              <div className="max-w-md mx-auto space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 rounded-lg bg-gray-50">
                    <p className="text-sm text-muted-foreground">Your Guess</p>
                    <p className="text-2xl font-bold">{money(results[results.length - 1].guess)}</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-green-50">
                    <p className="text-sm text-muted-foreground">Actual Price</p>
                    <p className="text-2xl font-bold text-green-600">{money(currentTool.price)}</p>
                  </div>
                </div>

                <div className="text-center p-4 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {results[results.length - 1].error < results[results.length - 1].guess ? (
                      <TrendingUp className="h-5 w-5 text-indigo-600" />
                    ) : (
                      <TrendingDown className="h-5 w-5 text-purple-600" />
                    )}
                    <span className="text-lg font-semibold">
                      {results[results.length - 1].error.toFixed(1)}% off
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Points earned: {results[results.length - 1].points}
                  </p>
                </div>

                {currentTool.affiliateUrl && (
                  <Card className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
                    <p className="text-sm font-medium mb-2">Try {currentTool.name}:</p>
                    <a
                      href={currentTool.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="inline-flex items-center text-sm text-emerald-700 hover:text-emerald-900 font-medium"
                      data-cta="arcade_affiliate_cta"
                    >
                      Visit {currentTool.name}
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </Card>
                )}

                <Button
                  onClick={nextRound}
                  size="lg"
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                >
                  {currentRound + 1 >= ROUNDS_PER_GAME ? 'See Results' : 'Next Tool'}
                </Button>
              </div>
            </Card>
          </div>
        )}

        {gameState === 'gameOver' && (
          <div className="space-y-6">
            <Card className="p-8 bg-gradient-to-br from-yellow-50 to-amber-50">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 mb-4">
                  <Trophy className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Game Complete!</h2>
                <p className="text-muted-foreground">
                  {totalError < EXCELLENT_ERROR
                    ? 'Outstanding accuracy! You really know your tools!'
                    : totalError < GOOD_ERROR
                    ? 'Great job! You have solid market knowledge.'
                    : 'Good effort! Keep playing to improve.'}
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <Card className="p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Average Error</p>
                  <p className="text-2xl font-bold">{totalError.toFixed(1)}%</p>
                </Card>
                <Card className="p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Perfect Guesses</p>
                  <p className="text-2xl font-bold">
                    {results.filter(r => r.error <= EXCELLENT_ERROR).length}/{ROUNDS_PER_GAME}
                  </p>
                </Card>
                <Card className="p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Total Points</p>
                  <p className="text-2xl font-bold">
                    {results.reduce((sum, r) => sum + r.points, 0)}
                  </p>
                </Card>
              </div>

              <Tabs value={resultsTab} onValueChange={setResultsTab} className="w-full mb-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="summary">Round Summary</TabsTrigger>
                  <TabsTrigger value="insights">Insights</TabsTrigger>
                </TabsList>

                <TabsContent value="summary" className="mt-4">
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {results.map((r, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium">#{i + 1}</span>
                          <div>
                            <p className="text-sm font-medium">{r.tool.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Guessed: {money(r.guess)} | Actual: {money(r.tool.price)}
                            </p>
                          </div>
                        </div>
                        <Badge variant={r.error <= EXCELLENT_ERROR ? 'default' : r.error <= GOOD_ERROR ? 'secondary' : 'outline'}>
                          {r.error.toFixed(1)}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="insights" className="mt-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Your Performance</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Best guess: {results.reduce((min, r) => Math.min(min, r.error), 100).toFixed(1)}% error</li>
                        <li>• Worst guess: {results.reduce((max, r) => Math.max(max, r.error), 0).toFixed(1)}% error</li>
                        <li>• Most accurate category: {
                          (() => {
                            const byCategory = results.reduce((acc, r) => {
                              if (!acc[r.tool.category]) acc[r.tool.category] = []
                              acc[r.tool.category].push(r.error)
                              return acc
                            }, {} as Record<string, number[]>)

                            const avgByCategory = Object.entries(byCategory).map(([cat, errors]) => ({
                              cat,
                              avg: errors.reduce((sum, e) => sum + e, 0) / errors.length
                            }))

                            return avgByCategory.sort((a, b) => a.avg - b.avg)[0]?.cat || 'N/A'
                          })()
                        }</li>
                      </ul>
                    </div>

                    <div className="p-4 rounded-lg bg-blue-50">
                      <p className="text-sm font-medium text-blue-900 mb-1">Pro Tip</p>
                      <p className="text-xs text-blue-700">
                        Most SaaS tools price in tiers: $10-20 (starter), $30-50 (growth), $100+ (enterprise)
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex gap-3">
                <Button
                  onClick={startNewGame}
                  size="lg"
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Play Again
                </Button>
                <Button
                  onClick={shareResults}
                  size="lg"
                  variant="outline"
                  data-cta="arcade_share_link"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </Card>

            {/* Affiliate CTAs */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Discover great deals on the tools you just learned about
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                {results
                  .filter(r => r.tool.affiliateUrl && r.error <= GOOD_ERROR)
                  .slice(0, 3)
                  .map((r, i) => (
                    <InlineCTA
                      key={i}
                      href={r.tool.affiliateUrl!}
                      label={`Try ${r.tool.name} (${money(r.tool.price)}/mo)`}
                      track="arcade_affiliate_cta"
                      className="my-0"
                    />
                  ))}
                {results.filter(r => r.tool.affiliateUrl && r.error <= GOOD_ERROR).length === 0 && (
                  <>
                    <InlineCTA
                      href="https://smartlead.ai/?via=masteryagent"
                      label="Try SmartLead ($39/mo)"
                      track="arcade_affiliate_cta"
                      className="my-0"
                    />
                    <InlineCTA
                      href="https://aiseo.ai/?fpr=agentmastery"
                      label="Try AISEO ($19/mo)"
                      track="arcade_affiliate_cta"
                      className="my-0"
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </ArcadeShell>
    </>
  )
}