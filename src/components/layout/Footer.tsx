import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, ArrowRight, ArrowUpRight, Code2, MessageCircle, Share2, Globe } from 'lucide-react'
import logo from '@/assets/image.png'

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
  { name: 'Web Development', path: '/services/website-development' },
  { name: 'Web Applications', path: '/services/web-applications' },
  { name: 'UI/UX Design', path: '/services/ui-ux-design' },
  { name: 'Hosting & Deployment', path: '/services/hosting-deployment' },
]

const socialLinks = [
  { icon: Code2, href: '#' },
  { icon: MessageCircle, href: '#' },
  { icon: Share2, href: '#' },
  { icon: Globe, href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-tile-1 text-on-dark">
      {/* Big CTA strip */}
      <div className="border-b border-white/10">
        <div className="container-wide flex flex-col items-start justify-between gap-8 px-4 py-16 md:flex-row md:items-center md:px-6 md:py-20">
          <div>
            <p className="mb-3 flex items-center gap-2 text-caption-strong uppercase tracking-[0.14em] text-on-dark-muted">
              <span className="inline-block h-2 w-2 rounded-full bg-action-sky" />
              Got a project in mind?
            </p>
            <h2 className="text-display-lg text-white">
              Let's build something
              <br />
              <span className="text-serif-accent text-action-sky">great together.</span>
            </h2>
          </div>
          <Link
            to="/contact"
            className="group inline-flex h-14 shrink-0 items-center gap-2 rounded-full bg-action px-9 text-button-large text-white transition-colors duration-200 hover:bg-action-focus"
          >
            Start a Project
            <ArrowUpRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>

      <div className="container-wide px-4 pt-14 pb-8 md:px-6">
        <div className="grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-6">
            <Link to="/" className="inline-flex transition-opacity hover:opacity-80">
              <img src={logo} alt="Soyiri Labs" className="h-10 w-auto object-contain" />
            </Link>
            <p className="max-w-[26ch] text-[15px] leading-relaxed text-on-dark-muted">
              We craft premium digital experiences that elevate brands and drive growth.
            </p>
            <div className="flex items-center gap-2.5">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-on-dark-muted transition-colors duration-200 hover:border-action-sky hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Social link"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-caption-strong uppercase tracking-[0.14em] text-on-dark-muted">Quick Links</h3>
            <ul className="text-dense-link text-on-dark-muted">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="transition-colors duration-200 hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-caption-strong uppercase tracking-[0.14em] text-on-dark-muted">Services</h3>
            <ul className="text-dense-link text-on-dark-muted">
              {services.map((service) => (
                <li key={service.path}>
                  <Link
                    to={service.path}
                    className="transition-colors duration-200 hover:text-white"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0 space-y-10">
            <div className="space-y-3">
              <h3 className="mb-4 text-caption-strong uppercase tracking-[0.14em] text-on-dark-muted">Contact Us</h3>
              <a
                href="mailto:hello@soyirilabs.com"
                className="flex items-center gap-3 text-[15px] text-on-dark-muted transition-colors duration-200 hover:text-white"
              >
                <Mail size={16} className="shrink-0 text-action-sky" />
                hello@soyirilabs.com
              </a>
              <a
                href="tel:+233507478237"
                className="flex items-center gap-3 text-[15px] text-on-dark-muted transition-colors duration-200 hover:text-white"
              >
                <Phone size={16} className="shrink-0 text-action-sky" />
                +233 050 747 8237
              </a>
              <div className="flex items-start gap-3 text-[15px] text-on-dark-muted">
                <MapPin size={16} className="mt-1 shrink-0 text-action-sky" />
                <span>Kumasi - Ashanti Region (Ghana)</span>
              </div>
            </div>

            <div className="space-y-4 rounded-2xl border border-white/10 bg-tile-2 p-6 min-w-0">
              <h4 className="text-caption-strong text-white">Stay Updated</h4>
              <p className="text-[13px] text-on-dark-muted">
                Get the latest insights and news delivered to your inbox.
              </p>
              <form
                className="flex w-full min-w-0 gap-2"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="h-11 min-w-0 flex-1 rounded-full border border-white/15 bg-tile-1 px-4 text-[14px] text-white placeholder:text-on-dark-muted transition-colors duration-200 focus:outline-none focus:border-action-sky focus:ring-[3px] focus:ring-action-sky/20"
                />
                <button
                  type="submit"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-action text-white transition-colors duration-200 hover:bg-action-focus"
                  aria-label="Subscribe"
                >
                  <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 md:flex-row">
          <p className="text-fine text-on-dark-muted">
            &copy; {new Date().getFullYear()} Soyiri Labs. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/privacy"
              className="text-fine text-on-dark-muted transition-colors duration-200 hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-fine text-on-dark-muted transition-colors duration-200 hover:text-white"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
