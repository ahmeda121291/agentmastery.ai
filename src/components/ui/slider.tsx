"use client"

import React, { forwardRef, useState } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'defaultValue' | 'value'> {
  value?: number[]
  defaultValue?: number[]
  max?: number
  min?: number
  step?: number
  onValueChange?: (value: number[]) => void
  className?: string
}

const Slider = forwardRef<HTMLInputElement, SliderProps>(
  ({
    value: controlledValue,
    defaultValue = [0],
    max = 100,
    min = 0,
    step = 1,
    onValueChange,
    className,
    disabled,
    ...props
  }, ref) => {
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue)
    const value = controlledValue || uncontrolledValue
    const currentValue = value[0] || 0

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = [Number(e.target.value)]
      if (onValueChange) {
        onValueChange(newValue)
      } else {
        setUncontrolledValue(newValue)
      }
    }

    const percentage = ((currentValue - min) / (max - min)) * 100

    return (
      <div className={twMerge('relative flex w-full touch-none select-none items-center', className)}>
        <div className="relative w-full">
          {/* Track */}
          <div className="relative h-2 w-full grow overflow-hidden rounded-full bg-mist">
            {/* Fill */}
            <div
              className="absolute h-full bg-green"
              style={{ width: `${percentage}%` }}
            />
          </div>

          {/* Input range (invisible but functional) */}
          <input
            ref={ref}
            type="range"
            min={min}
            max={max}
            step={step}
            value={currentValue}
            onChange={handleChange}
            disabled={disabled}
            className={clsx(
              'absolute inset-0 w-full cursor-pointer opacity-0',
              disabled && 'cursor-not-allowed'
            )}
            {...props}
          />

          {/* Thumb */}
          <div
            className={clsx(
              'absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-2 border-green bg-white shadow transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              disabled && 'pointer-events-none opacity-50'
            )}
            style={{ left: `calc(${percentage}% - 10px)` }}
          />
        </div>
      </div>
    )
  }
)

Slider.displayName = 'Slider'

export { Slider }
export default Slider
export type { SliderProps }