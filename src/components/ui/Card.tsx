import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
  border?: boolean
  solid?: boolean
  onClick?: () => void
}

export function Card({
  children,
  className,
  hover = false,
  glow = false,
  border = false,
  solid = false,
  onClick,
}: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4 } : undefined}
      onClick={onClick}
      className={cn(
        solid
          ? 'bg-secondary'
          : 'bg-gradient-to-b from-white/[0.04] to-white/[0.012]',
        'rounded-2xl p-6 min-w-0 border border-border shadow-card transition-colors duration-300',
        hover && 'cursor-pointer hover:border-border-light',
        glow && 'glow',
        border && 'gradient-border border-accent/20',
        className,
      )}
    >
      {children}
    </motion.div>
  )
}
