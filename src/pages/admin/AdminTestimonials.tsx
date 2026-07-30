import { useState, useEffect, useCallback } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus, Edit3, Trash2, X, ImagePlus, Star,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Skeleton } from '@/components/ui/Skeleton'
import { Toast } from '@/components/ui/Toast'
import { testimonialsApi } from '@/lib/api'
import { cn, formatDate, getImageUrl } from '@/lib/utils'
import type { Testimonial } from '@/types'

interface FormData {
  name: string
  company: string
  position: string
  rating: number
  review: string
  featured: boolean
}

const emptyForm: FormData = {
  name: '', company: '', position: '',
  rating: 5, review: '', featured: false,
}

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Testimonial | null>(null)
  const [form, setForm] = useState<FormData>(emptyForm)
  const [photo, setPhoto] = useState<File | null>(null)
  const [localPreview, setLocalPreview] = useState('')
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [toast, setToast] = useState<{ message: string; variant: 'success' | 'error' } | null>(null)

  const fetchTestimonials = useCallback(async () => {
    try {
      setLoading(true)
      const { data } = await testimonialsApi.getAll()
      setTestimonials(data.data || data || [])
    } catch { } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchTestimonials() }, [fetchTestimonials])

  const openCreate = () => {
    setEditing(null)
    setForm(emptyForm)
    setPhoto(null)
    setLocalPreview('')
    setModalOpen(true)
  }

  const openEdit = (t: Testimonial) => {
    setEditing(t)
    setForm({ name: t.name, company: t.company, position: t.position, rating: t.rating, review: t.review, featured: t.featured })
    setPhoto(null)
    setLocalPreview('')
    setModalOpen(true)
  }

  const handleSave = async () => {
    if (!form.name || !form.review) {
      setToast({ message: 'Name and review are required', variant: 'error' })
      return
    }
    setSaving(true)
    try {
      const fd = new FormData()
      fd.append('name', form.name)
      fd.append('company', form.company)
      fd.append('position', form.position)
      fd.append('rating', String(form.rating))
      fd.append('review', form.review)
      fd.append('featured', String(form.featured))
      if (photo) fd.append('photo', photo)

      if (editing) {
        await testimonialsApi.update(editing._id, fd)
        setToast({ message: 'Testimonial updated', variant: 'success' })
      } else {
        await testimonialsApi.create(fd)
        setToast({ message: 'Testimonial created', variant: 'success' })
      }
      setModalOpen(false)
      fetchTestimonials()
    } catch (err: any) {
      setToast({ message: err?.response?.data?.message || 'Failed to save', variant: 'error' })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this testimonial?')) return
    setDeleting(id)
    try {
      await testimonialsApi.delete(id)
      setToast({ message: 'Testimonial deleted', variant: 'success' })
      fetchTestimonials()
    } catch {
      setToast({ message: 'Failed to delete', variant: 'error' })
    } finally {
      setDeleting(null)
    }
  }

  const toggleFeatured = async (t: Testimonial) => {
    try {
      const fd = new FormData()
      fd.append('name', t.name)
      fd.append('company', t.company)
      fd.append('position', t.position)
      fd.append('rating', String(t.rating))
      fd.append('review', t.review)
      fd.append('featured', String(!t.featured))
      await testimonialsApi.update(t._id, fd)
      fetchTestimonials()
    } catch { }
  }

  return (
    <>
      <Helmet>
        <title>Testimonials | Soyiri Labs Admin</title>
      </Helmet>

      {toast && (
        <div className="fixed top-4 right-4 z-[100] max-w-sm w-full">
          <Toast variant={toast.variant} message={toast.message} onClose={() => setToast(null)} />
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-text">Testimonials</h1>
          <p className="text-sm text-text-secondary mt-1">Manage client testimonials</p>
        </div>
        <Button onClick={openCreate}><Plus className="h-4 w-4 shrink-0" /> Add Testimonial</Button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)}
        </div>
      ) : testimonials.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-text-muted mb-4">No testimonials yet</p>
          <Button onClick={openCreate}><Plus className="h-4 w-4 shrink-0" /> Add Testimonial</Button>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <Card className={cn('h-full', t.featured && 'border-accent/30')}>
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 bg-glass-light flex items-center justify-center">
                    {t.photo ? (
                      <img src={getImageUrl(t.photo)} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xs font-bold text-text-muted">{t.name.charAt(0)}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-text block truncate">{t.name}</span>
                    <span className="text-xs text-text-muted block truncate">{t.position}{t.company ? `, ${t.company}` : ''}</span>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-2">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className={cn('h-3.5 w-3.5', j < t.rating ? 'fill-yellow-500 text-yellow-500' : 'text-text-muted')} />
                  ))}
                </div>
                <p className="text-xs text-text-secondary line-clamp-3 mb-3 leading-relaxed">&ldquo;{t.review}&rdquo;</p>
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <button
                    onClick={() => toggleFeatured(t)}
                    className={cn('text-xs font-medium px-2.5 py-1 rounded-full border transition-colors', t.featured ? 'text-accent border-accent/30 bg-accent/5' : 'text-text-muted border-border hover:border-accent/30')}
                  >
                    {t.featured ? 'Featured' : 'Set Featured'}
                  </button>
                  <div className="flex items-center gap-1">
                    <button onClick={() => openEdit(t)} className="p-1.5 rounded-lg text-text-muted hover:text-text hover:bg-glass-light transition-all">
                      <Edit3 className="h-3.5 w-3.5" />
                    </button>
                    <button onClick={() => handleDelete(t._id)} disabled={deleting === t._id} className="p-1.5 rounded-lg text-text-muted hover:text-error hover:bg-error/10 transition-all">
                      <Trash2 className={cn('h-3.5 w-3.5', deleting === t._id && 'animate-spin')} />
                    </button>
                  </div>
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
              className="fixed inset-4 md:inset-auto md:top-10 md:left-1/2 md:-translate-x-1/2 md:max-w-xl z-50 overflow-auto max-h-[calc(100vh-80px)] rounded-2xl"
            >
              <Card solid className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-text">{editing ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
                  <button onClick={() => setModalOpen(false)} className="p-2 rounded-lg text-text-muted hover:text-text hover:bg-glass-light transition-all">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-text-secondary">Name *</label>
                    <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full h-10 px-3 rounded-xl bg-glass-light border border-border text-text text-sm focus:outline-none focus:border-accent/50" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-text-secondary">Company</label>
                    <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="w-full h-10 px-3 rounded-xl bg-glass-light border border-border text-text text-sm focus:outline-none focus:border-accent/50" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-text-secondary">Position</label>
                    <input value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} className="w-full h-10 px-3 rounded-xl bg-glass-light border border-border text-text text-sm focus:outline-none focus:border-accent/50" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-text-secondary">Rating</label>
                    <div className="flex items-center gap-2 h-10">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button key={n} type="button" onClick={() => setForm({ ...form, rating: n })}>
                          <Star className={cn('h-6 w-6 transition-colors', n <= form.rating ? 'fill-yellow-500 text-yellow-500' : 'text-text-muted')} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-text-secondary">Review *</label>
                    <textarea value={form.review} onChange={(e) => setForm({ ...form, review: e.target.value })} rows={4} className="w-full px-3 py-2 rounded-xl bg-glass-light border border-border text-text text-sm focus:outline-none focus:border-accent/50 resize-none" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-text-secondary">Photo</label>
                    <label className="flex items-center justify-center w-full h-20 rounded-xl border-2 border-dashed border-border bg-glass-light cursor-pointer hover:border-accent/50 transition-colors">
                      <div className="flex flex-col items-center gap-1">
                        <ImagePlus className="h-5 w-5 text-text-muted" />
                        <span className="text-xs text-text-muted">Click to upload</span>
                      </div>
                      <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) { setPhoto(f); setLocalPreview(URL.createObjectURL(f)) } }} className="hidden" />
                    </label>
                    {(localPreview || (editing?.photo && !photo)) && (
                      <img src={localPreview || getImageUrl(editing!.photo)} alt="" className="mt-2 w-20 h-20 object-cover rounded-full mx-auto" />
                    )}
                  </div>
                  <div className="md:col-span-2 flex items-center gap-3">
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="sr-only peer" />
                      <div className="w-10 h-5 bg-glass-light rounded-full peer peer-checked:bg-accent after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5" />
                    </label>
                    <span className="text-sm text-text-secondary">Featured</span>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border">
                  <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
                  <Button onClick={handleSave} loading={saving}>{editing ? 'Update' : 'Create'} Testimonial</Button>
                </div>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
