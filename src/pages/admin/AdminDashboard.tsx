import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FolderKanban, Code, FileText, MessageSquare, Plus,
  ArrowRight, Calendar, Mail, User, ExternalLink, Clock,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Skeleton } from '@/components/ui/Skeleton'
import { projectsApi, servicesApi, blogApi, contactApi } from '@/lib/api'
import { formatDate, truncate, cn } from '@/lib/utils'
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
  const [user, setUser] = useState<{ name?: string }>({})

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) {
      try { setUser(JSON.parse(stored)) } catch { }
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projRes, servRes, blogRes, msgRes] = await Promise.all([
          projectsApi.getAll(),
          servicesApi.getAll(),
          blogApi.getAll(),
          contactApi.getAll(),
        ])
        setStats({
          projects: projRes.data.data?.length || projRes.data?.length || 0,
          services: servRes.data.data?.length || servRes.data?.length || 0,
          blogPosts: blogRes.data.data?.length || blogRes.data?.length || 0,
          messages: msgRes.data.data?.length || msgRes.data?.length || 0,
        })
        const msgs = msgRes.data.data || msgRes.data || []
        setRecentMessages(msgs.slice(0, 5))
      } catch { } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const statCards = [
    { label: 'Total Projects', value: stats.projects, icon: FolderKanban, color: 'text-accent', href: '/admin/projects' },
    { label: 'Services', value: stats.services, icon: Code, color: 'text-purple-400', href: '/admin/services' },
    { label: 'Blog Posts', value: stats.blogPosts, icon: FileText, color: 'text-emerald-400', href: '/admin/blog' },
    { label: 'Messages', value: stats.messages, icon: MessageSquare, color: 'text-amber-400', href: '/admin/messages' },
  ]

  const container = {
    hidden: { opacity: 0 },
    visible: { transition: { staggerChildren: 0.08 } },
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
          <h1 className="text-2xl font-bold text-text md:text-3xl">
            Welcome back{user?.name ? `, ${user.name}` : ''} 👋
          </h1>
          <p className="mt-1 text-text-secondary">Here's an overview of your site.</p>
        </motion.div>

        <motion.div variants={item} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-28 rounded-2xl" />
              ))
            : statCards.map((s) => (
                <Link key={s.label} to={s.href}>
                  <Card hover className="h-full">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-text-secondary mb-1">{s.label}</p>
                        <p className="text-3xl font-bold text-text">{s.value}</p>
                      </div>
                      <div className={cn('glass-light rounded-xl p-3', s.color)}>
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
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-text">Recent Messages</h2>
                <Link to="/admin/messages" className="text-sm text-accent hover:text-accent-light transition-colors flex items-center gap-1">
                  View all <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              {loading ? (
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-16 rounded-xl" />
                  ))}
                </div>
              ) : recentMessages.length === 0 ? (
                <p className="text-sm text-text-muted text-center py-8">No messages yet.</p>
              ) : (
                <div className="space-y-3">
                  {recentMessages.map((msg, i) => (
                    <motion.div
                      key={msg._id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className={cn(
                        'flex items-start gap-3 p-3 rounded-xl transition-colors duration-300',
                        msg.read ? 'bg-glass-light' : 'bg-accent/5 border border-accent/10',
                      )}
                    >
                      <div className="shrink-0">
                        <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center">
                          <User className="h-4 w-4 text-accent" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-text truncate">{msg.name}</span>
                          {!msg.read && <span className="w-2 h-2 rounded-full bg-accent shrink-0" />}
                        </div>
                        <p className="text-xs text-text-muted truncate mt-0.5">{msg.message}</p>
                        <span className="text-[11px] text-text-muted flex items-center gap-1 mt-1">
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
              <h2 className="text-lg font-semibold text-text mb-6">Quick Actions</h2>
              <div className="space-y-4">
                <Link to="/admin/projects">
                  <Card hover className="flex items-center gap-4 p-4">
                    <div className="glass-light rounded-xl p-3 text-accent">
                      <Plus className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text">New Project</p>
                      <p className="text-xs text-text-muted">Add a new project to your portfolio</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-text-muted ml-auto shrink-0" />
                  </Card>
                </Link>
                <Link to="/admin/blog">
                  <Card hover className="flex items-center gap-4 p-4">
                    <div className="glass-light rounded-xl p-3 text-purple-400">
                      <Plus className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text">New Blog Post</p>
                      <p className="text-xs text-text-muted">Write and publish a new article</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-text-muted ml-auto shrink-0" />
                  </Card>
                </Link>
                <Link to="/admin/services">
                  <Card hover className="flex items-center gap-4 p-4">
                    <div className="glass-light rounded-xl p-3 text-emerald-400">
                      <Plus className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text">New Service</p>
                      <p className="text-xs text-text-muted">Add a new service offering</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-text-muted ml-auto shrink-0" />
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
