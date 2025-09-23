import React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react'

interface AlertProps {
  children: React.ReactNode
  variant?: 'default' | 'destructive' | 'success' | 'warning'
  className?: string
}

export function Alert({ children, variant = 'default', className }: AlertProps) {
  const baseStyles = 'relative w-full rounded-lg border p-4'

  const variants = {
    default: 'bg-background border-mist',
    destructive: 'border-red-200 bg-red-50 text-red-900',
    success: 'border-green-200 bg-green-50 text-green-900',
    warning: 'border-yellow-200 bg-yellow-50 text-yellow-900',
  }

  return (
    <div className={twMerge(clsx(baseStyles, variants[variant]), className)} role="alert">
      {children}
    </div>
  )
}

export function AlertTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h5 className={twMerge('mb-1 font-medium leading-none tracking-tight', className)}>
      {children}
    </h5>
  )
}

export function AlertDescription({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={twMerge('text-sm [&_p]:leading-relaxed', className)}>
      {children}
    </div>
  )
}

// Helper component for common alert patterns
export function AlertWithIcon({
  variant = 'default',
  title,
  description,
  className
}: {
  variant?: AlertProps['variant']
  title?: string
  description: React.ReactNode
  className?: string
}) {
  const icons = {
    default: <Info className="h-4 w-4" />,
    destructive: <XCircle className="h-4 w-4" />,
    success: <CheckCircle className="h-4 w-4" />,
    warning: <AlertCircle className="h-4 w-4" />,
  }

  return (
    <Alert variant={variant} className={className}>
      <div className="flex gap-3">
        <div className="flex-shrink-0 mt-0.5">{icons[variant || 'default']}</div>
        <div className="flex-1">
          {title && <AlertTitle>{title}</AlertTitle>}
          <AlertDescription>{description}</AlertDescription>
        </div>
      </div>
    </Alert>
  )
}

export default Alert
export type { AlertProps }