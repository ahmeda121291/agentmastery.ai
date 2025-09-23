'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/src/components/ui/Button'
import { Card } from '@/src/components/ui/Card'
import { Badge } from '@/components/ui/badge'
import {
  Search,
  Home,
  FileQuestion,
  Sparkles,
  TrendingUp,
  BookOpen,
  HelpCircle,
  ArrowLeft,
  Zap
} from 'lucide-react'

export default function NotFound() {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/tools?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  const popularLinks = [
    { href: '/tools', label: 'Browse AI Tools', icon: Zap, description: '250+ tools ranked' },
    { href: '/leaderboards', label: 'View Leaderboards', icon: TrendingUp, description: 'Weekly rankings' },
    { href: '/quiz', label: 'Tool Matcher Quiz', icon: Sparkles, description: 'Get personalized picks' },
    { href: '/blog', label: 'Read Guides', icon: BookOpen, description: 'How-to articles' },
    { href: '/answers', label: 'Q&A Hub', icon: HelpCircle, description: 'Quick answers' },
    { href: '/', label: 'Homepage', icon: Home, description: 'Start over' },
  ]

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="text-center mb-12">
        <div className="mb-6">
          <FileQuestion className="h-20 w-20 mx-auto text-muted-foreground" />
        </div>

        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-xl text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for AI tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green/50 focus:border-green"
              autoFocus
            />
            <Button
              type="submit"
              size="sm"
              variant="primary"
              className="absolute right-1 top-1/2 -translate-y-1/2"
            >
              Search
            </Button>
          </div>
        </form>

        {/* Popular Links */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold mb-6">Popular Pages</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Card className="hover:shadow-md transition-all hover:border-green/50 h-full">
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <link.icon className="h-5 w-5 text-green mt-0.5 flex-shrink-0" />
                      <div className="text-left">
                        <div className="font-medium mb-1">{link.label}</div>
                        <div className="text-sm text-muted-foreground">
                          {link.description}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 bg-gradient-to-br from-green/10 to-transparent rounded-lg border border-green/20">
          <Badge className="mb-4 bg-green/10 text-green border-green/20">
            <Sparkles className="h-3 w-3 mr-1" />
            AI-Powered Matching
          </Badge>
          <h3 className="text-2xl font-bold mb-3">
            Not sure which tool you need?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Take our 2-minute quiz to get personalized AI tool recommendations based on your specific needs and budget.
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="white" size="lg" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
            <Button variant="primary" size="lg" asChild>
              <Link href="/quiz" className="flex items-center gap-2">
                Start Tool Matcher
                <Sparkles className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}