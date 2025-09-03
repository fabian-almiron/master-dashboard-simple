import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export function Button({ 
  children, 
  variant = 'default', 
  size = 'md',
  className = '',
  ...props 
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'
  
  const variants = {
    default: 'bg-theme-primary-500 text-white hover:bg-theme-primary-600 focus:ring-theme-primary-500 shadow-sm',
    outline: 'border border-theme-gray-300 bg-white text-theme-gray-900 hover:bg-theme-gray-50 focus:ring-theme-primary-500',
    ghost: 'text-theme-gray-700 hover:bg-theme-gray-100 hover:text-theme-gray-900 focus:ring-theme-primary-500',
    destructive: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 shadow-sm'
  }

  const sizes = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base'
  }

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}

export default Button
