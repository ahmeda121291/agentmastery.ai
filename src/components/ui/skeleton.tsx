import React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={twMerge(
        clsx(
          'animate-pulse rounded-md bg-mist'
        ),
        className
      )}
      {...props}
    />
  )
}

export default Skeleton