'use client'

import { useState, useMemo } from 'react'
import { ARCADE_ITEMS, getUniqueTags, KIND_LABELS, type ArcadeItem } from '@/data/interactive'
import {
  Search, X, Sparkles, Zap, Trophy, Target, Calculator, Gamepad2,
  ClipboardList, TrendingUp, PiggyBank, Globe, Users, DollarSign,
  BarChart3, Rocket, Brain
} from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'

// Kind icons
const KIND_ICONS = {
  Quiz: ClipboardList,
  Calculator: Calculator,
  Game: Gamepad2
}

// Main category filters with icons
const MAIN_CATEGORIES = [
  { id: 'Quiz', label: 'Quiz', icon: ClipboardList, color: 'from-purple-500 to-pink-500' },
  { id: 'Calculator', label: 'Calculator', icon: Calculator, color: 'from-blue-500 to-cyan-500' },
  { id: 'Game', label: 'Game', icon: Gamepad2, color: 'from-green-500 to-emerald-500' },
  { id: 'ROI', label: 'ROI', icon: TrendingUp, color: 'from-amber-500 to-orange-500' },
  { id: 'Savings', label: 'Savings', icon: PiggyBank, color: 'from-indigo-500 to-purple-500' },
  { id: 'SEO', label: 'SEO', icon: Globe, color: 'from-teal-500 to-green-500' },
  { id: 'Affiliate', label: 'Affiliate', icon: DollarSign, color: 'from-rose-500 to-pink-500' },
  { id: 'Pricing', label: 'Pricing', icon: BarChart3, color: 'from-violet-500 to-purple-500' },
  { id: 'Stack', label: 'Stack', icon: Rocket, color: 'from-cyan-500 to-blue-500' }
]

