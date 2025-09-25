import { TrendingUp, TrendingDown } from 'lucide-react'

export function KPIs({
  items
}: {
  items: { label: string; value: string; hint?: string; trend?: 'up' | 'down' | 'neutral' }[]
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {items.map((k, i) => (
        <div
          key={i}
          className="rounded-xl border bg-gradient-to-br from-white to-gray-50 p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-1">
            <div className="text-xs font-medium text-muted-foreground">
              {k.label}
            </div>
            {k.trend === 'up' && (
              <TrendingUp className="h-3 w-3 text-emerald-600" />
            )}
            {k.trend === 'down' && (
              <TrendingDown className="h-3 w-3 text-rose-600" />
            )}
          </div>
          <div className="text-xl font-bold bg-gradient-to-r from-forest to-emerald-600 bg-clip-text text-transparent">
            {k.value}
          </div>
          {k.hint && (
            <div className="text-[10px] text-muted-foreground mt-1">
              {k.hint}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}