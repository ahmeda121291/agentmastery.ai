'use client'

import { ButtonHTMLAttributes, forwardRef, useRef, useEffect } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'white' | 'link'
  size?: 'sm' | 'md' | 'lg'
  magnetic?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', magnetic = false, ...props }, ref) => {
    const buttonRef = useRef<HTMLButtonElement>(null)
    const combinedRef = ref || buttonRef

    useEffect(() => {
      if (!magnetic || typeof window === 'undefined') return

      const button = buttonRef.current || (ref as any)?.current
      if (!button) return

      const handleMouseMove = (e: MouseEvent) => {
        const rect = button.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2

        const distance = Math.sqrt(x * x + y * y)
        const maxDistance = Math.max(rect.width, rect.height)

        if (distance < maxDistance) {
          const factor = Math.min(distance / maxDistance, 1) * 0.3
          const translateX = x * factor
          const translateY = y * factor

          button.style.setProperty('--magnet-transform', `translate(${translateX}px, ${translateY}px)`)
        }
      }

      const handleMouseLeave = () => {
        button.style.setProperty('--magnet-transform', 'translate(0, 0)')
      }

      button.addEventListener('mousemove', handleMouseMove)
      button.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        button.removeEventListener('mousemove', handleMouseMove)
        button.removeEventListener('mouseleave', handleMouseLeave)
      }
    }, [magnetic, ref])

    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

    const variants = {
      primary: 'bg-green text-paper hover:bg-forest focus:ring-green rounded-full',
      ghost: 'bg-transparent text-forest hover:bg-mist focus:ring-forest rounded-full',
      white: 'bg-paper text-forest hover:bg-mist focus:ring-forest rounded-full shadow-sm',
      link: 'bg-transparent text-green hover:text-forest underline-offset-4 hover:underline p-0',
    }

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    }

    const variantStyles = variants[variant]
    const sizeStyles = variant === 'link' ? '' : sizes[size]
    const magneticStyles = magnetic ? 'magnet' : ''
    const sparkStyles = variant !== 'link' ? 'spark' : ''

    return (
      <button
        ref={combinedRef}
        className={twMerge(
          clsx(baseStyles, variantStyles, sizeStyles, magneticStyles, sparkStyles),
          className
        )}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'