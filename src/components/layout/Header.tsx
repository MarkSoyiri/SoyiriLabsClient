import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import logo from '@/assets/image.png'

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
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'frosted border-b border-hairline' : 'bg-canvas/70 backdrop-blur-md',
      )}
    >
      <div className="container-wide flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center transition-opacity hover:opacity-80">
          <img src={logo} alt="Soyiri Labs" className="h-9 w-auto object-contain" />
        </Link>

        <button
          onClick={() => navigate('/admin/login')}
          className="mr-1 h-2 w-2 rounded-full bg-ink/20 transition-colors duration-300 hover:bg-action"
          aria-label="Admin"
        />

        <nav className="hidden md:flex items-center gap-1.5">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              className={({ isActive }) =>
                cn(
                  'rounded-full px-4 py-2 text-nav transition-colors duration-200',
                  isActive
                    ? 'bg-ink text-white'
                    : 'text-ink-80 hover:bg-parchment hover:text-ink',
                )
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="hidden md:inline-flex items-center gap-2 h-11 px-6 rounded-full bg-action text-white text-button-utility transition-colors duration-200 hover:bg-action-focus"
          >
            Start a Project
            <ArrowRight className="h-4 w-4" />
          </Link>

          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden p-2 text-ink transition-colors hover:text-action"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="md:hidden overflow-hidden border-t border-hairline bg-canvas"
          >
            <nav className="container-wide flex flex-col px-6 py-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 + i * 0.04, duration: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
                >
                  <NavLink
                    to={link.path}
                    end={link.path === '/'}
                    onClick={() => setIsMobileOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'block border-b border-hairline py-4 font-display text-xl font-semibold tracking-tight transition-colors',
                        isActive ? 'text-action' : 'text-ink hover:text-action',
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
                className="mt-5 flex items-center justify-center gap-2 rounded-full bg-action py-4 text-[15px] font-semibold text-white transition-colors hover:bg-action-focus"
              >
                Start a Project
                <ArrowRight className="h-4 w-4" />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
