import { HTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'elevated' | 'tilt' | 'lift'
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const baseStyles = 'bg-paper rounded-xl2 p-6'

    const variants = {
      default: 'shadow-card',
      bordered: 'border border-mist',
      elevated: 'shadow-lg hover:shadow-xl transition-shadow duration-200',
      tilt: 'shadow-card card-tilt',
      lift: 'shadow-card card-lift',
    }

    return (
      <div
        ref={ref}
        className={twMerge(
          clsx(baseStyles, variants[variant]),
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'
