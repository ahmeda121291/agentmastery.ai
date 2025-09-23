import React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

interface ProgressProps {
  value?: number
  className?: string
  indicatorClassName?: string
}

export function Progress({ value = 0, className, indicatorClassName }: ProgressProps) {
  return (
    <div
      className={twMerge(
        'relative h-4 w-full overflow-hidden rounded-full bg-mist',
        className
      )}
    >
      <div
        className={twMerge(
          'h-full w-full flex-1 bg-green transition-all',
          indicatorClassName
        )}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </div>
  )
}

export default Progress
export type { ProgressProps }