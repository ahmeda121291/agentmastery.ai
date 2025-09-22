import { ButtonHTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'white' | 'link'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
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
    
    return (
      <button
        ref={ref}
        className={twMerge(
          clsx(baseStyles, variantStyles, sizeStyles),
          className
        )}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'
