'use client'

import { useState } from 'react'
import ArcadeCalc from '@/components/ArcadeCalc'
import InlineCTA from '@/components/InlineCTA'
import ShareResults from '@/components/ShareResults'
import RelatedCalculators from '@/components/RelatedCalculators'
import ScenarioComparison from '@/components/ScenarioComparison'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Metadata } from 'next'
import { Sparkles, TrendingUp, Users } from 'lucide-react'

type CalcValues = {
  emailsPerMonth: number
  connectRate: number
  meetingsBooked: number
  winRate: number
  averageDealSize: number
  costPerTool: number
}

export default function ColdEmailROICalculator() {
  const [currentInputs, setCurrentInputs] = useState<CalcValues>({
    emailsPerMonth: 1000,
    connectRate: 5,
    meetingsBooked: 40,
    winRate: 20,
    averageDealSize: 5000,
    costPerTool: 97
  })
  const [currentResults, setCurrentResults] = useState<Record<string, any>>({})
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Direct Answer for AEO */}
      <div className="max-w-4xl mx-auto mb-8">
        <Card className="p-6 border-emerald-200 bg-emerald-50/50">
          <p className="text-sm font-medium mb-2">Quick Answer:</p>
          <p className="text-sm">
            Cold email ROI typically ranges from 200-500% when properly executed.
            A typical SDR sending 1000 emails/month with a 2% meeting rate and 20% close rate
            can generate $20,000-$50,000 in pipeline value.
          </p>
        </Card>
      </div>

      <ArcadeCalc<CalcValues>
        title="Cold Email ROI Calculator"
        description="Calculate your potential return on investment from cold email campaigns"
        inputs={[
          {
            key: 'emailsPerMonth',
            label: 'Emails Sent Per Month',
            type: 'number',
            min: 0,
            step: 100,
            defaultValue: 1000,
            helpText: 'Total outreach volume'
          },
          {
            key: 'connectRate',
            label: 'Response Rate (%)',
            type: 'number',
            min: 0,
            max: 100,
            step: 0.5,
            defaultValue: 5,
            helpText: 'Percentage who respond'
          },
          {
            key: 'meetingsBooked',
            label: 'Meeting Booking Rate (%)',
            type: 'number',
            min: 0,
            max: 100,
            step: 0.5,
            defaultValue: 40,
            helpText: 'From responses to meetings'
          },
          {
            key: 'winRate',
            label: 'Close Rate (%)',
            type: 'number',
            min: 0,
            max: 100,
            step: 1,
            defaultValue: 20,
            helpText: 'Meetings to closed deals'
          },
          {
            key: 'averageDealSize',
            label: 'Average Deal Size ($)',
            type: 'number',
            min: 0,
            step: 100,
            defaultValue: 5000,
            helpText: 'Average contract value'
          },
          {
            key: 'costPerTool',
            label: 'Monthly Tool Cost ($)',
            type: 'number',
            min: 0,
            step: 10,
            defaultValue: 97,
            helpText: 'Email tool subscription'
          }
        ]}
        compute={(values) => {
          setCurrentInputs(values)
          const responses = values.emailsPerMonth * (values.connectRate / 100)
          const meetings = responses * (values.meetingsBooked / 100)
          const closedDeals = meetings * (values.winRate / 100)
          const revenue = closedDeals * values.averageDealSize
          const roi = values.costPerTool > 0
            ? ((revenue - values.costPerTool) / values.costPerTool) * 100
            : 0

          const results = {
            responses: Math.round(responses),
            meetings: Math.round(meetings * 10) / 10,
            closedDeals: Math.round(closedDeals * 10) / 10,
            revenue: Math.round(revenue),
            roi: Math.round(roi),
            payback: values.costPerTool > 0 && revenue > 0
              ? Math.round(values.costPerTool / (revenue / 30) * 10) / 10
              : 0
          }
          setCurrentResults(results)
          return results
        }}
        resultRender={(out) => (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Responses</p>
                <p className="text-2xl font-bold">{out.responses}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Meetings</p>
                <p className="text-2xl font-bold">{out.meetings}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Closed Deals</p>
                <p className="text-2xl font-bold">{out.closedDeals}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                <p className="text-2xl font-bold text-emerald-600">
                  ${out.revenue?.toLocaleString() || 0}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">ROI</p>
                <p className="text-2xl font-bold text-emerald-600">
                  {out.roi}%
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Payback (days)</p>
                <p className="text-2xl font-bold">{out.payback || '—'}</p>
              </div>
            </div>

            {out.roi && typeof out.roi === 'number' && out.roi > 200 && (
              <div className="mt-4 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                <p className="text-sm text-emerald-800">
                  🎉 Excellent ROI! Your cold email campaigns are highly profitable.
                </p>
              </div>
            )}
          </div>
        )}
      />

      {/* Social Proof */}
      <div className="max-w-4xl mx-auto mt-8">
        <Card className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Join 2,847+ sales teams</p>
                <p className="text-xs text-muted-foreground">Already optimizing their cold email ROI</p>
              </div>
            </div>
            <Badge className="bg-blue-100 text-blue-700">
              <Sparkles className="h-3 w-3 mr-1" />
              Popular
            </Badge>
          </div>
        </Card>
      </div>

      {/* Scenario Comparison */}
      <div className="max-w-4xl mx-auto mt-8">
        <ScenarioComparison
          currentInputs={currentInputs}
          currentResults={currentResults}
          calculatorType="cold-email-roi"
        />
      </div>

      {/* Share Results */}
      <div className="max-w-4xl mx-auto mt-8">
        <ShareResults
          title="Cold Email ROI"
          results={currentResults}
          calculatorType="cold-email-roi"
        />
      </div>

      {/* CTAs for relevant tools */}
      <div className="max-w-4xl mx-auto mt-8">
        <Card className="p-6 bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200">
          <h3 className="text-xl font-semibold mb-2">Recommended Cold Email Tools</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Based on your ROI calculations, these tools can help you scale
          </p>
          <div className="flex justify-center gap-4">
            <InlineCTA
              href="https://instantly.ai?fp_ref=agentmastery"
              label="Try Instantly (40% off)"
              track="arcade_cold_email_instantly"
            />
            <InlineCTA
              href="https://www.smartlead.ai/?via=agentmastery"
              label="Try Smartlead"
              track="arcade_cold_email_smartlead"
            />
          </div>
        </Card>
      </div>

      {/* Related Calculators */}
      <div className="max-w-4xl mx-auto mt-8">
        <RelatedCalculators currentCalculator="cold-email-roi" />
      </div>
    </div>
  )
}