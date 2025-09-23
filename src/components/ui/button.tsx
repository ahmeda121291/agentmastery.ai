"use client"

import React, { forwardRef } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  magnetic?: boolean
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', magnetic = false, children, asChild, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'

    const variants = {
      primary: 'bg-forest text-white hover:bg-green focus:ring-forest rounded-xl2',
      secondary: 'bg-mist text-forest hover:bg-mist/80 focus:ring-mist rounded-xl2',
      ghost: 'text-forest hover:bg-mist/50 focus:ring-mist rounded-xl2',
      outline: 'border border-forest text-forest hover:bg-forest hover:text-white focus:ring-forest rounded-xl2',
      destructive: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600 rounded-xl2',
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-sm min-h-[32px]',
      md: 'px-4 py-2 text-base min-h-[40px]',
      lg: 'px-6 py-3 text-lg min-h-[48px]',
    }

    const magneticStyles = magnetic ? 'hover:scale-105 active:scale-95' : ''

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        className: twMerge(
          clsx(baseStyles, variants[variant], sizes[size], magneticStyles),
          className
        ),
        ref,
        ...props
      })
    }

    return (
      <button
        ref={ref}
        className={twMerge(
          clsx(baseStyles, variants[variant], sizes[size], magneticStyles),
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
export default Button