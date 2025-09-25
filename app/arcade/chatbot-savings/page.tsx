'use client'

import { useState } from 'react'
import ArcadeCalc from '@/components/ArcadeCalc'
import InlineCTA from '@/components/InlineCTA'
import ShareResults from '@/components/ShareResults'
import RelatedCalculators from '@/components/RelatedCalculators'
import ScenarioComparison from '@/components/ScenarioComparison'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Bot, TrendingUp, Award } from 'lucide-react'

type CalcValues = {
  monthlyTickets: number
  avgHandleTime: number
  hourlyCost: number
  deflectionRate: number
  coverage247: number
  chatbotCost: number
}

export default function ChatbotSavingsCalculator() {
  const [currentInputs, setCurrentInputs] = useState<CalcValues>({
    monthlyTickets: 1000,
    avgHandleTime: 15,
    hourlyCost: 25,
    deflectionRate: 40,
    coverage247: 1.5,
    chatbotCost: 99
  })
  const [currentResults, setCurrentResults] = useState<Record<string, any>>({})
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Direct Answer for AEO */}
      <div className="max-w-4xl mx-auto mb-8">
        <Card className="p-6 border-emerald-200 bg-emerald-50/50">
          <p className="text-sm font-medium mb-2">Quick Answer:</p>
          <p className="text-sm">
            AI chatbots typically save businesses 30-60% on support costs.
            A company handling 1000 tickets/month can save $10,000-$20,000 monthly
            by deflecting 40% of queries with a chatbot.
          </p>
        </Card>
      </div>

      <ArcadeCalc<CalcValues>
        title="Chatbot Savings Calculator"
        description="Calculate how much you can save with AI-powered customer support"
        inputs={[
          {
            key: 'monthlyTickets',
            label: 'Support Tickets Per Month',
            type: 'number',
            min: 0,
            step: 50,
            defaultValue: 1000,
            helpText: 'Total customer inquiries'
          },
          {
            key: 'avgHandleTime',
            label: 'Average Handle Time (minutes)',
            type: 'number',
            min: 0,
            step: 1,
            defaultValue: 15,
            helpText: 'Time per ticket resolution'
          },
          {
            key: 'hourlyCost',
            label: 'Support Agent Hourly Cost ($)',
            type: 'number',
            min: 0,
            step: 5,
            defaultValue: 25,
            helpText: 'Including overhead'
          },
          {
            key: 'deflectionRate',
            label: 'Chatbot Deflection Rate (%)',
            type: 'number',
            min: 0,
            max: 100,
            step: 5,
            defaultValue: 40,
            helpText: 'Queries resolved by bot'
          },
          {
            key: 'coverage247',
            label: 'After-Hours Coverage Factor',
            type: 'number',
            min: 1,
            max: 3,
            step: 0.1,
            defaultValue: 1.5,
            helpText: '1.5x = 50% more coverage'
          },
          {
            key: 'chatbotCost',
            label: 'Monthly Chatbot Cost ($)',
            type: 'number',
            min: 0,
            step: 10,
            defaultValue: 99,
            helpText: 'Chatbot subscription'
          }
        ]}
        compute={(values) => {
          setCurrentInputs(values)
          const totalHours = (values.monthlyTickets * values.avgHandleTime) / 60
          const currentCost = totalHours * values.hourlyCost
          const deflectedTickets = values.monthlyTickets * (values.deflectionRate / 100)
          const deflectedHours = (deflectedTickets * values.avgHandleTime) / 60
          const hoursSaved = deflectedHours * values.coverage247
          const moneySaved = hoursSaved * values.hourlyCost
          const netSavings = moneySaved - values.chatbotCost
          const roi = values.chatbotCost > 0
            ? ((netSavings / values.chatbotCost) * 100)
            : 0
          const payback = values.chatbotCost > 0 && netSavings > 0
            ? (values.chatbotCost / (netSavings / 30))
            : 0

          const results = {
            totalHours: Math.round(totalHours),
            currentCost: Math.round(currentCost),
            deflectedTickets: Math.round(deflectedTickets),
            hoursSaved: Math.round(hoursSaved),
            moneySaved: Math.round(moneySaved),
            netSavings: Math.round(netSavings),
            roi: Math.round(roi),
            payback: Math.round(payback * 10) / 10
          }
          setCurrentResults(results)
          return results
        }}
        resultRender={(out) => (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Current Cost/Month</p>
                <p className="text-2xl font-bold">${out.currentCost?.toLocaleString() || 0}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Deflected Tickets</p>
                <p className="text-2xl font-bold">{out.deflectedTickets}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Hours Saved</p>
                <p className="text-2xl font-bold">{out.hoursSaved}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Money Saved</p>
                <p className="text-2xl font-bold text-emerald-600">
                  ${out.moneySaved?.toLocaleString() || 0}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Net Savings</p>
                <p className="text-2xl font-bold text-emerald-600">
                  ${out.netSavings?.toLocaleString() || 0}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Payback (days)</p>
                <p className="text-2xl font-bold">{out.payback || '—'}</p>
              </div>
            </div>

            {out.netSavings && typeof out.netSavings === 'number' && out.netSavings > 5000 && (
              <div className="mt-4 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                <p className="text-sm text-emerald-800">
                  💰 Significant savings! You could save over ${Math.round(out.netSavings * 12 / 1000)}k annually.
                </p>
              </div>
            )}

            {out.roi && typeof out.roi === 'number' && out.roi > 1000 && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  🚀 {Math.round(out.roi / 100)}x ROI - Chatbot implementation is highly recommended!
                </p>
              </div>
            )}
          </div>
        )}
      />

      {/* Achievement Badge */}
      {currentResults.roi && currentResults.roi > 500 && (
        <div className="max-w-4xl mx-auto mt-8">
          <Card className="p-4 bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-300">
            <div className="flex items-center justify-center gap-3">
              <Award className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-lg font-bold text-yellow-800">ROI Champion!</p>
                <p className="text-sm text-yellow-700">
                  Your {currentResults.roi}% ROI qualifies for enterprise-grade automation
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Social Proof */}
      <div className="max-w-4xl mx-auto mt-8">
        <Card className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bot className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium">3,200+ support teams</p>
                <p className="text-xs text-muted-foreground">Have automated with AI chatbots</p>
              </div>
            </div>
            <Badge className="bg-purple-100 text-purple-700">
              <TrendingUp className="h-3 w-3 mr-1" />
              Trending
            </Badge>
          </div>
        </Card>
      </div>

      {/* Scenario Comparison */}
      <div className="max-w-4xl mx-auto mt-8">
        <ScenarioComparison
          currentInputs={currentInputs}
          currentResults={currentResults}
          calculatorType="chatbot-savings"
        />
      </div>

      {/* Share Results */}
      <div className="max-w-4xl mx-auto mt-8">
        <ShareResults
          title="Chatbot Savings"
          results={currentResults}
          calculatorType="chatbot-savings"
        />
      </div>

      {/* CTAs for relevant tools */}
      <div className="max-w-4xl mx-auto mt-8">
        <Card className="p-6 bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200">
          <h3 className="text-xl font-semibold mb-2">Recommended Chatbot Platforms</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Start automating support with these leading platforms
          </p>
          <div className="flex justify-center gap-4">
            <InlineCTA
              href="https://customgpt.ai/?fpr=agentmastery"
              label="Try CustomGPT"
              track="arcade_chatbot_customgpt"
            />
            <InlineCTA
              href="https://www.chatsimple.ai?via=agentmastery"
              label="Try ChatSimple"
              track="arcade_chatbot_chatsimple"
            />
          </div>
        </Card>
      </div>

      {/* Related Calculators */}
      <div className="max-w-4xl mx-auto mt-8">
        <RelatedCalculators currentCalculator="chatbot-savings" />
      </div>
    </div>
  )
}