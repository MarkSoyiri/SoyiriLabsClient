import { cn } from '@/lib/utils'

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg bg-ink/[0.05] before:absolute before:inset-0 before:animate-[shimmer_1.8s_infinite] before:bg-gradient-to-r before:from-transparent before:via-ink/[0.06] before:to-transparent before:bg-[length:200%_100%]',
        className,
      )}
    />
  )
}
