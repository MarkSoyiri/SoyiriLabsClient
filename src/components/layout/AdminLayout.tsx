import { useEffect, useState } from 'react'
import { Outlet, NavLink, useNavigate, Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  FolderKanban,
  Code,
  Star,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  User,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import logo from '@/assets/image.png'

const sidebarLinks = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { name: 'Projects', path: '/admin/projects', icon: FolderKanban },
  { name: 'Services', path: '/admin/services', icon: Code },
  { name: 'Testimonials', path: '/admin/testimonials', icon: Star },
  { name: 'Blog', path: '/admin/blog', icon: FileText },
  { name: 'Messages', path: '/admin/messages', icon: MessageSquare },
  { name: 'Settings', path: '/admin/settings', icon: Settings },
]

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-parchment text-ink flex">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-screen w-64 bg-canvas border-r border-hairline flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-hairline">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Soyiri Labs" className="h-8 w-auto object-contain" />
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 text-ink-48 transition-colors hover:text-ink"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/admin'}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-4 py-2.5 rounded-[11px] text-caption-strong transition-colors duration-200',
                  isActive
                    ? 'bg-action/[0.07] text-action'
                    : 'text-ink-80 hover:bg-pearl hover:text-ink',
                )
              }
            >
              <link.icon size={18} className="shrink-0" />
              {link.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-hairline">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-3 px-4 py-2.5 w-full rounded-[11px] text-caption-strong text-ink-80 transition-colors duration-200 hover:text-error hover:bg-error/[0.06]"
          >
            <LogOut size={18} className="shrink-0" />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        <header className="h-16 frosted border-b border-hairline flex items-center justify-between px-4 md:px-6 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden flex items-center justify-center p-2 text-ink-48 transition-colors hover:text-ink"
          >
            <Menu size={20} />
          </button>

          <div className="hidden lg:block" />

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pearl border border-hairline">
                <User size={16} className="text-ink-80" />
              </div>
              <div className="hidden sm:block">
                <p className="text-[13px] font-medium text-ink">Admin</p>
                <p className="text-fine text-ink-48">admin@soyirilabs.com</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center p-2 text-ink-48 transition-colors duration-200 hover:text-error"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
