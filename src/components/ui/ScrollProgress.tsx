import { motion, useScroll, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

export function ScrollProgress({ className }: { className?: string }) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      style={{ scaleX }}
      className={cn('fixed left-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-action via-violet to-cyan', className)}
    />
  )
}
