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
import {
  Download,
  Copy,
  RotateCcw,
  TrendingUp,
  DollarSign,
  MousePointerClick,
  Target,
  Calculator
} from 'lucide-react'
import {
  money,
  pct,
  parseNumber,
  parsePercent,
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
import RelatedLinks from '@/components/RelatedLinks'

// Metadata is exported from separate page file

type AdInputs = {
  monthlySpend: number
  cpc: number
  ctr: number
  cvr: number
  aov: number
  attribution: number
  toolCost: number
}

const defaultInputs: AdInputs = {
  monthlySpend: 1000,
  cpc: 2.00,
  ctr: 3,
  cvr: 2,
  aov: 200,
  attribution: 20,
  toolCost: 97
}

export default function AdROICalculator() {
  const [inputs, setInputs] = useState<AdInputs>(defaultInputs)
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState('metrics')

  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined') {
      const params = fromQuery<AdInputs>(window.location.search)
      setInputs({ ...defaultInputs, ...params })
    }
  }, [])

  const calculate = () => {
    const ctrDecimal = inputs.ctr / 100
    const cvrDecimal = inputs.cvr / 100
    const attributionMultiplier = 1 - (inputs.attribution / 100)

    const impressions = ctrDecimal > 0 ? inputs.monthlySpend / inputs.cpc / ctrDecimal : 0
    const clicks = inputs.cpc > 0 ? inputs.monthlySpend / inputs.cpc : 0
    const conversions = clicks * cvrDecimal
    const revenue = conversions * inputs.aov * attributionMultiplier
    const grossROAS = inputs.monthlySpend > 0 ? revenue / inputs.monthlySpend : 0
    const netProfit = revenue - inputs.monthlySpend - inputs.toolCost
    const netROI = inputs.monthlySpend > 0 ? netProfit / inputs.monthlySpend : 0
    const paybackDays = netProfit > 0 ? (inputs.toolCost / (netProfit / 30)) : null

    return {
      impressions,
      clicks,
      conversions,
      revenue,
      grossROAS,
      netProfit,
      netROI,
      paybackDays
    }
  }

  const results = calculate()

  const handleShare = async () => {
    const url = `${window.location.origin}/arcade/ad-roi?${toQuery(inputs)}`
    await copyToClipboard(url)
    alert('Share link copied to clipboard!')
  }

  const handleExport = () => {
    downloadCSV('ad-roi-analysis.csv', [
      {
        'Monthly Ad Spend': inputs.monthlySpend,
        'CPC': inputs.cpc,
        'CTR (%)': inputs.ctr,
        'CVR (%)': inputs.cvr,
        'AOV': inputs.aov,
        'Attribution Discount (%)': inputs.attribution,
        'Tool Cost': inputs.toolCost,
        'Impressions': Math.round(results.impressions),
        'Clicks': Math.round(results.clicks),
        'Conversions': results.conversions.toFixed(1),
        'Revenue': Math.round(results.revenue),
        'Gross ROAS': results.grossROAS.toFixed(2),
        'Net ROI (%)': (results.netROI * 100).toFixed(1),
        'Payback Days': results.paybackDays ? results.paybackDays.toFixed(1) : 'N/A'
      }
    ])
  }

  const handleReset = () => setInputs(defaultInputs)

  const quickAnswer = mounted
    ? `At ${money(inputs.monthlySpend)} monthly spend with ${inputs.cvr}% conversion rate, your ROAS is ${results.grossROAS.toFixed(1)}×${
        results.paybackDays ? ` with ${Math.round(results.paybackDays)}-day payback` : ''
      }.`
    : ''

  // JSON-LD Schema
  const faqItems = [
    {
      question: 'What is a good ROAS for paid advertising?',
      answer: 'A good ROAS typically ranges from 3:1 to 4:1, meaning $3-4 in revenue for every $1 spent. However, this varies by industry, margins, and business model.'
    },
    {
      question: 'How do I calculate net ROI from ad spend?',
      answer: 'Net ROI = (Revenue - Ad Spend - Tool Costs) / Ad Spend × 100. This accounts for all costs, not just the advertising spend.'
    },
    {
      question: 'What is attribution discount?',
      answer: 'Attribution discount accounts for conversions that might have happened without ads. A 20% discount means you attribute only 80% of conversions to your ads.'
    }
  ]

  const schemaList = [
    breadcrumbSchema([
      { name: 'Home', url: canonical('/') },
      { name: 'Agent Arcade', url: canonical('/arcade') },
      { name: 'Ad ROI Calculator', url: canonical('/arcade/ad-roi') }
    ]),
    faqPageSchema(faqItems, canonical('/arcade/ad-roi'))
  ]

  return (
    <>
      <Script {...createSchemaScript(schemaList, 'ad-roi-schema')} />

      <ArcadeShell
        title="Ad Spend ROI Calculator"
        subtitle="Calculate ROAS, net ROI, and payback period for your advertising campaigns"
        quickAnswer={quickAnswer}
      >
        <div className="space-y-8">
          {/* Input Form */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 bg-gradient-to-br from-white to-blue-50/30">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-blue-600" />
                Budget & Costs
              </h3>
              <div className="space-y-4">
                <FormRow
                  label="Monthly Ad Spend"
                  suffix="USD"
                  hint="Total advertising budget per month"
                >
                  <Input
                    type="number"
                    value={inputs.monthlySpend}
                    onChange={(e) => setInputs({ ...inputs, monthlySpend: parseNumber(e.target.value) })}
                    min={0}
                    step={100}
                    className="font-mono"
                  />
                </FormRow>

                <FormRow
                  label="Cost Per Click (CPC)"
                  suffix="USD"
                  hint="Average cost for each ad click"
                >
                  <Input
                    type="number"
                    value={inputs.cpc}
                    onChange={(e) => setInputs({ ...inputs, cpc: parseNumber(e.target.value) })}
                    min={0}
                    step={0.10}
                    className="font-mono"
                  />
                </FormRow>

                <FormRow
                  label="Tool/Platform Cost"
                  suffix="USD/month"
                  hint="Ad management tools, software fees"
                >
                  <Input
                    type="number"
                    value={inputs.toolCost}
                    onChange={(e) => setInputs({ ...inputs, toolCost: parseNumber(e.target.value) })}
                    min={0}
                    step={10}
                    className="font-mono"
                  />
                </FormRow>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-white to-emerald-50/30">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Target className="h-4 w-4 text-emerald-600" />
                Performance Metrics
              </h3>
              <div className="space-y-4">
                <FormRow
                  label="Click-Through Rate (CTR)"
                  suffix="%"
                  hint="Percentage of impressions that click"
                >
                  <Input
                    type="number"
                    value={inputs.ctr}
                    onChange={(e) => setInputs({ ...inputs, ctr: parseNumber(e.target.value) })}
                    min={0}
                    max={100}
                    step={0.5}
                    className="font-mono"
                  />
                </FormRow>

                <FormRow
                  label="Conversion Rate (CVR)"
                  suffix="%"
                  hint="Percentage of clicks that convert"
                >
                  <Input
                    type="number"
                    value={inputs.cvr}
                    onChange={(e) => setInputs({ ...inputs, cvr: parseNumber(e.target.value) })}
                    min={0}
                    max={100}
                    step={0.5}
                    className="font-mono"
                  />
                </FormRow>

                <FormRow
                  label="Average Order Value (AOV)"
                  suffix="USD"
                  hint="Average revenue per conversion"
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

            <Card className="md:col-span-2 p-6 bg-gradient-to-br from-white to-amber-50/30">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Calculator className="h-4 w-4 text-amber-600" />
                Advanced Settings
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <FormRow
                  label="Attribution Discount"
                  suffix="%"
                  hint="Conservative estimate (e.g., 20% = only credit 80% to ads)"
                >
                  <Input
                    type="number"
                    value={inputs.attribution}
                    onChange={(e) => setInputs({ ...inputs, attribution: parseNumber(e.target.value) })}
                    min={0}
                    max={100}
                    step={5}
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
                  label: 'Gross ROAS',
                  value: results.grossROAS.toFixed(2) + '×',
                  hint: results.grossROAS >= 3 ? 'Good' : 'Below target',
                  trend: results.grossROAS >= 3 ? 'up' : 'down'
                },
                {
                  label: 'Net ROI',
                  value: pct(results.netROI),
                  hint: results.netROI > 0 ? 'Profitable' : 'Loss',
                  trend: results.netROI > 0 ? 'up' : 'down'
                },
                {
                  label: 'Revenue',
                  value: money(results.revenue),
                  hint: 'After attribution'
                },
                {
                  label: 'Payback',
                  value: results.paybackDays ? `${Math.round(results.paybackDays)} days` : '—',
                  hint: results.paybackDays && results.paybackDays < 30 ? 'Quick' : 'Slow'
                }
              ]}
            />

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="metrics">Detailed Metrics</TabsTrigger>
                <TabsTrigger value="insights">Insights</TabsTrigger>
              </TabsList>

              <TabsContent value="metrics" className="mt-4">
                <Card className="p-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Impressions</p>
                        <p className="font-semibold">{formatCompact(results.impressions)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Clicks</p>
                        <p className="font-semibold">{formatNumber(Math.round(results.clicks))}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Conversions</p>
                        <p className="font-semibold">{results.conversions.toFixed(1)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Net Profit</p>
                        <p className="font-semibold">{money(results.netProfit)}</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <p className="text-sm text-muted-foreground mb-2">Campaign Efficiency</p>
                      <div className="flex gap-2 flex-wrap">
                        <Badge variant={results.grossROAS >= 4 ? 'default' : results.grossROAS >= 3 ? 'secondary' : 'outline'}>
                          ROAS: {results.grossROAS.toFixed(2)}×
                        </Badge>
                        <Badge variant={results.netROI > 0.5 ? 'default' : results.netROI > 0 ? 'secondary' : 'outline'}>
                          ROI: {pct(results.netROI)}
                        </Badge>
                        <Badge variant="outline">
                          CPA: {money(inputs.monthlySpend / Math.max(1, results.conversions))}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="insights" className="mt-4">
                <Card className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Performance Analysis</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {results.grossROAS < 3 && (
                          <li>⚠️ ROAS below 3:1 target. Consider optimizing CTR or CVR.</li>
                        )}
                        {inputs.ctr < 2 && (
                          <li>📊 CTR is low. Improve ad creative and targeting.</li>
                        )}
                        {inputs.cvr < 2 && (
                          <li>🎯 Conversion rate could be improved with landing page optimization.</li>
                        )}
                        {results.netROI > 0.5 && (
                          <li>✅ Strong ROI! Consider scaling ad spend.</li>
                        )}
                        {results.paybackDays && results.paybackDays < 30 && (
                          <li>🚀 Excellent payback period under 30 days!</li>
                        )}
                      </ul>
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="font-medium mb-2">Optimization Tips</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Increasing CTR by 1% would add {money((results.revenue * 1.33) - results.revenue)} revenue</li>
                        <li>• Reducing CPC by $0.50 would save {money(inputs.monthlySpend * 0.25)} monthly</li>
                        <li>• Test different ad creatives to improve engagement</li>
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
                Optimize your ad campaigns with AI-powered tools
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <InlineCTA
                  href="https://get.usemotion.com/63fjeh0l8zw4"
                  label="Try Motion for Campaign Management"
                  track="arcade_affiliate_cta"
                  className="my-0"
                />
                <InlineCTA
                  href="https://try.brand24.com/agentmastery"
                  label="Track Campaign Performance"
                  track="arcade_affiliate_cta"
                  className="my-0"
                />
              </div>
            </div>
          </div>

          {/* Related Links */}
          <RelatedLinks
            currentPath="/arcade/ad-roi"
            currentCategory="arcade"
            title="Explore More Tools"
          />
        </div>
      </ArcadeShell>
    </>
  )
}