import React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'outline' | 'secondary' | 'success' | 'warning'
  className?: string
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  const baseStyles = 'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium'

  const variants = {
    default: 'bg-forest text-white',
    outline: 'border border-forest/30 text-ink bg-transparent',
    secondary: 'bg-mist text-forest',
    success: 'bg-green text-white',
    warning: 'bg-yellow-500 text-white',
  }

  return (
    <span className={twMerge(clsx(baseStyles, variants[variant]), className)}>
      {children}
    </span>
  )
}

// Re-export for compatibility
export { Badge }
export type { BadgeProps }