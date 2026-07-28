import { useMemo } from 'react'
import { cn } from '@/lib/utils'

interface FloatingElement {
  id: number
  type: 'circle' | 'square'
  size: number
  x: number
  y: number
  duration: number
  delay: number
  color: string
}

interface FloatingElementsProps {
  count?: number
  className?: string
  colors?: string[]
}

function createElements(count: number, colors: string[]): FloatingElement[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    type: i % 3 === 0 ? 'square' : 'circle',
    size: Math.random() * 120 + 40,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * -20,
    color: colors[Math.floor(Math.random() * colors.length)],
  }))
}

export default function FloatingElements({
  count = 8,
  className,
  colors = [
    'rgba(99, 102, 241, 0.07)',
    'rgba(168, 85, 247, 0.05)',
    'rgba(236, 72, 153, 0.05)',
    'rgba(59, 130, 246, 0.06)',
  ],
}: FloatingElementsProps) {
  const elements = useMemo(() => createElements(count, colors), [count, colors])

  return (
    <div className={cn('pointer-events-none fixed inset-0 overflow-hidden', className)}>
      {elements.map((el) => (
        <div
          key={el.id}
          className="absolute"
          style={{
            width: el.size,
            height: el.size,
            left: `${el.x}%`,
            top: `${el.y}%`,
            borderRadius: el.type === 'circle' ? '50%' : '20%',
            background: el.color,
            animation: `float ${el.duration}s ease-in-out ${el.delay}s infinite alternate`,
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  )
}
