import { useState, useEffect, useCallback } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus, Edit3, Trash2, X, ImagePlus, Check,
  ExternalLink, GripVertical, Search,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Skeleton } from '@/components/ui/Skeleton'
import { Toast } from '@/components/ui/Toast'
import { projectsApi } from '@/lib/api'
import { cn, getImageUrl, slugify, toArray } from '@/lib/utils'
import type { Project } from '@/types'

const statusColors: Record<string, string> = {
  completed: 'text-success bg-success/10 border-success/20',
  'in-progress': 'text-warning bg-warning/10 border-warning/20',
  maintenance: 'text-accent-light bg-accent/10 border-accent/20',
}

interface FormData {
  title: string
  description: string
  clientName: string
  industry: string
  technologies: string
  liveUrl: string
  githubUrl: string
  featured: boolean
  completionYear: number
  servicesProvided: string
  colorTheme: string
  status: 'completed' | 'in-progress' | 'maintenance'
  seoTitle: string
  seoDescription: string
  challenges: string
  solution: string
  results: string
}

const emptyForm: FormData = {
  title: '', description: '', clientName: '', industry: '',
  technologies: '', liveUrl: '', githubUrl: '', featured: false,
  completionYear: new Date().getFullYear(), servicesProvided: '',
  colorTheme: '#8b83ff', status: 'completed', seoTitle: '',
  seoDescription: '', challenges: '', solution: '', results: '',
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Project | null>(null)
  const [form, setForm] = useState<FormData>(emptyForm)
  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const [gallery, setGallery] = useState<File[]>([])
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [toast, setToast] = useState<{ message: string; variant: 'success' | 'error' } | null>(null)
  const [localThumbPreview, setLocalThumbPreview] = useState('')

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const { data } = await projectsApi.getAll()
      setProjects(data.data || data || [])
    } catch {
      setError('Failed to load projects')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchProjects() }, [fetchProjects])

  const openCreate = () => {
    setEditing(null)
    setForm(emptyForm)
    setThumbnail(null)
    setGallery([])
    setLocalThumbPreview('')
    setModalOpen(true)
  }

  const openEdit = (project: Project) => {
    setEditing(project)
    setForm({
      title: project.title,
      description: project.description,
      clientName: project.clientName,
      industry: project.industry,
      technologies: project.technologies.join(', '),
      liveUrl: project.liveUrl,
      githubUrl: project.githubUrl || '',
      featured: project.featured,
      completionYear: project.completionYear,
      servicesProvided: project.servicesProvided.join(', '),
      colorTheme: project.colorTheme || '#8b83ff',
      status: project.status,
      seoTitle: project.seoTitle || '',
      seoDescription: project.seoDescription || '',
      challenges: project.challenges || '',
      solution: project.solution || '',
      results: project.results || '',
    })
    setThumbnail(null)
    setGallery([])
    setLocalThumbPreview('')
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
      fd.append('clientName', form.clientName)
      fd.append('industry', form.industry)
      fd.append('technologies', toArray(form.technologies))
      fd.append('liveUrl', form.liveUrl)
      fd.append('githubUrl', form.githubUrl)
      fd.append('featured', String(form.featured))
      fd.append('completionYear', String(form.completionYear))
      fd.append('servicesProvided', toArray(form.servicesProvided))
      fd.append('colorTheme', form.colorTheme)
      fd.append('status', form.status)
      fd.append('seoTitle', form.seoTitle)
      fd.append('seoDescription', form.seoDescription)
      fd.append('challenges', form.challenges)
      fd.append('solution', form.solution)
      fd.append('results', form.results)
      if (thumbnail) fd.append('thumbnail', thumbnail)
      gallery.forEach((f) => fd.append('gallery', f))

      if (editing) {
        await projectsApi.update(editing._id, fd)
        setToast({ message: 'Project updated successfully', variant: 'success' })
      } else {
        await projectsApi.create(fd)
        setToast({ message: 'Project created successfully', variant: 'success' })
      }
      setModalOpen(false)
      fetchProjects()
    } catch (err: any) {
      setToast({ message: err?.response?.data?.message || 'Failed to save project', variant: 'error' })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return
    setDeleting(id)
    try {
      await projectsApi.delete(id)
      setToast({ message: 'Project deleted', variant: 'success' })
      fetchProjects()
    } catch {
      setToast({ message: 'Failed to delete project', variant: 'error' })
    } finally {
      setDeleting(null)
    }
  }

  const filtered = projects.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <Helmet>
        <title>Projects | Soyiri Labs Admin</title>
      </Helmet>

      {toast && (
        <div className="fixed top-4 right-4 z-[100] max-w-sm w-full">
          <Toast
            variant={toast.variant}
            message={toast.message}
            onClose={() => setToast(null)}
          />
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-text">Projects</h1>
          <p className="text-sm text-text-secondary mt-1">Manage your portfolio projects</p>
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
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4 shrink-0" /> Add Project
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-20 rounded-xl" />
          ))}
        </div>
      ) : error ? (
        <Card className="text-center py-12">
          <p className="text-text-secondary mb-4">{error}</p>
          <Button variant="secondary" onClick={fetchProjects}>Retry</Button>
        </Card>
      ) : filtered.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-text-muted mb-4">{search ? 'No projects match your search' : 'No projects yet'}</p>
          {!search && <Button onClick={openCreate}><Plus className="h-4 w-4 shrink-0" /> Add Project</Button>}
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((project, i) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <Card className="flex items-center gap-4 p-4">
                <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-glass-light">
                  {project.thumbnail ? (
                    <img src={getImageUrl(project.thumbnail)} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-text-muted text-xs">No img</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium text-text truncate">{project.title}</span>
                    {project.featured && <Check className="h-3.5 w-3.5 text-accent shrink-0" />}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={cn('text-[11px] font-medium px-2 py-0.5 rounded-full border', statusColors[project.status])}>
                      {project.status}
                    </span>
                    <span className="text-xs text-text-muted">{project.clientName}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => openEdit(project)}
                    className="p-2 rounded-lg text-text-muted hover:text-text hover:bg-glass-light transition-all"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    disabled={deleting === project._id}
                    className="p-2 rounded-lg text-text-muted hover:text-error hover:bg-error/10 transition-all"
                  >
                    <Trash2 className={cn('h-4 w-4', deleting === project._id && 'animate-spin')} />
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50"
              onClick={() => setModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-x-3 top-3 bottom-3 z-50 overflow-y-auto overscroll-contain rounded-2xl md:inset-auto md:top-10 md:left-1/2 md:-translate-x-1/2 md:max-w-3xl md:max-h-[calc(100dvh-80px)]"
            >
              <Card solid className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-text">{editing ? 'Edit Project' : 'Add Project'}</h2>
                  <button onClick={() => setModalOpen(false)} className="p-2 rounded-lg text-text-muted hover:text-text hover:bg-glass-light transition-all">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 min-w-0">
                  <div className="md:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-text-secondary">Title *</label>
                    <input
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      className="w-full h-10 px-3 rounded-xl bg-glass-light border border-border text-text text-sm focus:outline-none focus:border-accent/50"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-text-secondary">Description *</label>
                    <textarea
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 rounded-xl bg-glass-light border border-border text-text text-sm focus:outline-none focus:border-accent/50 resize-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-text-secondary">Client Name</label>
                    <input
                      value={form.clientName}
                      onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                      className="w-full h-10 px-3 rounded-xl bg-glass-light border border-border text-text text-sm focus:outline-none focus:border-accent/50"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-text-secondary">Industry</label>
                    <input
                      value={form.industry}
                      onChange={(e) => setForm({ ...form, industry: e.target.value })}
                      className="w-full h-10 px-3 rounded-xl bg-glass-light border border-border text-text text-sm focus:outline-none focus:border-accent/50"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-text-secondary">Technologies (comma separated)</label>
                    <input
                      value={form.technologies}
                      onChange={(e) => setForm({ ...form, technologies: e.target.value })}
                      className="w-full h-10 px-3 rounded-xl bg-glass-light border border-border text-text text-sm focus:outline-none focus:border-accent/50"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-text-secondary">Services Provided</label>
                    <input
                      value={form.servicesProvided}
                      onChange={(e) => setForm({ ...form, servicesProvided: e.target.value })}
                      className="w-full h-10 px-3 rounded-xl bg-glass-light border border-border text-text text-sm focus:outline-none focus:border-accent/50"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-text-secondary">Live URL</label>
                    <input
                      value={form.liveUrl}
                      onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                      className="w-full h-10 px-3 rounded-xl bg-glass-light border border-border text-text text-sm focus:outline-none focus:border-accent/50"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-text-secondary">GitHub URL</label>
                    <input
                      value={form.githubUrl}
                      onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                      className="w-full h-10 px-3 rounded-xl bg-glass-light border border-border text-text text-sm focus:outline-none focus:border-accent/50"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-text-secondary">Completion Year</label>
                    <input
                      type="number"
                      value={form.completionYear}
                      onChange={(e) => setForm({ ...form, completionYear: Number(e.target.value) })}
                      className="w-full h-10 px-3 rounded-xl bg-glass-light border border-border text-text text-sm focus:outline-none focus:border-accent/50"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-text-secondary">Status</label>
                    <select
                      value={form.status}
                      onChange={(e) => setForm({ ...form, status: e.target.value as any })}
                      className="w-full h-10 px-3 rounded-xl bg-glass-light border border-border text-text text-sm focus:outline-none focus:border-accent/50"
                    >
                      <option value="completed">Completed</option>
                      <option value="in-progress">In Progress</option>
                      <option value="maintenance">Maintenance</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-text-secondary">Color Theme</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={form.colorTheme}
                        onChange={(e) => setForm({ ...form, colorTheme: e.target.value })}
                        className="w-10 h-10 rounded-xl border border-border bg-transparent cursor-pointer"
                      />
                      <span className="text-xs text-text-muted">{form.colorTheme}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        checked={form.featured}
                        onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-10 h-5 bg-glass-light rounded-full peer peer-checked:bg-accent after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5" />
                    </label>
                    <span className="text-sm text-text-secondary">Featured</span>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-text-secondary">Thumbnail</label>
                    <label className="flex items-center justify-center w-full h-20 rounded-xl border-2 border-dashed border-border bg-glass-light cursor-pointer hover:border-accent/50 transition-colors">
                      <div className="flex flex-col items-center gap-1">
                        <ImagePlus className="h-5 w-5 text-text-muted" />
                        <span className="text-xs text-text-muted">Click to upload</span>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) { setThumbnail(file); setLocalThumbPreview(URL.createObjectURL(file)) }
                        }}
                        className="hidden"
                      />
                    </label>
                    {(localThumbPreview || (editing?.thumbnail && !thumbnail)) && (
                      <img src={localThumbPreview || getImageUrl(editing!.thumbnail)} alt="" className="mt-2 w-full h-24 object-cover rounded-xl" />
                    )}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-text-secondary">Gallery Images</label>
                    <label className="flex items-center justify-center w-full h-20 rounded-xl border-2 border-dashed border-border bg-glass-light cursor-pointer hover:border-accent/50 transition-colors">
                      <div className="flex flex-col items-center gap-1">
                        <ImagePlus className="h-5 w-5 text-text-muted" />
                        <span className="text-xs text-text-muted">{gallery.length > 0 ? `${gallery.length} selected` : 'Click to upload'}</span>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => setGallery(Array.from(e.target.files || []))}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div className="md:col-span-2">
                    <details className="group">
                      <summary className="text-sm font-medium text-text-secondary cursor-pointer hover:text-text transition-colors">SEO Settings</summary>
                      <div className="mt-3 grid gap-4 md:grid-cols-2">
                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-text-secondary">SEO Title</label>
                          <input
                            value={form.seoTitle}
                            onChange={(e) => setForm({ ...form, seoTitle: e.target.value })}
                            className="w-full h-10 px-3 rounded-xl bg-glass-light border border-border text-text text-sm focus:outline-none focus:border-accent/50"
                          />
                        </div>
                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-text-secondary">SEO Description</label>
                          <input
                            value={form.seoDescription}
                            onChange={(e) => setForm({ ...form, seoDescription: e.target.value })}
                            className="w-full h-10 px-3 rounded-xl bg-glass-light border border-border text-text text-sm focus:outline-none focus:border-accent/50"
                          />
                        </div>
                      </div>
                    </details>
                  </div>

                  <div className="md:col-span-2">
                    <details className="group">
                      <summary className="text-sm font-medium text-text-secondary cursor-pointer hover:text-text transition-colors">Case Study Details</summary>
                      <div className="mt-3 grid gap-4">
                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-text-secondary">Challenges</label>
                          <textarea value={form.challenges} onChange={(e) => setForm({ ...form, challenges: e.target.value })} rows={2} className="w-full px-3 py-2 rounded-xl bg-glass-light border border-border text-text text-sm focus:outline-none focus:border-accent/50 resize-none" />
                        </div>
                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-text-secondary">Solution</label>
                          <textarea value={form.solution} onChange={(e) => setForm({ ...form, solution: e.target.value })} rows={2} className="w-full px-3 py-2 rounded-xl bg-glass-light border border-border text-text text-sm focus:outline-none focus:border-accent/50 resize-none" />
                        </div>
                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-text-secondary">Results</label>
                          <textarea value={form.results} onChange={(e) => setForm({ ...form, results: e.target.value })} rows={2} className="w-full px-3 py-2 rounded-xl bg-glass-light border border-border text-text text-sm focus:outline-none focus:border-accent/50 resize-none" />
                        </div>
                      </div>
                    </details>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border">
                  <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
                  <Button onClick={handleSave} loading={saving}>
                    {editing ? 'Update' : 'Create'} Project
                  </Button>
                </div>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
