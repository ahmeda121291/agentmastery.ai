'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  PERSONALITY_QUESTIONS,
  calculatePersonalityResult,
  type PersonalityQuestion
} from '@/lib/quiz/personality'
import { track, QUIZ_EVENTS } from '@/lib/analytics'

export default function PersonalityQuizPage() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [startTime, setStartTime] = useState<number>(Date.now())
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    // Track quiz start
    track(QUIZ_EVENTS.QUIZ_STARTED, {
      quiz: 'AI Tool Personality v1',
      variant: 'default'
    })
    setStartTime(Date.now())
  }, [])

  const question = PERSONALITY_QUESTIONS[currentQuestion]
  const progress = ((currentQuestion + 1) / PERSONALITY_QUESTIONS.length) * 100

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNext = () => {
    if (selectedAnswer === null) return

    const newAnswers = [...answers, selectedAnswer]
    setAnswers(newAnswers)

    if (currentQuestion === PERSONALITY_QUESTIONS.length - 1) {
      // Calculate result
      const result = calculatePersonalityResult(newAnswers)
      const elapsed = Date.now() - startTime

      // Track completion
      track(QUIZ_EVENTS.QUIZ_COMPLETED, {
        quiz: 'AI Tool Personality v1',
        result,
        time_ms: elapsed
      })

      // Navigate to results
      router.push(`/quiz/personality/result?r=${result}`)
    } else {
      // Move to next question
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setIsAnimating(false)
      }, 300)
    }
  }

  const handleBack = () => {
    if (currentQuestion === 0) return

    setIsAnimating(true)
    setTimeout(() => {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedAnswer(answers[currentQuestion - 1] ?? null)
      setAnswers(answers.slice(0, -1))
      setIsAnimating(false)
    }, 300)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-amber-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-gradient-to-r from-violet-500 to-pink-500 text-white border-0">
            <Sparkles className="h-3 w-3 mr-1" />
            AI Personality Quiz
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            Which AI Tool Personality Are You?
          </h1>
          <p className="text-muted-foreground">
            Discover your AI archetype in 10 quick questions
          </p>
        </div>

        {/* Progress */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {PERSONALITY_QUESTIONS.length}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(progress)}% complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="max-w-2xl mx-auto p-8 backdrop-blur-sm bg-white/90 shadow-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: isAnimating ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isAnimating ? -50 : 50 }}
              transition={{ duration: 0.3 }}
            >
              {/* Question */}
              <h2 className="text-2xl font-semibold mb-8">
                {question.question}
              </h2>

              {/* Answers */}
              <div className="space-y-3">
                {question.answers.map((answer, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className={`w-full p-4 text-left rounded-xl border-2 transition-all hover:scale-[1.02] ${
                      selectedAnswer === index
                        ? 'border-violet-500 bg-violet-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg">{answer.text}</span>
                      {selectedAnswer === index && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="h-6 w-6 rounded-full bg-violet-500 flex items-center justify-center"
                        >
                          <svg
                            className="h-4 w-4 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentQuestion === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>

            <Button
              onClick={handleNext}
              disabled={selectedAnswer === null}
              className="flex items-center gap-2 bg-gradient-to-r from-violet-500 to-pink-500 text-white hover:from-violet-600 hover:to-pink-600"
            >
              {currentQuestion === PERSONALITY_QUESTIONS.length - 1 ? 'See Results' : 'Next'}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}