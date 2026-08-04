import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type BadgeVariant = 'neutral' | 'action' | 'success' | 'warning' | 'error' | 'onDark'

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  neutral: 'bg-pearl text-ink-80 border-divider',
  action: 'bg-action/10 text-action border-action/20',
  success: 'bg-success/10 text-success border-success/25',
  warning: 'bg-warning/10 text-warning border-warning/25',
  error: 'bg-error/10 text-error border-error/25',
  onDark: 'bg-white/12 text-on-dark-muted border-white/15',
}

export function Badge({ children, variant = 'neutral', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-caption font-medium whitespace-nowrap',
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
