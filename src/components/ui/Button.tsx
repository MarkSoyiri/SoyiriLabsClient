import { type ButtonHTMLAttributes, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const MotionLink = motion(Link)

type ButtonVariant = 'primary' | 'secondary' | 'utility' | 'pearl' | 'ghost' | 'icon' | 'white' | 'outline-light'
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
  lg: 'h-5 w-5',
}

const gapSizes: Record<ButtonSize, string> = {
  sm: 'gap-2',
  md: 'gap-2.5',
  lg: 'gap-3',
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
    'relative inline-flex items-center justify-center whitespace-nowrap cursor-pointer select-none transition-all duration-200 focus:outline-none disabled:pointer-events-none disabled:opacity-40 active:brightness-[0.94]'

  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      'bg-action text-white hover:bg-action-focus rounded-full shadow-[0_2px_0_0_rgba(11,11,16,0.2)]',
    secondary:
      'bg-transparent border-2 border-ink text-ink hover:bg-ink hover:text-white rounded-full',
    utility: 'bg-ink text-white hover:bg-tile-3 rounded-xl',
    pearl: 'bg-parchment text-ink-80 border border-hairline hover:border-ink/40 hover:text-ink rounded-xl',
    ghost: 'bg-transparent text-action hover:bg-action/[0.06] rounded-full',
    icon: 'bg-chip/60 text-ink hover:bg-chip rounded-full',
    white:
      'bg-white text-ink hover:bg-white/85 rounded-full shadow-[0_2px_0_0_rgba(11,11,16,0.2)]',
    'outline-light':
      'bg-transparent border-2 border-white/70 text-white hover:border-white hover:bg-white hover:text-ink rounded-full',
  }

  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'h-10 px-5',
    md: 'h-12 px-7',
    lg: 'h-14 px-9',
  }

  const sizeText: Record<ButtonSize, string> = {
    sm: 'text-[15px]',
    md: 'text-button-large',
    lg: 'text-button-large',
  }

  const isTextVariant =
    variant === 'primary' || variant === 'secondary' || variant === 'ghost' || variant === 'white' || variant === 'outline-light'

  const sharedProps = {
    whileTap: { scale: 0.95 },
    className: cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      gapSizes[size],
      isTextVariant && sizeText[size],
      variant === 'icon' && 'h-11 w-11 p-0 rounded-full',
      className,
    ),
  }

  const content = (
    <>
      {loading && <Loader2 className={cn('animate-spin shrink-0', loaderSizes[size])} />}
      <span
        className={cn(
          'relative inline-flex items-center justify-center min-w-0',
          gapSizes[size],
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

export type { ButtonSize, ButtonVariant }
