"use client"

import React, { useState } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

interface TooltipProps {
  children: React.ReactNode
  content: React.ReactNode
  side?: 'top' | 'bottom' | 'left' | 'right'
  className?: string
}

export function Tooltip({ children, content, side = 'top', className }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)

  const sideStyles = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  }

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
      >
        {children}
      </div>

      {isVisible && (
        <div
          className={twMerge(
            clsx(
              'absolute z-50 px-3 py-1.5 text-sm text-white bg-gray-900 rounded-md whitespace-nowrap pointer-events-none',
              sideStyles[side]
            ),
            className
          )}
          role="tooltip"
        >
          {content}
          {/* Arrow */}
          <div
            className={clsx(
              'absolute w-2 h-2 bg-gray-900 rotate-45',
              {
                'top-full left-1/2 -translate-x-1/2 -mt-1': side === 'top',
                'bottom-full left-1/2 -translate-x-1/2 -mb-1': side === 'bottom',
                'top-1/2 left-full -translate-y-1/2 -ml-1': side === 'left',
                'top-1/2 right-full -translate-y-1/2 -mr-1': side === 'right'
              }
            )}
          />
        </div>
      )}
    </div>
  )
}

export function TooltipProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export function TooltipTrigger({ children, asChild, ...props }: any) {
  if (asChild) {
    return React.cloneElement(children, props)
  }
  return <div {...props}>{children}</div>
}

export function TooltipContent({ children, className, ...props }: any) {
  return (
    <div className={twMerge('tooltip-content', className)} {...props}>
      {children}
    </div>
  )
}

export default Tooltip