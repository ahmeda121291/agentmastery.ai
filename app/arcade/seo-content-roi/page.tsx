'use client'

import { useState, useEffect } from 'react'
import ArcadeShell from '@/components/ArcadeShell'
import FormRow from '@/components/FormRow'
import { KPIs } from '@/components/KPIs'
import InlineCTA from '@/components/InlineCTA'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import {
  Download,
  Copy,
  RotateCcw,
  FileText,
  Eye,
  MousePointerClick,
  TrendingUp,
  Calendar
} from 'lucide-react'
import {
  money,
  pct,
  parseNumber,
  formatNumber,
  formatCompact
} from '@/lib/fmt'
import {
  toQuery,
  fromQuery,
  downloadCSV,
  copyToClipboard
} from '@/lib/share'
import Script from 'next/script'
import { createSchemaScript, faqPageSchema, breadcrumbSchema } from '@/lib/jsonld'
import { canonical } from '@/lib/seo'

// Metadata is exported from separate page file

type SeoInputs = {
  articleCost: number
  monthlyVisits: number
  ctrToPage: number
  cvrToPaid: number
  aov: number
  decayMonths: number
  maintenanceCost: number
}

const defaultInputs: SeoInputs = {
  articleCost: 300,
  monthlyVisits: 1000,
  ctrToPage: 5,
  cvrToPaid: 2,
  aov: 150,
  decayMonths: 3,
  maintenanceCost: 20
}

