'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Save, X, TrendingUp, TrendingDown } from 'lucide-react'

interface Scenario {
  id: string
  name: string
  timestamp: number
  inputs: Record<string, any>
  results: Record<string, any>
}

interface ScenarioComparisonProps {
  currentInputs: Record<string, any>
  currentResults: Record<string, any>
  calculatorType: string
}

export default function ScenarioComparison({
  currentInputs,
  currentResults,
  calculatorType
}: ScenarioComparisonProps) {
  const [scenarios, setScenarios] = useState<Scenario[]>([])
  const [scenarioName, setScenarioName] = useState('')
  const storageKey = `arcade_${calculatorType}_scenarios`

  useEffect(() => {
    const saved = localStorage.getItem(storageKey)
    if (saved) {
      setScenarios(JSON.parse(saved))
    }
  }, [storageKey])

  const saveScenario = () => {
    const newScenario: Scenario = {
      id: Date.now().toString(),
      name: scenarioName || `Scenario ${scenarios.length + 1}`,
      timestamp: Date.now(),
      inputs: currentInputs,
      results: currentResults
    }

    const updated = [...scenarios, newScenario].slice(-3) // Keep last 3
    setScenarios(updated)
    localStorage.setItem(storageKey, JSON.stringify(updated))
    setScenarioName('')
  }

  const removeScenario = (id: string) => {
    const updated = scenarios.filter(s => s.id !== id)
    setScenarios(updated)
    localStorage.setItem(storageKey, JSON.stringify(updated))
  }

  const compareValue = (current: any, saved: any) => {
    if (typeof current !== 'number' || typeof saved !== 'number') return null

    const diff = ((current - saved) / saved) * 100
    if (Math.abs(diff) < 0.1) return null

    return diff
  }

  if (scenarios.length === 0 && !scenarioName) {
    return (
      <Card className="p-4 bg-gradient-to-r from-slate-50 to-gray-50">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-sm">Save this scenario</p>
            <p className="text-xs text-muted-foreground">Compare different configurations</p>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Name this scenario..."
              className="px-3 py-1 text-sm border rounded"
              value={scenarioName}
              onChange={(e) => setScenarioName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && saveScenario()}
            />
            <Button size="sm" onClick={saveScenario} className="gap-1">
              <Save className="h-3 w-3" />
              Save
            </Button>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Scenario Comparison</h3>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Name..."
            className="px-2 py-1 text-sm border rounded w-32"
            value={scenarioName}
            onChange={(e) => setScenarioName(e.target.value)}
          />
          <Button size="sm" onClick={saveScenario}>
            <Save className="h-3 w-3" />
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {scenarios.map(scenario => (
          <div
            key={scenario.id}
            className="p-3 border rounded-lg bg-white hover:border-emerald-400 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-medium text-sm">{scenario.name}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(scenario.timestamp).toLocaleDateString()}
                </p>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => removeScenario(scenario.id)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
              {Object.entries(scenario.results).slice(0, 4).map(([key, value]) => {
                const current = currentResults[key]
                const diff = compareValue(current, value)

                return (
                  <div key={key}>
                    <p className="text-muted-foreground">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </p>
                    <p className="font-medium">
                      {typeof value === 'number' ? value.toLocaleString() : value}
                    </p>
                    {diff !== null && (
                      <div className="flex items-center gap-1 mt-1">
                        {diff > 0 ? (
                          <>
                            <TrendingUp className="h-3 w-3 text-green-600" />
                            <span className="text-green-600">+{diff.toFixed(1)}%</span>
                          </>
                        ) : (
                          <>
                            <TrendingDown className="h-3 w-3 text-red-600" />
                            <span className="text-red-600">{diff.toFixed(1)}%</span>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}