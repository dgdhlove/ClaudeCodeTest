import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  loading?: boolean
}

export default function Button({
  children,
  variant = 'primary',
  loading = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
  const variants = {
    primary: 'bg-coral hover:bg-coral-dark text-white shadow-sm',
    secondary: 'bg-gray-900 hover:bg-gray-800 text-white shadow-sm',
    outline: 'border border-coral text-coral hover:bg-coral hover:text-white',
  }

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
      )}
      {children}
    </button>
  )
}
