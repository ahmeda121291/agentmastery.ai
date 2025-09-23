'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { QUIZ_BANK, type QuizCategory, type QuizItem } from '@/data/quiz_bank'
import { loadRecentIds, saveRecentIds } from '@/lib/storage'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Brain,
  Clock,
  CheckCircle,
  XCircle,
  Trophy,
  Timer,
  RotateCw,
  Lightbulb,
  ArrowRight,
  Zap,
  Target,
  TrendingUp
} from 'lucide-react'
import Link from 'next/link'
import confetti from 'canvas-confetti'

const QUIZ_DURATION = 60 // 60 seconds
const QUESTION_COUNT = 10
const POINTS_CORRECT = 10
const POINTS_WRONG = -2
const POINTS_SKIP = 0

const CATEGORY_ICONS: Record<QuizCategory, string> = {
  "Cold Email": "📧",
  "Sales Engagement": "🎯",
  "Database": "🗄️",
  "CRM": "📊",
  "Video": "🎥",
  "Writing/SEO": "✍️",
  "Chatbots": "💬",
  "Scheduling/PM": "📅",
  "Audio/Voice": "🎙️"
}

interface QuizStats {
  correct: number
  wrong: number
  skipped: number
  score: number
  timeUsed: number
  category: QuizCategory
}

