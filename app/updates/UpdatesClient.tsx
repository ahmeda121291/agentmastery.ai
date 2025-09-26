'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Calendar,
  ArrowRight,
  FileText,
  Calculator,
  Gamepad2,
  GitCompare,
  HelpCircle,
  BookOpen,
  Sparkles,
  Clock
} from 'lucide-react'
// Helper function to format relative time
function formatDistanceToNow(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)

  if (seconds < 60) return 'just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`
  if (seconds < 2592000) return `${Math.floor(seconds / 604800)} weeks ago`
  return `${Math.floor(seconds / 2592000)} months ago`
}

interface ContentItem {
  title: string
  type: 'Blog' | 'Compare' | 'Tool' | 'Calculator' | 'Arcade' | 'Q&A' | 'Resource'
  url: string
  excerpt?: string
  updatedAt: string
  category?: string
}

const typeIcons = {
  Blog: FileText,
  Compare: GitCompare,
  Tool: Sparkles,
  Calculator: Calculator,
  Arcade: Gamepad2,
  'Q&A': HelpCircle,
  Resource: BookOpen
}

const typeColors = {
  Blog: 'bg-blue-100 text-blue-800 border-blue-200',
  Compare: 'bg-purple-100 text-purple-800 border-purple-200',
  Tool: 'bg-green-100 text-green-800 border-green-200',
  Calculator: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  Arcade: 'bg-pink-100 text-pink-800 border-pink-200',
  'Q&A': 'bg-orange-100 text-orange-800 border-orange-200',
  Resource: 'bg-gray-100 text-gray-800 border-gray-200'
}

export default function UpdatesClient({ initialUpdates }: { initialUpdates: ContentItem[] }) {
  const [displayCount, setDisplayCount] = useState(50)
  const [filterType, setFilterType] = useState<string>('all')

  const filteredUpdates = filterType === 'all'
    ? initialUpdates
    : initialUpdates.filter(item => item.type === filterType)

  const displayedUpdates = filteredUpdates.slice(0, displayCount)
  const hasMore = filteredUpdates.length > displayCount

  const types = ['all', ...Array.from(new Set(initialUpdates.map(item => item.type)))]

  return (
    <div className="min-h-screen bg-gradient-to-b from-mist to-paper">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-forest to-green text-white">
        <Container>
          <div className="py-12 md:py-16">
            <div className="max-w-3xl">
              <Badge className="bg-white/20 text-white border-white/30 mb-4">
                <Clock className="h-3 w-3 mr-1" />
                Real-time Updates
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                New & Updated Content
              </h1>
              <p className="text-xl text-green-100">
                Discover our latest AI tool reviews, comparisons, calculators, and insights.
                Fresh content updated daily to help you stay ahead in the AI landscape.
              </p>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-8">
        {/* Filter Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {types.map(type => (
              <Button
                key={type}
                variant={filterType === type ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setFilterType(type)}
                className="capitalize"
              >
                {type === 'all' ? 'All Updates' : type}
                {type === 'all' && (
                  <Badge className="ml-2 bg-forest/20 text-forest">
                    {initialUpdates.length}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block">
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-mist/50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Content</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Type</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Category</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Updated</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {displayedUpdates.map((item, idx) => {
                    const Icon = typeIcons[item.type]
                    return (
                      <tr key={`${item.url}-${idx}`} className="hover:bg-mist/30 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <Link href={item.url} className="font-medium text-gray-900 hover:text-green transition-colors">
                              {item.title}
                            </Link>
                            {item.excerpt && (
                              <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                                {item.excerpt}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge className={typeColors[item.type]}>
                            <Icon className="h-3 w-3 mr-1" />
                            {item.type}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-600">
                            {item.category || '-'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="h-4 w-4" />
                            <span title={new Date(item.updatedAt).toLocaleString()}>
                              {formatDistanceToNow(new Date(item.updatedAt))}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Link href={item.url}>
                            <Button size="sm" variant="ghost">
                              View
                              <ArrowRight className="h-3 w-3 ml-1" />
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-4">
          {displayedUpdates.map((item, idx) => {
            const Icon = typeIcons[item.type]
            return (
              <Card key={`${item.url}-${idx}`} className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <Badge className={typeColors[item.type]}>
                    <Icon className="h-3 w-3 mr-1" />
                    {item.type}
                  </Badge>
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(item.updatedAt))}
                  </span>
                </div>

                <h3 className="font-semibold text-lg mb-1">
                  <Link href={item.url} className="hover:text-green transition-colors">
                    {item.title}
                  </Link>
                </h3>

                {item.excerpt && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {item.excerpt}
                  </p>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {item.category || 'General'}
                  </span>
                  <Link href={item.url}>
                    <Button size="sm" variant="ghost">
                      View
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </Link>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="mt-8 text-center">
            <Button
              onClick={() => setDisplayCount(prev => prev + 50)}
              variant="outline"
              size="lg"
            >
              Load More Updates
            </Button>
          </div>
        )}

        {/* Summary Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(
            initialUpdates.reduce((acc, item) => {
              acc[item.type] = (acc[item.type] || 0) + 1
              return acc
            }, {} as Record<string, number>)
          ).map(([type, count]) => {
            const Icon = typeIcons[type as keyof typeof typeIcons]
            return (
              <Card key={type} className="p-4 text-center">
                <Icon className="h-8 w-8 mx-auto mb-2 text-green" />
                <div className="text-2xl font-bold">{count}</div>
                <div className="text-sm text-gray-600">{type} Items</div>
              </Card>
            )
          })}
        </div>
      </Container>
    </div>
  )
}