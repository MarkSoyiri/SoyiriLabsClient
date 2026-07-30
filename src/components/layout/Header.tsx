import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
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
  const buttonRef = useRef<HTMLAnchorElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMobileOpen])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    buttonRef.current.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`
  }

  const handleMouseLeave = () => {
    if (!buttonRef.current) return
    buttonRef.current.style.transform = 'translate(0px, 0px)'
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-border transition-all duration-500"
    >
      <div className="container-premium flex items-center justify-between h-16 md:h-20 px-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
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
                  'text-sm font-medium transition-colors duration-300 relative group',
                  isActive
                    ? 'text-accent'
                    : 'text-text-secondary hover:text-text'
                )
              }
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            ref={buttonRef}
            to="/contact"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="hidden md:inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full bg-accent text-white hover:bg-accent-dark transition-colors duration-300 glow-sm"
          >
            Get a Quote
          </Link>

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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-border bg-black/60 backdrop-blur-xl"
          >
            <nav className="container-premium flex flex-col py-6 px-4 gap-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  onClick={() => setIsMobileOpen(false)}
                  className={({ isActive }: { isActive: boolean }) =>
                    cn(
                      'py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300',
                      isActive
                        ? 'text-accent bg-accent/10'
                        : 'text-text-secondary hover:text-text hover:bg-glass-hover'
                    )
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <Link
                to="/contact"
                onClick={() => setIsMobileOpen(false)}
                className="mt-4 py-3 px-6 flex items-center justify-center text-center text-sm font-medium rounded-full bg-accent text-white hover:bg-accent-dark transition-colors duration-300"
              >
                Get a Quote
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
