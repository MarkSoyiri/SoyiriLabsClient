import { useRef, type ElementType, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
  as?: ElementType
}

export default function MagneticButton({
  children,
  className,
  strength = 0.3,
  as: Tag = 'button',
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, { stiffness: 200, damping: 15 })
  const springY = useSpring(y, { stiffness: 200, damping: 15 })

  function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const xVal = (e.clientX - rect.left - rect.width / 2) * strength
    const yVal = (e.clientY - rect.top - rect.height / 2) * strength
    x.set(xVal)
    y.set(yVal)
  }

  function handleLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={cn('inline-block', className)}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
    >
      <Tag>{children}</Tag>
    </motion.div>
  )
}
