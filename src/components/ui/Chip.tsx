import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ChipProps {
  children: ReactNode
  selected?: boolean
  className?: string
  onClick?: () => void
  disabled?: boolean
}

export function Chip({ children, selected = false, className, onClick, disabled }: ChipProps) {
  const Comp = onClick ? 'button' : 'span'
  return (
    <Comp
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-caption font-medium transition-colors duration-200',
        selected
          ? 'border-action bg-action text-white'
          : 'border-hairline bg-parchment text-ink-80',
        onClick &&
          'cursor-pointer hover:border-ink/40 hover:text-ink disabled:pointer-events-none disabled:opacity-40',
        className,
      )}
    >
      {children}
    </Comp>
  )
}
