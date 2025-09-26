'use client'

import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const navLinks = [
    {
      href: '/updates',
      label: '🆕 New & Updated',
      title: 'Latest content across all categories.',
      ariaLabel: 'New & Updated Content'
    },
    {
      href: '/tools',
      label: 'AI Stack',
      title: 'Explore the most loved AI tools all in one place.',
      ariaLabel: 'AI Stack (Tools)'
    },
    {
      href: '/blog',
      label: 'Deep Dives',
      title: 'In-depth reviews, manuals, and trends shaping AI.',
      ariaLabel: 'Deep Dives (Blog)'
    },
    {
      href: '/answers',
      label: 'Quick Takes',
      title: 'Fast, 3-sentence answers to AI questions.',
      ariaLabel: 'Quick Takes (Answers)'
    },
    {
      href: '/leaderboards',
      label: 'Rankings',
      title: 'See which AI tools are topping the charts.',
      ariaLabel: 'Rankings (Leaderboards)'
    },
    {
      href: '/quiz',
      label: 'Find Your Fit',
      title: 'Discover the AI tool you need most.',
      ariaLabel: 'Find Your Fit (Quiz)'
    },
    {
      href: '/resources',
      label: 'Toolkit',
      title: 'Free templates, guides, and frameworks to accelerate your AI journey.',
      ariaLabel: 'Toolkit (Resources)'
    },
    {
      href: '/about',
      label: 'Our Story',
      title: 'Why we built AgentMastery and how our algorithms work.',
      ariaLabel: 'Our Story (About)'
    },
  ]
  
  return (
    <nav className="sticky top-0 z-50 bg-paper/95 backdrop-blur-sm border-b border-mist">
      <Container>
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-forest">AgentMastery.ai</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                title={link.title}
                aria-label={link.ariaLabel}
                className="text-ink hover:text-green transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/arcade"
              className="inline-flex items-center justify-center h-10 px-4 rounded-full bg-forest text-white hover:opacity-90 active:scale-95 transition font-medium"
              title="Play with quizzes, calculators, and games"
              aria-label="Agent Arcade"
            >
              Agent Arcade
            </Link>
          </div>
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-ink hover:bg-mist focus:outline-none focus:ring-2 focus:ring-green"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-mist">
            <div className="flex flex-col space-y-4 items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  title={link.title}
                  aria-label={link.ariaLabel}
                  className="text-ink hover:text-green transition-colors duration-200 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/arcade"
                className="w-full inline-flex items-center justify-center h-10 px-4 rounded-full bg-forest text-white hover:opacity-90 active:scale-95 transition font-medium"
                title="Play with quizzes, calculators, and games"
                aria-label="Agent Arcade"
              >
                Agent Arcade
              </Link>
            </div>
          </div>
        )}
      </Container>
    </nav>
  )
}
