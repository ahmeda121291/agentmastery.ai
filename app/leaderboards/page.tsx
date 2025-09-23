'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { tools } from '@/data/tools'
import { PRICING } from '@/data/pricing'
import {
  computeScores,
  loadLastSnapshot,
  computeDeltas,
  getTopMovers,
  getCurrentWeek,
  type CategoryScores,
  type ToolScore,
  EDITOR_CALLOUTS
} from '@/data/scores'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  Trophy,
  Medal,
  Award,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  TrendingUp,
  TrendingDown,
  Minus,
  Info,
  Sparkles,
  Zap,
  DollarSign,
  Star,
  Users,
  HandshakeIcon
} from 'lucide-react'
import Link from 'next/link'

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) {
    return (
      <div className="flex items-center gap-1">
        <Trophy className="h-5 w-5 text-yellow-500 fill-yellow-500" />
        <span className="font-bold text-yellow-600">#1</span>
      </div>
    )
  }
  if (rank === 2) {
    return (
      <div className="flex items-center gap-1">
        <Medal className="h-5 w-5 text-gray-400 fill-gray-400" />
        <span className="font-bold text-gray-600">#2</span>
      </div>
    )
  }
  if (rank === 3) {
    return (
      <div className="flex items-center gap-1">
        <Award className="h-5 w-5 text-orange-500 fill-orange-500" />
        <span className="font-bold text-orange-600">#3</span>
      </div>
    )
  }
  return <span className="text-muted-foreground font-medium">#{rank}</span>
}

function RankDelta({ delta }: { delta?: number }) {
  if (!delta || delta === 0) {
    return <Minus className="h-4 w-4 text-muted-foreground" />
  }
  if (delta > 0) {
    return (
      <div className="flex items-center gap-1 text-green-600">
        <ChevronUp className="h-4 w-4" />
        <span className="text-xs font-medium">+{delta}</span>
      </div>
    )
  }
  return (
    <div className="flex items-center gap-1 text-red-600">
      <ChevronDown className="h-4 w-4" />
      <span className="text-xs font-medium">{delta}</span>
    </div>
  )
}

function ScoreDelta({ delta }: { delta?: number }) {
  if (!delta || Math.abs(delta) < 1) return null

  if (delta > 0) {
    return (
      <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
        +{delta}
      </Badge>
    )
  }
  return (
    <Badge className="bg-red-100 text-red-700 border-red-200 text-xs">
      {delta}
    </Badge>
  )
}

function DimensionChips({ dimensions }: { dimensions: ToolScore['dimensions'] }) {
  const chips = [
    { label: 'Value', value: dimensions.value, icon: DollarSign, color: 'text-green-600' },
    { label: 'Quality', value: dimensions.quality, icon: Star, color: 'text-blue-600' },
    { label: 'Adoption', value: dimensions.adoption, icon: Users, color: 'text-purple-600' },
    { label: 'UX', value: dimensions.ux, icon: Sparkles, color: 'text-orange-600' },
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {chips.map(chip => (
        <div
          key={chip.label}
          className="flex items-center gap-1 px-2 py-1 bg-muted/50 rounded-md"
        >
          <chip.icon className={`h-3 w-3 ${chip.color}`} />
          <span className="text-xs font-medium">{chip.label}</span>
          <span className="text-xs text-muted-foreground">{chip.value}</span>
        </div>
      ))}
    </div>
  )
}

