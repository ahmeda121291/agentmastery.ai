'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  getRandomQuestions,
  calculateQuizResult,
  getAchievementLevel,
  type QuizQuestion
} from '@/src/data/popquiz'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Brain,
  Clock,
  CheckCircle,
  XCircle,
  Trophy,
  Timer,
  RotateCw,
  ExternalLink,
  TrendingUp,
  Lightbulb,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'
import confetti from 'canvas-confetti'

const QUIZ_DURATION = 60 // 60 seconds
const QUESTION_COUNT = 10
const POINTS_CORRECT = 10
const POINTS_WRONG = -2 // Light negative marking
const POINTS_SKIP = 0

interface QuizStats {
  correct: number
  wrong: number
  skipped: number
  score: number
  timeUsed: number
  missedTopics: string[]
}

export default function PopQuizPage() {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'finished' | 'review'>('start')
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [timeRemaining, setTimeRemaining] = useState(QUIZ_DURATION)
  const [showExplanation, setShowExplanation] = useState(false)
  const [stats, setStats] = useState<QuizStats | null>(null)
  const [showReview, setShowReview] = useState(false)

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

  const startQuiz = () => {
    const quizQuestions = getRandomQuestions(QUESTION_COUNT)
    setQuestions(quizQuestions)
    setAnswers(new Array(QUESTION_COUNT).fill(null))
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

    // Show explanation briefly
    setShowExplanation(true)

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setSelectedAnswer(null)
        setShowExplanation(false)
      } else {
        finishQuiz()
      }
    }, 2000)
  }

  const calculateStats = (): QuizStats => {
    let correct = 0
    let wrong = 0
    let skipped = 0
    let score = 0
    const missedTopics = new Set<string>()

    questions.forEach((q, index) => {
      const answer = answers[index]
      if (answer === null) {
        skipped++
        missedTopics.add(q.category)
      } else if (answer === q.correctAnswer) {
        correct++
        score += POINTS_CORRECT
      } else {
        wrong++
        score += POINTS_WRONG
        missedTopics.add(q.category)
      }
    })

    return {
      correct,
      wrong,
      skipped,
      score: Math.max(0, score), // Don't go below 0
      timeUsed: QUIZ_DURATION - timeRemaining,
      missedTopics: Array.from(missedTopics)
    }
  }

  const finishQuiz = () => {
    const finalStats = calculateStats()
    setStats(finalStats)
    setGameState('finished')

    // Calculate score for confetti
    const percentage = (finalStats.score / (QUESTION_COUNT * POINTS_CORRECT)) * 100
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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const currentQuestion = questions[currentQuestionIndex]
  const progress = gameState === 'playing'
    ? ((currentQuestionIndex + 1) / questions.length) * 100
    : 100

  const result = gameState === 'finished' ? calculateQuizResult(questions, answers) : null
  const achievement = result ? getAchievementLevel(result.percentage) : null

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Brain className="h-8 w-8 text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold">AI Sales Pop Quiz</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Test your knowledge of AI sales tools in this 2-minute challenge!
        </p>
      </div>

      <AnimatePresence mode="wait">
        {/* Start Screen */}
        {gameState === 'start' && (
          <motion.div
            key="start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Ready to Test Your Knowledge?</CardTitle>
                <CardDescription>
                  10 questions • 2 minutes • Multiple choice
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <Lightbulb className="h-4 w-4" />
                  <AlertDescription>
                    Answer questions about AI sales tools, best practices, and industry stats.
                    We'll recommend tools based on what you might not know!
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-3 gap-4 py-4">
                  <div className="text-center">
                    <Timer className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm font-medium">Timed</p>
                    <p className="text-xs text-muted-foreground">2 minutes</p>
                  </div>
                  <div className="text-center">
                    <Brain className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm font-medium">10 Questions</p>
                    <p className="text-xs text-muted-foreground">Random selection</p>
                  </div>
                  <div className="text-center">
                    <Trophy className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm font-medium">Get Ranked</p>
                    <p className="text-xs text-muted-foreground">See your level</p>
                  </div>
                </div>

                <Button onClick={startQuiz} size="lg" className="w-full">
                  Start Quiz
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
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
            {/* Timer and Progress */}
            <Card className="mb-6">
              <CardContent className="py-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Clock className={`h-4 w-4 ${timeRemaining < 30 ? 'text-red-500' : 'text-muted-foreground'}`} />
                    <span className={`font-mono text-lg ${timeRemaining < 30 ? 'text-red-500 font-bold' : ''}`}>
                      {formatTime(timeRemaining)}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
              </CardContent>
            </Card>

            {/* Question */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {currentQuestion.options.map((option, index) => {
                  const isCorrect = index === currentQuestion.correctAnswer
                  const isSelected = index === selectedAnswer
                  const showResult = showExplanation

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card
                        className={`cursor-pointer transition-all ${
                          !showResult && isSelected
                            ? 'ring-2 ring-primary border-primary'
                            : !showResult
                            ? 'hover:border-primary/50'
                            : ''
                        } ${
                          showResult && isCorrect
                            ? 'bg-green-50 dark:bg-green-950/20 border-green-500'
                            : showResult && isSelected && !isCorrect
                            ? 'bg-red-50 dark:bg-red-950/20 border-red-500'
                            : ''
                        }`}
                        onClick={() => handleAnswerSelect(index)}
                      >
                        <CardContent className="p-4 flex items-center justify-between">
                          <span>{option}</span>
                          {showResult && isCorrect && (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          )}
                          {showResult && isSelected && !isCorrect && (
                            <XCircle className="h-5 w-5 text-red-600" />
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}

                {/* Explanation */}
                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Alert className="mt-4">
                      <Lightbulb className="h-4 w-4" />
                      <AlertDescription>{currentQuestion.explanation}</AlertDescription>
                    </Alert>
                  </motion.div>
                )}

                {/* Next Button */}
                {!showExplanation && (
                  <Button
                    onClick={handleNextQuestion}
                    disabled={selectedAnswer === null}
                    className="w-full"
                  >
                    {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Results Screen */}
        {gameState === 'finished' && result && achievement && (
          <motion.div
            key="finished"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Score Card */}
            <Card className="mb-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="py-8 text-center">
                <div className="text-6xl mb-2">{achievement.emoji}</div>
                <h2 className="text-2xl font-bold mb-2">{achievement.level}</h2>
                <p className="text-muted-foreground mb-4">{achievement.message}</p>

                <div className="flex justify-center gap-8 mb-4">
                  <div>
                    <p className="text-3xl font-bold">{result.score}/{result.totalQuestions}</p>
                    <p className="text-sm text-muted-foreground">Correct</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold">{result.percentage}%</p>
                    <p className="text-sm text-muted-foreground">Score</p>
                  </div>
                </div>

                <Button onClick={startQuiz} variant="outline">
                  <RotateCw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
              </CardContent>
            </Card>

            {/* Recommended Tools */}
            {result.recommendedTools.length > 0 && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Recommended Tools Based on Your Answers
                  </CardTitle>
                  <CardDescription>
                    These tools can help you master the areas you missed
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {result.recommendedTools.map((tool) => (
                    <div key={tool.slug} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{tool.name}</h4>
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/tools/${tool.slug}`}>
                            Learn More
                            <ExternalLink className="ml-2 h-3 w-3" />
                          </Link>
                        </Button>
                      </div>
                      <ul className="space-y-1">
                        {tool.reasons.map((reason, i) => (
                          <li key={i} className="text-sm text-muted-foreground">
                            • {reason}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Questions Review */}
            <Card>
              <CardHeader>
                <CardTitle>Review Your Answers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {questions.map((question, index) => {
                  const userAnswer = answers[index]
                  const isCorrect = userAnswer === question.correctAnswer

                  return (
                    <div key={question.id} className="space-y-2">
                      <div className="flex items-start gap-2">
                        {isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium text-sm">{question.question}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Your answer: {userAnswer !== null ? question.options[userAnswer] : 'Not answered'}
                          </p>
                          {!isCorrect && (
                            <p className="text-sm text-green-600 mt-1">
                              Correct: {question.options[question.correctAnswer]}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}