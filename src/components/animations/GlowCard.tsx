import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlowCardProps {
  children: ReactNode
  className?: string
  color?: string
}

export default function GlowCard({
  children,
  className,
  color = 'rgba(99, 102, 241, 0.15)',
}: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 })
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 })

  const glowX = useTransform(springX, [-0.5, 0.5], ['0%', '100%'])
  const glowY = useTransform(springY, [-0.5, 0.5], ['0%', '100%'])

  function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  function handleLeave() {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={cn('relative overflow-hidden', className)}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
    >
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${glowX} ${glowY}, ${color}, transparent 70%)`,
        }}
      />
      {children}
    </motion.div>
  )
}