export default function ArcadePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Filter items
  const filteredItems = useMemo(() => {
    return ARCADE_ITEMS.filter(item => {
      const matchesSearch = !searchQuery ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.blurb.toLowerCase().includes(searchQuery.toLowerCase())

      // Handle category filtering
      if (!selectedCategory) return matchesSearch

      // Check if it's a kind (Quiz, Calculator, Game)
      if (selectedCategory === 'Quiz' || selectedCategory === 'Calculator' || selectedCategory === 'Game') {
        return matchesSearch && item.kind === selectedCategory
      }

      // Check tags for other categories
      const matchesTag = item.tags.some(tag =>
        tag.toLowerCase().includes(selectedCategory.toLowerCase())
      )

      return matchesSearch && matchesTag
    })
  }, [searchQuery, selectedCategory])

  // Separate featured and regular items
  const featuredItems = filteredItems.filter(item => item.highlight)
  const regularItems = filteredItems.filter(item => !item.highlight)

  return (
    <div className="min-h-screen bg-gradient-to-b from-mist to-paper">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-forest to-green text-white overflow-hidden relative">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse delay-300" />
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white rounded-full blur-2xl animate-pulse delay-500" />
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10 text-center">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-white/20 text-white border-white/30 mb-4 animate-bounce">
              <Sparkles className="h-3 w-3 mr-1" />
              Interactive AI Tools Hub
            </Badge>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            >
              Agent Arcade
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl text-green-100 mb-8"
            >
              Play with quizzes, calculators, and games designed to level up your AI game
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur rounded-lg p-4 inline-flex gap-8 justify-center items-center"
            >
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-400" />
                <span className="text-green-100">{ARCADE_ITEMS.length} Experiences</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                <span className="text-green-100">All Free</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-yellow-400" />
                <span className="text-green-100">No Login</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="sticky top-16 z-40 bg-paper/95 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 py-6">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search arcade experiences..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green focus:border-green text-lg"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>

          {/* Category Squares */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-3">
              {MAIN_CATEGORIES.map((category) => {
                const Icon = category.icon
                const isSelected = selectedCategory === category.id
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(isSelected ? null : category.id)}
                    className={`
                      relative group p-4 rounded-xl transition-all duration-200 transform
                      ${isSelected
                        ? 'scale-95 ring-2 ring-forest shadow-lg'
                        : 'hover:scale-105 hover:shadow-md active:scale-95'
                      }
                    `}
                  >
                    <div
                      className={`
                        absolute inset-0 rounded-xl bg-gradient-to-br ${category.color}
                        ${isSelected ? 'opacity-100' : 'opacity-10 group-hover:opacity-20'}
                        transition-opacity duration-200
                      `}
                    />
                    <div className="relative flex flex-col items-center justify-center gap-2">
                      <Icon
                        className={`
                          h-6 w-6 md:h-8 md:w-8 transition-colors duration-200
                          ${isSelected ? 'text-white' : 'text-gray-700 group-hover:text-gray-900'}
                        `}
                      />
                      <span
                        className={`
                          text-xs md:text-sm font-medium transition-colors duration-200
                          ${isSelected ? 'text-white' : 'text-gray-700 group-hover:text-gray-900'}
                        `}
                      >
                        {category.label}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Active filter indicator */}
          {selectedCategory && (
            <div className="max-w-6xl mx-auto mt-4 flex items-center justify-center">
              <button
                onClick={() => setSelectedCategory(null)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-forest text-white text-sm font-medium hover:bg-forest/90 transition-colors"
              >
                <span>{MAIN_CATEGORIES.find(c => c.id === selectedCategory)?.label}</span>
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Results count */}
        <div className="text-sm text-gray-600 mb-6 text-center">
          Showing {filteredItems.length} of {ARCADE_ITEMS.length} experiences
          {searchQuery && ` for "${searchQuery}"`}
        </div>

        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-50 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <Gamepad2 className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">No experiences found</h2>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters or search query
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory(null)
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <>
            {/* Featured Section */}
            {featuredItems.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Sparkles className="h-6 w-6 mr-2 text-yellow-500" />
                  Featured
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <AnimatePresence mode="popLayout">
                    {featuredItems.map((item, index) => (
                      <motion.div
                        key={item.slug}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -4 }}
                        className="group"
                      >
                        <Link href={item.slug}>
                          <div className="bg-gradient-to-br from-forest to-green p-[2px] rounded-xl h-full">
                            <div className="bg-white rounded-xl p-6 h-full hover:bg-mist/50 transition-all">
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                  {(() => {
                                    const Icon = KIND_ICONS[item.kind]
                                    return (
                                      <div className="p-2 bg-green/10 rounded-lg">
                                        <Icon className="h-6 w-6 text-green" />
                                      </div>
                                    )
                                  })()}
                                  <div>
                                    <h3 className="font-semibold text-lg text-ink group-hover:text-green transition-colors">
                                      {item.title}
                                    </h3>
                                    <Badge
                                      className={KIND_LABELS[item.kind].color}
                                      variant="outline"
                                    >
                                      {KIND_LABELS[item.kind].emoji} {item.kind}
                                    </Badge>
                                  </div>
                                </div>
                                <Sparkles className="h-5 w-5 text-yellow-500" />
                              </div>

                              <p className="text-gray-600 mb-4">{item.blurb}</p>

                              <div className="flex items-center justify-between">
                                <div className="flex gap-2">
                                  {item.tags.map(tag => (
                                    <Badge key={tag} variant="secondary" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                                <span className="text-green font-medium group-hover:translate-x-1 transition-transform">
                                  {item.cta} →
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {/* Regular Items */}
            {regularItems.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  {featuredItems.length > 0 ? 'More Experiences' : 'All Experiences'}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence mode="popLayout">
                    {regularItems.map((item, index) => (
                      <motion.div
                        key={item.slug}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ y: -4, transition: { duration: 0.2 } }}
                      >
                        <Link href={item.slug}>
                          <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all p-6 h-full border border-gray-100 hover:border-green/30 group">
                            <div className="flex items-start gap-3 mb-3">
                              {(() => {
                                const Icon = KIND_ICONS[item.kind]
                                return (
                                  <div className="p-2 bg-mist rounded-lg group-hover:bg-green/10 transition-colors">
                                    <Icon className="h-5 w-5 text-gray-600 group-hover:text-green transition-colors" />
                                  </div>
                                )
                              })()}
                              <div className="flex-1">
                                <h3 className="font-semibold text-ink group-hover:text-green transition-colors">
                                  {item.title}
                                </h3>
                                <Badge
                                  className={KIND_LABELS[item.kind].color}
                                  variant="outline"
                                >
                                  {KIND_LABELS[item.kind].emoji} {item.kind}
                                </Badge>
                              </div>
                            </div>

                            <p className="text-gray-600 text-sm mb-4">{item.blurb}</p>

                            <div className="flex items-center justify-between">
                              <div className="flex gap-1">
                                {item.tags.map(tag => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              <span className="text-green text-sm font-medium group-hover:translate-x-1 transition-transform">
                                {item.cta} →
                              </span>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-forest to-green rounded-xl p-8">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-2xl font-bold mb-4 text-white text-center">
              Want More Interactive Tools?
            </h2>
            <div className="flex justify-center items-center">
              <Link href="/about">
                <Button size="lg" variant="secondary">
                  Learn About Our Mission
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}