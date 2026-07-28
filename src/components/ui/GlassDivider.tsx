import { cn } from '@/lib/utils'

interface GlassDividerProps {
  className?: string
}

export function GlassDivider({ className }: GlassDividerProps) {
  return (
    <div
      className={cn(
        'mx-auto h-px w-full max-w-3xl bg-gradient-to-r from-transparent via-accent/50 to-transparent',
        className,
      )}
    />
  )
}
