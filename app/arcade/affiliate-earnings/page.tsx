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
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Download,
  Copy,
  RotateCcw,
  Users,
  MousePointerClick,
  TrendingUp,
  DollarSign,
  Percent,
  Calculator
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
import RelatedLinks from '@/components/RelatedLinks'

// Metadata is exported from separate page file

type AffiliateInputs = {
  monthlyVisitors: number
  ctrToAffiliate: number
  landingToTrial: number
  trialToPaid: number
  avgCommission: number
  avgOrderValue: number
  flatCommission: number
  isPercentage: boolean
}

const defaultInputs: AffiliateInputs = {
  monthlyVisitors: 10000,
  ctrToAffiliate: 3,
  landingToTrial: 20,
  trialToPaid: 30,
  avgCommission: 20,
  avgOrderValue: 200,
  flatCommission: 40,
  isPercentage: true
}

export default function AffiliateEarningsCalculator() {
  const [inputs, setInputs] = useState<AffiliateInputs>(defaultInputs)
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState('funnel')

  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined') {
      const params = fromQuery<AffiliateInputs>(window.location.search)
      setInputs({ ...defaultInputs, ...params })
    }
  }, [])

  const calculate = () => {
    const ctrDecimal = inputs.ctrToAffiliate / 100
    const landingDecimal = inputs.landingToTrial / 100
    const paidDecimal = inputs.trialToPaid / 100

    const clicks = inputs.monthlyVisitors * ctrDecimal
    const trials = clicks * landingDecimal
    const paid = trials * paidDecimal

    let commission = 0
    if (inputs.isPercentage) {
      commission = paid * inputs.avgOrderValue * (inputs.avgCommission / 100)
    } else {
      commission = paid * inputs.flatCommission
    }

    const monthlyEarnings = commission
    const yearlyEarnings = monthlyEarnings * 12

    // Calculate per-visitor value
    const visitorValue = inputs.monthlyVisitors > 0 ? monthlyEarnings / inputs.monthlyVisitors : 0
    const clickValue = clicks > 0 ? monthlyEarnings / clicks : 0

    // Growth projections
    const growth20 = monthlyEarnings * 1.2
    const growth50 = monthlyEarnings * 1.5
    const growth100 = monthlyEarnings * 2

    return {
      clicks,
      trials,
      paid,
      monthlyEarnings,
      yearlyEarnings,
      visitorValue,
      clickValue,
      growth20,
      growth50,
      growth100
    }
  }

  const results = calculate()

  const handleShare = async () => {
    const url = `${window.location.origin}/arcade/affiliate-earnings?${toQuery(inputs)}`
    await copyToClipboard(url)
    alert('Share link copied to clipboard!')
  }

  const handleExport = () => {
    downloadCSV('affiliate-earnings.csv', [
      {
        'Monthly Visitors': inputs.monthlyVisitors,
        'CTR to Affiliate (%)': inputs.ctrToAffiliate,
        'Landing to Trial (%)': inputs.landingToTrial,
        'Trial to Paid (%)': inputs.trialToPaid,
        'Commission Type': inputs.isPercentage ? 'Percentage' : 'Flat',
        'Commission Rate': inputs.isPercentage ? `${inputs.avgCommission}%` : `$${inputs.flatCommission}`,
        'AOV': inputs.avgOrderValue,
        'Monthly Clicks': Math.round(results.clicks),
        'Monthly Trials': Math.round(results.trials),
        'Monthly Paid': results.paid.toFixed(1),
        'Monthly Earnings': Math.round(results.monthlyEarnings),
        'Yearly Earnings': Math.round(results.yearlyEarnings),
        'Value per Visitor': results.visitorValue.toFixed(2),
        'Value per Click': results.clickValue.toFixed(2)
      }
    ])
  }

  const handleReset = () => setInputs(defaultInputs)

  const quickAnswer = mounted
    ? `With ${formatCompact(inputs.monthlyVisitors)} monthly visitors and ${inputs.ctrToAffiliate}% CTR, you can earn ${money(results.monthlyEarnings)}/month (${money(results.yearlyEarnings)}/year) in affiliate commissions.`
    : ''

  // JSON-LD Schema
  const faqItems = [
    {
      question: 'How much can I earn from affiliate marketing?',
      answer: 'Earnings vary widely based on traffic, niche, and conversion rates. Successful affiliates typically earn $1-10 per 1000 visitors, with top performers exceeding $50/1000.'
    },
    {
      question: 'What conversion rates should I expect?',
      answer: 'Typical conversion funnels: 2-5% CTR to affiliate links, 10-30% landing to trial, 20-40% trial to paid. Quality content and targeting improve these rates.'
    },
    {
      question: 'Percentage vs flat commission - which is better?',
      answer: 'Percentage commissions (15-30%) scale with order value and work well for high-ticket items. Flat commissions ($20-100) provide predictable earnings for lower-priced products.'
    }
  ]

  const schemaList = [
    breadcrumbSchema([
      { name: 'Home', url: canonical('/') },
      { name: 'Agent Arcade', url: canonical('/arcade') },
      { name: 'Affiliate Earnings Calculator', url: canonical('/arcade/affiliate-earnings') }
    ]),
    faqPageSchema(faqItems, canonical('/arcade/affiliate-earnings'))
  ]

  return (
    <>
      <Script {...createSchemaScript(schemaList, 'affiliate-earnings-schema')} />

      <ArcadeShell
        title="Affiliate Earnings Forecaster"
        subtitle="Calculate potential revenue from affiliate marketing campaigns"
        quickAnswer={quickAnswer}
      >
        <div className="space-y-8">
          {/* Commission Model Toggle */}
          <Card className="p-4 bg-gradient-to-r from-amber-50 to-orange-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calculator className="h-5 w-5 text-amber-600" />
                <span className="font-medium">Commission Model</span>
              </div>
              <div className="flex items-center gap-3">
                <span className={!inputs.isPercentage ? 'font-medium' : 'text-muted-foreground'}>
                  Flat Rate
                </span>
                <Switch
                  checked={inputs.isPercentage}
                  onCheckedChange={(checked: boolean) => setInputs({ ...inputs, isPercentage: checked })}
                />
                <span className={inputs.isPercentage ? 'font-medium' : 'text-muted-foreground'}>
                  Percentage
                </span>
              </div>
            </div>
          </Card>

          {/* Input Form */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 bg-gradient-to-br from-white to-cyan-50/30">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Users className="h-4 w-4 text-cyan-600" />
                Traffic & Engagement
              </h3>
              <div className="space-y-4">
                <FormRow
                  label="Monthly Visitors"
                  suffix="visitors"
                  hint="Total website/content traffic"
                >
                  <Input
                    type="number"
                    value={inputs.monthlyVisitors}
                    onChange={(e) => setInputs({ ...inputs, monthlyVisitors: parseNumber(e.target.value) })}
                    min={0}
                    step={1000}
                    className="font-mono"
                  />
                </FormRow>

                <FormRow
                  label="CTR to Affiliate Link"
                  suffix="%"
                  hint="Clicks on affiliate links"
                >
                  <Input
                    type="number"
                    value={inputs.ctrToAffiliate}
                    onChange={(e) => setInputs({ ...inputs, ctrToAffiliate: parseNumber(e.target.value) })}
                    min={0}
                    max={100}
                    step={0.5}
                    className="font-mono"
                  />
                </FormRow>

                <FormRow
                  label="Landing → Trial/Signup"
                  suffix="%"
                  hint="Visitors who start trial"
                >
                  <Input
                    type="number"
                    value={inputs.landingToTrial}
                    onChange={(e) => setInputs({ ...inputs, landingToTrial: parseNumber(e.target.value) })}
                    min={0}
                    max={100}
                    step={5}
                    className="font-mono"
                  />
                </FormRow>

                <FormRow
                  label="Trial → Paid Conversion"
                  suffix="%"
                  hint="Trials that convert to paid"
                >
                  <Input
                    type="number"
                    value={inputs.trialToPaid}
                    onChange={(e) => setInputs({ ...inputs, trialToPaid: parseNumber(e.target.value) })}
                    min={0}
                    max={100}
                    step={5}
                    className="font-mono"
                  />
                </FormRow>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-white to-green-50/30">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                Commission Structure
              </h3>
              <div className="space-y-4">
                {inputs.isPercentage ? (
                  <>
                    <FormRow
                      label="Commission Rate"
                      suffix="%"
                      hint="Percentage of sale value"
                    >
                      <Input
                        type="number"
                        value={inputs.avgCommission}
                        onChange={(e) => setInputs({ ...inputs, avgCommission: parseNumber(e.target.value) })}
                        min={0}
                        max={100}
                        step={5}
                        className="font-mono"
                      />
                    </FormRow>

                    <FormRow
                      label="Average Order Value"
                      suffix="USD"
                      hint="Customer purchase amount"
                    >
                      <Input
                        type="number"
                        value={inputs.avgOrderValue}
                        onChange={(e) => setInputs({ ...inputs, avgOrderValue: parseNumber(e.target.value) })}
                        min={0}
                        step={50}
                        className="font-mono"
                      />
                    </FormRow>

                    <div className="pt-3 border-t">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Per Sale Commission</span>
                        <span className="font-semibold text-green-600">
                          {money(inputs.avgOrderValue * (inputs.avgCommission / 100))}
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <FormRow
                      label="Flat Commission"
                      suffix="USD"
                      hint="Fixed amount per sale"
                    >
                      <Input
                        type="number"
                        value={inputs.flatCommission}
                        onChange={(e) => setInputs({ ...inputs, flatCommission: parseNumber(e.target.value) })}
                        min={0}
                        step={10}
                        className="font-mono"
                      />
                    </FormRow>

                    <div className="pt-3 border-t">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Per Sale Commission</span>
                        <span className="font-semibold text-green-600">
                          {money(inputs.flatCommission)}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </Card>
          </div>

          {/* Results */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Earnings Forecast</h3>
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
                  label: 'Monthly Earnings',
                  value: money(results.monthlyEarnings),
                  hint: 'Before taxes',
                  trend: results.monthlyEarnings > 1000 ? 'up' : 'neutral'
                },
                {
                  label: 'Yearly Earnings',
                  value: money(results.yearlyEarnings),
                  hint: 'Projected annual',
                  trend: results.yearlyEarnings > 10000 ? 'up' : 'neutral'
                },
                {
                  label: 'Per 1K Visitors',
                  value: money(results.visitorValue * 1000),
                  hint: 'RPM equivalent'
                },
                {
                  label: 'Paid Conversions',
                  value: results.paid.toFixed(1) + '/mo',
                  hint: 'Successful referrals'
                }
              ]}
            />

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="funnel">Conversion Funnel</TabsTrigger>
                <TabsTrigger value="growth">Growth Scenarios</TabsTrigger>
                <TabsTrigger value="optimize">Optimization</TabsTrigger>
              </TabsList>

              <TabsContent value="funnel" className="mt-4">
                <Card className="p-6">
                  <h4 className="font-medium mb-4">Conversion Funnel Breakdown</h4>
                  <div className="space-y-4">
                    {[
                      { label: 'Visitors', value: inputs.monthlyVisitors, pct: 100 },
                      { label: 'Clicks to Affiliate', value: Math.round(results.clicks), pct: inputs.ctrToAffiliate },
                      { label: 'Trial Signups', value: Math.round(results.trials), pct: (results.trials / inputs.monthlyVisitors) * 100 },
                      { label: 'Paid Conversions', value: results.paid.toFixed(1), pct: (results.paid / inputs.monthlyVisitors) * 100 }
                    ].map((step, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{step.label}</span>
                          <div className="text-right">
                            <span className="font-semibold">{typeof step.value === 'number' ? formatNumber(step.value) : step.value}</span>
                            <span className="text-xs text-muted-foreground ml-2">({step.pct.toFixed(1)}%)</span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all"
                            style={{ width: `${step.pct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Value per Click</p>
                        <p className="font-semibold">{money(results.clickValue)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Conversion Rate</p>
                        <p className="font-semibold">{((results.paid / inputs.monthlyVisitors) * 100).toFixed(3)}%</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="growth" className="mt-4">
                <Card className="p-6">
                  <h4 className="font-medium mb-4">Growth Projections</h4>
                  <div className="space-y-4">
                    <div className="grid gap-4">
                      {[
                        { label: 'Current', earnings: results.monthlyEarnings, yearly: results.yearlyEarnings },
                        { label: '+20% Traffic', earnings: results.growth20, yearly: results.growth20 * 12 },
                        { label: '+50% Traffic', earnings: results.growth50, yearly: results.growth50 * 12 },
                        { label: '2× Traffic', earnings: results.growth100, yearly: results.growth100 * 12 }
                      ].map((scenario, i) => (
                        <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-gray-50 to-green-50/30">
                          <div>
                            <p className="font-medium">{scenario.label}</p>
                            <p className="text-xs text-muted-foreground">
                              {i > 0 ? `${formatCompact(inputs.monthlyVisitors * (1 + (i - 1) * 0.3))} visitors/mo` : 'Baseline'}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-green-600">{money(scenario.earnings)}/mo</p>
                            <p className="text-xs text-muted-foreground">{money(scenario.yearly)}/yr</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t">
                      <p className="text-sm text-muted-foreground mb-2">Scaling Potential</p>
                      <div className="flex gap-2 flex-wrap">
                        <Badge variant="outline">10K visitors → {money(results.visitorValue * 10000)}</Badge>
                        <Badge variant="outline">50K visitors → {money(results.visitorValue * 50000)}</Badge>
                        <Badge variant="outline">100K visitors → {money(results.visitorValue * 100000)}</Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="optimize" className="mt-4">
                <Card className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-3">Optimization Opportunities</h4>
                      <div className="space-y-3">
                        <div className="p-3 rounded-lg bg-blue-50/50 border border-blue-200">
                          <p className="text-sm font-medium text-blue-900">Improve CTR +1%</p>
                          <p className="text-xs text-blue-700 mt-1">
                            Impact: +{money((results.monthlyEarnings * (inputs.ctrToAffiliate + 1) / inputs.ctrToAffiliate) - results.monthlyEarnings)}/mo
                          </p>
                        </div>
                        <div className="p-3 rounded-lg bg-green-50/50 border border-green-200">
                          <p className="text-sm font-medium text-green-900">Boost Trial Rate +5%</p>
                          <p className="text-xs text-green-700 mt-1">
                            Impact: +{money((results.monthlyEarnings * (inputs.landingToTrial + 5) / inputs.landingToTrial) - results.monthlyEarnings)}/mo
                          </p>
                        </div>
                        <div className="p-3 rounded-lg bg-purple-50/50 border border-purple-200">
                          <p className="text-sm font-medium text-purple-900">Improve Conversion +10%</p>
                          <p className="text-xs text-purple-700 mt-1">
                            Impact: +{money((results.monthlyEarnings * (inputs.trialToPaid + 10) / inputs.trialToPaid) - results.monthlyEarnings)}/mo
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="font-medium mb-2">Best Practices</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {inputs.ctrToAffiliate < 2 && (
                          <li>🎯 CTR is low - make affiliate links more prominent</li>
                        )}
                        {inputs.landingToTrial < 15 && (
                          <li>📝 Trial signup rate needs improvement - better pre-sell content</li>
                        )}
                        {results.visitorValue < 1 && (
                          <li>💰 Low visitor value - consider higher-commission programs</li>
                        )}
                        {results.monthlyEarnings > 500 && (
                          <li>✅ Good earnings! Focus on scaling traffic</li>
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
                Start earning with our top affiliate programs
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <InlineCTA
                  href="https://smartlead.ai/?via=masteryagent"
                  label="SmartLead (30% Commission)"
                  track="arcade_affiliate_cta"
                  className="my-0"
                />
                <InlineCTA
                  href="https://www.synthesia.io/?via=agentmastery"
                  label="Synthesia (25% Recurring)"
                  track="arcade_affiliate_cta"
                  className="my-0"
                />
                <InlineCTA
                  href="https://lovable.dev?via=agentmastery"
                  label="Lovable (40% Commission)"
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