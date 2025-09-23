'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'
import Link from 'next/link'

interface MobileStickyQuizCTAProps {
  /** Pages to show the CTA on */
  showOn?: ('home' | 'tools' | 'blog')[]
}

export function MobileStickyQuizCTA({
  showOn = ['home', 'tools', 'blog']
}: MobileStickyQuizCTAProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)

    // Show CTA after a short delay (unless reduced motion is preferred)
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, prefersReducedMotion ? 0 : 1500)

    return () => {
      clearTimeout(timer)
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [prefersReducedMotion])

  // Check if we should show on current page based on pathname
  useEffect(() => {
    const pathname = window.location.pathname
    const shouldShow = showOn.some(page => {
      switch (page) {
        case 'home':
          return pathname === '/'
        case 'tools':
          return pathname === '/tools' || pathname.startsWith('/tools/')
        case 'blog':
          return pathname === '/blog' || pathname.startsWith('/blog/')
        default:
          return false
      }
    })

    // Don't show on tool detail pages (they have their own sticky CTA)
    const isToolDetailPage = /^\/tools\/[^\/]+$/.test(pathname)

    if (!shouldShow || isToolDetailPage) {
      setIsVisible(false)
    }
  }, [showOn])

  if (!isVisible) return null

  return (
    <div
      className={`
        fixed bottom-4 left-4 right-4 z-40 md:hidden
        ${prefersReducedMotion ? '' : 'animate-in slide-in-from-bottom-2 duration-500'}
      `}
    >
      <Button
        size="lg"
        variant="primary"
        magnetic
        asChild
        className="w-full shadow-lg border border-green/20"
      >
        <Link href="/quiz" className="flex items-center justify-center gap-2">
          <Sparkles className="h-5 w-5" />
          Find My AI Stack
        </Link>
      </Button>
    </div>
  )
}