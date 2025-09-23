'use client'

import { useState, useMemo } from 'react'
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
  ArrowDown
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface CalculatorInputs {
  dials: number
  connectRate: number
  conversationRate: number
  meetingBookedRate: number
  winRate: number
  avgDealSize: number
  revenueGoal: number
}

type TimeHorizon = 'day' | 'week' | 'month'

export function ColdCallCalculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    dials: 100,
    connectRate: 10,
    conversationRate: 50,
    meetingBookedRate: 30,
    winRate: 20,
    avgDealSize: 10000,
    revenueGoal: 100000
  })

  const [timeHorizon, setTimeHorizon] = useState<TimeHorizon>('month')

  // Core calculations - all dynamic based on inputs
  const calculations = useMemo(() => {
    // Forward calculations from dials
    const connects = (inputs.dials * inputs.connectRate) / 100
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

    // Time-based calculations
    const workDaysPerMonth = 22
    const workDaysPerWeek = 5

    let dialsPerPeriod = dialsNeededForGoal
    let periodLabel = 'Per Month'

    if (timeHorizon === 'day') {
      dialsPerPeriod = dialsNeededForGoal / workDaysPerMonth
      periodLabel = 'Per Day'
    } else if (timeHorizon === 'week') {
      dialsPerPeriod = dialsNeededForGoal / (workDaysPerMonth / workDaysPerWeek)
      periodLabel = 'Per Week'
    }

    // Value metrics
    const valuePerDial = inputs.dials > 0 ? revenue / inputs.dials : 0
    const valuePerMeeting = meetings > 0 ? revenue / meetings : 0
    const conversionRate = inputs.dials > 0 ? (deals / inputs.dials) * 100 : 0

    // Efficiency metrics
    const activityEfficiencyScore = Math.round(
      ((inputs.connectRate * 0.25) +
       (inputs.conversationRate * 0.25) +
       (inputs.meetingBookedRate * 0.25) +
       (inputs.winRate * 0.25))
    )

    // Pipeline metrics
    const pipelineValue = meetings * inputs.avgDealSize * (inputs.winRate / 100)
    const pipelineCoverage = inputs.revenueGoal > 0 ? (pipelineValue / inputs.revenueGoal) * 100 : 0
    const revenueGap = Math.max(0, inputs.revenueGoal - revenue)

    // Scenario comparisons - what changes would be needed to hit goal
    const scenarios = {
      dialIncrease: dialsNeededForGoal > inputs.dials ? ((dialsNeededForGoal - inputs.dials) / inputs.dials) * 100 : 0,
      connectRateNeeded: inputs.dials > 0 && dialsNeededForGoal > 0 ? (dialsNeededForGoal / inputs.dials) * inputs.connectRate : inputs.connectRate,
      winRateNeeded: meetings > 0 && dealsNeededForGoal > 0 ? (dealsNeededForGoal / meetings) * 100 : inputs.winRate
    }

    return {
      connects: Math.round(connects * 10) / 10,
      conversations: Math.round(conversations * 10) / 10,
      meetings: Math.round(meetings * 10) / 10,
      deals: Math.round(deals * 100) / 100,
      revenue: Math.round(revenue),
      valuePerDial: Math.round(valuePerDial * 100) / 100,
      valuePerMeeting: Math.round(valuePerMeeting),
      conversionRate: Math.round(conversionRate * 100) / 100,
      dialsNeededForGoal: Math.ceil(dialsNeededForGoal),
      meetingsNeededForGoal: Math.ceil(meetingsNeededForGoal),
      dialsPerPeriod: Math.ceil(dialsPerPeriod),
      periodLabel,
      activityEfficiencyScore,
      pipelineValue: Math.round(pipelineValue),
      pipelineCoverage: Math.round(pipelineCoverage),
      revenueGap: Math.round(revenueGap),
      scenarios
    }
  }, [inputs, timeHorizon])

  const handleInputChange = (field: keyof CalculatorInputs, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }))
  }

  // Funnel data for visualization - fully dynamic
  const funnelData = [
    { stage: 'Dials', value: inputs.dials, maxValue: inputs.dials, color: 'from-blue-500 to-blue-600' },
    { stage: 'Connects', value: calculations.connects, maxValue: inputs.dials, color: 'from-cyan-500 to-cyan-600' },
    { stage: 'Conversations', value: calculations.conversations, maxValue: inputs.dials, color: 'from-green-500 to-green-600' },
    { stage: 'Meetings', value: calculations.meetings, maxValue: inputs.dials, color: 'from-yellow-500 to-yellow-600' },
    { stage: 'Deals Won', value: calculations.deals, maxValue: inputs.dials, color: 'from-orange-500 to-orange-600' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Cold Call Calculator</h1>
        <p className="text-muted-foreground">
          See how changes in activity and conversion rates impact revenue
        </p>
      </div>

      {/* Current vs Goal */}
      <Card className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Current Pipeline</p>
            <p className="text-2xl font-bold text-green-700">${calculations.revenue.toLocaleString()}</p>
          </div>
          <div className="text-center px-4">
            <ArrowUp className="h-5 w-5 text-green-600 mx-auto" />
            <p className="text-xs text-muted-foreground mt-1">
              {calculations.pipelineCoverage}% of goal
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Revenue Goal</p>
            <p className="text-2xl font-bold text-green-700">${inputs.revenueGoal.toLocaleString()}</p>
          </div>
        </div>
        {calculations.revenueGap > 0 && (
          <div className="mt-3 pt-3 border-t border-green-200">
            <p className="text-sm text-orange-600 font-medium">
              Gap to goal: ${calculations.revenueGap.toLocaleString()}
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
          {/* Dials */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Number of Dials</label>
            <input
              type="number"
              value={inputs.dials}
              onChange={(e) => handleInputChange('dials', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green"
            />
            <input
              type="range"
              min="0"
              max="500"
              value={inputs.dials}
              onChange={(e) => handleInputChange('dials', parseInt(e.target.value))}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              Currently: {inputs.dials} → {calculations.connects} connects
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
              max="50"
              value={inputs.connectRate}
              onChange={(e) => handleInputChange('connectRate', parseInt(e.target.value))}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              Industry avg: 8-15%
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
              Currently: {calculations.connects} → {calculations.conversations} conversations
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
              max="100"
              value={inputs.meetingBookedRate}
              onChange={(e) => handleInputChange('meetingBookedRate', parseInt(e.target.value))}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              Currently: {calculations.conversations} → {calculations.meetings} meetings
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
              max="100"
              value={inputs.winRate}
              onChange={(e) => handleInputChange('winRate', parseInt(e.target.value))}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              Currently: {calculations.meetings} → {calculations.deals} deals
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
            <label className="text-sm font-medium">Revenue Goal ($)</label>
            <input
              type="number"
              value={inputs.revenueGoal}
              onChange={(e) => handleInputChange('revenueGoal', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green"
            />
            <p className="text-xs text-muted-foreground">
              Need {calculations.dialsNeededForGoal} total dials
            </p>
          </div>
        </div>
      </Card>

      {/* Live Funnel Visualization */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Live Sales Funnel
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

      {/* Scenario Analysis */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Ways to Hit Your Goal
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {/* Scenario 1: Increase Dials */}
          <div className="p-4 bg-white rounded-lg">
            <h3 className="font-medium text-sm mb-2">Option 1: More Dials</h3>
            <p className="text-2xl font-bold text-blue-600">
              {calculations.dialsNeededForGoal}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Total dials needed
            </p>
            {calculations.dialsNeededForGoal > inputs.dials && (
              <Badge className="mt-2 bg-orange-100 text-orange-700">
                +{calculations.scenarios.dialIncrease.toFixed(0)}% increase
              </Badge>
            )}
          </div>

          {/* Scenario 2: Improve Connect Rate */}
          <div className="p-4 bg-white rounded-lg">
            <h3 className="font-medium text-sm mb-2">Option 2: Better Connect Rate</h3>
            <p className="text-2xl font-bold text-green-600">
              {calculations.scenarios.connectRateNeeded.toFixed(1)}%
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Connect rate needed
            </p>
            {calculations.scenarios.connectRateNeeded > inputs.connectRate && (
              <Badge className="mt-2 bg-green-100 text-green-700">
                +{(calculations.scenarios.connectRateNeeded - inputs.connectRate).toFixed(1)}% points
              </Badge>
            )}
          </div>

          {/* Scenario 3: Improve Win Rate */}
          <div className="p-4 bg-white rounded-lg">
            <h3 className="font-medium text-sm mb-2">Option 3: Better Win Rate</h3>
            <p className="text-2xl font-bold text-purple-600">
              {calculations.scenarios.winRateNeeded.toFixed(1)}%
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Win rate needed
            </p>
            {calculations.scenarios.winRateNeeded > inputs.winRate && (
              <Badge className="mt-2 bg-purple-100 text-purple-700">
                +{(calculations.scenarios.winRateNeeded - inputs.winRate).toFixed(1)}% points
              </Badge>
            )}
          </div>
        </div>
      </Card>

      {/* Time Horizon Toggle */}
      <Card className="p-4">
        <div className="flex items-center justify-center gap-2">
          <span className="text-sm font-medium">Activity needed:</span>
          <div className="flex gap-2">
            {(['day', 'week', 'month'] as TimeHorizon[]).map(horizon => (
              <Button
                key={horizon}
                size="sm"
                variant={timeHorizon === horizon ? 'primary' : 'outline'}
                onClick={() => setTimeHorizon(horizon)}
                className="capitalize"
              >
                Per {horizon}
              </Button>
            ))}
          </div>
        </div>
      </Card>

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

        {/* Dials Needed */}
        <Card className="p-4 bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                {calculations.periodLabel}
              </p>
              <p className="text-2xl font-bold text-orange-700">
                {calculations.dialsPerPeriod}
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

      {/* Advanced Metrics */}
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
            <Badge className="mt-2" variant={calculations.valuePerMeeting > 5000 ? 'success' : 'warning'}>
              {calculations.valuePerMeeting > 5000 ? 'Strong' : 'Optimize'}
            </Badge>
          </div>

          {/* Overall Conversion */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Dial to Deal</p>
            <p className="text-3xl font-bold text-green-600">
              {calculations.conversionRate}%
            </p>
            <Badge className="mt-2" variant={calculations.conversionRate > 1 ? 'success' : 'warning'}>
              {calculations.conversionRate > 1 ? 'Above Average' : 'Room to Grow'}
            </Badge>
          </div>

          {/* Pipeline Value */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Pipeline Value</p>
            <p className="text-3xl font-bold text-purple-600">
              ${calculations.pipelineValue.toLocaleString()}
            </p>
            <Badge className="mt-2" variant="default">
              {calculations.pipelineCoverage}% Coverage
            </Badge>
          </div>
        </div>
      </Card>

      {/* Tips */}
      <Card className="p-4 bg-muted/50">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-muted-foreground mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <p className="font-medium mb-1">Key Insights:</p>
            <ul className="space-y-1">
              <li>• Small improvements in connect rate have massive downstream impact</li>
              <li>• Focus on conversation quality over quantity for better meeting rates</li>
              <li>• Track these metrics daily to spot trends before they become problems</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  )
}