'use client'
import { useMemo } from 'react'
import { Check, X, Minus } from 'lucide-react'

type FeatureRow = {
  key: string
  label: string
  hint?: string
}

type ToolInfo = {
  name: string
  features?: string[]            // free-form list like ["AI avatars","API access"]
  availability?: Record<string, 'yes'|'no'|'partial'> // normalized map by feature key
}

export default function CompareTablePro({
  title = 'Detailed Feature Comparison',
  features,            // list of all features to show (ordered)
  toolA,
  toolB,
}: {
  title?: string
  features: FeatureRow[]
  toolA: ToolInfo
  toolB: ToolInfo
}) {

  // Normalize strings in features[] into a set for fallback detection
  const aSet = useMemo(() => new Set((toolA.features || []).map(s => s.trim().toLowerCase())), [toolA.features])
  const bSet = useMemo(() => new Set((toolB.features || []).map(s => s.trim().toLowerCase())), [toolB.features])

  const getState = (tool: ToolInfo, f: FeatureRow) => {
    const fromMap = tool.availability?.[f.key]
    if (fromMap) return fromMap
    // fallback: loose contains by label text
    const has = (tool === toolA ? aSet : bSet).has(f.label.trim().toLowerCase())
    return has ? 'yes' : 'no'
  }

  const Cell = ({ state }: { state: 'yes'|'no'|'partial' }) => (
    <div className="flex items-center justify-center">
      {state === 'yes' && <Check className="h-4 w-4 text-emerald-600" aria-label="Yes" />}
      {state === 'no' && <X className="h-4 w-4 text-rose-600" aria-label="No" />}
      {state === 'partial' && <Minus className="h-4 w-4 text-amber-500" aria-label="Partial" />}
    </div>
  )

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-semibold mb-3">{title}</h2>

      {/* Desktop table */}
      <div className="hidden md:block overflow-auto rounded-xl border bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-muted/40">
            <tr>
              <th className="text-left p-3 w-1/2">Feature</th>
              <th className="text-center p-3 w-1/4">{toolA.name}</th>
              <th className="text-center p-3 w-1/4">{toolB.name}</th>
            </tr>
          </thead>
          <tbody>
            {features.map((f, i) => {
              const a = getState(toolA, f)
              const b = getState(toolB, f)
              return (
                <tr key={f.key} className={i % 2 ? 'bg-muted/10' : ''}>
                  <td className="p-3 align-middle">
                    <div className="font-medium">{f.label}</div>
                    {f.hint ? <div className="text-xs text-muted-foreground mt-0.5">{f.hint}</div> : null}
                  </td>
                  <td className="p-3 align-middle text-center"><Cell state={a} /></td>
                  <td className="p-3 align-middle text-center"><Cell state={b} /></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {features.map((f) => {
          const a = getState(toolA, f)
          const b = getState(toolB, f)
          return (
            <div key={f.key} className="rounded-xl border bg-white p-3">
              <div className="text-sm font-medium">{f.label}</div>
              {f.hint ? <div className="text-xs text-muted-foreground mb-2">{f.hint}</div> : null}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="rounded-md border p-2 text-center">
                  <div className="text-xs text-muted-foreground mb-1">{toolA.name}</div>
                  <Cell state={a} />
                </div>
                <div className="rounded-md border p-2 text-center">
                  <div className="text-xs text-muted-foreground mb-1">{toolB.name}</div>
                  <Cell state={b} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1"><Check className="h-3 w-3 text-emerald-600" /> Yes</span>
        <span className="inline-flex items-center gap-1"><Minus className="h-3 w-3 text-amber-500" /> Partial / Limited</span>
        <span className="inline-flex items-center gap-1"><X className="h-3 w-3 text-rose-600" /> No</span>
      </div>
    </section>
  )
}