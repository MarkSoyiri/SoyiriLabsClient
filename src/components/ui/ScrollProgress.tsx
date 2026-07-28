'use client'

import { motion, useScroll, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ScrollProgressProps {
  className?: string
}

export function ScrollProgress({ className }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      style={{ scaleX }}
      className={cn(
        'fixed left-0 top-0 z-50 h-[3px] origin-left bg-gradient-to-r from-accent via-purple-500 to-accent-light',
        className,
      )}
    />
  )
}
