import { HTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
  size?: 'sm' | 'md' | 'lg'
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full'
    
    const variants = {
      default: 'bg-mist text-forest',
      success: 'bg-green/10 text-green',
      warning: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800',
      info: 'bg-blue-100 text-blue-800',
    }
    
    const sizes = {
      sm: 'px-3 py-1.5 text-xs min-h-[24px]',
      md: 'px-4 py-2 text-sm min-h-[32px]',
      lg: 'px-5 py-2.5 text-base min-h-[40px]',
    }
    
    return (
      <span
        ref={ref}
        className={twMerge(
          clsx(baseStyles, variants[variant], sizes[size]),
          className
        )}
        {...props}
      >
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'
