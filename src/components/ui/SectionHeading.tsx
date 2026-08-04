import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  label?: string
  title: string | ReactNode
  description?: string | ReactNode
  align?: 'left' | 'center'
  onDark?: boolean
  className?: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
} as const

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.4, 0.25, 1] as const },
  },
} as const

export function SectionHeading({
  label,
  title,
  description,
  align = 'center',
  onDark = false,
  className,
}: SectionHeadingProps) {
  const isCenter = align === 'center'

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className={cn(
        'max-w-3xl',
        isCenter && 'mx-auto text-center',
        className,
      )}
    >
      {label && (
        <motion.p
          variants={itemVariants}
          className={cn(
            'mb-4 inline-flex items-center gap-2 text-caption-strong uppercase tracking-[0.14em]',
            onDark ? 'text-on-dark-muted' : 'text-ink-48',
          )}
        >
          <span className="inline-block h-2 w-2 rounded-full bg-action" />
          {label}
        </motion.p>
      )}
      <motion.h2
        variants={itemVariants}
        className={cn(
          'text-display-lg text-balance',
          onDark ? 'text-on-dark' : 'text-ink',
        )}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={itemVariants}
          className={cn(
            'mt-5 text-lead-airy',
            onDark ? 'text-on-dark-muted' : 'text-ink-80',
            isCenter && 'mx-auto',
          )}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  )
}
