'use client'

import { useState, useMemo, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Phone,
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  Target,
  BarChart3,
  Zap,
  Award,
  Info,
  ArrowUp,
  Database,
  MessageSquare,
  Headphones,
  ExternalLink
} from 'lucide-react'
import Link from 'next/link'

interface CalculatorInputs {
  dailyDials: number
  connectRate: number
  conversationRate: number
  meetingBookedRate: number
  winRate: number
  avgDealSize: number
  revenueGoal: number
}

type TimeHorizon = 'day' | 'week' | 'month'

const WORK_DAYS_PER_WEEK = 5
const WORK_DAYS_PER_MONTH = 22

export function ColdCallCalculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    dailyDials: 50,
    connectRate: 10,
    conversationRate: 50,
    meetingBookedRate: 30,
    winRate: 20,
    avgDealSize: 5000,
    revenueGoal: 50000
  })

  const [timeHorizon, setTimeHorizon] = useState<TimeHorizon>('month')

  // Calculate total dials based on time horizon
  const totalDials = useMemo(() => {
    switch (timeHorizon) {
      case 'day':
        return inputs.dailyDials
      case 'week':
        return inputs.dailyDials * WORK_DAYS_PER_WEEK
      case 'month':
        return inputs.dailyDials * WORK_DAYS_PER_MONTH
      default:
        return inputs.dailyDials
    }
  }, [inputs.dailyDials, timeHorizon])

  // Core calculations - all dynamic based on total dials
  const calculations = useMemo(() => {
    // Forward calculations from dials
    const connects = (totalDials * inputs.connectRate) / 100
    const conversations = (connects * inputs.conversationRate) / 100
    const meetings = (conversations * inputs.meetingBookedRate) / 100
    const deals = (meetings * inputs.winRate) / 100
    const revenue = deals * inputs.avgDealSize

    // Reverse calculations from revenue goal
    const dealsNeededForGoal = inputs.avgDealSize > 0 ? inputs.revenueGoal / inputs.avgDealSize : 0
    const meetingsNeededForGoal = inputs.winRate > 0 ? (dealsNeededForGoal * 100) / inputs.winRate : 0
    const conversationsNeededForGoal = inputs.meetingBookedRate > 0 ? (meetingsNeededForGoal * 100) / inputs.meetingBookedRate : 0
    const connectsNeededForGoal = inputs.conversationRate > 0 ? (conversationsNeededForGoal * 100) / inputs.conversationRate : 0
    const dialsNeededForGoal = inputs.connectRate > 0 ? (connectsNeededForGoal * 100) / inputs.connectRate : 0

    // Calculate daily dials needed based on time horizon
    let dailyDialsNeeded = dialsNeededForGoal
    if (timeHorizon === 'week') {
      dailyDialsNeeded = dialsNeededForGoal / WORK_DAYS_PER_WEEK
    } else if (timeHorizon === 'month') {
      dailyDialsNeeded = dialsNeededForGoal / WORK_DAYS_PER_MONTH
    }

    // Value metrics
    const valuePerDial = totalDials > 0 ? revenue / totalDials : 0
    const valuePerMeeting = meetings > 0 ? revenue / meetings : 0
    const conversionRate = totalDials > 0 ? (deals / totalDials) * 100 : 0

    // Efficiency metrics
    const activityEfficiencyScore = Math.round(
      ((Math.min(inputs.connectRate, 30) / 30) * 25) +
      ((Math.min(inputs.conversationRate, 80) / 80) * 25) +
      ((Math.min(inputs.meetingBookedRate, 50) / 50) * 25) +
      ((Math.min(inputs.winRate, 30) / 30) * 25) * 100
    )

    // Pipeline metrics
    const pipelineValue = meetings * inputs.avgDealSize * (inputs.winRate / 100)
    const pipelineCoverage = inputs.revenueGoal > 0 ? (revenue / inputs.revenueGoal) * 100 : 0
    const revenueGap = Math.max(0, inputs.revenueGoal - revenue)

    // More realistic scenario comparisons
    const currentEffectiveDials = totalDials * (inputs.connectRate / 100) * (inputs.conversationRate / 100) *
                                  (inputs.meetingBookedRate / 100) * (inputs.winRate / 100)
    const targetEffectiveDials = dealsNeededForGoal

    // Calculate realistic improvements needed
    let connectRateNeeded = inputs.connectRate
    let winRateNeeded = inputs.winRate
    let dialIncreasePercent = 0

    if (revenue < inputs.revenueGoal) {
      // Option 1: Increase dials
      if (totalDials > 0) {
        dialIncreasePercent = ((dialsNeededForGoal - totalDials) / totalDials) * 100
      }

      // Option 2: Improve connect rate (max realistic improvement to 20%)
      if (currentEffectiveDials > 0 && targetEffectiveDials > 0) {
        const multiplierNeeded = targetEffectiveDials / currentEffectiveDials
        connectRateNeeded = Math.min(20, inputs.connectRate * Math.sqrt(multiplierNeeded))
      }

      // Option 3: Improve win rate (max realistic improvement to 35%)
      if (meetings > 0) {
        winRateNeeded = Math.min(35, (dealsNeededForGoal / meetings) * 100)
      }
    }

    // Determine bottleneck for recommendations
    let bottleneck = 'general'
    if (inputs.connectRate < 8) {
      bottleneck = 'connect'
    } else if (inputs.conversationRate < 40) {
      bottleneck = 'conversation'
    } else if (inputs.meetingBookedRate < 20) {
      bottleneck = 'meeting'
    } else if (inputs.winRate < 15) {
      bottleneck = 'closing'
    } else if (totalDials < 100) {
      bottleneck = 'volume'
    }

    return {
      totalDials,
      connects: Math.round(connects * 10) / 10,
      conversations: Math.round(conversations * 10) / 10,
      meetings: Math.round(meetings * 10) / 10,
      deals: Math.round(deals * 100) / 100,
      revenue: Math.round(revenue),
      valuePerDial: Math.round(valuePerDial * 100) / 100,
      valuePerMeeting: Math.round(valuePerMeeting),
      conversionRate: Math.round(conversionRate * 100) / 100,
      dialsNeededForGoal: Math.ceil(dialsNeededForGoal),
      dailyDialsNeeded: Math.ceil(dailyDialsNeeded),
      meetingsNeededForGoal: Math.ceil(meetingsNeededForGoal),
      activityEfficiencyScore,
      pipelineValue: Math.round(pipelineValue),
      pipelineCoverage: Math.round(pipelineCoverage),
      revenueGap: Math.round(revenueGap),
      scenarios: {
        dialIncreasePercent: Math.max(0, dialIncreasePercent),
        connectRateNeeded: Math.round(connectRateNeeded * 10) / 10,
        winRateNeeded: Math.round(winRateNeeded * 10) / 10
      },
      bottleneck
    }
  }, [inputs, timeHorizon, totalDials])

  const handleInputChange = (field: keyof CalculatorInputs, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }))
  }

  // Get time horizon label
  const getTimeLabel = () => {
    switch (timeHorizon) {
      case 'day': return 'Daily'
      case 'week': return 'Weekly'
      case 'month': return 'Monthly'
    }
  }

  // Funnel data for visualization - fully dynamic
  const funnelData = [
    { stage: `${getTimeLabel()} Dials`, value: calculations.totalDials, maxValue: calculations.totalDials, color: 'from-blue-500 to-blue-600' },
    { stage: 'Connects', value: calculations.connects, maxValue: calculations.totalDials, color: 'from-cyan-500 to-cyan-600' },
    { stage: 'Conversations', value: calculations.conversations, maxValue: calculations.totalDials, color: 'from-green-500 to-green-600' },
    { stage: 'Meetings', value: calculations.meetings, maxValue: calculations.totalDials, color: 'from-yellow-500 to-yellow-600' },
    { stage: 'Deals Won', value: calculations.deals, maxValue: calculations.totalDials, color: 'from-orange-500 to-orange-600' },
  ]

  // Tool recommendations based on bottleneck
  const getToolRecommendation = () => {
    switch (calculations.bottleneck) {
      case 'connect':
        return {
          title: 'Boost Connect Rates',
          tools: [
            { name: 'ZoomInfo', href: '/tools/zoominfo', description: 'Better phone data = higher connect rates', affiliate: false },
            { name: 'Apollo', href: 'https://get.apollo.io/qq0iw5w2fskf', description: 'Verified contacts with direct dials', affiliate: true }
          ]
        }
      case 'conversation':
        return {
          title: 'Improve Conversations',
          tools: [
            { name: 'ChatGPT', href: '/tools/chatgpt', description: 'Generate better cold call scripts', affiliate: false },
            { name: 'Gong', href: '/tools', description: 'Call coaching and analytics', affiliate: false }
          ]
        }
      case 'meeting':
        return {
          title: 'Book More Meetings',
          tools: [
            { name: 'Calendly', href: '/tools', description: 'Instant booking while on the call', affiliate: false },
            { name: 'Chili Piper', href: '/tools', description: 'Smart routing and scheduling', affiliate: false }
          ]
        }
      case 'closing':
        return {
          title: 'Close More Deals',
          tools: [
            { name: 'Close CRM', href: 'https://refer.close.com/lvdqjdm97t92-fetl0j', description: 'Built-in calling and follow-up', affiliate: true },
            { name: 'HubSpot', href: '/tools/hubspot', description: 'Full sales automation suite', affiliate: false }
          ]
        }
      case 'volume':
        return {
          title: 'Scale Your Outreach',
          tools: [
            { name: 'PhoneBurner', href: '/tools', description: '4x more dials per hour', affiliate: false },
            { name: 'Orum', href: '/tools', description: 'AI-powered parallel dialer', affiliate: false }
          ]
        }
      default:
        return {
          title: 'Optimize Your Stack',
          tools: [
            { name: 'Apollo', href: 'https://get.apollo.io/qq0iw5w2fskf', description: 'All-in-one sales platform', affiliate: true },
            { name: 'Close CRM', href: 'https://refer.close.com/lvdqjdm97t92-fetl0j', description: 'CRM with built-in calling', affiliate: true }
          ]
        }
    }
  }

  const toolRecommendation = getToolRecommendation()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Cold Call Calculator</h1>
        <p className="text-muted-foreground">
          See how daily activity compounds into revenue
        </p>
      </div>

      {/* Time Horizon Toggle */}
      <Card className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center justify-center gap-3">
          <span className="text-sm font-medium">View results for:</span>
          <div className="flex gap-2">
            {(['day', 'week', 'month'] as TimeHorizon[]).map(horizon => (
              <Button
                key={horizon}
                size="sm"
                variant={timeHorizon === horizon ? 'primary' : 'outline'}
                onClick={() => setTimeHorizon(horizon)}
                className="capitalize"
              >
                {horizon === 'day' ? 'Daily' : horizon === 'week' ? 'Weekly' : 'Monthly'}
              </Button>
            ))}
          </div>
        </div>
        <p className="text-xs text-center text-muted-foreground mt-2">
          {timeHorizon === 'week' && `${inputs.dailyDials} daily dials × ${WORK_DAYS_PER_WEEK} days = ${calculations.totalDials} weekly dials`}
          {timeHorizon === 'month' && `${inputs.dailyDials} daily dials × ${WORK_DAYS_PER_MONTH} days = ${calculations.totalDials} monthly dials`}
          {timeHorizon === 'day' && `Showing results for ${inputs.dailyDials} daily dials`}
        </p>
      </Card>

      {/* Current vs Goal */}
      <Card className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{getTimeLabel()} Pipeline</p>
            <p className="text-2xl font-bold text-green-700">${calculations.revenue.toLocaleString()}</p>
          </div>
          <div className="text-center px-4">
            {calculations.pipelineCoverage >= 100 ? (
              <>
                <Target className="h-5 w-5 text-green-600 mx-auto" />
                <p className="text-xs text-green-600 font-medium mt-1">Goal achieved!</p>
              </>
            ) : (
              <>
                <ArrowUp className="h-5 w-5 text-orange-600 mx-auto" />
                <p className="text-xs text-muted-foreground mt-1">
                  {calculations.pipelineCoverage}% of goal
                </p>
              </>
            )}
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">{getTimeLabel()} Goal</p>
            <p className="text-2xl font-bold text-green-700">${inputs.revenueGoal.toLocaleString()}</p>
          </div>
        </div>
        {calculations.revenueGap > 0 && (
          <div className="mt-3 pt-3 border-t border-green-200">
            <p className="text-sm text-orange-600 font-medium">
              Gap to goal: ${calculations.revenueGap.toLocaleString()} ({calculations.dailyDialsNeeded - inputs.dailyDials} more daily dials needed)
            </p>
          </div>
        )}
      </Card>

      {/* Input Section */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Phone className="h-5 w-5" />
          Activity Inputs
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Daily Dials */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Daily Dials (per rep)</label>
            <input
              type="number"
              value={inputs.dailyDials}
              onChange={(e) => handleInputChange('dailyDials', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green"
            />
            <input
              type="range"
              min="0"
              max="200"
              value={inputs.dailyDials}
              onChange={(e) => handleInputChange('dailyDials', parseInt(e.target.value))}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              {getTimeLabel()}: {calculations.totalDials} total dials
            </p>
          </div>

          {/* Connect Rate */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Connect Rate (%)</label>
            <input
              type="number"
              value={inputs.connectRate}
              onChange={(e) => handleInputChange('connectRate', Math.min(100, parseInt(e.target.value) || 0))}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green"
              min="0"
              max="100"
            />
            <input
              type="range"
              min="0"
              max="30"
              value={inputs.connectRate}
              onChange={(e) => handleInputChange('connectRate', parseInt(e.target.value))}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              Industry avg: 8-12% | Good: 15%+
            </p>
          </div>

          {/* Conversation Rate */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Connect → Conversation (%)</label>
            <input
              type="number"
              value={inputs.conversationRate}
              onChange={(e) => handleInputChange('conversationRate', Math.min(100, parseInt(e.target.value) || 0))}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green"
              min="0"
              max="100"
            />
            <input
              type="range"
              min="0"
              max="100"
              value={inputs.conversationRate}
              onChange={(e) => handleInputChange('conversationRate', parseInt(e.target.value))}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              {calculations.connects} connects → {calculations.conversations} conversations
            </p>
          </div>

          {/* Meeting Booked Rate */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Conversation → Meeting (%)</label>
            <input
              type="number"
              value={inputs.meetingBookedRate}
              onChange={(e) => handleInputChange('meetingBookedRate', Math.min(100, parseInt(e.target.value) || 0))}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green"
              min="0"
              max="100"
            />
            <input
              type="range"
              min="0"
              max="80"
              value={inputs.meetingBookedRate}
              onChange={(e) => handleInputChange('meetingBookedRate', parseInt(e.target.value))}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              {calculations.conversations} convos → {calculations.meetings} meetings
            </p>
          </div>

          {/* Win Rate */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Meeting → Close Rate (%)</label>
            <input
              type="number"
              value={inputs.winRate}
              onChange={(e) => handleInputChange('winRate', Math.min(100, parseInt(e.target.value) || 0))}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green"
              min="0"
              max="100"
            />
            <input
              type="range"
              min="0"
              max="50"
              value={inputs.winRate}
              onChange={(e) => handleInputChange('winRate', parseInt(e.target.value))}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              {calculations.meetings} meetings → {calculations.deals} deals
            </p>
          </div>

          {/* Average Deal Size */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Average Deal Size ($)</label>
            <input
              type="number"
              value={inputs.avgDealSize}
              onChange={(e) => handleInputChange('avgDealSize', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green"
            />
            <p className="text-xs text-muted-foreground">
              {calculations.deals} deals × ${inputs.avgDealSize.toLocaleString()} = ${calculations.revenue.toLocaleString()}
            </p>
          </div>

          {/* Revenue Goal */}
          <div className="space-y-2">
            <label className="text-sm font-medium">{getTimeLabel()} Revenue Goal ($)</label>
            <input
              type="number"
              value={inputs.revenueGoal}
              onChange={(e) => handleInputChange('revenueGoal', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green"
            />
            <p className="text-xs text-muted-foreground">
              Need {calculations.dailyDialsNeeded} daily dials
            </p>
          </div>
        </div>
      </Card>

      {/* Live Funnel Visualization */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          {getTimeLabel()} Sales Funnel
        </h2>
        <div className="space-y-3">
          {funnelData.map((item, index) => {
            const percentage = item.maxValue > 0 ? (item.value / item.maxValue) * 100 : 0
            return (
              <div key={item.stage}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{item.stage}</span>
                  <span className="text-sm font-bold">
                    {item.value < 1 ? item.value.toFixed(2) : Math.round(item.value).toLocaleString()}
                  </span>
                </div>
                <div className="h-8 bg-gray-200 rounded-lg overflow-hidden relative">
                  <div
                    className={`h-full bg-gradient-to-r ${item.color} rounded-lg transition-all duration-500 ease-out`}
                    style={{ width: `${Math.max(2, percentage)}%` }}
                  />
                  {percentage > 20 && (
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-white text-xs font-medium">
                      {percentage.toFixed(1)}%
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Realistic Scenarios */}
      {calculations.revenueGap > 0 && (
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5" />
            3 Ways to Hit Your Goal
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {/* Scenario 1: Increase Dials */}
            <div className="p-4 bg-white rounded-lg">
              <h3 className="font-medium text-sm mb-2">Option 1: More Dials</h3>
              <p className="text-2xl font-bold text-blue-600">
                {calculations.dailyDialsNeeded}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Daily dials needed
              </p>
              {calculations.scenarios.dialIncreasePercent > 0 && calculations.scenarios.dialIncreasePercent < 200 && (
                <Badge className="mt-2 bg-orange-100 text-orange-700">
                  +{calculations.scenarios.dialIncreasePercent.toFixed(0)}% increase
                </Badge>
              )}
              {calculations.scenarios.dialIncreasePercent >= 200 && (
                <Badge className="mt-2 bg-red-100 text-red-700">
                  Needs scaling team
                </Badge>
              )}
            </div>

            {/* Scenario 2: Improve Connect Rate */}
            <div className="p-4 bg-white rounded-lg">
              <h3 className="font-medium text-sm mb-2">Option 2: Better Data</h3>
              <p className="text-2xl font-bold text-green-600">
                {calculations.scenarios.connectRateNeeded}%
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Connect rate target
              </p>
              {calculations.scenarios.connectRateNeeded > inputs.connectRate && calculations.scenarios.connectRateNeeded <= 20 && (
                <Badge className="mt-2 bg-green-100 text-green-700">
                  +{(calculations.scenarios.connectRateNeeded - inputs.connectRate).toFixed(1)}% achievable
                </Badge>
              )}
              {calculations.scenarios.connectRateNeeded > 20 && (
                <Badge className="mt-2 bg-yellow-100 text-yellow-700">
                  Combine with dials
                </Badge>
              )}
            </div>

            {/* Scenario 3: Improve Win Rate */}
            <div className="p-4 bg-white rounded-lg">
              <h3 className="font-medium text-sm mb-2">Option 3: Close Better</h3>
              <p className="text-2xl font-bold text-purple-600">
                {calculations.scenarios.winRateNeeded}%
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Win rate target
              </p>
              {calculations.scenarios.winRateNeeded > inputs.winRate && calculations.scenarios.winRateNeeded <= 35 && (
                <Badge className="mt-2 bg-purple-100 text-purple-700">
                  +{(calculations.scenarios.winRateNeeded - inputs.winRate).toFixed(1)}% possible
                </Badge>
              )}
              {calculations.scenarios.winRateNeeded > 35 && (
                <Badge className="mt-2 bg-yellow-100 text-yellow-700">
                  Needs other improvements
                </Badge>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Value Per Dial */}
        <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Value Per Dial</p>
              <p className="text-2xl font-bold text-green-700">
                ${calculations.valuePerDial.toFixed(2)}
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-green-500 opacity-50" />
          </div>
        </Card>

        {/* Daily Dials Needed */}
        <Card className="p-4 bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Daily Dials for Goal</p>
              <p className="text-2xl font-bold text-orange-700">
                {calculations.dailyDialsNeeded}
              </p>
            </div>
            <Phone className="h-8 w-8 text-orange-500 opacity-50" />
          </div>
        </Card>

        {/* Meetings Needed */}
        <Card className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Meetings for Goal</p>
              <p className="text-2xl font-bold text-purple-700">
                {calculations.meetingsNeededForGoal}
              </p>
            </div>
            <Calendar className="h-8 w-8 text-purple-500 opacity-50" />
          </div>
        </Card>

        {/* Efficiency Score */}
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Efficiency Score</p>
              <p className="text-2xl font-bold text-blue-700">
                {calculations.activityEfficiencyScore}%
              </p>
            </div>
            <Award className="h-8 w-8 text-blue-500 opacity-50" />
          </div>
        </Card>
      </div>

      {/* Tool Recommendations */}
      <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Headphones className="h-5 w-5" />
          {toolRecommendation.title}
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Based on your metrics, these tools can help you improve:
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {toolRecommendation.tools.map((tool, index) => (
            <a
              key={index}
              href={tool.href}
              target={tool.affiliate ? "_blank" : undefined}
              rel={tool.affiliate ? "noopener noreferrer sponsored" : undefined}
              className="p-4 bg-white rounded-lg border hover:border-green-400 transition-all hover:shadow-md group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium flex items-center gap-2">
                    {tool.name}
                    {tool.affiliate && (
                      <Badge className="bg-green-100 text-green-700 text-xs">
                        Partner
                      </Badge>
                    )}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {tool.description}
                  </p>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-green-600" />
              </div>
            </a>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Link href="/quiz">
            <Button variant="outline" size="sm">
              Get Full Tool Stack Recommendation →
            </Button>
          </Link>
        </div>
      </Card>

      {/* Performance Insights */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Performance Insights
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Value Per Meeting */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Value Per Meeting</p>
            <p className="text-3xl font-bold text-indigo-600">
              ${calculations.valuePerMeeting.toLocaleString()}
            </p>
            <Badge className="mt-2" variant={calculations.valuePerMeeting > 3000 ? 'success' : 'warning'}>
              {calculations.valuePerMeeting > 3000 ? 'Strong ROI' : 'Optimize Pipeline'}
            </Badge>
          </div>

          {/* Overall Conversion */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Dial → Deal Rate</p>
            <p className="text-3xl font-bold text-green-600">
              {calculations.conversionRate}%
            </p>
            <Badge className="mt-2" variant={calculations.conversionRate > 0.5 ? 'success' : 'warning'}>
              {calculations.conversionRate > 0.5 ? 'Above Average' : 'Room to Improve'}
            </Badge>
          </div>

          {/* Pipeline Coverage */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Goal Coverage</p>
            <p className="text-3xl font-bold text-purple-600">
              {calculations.pipelineCoverage}%
            </p>
            <Badge className="mt-2" variant={calculations.pipelineCoverage >= 100 ? 'success' : 'warning'}>
              {calculations.pipelineCoverage >= 100 ? 'On Track!' : 'Keep Pushing'}
            </Badge>
          </div>
        </div>
      </Card>

      {/* Tips */}
      <Card className="p-4 bg-muted/50">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-muted-foreground mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <p className="font-medium mb-1">Pro Tips:</p>
            <ul className="space-y-1">
              <li>• A 2% improvement in connect rate can equal 20% more revenue</li>
              <li>• Focus on one metric at a time for best results</li>
              <li>• Quality conversations beat quantity every time</li>
              <li>• Track daily, optimize weekly, celebrate monthly</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  )
}