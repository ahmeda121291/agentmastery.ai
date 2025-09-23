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
  Clock,
  Award,
  Info
} from 'lucide-react'
import { motion } from 'framer-motion'

interface CalculatorInputs {
  dials: number
  connectRate: number
  conversationRate: number
  meetingBookedRate: number
  winRate: number
  avgDealSize: number
  revenueGoal: number
  costPerDial: number
  avgSalesCycle: number
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
    revenueGoal: 100000,
    costPerDial: 2,
    avgSalesCycle: 30
  })

  const [timeHorizon, setTimeHorizon] = useState<TimeHorizon>('day')

  // Core calculations
  const calculations = useMemo(() => {
    const connects = Math.round((inputs.dials * inputs.connectRate) / 100)
    const conversations = Math.round((connects * inputs.conversationRate) / 100)
    const meetings = Math.round((conversations * inputs.meetingBookedRate) / 100)
    const deals = (meetings * inputs.winRate) / 100
    const revenue = deals * inputs.avgDealSize

    // Value metrics
    const valuePerDial = revenue / inputs.dials
    const costPerAcquisition = deals > 0 ? (inputs.dials * inputs.costPerDial) / deals : 0
    const roi = inputs.dials * inputs.costPerDial > 0
      ? ((revenue - (inputs.dials * inputs.costPerDial)) / (inputs.dials * inputs.costPerDial)) * 100
      : 0

    // Goal calculations
    const dealsNeededForGoal = Math.ceil(inputs.revenueGoal / inputs.avgDealSize)
    const meetingsNeededForGoal = Math.ceil((dealsNeededForGoal * 100) / inputs.winRate)
    const conversationsNeededForGoal = Math.ceil((meetingsNeededForGoal * 100) / inputs.meetingBookedRate)
    const connectsNeededForGoal = Math.ceil((conversationsNeededForGoal * 100) / inputs.conversationRate)
    const dialsNeededForGoal = Math.ceil((connectsNeededForGoal * 100) / inputs.connectRate)

    // Time-based calculations
    const workDaysPerMonth = 22
    const workDaysPerWeek = 5

    let dialsPerPeriod = dialsNeededForGoal
    if (timeHorizon === 'day') {
      dialsPerPeriod = Math.ceil(dialsNeededForGoal / workDaysPerMonth)
    } else if (timeHorizon === 'week') {
      dialsPerPeriod = Math.ceil(dialsNeededForGoal / (workDaysPerMonth / workDaysPerWeek))
    }

    // Efficiency metrics
    const conversionVelocity = inputs.avgSalesCycle
    const activityEfficiencyScore = Math.min(100, Math.round(
      ((inputs.connectRate * 0.3) +
       (inputs.conversationRate * 0.2) +
       (inputs.meetingBookedRate * 0.3) +
       (inputs.winRate * 0.2)) * 2
    ))

    // Pipeline metrics
    const pipelineValue = meetings * inputs.avgDealSize * (inputs.winRate / 100)
    const pipelineCoverage = inputs.revenueGoal > 0 ? (pipelineValue / inputs.revenueGoal) * 100 : 0

    return {
      connects,
      conversations,
      meetings,
      deals,
      revenue,
      valuePerDial,
      costPerAcquisition,
      roi,
      dialsNeededForGoal,
      meetingsNeededForGoal,
      dialsPerPeriod,
      conversionVelocity,
      activityEfficiencyScore,
      pipelineValue,
      pipelineCoverage
    }
  }, [inputs, timeHorizon])

  const handleInputChange = (field: keyof CalculatorInputs, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }))
  }

  // Funnel data for visualization
  const funnelData = [
    { stage: 'Dials', value: inputs.dials, color: 'bg-blue-500' },
    { stage: 'Connects', value: calculations.connects, color: 'bg-cyan-500' },
    { stage: 'Conversations', value: calculations.conversations, color: 'bg-green-500' },
    { stage: 'Meetings', value: calculations.meetings, color: 'bg-yellow-500' },
    { stage: 'Deals', value: calculations.deals.toFixed(1), color: 'bg-orange-500' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Cold Call Calculator</h1>
        <p className="text-muted-foreground">
          Turn dials into dollars. Forecast pipeline and deal value.
        </p>
      </div>

      {/* Input Section */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Phone className="h-5 w-5" />
          Activity Inputs
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Dials */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1">
              Number of Dials
              <Info className="h-3 w-3 text-muted-foreground" />
            </label>
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
          </div>

          {/* Connect Rate */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1">
              Connect Rate (%)
              <Info className="h-3 w-3 text-muted-foreground" />
            </label>
            <input
              type="number"
              value={inputs.connectRate}
              onChange={(e) => handleInputChange('connectRate', parseInt(e.target.value) || 0)}
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
          </div>

          {/* Conversation Rate */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1">
              Conversation Rate (%)
              <Info className="h-3 w-3 text-muted-foreground" />
            </label>
            <input
              type="number"
              value={inputs.conversationRate}
              onChange={(e) => handleInputChange('conversationRate', parseInt(e.target.value) || 0)}
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
          </div>

          {/* Meeting Booked Rate */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1">
              Meeting Booked Rate (%)
              <Info className="h-3 w-3 text-muted-foreground" />
            </label>
            <input
              type="number"
              value={inputs.meetingBookedRate}
              onChange={(e) => handleInputChange('meetingBookedRate', parseInt(e.target.value) || 0)}
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
          </div>

          {/* Win Rate */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1">
              Win Rate (%)
              <Info className="h-3 w-3 text-muted-foreground" />
            </label>
            <input
              type="number"
              value={inputs.winRate}
              onChange={(e) => handleInputChange('winRate', parseInt(e.target.value) || 0)}
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
          </div>

          {/* Average Deal Size */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1">
              Average Deal Size ($)
              <Info className="h-3 w-3 text-muted-foreground" />
            </label>
            <input
              type="number"
              value={inputs.avgDealSize}
              onChange={(e) => handleInputChange('avgDealSize', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green"
            />
          </div>

          {/* Revenue Goal */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1">
              Revenue Goal ($)
              <Info className="h-3 w-3 text-muted-foreground" />
            </label>
            <input
              type="number"
              value={inputs.revenueGoal}
              onChange={(e) => handleInputChange('revenueGoal', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green"
            />
          </div>

          {/* Cost Per Dial */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1">
              Cost Per Dial ($)
              <Info className="h-3 w-3 text-muted-foreground" />
            </label>
            <input
              type="number"
              value={inputs.costPerDial}
              onChange={(e) => handleInputChange('costPerDial', parseFloat(e.target.value) || 0)}
              step="0.1"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green"
            />
          </div>
        </div>
      </Card>

      {/* Funnel Visualization */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Sales Funnel
        </h2>
        <div className="space-y-3">
          {funnelData.map((item, index) => (
            <motion.div
              key={item.stage}
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">{item.stage}</span>
                <span className="text-sm font-bold">{item.value}</span>
              </div>
              <div className="h-8 bg-gray-200 rounded-lg overflow-hidden">
                <motion.div
                  className={`h-full ${item.color} rounded-lg`}
                  initial={{ width: 0 }}
                  animate={{
                    width: `${Math.max(5, (parseFloat(item.value.toString()) / inputs.dials) * 100)}%`
                  }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Time Horizon Toggle */}
      <Card className="p-4">
        <div className="flex items-center justify-center gap-2">
          <span className="text-sm font-medium">Calculate for:</span>
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

      {/* Results Section */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
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

        {/* Total Revenue */}
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Expected Revenue</p>
              <p className="text-2xl font-bold text-blue-700">
                ${calculations.revenue.toLocaleString()}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-500 opacity-50" />
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

        {/* Dials for Goal */}
        <Card className="p-4 bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Dials {timeHorizon === 'day' ? 'Per Day' : timeHorizon === 'week' ? 'Per Week' : 'Per Month'}
              </p>
              <p className="text-2xl font-bold text-orange-700">
                {calculations.dialsPerPeriod}
              </p>
            </div>
            <Phone className="h-8 w-8 text-orange-500 opacity-50" />
          </div>
        </Card>

        {/* ROI */}
        <Card className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">ROI</p>
              <p className="text-2xl font-bold text-emerald-700">
                {calculations.roi.toFixed(0)}%
              </p>
            </div>
            <Zap className="h-8 w-8 text-emerald-500 opacity-50" />
          </div>
        </Card>

        {/* Pipeline Coverage */}
        <Card className="p-4 bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Pipeline Coverage</p>
              <p className="text-2xl font-bold text-indigo-700">
                {calculations.pipelineCoverage.toFixed(0)}%
              </p>
            </div>
            <Target className="h-8 w-8 text-indigo-500 opacity-50" />
          </div>
        </Card>
      </div>

      {/* Advanced Metrics */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Award className="h-5 w-5" />
          Performance Metrics
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Cost Per Acquisition */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Cost Per Acquisition</p>
            <p className="text-3xl font-bold text-red-600">
              ${calculations.costPerAcquisition.toFixed(0)}
            </p>
            <Badge className="mt-2" variant={calculations.costPerAcquisition < 1000 ? 'success' : 'warning'}>
              {calculations.costPerAcquisition < 1000 ? 'Efficient' : 'Optimize'}
            </Badge>
          </div>

          {/* Activity Efficiency Score */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Efficiency Score</p>
            <p className="text-3xl font-bold text-blue-600">
              {calculations.activityEfficiencyScore}%
            </p>
            <Badge className="mt-2" variant={calculations.activityEfficiencyScore > 70 ? 'success' : 'warning'}>
              {calculations.activityEfficiencyScore > 70 ? 'High Performance' : 'Room to Improve'}
            </Badge>
          </div>

          {/* Pipeline Value */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Pipeline Value</p>
            <p className="text-3xl font-bold text-green-600">
              ${calculations.pipelineValue.toLocaleString()}
            </p>
            <Badge className="mt-2" variant="default">
              Active Pipeline
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
              <li>• Focus on improving connect rates with better data and timing</li>
              <li>• A/B test your pitch to boost conversation-to-meeting rates</li>
              <li>• Track these metrics weekly to identify trends</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  )
}