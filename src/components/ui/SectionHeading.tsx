import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  label?: string
  title: string | ReactNode
  description?: string | ReactNode
  align?: 'left' | 'center'
  className?: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
} as const

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
} as const

export function SectionHeading({
  label,
  title,
  description,
  align = 'center',
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {label && (
        <motion.div variants={itemVariants} className="mb-4 inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-gradient-to-r from-accent to-purple-500" />
          <span className="text-xs font-medium uppercase tracking-widest text-text-muted">
            {label}
          </span>
        </motion.div>
      )}
      <motion.h2
        variants={itemVariants}
        className="text-3xl font-bold tracking-tight text-text md:text-4xl lg:text-5xl"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.div
          variants={itemVariants}
          className="mt-4 text-base leading-relaxed text-text-secondary md:text-lg"
        >
          {description}
        </motion.div>
      )}
    </motion.div>
  )
}
