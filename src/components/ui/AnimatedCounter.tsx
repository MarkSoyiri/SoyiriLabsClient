import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedCounterProps {
  from?: number
  to: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
}

export function AnimatedCounter({
  from = 0,
  to,
  duration = 2,
  suffix = '',
  prefix = '',
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [displayValue, setDisplayValue] = useState(from)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (!isInView || hasAnimated) return
    setHasAnimated(true)

    const range = to - from
    const startTime = performance.now()

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / (duration * 1000), 1)
      const eased = 1 - (1 - progress) * (1 - progress)
      setDisplayValue(Math.round(from + range * eased))
      if (progress < 1) {
        requestAnimationFrame(tick)
      }
    }

    requestAnimationFrame(tick)
  }, [isInView, hasAnimated, from, to, duration])

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {prefix}{displayValue}{suffix}
    </span>
  )
}
