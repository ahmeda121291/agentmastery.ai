'use client'
import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Sparkles } from 'lucide-react'

export default function ArcadeShell({
  title,
  subtitle,
  children,
  quickAnswer
}: {
  title: string
  subtitle?: string
  quickAnswer?: string
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Badge className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-0">
            <Sparkles className="h-3 w-3 mr-1" />
            Agent Arcade
          </Badge>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-forest to-emerald-600 bg-clip-text text-transparent">
          {title}
        </h1>
        {subtitle && (
          <p className="text-muted-foreground mt-2">{subtitle}</p>
        )}
      </div>

      {quickAnswer && mounted && (
        <Card className="p-4 mb-6 border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50">
          <p className="text-sm font-medium text-emerald-900 mb-1">Quick Answer:</p>
          <p className="text-sm text-emerald-800">{quickAnswer}</p>
        </Card>
      )}

      <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
        <div className="p-6 md:p-8">
          {children}
        </div>
      </Card>
    </div>
  )
}