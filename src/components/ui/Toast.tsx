import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ToastProps {
  variant?: 'success' | 'error' | 'warning' | 'info'
  message: string
  onClose?: () => void
  className?: string
  children?: ReactNode
}

const config = {
  success: { icon: CheckCircle, bar: 'bg-success', iconColor: 'text-success' },
  error: { icon: AlertCircle, bar: 'bg-error', iconColor: 'text-error' },
  warning: { icon: AlertTriangle, bar: 'bg-warning', iconColor: 'text-warning' },
  info: { icon: Info, bar: 'bg-action', iconColor: 'text-action' },
} as const

export function Toast({ variant = 'info', message, onClose, className, children }: ToastProps) {
  const { icon: Icon, bar, iconColor } = config[variant]

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.98 }}
      transition={{ duration: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
      className={cn(
        'relative overflow-hidden rounded-[11px] frosted border border-hairline flex items-start gap-3 p-4 pr-11',
        className,
      )}
    >
      <span className={cn('absolute left-0 top-0 h-full w-[3px]', bar)} />
      <Icon className={cn('mt-0.5 h-5 w-5 shrink-0', iconColor)} />
      <div className="flex-1 text-[15px] leading-relaxed text-ink min-w-0">
        {message}
        {children}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-2.5 top-2.5 rounded-[8px] p-1 text-ink-48 transition-colors hover:bg-ink/5 hover:text-ink"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </motion.div>
  )
}
