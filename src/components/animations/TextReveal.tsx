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
  up: { y: 40 },
  down: { y: -40 },
  left: { x: 40 },
  right: { x: -40 },
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
  const isInView = useInView(ref, { once: true, margin: '-50px' })

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
        duration: 0.5,
        ease: [0.25, 0.4, 0.25, 1],
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
            className="inline-block"
            variants={childVariants}
          >
            {word}{i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        ))}
      </Tag>
    </motion.div>
  )
}
