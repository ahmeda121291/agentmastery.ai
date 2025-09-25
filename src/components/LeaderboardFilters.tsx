'use client'

import { useState, useMemo, useEffect } from 'react'

export type FilterableItem = {
  name: string
  price?: number
  useCases?: string[]
  companySize?: ('SMB' | 'Mid-Market' | 'Enterprise')[]
  category?: string
}

export default function LeaderboardFilters({
  items,
  onChange
}: {
  items: FilterableItem[]
  onChange: (filtered: FilterableItem[]) => void
}) {
  const [price, setPrice] = useState<'all' | '<$50' | '$50-$200' | '>$200'>('all')
  const [useCase, setUseCase] = useState<string>('all')
  const [size, setSize] = useState<'all' | 'SMB' | 'Mid-Market' | 'Enterprise'>('all')

  const filtered = useMemo(() => {
    return items.filter(t => {
      const priceOk =
        price === 'all' ||
        (price === '<$50' && (t.price ?? 0) < 50) ||
        (price === '$50-$200' && (t.price ?? 0) >= 50 && (t.price ?? 0) <= 200) ||
        (price === '>$200' && (t.price ?? 0) > 200)

      const useOk =
        useCase === 'all' ||
        (t.useCases || []).map(s => s.toLowerCase()).includes(useCase.toLowerCase()) ||
        (t.category && t.category.toLowerCase().includes(useCase.toLowerCase()))

      const sizeOk =
        size === 'all' ||
        (t.companySize || []).includes(size as any)

      return priceOk && useOk && sizeOk
    })
  }, [items, price, useCase, size])

  useEffect(() => {
    onChange(filtered)
  }, [filtered, onChange])

  return (
    <div className="bg-white p-4 rounded-lg border mb-6">
      <div className="flex flex-wrap gap-3 items-center">
        <div>
          <label htmlFor="price-filter" className="sr-only">Price Range</label>
          <select
            id="price-filter"
            className="border rounded-md px-3 py-2 text-sm bg-white hover:bg-gray-50 transition-colors"
            value={price}
            onChange={e => setPrice(e.target.value as any)}
          >
            <option value="all">All prices</option>
            <option value="<$50">Under $50/mo</option>
            <option value="$50-$200">$50–$200/mo</option>
            <option value=">$200">Over $200/mo</option>
          </select>
        </div>

        <div>
          <label htmlFor="use-case-filter" className="sr-only">Use Case</label>
          <input
            id="use-case-filter"
            className="border rounded-md px-3 py-2 text-sm"
            placeholder="Filter by use case..."
            value={useCase === 'all' ? '' : useCase}
            onChange={e => setUseCase(e.target.value || 'all')}
          />
        </div>

        <div>
          <label htmlFor="size-filter" className="sr-only">Company Size</label>
          <select
            id="size-filter"
            className="border rounded-md px-3 py-2 text-sm bg-white hover:bg-gray-50 transition-colors"
            value={size}
            onChange={e => setSize(e.target.value as any)}
          >
            <option value="all">All company sizes</option>
            <option value="SMB">SMB (1-100)</option>
            <option value="Mid-Market">Mid-Market (100-1000)</option>
            <option value="Enterprise">Enterprise (1000+)</option>
          </select>
        </div>

        <div className="ml-auto text-sm text-muted-foreground">
          Showing {filtered.length} of {items.length} tools
        </div>
      </div>
    </div>
  )
}