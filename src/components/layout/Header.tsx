import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import MagneticButton from '@/components/animations/MagneticButton'
import logoSrc from '@/assets/image.png'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
]

export default function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMobileOpen])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled || isMobileOpen
          ? 'bg-primary/80 backdrop-blur-xl border-b border-border/70'
          : 'bg-transparent border-b border-transparent',
      )}
    >
      <div className="container-premium flex items-center justify-between h-16 md:h-20 px-4">
        <Link to="/" className="flex items-center gap-2 shrink-0 transition-opacity hover:opacity-80">
          <img src={logoSrc} alt="Soyiri Labs" className="h-10 w-auto" />
        </Link>
        <button onClick={() => navigate('/admin/login')} className="relative -ml-1 md:-ml-2 mr-1 md:mr-2 h-2 w-2 rounded-full bg-accent/20 hover:bg-accent/60 transition-all duration-300 shrink-0" aria-label="Admin" />

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              className={({ isActive }: { isActive: boolean }) =>
                cn(
                  'text-sm font-medium transition-colors duration-300 relative py-1 group',
                  isActive
                    ? 'text-text'
                    : 'text-text-secondary hover:text-text'
                )
              }
            >
              {({ isActive }: { isActive: boolean }) => (
                <>
                  {link.name}
                  <span
                    className={cn(
                      'absolute -bottom-0.5 left-0 h-px bg-gradient-to-r from-accent to-accent-light transition-all duration-500',
                      isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-60',
                    )}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <MagneticButton
            to="/contact"
            strength={0.3}
            className="hidden md:inline-block"
          >
            <span className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full bg-text text-primary hover:bg-white shadow-[0_1px_0_0_rgba(255,255,255,0.4)_inset,0_12px_32px_-14px_rgba(0,0,0,0.7)] transition-all duration-300 group">
              Get a Quote
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </MagneticButton>

          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden p-2 text-text-secondary hover:text-text transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden border-t border-border/70 bg-primary/80 backdrop-blur-xl"
          >
            <nav className="container-premium flex flex-col py-6 px-4 gap-1.5">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <NavLink
                    to={link.path}
                    end={link.path === '/'}
                    onClick={() => setIsMobileOpen(false)}
                    className={({ isActive }: { isActive: boolean }) =>
                      cn(
                        'flex items-center justify-between py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 border',
                        isActive
                          ? 'text-text bg-white/[0.05] border-border'
                          : 'text-text-secondary hover:text-text hover:bg-white/[0.04] border-transparent'
                      )
                    }
                  >
                    {link.name}
                  </NavLink>
                </motion.div>
              ))}
              <Link
                to="/contact"
                onClick={() => setIsMobileOpen(false)}
                className="mt-4 py-2.5 px-5 flex items-center justify-center gap-1.5 text-center text-xs font-semibold rounded-full bg-text text-primary hover:bg-white transition-colors duration-300"
              >
                Get a Quote
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
