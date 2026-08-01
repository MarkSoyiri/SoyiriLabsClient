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

const variantStyles: Record<ToastVariant, { icon: ReactNode; iconColor: string; accent: string }> = {
  success: {
    icon: <CheckCircle className="h-5 w-5" />,
    iconColor: 'text-success',
    accent: 'bg-success',
  },
  error: {
    icon: <AlertCircle className="h-5 w-5" />,
    iconColor: 'text-error',
    accent: 'bg-error',
  },
  warning: {
    icon: <AlertTriangle className="h-5 w-5" />,
    iconColor: 'text-warning',
    accent: 'bg-warning',
  },
  info: {
    icon: <Info className="h-5 w-5" />,
    iconColor: 'text-accent',
    accent: 'bg-accent',
  },
}

export function Toast({
  variant = 'info',
  message,
  onClose,
  className,
  children,
}: ToastProps) {
  const { icon, iconColor, accent } = variantStyles[variant]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -12, scale: 0.97 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'relative overflow-hidden rounded-2xl bg-secondary/90 border border-border backdrop-blur-xl shadow-float flex items-start gap-3 p-4 pr-12',
          className,
        )}
        role="alert"
      >
        <span className={cn('absolute left-0 top-0 h-full w-[3px]', accent)} />
        <span className={cn('mt-0.5 shrink-0', iconColor)}>{icon}</span>
        <div className="flex-1 text-sm text-text">{message}{children}</div>
        {onClose && (
          <button
            onClick={onClose}
            className="absolute right-3 top-3 rounded-lg p-1 text-text-muted transition-colors hover:bg-white/[0.06] hover:text-text"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
