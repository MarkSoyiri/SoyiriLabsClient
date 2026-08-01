import { type ButtonHTMLAttributes, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const MotionLink = motion(Link)

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  children: ReactNode
  className?: string
  loading?: boolean
  href?: string
}

const loaderSizes: Record<ButtonSize, string> = {
  sm: 'h-3.5 w-3.5',
  md: 'h-4 w-4',
  lg: 'h-4.5 w-4.5',
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className,
  loading = false,
  disabled = false,
  href,
  onClick,
  type = 'button',
  ...props
}: ButtonProps) {
  const baseStyles =
    'relative inline-flex items-center justify-center overflow-hidden rounded-xl font-medium whitespace-nowrap transition-colors duration-300 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary disabled:pointer-events-none disabled:opacity-40 group'

  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      'bg-text text-primary hover:bg-white shadow-[0_1px_0_0_rgba(255,255,255,0.4)_inset,0_12px_32px_-14px_rgba(0,0,0,0.7)]',
    secondary:
      'bg-transparent border border-border-light text-text hover:border-white/30 hover:bg-white/[0.04]',
    ghost: 'bg-transparent text-text-secondary hover:text-text hover:bg-white/[0.05]',
  }

  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'h-9 px-4 text-[13px] gap-1.5',
    md: 'h-11 px-5 text-sm gap-2',
    lg: 'h-12 px-7 text-[15px] gap-2.5',
  }

  const iconSizes: Record<ButtonSize, string> = {
    sm: 'h-4 w-4',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  }

  const sharedProps = {
    whileHover: { y: -1 },
    whileTap: { scale: 0.98 },
    className: cn(baseStyles, variantStyles[variant], sizeStyles[size], className),
  }

  const gapStyles: Record<ButtonSize, string> = {
    sm: 'gap-1.5',
    md: 'gap-2',
    lg: 'gap-2.5',
  }

  const content = (
    <>
      {variant === 'primary' && !loading && (
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
      )}
      {loading && <Loader2 className={cn('animate-spin shrink-0', loaderSizes[size])} />}
      <span
        className={cn(
          'relative inline-flex items-center whitespace-nowrap',
          gapStyles[size],
          loading && 'opacity-70',
        )}
      >
        {children}
      </span>
    </>
  )

  if (href) {
    return (
      <MotionLink to={href} {...sharedProps}>
        {content}
      </MotionLink>
    )
  }

  return (
    <motion.button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      {...sharedProps}
      {...(props as any)}
    >
      {content}
    </motion.button>
  )
}
