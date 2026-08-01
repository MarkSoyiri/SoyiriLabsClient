import { useRef, type ElementType, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
  as?: ElementType
  to?: string
  onClick?: () => void
}

export default function MagneticButton({
  children,
  className,
  strength = 0.25,
  as,
  to,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, { stiffness: 180, damping: 18 })
  const springY = useSpring(y, { stiffness: 180, damping: 18 })

  const Tag = as ?? (to ? Link : 'button')

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
      className={cn(className)}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
    >
      <Tag {...(to ? { to } : {})} onClick={onClick}>
        {children}
      </Tag>
    </motion.div>
  )
}
