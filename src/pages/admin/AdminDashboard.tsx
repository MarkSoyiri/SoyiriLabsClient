import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FolderKanban, Code, FileText, MessageSquare, Plus,
  ArrowRight, Calendar, User, ExternalLink, AlertCircle,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Skeleton } from '@/components/ui/Skeleton'
import { projectsApi, servicesApi, blogApi, contactApi } from '@/lib/api'
import { formatDate, cn } from '@/lib/utils'
import type { ContactMessage } from '@/types'

interface Stats {
  projects: number
  services: number
  blogPosts: number
  messages: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ projects: 0, services: 0, blogPosts: 0, messages: 0 })
  const [recentMessages, setRecentMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [user, setUser] = useState<{ name?: string }>({})

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) {
      try { setUser(JSON.parse(stored)) } catch { }
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const [projRes, servRes, blogRes, msgRes] = await Promise.allSettled([
        projectsApi.getAll(),
        servicesApi.getAll(),
        blogApi.getAll(),
        contactApi.getAll(),
      ])
      const dataOf = (r: PromiseSettledResult<unknown>) =>
        r.status === 'fulfilled' ? (r.value as { data?: { data?: ContactMessage[]; length?: number } }).data : undefined
      const projData = dataOf(projRes) as { data?: unknown[]; length?: number } | undefined
      const servData = dataOf(servRes) as { data?: unknown[]; length?: number } | undefined
      const blogData = dataOf(blogRes) as { data?: unknown[]; length?: number } | undefined
      const msgData = dataOf(msgRes) as { data?: ContactMessage[]; length?: number } | undefined
      setStats({
        projects: projData?.data?.length || projData?.length || 0,
        services: servData?.data?.length || servData?.length || 0,
        blogPosts: blogData?.data?.length || blogData?.length || 0,
        messages: msgData?.data?.length || msgData?.length || 0,
      })
      const msgs = msgData?.data || msgData
      setRecentMessages(Array.isArray(msgs) ? msgs.slice(0, 5) : [])
      if ([projRes, servRes, blogRes, msgRes].some((r) => r.status === 'rejected')) {
        setLoadError('Some data could not be loaded. If this keeps happening, log out and sign back in.')
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  const statCards = [
    { label: 'Total Projects', value: stats.projects, icon: FolderKanban, color: 'text-action', href: '/admin/projects' },
    { label: 'Services', value: stats.services, icon: Code, color: 'text-action', href: '/admin/services' },
    { label: 'Blog Posts', value: stats.blogPosts, icon: FileText, color: 'text-success', href: '/admin/blog' },
    { label: 'Messages', value: stats.messages, icon: MessageSquare, color: 'text-warning', href: '/admin/messages' },
  ]

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }

  return (
    <>
      <Helmet>
        <title>Dashboard | Soyiri Labs Admin</title>
      </Helmet>

      <motion.div variants={container} initial="hidden" animate="visible">
        <motion.div variants={item} className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
            Welcome back{user?.name ? `, ${user.name}` : ''}
          </h1>
          <p className="mt-1 text-ink-80">Here's an overview of your site.</p>
        </motion.div>

        {loadError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-center gap-2 rounded-[11px] border border-error/20 bg-error/10 px-4 py-3 text-sm text-error"
          >
            <AlertCircle className="h-4 w-4 shrink-0" />
            {loadError}
          </motion.div>
        )}

        <motion.div variants={item} className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-28" />
              ))
            : statCards.map((s) => (
                <Link key={s.label} to={s.href}>
                  <Card hover className="h-full">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="mb-1 text-sm text-ink-80">{s.label}</p>
                        <p className="text-3xl font-bold text-ink">{s.value}</p>
                      </div>
                      <div className={cn('rounded-xl bg-action/10 p-3', s.color)}>
                        <s.icon className="h-5 w-5" />
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div variants={item}>
            <Card className="h-full">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-ink">Recent Messages</h2>
                <Link to="/admin/messages" className="flex items-center gap-1 text-sm text-action transition-colors hover:text-action-focus">
                  View all <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                </Link>
              </div>
              {loading ? (
                <div className="space-y-6">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-16" />
                  ))}
                </div>
              ) : recentMessages.length === 0 ? (
                <p className="py-8 text-center text-sm text-ink-48">No messages yet.</p>
              ) : (
                <div className="space-y-3">
                  {recentMessages.map((msg, i) => (
                    <motion.div
                      key={msg._id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className={cn(
                        'flex items-start gap-3 rounded-[11px] p-3 transition-colors duration-300',
                        msg.read ? 'bg-pearl' : 'border border-action/10 bg-action/5',
                      )}
                    >
                      <div className="shrink-0">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-action/10">
                          <User className="h-4 w-4 text-action" />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="truncate text-sm font-medium text-ink">{msg.name}</span>
                          {!msg.read && <span className="h-2 w-2 shrink-0 rounded-full bg-action" />}
                        </div>
                        <p className="mt-0.5 truncate text-xs text-ink-48">{msg.message}</p>
                        <span className="mt-1 flex items-center gap-1 text-[11px] text-ink-48">
                          <Calendar className="h-3 w-3" />
                          {formatDate(msg.createdAt)}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="h-full">
              <h2 className="mb-6 text-lg font-semibold text-ink">Quick Actions</h2>
              <div className="space-y-4">
                <Link to="/admin/projects">
                  <Card hover className="flex items-center gap-4 p-4">
                    <div className="rounded-xl bg-action/10 p-3 text-action">
                      <Plus className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-ink">New Project</p>
                      <p className="text-xs text-ink-48">Add a new project to your portfolio</p>
                    </div>
                    <ExternalLink className="ml-auto h-4 w-4 shrink-0 text-ink-48" />
                  </Card>
                </Link>
                <Link to="/admin/blog">
                  <Card hover className="flex items-center gap-4 p-4">
                    <div className="rounded-xl bg-action/10 p-3 text-action">
                      <Plus className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-ink">New Blog Post</p>
                      <p className="text-xs text-ink-48">Write and publish a new article</p>
                    </div>
                    <ExternalLink className="ml-auto h-4 w-4 shrink-0 text-ink-48" />
                  </Card>
                </Link>
                <Link to="/admin/services">
                  <Card hover className="flex items-center gap-4 p-4">
                    <div className="rounded-xl bg-action/10 p-3 text-action">
                      <Plus className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-ink">New Service</p>
                      <p className="text-xs text-ink-48">Add a new service offering</p>
                    </div>
                    <ExternalLink className="ml-auto h-4 w-4 shrink-0 text-ink-48" />
                  </Card>
                </Link>
              </div>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </>
  )
}
