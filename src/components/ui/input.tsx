"use client"

import React, { forwardRef } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={twMerge(
          clsx(
            'w-full rounded-xl2 border border-mist/70 bg-white px-3.5 py-2.5',
            'text-ink placeholder:text-ink/40',
            'focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent',
            'disabled:cursor-not-allowed disabled:opacity-50'
          ),
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'

export default Input
export { Input }