'use client'

import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const navLinks = [
    { href: '/tools', label: 'Tools' },
    { href: '/blog', label: 'Blog' },
    { href: '/answers', label: 'Answers' },
    { href: '/leaderboards', label: 'Leaderboards' },
    { href: '/quiz', label: 'Quiz' },
    { href: '/about', label: 'About' },
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
                className="text-ink hover:text-green transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
            <Button variant="primary" size="sm" asChild>
              <Link href="/quiz">Get Started</Link>
            </Button>
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
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-ink hover:text-green transition-colors duration-200 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Button variant="primary" className="w-full" asChild>
                <Link href="/quiz">Get Started</Link>
              </Button>
            </div>
          </div>
        )}
      </Container>
    </nav>
  )
}
