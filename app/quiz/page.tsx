'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { quizQuestions, calculateQuizResults } from '@/data/quiz'
import { recommendTools, getMatchPercentage } from '@/lib/recommend'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  ExternalLink,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
  RotateCw,
  Share2,
  Download,
  Link2,
  Trophy,
  Flame,
  Info,
  XCircle
} from 'lucide-react'
import Link from 'next/link'
import confetti from 'canvas-confetti'

interface StreakData {
  currentStreak: number
  lastQuizDate: string
  totalQuizzes: number
  badges: string[]
}

interface WrongAnswer {
  questionIndex: number
  selectedAnswer: number
  correctAnswer?: number
}

const BADGE_MILESTONES = {
  3: { name: 'Getting Started', icon: '🌟' },
  7: { name: 'Week Warrior', icon: '⚔️' },
  14: { name: 'Fortnight Champion', icon: '🏆' },
  30: { name: 'Month Master', icon: '👑' }
}

export default function QuizPage() {
  const shouldReduceMotion = useReducedMotion()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResults, setShowResults] = useState(false)
  const [streakData, setStreakData] = useState<StreakData | null>(null)
  const [wrongAnswers, setWrongAnswers] = useState<WrongAnswer[]>([])
  const [showWrongAnswers, setShowWrongAnswers] = useState(false)
  const [shareUrl, setShareUrl] = useState<string>('')
  const [downloading, setDownloading] = useState(false)

  // Load streak data on mount
  useEffect(() => {
    const stored = localStorage.getItem('quizStreak')
    if (stored) {
      const data = JSON.parse(stored) as StreakData
      const lastDate = new Date(data.lastQuizDate)
      const today = new Date()
      const daysDiff = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24))

      // Reset streak if more than 1 day has passed
      if (daysDiff > 1) {
        data.currentStreak = 0
      }

      setStreakData(data)
    } else {
      setStreakData({
        currentStreak: 0,
        lastQuizDate: new Date().toISOString(),
        totalQuizzes: 0,
        badges: []
      })
    }
  }, [])

  const updateStreak = () => {
    const today = new Date().toISOString().split('T')[0]
    const lastDate = streakData?.lastQuizDate.split('T')[0]

    let newStreak = streakData?.currentStreak || 0
    if (lastDate !== today) {
      newStreak += 1
    }

    const newBadges = [...(streakData?.badges || [])]

    // Check for new badges
    Object.entries(BADGE_MILESTONES).forEach(([days, badge]) => {
      if (newStreak >= parseInt(days) && !newBadges.includes(badge.name)) {
        newBadges.push(badge.name)
        // Extra confetti for badges
        confetti({
          particleCount: 200,
          spread: 100,
          origin: { y: 0.3 }
        })
      }
    })

    const updatedData: StreakData = {
      currentStreak: newStreak,
      lastQuizDate: new Date().toISOString(),
      totalQuizzes: (streakData?.totalQuizzes || 0) + 1,
      badges: newBadges
    }

    localStorage.setItem('quizStreak', JSON.stringify(updatedData))
    setStreakData(updatedData)
  }

  // Track wrong answers (for demo, we'll consider some answers as "wrong")
  const checkAnswer = (questionIndex: number, selectedAnswer: number) => {
    // For demo: consider answer wrong if it's the last option (usually "Other")
    const question = quizQuestions[questionIndex]
    if (selectedAnswer === question.answers.length - 1) {
      setWrongAnswers([...wrongAnswers, {
        questionIndex,
        selectedAnswer,
        correctAnswer: 0 // First answer is "correct" for demo
      }])
    }
  }

  const progress = ((currentQuestion + (showResults ? 1 : 0)) / (quizQuestions.length + 1)) * 100

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNext = () => {
    if (selectedAnswer === null) return

    checkAnswer(currentQuestion, selectedAnswer)
    const newAnswers = [...answers, selectedAnswer]
    setAnswers(newAnswers)
    setSelectedAnswer(null)

    if (currentQuestion === quizQuestions.length - 1) {
      // Last question - show results
      setShowResults(true)
      updateStreak()
      // Fire confetti if motion is allowed
      if (!shouldReduceMotion) {
        setTimeout(() => {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          })
        }, 500)
      }
    } else {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      const newAnswers = [...answers]
      newAnswers.pop()
      setAnswers(newAnswers)
      setSelectedAnswer(null)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setSelectedAnswer(null)
    setShowResults(false)
    setWrongAnswers([])
    setShowWrongAnswers(false)
    setShareUrl('')
  }

  const generateShareUrl = async () => {
    const recommendations = recommendTools(quizResult!)
    const toolSlugs = recommendations.slice(0, 3).map(t => t.slug).join(',')

    const params = new URLSearchParams({
      tools: toolSlugs,
      score: recommendations[0] ? getMatchPercentage(recommendations[0].score).toString() : '0',
      dimensions: quizResult?.topDimensions.join(',') || '',
      utm_source: 'agentmastery',
      utm_medium: 'quiz',
      utm_campaign: 'tool-matcher'
    })

    const ogImageUrl = `/api/og/quiz?${params.toString()}`
    setShareUrl(`https://agentmastery.ai/quiz?shared=${btoa(params.toString())}`)

    return ogImageUrl
  }

  const handleShare = async () => {
    const ogImageUrl = await generateShareUrl()
    await navigator.clipboard.writeText(shareUrl)
    alert('Share link copied to clipboard!')
  }

  const handleDownload = async () => {
    setDownloading(true)
    try {
      const ogImageUrl = await generateShareUrl()
      const response = await fetch(ogImageUrl)
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `agentmastery-quiz-results-${Date.now()}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download failed:', error)
    }
    setDownloading(false)
  }

  const question = quizQuestions[currentQuestion]
  const quizResult = showResults ? calculateQuizResults(answers) : null
  const recommendations = quizResult ? recommendTools(quizResult) : []

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Header with Streak */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="h-8 w-8 text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold">AI Tool Matcher</h1>
        </div>

        {/* Streak Display */}
        {streakData && streakData.currentStreak > 0 && (
          <div className="flex items-center justify-center gap-4 mb-4">
            <Badge variant="secondary" className="text-sm py-1 px-3">
              <Flame className="h-4 w-4 mr-1 text-orange-500" />
              Day {streakData.currentStreak} Streak!
            </Badge>
            {streakData.badges.length > 0 && (
              <div className="flex gap-2">
                {streakData.badges.slice(-3).map(badge => {
                  const milestone = Object.values(BADGE_MILESTONES).find(m => m.name === badge)
                  return (
                    <span key={badge} className="text-2xl" title={badge}>
                      {milestone?.icon}
                    </span>
                  )
                })}
              </div>
            )}
          </div>
        )}

        <p className="text-lg text-muted-foreground">
          Answer 6 quick questions to get personalized tool recommendations
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2 text-sm text-muted-foreground">
          <span>
            {showResults ? 'Complete!' : `Question ${currentQuestion + 1} of ${quizQuestions.length}`}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <AnimatePresence mode="wait">
        {!showResults ? (
          // Quiz Questions
          <motion.div
            key={currentQuestion}
            initial={shouldReduceMotion ? {} : { opacity: 0, x: 20 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
            exit={shouldReduceMotion ? {} : { opacity: 0, x: -20 }}
            transition={shouldReduceMotion ? {} : { duration: 0.3 }}
          >
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl">{question.question}</CardTitle>
                {question.description && (
                  <CardDescription className="text-base mt-2">
                    {question.description}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className="space-y-3">
                {question.answers.map((answer, index) => (
                  <motion.div
                    key={index}
                    initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
                    animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                    transition={shouldReduceMotion ? {} : { delay: index * 0.05 }}
                  >
                    <Card
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedAnswer === index
                          ? 'ring-2 ring-primary border-primary'
                          : 'hover:border-primary/50'
                      }`}
                      onClick={() => handleAnswerSelect(index)}
                    >
                      <CardContent className="flex items-center justify-between p-4">
                        <span className="text-base">{answer.text}</span>
                        {selectedAnswer === index && (
                          <CheckCircle className="h-5 w-5 text-primary" />
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentQuestion === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={selectedAnswer === null}
              >
                {currentQuestion === quizQuestions.length - 1 ? 'See Results' : 'Next'}
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        ) : (
          // Results
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.95 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
            transition={shouldReduceMotion ? {} : { duration: 0.5 }}
          >
            {/* Results Header with Share */}
            <Card className="mb-8 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="text-center py-8">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Target className="h-8 w-8 text-primary" />
                  <h2 className="text-2xl font-bold">Your Personalized Stack</h2>
                </div>
                <p className="text-muted-foreground mb-6">
                  Based on your answers, here are the top 3 AI tools that match your needs:
                </p>
                <div className="flex justify-center gap-4 flex-wrap mb-6">
                  {quizResult?.topDimensions.map(dim => (
                    <Badge key={dim} variant="secondary" className="text-sm">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {dim}
                    </Badge>
                  ))}
                </div>

                {/* Share Buttons */}
                <div className="flex justify-center gap-3">
                  <Button variant="outline" onClick={handleShare}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share My Stack
                  </Button>
                  <Button variant="outline" onClick={handleDownload} disabled={downloading}>
                    <Download className="h-4 w-4 mr-2" />
                    {downloading ? 'Generating...' : 'Download Poster'}
                  </Button>
                  {shareUrl && (
                    <Button variant="ghost" onClick={() => navigator.clipboard.writeText(shareUrl)}>
                      <Link2 className="h-4 w-4 mr-2" />
                      Copy Link
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Wrong Answers Review */}
            {wrongAnswers.length > 0 && !showWrongAnswers && (
              <Card className="mb-6 border-orange-200 bg-orange-50">
                <CardContent className="py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Info className="h-5 w-5 text-orange-600" />
                      <span className="font-medium">
                        You might want to explore {wrongAnswers.length} area{wrongAnswers.length > 1 ? 's' : ''} further
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowWrongAnswers(true)}
                    >
                      Review Answers
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Wrong Answers Details */}
            {showWrongAnswers && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <XCircle className="h-5 w-5 text-red-500" />
                    Areas to Explore
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {wrongAnswers.map((wa, index) => {
                    const q = quizQuestions[wa.questionIndex]
                    return (
                      <div key={index} className="space-y-2">
                        <p className="font-medium text-sm">{q.question}</p>
                        <p className="text-sm text-muted-foreground">
                          Your answer: {q.answers[wa.selectedAnswer].text}
                        </p>
                        <Button variant="ghost" size="sm" asChild className="h-auto p-0">
                          <Link href={`/tools?category=${q.category || 'all'}`}>
                            Learn more about {q.category || 'related tools'} →
                          </Link>
                        </Button>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            )}

            {/* Recommended Tools */}
            <div className="space-y-6 mb-8">
              {recommendations.slice(0, 3).map((tool, index) => (
                <motion.div
                  key={tool.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={index === 0 ? 'border-primary shadow-lg' : ''}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`text-2xl font-bold ${
                              index === 0 ? 'text-primary' : 'text-muted-foreground'
                            }`}>
                              #{index + 1}
                            </div>
                            <div>
                              <CardTitle className="text-xl">
                                {tool.name}
                                {index === 0 && (
                                  <Badge className="ml-2" variant="default">
                                    Best Match
                                  </Badge>
                                )}
                              </CardTitle>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline">{tool.category}</Badge>
                                <span className="text-sm text-muted-foreground">
                                  {getMatchPercentage(tool.score)}% match
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <CardDescription className="text-base">
                        {tool.blurb}
                      </CardDescription>

                      {/* Match Reasons */}
                      <div className="space-y-2">
                        <div className="text-sm font-medium">Why it's recommended:</div>
                        <ul className="space-y-1">
                          {tool.matchReasons.map((reason, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <Zap className="h-3 w-3 text-primary shrink-0 mt-0.5" />
                              <span>{reason}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tool Badges */}
                      {tool.badges && tool.badges.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {tool.badges.map(badge => (
                            <Badge key={badge} variant="secondary" className="text-xs">
                              {badge}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Pricing */}
                      <div className="text-sm text-muted-foreground">
                        <strong>Pricing:</strong> {tool.pricingNote}
                      </div>

                      {/* CTAs */}
                      <div className="flex gap-3">
                        <Button asChild className="flex-1">
                          <a
                            href={`${tool.affiliateUrl}${tool.affiliateUrl.includes('?') ? '&' : '?'}utm_source=agentmastery&utm_medium=quiz&utm_campaign=tool-matcher`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2"
                          >
                            Try {tool.name} Now
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                        <Button variant="outline" asChild>
                          <Link href={`/tools/${tool.slug}`}>
                            Learn More
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" onClick={handleRestart} className="flex items-center gap-2">
                <RotateCw className="h-4 w-4" />
                Retake Quiz
              </Button>
              <Button asChild>
                <Link href="/tools" className="flex items-center gap-2">
                  Browse All Tools
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Achievements Section */}
            {streakData && streakData.badges.length > 0 && (
              <Card className="mt-8 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
                <CardContent className="py-6 text-center">
                  <Trophy className="h-8 w-8 text-yellow-600 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Your Achievements</h3>
                  <div className="flex justify-center gap-4 flex-wrap">
                    {streakData.badges.map(badge => {
                      const milestone = Object.values(BADGE_MILESTONES).find(m => m.name === badge)
                      return (
                        <div key={badge} className="flex flex-col items-center">
                          <span className="text-3xl mb-1">{milestone?.icon}</span>
                          <span className="text-xs text-muted-foreground">{badge}</span>
                        </div>
                      )
                    })}
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">
                    Total quizzes taken: {streakData.totalQuizzes}
                  </p>
                </CardContent>
              </Card>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}