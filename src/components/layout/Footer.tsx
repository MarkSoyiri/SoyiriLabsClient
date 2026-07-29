import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, ArrowRight, Code2, MessageCircle, Share2, Globe } from 'lucide-react'
import logoSrc from '@/assets/image.png'

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
  { name: 'FAQ', path: '/faq' },
]

const services = [
  { name: 'Web Development', path: '/services/web-development' },
  { name: 'Mobile App Development', path: '/services/mobile-app-development' },
  { name: 'UI/UX Design', path: '/services/ui-ux-design' },
  { name: 'Cloud & DevOps', path: '/services/cloud-devops' },
]

const socialLinks = [
  { icon: Code2, href: '#' },
  { icon: MessageCircle, href: '#' },
  { icon: Share2, href: '#' },
  { icon: Globe, href: '#' },
]

export default function Footer() {
  return (
    <footer className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-secondary to-primary pointer-events-none" />

      <div className="relative container-premium px-4 pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <img src={logoSrc} alt="Soyiri Labs" className="h-12 w-auto" />
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed">
              We craft premium digital experiences that elevate brands and drive growth.
              Our team combines creativity with cutting-edge technology.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent/50 transition-all duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-text mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-text-secondary hover:text-accent transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-text mb-6">
              Services
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.path}>
                  <Link
                    to={service.path}
                    className="text-sm text-text-secondary hover:text-accent transition-colors duration-300"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-text mb-6">
                Contact Us
              </h3>
              <div className="space-y-3">
                <a
                  href="mailto:hello@soyirilabs.com"
                  className="flex items-center gap-3 text-sm text-text-secondary hover:text-accent transition-colors duration-300"
                >
                  <Mail size={16} className="text-accent shrink-0" />
                  hello@soyirilabs.com
                </a>
                <a
                  href="tel:+1234567890"
                  className="flex items-center gap-3 text-sm text-text-secondary hover:text-accent transition-colors duration-300"
                >
                  <Phone size={16} className="text-accent shrink-0" />
                  +1 (234) 567-890
                </a>
                <div className="flex items-start gap-3 text-sm text-text-secondary">
                  <MapPin size={16} className="text-accent shrink-0 mt-0.5" />
                  <span>Kumasi - Ashanti Region (Ghana)</span>
                </div>
              </div>
            </div>

            <div className="glass rounded-xl p-6 space-y-4 overflow-hidden min-w-0">
              <h4 className="text-sm font-semibold text-text">
                Stay Updated
              </h4>
              <p className="text-xs text-text-secondary">
                Get the latest insights and news delivered to your inbox.
              </p>
              <form
                className="flex gap-2"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 min-w-0 px-4 py-2.5 text-sm rounded-lg bg-glass-light border border-border text-text placeholder-text-muted focus:outline-none focus:border-accent/50 transition-colors duration-300"
                />
                <button
                  type="submit"
                  className="flex items-center justify-center p-2.5 rounded-lg bg-accent text-white hover:bg-accent-dark transition-colors duration-300 shrink-0"
                >
                  <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent my-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} Soyiri Labs. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/privacy"
              className="text-xs text-text-muted hover:text-text transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-xs text-text-muted hover:text-text transition-colors duration-300"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
