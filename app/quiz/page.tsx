'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { quizQuestions, calculateQuizResults } from '@/src/data/quiz'
import { recommendTools, getMatchPercentage } from '@/src/lib/recommend'
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
  RotateCw
} from 'lucide-react'
import Link from 'next/link'
import confetti from 'canvas-confetti'

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResults, setShowResults] = useState(false)

  const progress = ((currentQuestion + (showResults ? 1 : 0)) / (quizQuestions.length + 1)) * 100

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNext = () => {
    if (selectedAnswer === null) return

    const newAnswers = [...answers, selectedAnswer]
    setAnswers(newAnswers)
    setSelectedAnswer(null)

    if (currentQuestion === quizQuestions.length - 1) {
      // Last question - show results
      setShowResults(true)
      // Fire confetti
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        })
      }, 500)
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
  }

  const question = quizQuestions[currentQuestion]
  const quizResult = showResults ? calculateQuizResults(answers) : null
  const recommendations = quizResult ? recommendTools(quizResult) : []

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="h-8 w-8 text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold">AI Tool Matcher</h1>
        </div>
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
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
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
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Results Header */}
            <Card className="mb-8 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="text-center py-8">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Target className="h-8 w-8 text-primary" />
                  <h2 className="text-2xl font-bold">Your Personalized Recommendations</h2>
                </div>
                <p className="text-muted-foreground mb-6">
                  Based on your answers, here are the top 3 AI tools that match your needs:
                </p>
                <div className="flex justify-center gap-4 flex-wrap">
                  {quizResult?.topDimensions.map(dim => (
                    <Badge key={dim} variant="secondary" className="text-sm">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {dim}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recommended Tools */}
            <div className="space-y-6 mb-8">
              {recommendations.map((tool, index) => (
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
                            href={tool.affiliateUrl}
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

            {/* Help Section */}
            <Card className="mt-8 bg-muted/50">
              <CardContent className="py-6 text-center">
                <h3 className="font-semibold mb-2">Need More Help?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  These recommendations are based on your quiz answers. For a more detailed comparison or specific use cases, check out our full tools directory and leaderboards.
                </p>
                <div className="flex justify-center gap-3">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/leaderboards">View Leaderboards</Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/blog">Read Reviews</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}