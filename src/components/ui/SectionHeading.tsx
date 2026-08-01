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
    transition: { staggerChildren: 0.12 },
  },
} as const

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
} as const

export function SectionHeading({
  label,
  title,
  description,
  align = 'center',
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
        'max-w-2xl',
        isCenter && 'mx-auto text-center',
        className,
      )}
    >
      {label && (
        <motion.div
          variants={itemVariants}
          className={cn(
            'eyebrow mb-4 flex items-center gap-2.5 text-accent',
            isCenter && 'justify-center',
          )}
        >
          <span className="inline-block h-px w-6 bg-accent/50" />
          <span className="text-text-muted">{label}</span>
          {isCenter && <span className="inline-block h-px w-6 bg-accent/50" />}
        </motion.div>
      )}
      <motion.h2
        variants={itemVariants}
        className="text-3xl font-semibold tracking-[-0.02em] text-text text-balance md:text-4xl lg:text-[2.75rem] lg:leading-[1.08]"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.div
          variants={itemVariants}
          className={cn(
            'mt-5 text-base leading-relaxed text-text-secondary md:text-lg',
            isCenter && 'mx-auto',
          )}
        >
          {description}
        </motion.div>
      )}
    </motion.div>
  )
}
