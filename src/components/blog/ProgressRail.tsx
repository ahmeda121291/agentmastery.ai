'use client'

import { useEffect, useState } from 'react'

export default function ProgressRail() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight - windowHeight
      const scrollTop = window.scrollY
      const scrollPercentage = (scrollTop / documentHeight) * 100
      setProgress(Math.min(Math.max(scrollPercentage, 0), 100))
    }

    // Initial calculation
    handleScroll()

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-muted">
      <div
        className="h-full bg-gradient-to-r from-forest to-green transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}