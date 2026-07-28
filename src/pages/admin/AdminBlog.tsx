import { useState, useEffect, useCallback } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus, Edit3, Trash2, X, ImagePlus, Search,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Skeleton } from '@/components/ui/Skeleton'
import { Toast } from '@/components/ui/Toast'
import { blogApi } from '@/lib/api'
import { cn, formatDate, getImageUrl, slugify } from '@/lib/utils'
import type { BlogPost } from '@/types'

interface FormData {
  title: string
  excerpt: string
  content: string
  category: string
  tags: string
  author: string
  seoTitle: string
  seoDescription: string
  status: 'draft' | 'published'
}

const emptyForm: FormData = {
  title: '', excerpt: '', content: '',
  category: '', tags: '', author: 'Soyiri Labs',
  seoTitle: '', seoDescription: '', status: 'draft',
}

export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<BlogPost | null>(null)
  const [form, setForm] = useState<FormData>(emptyForm)
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [localPreview, setLocalPreview] = useState('')
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [toast, setToast] = useState<{ message: string; variant: 'success' | 'error' } | null>(null)

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true)
      const { data } = await blogApi.getAll()
      setPosts(data.data || data || [])
    } catch { } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchPosts() }, [fetchPosts])

  const openCreate = () => {
    setEditing(null)
    setForm(emptyForm)
    setCoverImage(null)
    setLocalPreview('')
    setModalOpen(true)
  }

  const openEdit = (post: BlogPost) => {
    setEditing(post)
    setForm({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      tags: post.tags.join(', '),
      author: post.author,
      seoTitle: post.seoTitle || '',
      seoDescription: post.seoDescription || '',
      status: post.status,
    })
    setCoverImage(null)
    setLocalPreview('')
    setModalOpen(true)
  }

  const handleSave = async () => {
    if (!form.title || !form.content) {
      setToast({ message: 'Title and content are required', variant: 'error' })
      return
    }
    setSaving(true)
    try {
      const fd = new FormData()
      fd.append('title', form.title)
      fd.append('slug', slugify(form.title))
      fd.append('excerpt', form.excerpt)
      fd.append('content', form.content)
      fd.append('category', form.category)
      fd.append('tags', form.tags)
      fd.append('author', form.author)
      fd.append('seoTitle', form.seoTitle)
      fd.append('seoDescription', form.seoDescription)
      fd.append('status', form.status)
      if (coverImage) fd.append('coverImage', coverImage)

      if (editing) {
        await blogApi.update(editing._id, fd)
        setToast({ message: 'Post updated', variant: 'success' })
      } else {
        await blogApi.create(fd)
        setToast({ message: 'Post created', variant: 'success' })
      }
      setModalOpen(false)
      fetchPosts()
    } catch (err: any) {
      setToast({ message: err?.response?.data?.message || 'Failed to save', variant: 'error' })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this post?')) return
    setDeleting(id)
    try {
      await blogApi.delete(id)
      setToast({ message: 'Post deleted', variant: 'success' })
      fetchPosts()
    } catch {
      setToast({ message: 'Failed to delete', variant: 'error' })
    } finally {
      setDeleting(null)
    }
  }

  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <Helmet>
        <title>Blog | Soyiri Labs Admin</title>
      </Helmet>

      {toast && (
        <div className="fixed top-4 right-4 z-[100] max-w-sm w-full">
          <Toast variant={toast.variant} message={toast.message} onClose={() => setToast(null)} />
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-text">Blog Posts</h1>
          <p className="text-sm text-text-secondary mt-1">Manage your blog content</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-48 h-10 pl-9 pr-3 rounded-xl bg-glass-light border border-border text-text text-sm placeholder:text-text-muted focus:outline-none focus:border-accent/50"
            />
          </div>
          <Button onClick={openCreate}><Plus className="h-4 w-4" /> New Post</Button>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-20 rounded-xl" />)}
        </div>
      ) : filtered.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-text-muted mb-4">{search ? 'No posts match your search' : 'No posts yet'}</p>
          {!search && <Button onClick={openCreate}><Plus className="h-4 w-4" /> New Post</Button>}
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((post, i) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <Card className="flex items-center gap-4 p-4">
                <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-glass-light">
                  {post.coverImage ? (
                    <img src={getImageUrl(post.coverImage)} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-text-muted text-xs">No img</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium text-text truncate">{post.title}</span>
                    <span className={cn(
                      'text-[11px] font-medium px-2 py-0.5 rounded-full border',
                      post.status === 'published'
                        ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20'
                        : 'text-amber-400 bg-amber-400/10 border-amber-400/20'
                    )}>
                      {post.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-text-muted">{post.category || 'Uncategorized'}</span>
                    <span className="text-xs text-text-muted">{formatDate(post.createdAt)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => openEdit(post)} className="p-2 rounded-lg text-text-muted hover:text-text hover:bg-glass-light transition-all">
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button onClick={() => handleDelete(post._id)} disabled={deleting === post._id} className="p-2 rounded-lg text-text-muted hover:text-error hover:bg-error/10 transition-all">
                    <Trash2 className={cn('h-4 w-4', deleting === post._id && 'animate-spin')} />
                  </button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {modalOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 z-50" onClick={() => setModalOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-4 md:inset-auto md:top-10 md:left-1/2 md:-translate-x-1/2 md:max-w-3xl w-full z-50 overflow-auto max-h-[calc(100vh-80px)] rounded-2xl"
            >
              <Card className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-text">{editing ? 'Edit Post' : 'New Post'}</h2>
                  <button onClick={() => setModalOpen(false)} className="p-2 rounded-lg text-text-muted hover:text-text hover:bg-glass-light transition-all">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-text-secondary">Title *</label>
                    <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full h-10 px-3 rounded-xl bg-glass-light border border-border text-text text-sm focus:outline-none focus:border-accent/50" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-text-secondary">Excerpt</label>
                    <textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} className="w-full px-3 py-2 rounded-xl bg-glass-light border border-border text-text text-sm focus:outline-none focus:border-accent/50 resize-none" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-text-secondary">Content *</label>
                    <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={12} className="w-full px-3 py-2 rounded-xl bg-glass-light border border-border text-text text-sm focus:outline-none focus:border-accent/50 resize-none font-mono" placeholder="Write your blog content here... Supports HTML/markdown" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-text-secondary">Category</label>
                    <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full h-10 px-3 rounded-xl bg-glass-light border border-border text-text text-sm focus:outline-none focus:border-accent/50" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-text-secondary">Tags (comma separated)</label>
                    <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} className="w-full h-10 px-3 rounded-xl bg-glass-light border border-border text-text text-sm focus:outline-none focus:border-accent/50" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-text-secondary">Author</label>
                    <input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className="w-full h-10 px-3 rounded-xl bg-glass-light border border-border text-text text-sm focus:outline-none focus:border-accent/50" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-text-secondary">Status</label>
                    <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as any })} className="w-full h-10 px-3 rounded-xl bg-glass-light border border-border text-text text-sm focus:outline-none focus:border-accent/50">
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-text-secondary">Cover Image</label>
                    <label className="flex items-center justify-center w-full h-20 rounded-xl border-2 border-dashed border-border bg-glass-light cursor-pointer hover:border-accent/50 transition-colors">
                      <div className="flex flex-col items-center gap-1">
                        <ImagePlus className="h-5 w-5 text-text-muted" />
                        <span className="text-xs text-text-muted">Click to upload</span>
                      </div>
                      <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) { setCoverImage(f); setLocalPreview(URL.createObjectURL(f)) } }} className="hidden" />
                    </label>
                    {(localPreview || (editing?.coverImage && !coverImage)) && (
                      <img src={localPreview || getImageUrl(editing!.coverImage)} alt="" className="mt-2 w-full h-32 object-cover rounded-xl" />
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <details className="group">
                      <summary className="text-sm font-medium text-text-secondary cursor-pointer hover:text-text transition-colors">SEO Settings</summary>
                      <div className="mt-3 grid gap-4 md:grid-cols-2">
                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-text-secondary">SEO Title</label>
                          <input value={form.seoTitle} onChange={(e) => setForm({ ...form, seoTitle: e.target.value })} className="w-full h-10 px-3 rounded-xl bg-glass-light border border-border text-text text-sm focus:outline-none focus:border-accent/50" />
                        </div>
                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-text-secondary">SEO Description</label>
                          <input value={form.seoDescription} onChange={(e) => setForm({ ...form, seoDescription: e.target.value })} className="w-full h-10 px-3 rounded-xl bg-glass-light border border-border text-text text-sm focus:outline-none focus:border-accent/50" />
                        </div>
                      </div>
                    </details>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border">
                  <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
                  <Button onClick={handleSave} loading={saving}>{editing ? 'Update' : 'Create'} Post</Button>
                </div>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
