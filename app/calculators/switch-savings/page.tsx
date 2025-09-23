'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PRICING, getToolsByCategory, getAllCategories, type ToolCategory } from '@/data/pricing'
import {
  CalculatorInput,
  CalculatorSection,
  MetricCard,
  formatCurrency
} from '@/components/calculator'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Calculator,
  DollarSign,
  Users,
  TrendingDown,
  ExternalLink,
  Check,
  X,
  Zap,
  Database,
  ArrowRight,
  Mail,
  Share2,
  Download,
  Copy,
  ChevronDown
} from 'lucide-react'

export default function SwitchSavingsCalculatorPage() {
  // Input states
  const [seats, setSeats] = useState(10)
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory>('Database')
  const [currentTool, setCurrentTool] = useState('zoominfo')
  const [includeDataAddons, setIncludeDataAddons] = useState(true)
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('annual')
  const [shareUrl, setShareUrl] = useState('')
  const [downloading, setDownloading] = useState(false)
  const [selectedTab, setSelectedTab] = useState('apollo')
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false)

  // Get filtered tools based on selected category
  const categoryTools = useMemo(() => {
    return getToolsByCategory(selectedCategory)
  }, [selectedCategory])

  // Get available comparison tools
  const comparisonTools = useMemo(() => {
    // Always include Apollo and Close as they're our recommended alternatives
    const apollo = PRICING.find(tool => tool.slug === 'apollo')
    const close = PRICING.find(tool => tool.slug === 'close')

    // Also get top alternatives from the current category (excluding current tool)
    const categoryAlternatives = categoryTools
      .filter(tool => tool.slug !== currentTool)
      .slice(0, 2) // Top 2 alternatives in category

    return { apollo, close, categoryAlternatives }
  }, [categoryTools, currentTool])

  // Calculate costs for each tool
  const calculations = useMemo(() => {
    const current = PRICING.find(tool => tool.slug === currentTool)
    const apollo = comparisonTools.apollo
    const close = comparisonTools.close
    const [alternative1, alternative2] = comparisonTools.categoryAlternatives

    if (!current) {
      return {
        current: { monthly: 0, annual: 0, display: 0 },
        apollo: { monthly: 0, annual: 0, display: 0, savings: 0, savingsPercent: 0 },
        close: { monthly: 0, annual: 0, display: 0, savings: 0, savingsPercent: 0 },
        alternative1: { monthly: 0, annual: 0, display: 0, savings: 0, savingsPercent: 0 },
        alternative2: { monthly: 0, annual: 0, display: 0, savings: 0, savingsPercent: 0 },
        combined: { monthly: 0, annual: 0, display: 0, savings: 0, savingsPercent: 0 }
      }
    }

    // Ensure minimum seats
    const effectiveSeats = Math.max(seats, current.minSeats || 1)

    // Calculate monthly costs
    const currentMonthly = effectiveSeats * current.seatMonthly +
      (includeDataAddons ? effectiveSeats * (current.dataAddOnMonthly || 0) : 0)

    // Helper function to calculate tool costs
    const calculateToolCosts = (tool: typeof current | undefined) => {
      if (!tool) return { monthly: 0, annual: 0, display: 0, savings: 0, savingsPercent: 0 }

      const toolSeats = Math.max(seats, tool.minSeats || 1)
      const toolMonthly = toolSeats * tool.seatMonthly +
        (includeDataAddons ? toolSeats * (tool.dataAddOnMonthly || 0) : 0)

      const annualMultiplier = billingPeriod === 'annual' ? 12 * 0.9 : 1

      return {
        monthly: toolMonthly,
        annual: toolMonthly * 12,
        display: billingPeriod === 'annual' ? toolMonthly * annualMultiplier : toolMonthly,
        savings: currentMonthly - toolMonthly,
        savingsPercent: currentMonthly > 0 ? ((currentMonthly - toolMonthly) / currentMonthly) * 100 : 0
      }
    }

    const apolloCalcs = calculateToolCosts(apollo)
    const closeCalcs = calculateToolCosts(close)
    const alt1Calcs = calculateToolCosts(alternative1)
    const alt2Calcs = calculateToolCosts(alternative2)

    // Annual calculations (10% discount assumed)
    const annualMultiplier = billingPeriod === 'annual' ? 12 * 0.9 : 1

    return {
      current: {
        monthly: currentMonthly,
        annual: currentMonthly * 12,
        display: billingPeriod === 'annual' ? currentMonthly * annualMultiplier : currentMonthly
      },
      apollo: apolloCalcs,
      close: closeCalcs,
      alternative1: alt1Calcs,
      alternative2: alt2Calcs,
      combined: apollo && close ? {
        monthly: apolloCalcs.monthly + closeCalcs.monthly,
        annual: (apolloCalcs.monthly + closeCalcs.monthly) * 12,
        display: billingPeriod === 'annual' ? (apolloCalcs.monthly + closeCalcs.monthly) * annualMultiplier : apolloCalcs.monthly + closeCalcs.monthly,
        savings: currentMonthly - (apolloCalcs.monthly + closeCalcs.monthly),
        savingsPercent: currentMonthly > 0 ? ((currentMonthly - (apolloCalcs.monthly + closeCalcs.monthly)) / currentMonthly) * 100 : 0
      } : { monthly: 0, annual: 0, display: 0, savings: 0, savingsPercent: 0 }
    }
  }, [seats, currentTool, includeDataAddons, billingPeriod, comparisonTools])

  const currentToolData = PRICING.find(tool => tool.slug === currentTool)
  const showCombined = currentTool === 'zoominfo' || currentTool === 'salesforce'

  // Handle tab selection when category changes
  useEffect(() => {
    if (selectedCategory === 'Database' || selectedCategory === 'Sales Engagement') {
      if (selectedTab !== 'apollo' && selectedTab !== 'close' && selectedTab !== 'combined') {
        setSelectedTab('apollo')
      }
    } else {
      if (comparisonTools.categoryAlternatives.length > 0) {
        setSelectedTab('alternative1')
      }
    }
  }, [selectedCategory, comparisonTools.categoryAlternatives.length, selectedTab])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setCategoryDropdownOpen(false)
    }

    if (categoryDropdownOpen) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [categoryDropdownOpen])

  const generateEmailText = () => {
    if (!currentToolData) return ''

    const savings = showCombined ? calculations.combined.savings : calculations.apollo.savings
    const text = `
Switch & Save Comparison Results:

Current Tool: ${currentToolData.name}
Current Cost: ${formatCurrency(calculations.current.display)}/${billingPeriod === 'annual' ? 'year' : 'month'}

${showCombined ? 'Recommended Combination:' : 'Recommended Alternative:'}
${showCombined ? `Apollo + Close: ${formatCurrency(calculations.combined.display)}/${billingPeriod === 'annual' ? 'year' : 'month'}` : `Apollo: ${formatCurrency(calculations.apollo.display)}/${billingPeriod === 'annual' ? 'year' : 'month'}`}

Total Savings: ${formatCurrency(savings)}/${billingPeriod === 'annual' ? 'year' : 'month'} (${Math.round(showCombined ? calculations.combined.savingsPercent : calculations.apollo.savingsPercent)}%)

View full comparison at: https://agentmastery.ai/calculators/switch-savings
`
    return text
  }

  const handleEmailComparison = () => {
    const emailText = generateEmailText()
    navigator.clipboard.writeText(emailText)
    alert('Comparison copied to clipboard! Paste it into your email.')
  }

  const generateShareUrl = async () => {
    if (!currentToolData) return ''

    const savings = showCombined ? calculations.combined.savings : calculations.apollo.savings
    const params = new URLSearchParams({
      type: 'switch',
      current: currentToolData.name,
      savings: Math.round(savings * (billingPeriod === 'annual' ? 1 : 12)).toString(),
      percent: Math.round(showCombined ? calculations.combined.savingsPercent : calculations.apollo.savingsPercent).toString(),
      utm_source: 'agentmastery',
      utm_medium: 'calculator',
      utm_campaign: 'switch-savings'
    })

    const ogImageUrl = `/api/og/calculator?${params.toString()}`
    const shareLink = `https://agentmastery.ai/calculators/switch-savings?shared=${btoa(params.toString())}`
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
      a.download = `agentmastery-switch-savings-${Date.now()}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download failed:', error)
    }
    setDownloading(false)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Calculator className="h-8 w-8 text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold">Switch & Save Calculator</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Calculate how much you could save by switching to more cost-effective AI sales tools
        </p>
      </div>

      {/* Category Selector */}
      <div className="max-w-3xl mx-auto px-6 md:px-8 mb-8">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Tool Category</CardTitle>
            <CardDescription>
              Choose the category of tools you want to compare
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Button
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation()
                  setCategoryDropdownOpen(!categoryDropdownOpen)
                }}
                className="w-full justify-between"
              >
                {selectedCategory}
                <ChevronDown className={`h-4 w-4 transition-transform ${categoryDropdownOpen ? 'rotate-180' : ''}`} />
              </Button>
              {categoryDropdownOpen && (
                <div
                  className="absolute top-full left-0 right-0 z-10 mt-1 bg-background border rounded-md shadow-lg"
                  onClick={(e) => e.stopPropagation()}
                >
                  {getAllCategories().map((category) => (
                    <button
                      key={category}
                      className="w-full px-3 py-2 text-left hover:bg-muted transition-colors first:rounded-t-md last:rounded-b-md"
                      onClick={() => {
                        setSelectedCategory(category)
                        setCategoryDropdownOpen(false)
                        // Reset current tool to first tool in category
                        const categoryTools = getToolsByCategory(category)
                        if (categoryTools.length > 0) {
                          setCurrentTool(categoryTools[0].slug)
                        }
                      }}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Configuration */}
      <div className="max-w-3xl mx-auto px-6 md:px-8 mb-8">
        <div className="grid md:grid-cols-2 gap-8">
        <CalculatorSection
          title="Your Current Setup"
          description="Tell us about your current tool and team"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Current Tool</label>
              <div className="grid grid-cols-2 gap-2">
                {categoryTools.slice(0, 8).map((tool) => (
                  <Button
                    key={tool.slug}
                    variant={currentTool === tool.slug ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentTool(tool.slug)}
                    className="justify-start"
                  >
                    {tool.name}
                  </Button>
                ))}
              </div>
            </div>

            <CalculatorInput
              label="Number of Seats"
              value={seats}
              onChange={setSeats}
              min={1}
              max={100}
              step={1}
              suffix=" users"
              tooltip="Number of team members who need access"
            />

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Include Data Add-ons</label>
              <Button
                variant={includeDataAddons ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setIncludeDataAddons(!includeDataAddons)}
              >
                {includeDataAddons ? 'Yes' : 'No'}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Billing Period</label>
              <div className="flex gap-2">
                <Button
                  variant={billingPeriod === 'monthly' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setBillingPeriod('monthly')}
                >
                  Monthly
                </Button>
                <Button
                  variant={billingPeriod === 'annual' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setBillingPeriod('annual')}
                >
                  Annual
                </Button>
              </div>
            </div>
          </div>
        </CalculatorSection>

        <CalculatorSection
          title="Current Costs"
          description={`Your ${currentToolData?.name || 'current tool'} expenses`}
        >
          <div className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="text-3xl font-bold">
                {formatCurrency(calculations.current.display)}
                <span className="text-sm font-normal text-muted-foreground">
                  /{billingPeriod === 'annual' ? 'year' : 'month'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Per Seat</p>
                <p className="font-semibold">{formatCurrency(currentToolData?.seatMonthly || 0)}/mo</p>
              </div>
              {includeDataAddons && currentToolData?.dataAddOnMonthly && (
                <div>
                  <p className="text-sm text-muted-foreground">Data Add-on</p>
                  <p className="font-semibold">{formatCurrency(currentToolData.dataAddOnMonthly)}/mo</p>
                </div>
              )}
            </div>

            {currentToolData && (
              <Alert>
                <Zap className="h-4 w-4" />
                <AlertDescription>
                  <strong>Included Features:</strong>
                  <ul className="mt-2 space-y-1 text-sm">
                    {(currentToolData.features || []).slice(0, 3).map((feature, i) => (
                      <li key={i}>• {feature}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CalculatorSection>
        </div>
      </div>

      {/* Savings Comparison */}
      <div className="max-w-3xl mx-auto px-6 md:px-8 mb-8">
        <Card>
        <CardHeader>
          <CardTitle>Potential Savings</CardTitle>
          <CardDescription>
            Compare your options and see how much you could save
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className={`grid w-full ${
              selectedCategory === 'Database' || selectedCategory === 'Sales Engagement'
                ? (showCombined ? 'grid-cols-3' : 'grid-cols-2')
                : comparisonTools.categoryAlternatives.length === 1 ? 'grid-cols-1' :
                  comparisonTools.categoryAlternatives.length === 2 ? 'grid-cols-2' : 'grid-cols-3'
            }`}>
              {/* Show Apollo and Close for Database/Sales Engagement categories */}
              {(selectedCategory === 'Database' || selectedCategory === 'Sales Engagement') && (
                <>
                  <TabsTrigger value="apollo">Apollo.io</TabsTrigger>
                  <TabsTrigger value="close">Close CRM</TabsTrigger>
                  {showCombined && <TabsTrigger value="combined">Apollo + Close</TabsTrigger>}
                </>
              )}

              {/* Show category alternatives for other categories */}
              {selectedCategory !== 'Database' && selectedCategory !== 'Sales Engagement' && (
                <>
                  {comparisonTools.categoryAlternatives.map((tool, index) => (
                    <TabsTrigger key={tool.slug} value={`alternative${index + 1}`}>
                      {tool.name}
                    </TabsTrigger>
                  ))}
                </>
              )}
            </TabsList>

            {/* Apollo Tab */}
            <TabsContent value="apollo" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="border-green-500/30 bg-green-50/50 dark:bg-green-950/20">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-muted-foreground">You Save</p>
                          <p className="text-3xl font-bold text-green-600">
                            {formatCurrency(calculations.apollo.savings)}
                            <span className="text-sm font-normal">/{billingPeriod === 'annual' ? 'year' : 'month'}</span>
                          </p>
                          <Badge variant="secondary" className="mt-2">
                            {calculations.apollo.savingsPercent.toFixed(0)}% reduction
                          </Badge>
                        </div>

                        <div className="pt-4 border-t">
                          <p className="text-sm text-muted-foreground mb-2">Apollo.io Cost</p>
                          <p className="text-2xl font-semibold">
                            {formatCurrency(calculations.apollo.display)}
                            <span className="text-sm font-normal text-muted-foreground">
                              /{billingPeriod === 'annual' ? 'year' : 'month'}
                            </span>
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <div className="space-y-4">
                  <h4 className="font-semibold">What You Get with Apollo.io</h4>
                  <ul className="space-y-2">
                    {(comparisonTools.apollo?.features || []).map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" asChild>
                    <a
                      href={comparisonTools.apollo?.affiliateUrl || '#'}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="flex items-center justify-center gap-2"
                    >
                      Switch to Apollo.io
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Close Tab */}
            <TabsContent value="close" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="border-green-500/30 bg-green-50/50 dark:bg-green-950/20">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-muted-foreground">You Save</p>
                          <p className="text-3xl font-bold text-green-600">
                            {formatCurrency(calculations.close.savings)}
                            <span className="text-sm font-normal">/{billingPeriod === 'annual' ? 'year' : 'month'}</span>
                          </p>
                          <Badge variant="secondary" className="mt-2">
                            {calculations.close.savingsPercent.toFixed(0)}% reduction
                          </Badge>
                        </div>

                        <div className="pt-4 border-t">
                          <p className="text-sm text-muted-foreground mb-2">Close CRM Cost</p>
                          <p className="text-2xl font-semibold">
                            {formatCurrency(calculations.close.display)}
                            <span className="text-sm font-normal text-muted-foreground">
                              /{billingPeriod === 'annual' ? 'year' : 'month'}
                            </span>
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <div className="space-y-4">
                  <h4 className="font-semibold">What You Get with Close</h4>
                  <ul className="space-y-2">
                    {(comparisonTools.close?.features || []).map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" asChild>
                    <a
                      href={comparisonTools.close?.affiliateUrl || '#'}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="flex items-center justify-center gap-2"
                    >
                      Switch to Close CRM
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Combined Tab */}
            {showCombined && (
              <TabsContent value="combined" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="border-green-500/30 bg-green-50/50 dark:bg-green-950/20">
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm text-muted-foreground">You Save</p>
                            <p className="text-3xl font-bold text-green-600">
                              {formatCurrency(calculations.combined.savings)}
                              <span className="text-sm font-normal">/{billingPeriod === 'annual' ? 'year' : 'month'}</span>
                            </p>
                            <Badge variant="secondary" className="mt-2">
                              {calculations.combined.savingsPercent.toFixed(0)}% reduction
                            </Badge>
                          </div>

                          <div className="pt-4 border-t">
                            <p className="text-sm text-muted-foreground mb-2">Combined Cost</p>
                            <p className="text-2xl font-semibold">
                              {formatCurrency(calculations.combined.display)}
                              <span className="text-sm font-normal text-muted-foreground">
                                /{billingPeriod === 'annual' ? 'year' : 'month'}
                              </span>
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Best of Both Worlds</h4>
                    <p className="text-sm text-muted-foreground">
                      Get Apollo's powerful database and Close's built-in communication tools for less than {currentToolData?.name || 'your current tool'} alone.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Apollo</p>
                        <p className="font-semibold">{formatCurrency(calculations.apollo.monthly)}/mo</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Close</p>
                        <p className="font-semibold">{formatCurrency(calculations.close.monthly)}/mo</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1" variant="outline" asChild>
                        <a
                          href={comparisonTools.apollo?.affiliateUrl || '#'}
                          target="_blank"
                          rel="noopener noreferrer sponsored"
                        >
                          Try Apollo
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </Button>
                      <Button className="flex-1" asChild>
                        <a
                          href={comparisonTools.close?.affiliateUrl || '#'}
                          target="_blank"
                          rel="noopener noreferrer sponsored"
                        >
                          Try Close
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            )}

            {/* Alternative Tabs for Other Categories */}
            {selectedCategory !== 'Database' && selectedCategory !== 'Sales Engagement' &&
              comparisonTools.categoryAlternatives.map((tool, index) => (
                <TabsContent key={tool.slug} value={`alternative${index + 1}`} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="border-green-500/30 bg-green-50/50 dark:bg-green-950/20">
                        <CardContent className="pt-6">
                          <div className="space-y-4">
                            <div>
                              <p className="text-sm text-muted-foreground">You Save</p>
                              <p className="text-3xl font-bold text-green-600">
                                {formatCurrency(
                                  index === 0 ? calculations.alternative1.savings :
                                  index === 1 ? calculations.alternative2.savings : 0
                                )}
                                <span className="text-sm font-normal">/{billingPeriod === 'annual' ? 'year' : 'month'}</span>
                              </p>
                              <Badge variant="secondary" className="mt-2">
                                {(
                                  index === 0 ? calculations.alternative1.savingsPercent :
                                  index === 1 ? calculations.alternative2.savingsPercent : 0
                                ).toFixed(0)}% reduction
                              </Badge>
                            </div>

                            <div className="pt-4 border-t">
                              <p className="text-sm text-muted-foreground mb-2">{tool.name} Cost</p>
                              <p className="text-2xl font-semibold">
                                {formatCurrency(
                                  index === 0 ? calculations.alternative1.display :
                                  index === 1 ? calculations.alternative2.display : 0
                                )}
                                <span className="text-sm font-normal text-muted-foreground">
                                  /{billingPeriod === 'annual' ? 'year' : 'month'}
                                </span>
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>

                    <div className="space-y-4">
                      <h4 className="font-semibold">What You Get with {tool.name}</h4>
                      <ul className="space-y-2">
                        {(tool.features || []).map((feature, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full" asChild>
                        <a
                          href={tool.affiliateUrl || '#'}
                          target="_blank"
                          rel="noopener noreferrer sponsored"
                          className="flex items-center justify-center gap-2"
                        >
                          Switch to {tool.name}
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              ))
            }
          </Tabs>
        </CardContent>
      </Card>
      </div>

      {/* Share & Email Section */}
      <div className="max-w-3xl mx-auto px-6 md:px-8 mb-6">
        <Card>
        <CardHeader>
          <CardTitle className="text-lg">Share Your Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={handleEmailComparison}>
              <Mail className="h-4 w-4 mr-2" />
              Email Comparison
            </Button>
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share Result
            </Button>
            <Button variant="outline" onClick={handleDownload} disabled={downloading}>
              <Download className="h-4 w-4 mr-2" />
              {downloading ? 'Generating...' : 'Download'}
            </Button>
            <Button variant="ghost" onClick={() => navigator.clipboard.writeText(generateEmailText())}>
              <Copy className="h-4 w-4 mr-2" />
              Copy Text
            </Button>
          </div>
          {shareUrl && (
            <p className="text-sm text-muted-foreground mt-2">
              Share link copied to clipboard!
            </p>
          )}
        </CardContent>
      </Card>
      </div>

      {/* Annual Savings Summary */}
      {billingPeriod === 'monthly' && (
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h3 className="text-lg font-semibold">Annual Savings Potential</h3>
              <div className={`grid gap-4 ${
                selectedCategory === 'Database' || selectedCategory === 'Sales Engagement'
                  ? (showCombined ? 'grid-cols-3' : 'grid-cols-2')
                  : comparisonTools.categoryAlternatives.length === 1 ? 'grid-cols-1' : 'grid-cols-2'
              }`}>
                {selectedCategory === 'Database' || selectedCategory === 'Sales Engagement' ? (
                  <>
                    <div>
                      <p className="text-sm text-muted-foreground">With Apollo</p>
                      <p className="text-2xl font-bold text-green-600">
                        {formatCurrency(calculations.apollo.savings * 12)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">With Close</p>
                      <p className="text-2xl font-bold text-green-600">
                        {formatCurrency(calculations.close.savings * 12)}
                      </p>
                    </div>
                    {showCombined && (
                      <div>
                        <p className="text-sm text-muted-foreground">Combined</p>
                        <p className="text-2xl font-bold text-green-600">
                          {formatCurrency(calculations.combined.savings * 12)}
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  comparisonTools.categoryAlternatives.map((tool, index) => (
                    <div key={tool.slug}>
                      <p className="text-sm text-muted-foreground">With {tool.name}</p>
                      <p className="text-2xl font-bold text-green-600">
                        {formatCurrency(
                          (index === 0 ? calculations.alternative1.savings :
                           index === 1 ? calculations.alternative2.savings : 0) * 12
                        )}
                      </p>
                    </div>
                  ))
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                💡 Switch to annual billing for an additional 10% discount
              </p>
            </div>
          </CardContent>
        </Card>
        </div>
      )}
    </div>
  )
}