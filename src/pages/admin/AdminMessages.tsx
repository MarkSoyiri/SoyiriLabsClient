import { useState, useEffect, useCallback } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail, MailOpen, Trash2, User, Calendar, Building2, DollarSign,
  ChevronDown, ChevronUp, Search,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Skeleton } from '@/components/ui/Skeleton'
import { Toast } from '@/components/ui/Toast'
import { contactApi } from '@/lib/api'
import { cn, formatDate } from '@/lib/utils'
import type { ContactMessage } from '@/types'

export default function AdminMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [deleting, setDeleting] = useState<string | null>(null)
  const [toast, setToast] = useState<{ message: string; variant: 'success' | 'error' } | null>(null)
  const [expanded, setExpanded] = useState<string | null>(null)

  const fetchMessages = useCallback(async () => {
    try {
      setLoading(true)
      const { data } = await contactApi.getAll()
      const list = data.data || data || []
      list.sort((a: ContactMessage, b: ContactMessage) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      setMessages(list)
    } catch { } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchMessages() }, [fetchMessages])

  const handleMarkRead = async (id: string) => {
    try {
      await contactApi.markRead(id)
      setMessages((prev) => prev.map((m) => (m._id === id ? { ...m, read: true } : m)))
    } catch { }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this message?')) return
    setDeleting(id)
    try {
      await contactApi.delete(id)
      setToast({ message: 'Message deleted', variant: 'success' })
      setExpanded(null)
      fetchMessages()
    } catch {
      setToast({ message: 'Failed to delete', variant: 'error' })
    } finally {
      setDeleting(null)
    }
  }

  const filtered = messages.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.email.toLowerCase().includes(search.toLowerCase()) ||
    m.message.toLowerCase().includes(search.toLowerCase())
  )

  const unreadCount = messages.filter((m) => !m.read).length

  return (
    <>
      <Helmet>
        <title>Messages | Soyiri Labs Admin</title>
      </Helmet>

      {toast && (
        <div className="fixed top-4 right-4 z-[100] max-w-sm w-full">
          <Toast variant={toast.variant} message={toast.message} onClose={() => setToast(null)} />
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-ink">Messages</h1>
          <p className="text-sm text-ink-80 mt-1">
            {unreadCount > 0
              ? `${unreadCount} unread message${unreadCount !== 1 ? 's' : ''}`
              : 'All messages are read'}
          </p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-48" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search messages..."
            className="w-56 h-10 pl-9 pr-3 rounded-xl bg-pearl border border-hairline text-ink text-sm placeholder:text-ink-48 focus:outline-none focus:border-action/50"
          />
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)}
        </div>
      ) : filtered.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-ink-48">{search ? 'No messages match your search' : 'No messages yet'}</p>
        </Card>
      ) : (
        <div className="space-y-2">
          {filtered.map((msg, i) => (
            <motion.div
              key={msg._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02 }}
              ref={(el) => {
                if (el && expanded === msg._id) {
                  el.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' })
                }
              }}
            >
              <Card
                className={cn(
                  'p-4 cursor-pointer transition-all duration-300',
                  !msg.read && 'border-action/20 bg-action/[0.02]',
                  expanded === msg._id && 'ring-1 ring-action/30',
                )}
                onClick={() => setExpanded(expanded === msg._id ? null : msg._id)}
              >
                <div className="flex items-start gap-4">
                  <div className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors',
                    msg.read ? 'bg-pearl text-ink-48' : 'bg-action/10 text-action',
                  )}>
                    <User className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={cn('text-sm truncate', msg.read ? 'text-ink' : 'text-ink font-semibold')}>
                        {msg.name}
                      </span>
                      {!msg.read && <span className="w-2 h-2 rounded-full bg-action shrink-0" />}
                      <span className="text-xs text-ink-48 ml-auto flex items-center gap-1 shrink-0">
                        <Calendar className="h-3 w-3" />
                        {formatDate(msg.createdAt)}
                      </span>
                    </div>
                    <p className="text-xs text-ink-48 mt-0.5">{msg.email}</p>
                    <p className={cn('text-sm mt-2 leading-relaxed', expanded !== msg._id && 'line-clamp-2')}>
                      {msg.message}
                    </p>

                    <AnimatePresence>
                      {expanded === msg._id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-wrap gap-4 mt-4 pt-3 border-t border-hairline max-h-[40vh] overflow-y-auto pr-1">
                            {msg.company && (
                              <span className="text-xs text-ink-48 flex items-center gap-1">
                                <Building2 className="h-3.5 w-3.5" />
                                {msg.company}
                              </span>
                            )}
                            {msg.budget && (
                              <span className="text-xs text-ink-48 flex items-center gap-1">
                                <DollarSign className="h-3.5 w-3.5" />
                                {msg.budget}
                              </span>
                            )}
                            <span className="text-xs text-ink-48 flex items-center gap-1">
                              <Mail className="h-3.5 w-3.5" />
                              {msg.email}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-4">
                            {!msg.read && (
                              <Button
                                variant="primary"
                                size="sm"
                                onClick={(e) => { e.stopPropagation(); handleMarkRead(msg._id) }}
                              >
                                <MailOpen className="h-4 w-4 shrink-0" />
                                Mark as Read
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => { e.stopPropagation(); handleDelete(msg._id) }}
                              disabled={deleting === msg._id}
                              className="text-error hover:text-error hover:bg-error/10"
                            >
                              <Trash2 className={cn('h-4 w-4 shrink-0', deleting === msg._id && 'animate-spin')} />
                              Delete
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="shrink-0 text-ink-48">
                    {expanded === msg._id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </>
  )
}
