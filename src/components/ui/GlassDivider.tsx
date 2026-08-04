import { cn } from '@/lib/utils'

export function GlassDivider({ className }: { className?: string }) {
  return <div className={cn('mx-auto h-px w-full max-w-3xl bg-divider', className)} />
}
