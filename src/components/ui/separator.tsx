import React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

export function Separator({ orientation = 'horizontal', className }: SeparatorProps) {
  return (
    <div
      className={twMerge(
        clsx(
          'shrink-0 bg-mist',
          orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]'
        ),
        className
      )}
    />
  )
}

export default Separator
export type { SeparatorProps }