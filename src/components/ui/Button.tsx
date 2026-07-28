import { type ButtonHTMLAttributes, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue } from 'framer-motion'
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
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * 0.15)
    y.set((e.clientY - centerY) * 0.15)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const baseStyles =
    'relative inline-flex items-center justify-center font-medium transition-all duration-300 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary disabled:pointer-events-none disabled:opacity-50 cursor-pointer overflow-hidden group'

  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      'bg-gradient-to-r from-accent to-purple-500 text-white shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30',
    secondary: 'glass glass-hover text-text hover:border-border-light',
    ghost: 'bg-transparent text-text-secondary hover:text-text hover:bg-glass-light',
  }

  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'h-9 px-4 text-sm gap-1.5',
    md: 'h-11 px-6 text-base gap-2',
    lg: 'h-12 px-8 text-lg gap-2.5',
  }

  const sharedProps = {
    style: { x, y } as const,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    className: cn(baseStyles, variantStyles[variant], sizeStyles[size], className),
  }

  const content = (
    <>
      {loading && <Loader2 className="h-4 w-4 animate-spin shrink-0" />}
      <span className={cn(loading && 'opacity-70')}>{children}</span>
      {variant === 'primary' && !loading && (
        <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-accent to-purple-500 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-50" />
      )}
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
