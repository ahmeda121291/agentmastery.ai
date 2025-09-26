'use client'

import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import {
  Sparkles,
  TrendingUp,
  BookOpen,
  MessageSquare,
  Trophy,
  Target,
  Gamepad2,
  Menu,
  X,
  ChevronDown,
  Clock,
  Zap,
  Brain,
  Calculator,
  GitCompare,
  HelpCircle,
  FolderOpen,
  Info
} from 'lucide-react'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navSections = [
    {
      label: 'Discover',
      icon: <Sparkles className="h-4 w-4" />,
      items: [
        { href: '/updates', label: 'New & Updated', icon: <Clock className="h-4 w-4" />, badge: 'NEW' },
        { href: '/tools', label: 'AI Tools Directory', icon: <Zap className="h-4 w-4" /> },
        { href: '/leaderboards', label: 'Weekly Rankings', icon: <Trophy className="h-4 w-4" /> },
        { href: '/quiz', label: 'Tool Matcher Quiz', icon: <Target className="h-4 w-4" /> },
      ]
    },
    {
      label: 'Learn',
      icon: <BookOpen className="h-4 w-4" />,
      items: [
        { href: '/blog', label: 'In-Depth Guides', icon: <BookOpen className="h-4 w-4" /> },
        { href: '/answers', label: 'Quick Answers', icon: <MessageSquare className="h-4 w-4" /> },
        { href: '/resources', label: 'Free Resources', icon: <FolderOpen className="h-4 w-4" /> },
        { href: '/about', label: 'Our Story', icon: <Info className="h-4 w-4" /> },
      ]
    },
    {
      label: 'Interactive',
      icon: <Gamepad2 className="h-4 w-4" />,
      items: [
        { href: '/arcade', label: 'Agent Arcade', icon: <Gamepad2 className="h-4 w-4" />, badge: 'PLAY' },
        { href: '/calculators/roi', label: 'ROI Calculator', icon: <Calculator className="h-4 w-4" /> },
        { href: '/compare', label: 'Tool Comparisons', icon: <GitCompare className="h-4 w-4" /> },
        { href: '/games/bingo', label: 'AI Bingo', icon: <Brain className="h-4 w-4" /> },
      ]
    }
  ]

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-white/95 backdrop-blur-md shadow-sm'
        : 'bg-white/90 backdrop-blur-sm'
    } border-b border-gray-200/50`}>
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-1.5 bg-gradient-to-br from-forest to-green rounded-lg group-hover:shadow-md transition-shadow">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-forest to-green bg-clip-text text-transparent">
              AgentMastery
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {navSections.map((section) => (
              <div
                key={section.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(section.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-green transition-colors rounded-lg hover:bg-gray-50">
                  {section.icon}
                  <span>{section.label}</span>
                  <ChevronDown className="h-3 w-3 opacity-50" />
                </button>

                {/* Dropdown Menu */}
                <div className={`absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-200 ${
                  activeDropdown === section.label
                    ? 'opacity-100 translate-y-0 visible'
                    : 'opacity-0 -translate-y-2 invisible'
                }`}>
                  <div className="p-2">
                    {section.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors group"
                      >
                        <span className="text-gray-400 group-hover:text-green transition-colors">
                          {item.icon}
                        </span>
                        <span className="flex-1 text-sm font-medium text-gray-700 group-hover:text-gray-900">
                          {item.label}
                        </span>
                        {item.badge && (
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            item.badge === 'NEW'
                              ? 'bg-green/10 text-green'
                              : 'bg-purple-100 text-purple-700'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* CTA Button */}
            <Link
              href="/arcade"
              className="ml-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-forest to-green text-white font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              <Gamepad2 className="h-4 w-4" />
              <span>Try Arcade</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="py-4 space-y-2">
            {navSections.map((section) => (
              <div key={section.label} className="space-y-1">
                <div className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-500">
                  {section.icon}
                  <span>{section.label}</span>
                </div>
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 px-6 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="text-gray-400">{item.icon}</span>
                    <span className="flex-1 text-sm font-medium">{item.label}</span>
                    {item.badge && (
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        item.badge === 'NEW'
                          ? 'bg-green/10 text-green'
                          : 'bg-purple-100 text-purple-700'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            ))}

            {/* Mobile CTA */}
            <div className="px-4 pt-4 border-t border-gray-100">
              <Link
                href="/arcade"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-forest to-green text-white font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <Gamepad2 className="h-4 w-4" />
                <span>Try Agent Arcade</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </nav>
  )
}