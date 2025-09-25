'use client'

import { useState } from 'react'
import ArcadeCalc from '@/components/ArcadeCalc'
import InlineCTA from '@/components/InlineCTA'
import ShareResults from '@/components/ShareResults'
import RelatedCalculators from '@/components/RelatedCalculators'
import ScenarioComparison from '@/components/ScenarioComparison'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Video, DollarSign, Zap } from 'lucide-react'

type CalcValues = {
  videosPerMonth: number
  avgLength: number
  editorRate: number
  voiceoverCost: number
  stockFootageCost: number
  aiToolCost: number
}

export default function VideoProductionCostCalculator() {
  const [currentInputs, setCurrentInputs] = useState<CalcValues>({
    videosPerMonth: 10,
    avgLength: 5,
    editorRate: 75,
    voiceoverCost: 150,
    stockFootageCost: 100,
    aiToolCost: 89
  })
  const [currentResults, setCurrentResults] = useState<Record<string, any>>({})
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Direct Answer for AEO */}
      <div className="max-w-4xl mx-auto mb-8">
        <Card className="p-6 border-emerald-200 bg-emerald-50/50">
          <p className="text-sm font-medium mb-2">Quick Answer:</p>
          <p className="text-sm">
            AI video tools reduce production costs by 70-90%. Traditional video production
            costs $1,000-$5,000 per video, while AI tools can produce similar quality
            for $30-$200 per video, depending on complexity.
          </p>
        </Card>
      </div>

      <ArcadeCalc<CalcValues>
        title="Video Production Cost Calculator"
        description="Compare traditional video production costs vs AI-powered alternatives"
        inputs={[
          {
            key: 'videosPerMonth',
            label: 'Videos Per Month',
            type: 'number',
            min: 0,
            step: 1,
            defaultValue: 10,
            helpText: 'Monthly production volume'
          },
          {
            key: 'avgLength',
            label: 'Average Video Length (minutes)',
            type: 'number',
            min: 0,
            step: 1,
            defaultValue: 5,
            helpText: 'Typical video duration'
          },
          {
            key: 'editorRate',
            label: 'Editor Hourly Rate ($)',
            type: 'number',
            min: 0,
            step: 10,
            defaultValue: 75,
            helpText: 'Professional editor cost'
          },
          {
            key: 'voiceoverCost',
            label: 'Voiceover Cost Per Video ($)',
            type: 'number',
            min: 0,
            step: 10,
            defaultValue: 150,
            helpText: 'Professional VO artist'
          },
          {
            key: 'stockFootageCost',
            label: 'Stock/Assets Per Video ($)',
            type: 'number',
            min: 0,
            step: 10,
            defaultValue: 100,
            helpText: 'Music, footage, graphics'
          },
          {
            key: 'aiToolCost',
            label: 'AI Tool Monthly Cost ($)',
            type: 'number',
            min: 0,
            step: 10,
            defaultValue: 89,
            helpText: 'AI video platform subscription'
          }
        ]}
        compute={(values) => {
          setCurrentInputs(values)
          // Traditional costs
          const hoursPerVideo = values.avgLength * 3 // Rough estimate: 3 hours editing per minute
          const editingCostPerVideo = hoursPerVideo * values.editorRate
          const traditionalPerVideo = editingCostPerVideo + values.voiceoverCost + values.stockFootageCost
          const traditionalMonthly = traditionalPerVideo * values.videosPerMonth

          // AI costs
          const aiPerVideo = values.videosPerMonth > 0
            ? values.aiToolCost / values.videosPerMonth
            : 0
          const aiMonthly = values.aiToolCost

          // Savings
          const savingsPerVideo = traditionalPerVideo - aiPerVideo
          const savingsMonthly = traditionalMonthly - aiMonthly
          const savingsAnnual = savingsMonthly * 12
          const savingsPercent = traditionalMonthly > 0
            ? ((savingsMonthly / traditionalMonthly) * 100)
            : 0

          const results = {
            traditionalPerVideo: Math.round(traditionalPerVideo),
            traditionalMonthly: Math.round(traditionalMonthly),
            aiPerVideo: Math.round(aiPerVideo),
            aiMonthly: Math.round(aiMonthly),
            savingsPerVideo: Math.round(savingsPerVideo),
            savingsMonthly: Math.round(savingsMonthly),
            savingsAnnual: Math.round(savingsAnnual),
            savingsPercent: Math.round(savingsPercent)
          }
          setCurrentResults(results)
          return results
        }}
        resultRender={(out) => (
          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-3">Traditional Production</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Cost Per Video</p>
                  <p className="text-xl font-bold">${out.traditionalPerVideo?.toLocaleString() || 0}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Cost</p>
                  <p className="text-xl font-bold">${out.traditionalMonthly?.toLocaleString() || 0}</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">AI Production</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Cost Per Video</p>
                  <p className="text-xl font-bold text-emerald-600">${out.aiPerVideo || 0}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Cost</p>
                  <p className="text-xl font-bold text-emerald-600">${out.aiMonthly || 0}</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Your Savings</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Per Video</p>
                  <p className="text-xl font-bold text-emerald-600">
                    ${out.savingsPerVideo?.toLocaleString() || 0}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Monthly</p>
                  <p className="text-xl font-bold text-emerald-600">
                    ${out.savingsMonthly?.toLocaleString() || 0}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Annual</p>
                  <p className="text-xl font-bold text-emerald-600">
                    ${out.savingsAnnual?.toLocaleString() || 0}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Savings %</p>
                  <p className="text-xl font-bold text-emerald-600">
                    {out.savingsPercent}%
                  </p>
                </div>
              </div>
            </div>

            {out.savingsPercent && typeof out.savingsPercent === 'number' && out.savingsPercent > 70 && (
              <div className="mt-4 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                <p className="text-sm text-emerald-800">
                  🎬 Massive savings! AI video production saves you {out.savingsPercent}% on costs.
                </p>
              </div>
            )}

            {out.savingsAnnual && typeof out.savingsAnnual === 'number' && out.savingsAnnual > 50000 && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  💸 You could save over ${Math.round(out.savingsAnnual / 1000)}k annually with AI video tools!
                </p>
              </div>
            )}
          </div>
        )}
      />

      {/* Cost Savings Badge */}
      {currentResults.savingsAnnual && currentResults.savingsAnnual > 100000 && (
        <div className="max-w-4xl mx-auto mt-8">
          <Card className="p-4 bg-gradient-to-r from-gold-50 to-yellow-50 border-yellow-300">
            <div className="flex items-center justify-center gap-3">
              <DollarSign className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-lg font-bold text-yellow-800">Enterprise Savings!</p>
                <p className="text-sm text-yellow-700">
                  You're saving over ${Math.round(currentResults.savingsAnnual / 1000)}k annually
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Social Proof */}
      <div className="max-w-4xl mx-auto mt-8">
        <Card className="p-4 bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Video className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium">1,500+ content teams</p>
                <p className="text-xs text-muted-foreground">Creating videos with AI</p>
              </div>
            </div>
            <Badge className="bg-orange-100 text-orange-700">
              <Zap className="h-3 w-3 mr-1" />
              Hot
            </Badge>
          </div>
        </Card>
      </div>

      {/* Scenario Comparison */}
      <div className="max-w-4xl mx-auto mt-8">
        <ScenarioComparison
          currentInputs={currentInputs}
          currentResults={currentResults}
          calculatorType="video-production-cost"
        />
      </div>

      {/* Share Results */}
      <div className="max-w-4xl mx-auto mt-8">
        <ShareResults
          title="Video Production Cost"
          results={currentResults}
          calculatorType="video-production-cost"
        />
      </div>

      {/* CTAs for relevant tools */}
      <div className="max-w-4xl mx-auto mt-8">
        <Card className="p-6 bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200">
          <h3 className="text-xl font-semibold mb-2">Recommended AI Video Tools</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Start creating professional videos at a fraction of the cost
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <InlineCTA
              href="https://www.synthesia.io/?via=agentmastery"
              label="Try Synthesia"
              track="arcade_video_synthesia"
            />
            <InlineCTA
              href="https://pictory.ai?ref=bex2x"
              label="Try Pictory"
              track="arcade_video_pictory"
            />
          </div>
        </Card>
      </div>

      {/* Related Calculators */}
      <div className="max-w-4xl mx-auto mt-8">
        <RelatedCalculators currentCalculator="video-production-cost" />
      </div>
    </div>
  )
}