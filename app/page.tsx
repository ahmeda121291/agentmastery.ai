'use client'

import { useState, useEffect, Suspense, lazy } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  ArrowRight,
  ExternalLink,
  Star,
  TrendingUp,
  Zap,
  Shield,
  Users,
  ChevronRight,
  Sparkles,
  Target,
  Rocket,
} from 'lucide-react'
import { tools, featuredWeekly } from '@/data/tools'
import { stats } from '@/data/stats'

// Dynamic import for blob field to improve initial load
const BlobField = dynamic(() =>
  import('@/components/home/BlobField').then(mod => mod.BlobField),
  { ssr: false }
)

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
    <div className="relative">
      {/* Stacked cards effect */}
      <div className="absolute inset-0 rotate-3 bg-mist rounded-2xl" />
      <div className="absolute inset-0 -rotate-3 bg-paper rounded-2xl shadow-lg" />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentTool.slug}
          initial={{ opacity: 0, y: 20, rotate: -6 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          exit={{ opacity: 0, y: -20, rotate: 6 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <Card className="border-green/20 bg-gradient-to-br from-green/5 to-transparent">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-medium text-muted-foreground">Tool of the Week</span>
                </div>
                <Badge className="bg-green/10 text-green border-green/20">
                  {currentTool.category}
                </Badge>
              </div>

              <h3 className="font-bold text-2xl mb-3">{currentTool.name}</h3>
              <p className="text-muted-foreground mb-4 line-clamp-3">
                {currentTool.blurb}
              </p>

              {currentTool.badges && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {currentTool.badges.slice(0, 3).map((badge, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {badge}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{currentTool.pricingNote}</span>
                <Button size="sm" variant="primary" magnetic asChild>
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
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Dots indicator */}
      <div className="flex gap-1 justify-center mt-6">
        {featuredWeekly.map((_, idx) => (
          <button
            key={idx}
            className={`h-2 w-2 rounded-full transition-all ${
              idx === currentIndex ? 'bg-green w-6' : 'bg-muted-foreground/30'
            }`}
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </div>
    </div>
  )
}

function StatsMarquee() {
  const shouldReduceMotion = useReducedMotion()
  const marqueeItems = [
    { label: 'Tools Reviewed', value: '250+', icon: Zap },
    { label: 'Active Users', value: '15K+', icon: Users },
    { label: 'Saved in Costs', value: '$2.5M', icon: TrendingUp },
    { label: 'Success Rate', value: '94%', icon: Target },
    { label: 'New Tools Weekly', value: '12+', icon: Rocket },
    { label: 'Enterprise Clients', value: '180+', icon: Shield },
  ]

  return (
    <div className="ticker bg-gradient-to-r from-forest to-green text-paper py-4 overflow-hidden">
      <div className={`ticker-content ${shouldReduceMotion ? '' : 'animate-ticker'}`}>
        {/* Duplicate for seamless loop */}
        {[...marqueeItems, ...marqueeItems].map((item, idx) => (
          <div key={idx} className="flex items-center gap-3 px-8 whitespace-nowrap">
            <item.icon className="h-5 w-5 flex-shrink-0" />
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-xl">{item.value}</span>
              <span className="text-sm opacity-90">{item.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function HomePage() {
  const router = useRouter()

  // Prefetch key routes on component mount
  useEffect(() => {
    router.prefetch('/tools')
    router.prefetch('/quiz')
    router.prefetch('/leaderboards')
  }, [router])

  return (
    <div className="min-h-screen">
      {/* Split-Diagonal Hero Section */}
      <section className="relative overflow-hidden safe-area-padding">
        {/* Background with blob field */}
        <div className="absolute inset-0 bg-gradient-to-br from-mist via-paper to-mist overflow-hidden">
          <Suspense fallback={null}>
            <BlobField />
          </Suspense>
        </div>

        {/* Diagonal split container */}
        <div className="relative">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[85vh] py-20">
              {/* Left side - Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10"
              >
                <Badge className="mb-6 bg-green/10 text-green border-green/20">
                  <Sparkles className="h-3 w-3 mr-1" />
                  AI Tools Mastery Platform
                </Badge>

                <h1 className="text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-br from-forest to-green bg-clip-text text-transparent">
                  Master the Best AI Tools.
                  <br />
                  Learn, Compare,
                  <br />
                  and Stay Ahead.
                </h1>

                <p className="text-xl text-muted-foreground mb-8 max-w-lg">
                  Independent rankings, practical playbooks, and real ROI calculators.
                  Find the perfect AI tools for your workflow in minutes, not hours.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" variant="primary" magnetic asChild>
                    <Link href="/tools" className="flex items-center gap-2 touch-target">
                      Explore Tools
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="secondary" magnetic asChild>
                    <Link href="/quiz" className="flex items-center gap-2 touch-target">
                      Take the Quiz
                      <Sparkles className="h-5 w-5" />
                    </Link>
                  </Button>
                </div>

                {/* Quick stats */}
                <div className="flex gap-6 mt-12 pt-12 border-t border-mist">
                  <div>
                    <div className="text-3xl font-bold text-forest">
                      <AnimatedCounter value={250} suffix="+" />
                    </div>
                    <div className="text-sm text-muted-foreground">Tools Ranked</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-forest">
                      <AnimatedCounter value={94} suffix="%" />
                    </div>
                    <div className="text-sm text-muted-foreground">Success Rate</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-forest">
                      <AnimatedCounter value={15} suffix="K+" />
                    </div>
                    <div className="text-sm text-muted-foreground">Active Users</div>
                  </div>
                </div>
              </motion.div>

              {/* Right side - Tool of the Week */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative lg:pl-12"
              >
                <div className="relative">
                  <ToolOfTheWeek />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Diagonal divider */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-paper transform -skew-y-3 origin-bottom-left" />
        </div>
      </section>

      {/* Stats Marquee */}
      <section className="relative z-10 -mt-16">
        <StatsMarquee />
      </section>

      {/* Featured Tools Grid */}
      <section className="py-20 bg-paper relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green/20 to-transparent" />

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <Badge className="mb-4">Featured Tools</Badge>
            <h2 className="text-4xl font-bold mb-4">Top-Ranked AI Solutions</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover tools that consistently deliver results, backed by our rigorous testing
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.slice(0, 6).map((tool, idx) => (
              <motion.div
                key={tool.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <Card className="h-full">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="secondary">{tool.category}</Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-medium">4.5</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-2">{tool.name}</h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">{tool.blurb}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{tool.pricingNote}</span>
                      <Button size="sm" variant="ghost" asChild>
                        <Link href={`/tools/${tool.slug}`} className="flex items-center gap-1">
                          Learn More
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="primary" magnetic asChild>
              <Link href="/tools" className="flex items-center gap-2">
                View All Tools
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section with angle */}
      <section className="relative py-20 bg-gradient-to-br from-forest to-green text-paper overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-32 bg-paper transform skew-y-3 origin-top-right" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-4">
              Ready to Find Your Perfect AI Stack?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Take our 2-minute quiz and get personalized tool recommendations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" magnetic asChild>
                <Link href="/quiz" className="flex items-center gap-2">
                  Start Tool Matcher
                  <Sparkles className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="ghost" className="text-paper hover:bg-paper/10" asChild>
                <Link href="/calculators/roi" className="flex items-center gap-2">
                  Calculate ROI
                  <TrendingUp className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}