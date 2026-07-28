import { useState, useEffect, useCallback } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus, Edit3, Trash2, X, ImagePlus, GripVertical,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Skeleton } from '@/components/ui/Skeleton'
import { Toast } from '@/components/ui/Toast'
import { servicesApi } from '@/lib/api'
import { cn, getImageUrl, slugify } from '@/lib/utils'
import type { Service } from '@/types'

interface FormData {
  title: string
  description: string
  longDescription: string
  icon: string
  features: string
  process: string
  price: string
  order: number
  seoTitle: string
  seoDescription: string
}

const emptyForm: FormData = {
  title: '', description: '', longDescription: '',
  icon: 'Code2', features: '', process: '', price: '',
  order: 0, seoTitle: '', seoDescription: '',
}

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Service | null>(null)
  const [form, setForm] = useState<FormData>(emptyForm)
  const [image, setImage] = useState<File | null>(null)
  const [localPreview, setLocalPreview] = useState('')
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [toast, setToast] = useState<{ message: string; variant: 'success' | 'error' } | null>(null)

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true)
      const { data } = await servicesApi.getAll()
      const list = data.data || data || []
      list.sort((a: Service, b: Service) => a.order - b.order)
      setServices(list)
    } catch { } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchServices() }, [fetchServices])

  const openCreate = () => {
    setEditing(null)
    setForm({ ...emptyForm, order: services.length })
    setImage(null)
    setLocalPreview('')
    setModalOpen(true)
  }

  const openEdit = (service: Service) => {
    setEditing(service)
    setForm({
      title: service.title,
      description: service.description,
      longDescription: service.longDescription || '',
      icon: service.icon,
      features: service.features.join(', '),
      process: JSON.stringify(service.process),
      price: service.price || '',
      order: service.order,
      seoTitle: service.seoTitle || '',
      seoDescription: service.seoDescription || '',
    })
    setImage(null)
    setLocalPreview('')
    setModalOpen(true)
  }

  const handleSave = async () => {
    if (!form.title || !form.description) {
      setToast({ message: 'Title and description are required', variant: 'error' })
      return
    }
    setSaving(true)
    try {
      const fd = new FormData()
      fd.append('title', form.title)
      fd.append('slug', slugify(form.title))
      fd.append('description', form.description)
      fd.append('longDescription', form.longDescription)
      fd.append('icon', form.icon)
      fd.append('features', form.features)
      fd.append('process', form.process)
      fd.append('price', form.price)
      fd.append('order', String(form.order))
      fd.append('seoTitle', form.seoTitle)
      fd.append('seoDescription', form.seoDescription)
      if (image) fd.append('image', image)

      if (editing) {
        await servicesApi.update(editing._id, fd)
        setToast({ message: 'Service updated', variant: 'success' })
      } else {
        await servicesApi.create(fd)
        setToast({ message: 'Service created', variant: 'success' })
      }
      setModalOpen(false)
      fetchServices()
    } catch (err: any) {
      setToast({ message: err?.response?.data?.message || 'Failed to save', variant: 'error' })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this service?')) return
    setDeleting(id)
    try {
      await servicesApi.delete(id)
      setToast({ message: 'Service deleted', variant: 'success' })
      fetchServices()
    } catch {
      setToast({ message: 'Failed to delete', variant: 'error' })
    } finally {
      setDeleting(null)
    }
  }

  const moveItem = (index: number, dir: -1 | 1) => {
    const newIndex = index + dir
    if (newIndex < 0 || newIndex >= services.length) return
    const list = [...services];
    [list[index], list[newIndex]] = [list[newIndex], list[index]]
    list.forEach((s, i) => { s.order = i })
    setServices(list)
  }

  return (
    <>
      <Helmet>
        <title>Services | Soyiri Labs Admin</title>
      </Helmet>

      {toast && (
        <div className="fixed top-4 right-4 z-[100] max-w-sm w-full">
          <Toast variant={toast.variant} message={toast.message} onClose={() => setToast(null)} />
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-text">Services</h1>
          <p className="text-sm text-text-secondary mt-1">Manage your service offerings</p>
        </div>
        <Button onClick={openCreate}><Plus className="h-4 w-4" /> Add Service</Button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-20 rounded-xl" />)}
        </div>
      ) : services.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-text-muted mb-4">No services yet</p>
          <Button onClick={openCreate}><Plus className="h-4 w-4" /> Add Service</Button>
        </Card>
      ) : (
        <div className="space-y-3">
          {services.map((service, index) => (
            <motion.div
              key={service._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
            >
              <Card className="flex items-center gap-4 p-4">
                <div className="flex flex-col gap-0.5 shrink-0">
                  <button onClick={() => moveItem(index, -1)} className="p-0.5 text-text-muted hover:text-text transition-colors">
                    <GripVertical className="h-3.5 w-3.5 rotate-90" />
                  </button>
                </div>
                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-glass-light flex items-center justify-center">
                  {service.image ? (
                    <img src={getImageUrl(service.image)} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-lg text-text-muted">{service.icon?.charAt(0) || 'S'}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-text truncate block">{service.title}</span>
                  <span className="text-xs text-text-muted block truncate mt-0.5">{service.description}</span>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => openEdit(service)} className="p-2 rounded-lg text-text-muted hover:text-text hover:bg-glass-light transition-all">
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button onClick={() => handleDelete(service._id)} disabled={deleting === service._id} className="p-2 rounded-lg text-text-muted hover:text-error hover:bg-error/10 transition-all">
                    <Trash2 className={cn('h-4 w-4', deleting === service._id && 'animate-spin')} />
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
              className="fixed inset-4 md:inset-auto md:top-10 md:left-1/2 md:-translate-x-1/2 md:max-w-2xl z-50 overflow-auto max-h-[calc(100vh-80px)] rounded-2xl"
            >
              <Card className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-text">{editing ? 'Edit Service' : 'Add Service'}</h2>
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
                    <label className="mb-1.5 block text-sm font-medium text-text-secondary">Description *</label>
                    <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} className="w-full px-3 py-2 rounded-xl bg-glass-light border border-border text-text text-sm focus:outline-none focus:border-accent/50 resize-none" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-text-secondary">Long Description</label>
                    <textarea value={form.longDescription} onChange={(e) => setForm({ ...form, longDescription: e.target.value })} rows={3} className="w-full px-3 py-2 rounded-xl bg-glass-light border border-border text-text text-sm focus:outline-none focus:border-accent/50 resize-none" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-text-secondary">Icon Name</label>
                    <input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className="w-full h-10 px-3 rounded-xl bg-glass-light border border-border text-text text-sm focus:outline-none focus:border-accent/50" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-text-secondary">Price</label>
                    <input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full h-10 px-3 rounded-xl bg-glass-light border border-border text-text text-sm focus:outline-none focus:border-accent/50" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-text-secondary">Order</label>
                    <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} className="w-full h-10 px-3 rounded-xl bg-glass-light border border-border text-text text-sm focus:outline-none focus:border-accent/50" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-text-secondary">Features (comma separated)</label>
                    <input value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} className="w-full h-10 px-3 rounded-xl bg-glass-light border border-border text-text text-sm focus:outline-none focus:border-accent/50" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-text-secondary">Process (JSON array of {`{title, description, duration?}`})</label>
                    <textarea value={form.process} onChange={(e) => setForm({ ...form, process: e.target.value })} rows={3} className="w-full px-3 py-2 rounded-xl bg-glass-light border border-border text-text text-sm focus:outline-none focus:border-accent/50 resize-none font-mono text-xs" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-text-secondary">Image</label>
                    <label className="flex items-center justify-center w-full h-20 rounded-xl border-2 border-dashed border-border bg-glass-light cursor-pointer hover:border-accent/50 transition-colors">
                      <div className="flex flex-col items-center gap-1">
                        <ImagePlus className="h-5 w-5 text-text-muted" />
                        <span className="text-xs text-text-muted">Click to upload</span>
                      </div>
                      <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) { setImage(f); setLocalPreview(URL.createObjectURL(f)) } }} className="hidden" />
                    </label>
                    {(localPreview || (editing?.image && !image)) && (
                      <img src={localPreview || getImageUrl(editing!.image!)} alt="" className="mt-2 w-full h-28 object-cover rounded-xl" />
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
                  <Button onClick={handleSave} loading={saving}>{editing ? 'Update' : 'Create'} Service</Button>
                </div>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
