import React, { forwardRef } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

const Card = forwardRef<HTMLDivElement, CardProps>(({ children, className, ...props }, ref) => {
  return (
    <div ref={ref} className={twMerge('rounded-xl2 bg-white shadow-card border border-mist/60', className)} {...props}>
      {children}
    </div>
  )
})

Card.displayName = 'Card'

export default Card

interface CardSubComponentProps {
  children: React.ReactNode
  className?: string
}

export function CardHeader({ children, className }: CardSubComponentProps) {
  return (
    <div className={twMerge('p-6 pb-0', className)}>
      {children}
    </div>
  )
}

export function CardTitle({ children, className }: CardSubComponentProps) {
  return (
    <h3 className={twMerge('text-lg font-semibold text-ink', className)}>
      {children}
    </h3>
  )
}

export function CardDescription({ children, className }: CardSubComponentProps) {
  return (
    <p className={twMerge('mt-1 text-sm text-ink/60', className)}>
      {children}
    </p>
  )
}

export function CardContent({ children, className }: CardSubComponentProps) {
  return (
    <div className={twMerge('p-6', className)}>
      {children}
    </div>
  )
}

export function CardFooter({ children, className }: CardSubComponentProps) {
  return (
    <div className={twMerge('p-6 pt-0', className)}>
      {children}
    </div>
  )
}

// Re-export for compatibility
export { Card }
export type { CardProps }