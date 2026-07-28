import { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
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

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-primary flex">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-screen w-64 glass border-r border-border flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-border">
          <span className="text-lg font-bold gradient-text">Soyiri Labs</span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 text-text-secondary hover:text-text transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/admin'}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }: { isActive: boolean }) =>
                cn(
                  'flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300',
                  isActive
                    ? 'bg-accent/10 text-accent border border-accent/20'
                    : 'text-text-secondary hover:text-text hover:bg-glass-hover border border-transparent'
                )
              }
            >
              <link.icon size={18} />
              {link.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-border">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 w-full rounded-lg text-sm font-medium text-text-secondary hover:text-error hover:bg-error/10 transition-all duration-300"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="h-16 glass border-b border-border flex items-center justify-between px-4 md:px-6 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 text-text-secondary hover:text-text transition-colors"
          >
            <Menu size={20} />
          </button>

          <div className="hidden lg:block" />

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                <User size={16} className="text-accent" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-text">Admin</p>
                <p className="text-xs text-text-muted">admin@soyirilabs.com</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-text-secondary hover:text-error transition-colors duration-300"
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
