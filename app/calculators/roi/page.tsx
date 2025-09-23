'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { smartLeadUplift, emailBenchmarks, pricingData } from '@/src/data/pricing'
import {
  CalculatorInput,
  CalculatorSection,
  MetricCard,
  formatCurrency,
  formatPercentage
} from '@/src/components/calculator'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  TrendingUp,
  DollarSign,
  Mail,
  Users,
  Target,
  ExternalLink,
  ArrowRight,
  Sparkles,
  Calculator,
  Save,
  Share2,
  Download,
  Link2
} from 'lucide-react'

interface SavedScenario {
  name: string
  monthlyEmails: number
  deliveryRate: number
  replyRate: number
  meetingRate: number
  closeRate: number
  avgDealSize: number
  savedDate: string
  roi: number
}

export default function ROICalculatorPage() {
  // Current Performance Inputs
  const [monthlyEmails, setMonthlyEmails] = useState(10000)
  const [deliveryRate, setDeliveryRate] = useState(85)
  const [replyRate, setReplyRate] = useState(3)
  const [meetingRate, setMeetingRate] = useState(20)
  const [closeRate, setCloseRate] = useState(15)
  const [avgDealSize, setAvgDealSize] = useState(5000)

  // SmartLead Uplift Assumptions
  const [deliveryUplift, setDeliveryUplift] = useState(smartLeadUplift.deliveryRate.default)
  const [replyUplift, setReplyUplift] = useState(smartLeadUplift.replyRate.default)

  // Saved scenarios
  const [savedScenarios, setSavedScenarios] = useState<SavedScenario[]>([])
  const [scenarioName, setScenarioName] = useState('')
  const [shareUrl, setShareUrl] = useState('')
  const [downloading, setDownloading] = useState(false)

  // Load saved scenarios on mount
  useEffect(() => {
    const saved = localStorage.getItem('roiScenarios')
    if (saved) {
      setSavedScenarios(JSON.parse(saved))
    }
  }, [])

  const saveScenario = () => {
    const name = scenarioName || `Scenario ${savedScenarios.length + 1}`
    const newScenario: SavedScenario = {
      name,
      monthlyEmails,
      deliveryRate,
      replyRate,
      meetingRate,
      closeRate,
      avgDealSize,
      savedDate: new Date().toISOString(),
      roi: calculations.roi.monthlyROI
    }

    const updated = [...savedScenarios, newScenario]
    setSavedScenarios(updated)
    localStorage.setItem('roiScenarios', JSON.stringify(updated))
    setScenarioName('')
    alert(`Scenario "${name}" saved!`)
  }

  const loadScenario = (scenario: SavedScenario) => {
    setMonthlyEmails(scenario.monthlyEmails)
    setDeliveryRate(scenario.deliveryRate)
    setReplyRate(scenario.replyRate)
    setMeetingRate(scenario.meetingRate)
    setCloseRate(scenario.closeRate)
    setAvgDealSize(scenario.avgDealSize)
  }

  const generateShareUrl = async () => {
    const params = new URLSearchParams({
      type: 'roi',
      revenue: calculations.roi.additionalRevenue.toFixed(0),
      roi: calculations.roi.roiPercentage.toFixed(0),
      payback: calculations.roi.paybackDays.toFixed(0),
      utm_source: 'agentmastery',
      utm_medium: 'calculator',
      utm_campaign: 'roi'
    })

    const ogImageUrl = `/api/og/calculator?${params.toString()}`
    const shareLink = `https://agentmastery.ai/calculators/roi?shared=${btoa(params.toString())}`
    setShareUrl(shareLink)
    return ogImageUrl
  }

  const handleShare = async () => {
    await generateShareUrl()
    await navigator.clipboard.writeText(shareUrl)
    alert('Share link copied to clipboard!')
  }

  const handleDownload = async () => {
    setDownloading(true)
    try {
      const ogImageUrl = await generateShareUrl()
      const response = await fetch(ogImageUrl)
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `agentmastery-roi-${Date.now()}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download failed:', error)
    }
    setDownloading(false)
  }

  // Calculate current and improved metrics
  const calculations = useMemo(() => {
    // Current funnel
    const delivered = monthlyEmails * (deliveryRate / 100)
    const replies = delivered * (replyRate / 100)
    const meetings = replies * (meetingRate / 100)
    const deals = meetings * (closeRate / 100)
    const currentRevenue = deals * avgDealSize

    // Improved funnel with SmartLead
    const improvedDeliveryRate = Math.min(99, deliveryRate + deliveryUplift)
    const improvedReplyRate = replyRate * (1 + replyUplift / 100)

    const improvedDelivered = monthlyEmails * (improvedDeliveryRate / 100)
    const improvedReplies = improvedDelivered * (improvedReplyRate / 100)
    const improvedMeetings = improvedReplies * (meetingRate / 100)
    const improvedDeals = improvedMeetings * (closeRate / 100)
    const improvedRevenue = improvedDeals * avgDealSize

    // ROI calculations
    const additionalRevenue = improvedRevenue - currentRevenue
    const smartLeadCost = pricingData.smartlead.basePricePerSeat
    const monthlyROI = additionalRevenue - smartLeadCost
    const roiPercentage = (monthlyROI / smartLeadCost) * 100

    return {
      current: {
        delivered: Math.round(delivered),
        replies: Math.round(replies),
        meetings: Math.round(meetings),
        deals: deals.toFixed(1),
        revenue: currentRevenue
      },
      improved: {
        deliveryRate: improvedDeliveryRate,
        replyRate: improvedReplyRate,
        delivered: Math.round(improvedDelivered),
        replies: Math.round(improvedReplies),
        meetings: Math.round(improvedMeetings),
        deals: improvedDeals.toFixed(1),
        revenue: improvedRevenue
      },
      roi: {
        additionalRevenue,
        monthlyROI,
        roiPercentage,
        annualROI: monthlyROI * 12,
        paybackDays: smartLeadCost / (additionalRevenue / 30)
      }
    }
  }, [monthlyEmails, deliveryRate, replyRate, meetingRate, closeRate, avgDealSize, deliveryUplift, replyUplift])

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Calculator className="h-8 w-8 text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold">Email Outreach ROI Calculator</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Calculate your potential revenue increase with SmartLead's email automation and deliverability improvements
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          {/* Current Performance */}
          <CalculatorSection
            title="Current Email Performance"
            description="Enter your current email outreach metrics"
          >
            <CalculatorInput
              label="Monthly Emails Sent"
              value={monthlyEmails}
              onChange={setMonthlyEmails}
              min={100}
              max={100000}
              step={100}
              suffix=" emails"
              tooltip="Total number of cold emails you send per month"
            />
            <CalculatorInput
              label="Delivery Rate"
              value={deliveryRate}
              onChange={setDeliveryRate}
              min={50}
              max={99}
              step={1}
              suffix="%"
              type="slider"
              tooltip="Percentage of emails that reach the inbox (not spam)"
            />
            <CalculatorInput
              label="Reply Rate"
              value={replyRate}
              onChange={setReplyRate}
              min={0.5}
              max={15}
              step={0.5}
              suffix="%"
              type="slider"
              tooltip="Percentage of delivered emails that get a reply"
            />
          </CalculatorSection>

          {/* Conversion Metrics */}
          <CalculatorSection
            title="Conversion Metrics"
            description="Your sales funnel conversion rates"
          >
            <CalculatorInput
              label="Reply to Meeting Rate"
              value={meetingRate}
              onChange={setMeetingRate}
              min={5}
              max={50}
              step={5}
              suffix="%"
              type="slider"
              tooltip="Percentage of replies that convert to meetings"
            />
            <CalculatorInput
              label="Meeting to Close Rate"
              value={closeRate}
              onChange={setCloseRate}
              min={5}
              max={50}
              step={5}
              suffix="%"
              type="slider"
              tooltip="Percentage of meetings that result in closed deals"
            />
            <CalculatorInput
              label="Average Deal Size"
              value={avgDealSize}
              onChange={setAvgDealSize}
              min={100}
              max={50000}
              step={100}
              prefix="$"
              tooltip="Average revenue per closed deal"
            />
          </CalculatorSection>

          {/* SmartLead Uplift */}
          <CalculatorSection
            title="SmartLead Performance Uplift"
            description="Adjust expected improvements with SmartLead"
          >
            <CalculatorInput
              label="Delivery Rate Improvement"
              value={deliveryUplift}
              onChange={setDeliveryUplift}
              min={smartLeadUplift.deliveryRate.min}
              max={smartLeadUplift.deliveryRate.max}
              step={5}
              suffix="% points"
              type="slider"
              tooltip="How much SmartLead improves your delivery rate through email warmup"
            />
            <CalculatorInput
              label="Reply Rate Improvement"
              value={replyUplift}
              onChange={setReplyUplift}
              min={smartLeadUplift.replyRate.min}
              max={smartLeadUplift.replyRate.max}
              step={5}
              suffix="%"
              type="slider"
              tooltip="How much SmartLead improves replies through better deliverability and AI personalization"
            />

            <Alert className="mt-4">
              <Sparkles className="h-4 w-4" />
              <AlertDescription>
                <strong>Why SmartLead improves performance:</strong>
                <ul className="mt-2 space-y-1 text-sm">
                  {smartLeadUplift.features.map((feature, i) => (
                    <li key={i}>• {feature}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          </CalculatorSection>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {/* ROI Summary */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/20 dark:to-green-900/10 border-green-200 dark:border-green-900">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Additional Monthly Revenue</p>
                    <p className="text-4xl font-bold text-green-700 dark:text-green-400">
                      {formatCurrency(calculations.roi.additionalRevenue)}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Monthly ROI</p>
                      <p className="text-2xl font-semibold text-green-600">
                        {formatCurrency(calculations.roi.monthlyROI)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">ROI %</p>
                      <p className="text-2xl font-semibold text-green-600">
                        {calculations.roi.roiPercentage.toFixed(0)}%
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Annual Additional Revenue</p>
                    <p className="text-3xl font-bold text-green-700 dark:text-green-400">
                      {formatCurrency(calculations.roi.additionalRevenue * 12)}
                    </p>
                  </div>
                  {calculations.roi.paybackDays < 30 && (
                    <div className="bg-green-600/10 rounded-lg p-3">
                      <p className="text-sm font-medium text-green-700 dark:text-green-400">
                        💰 Pays for itself in {calculations.roi.paybackDays.toFixed(0)} days!
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Performance Comparison */}
          <CalculatorSection
            title="Performance Comparison"
            description="Current vs. With SmartLead"
          >
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Current</p>
                  <div className="space-y-2">
                    <div className="p-2 bg-muted/50 rounded">
                      <p className="text-xs text-muted-foreground">Delivered</p>
                      <p className="font-semibold">{calculations.current.delivered.toLocaleString()}</p>
                    </div>
                    <div className="p-2 bg-muted/50 rounded">
                      <p className="text-xs text-muted-foreground">Replies</p>
                      <p className="font-semibold">{calculations.current.replies}</p>
                    </div>
                    <div className="p-2 bg-muted/50 rounded">
                      <p className="text-xs text-muted-foreground">Meetings</p>
                      <p className="font-semibold">{calculations.current.meetings}</p>
                    </div>
                    <div className="p-2 bg-muted/50 rounded">
                      <p className="text-xs text-muted-foreground">Deals/Mo</p>
                      <p className="font-semibold">{calculations.current.deals}</p>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">With SmartLead</p>
                  <div className="space-y-2">
                    <div className="p-2 bg-green-50 dark:bg-green-950/20 rounded border border-green-200 dark:border-green-900">
                      <p className="text-xs text-muted-foreground">Delivered</p>
                      <p className="font-semibold text-green-700 dark:text-green-400">
                        {calculations.improved.delivered.toLocaleString()}
                        <span className="text-xs ml-1">
                          (+{(calculations.improved.delivered - calculations.current.delivered).toLocaleString()})
                        </span>
                      </p>
                    </div>
                    <div className="p-2 bg-green-50 dark:bg-green-950/20 rounded border border-green-200 dark:border-green-900">
                      <p className="text-xs text-muted-foreground">Replies</p>
                      <p className="font-semibold text-green-700 dark:text-green-400">
                        {calculations.improved.replies}
                        <span className="text-xs ml-1">
                          (+{calculations.improved.replies - calculations.current.replies})
                        </span>
                      </p>
                    </div>
                    <div className="p-2 bg-green-50 dark:bg-green-950/20 rounded border border-green-200 dark:border-green-900">
                      <p className="text-xs text-muted-foreground">Meetings</p>
                      <p className="font-semibold text-green-700 dark:text-green-400">
                        {calculations.improved.meetings}
                        <span className="text-xs ml-1">
                          (+{calculations.improved.meetings - calculations.current.meetings})
                        </span>
                      </p>
                    </div>
                    <div className="p-2 bg-green-50 dark:bg-green-950/20 rounded border border-green-200 dark:border-green-900">
                      <p className="text-xs text-muted-foreground">Deals/Mo</p>
                      <p className="font-semibold text-green-700 dark:text-green-400">
                        {calculations.improved.deals}
                        <span className="text-xs ml-1">
                          (+{(parseFloat(calculations.improved.deals) - parseFloat(calculations.current.deals)).toFixed(1)})
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-primary/5 rounded-lg">
                <p className="text-sm text-center">
                  <strong>Monthly Revenue Impact:</strong>
                  <br />
                  <span className="text-2xl font-bold">
                    {formatCurrency(calculations.current.revenue)} → {formatCurrency(calculations.improved.revenue)}
                  </span>
                </p>
              </div>
            </div>
          </CalculatorSection>

          {/* Save & Share Section */}
          <CalculatorSection
            title="Save & Share Your Results"
            description="Keep track of scenarios and share your ROI"
          >
            <div className="space-y-4">
              {/* Save Scenario */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Scenario name..."
                  value={scenarioName}
                  onChange={(e) => setScenarioName(e.target.value)}
                  className="flex-1 px-3 py-2 border rounded-md"
                />
                <Button onClick={saveScenario} variant="outline">
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>

              {/* Saved Scenarios */}
              {savedScenarios.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Saved Scenarios:</p>
                  {savedScenarios.slice(-3).reverse().map((scenario, i) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                      <div className="flex-1">
                        <p className="text-sm font-medium">{scenario.name}</p>
                        <p className="text-xs text-muted-foreground">
                          ROI: {formatCurrency(scenario.roi)} • {new Date(scenario.savedDate).toLocaleDateString()}
                        </p>
                      </div>
                      <Button size="sm" variant="ghost" onClick={() => loadScenario(scenario)}>
                        Load
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* Share Buttons */}
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleShare} className="flex-1">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Result
                </Button>
                <Button variant="outline" onClick={handleDownload} disabled={downloading} className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  {downloading ? 'Generating...' : 'Download'}
                </Button>
              </div>
              {shareUrl && (
                <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText(shareUrl)}>
                  <Link2 className="h-4 w-4 mr-2" />
                  Copy Share Link
                </Button>
              )}
            </div>
          </CalculatorSection>

          {/* CTA */}
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="pt-6 text-center space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Ready to Boost Your Email ROI?</h3>
                <p className="text-sm text-muted-foreground">
                  Start with SmartLead's 14-day free trial and see the results yourself
                </p>
              </div>
              <div className="space-y-2">
                <Button size="lg" className="w-full" asChild>
                  <a
                    href={`${pricingData.smartlead.affiliateUrl}?utm_source=agentmastery&utm_medium=calculator&utm_campaign=roi`}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="flex items-center justify-center gap-2"
                  >
                    Try SmartLead Free
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
                <p className="text-xs text-muted-foreground">
                  No credit card required • Unlimited email warmup included
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}