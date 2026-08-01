import { useMemo, useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface FloatingElement {
  id: number
  size: number
  x: number
  y: number
  duration: number
  delay: number
  color: string
  opacity: number
}

interface FloatingElementsProps {
  count?: number
  className?: string
  colors?: string[]
}

function createElements(count: number, colors: string[], maxSize: number): FloatingElement[] {
  const alphas = [0.07, 0.05, 0.04, 0.06]
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * maxSize + Math.max(120, maxSize * 0.6),
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 18 + 20,
    delay: Math.random() * -20,
    color: colors[Math.floor(Math.random() * colors.length)],
    opacity: alphas[i % alphas.length],
  }))
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 640px)').matches)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)')
    const onChange = () => setIsMobile(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return isMobile
}

export default function FloatingElements({
  count = 6,
  className,
  colors = [
    'rgba(139, 131, 255, 0.5)',
    'rgba(216, 182, 115, 0.4)',
    'rgba(168, 162, 255, 0.35)',
    'rgba(255, 255, 255, 0.25)',
  ],
}: FloatingElementsProps) {
  const isMobile = useIsMobile()
  const effectiveCount = isMobile ? Math.max(2, Math.ceil(count / 2)) : count
  const elements = useMemo(
    () => createElements(effectiveCount, colors, isMobile ? 140 : 240),
    [effectiveCount, colors, isMobile],
  )

  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      {elements.map((el) => (
        <div
          key={el.id}
          className="absolute rounded-full"
          style={{
            width: el.size,
            height: el.size,
            left: `${el.x}%`,
            top: `${el.y}%`,
            background: el.color,
            opacity: el.opacity,
            filter: 'blur(64px)',
            animation: `float ${el.duration}s ease-in-out ${el.delay}s infinite`,
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  )
}
