import { type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

type ToastVariant = 'success' | 'error' | 'warning' | 'info'

interface ToastProps {
  variant?: ToastVariant
  message: string
  onClose?: () => void
  className?: string
  children?: ReactNode
}

const variantStyles: Record<ToastVariant, { icon: ReactNode; container: string; iconColor: string }> = {
  success: {
    icon: <CheckCircle className="h-5 w-5" />,
    container: 'border-l-success/50',
    iconColor: 'text-success',
  },
  error: {
    icon: <AlertCircle className="h-5 w-5" />,
    container: 'border-l-error/50',
    iconColor: 'text-error',
  },
  warning: {
    icon: <AlertTriangle className="h-5 w-5" />,
    container: 'border-l-warning/50',
    iconColor: 'text-warning',
  },
  info: {
    icon: <Info className="h-5 w-5" />,
    container: 'border-l-accent/50',
    iconColor: 'text-accent',
  },
}

export function Toast({
  variant = 'info',
  message,
  onClose,
  className,
  children,
}: ToastProps) {
  const { icon, container, iconColor } = variantStyles[variant]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className={cn(
          'glass flex items-start gap-3 rounded-xl border-l-4 p-4 pr-12 shadow-lg',
          container,
          className,
        )}
        role="alert"
      >
        <span className={cn('mt-0.5 shrink-0', iconColor)}>{icon}</span>
        <div className="flex-1 text-sm text-text">{message}{children}</div>
        {onClose && (
          <button
            onClick={onClose}
            className="absolute right-3 top-3 rounded-lg p-1 text-text-muted transition-colors hover:bg-glass-hover hover:text-text"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