export default function PopQuizPage() {
  const [gameState, setGameState] = useState<'category' | 'playing' | 'finished'>('category')
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory | null>(null)
  const [questions, setQuestions] = useState<QuizItem[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [timeRemaining, setTimeRemaining] = useState(QUIZ_DURATION)
  const [showExplanation, setShowExplanation] = useState(false)
  const [stats, setStats] = useState<QuizStats | null>(null)
  const [sessionIds, setSessionIds] = useState<string[]>([])

  // Timer effect
  useEffect(() => {
    if (gameState === 'playing' && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (timeRemaining === 0 && gameState === 'playing') {
      finishQuiz()
    }
  }, [gameState, timeRemaining])

  const selectCategory = (category: QuizCategory) => {
    setSelectedCategory(category)
    startQuiz(category)
  }

  const getRandomQuestions = (category: QuizCategory): QuizItem[] => {
    const categoryQuestions = QUIZ_BANK[category] || []
    const recentIds = loadRecentIds(category)

    // Filter out recently seen questions
    const unseenQuestions = categoryQuestions.filter(q => !recentIds.includes(q.id))
    const availableQuestions = unseenQuestions.length >= QUESTION_COUNT
      ? unseenQuestions
      : [...unseenQuestions, ...categoryQuestions.filter(q => recentIds.includes(q.id))]

    // Shuffle and take QUESTION_COUNT
    const shuffled = [...availableQuestions].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, Math.min(QUESTION_COUNT, shuffled.length))
  }

  const startQuiz = (category: QuizCategory) => {
    const quizQuestions = getRandomQuestions(category)
    setQuestions(quizQuestions)
    setAnswers(new Array(quizQuestions.length).fill(null))
    setSessionIds(quizQuestions.map(q => q.id))
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setTimeRemaining(QUIZ_DURATION)
    setShowExplanation(false)
    setGameState('playing')
  }

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return

    // Save answer
    const newAnswers = [...answers]
    newAnswers[currentQuestionIndex] = selectedAnswer
    setAnswers(newAnswers)

    // Show explanation briefly with reduced motion support
    const motionOk = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setShowExplanation(true)

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setSelectedAnswer(null)
        setShowExplanation(false)
      } else {
        finishQuiz()
      }
    }, motionOk ? 2000 : 500)
  }

  const skipQuestion = () => {
    const newAnswers = [...answers]
    newAnswers[currentQuestionIndex] = null
    setAnswers(newAnswers)

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      finishQuiz()
    }
  }

  const calculateStats = (): QuizStats => {
    let correct = 0
    let wrong = 0
    let skipped = 0
    let score = 0

    questions.forEach((q, index) => {
      const answer = answers[index]
      if (answer === null) {
        skipped++
      } else if (answer === q.answerIdx) {
        correct++
        score += POINTS_CORRECT
      } else {
        wrong++
        score += POINTS_WRONG
      }
    })

    return {
      correct,
      wrong,
      skipped,
      score: Math.max(0, score),
      timeUsed: QUIZ_DURATION - timeRemaining,
      category: selectedCategory!
    }
  }

  const finishQuiz = () => {
    const finalStats = calculateStats()
    setStats(finalStats)
    setGameState('finished')

    // Save recent question IDs
    if (selectedCategory) {
      const recentIds = loadRecentIds(selectedCategory)
      saveRecentIds(selectedCategory, [...recentIds, ...sessionIds])
    }

    // Celebrate high scores
    const percentage = (finalStats.score / (questions.length * POINTS_CORRECT)) * 100
    if (percentage >= 70) {
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        })
      }, 300)
    }
  }

  const resetQuiz = () => {
    setGameState('category')
    setSelectedCategory(null)
    setQuestions([])
    setAnswers([])
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setTimeRemaining(QUIZ_DURATION)
    setShowExplanation(false)
    setStats(null)
    setSessionIds([])
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const currentQuestion = questions[currentQuestionIndex]
  const progress = gameState === 'playing'
    ? ((currentQuestionIndex + 1) / questions.length) * 100
    : 100

  return (
    <div className="max-w-3xl mx-auto px-6 md:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Brain className="h-8 w-8 text-green" />
          <h1 className="text-3xl md:text-4xl font-bold text-ink">AI Pop Quiz</h1>
        </div>
        <p className="text-lg text-ink/70">
          10 questions, 60 seconds—test your tool IQ!
        </p>
      </div>

      <AnimatePresence mode="wait">
        {/* Category Selection */}
        {gameState === 'category' && (
          <motion.div
            key="category"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="border-forest/20">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Choose Your Category</CardTitle>
                <CardDescription className="text-center">
                  Select a topic to test your expertise
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {(Object.keys(QUIZ_BANK) as QuizCategory[]).map((category) => (
                    <motion.button
                      key={category}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => selectCategory(category)}
                      className="p-6 bg-mist hover:bg-green/10 rounded-lg border border-forest/20 hover:border-green transition-all group"
                    >
                      <div className="text-3xl mb-2">{CATEGORY_ICONS[category]}</div>
                      <div className="font-semibold text-ink group-hover:text-green transition-colors">
                        {category}
                      </div>
                      <div className="text-xs text-ink/60 mt-1">
                        {QUIZ_BANK[category]?.length || 0} questions
                      </div>
                    </motion.button>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <Link href="/arcade">
                    <Button variant="outline" size="sm">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Back to Arcade
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Playing Screen */}
        {gameState === 'playing' && currentQuestion && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Card className="mb-6 border-forest/20">
              <CardHeader>
                <div className="flex justify-between items-center mb-4">
                  <Badge variant="secondary" className="text-sm">
                    {CATEGORY_ICONS[selectedCategory!]} {selectedCategory}
                  </Badge>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-ink/70">
                      <Target className="h-4 w-4" />
                      Question {currentQuestionIndex + 1}/{questions.length}
                    </div>
                    <Badge
                      variant={timeRemaining <= 10 ? "warning" : "outline"}
                      className={`flex items-center gap-1 ${timeRemaining <= 10 ? 'bg-red-100 text-red-700 border-red-300' : ''}`}
                    >
                      <Clock className="h-3 w-3" />
                      {formatTime(timeRemaining)}
                    </Badge>
                  </div>
                </div>
                <Progress value={progress} className="h-2" />
              </CardHeader>

              <CardContent>
                <h2 className="text-xl font-semibold mb-6">{currentQuestion.q}</h2>

                <div className="space-y-3">
                  {currentQuestion.choices.map((choice, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={showExplanation}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        showExplanation
                          ? index === currentQuestion.answerIdx
                            ? 'border-green bg-green/10'
                            : index === selectedAnswer && index !== currentQuestion.answerIdx
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-200'
                          : selectedAnswer === index
                          ? 'border-forest bg-mist'
                          : 'border-gray-200 hover:border-green hover:bg-mist/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{choice}</span>
                        {showExplanation && (
                          <>
                            {index === currentQuestion.answerIdx && (
                              <CheckCircle className="h-5 w-5 text-green" />
                            )}
                            {index === selectedAnswer && index !== currentQuestion.answerIdx && (
                              <XCircle className="h-5 w-5 text-red-500" />
                            )}
                          </>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>

                {showExplanation && currentQuestion.explain && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg"
                  >
                    <div className="flex items-start gap-2">
                      <Lightbulb className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                      <p className="text-sm text-blue-900">{currentQuestion.explain}</p>
                    </div>
                  </motion.div>
                )}

                <div className="flex justify-between mt-6">
                  <Button
                    variant="outline"
                    onClick={skipQuestion}
                    disabled={showExplanation}
                  >
                    Skip
                  </Button>
                  <Button
                    onClick={handleNextQuestion}
                    disabled={selectedAnswer === null || showExplanation}
                  >
                    {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Results Screen */}
        {gameState === 'finished' && stats && (
          <motion.div
            key="finished"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="border-forest/20">
              <CardHeader className="text-center">
                <div className="mb-4">
                  {stats.score >= 70 ? (
                    <Trophy className="h-16 w-16 text-yellow-500 mx-auto" />
                  ) : stats.score >= 50 ? (
                    <TrendingUp className="h-16 w-16 text-green mx-auto" />
                  ) : (
                    <Zap className="h-16 w-16 text-blue-500 mx-auto" />
                  )}
                </div>
                <CardTitle className="text-2xl">
                  {stats.score >= 70
                    ? `${stats.category} Master!`
                    : stats.score >= 50
                    ? `${stats.category} Proficient!`
                    : `Keep Learning ${stats.category}!`}
                </CardTitle>
                <CardDescription>
                  You scored {stats.score} points in {formatTime(stats.timeUsed)}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-green/10 rounded-lg">
                    <CheckCircle className="h-8 w-8 text-green mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green">{stats.correct}</div>
                    <div className="text-sm text-ink/70">Correct</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <XCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-red-500">{stats.wrong}</div>
                    <div className="text-sm text-ink/70">Wrong</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Timer className="h-8 w-8 text-gray-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-500">{stats.skipped}</div>
                    <div className="text-sm text-ink/70">Skipped</div>
                  </div>
                </div>

                <div className="bg-mist p-4 rounded-lg mb-6">
                  <div className="text-sm text-ink/70 mb-2">Performance Summary</div>
                  <div className="text-lg">
                    You mastered <strong>{stats.category}</strong> questions with{' '}
                    <strong>{Math.round((stats.correct / questions.length) * 100)}%</strong> accuracy
                    in <strong>{formatTime(stats.timeUsed)}</strong>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button onClick={resetQuiz} className="flex-1">
                    <RotateCw className="h-4 w-4 mr-2" />
                    Try Another Category
                  </Button>
                  <Link href="/arcade" className="flex-1">
                    <Button variant="outline" className="w-full">
                      Back to Arcade
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}