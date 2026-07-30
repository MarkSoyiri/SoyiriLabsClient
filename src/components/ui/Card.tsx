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
      whileHover={hover ? { y: -6 } : undefined}
      onClick={onClick}
      className={cn(
        solid ? 'glass-solid' : 'glass',
        'rounded-2xl p-6 transition-colors duration-300 min-w-0',
        hover && 'glass-hover cursor-pointer',
        glow && 'glow',
        border && 'gradient-border',
        className,
      )}
    >
      {children}
    </motion.div>
  )
}
