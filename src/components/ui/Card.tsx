import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  pearl?: boolean
  onClick?: () => void
}

export function Card({
  children,
  className,
  hover = false,
  pearl = false,
  onClick,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        pearl ? 'bg-parchment' : 'bg-canvas',
        'min-w-0 rounded-2xl border border-hairline p-6 transition-all duration-300',
        hover && 'cursor-pointer hover:-translate-y-1 hover:border-ink/30 hover:shadow-product',
        onClick && 'cursor-pointer',
        className,
      )}
    >
      {children}
    </div>
  )
}
