'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, ExternalLink, Star, TrendingUp } from 'lucide-react'
import { tools, featuredWeekly } from '@/src/data/tools'
import { stats } from '@/src/data/stats'

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = value / steps
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      setCount(Math.min(Math.floor(increment * currentStep), value))

      if (currentStep >= steps) {
        clearInterval(timer)
        setCount(value)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value])

  return (
    <span className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  )
}

function ToolOfTheWeek() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredWeekly.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  const currentTool = featuredWeekly[currentIndex]

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentTool.slug}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <CardTitle className="text-lg">Tool of the Week</CardTitle>
              </div>
              <Badge variant="secondary">{currentTool.category}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="font-semibold text-xl mb-2">{currentTool.name}</h3>
            <CardDescription className="mb-4 line-clamp-2">
              {currentTool.blurb}
            </CardDescription>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{currentTool.pricingNote}</span>
              <Button size="sm" asChild>
                <a
                  href={currentTool.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  Try Now
                  <ExternalLink className="h-3 w-3" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}

function LeaderboardTicker() {
  const topTools = [
    { name: 'Synthesia', category: 'Video', rank: 1 },
    { name: 'ElevenLabs', category: 'Audio', rank: 1 },
    { name: 'SmartLead', category: 'Outbound', rank: 1 },
    { name: 'Apollo', category: 'Data/Prospecting', rank: 1 },
    { name: 'Motion', category: 'Calendar/PM', rank: 1 },
    { name: 'AISEO', category: 'Writing/SEO', rank: 1 },
    { name: 'CustomGPT', category: 'Chatbots', rank: 1 },
    { name: 'Lovable', category: 'Dev/Builders', rank: 1 },
  ]

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-lg py-3">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-4 shrink-0">
          <TrendingUp className="h-4 w-4 text-primary" />
          <span className="font-semibold text-sm">Top Tools</span>
        </div>
        <div className="relative flex overflow-hidden">
          <motion.div
            className="flex gap-8 whitespace-nowrap"
            animate={{
              x: ['0%', '-50%'],
            }}
            transition={{
              x: {
                duration: 30,
                repeat: Infinity,
                ease: 'linear',
              },
            }}
          >
            {[...topTools, ...topTools].map((tool, index) => (
              <div key={index} className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  #{tool.rank} in {tool.category}
                </Badge>
                <span className="font-medium text-sm">{tool.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Animated Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-48 -left-48 w-96 h-96 bg-green-400/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -bottom-48 -right-48 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-300/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative container mx-auto px-4 py-20 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Master the Best AI Tools.
            <br />
            <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
              Learn, Compare, and Stay Ahead.
            </span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Independent rankings, practical playbooks, and interactive tools.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" asChild>
              <Link href="/tools" className="flex items-center gap-2">
                Explore Tools
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/quiz" className="flex items-center gap-2">
                Take the Quiz
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-3xl mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">
                <AnimatedCounter value={stats.toolsReviewed} suffix="+" />
              </div>
              <div className="text-sm text-muted-foreground mt-1">tools reviewed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">
                <AnimatedCounter value={stats.tacticsTested} suffix="+" />
              </div>
              <div className="text-sm text-muted-foreground mt-1">tactics tested</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">
                <AnimatedCounter value={stats.usersHelped} suffix="+" />
              </div>
              <div className="text-sm text-muted-foreground mt-1">users helped</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">
                <AnimatedCounter value={stats.hoursResearched} suffix="+" />
              </div>
              <div className="text-sm text-muted-foreground mt-1">hours researched</div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Tool of the Week */}
      <section className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-md mx-auto"
        >
          <ToolOfTheWeek />
        </motion.div>
      </section>

      {/* Leaderboard Ticker */}
      <section className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <LeaderboardTicker />
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid md:grid-cols-3 gap-6"
        >
          <Card className="group hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Independent Rankings</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Unbiased tool comparisons based on real-world testing and user feedback.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Practical Playbooks</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Step-by-step guides to implement AI tools in your workflow effectively.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Interactive Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Quizzes, calculators, and comparison tools to find your perfect AI stack.
              </CardDescription>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="text-center py-12">
              <h2 className="text-3xl font-bold mb-4">Ready to Master AI Tools?</h2>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                Join thousands of professionals who are staying ahead with the latest AI tools and strategies.
              </p>
              <Button size="lg" asChild>
                <Link href="/tools">
                  Start Exploring
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </div>
  )
}