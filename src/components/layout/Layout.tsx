import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import Header from './Header'
import Footer from './Footer'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import PageTransition from '@/components/animations/PageTransition'

export default function Layout() {
  const { pathname } = useLocation()
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true })
  }, [pathname])

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-primary text-text">
      <ScrollProgress />
      <Header />
      <main className="flex-1">
        <PageTransition>
          <Outlet key={pathname} />
        </PageTransition>
      </main>
      <Footer />
    </div>
  )
}