function ToolRow({ tool, isExpanded, onToggle }: {
  tool: ToolScore
  isExpanded: boolean
  onToggle: () => void
}) {
  const toolData = tools.find(t => t.slug === tool.slug)
  const pricingData = PRICING.find(t => t.slug === tool.slug)
  const isAffiliate = toolData?.affiliate || pricingData?.affiliateUrl
  const affiliateUrl = toolData?.affiliateUrl || pricingData?.affiliateUrl

  return (
    <Collapsible open={isExpanded} onOpenChange={onToggle}>
      <div className="group">
        {/* Main Row */}
        <div className="flex items-center justify-between py-2.5 px-3 hover:bg-muted/50 rounded-lg transition-colors">
          <div className="flex items-center gap-2 flex-1">
            {/* Rank */}
            <div className="w-14">
              <RankBadge rank={tool.rank || 0} />
            </div>

            {/* Rank Delta */}
            <div className="w-10">
              <RankDelta delta={tool.rankDelta} />
            </div>

            {/* Tool Name */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <Link href={`/tools/${tool.slug}`} className="font-semibold hover:text-primary truncate">
                  {tool.name}
                </Link>
                {isAffiliate && (
                  <a
                    href={affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="inline-flex items-center gap-1 px-2 py-0.5 bg-green/10 text-green border border-green/20 rounded-full text-xs font-medium hover:bg-green/20 transition-colors"
                    title="Partner tool - we may earn commission"
                  >
                    <HandshakeIcon className="h-3 w-3" />
                    Partner
                  </a>
                )}
                <ScoreDelta delta={tool.scoreDelta} />
              </div>
            </div>

            {/* Score */}
            <div className="text-right w-16">
              <div className="font-bold text-base">{tool.totalScore}</div>
              <div className="text-xs text-muted-foreground">Score</div>
            </div>

            {/* Expand Button */}
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="ml-2">
                <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
          </div>
        </div>

        {/* Expanded Content */}
        <CollapsibleContent>
          <div className="px-4 pb-4 space-y-3">
            {/* Dimensions */}
            <div>
              <p className="text-sm font-medium mb-2">Score Breakdown</p>
              <DimensionChips dimensions={tool.dimensions} />
            </div>

            {/* Explanation */}
            <div>
              <p className="text-sm font-medium mb-1">Why this ranking?</p>
              <p className="text-sm text-muted-foreground">{tool.explanation}</p>
            </div>

            {/* CTA */}
            <div className="flex gap-2">
              <Button size="sm" variant="primary" asChild>
                <Link href={`/tools/${tool.slug}`} className="flex items-center gap-1">
                  View Details
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </Button>
              {(toolData || pricingData) && (affiliateUrl || toolData?.siteUrl) && (
                <Button size="sm" variant="ghost" asChild>
                  <a
                    href={affiliateUrl || toolData?.siteUrl}
                    target="_blank"
                    rel={isAffiliate ? "noopener noreferrer sponsored" : "noopener noreferrer"}
                  >
                    {isAffiliate ? `Try ${tool.name}` : 'Visit Website'}
                  </a>
                </Button>
              )}
            </div>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  )
}

function MoversSection({ movers }: { movers: ToolScore[] }) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  if (movers.length === 0) return null

  return (
    <Card ref={sectionRef} className="mb-6 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold">Movers & Shakers</h2>
          <Badge variant="secondary">This Week</Badge>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {movers.map((tool, index) => (
            <div
              key={tool.slug}
              className="flex items-center justify-between p-3 bg-background rounded-lg transition-all duration-500"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: isVisible ? `${index * 100}ms` : '0ms'
              }}
            >
              <div>
                <Link href={`/tools/${tool.slug}`} className="font-medium hover:text-primary">
                  {tool.name}
                </Link>
                <div className="text-xs text-muted-foreground">{tool.category}</div>
              </div>
              <div className="flex items-center gap-2">
                {tool.scoreDelta && tool.scoreDelta > 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-600" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600" />
                )}
                <ScoreDelta delta={tool.scoreDelta} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}

export default function LeaderboardsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [expandedTools, setExpandedTools] = useState<Set<string>>(new Set())
  const [scores, setScores] = useState<CategoryScores[]>([])
  const [movers, setMovers] = useState<ToolScore[]>([])
  const [week, setWeek] = useState<string>('')

  useEffect(() => {
    // Merge tools from both sources
    const allTools = [...tools]

    // Add tools from pricing that aren't already in tools
    PRICING.forEach(pricingTool => {
      if (!tools.find(t => t.slug === pricingTool.slug)) {
        allTools.push({
          slug: pricingTool.slug,
          name: pricingTool.name,
          affiliateUrl: pricingTool.affiliateUrl || null,
          affiliate: !!pricingTool.affiliateUrl,
          category: pricingTool.category === 'Database' ? 'Data/Enrichment' :
                    pricingTool.category === 'Sales Engagement' ? 'Outbound/Campaigns' :
                    pricingTool.category === 'CRM' ? 'CRM/Pipeline' :
                    pricingTool.category,
          blurb: pricingTool.notes?.join('. ') || '',
          pros: pricingTool.features?.slice(0, 3) || [],
          cons: [],
          pricingNote: `$${pricingTool.seatMonthly}/month`,
          badges: pricingTool.features?.slice(0, 2) || []
        })
      }
    })

    // Compute fresh scores with all tools
    const freshScores = computeScores(allTools)

    // Try to load last snapshot and compute deltas
    const lastSnapshot = loadLastSnapshot()
    if (lastSnapshot) {
      const scoresWithDeltas = computeDeltas(freshScores, lastSnapshot.categories)
      setScores(scoresWithDeltas)
      setMovers(getTopMovers(scoresWithDeltas, 5))
    } else {
      setScores(freshScores)
    }

    setWeek(getCurrentWeek())
  }, [])

  const categories = useMemo(() => {
    const cats = ['all', ...Array.from(new Set(scores.map(s => s.category)))]
    return cats
  }, [scores])

  const toggleExpanded = (slug: string) => {
    setExpandedTools(prev => {
      const next = new Set(prev)
      if (next.has(slug)) {
        next.delete(slug)
      } else {
        next.add(slug)
      }
      return next
    })
  }

  const getToolsForCategory = (category: string) => {
    if (category === 'all') {
      // Show top tools from all categories
      const allTopTools: ToolScore[] = []
      scores.forEach(cat => {
        allTopTools.push(...cat.tools)
      })
      // Show more tools - up to 50 in the all view
      return allTopTools.sort((a, b) => b.totalScore - a.totalScore).slice(0, 50)
    }

    const categoryData = scores.find(s => s.category === category)
    // Show all tools in category, not limited
    return categoryData?.tools || []
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-6">
        <Badge className="mb-4 bg-green/10 text-green border-green/20">
          <Sparkles className="h-3 w-3 mr-1" />
          AI-Ranked • Week {week}
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight mb-4 text-center">
          AI Tool Leaderboards
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-center">
          Weekly rankings powered by our AI scoring algorithm. Tracking value, quality, adoption, and user experience.
        </p>
        <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200 max-w-2xl mx-auto">
          <p className="text-sm text-green-900 text-center">
            <strong className="font-semibold">Transparency Note:</strong> Rankings are algorithm-based and unbiased. Partner tools are clearly marked with <HandshakeIcon className="inline h-3 w-3 mx-1" /> badges but this does not affect their ranking.
          </p>
        </div>
      </div>

      {/* Movers & Shakers */}
      <MoversSection movers={movers} />

      {/* Category Tabs */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 mb-4">
          {categories.slice(0, 6).map(cat => (
            <TabsTrigger key={cat} value={cat} className="capitalize">
              {cat === 'all' ? 'All Tools' : cat}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map(category => {
          const categoryTools = getToolsForCategory(category)
          const editorCallout = category !== 'all' ? EDITOR_CALLOUTS[category] : null

          return (
            <TabsContent key={category} value={category}>
              {/* Editor Callout */}
              {editorCallout && (
                <div className="mb-6 p-4 bg-muted/50 rounded-lg border-l-4 border-primary">
                  <div className="flex gap-2">
                    <Info className="h-4 w-4 text-primary mt-0.5" />
                    <p className="text-sm italic">{editorCallout}</p>
                  </div>
                </div>
              )}

              {/* Leaderboard Table */}
              <Card className="overflow-hidden">
                <div className="p-3 sm:p-4">
                  <div className="space-y-0.5">
                    {categoryTools.map(tool => (
                      <ToolRow
                        key={tool.slug}
                        tool={tool}
                        isExpanded={expandedTools.has(tool.slug)}
                        onToggle={() => toggleExpanded(tool.slug)}
                      />
                    ))}
                  </div>
                </div>
              </Card>

              {/* Bottom CTA */}
              {category !== 'all' && (
                <div className="mt-8 text-center">
                  <p className="text-muted-foreground mb-4">
                    Want to see how these tools match your needs?
                  </p>
                  <Button variant="primary" size="lg" magnetic asChild>
                    <Link href="/quiz" className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      Take the Tool Matcher Quiz
                    </Link>
                  </Button>
                </div>
              )}
            </TabsContent>
          )
        })}
      </Tabs>

      {/* Footer Note */}
      <div className="mt-12 p-6 bg-muted/50 rounded-lg">
        <p className="text-sm text-muted-foreground mb-2 text-center">
          Rankings updated weekly based on 4 key dimensions: Value, Quality, Adoption, and UX.
        </p>
        <div className="text-center">
          <Link href="/about" className="text-sm text-primary hover:underline">
            Learn about our ranking methodology →
          </Link>
        </div>
      </div>
    </div>
  )
}