export default function SEOContentROICalculator() {
  const [inputs, setInputs] = useState<SeoInputs>(defaultInputs)
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState('timeline')

  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined') {
      const params = fromQuery<SeoInputs>(window.location.search)
      setInputs({ ...defaultInputs, ...params })
    }
  }, [])

  const calculate = () => {
    const ctrDecimal = inputs.ctrToPage / 100
    const cvrDecimal = inputs.cvrToPaid / 100

    const monthlyClicks = inputs.monthlyVisits * ctrDecimal
    const monthlyConversions = monthlyClicks * cvrDecimal
    const monthlyRevenue = monthlyConversions * inputs.aov
    const monthlyProfit = monthlyRevenue - inputs.maintenanceCost

    const grossPayback = monthlyRevenue > 0 ? inputs.articleCost / monthlyRevenue : Infinity
    const netPayback = monthlyProfit > 0 ? inputs.articleCost / monthlyProfit : Infinity

    // Calculate year-1 revenue with ramp-up
    let year1Revenue = 0
    for (let month = 1; month <= 12; month++) {
      let rampFactor = 1
      if (month <= inputs.decayMonths) {
        rampFactor = month / inputs.decayMonths
      }
      year1Revenue += monthlyRevenue * rampFactor
    }

    const year1Profit = year1Revenue - (inputs.maintenanceCost * 12) - inputs.articleCost
    const year1ROI = inputs.articleCost > 0 ? (year1Profit / inputs.articleCost) : 0

    // Lifetime value (3 years)
    const lifetimeRevenue = year1Revenue + (monthlyRevenue * 24)
    const lifetimeProfit = lifetimeRevenue - (inputs.maintenanceCost * 36) - inputs.articleCost

    return {
      monthlyClicks,
      monthlyConversions,
      monthlyRevenue,
      monthlyProfit,
      grossPayback,
      netPayback,
      year1Revenue,
      year1Profit,
      year1ROI,
      lifetimeRevenue,
      lifetimeProfit
    }
  }

  const results = calculate()

  const handleShare = async () => {
    const url = `${window.location.origin}/arcade/seo-content-roi?${toQuery(inputs)}`
    await copyToClipboard(url)
    alert('Share link copied to clipboard!')
  }

  const handleExport = () => {
    downloadCSV('seo-content-roi.csv', [
      {
        'Article Cost': inputs.articleCost,
        'Monthly Visits': inputs.monthlyVisits,
        'CTR to CTA (%)': inputs.ctrToPage,
        'CVR to Paid (%)': inputs.cvrToPaid,
        'AOV': inputs.aov,
        'Ramp-up Months': inputs.decayMonths,
        'Maintenance Cost': inputs.maintenanceCost,
        'Monthly Revenue': Math.round(results.monthlyRevenue),
        'Monthly Conversions': results.monthlyConversions.toFixed(1),
        'Payback Months': results.netPayback < 999 ? results.netPayback.toFixed(1) : 'Never',
        'Year 1 Revenue': Math.round(results.year1Revenue),
        'Year 1 ROI (%)': (results.year1ROI * 100).toFixed(1),
        'Lifetime Revenue (3yr)': Math.round(results.lifetimeRevenue)
      }
    ])
  }

  const handleReset = () => setInputs(defaultInputs)

  const quickAnswer = mounted
    ? `SEO content costing ${money(inputs.articleCost)} with ${formatNumber(inputs.monthlyVisits)} monthly visits achieves payback in ${
        results.netPayback < 999 ? `${results.netPayback.toFixed(1)} months` : 'over 3 years'
      } with ${money(results.year1Revenue)} year-1 revenue.`
    : ''

  // JSON-LD Schema
  const faqItems = [
    {
      question: 'What is a good payback period for SEO content?',
      answer: 'Most successful SEO content achieves payback within 6-12 months. Premium content may take longer but delivers higher lifetime value.'
    },
    {
      question: 'How do I calculate content ROI accurately?',
      answer: 'Track organic traffic, CTR to your CTAs, conversion rates, and average order value. Factor in content creation and ongoing maintenance costs.'
    },
    {
      question: 'Should I include content maintenance costs?',
      answer: 'Yes, include costs for updates, optimization, and promotion. Well-maintained content performs 2-3x better than neglected content.'
    }
  ]

  const schemaList = [
    breadcrumbSchema([
      { name: 'Home', url: canonical('/') },
      { name: 'Agent Arcade', url: canonical('/arcade') },
      { name: 'SEO Content ROI Calculator', url: canonical('/arcade/seo-content-roi') }
    ]),
    faqPageSchema(faqItems, canonical('/arcade/seo-content-roi'))
  ]

  return (
    <>
      <Script {...createSchemaScript(schemaList, 'seo-content-roi-schema')} />

      <ArcadeShell
        title="SEO Content ROI Calculator"
        subtitle="Calculate payback period and lifetime value of content investments"
        quickAnswer={quickAnswer}
      >
        <div className="space-y-8">
          {/* Input Form */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 bg-gradient-to-br from-white to-purple-50/30">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <FileText className="h-4 w-4 text-purple-600" />
                Content Investment
              </h3>
              <div className="space-y-4">
                <FormRow
                  label="Article/Content Cost"
                  suffix="USD"
                  hint="Writing, design, and editing costs"
                >
                  <Input
                    type="number"
                    value={inputs.articleCost}
                    onChange={(e) => setInputs({ ...inputs, articleCost: parseNumber(e.target.value) })}
                    min={0}
                    step={50}
                    className="font-mono"
                  />
                </FormRow>

                <FormRow
                  label="Monthly Maintenance Cost"
                  suffix="USD"
                  hint="Updates, optimization, promotion"
                >
                  <Input
                    type="number"
                    value={inputs.maintenanceCost}
                    onChange={(e) => setInputs({ ...inputs, maintenanceCost: parseNumber(e.target.value) })}
                    min={0}
                    step={10}
                    className="font-mono"
                  />
                </FormRow>

                <FormRow
                  label="Ramp-up Period"
                  suffix="months"
                  hint="Time to reach full traffic potential"
                >
                  <Input
                    type="number"
                    value={inputs.decayMonths}
                    onChange={(e) => setInputs({ ...inputs, decayMonths: parseNumber(e.target.value) })}
                    min={1}
                    max={12}
                    step={1}
                    className="font-mono"
                  />
                </FormRow>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-white to-indigo-50/30">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Eye className="h-4 w-4 text-indigo-600" />
                Traffic & Conversion
              </h3>
              <div className="space-y-4">
                <FormRow
                  label="Monthly Organic Visits"
                  suffix="visits"
                  hint="Expected traffic to the content"
                >
                  <Input
                    type="number"
                    value={inputs.monthlyVisits}
                    onChange={(e) => setInputs({ ...inputs, monthlyVisits: parseNumber(e.target.value) })}
                    min={0}
                    step={100}
                    className="font-mono"
                  />
                </FormRow>

                <FormRow
                  label="CTR to CTA/Product"
                  suffix="%"
                  hint="Click rate from content to offer"
                >
                  <Input
                    type="number"
                    value={inputs.ctrToPage}
                    onChange={(e) => setInputs({ ...inputs, ctrToPage: parseNumber(e.target.value) })}
                    min={0}
                    max={100}
                    step={0.5}
                    className="font-mono"
                  />
                </FormRow>

                <FormRow
                  label="Conversion to Paid"
                  suffix="%"
                  hint="Percentage that become customers"
                >
                  <Input
                    type="number"
                    value={inputs.cvrToPaid}
                    onChange={(e) => setInputs({ ...inputs, cvrToPaid: parseNumber(e.target.value) })}
                    min={0}
                    max={100}
                    step={0.5}
                    className="font-mono"
                  />
                </FormRow>

                <FormRow
                  label="Average Order Value"
                  suffix="USD"
                  hint="Revenue per conversion"
                >
                  <Input
                    type="number"
                    value={inputs.aov}
                    onChange={(e) => setInputs({ ...inputs, aov: parseNumber(e.target.value) })}
                    min={0}
                    step={10}
                    className="font-mono"
                  />
                </FormRow>
              </div>
            </Card>
          </div>

          {/* Results */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Results</h3>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  data-cta="arcade_share_link"
                >
                  <Copy className="h-3 w-3 mr-1" />
                  Share
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExport}
                  data-cta="arcade_export_csv"
                >
                  <Download className="h-3 w-3 mr-1" />
                  Export
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                >
                  <RotateCcw className="h-3 w-3 mr-1" />
                  Reset
                </Button>
              </div>
            </div>

            <KPIs
              items={[
                {
                  label: 'Payback Period',
                  value: results.netPayback < 999 ? `${results.netPayback.toFixed(1)} mo` : 'Never',
                  hint: results.netPayback < 12 ? 'Good' : 'Slow',
                  trend: results.netPayback < 12 ? 'up' : 'down'
                },
                {
                  label: 'Monthly Revenue',
                  value: money(results.monthlyRevenue),
                  hint: 'At steady state'
                },
                {
                  label: 'Year 1 ROI',
                  value: pct(results.year1ROI),
                  hint: results.year1ROI > 0 ? 'Profitable' : 'Loss',
                  trend: results.year1ROI > 0 ? 'up' : 'down'
                },
                {
                  label: '3-Year Value',
                  value: money(results.lifetimeRevenue),
                  hint: 'Total revenue'
                }
              ]}
            />

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="metrics">Metrics</TabsTrigger>
                <TabsTrigger value="optimization">Optimization</TabsTrigger>
              </TabsList>

              <TabsContent value="timeline" className="mt-4">
                <Card className="p-6">
                  <h4 className="font-medium mb-4">Revenue Ramp-up Timeline</h4>
                  <div className="space-y-4">
                    {[1, 3, 6, 12].map(month => {
                      const rampFactor = Math.min(1, month / inputs.decayMonths)
                      const revenue = results.monthlyRevenue * rampFactor
                      const cumRevenue = (() => {
                        let total = 0
                        for (let m = 1; m <= month; m++) {
                          const factor = Math.min(1, m / inputs.decayMonths)
                          total += results.monthlyRevenue * factor
                        }
                        return total
                      })()

                      return (
                        <div key={month} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">Month {month}</span>
                            <span className="text-muted-foreground">
                              {money(revenue)}/mo · Total: {money(cumRevenue)}
                            </span>
                          </div>
                          <Progress value={rampFactor * 100} className="h-2" />
                        </div>
                      )
                    })}
                  </div>

                  <div className="mt-6 pt-4 border-t">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Break-even</p>
                        <p className="font-semibold">
                          {results.netPayback < 999
                            ? `Month ${Math.ceil(results.netPayback)}`
                            : 'Beyond 3 years'}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Profit by Year 1</p>
                        <p className="font-semibold">{money(results.year1Profit)}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="metrics" className="mt-4">
                <Card className="p-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Monthly Clicks</p>
                        <p className="text-lg font-semibold">{formatNumber(Math.round(results.monthlyClicks))}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Monthly Conversions</p>
                        <p className="text-lg font-semibold">{results.monthlyConversions.toFixed(1)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Conv. Value</p>
                        <p className="text-lg font-semibold">{money(results.monthlyRevenue / Math.max(0.1, results.monthlyConversions))}</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <p className="text-sm font-medium mb-2">Performance Indicators</p>
                      <div className="flex gap-2 flex-wrap">
                        <Badge variant={results.netPayback < 6 ? 'default' : results.netPayback < 12 ? 'secondary' : 'outline'}>
                          Payback: {results.netPayback < 999 ? `${results.netPayback.toFixed(1)} months` : 'Never'}
                        </Badge>
                        <Badge variant={results.year1ROI > 1 ? 'default' : results.year1ROI > 0 ? 'secondary' : 'outline'}>
                          Y1 ROI: {pct(results.year1ROI)}
                        </Badge>
                        <Badge variant="outline">
                          LTV/CAC: {(results.lifetimeProfit / inputs.articleCost).toFixed(1)}×
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="optimization" className="mt-4">
                <Card className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Impact Analysis</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• 2x traffic → {money(results.monthlyRevenue * 2)}/mo revenue ({money(results.monthlyRevenue)} increase)</li>
                        <li>• +1% CTR → {formatNumber(Math.round(results.monthlyClicks * 1.2))} clicks ({pct(0.2)} boost)</li>
                        <li>• +0.5% CVR → {(results.monthlyConversions * 1.25).toFixed(1)} conversions/mo</li>
                        <li>• +$50 AOV → {money(results.monthlyRevenue * ((inputs.aov + 50) / inputs.aov))}/mo revenue</li>
                      </ul>
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="font-medium mb-2">Recommendations</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {inputs.ctrToPage < 3 && (
                          <li>🎯 CTR is low - improve internal linking and CTAs</li>
                        )}
                        {inputs.monthlyVisits < 500 && (
                          <li>📈 Focus on SEO to increase organic traffic</li>
                        )}
                        {results.netPayback > 12 && (
                          <li>⏱️ Long payback - consider lower-cost content</li>
                        )}
                        {results.year1ROI > 1 && (
                          <li>✅ Strong ROI - scale content production</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* CTA */}
          <div className="pt-6 border-t">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Boost your content ROI with AI-powered tools
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <InlineCTA
                  href="https://www.outranking.io?via=agentmastery"
                  label="Try Outranking for SEO Content"
                  track="arcade_affiliate_cta"
                  className="my-0"
                />
                <InlineCTA
                  href="https://scalenut.com/?fpr=agentmastery"
                  label="Scale Content with Scalenut"
                  track="arcade_affiliate_cta"
                  className="my-0"
                />
                <InlineCTA
                  href="https://aiseo.ai/?fpr=agentmastery"
                  label="Optimize with AISEO"
                  track="arcade_affiliate_cta"
                  className="my-0"
                />
              </div>
            </div>
          </div>
        </div>
      </ArcadeShell>
    </>
  )
}