'use client'

import { useState, useMemo } from 'react'
import { tools } from '@/src/data/tools'
import { computeScores, getRankingExplanation, categories, type ScoredTool } from '@/src/data/scores'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Trophy, Medal, Award, ChevronDown, ExternalLink, TrendingUp } from 'lucide-react'
import Link from 'next/link'

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) {
    return (
      <div className="flex items-center gap-1">
        <Trophy className="h-5 w-5 text-yellow-500 fill-yellow-500" />
        <span className="font-bold text-yellow-600">Gold</span>
      </div>
    )
  }
  if (rank === 2) {
    return (
      <div className="flex items-center gap-1">
        <Medal className="h-5 w-5 text-gray-400 fill-gray-400" />
        <span className="font-bold text-gray-600">Silver</span>
      </div>
    )
  }
  if (rank === 3) {
    return (
      <div className="flex items-center gap-1">
        <Award className="h-5 w-5 text-orange-500 fill-orange-500" />
        <span className="font-bold text-orange-600">Bronze</span>
      </div>
    )
  }
  return <span className="text-muted-foreground">#{rank}</span>
}

function DimensionBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{value}</span>
      </div>
      <Progress value={value} className="h-2" />
    </div>
  )
}

function ToolCard({ tool, category }: { tool: ScoredTool; category: string }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const explanation = getRankingExplanation(tool, category)

  return (
    <Card className={tool.rank! <= 3 ? 'border-primary/30 shadow-md' : ''}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl font-bold text-muted-foreground">
              {tool.rank}
            </div>
            <div>
              <CardTitle className="flex items-center gap-2">
                {tool.name}
                {tool.rank! <= 3 && <RankBadge rank={tool.rank!} />}
              </CardTitle>
              <CardDescription className="mt-1">
                Score: {tool.totalScore}/100
              </CardDescription>
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" asChild>
              <Link href={`/tools/${tool.slug}`}>
                View Details
              </Link>
            </Button>
            <Button size="sm" asChild>
              <a
                href={tool.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1"
              >
                Try Now
                <ExternalLink className="h-3 w-3" />
              </a>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Dimension Scores */}
        <div className="grid grid-cols-2 gap-4">
          <DimensionBar label="Value" value={Math.round(tool.dimensions.value)} color="blue" />
          <DimensionBar label="Quality" value={Math.round(tool.dimensions.quality)} color="green" />
          <DimensionBar label="Momentum" value={Math.round(tool.dimensions.momentum)} color="purple" />
          <DimensionBar label="User Experience" value={Math.round(tool.dimensions.ux)} color="orange" />
        </div>

        {/* Tool Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {tool.blurb}
        </p>

        {/* Badges */}
        {tool.badges && tool.badges.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tool.badges.map(badge => (
              <Badge key={badge} variant="secondary" className="text-xs">
                {badge}
              </Badge>
            ))}
          </div>
        )}

        {/* Why This Ranking */}
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-full justify-between">
              Why this ranking?
              <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3 space-y-2">
            <div className="rounded-lg bg-muted/50 p-4 space-y-2">
              <h4 className="font-medium text-sm flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Ranking Factors
              </h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {explanation.map((factor, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  )
}

export default function LeaderboardsPage() {
  const [selectedCategory, setSelectedCategory] = useState('Writing/SEO')

  const scoredTools = useMemo(() => {
    return computeScores(tools)
  }, [])

  // Get unique categories that have tools
  const availableCategories = useMemo(() => {
    return Object.keys(scoredTools).sort()
  }, [scoredTools])

  const currentCategoryTools = scoredTools[selectedCategory] || []
  const topTenTools = currentCategoryTools.slice(0, 10)

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">AI Tools Leaderboards</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Data-driven rankings based on value, quality, market momentum, and user experience.
          No bias, just facts.
        </p>
      </div>

      {/* Category Tabs */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
        <div className="overflow-x-auto pb-2">
          <TabsList className="inline-flex w-max min-w-full justify-start">
            {availableCategories.map(category => (
              <TabsTrigger
                key={category}
                value={category}
                className="whitespace-nowrap"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {availableCategories.map(category => (
          <TabsContent key={category} value={category} className="mt-8 space-y-4">
            {/* Category Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">
                Top {category} Tools
              </h2>
              <p className="text-muted-foreground">
                {scoredTools[category]?.length || 0} tools evaluated across 4 key dimensions
              </p>
            </div>

            {/* Top 10 Rankings */}
            <div className="space-y-4">
              {scoredTools[category]?.slice(0, 10).map(tool => (
                <ToolCard
                  key={tool.slug}
                  tool={tool}
                  category={category}
                />
              ))}
            </div>

            {/* View All Tools CTA */}
            {scoredTools[category]?.length > 10 && (
              <div className="text-center pt-6">
                <Button variant="outline" asChild>
                  <Link href={`/tools?category=${encodeURIComponent(category)}`}>
                    View All {category} Tools ({scoredTools[category].length} total)
                  </Link>
                </Button>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* Methodology Note */}
      <Card className="mt-12 bg-muted/50">
        <CardHeader>
          <CardTitle className="text-lg">About Our Rankings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">
            Our leaderboards use a deterministic scoring algorithm that evaluates tools across four key dimensions:
          </p>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <div>
              <strong>📊 Value:</strong> Cost-effectiveness and ROI based on pricing and features
            </div>
            <div>
              <strong>✨ Quality:</strong> Accuracy, reliability, and output quality indicators
            </div>
            <div>
              <strong>🚀 Momentum:</strong> Market adoption, growth trajectory, and popularity
            </div>
            <div>
              <strong>🎯 UX:</strong> User experience, ease of use, and setup complexity
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            Each category has custom-weighted dimensions based on what matters most for that use case.
            Rankings are updated regularly as we add new tools and refine our scoring model.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}