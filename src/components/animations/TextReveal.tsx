import { useRef, type ElementType } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { cn } from '@/lib/utils'

type Direction = 'up' | 'down' | 'left' | 'right'

interface TextRevealProps {
  text: string
  className?: string
  delay?: number
  stagger?: number
  as?: ElementType
  direction?: Direction
}

const directionMap: Record<Direction, Record<string, number>> = {
  up: { y: 30 },
  down: { y: -30 },
  left: { x: 30 },
  right: { x: -30 },
}

export default function TextReveal({
  text,
  className,
  delay = 0,
  stagger = 0.04,
  as: Tag = 'p',
  direction = 'up',
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  const words = text.split(' ')

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  }

  const childVariants: Variants = {
    hidden: {
      opacity: 0,
      ...directionMap[direction],
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      className={cn('inline', className)}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <Tag className="inline">
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            className="inline-block will-change-transform"
            variants={childVariants}
          >
            {word}{i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        ))}
      </Tag>
    </motion.div>
  )
}
