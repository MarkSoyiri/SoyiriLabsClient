import { useState, useEffect, useCallback } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import {
  Save, ImagePlus, Plus, X, Building2, Home, Link2,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Skeleton } from '@/components/ui/Skeleton'
import { Toast } from '@/components/ui/Toast'
import { homepageApi, companyApi } from '@/lib/api'
import { cn, getImageUrl } from '@/lib/utils'
import type { HomepageContent, CompanyInfo, Stat, SocialLink, Value } from '@/types'

export default function AdminSettings() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ message: string; variant: 'success' | 'error' } | null>(null)
  const [activeTab, setActiveTab] = useState<'homepage' | 'company'>('homepage')

  const [homepage, setHomepage] = useState<HomepageContent | null>(null)
  const [company, setCompany] = useState<CompanyInfo | null>(null)

  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState('')
  const [faviconFile, setFaviconFile] = useState<File | null>(null)
  const [faviconPreview, setFaviconPreview] = useState('')

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const [hpRes, coRes] = await Promise.all([homepageApi.get(), companyApi.get()])
      setHomepage(hpRes.data.data || hpRes.data || null)
      setCompany(coRes.data.data || coRes.data || null)
    } catch { } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  const handleSaveHomepage = async () => {
    setSaving(true)
    try {
      await homepageApi.update(homepage as unknown as Record<string, unknown>)
      setToast({ message: 'Homepage updated successfully', variant: 'success' })
    } catch (err: any) {
      setToast({ message: err?.response?.data?.message || 'Failed to save', variant: 'error' })
    } finally {
      setSaving(false)
    }
  }

  const handleSaveCompany = async () => {
    if (!company) return
    setSaving(true)
    try {
      const fd = new FormData()
      fd.append('name', company.name)
      fd.append('tagline', company.tagline)
      fd.append('description', company.description)
      fd.append('mission', company.mission)
      fd.append('vision', company.vision)
      fd.append('email', company.email)
      fd.append('phone', company.phone)
      fd.append('address', company.address)
      fd.append('values', JSON.stringify(company.values))
      fd.append('socialLinks', JSON.stringify(company.socialLinks))
      if (logoFile) fd.append('logo', logoFile)
      if (faviconFile) fd.append('favicon', faviconFile)
      await companyApi.update(fd)
      setToast({ message: 'Company info updated', variant: 'success' })
      setLogoFile(null)
      setFaviconFile(null)
    } catch (err: any) {
      setToast({ message: err?.response?.data?.message || 'Failed to save', variant: 'error' })
    } finally {
      setSaving(false)
    }
  }

  const addStat = () => {
    if (!homepage) return
    setHomepage({ ...homepage, stats: [...homepage.stats, { label: '', value: 0, suffix: '' }] })
  }

  const updateStat = (index: number, field: keyof Stat, value: string | number) => {
    if (!homepage) return
    const stats = [...homepage.stats]
    stats[index] = { ...stats[index], [field]: value }
    setHomepage({ ...homepage, stats })
  }

  const removeStat = (index: number) => {
    if (!homepage) return
    setHomepage({ ...homepage, stats: homepage.stats.filter((_, i) => i !== index) })
  }

  const addValue = () => {
    if (!company) return
    setCompany({ ...company, values: [...company.values, { title: '', description: '', icon: 'Star' }] })
  }

  const updateValue = (index: number, field: keyof Value, value: string) => {
    if (!company) return
    const values = [...company.values]
    values[index] = { ...values[index], [field]: value }
    setCompany({ ...company, values })
  }

  const removeValue = (index: number) => {
    if (!company) return
    setCompany({ ...company, values: company.values.filter((_, i) => i !== index) })
  }

  const addSocial = () => {
    if (!company) return
    setCompany({ ...company, socialLinks: [...company.socialLinks, { platform: '', url: '', icon: 'Globe' }] })
  }

  const updateSocial = (index: number, field: keyof SocialLink, value: string) => {
    if (!company) return
    const socialLinks = [...company.socialLinks]
    socialLinks[index] = { ...socialLinks[index], [field]: value }
    setCompany({ ...company, socialLinks })
  }

  const removeSocial = (index: number) => {
    if (!company) return
    setCompany({ ...company, socialLinks: company.socialLinks.filter((_, i) => i !== index) })
  }

  if (loading) {
    return (
      <>
        <Helmet><title>Settings | Soyiri Labs Admin</title></Helmet>
        <div className="space-y-6">
          <Skeleton className="h-10 w-48 rounded-xl" />
          <Skeleton className="h-96 rounded-2xl" />
        </div>
      </>
    )
  }

  const tabs = [
    { id: 'homepage' as const, label: 'Homepage', icon: Home },
    { id: 'company' as const, label: 'Company Info', icon: Building2 },
  ]

  return (
    <>
      <Helmet><title>Settings | Soyiri Labs Admin</title></Helmet>

      {toast && (
        <div className="fixed top-4 right-4 z-[100] max-w-sm w-full">
          <Toast variant={toast.variant} message={toast.message} onClose={() => setToast(null)} />
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-ink">Settings</h1>
        <p className="text-sm text-ink-80 mt-1">Manage your site content and company information</p>
      </div>

      <div className="flex gap-2 flex-wrap mb-6 border-b border-hairline pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300',
              activeTab === tab.id
                ? 'bg-action/10 text-action border border-action/20'
                : 'text-ink-80 hover:text-ink hover:bg-pearl border border-transparent',
            )}
          >
            <tab.icon className="h-4 w-4 shrink-0" />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'homepage' && homepage && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <Card>
            <h2 className="text-lg font-semibold text-ink mb-6">Hero Section</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-ink-80">Hero Title</label>
                <input value={homepage.heroTitle || ''} onChange={(e) => setHomepage({ ...homepage, heroTitle: e.target.value })} className="w-full h-10 px-3 rounded-xl bg-pearl border border-hairline text-ink text-sm focus:outline-none focus:border-action/50" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-ink-80">Hero Subtitle</label>
                <input value={homepage.heroSubtitle || ''} onChange={(e) => setHomepage({ ...homepage, heroSubtitle: e.target.value })} className="w-full h-10 px-3 rounded-xl bg-pearl border border-hairline text-ink text-sm focus:outline-none focus:border-action/50" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-ink-80">Hero Description</label>
                <textarea value={homepage.heroDescription || ''} onChange={(e) => setHomepage({ ...homepage, heroDescription: e.target.value })} rows={3} className="w-full px-3 py-2 rounded-xl bg-pearl border border-hairline text-ink text-sm focus:outline-none focus:border-action/50 resize-none" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-ink">Stats</h2>
              <Button variant="secondary" size="sm" onClick={addStat}>
                <Plus className="h-4 w-4 shrink-0" /> Add Stat
              </Button>
            </div>
            <div className="space-y-4">
              {homepage.stats?.map((stat, i) => (
                <div key={i} className="flex items-center gap-3 flex-wrap">
                  <input value={stat.label} onChange={(e) => updateStat(i, 'label', e.target.value)} placeholder="Label" className="flex-1 h-10 px-3 rounded-xl bg-pearl border border-hairline text-ink text-sm focus:outline-none focus:border-action/50 min-w-[120px]" />
                  <input type="number" value={stat.value} onChange={(e) => updateStat(i, 'value', Number(e.target.value))} placeholder="Value" className="w-24 h-10 px-3 rounded-xl bg-pearl border border-hairline text-ink text-sm focus:outline-none focus:border-action/50" />
                  <input value={stat.suffix || ''} onChange={(e) => updateStat(i, 'suffix', e.target.value)} placeholder="suffix" className="w-20 h-10 px-3 rounded-xl bg-pearl border border-hairline text-ink text-sm focus:outline-none focus:border-action/50" />
                  <button onClick={() => removeStat(i)} className="p-2 rounded-lg text-ink-48 hover:text-error hover:bg-error/10 transition-all">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="text-lg font-semibold text-ink mb-6">About & CTA</h2>
            <div className="grid gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink-80">About Text</label>
                <textarea value={homepage.aboutText || ''} onChange={(e) => setHomepage({ ...homepage, aboutText: e.target.value })} rows={3} className="w-full px-3 py-2 rounded-xl bg-pearl border border-hairline text-ink text-sm focus:outline-none focus:border-action/50 resize-none" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink-80">CTA Title</label>
                <input value={homepage.ctaTitle || ''} onChange={(e) => setHomepage({ ...homepage, ctaTitle: e.target.value })} className="w-full h-10 px-3 rounded-xl bg-pearl border border-hairline text-ink text-sm focus:outline-none focus:border-action/50" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink-80">CTA Description</label>
                <textarea value={homepage.ctaDescription || ''} onChange={(e) => setHomepage({ ...homepage, ctaDescription: e.target.value })} rows={2} className="w-full px-3 py-2 rounded-xl bg-pearl border border-hairline text-ink text-sm focus:outline-none focus:border-action/50 resize-none" />
              </div>
            </div>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleSaveHomepage} loading={saving}>
              <Save className="h-4 w-4 shrink-0" /> Save Homepage
            </Button>
          </div>
        </motion.div>
      )}

      {activeTab === 'company' && company && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <Card>
            <h2 className="text-lg font-semibold text-ink mb-6">Branding</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink-80">Company Name</label>
                <input value={company.name || ''} onChange={(e) => setCompany({ ...company, name: e.target.value })} className="w-full h-10 px-3 rounded-xl bg-pearl border border-hairline text-ink text-sm focus:outline-none focus:border-action/50" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink-80">Tagline</label>
                <input value={company.tagline || ''} onChange={(e) => setCompany({ ...company, tagline: e.target.value })} className="w-full h-10 px-3 rounded-xl bg-pearl border border-hairline text-ink text-sm focus:outline-none focus:border-action/50" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-ink-80">Description</label>
                <textarea value={company.description || ''} onChange={(e) => setCompany({ ...company, description: e.target.value })} rows={3} className="w-full px-3 py-2 rounded-xl bg-pearl border border-hairline text-ink text-sm focus:outline-none focus:border-action/50 resize-none" />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 mt-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink-80">Logo</label>
                <label className="flex items-center justify-center w-full h-20 rounded-xl border-2 border-dashed border-hairline bg-pearl cursor-pointer hover:border-action/50 transition-colors">
                  <div className="flex flex-col items-center gap-1">
                    <ImagePlus className="h-5 w-5 text-ink-48" />
                    <span className="text-xs text-ink-48">Upload logo</span>
                  </div>
                  <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) { setLogoFile(f); setLogoPreview(URL.createObjectURL(f)) } }} className="hidden" />
                </label>
                {(logoPreview || company.logo) && (
                  <img src={logoPreview || getImageUrl(company.logo)} alt="Logo" className="mt-2 h-16 max-w-full object-contain rounded-xl bg-pearl p-2" />
                )}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink-80">Favicon</label>
                <label className="flex items-center justify-center w-full h-20 rounded-xl border-2 border-dashed border-hairline bg-pearl cursor-pointer hover:border-action/50 transition-colors">
                  <div className="flex flex-col items-center gap-1">
                    <ImagePlus className="h-5 w-5 text-ink-48" />
                    <span className="text-xs text-ink-48">Upload favicon</span>
                  </div>
                  <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) { setFaviconFile(f); setFaviconPreview(URL.createObjectURL(f)) } }} className="hidden" />
                </label>
                {(faviconPreview || company.favicon) && (
                  <img src={faviconPreview || getImageUrl(company.favicon)} alt="Favicon" className="mt-2 h-12 w-12 object-contain rounded-xl bg-pearl p-1" />
                )}
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-lg font-semibold text-ink mb-6">Mission & Vision</h2>
            <div className="grid gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink-80">Mission</label>
                <textarea value={company.mission || ''} onChange={(e) => setCompany({ ...company, mission: e.target.value })} rows={3} className="w-full px-3 py-2 rounded-xl bg-pearl border border-hairline text-ink text-sm focus:outline-none focus:border-action/50 resize-none" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink-80">Vision</label>
                <textarea value={company.vision || ''} onChange={(e) => setCompany({ ...company, vision: e.target.value })} rows={3} className="w-full px-3 py-2 rounded-xl bg-pearl border border-hairline text-ink text-sm focus:outline-none focus:border-action/50 resize-none" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-ink">Values</h2>
              <Button variant="secondary" size="sm" onClick={addValue}>
                <Plus className="h-4 w-4 shrink-0" /> Add Value
              </Button>
            </div>
            <div className="space-y-4">
              {company.values?.map((value, i) => (
                <div key={i} className="p-4 rounded-xl bg-pearl border border-hairline">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-ink">Value #{i + 1}</span>
                    <button onClick={() => removeValue(i)} className="p-1 rounded-lg text-ink-48 hover:text-error transition-all">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="grid gap-3 md:grid-cols-3">
                    <input value={value.title} onChange={(e) => updateValue(i, 'title', e.target.value)} placeholder="Title" className="w-full h-10 px-3 rounded-xl bg-pearl border border-hairline text-ink text-sm focus:outline-none focus:border-action/50" />
                    <input value={value.description} onChange={(e) => updateValue(i, 'description', e.target.value)} placeholder="Description" className="w-full h-10 px-3 rounded-xl bg-pearl border border-hairline text-ink text-sm focus:outline-none focus:border-action/50" />
                    <input value={value.icon} onChange={(e) => updateValue(i, 'icon', e.target.value)} placeholder="Icon name" className="w-full h-10 px-3 rounded-xl bg-pearl border border-hairline text-ink text-sm focus:outline-none focus:border-action/50" />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-ink">Social Links</h2>
              <Button variant="secondary" size="sm" onClick={addSocial}>
                <Plus className="h-4 w-4 shrink-0" /> Add Link
              </Button>
            </div>
            <div className="space-y-4">
              {company.socialLinks?.map((link, i) => (
                <div key={i} className="flex items-center gap-3 flex-wrap">
                  <Link2 className="h-4 w-4 text-ink-48 shrink-0" />
                  <input value={link.platform} onChange={(e) => updateSocial(i, 'platform', e.target.value)} placeholder="Platform (e.g. Twitter)" className="flex-[2] h-10 px-3 rounded-xl bg-pearl border border-hairline text-ink text-sm focus:outline-none focus:border-action/50 min-w-[120px]" />
                  <input value={link.url} onChange={(e) => updateSocial(i, 'url', e.target.value)} placeholder="URL" className="flex-[3] h-10 px-3 rounded-xl bg-pearl border border-hairline text-ink text-sm focus:outline-none focus:border-action/50 min-w-[160px]" />
                  <input value={link.icon} onChange={(e) => updateSocial(i, 'icon', e.target.value)} placeholder="Icon" className="w-20 h-10 px-3 rounded-xl bg-pearl border border-hairline text-ink text-sm focus:outline-none focus:border-action/50" />
                  <button onClick={() => removeSocial(i)} className="p-2 rounded-lg text-ink-48 hover:text-error hover:bg-error/10 transition-all">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="text-lg font-semibold text-ink mb-6">Contact Information</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink-80">Email</label>
                <input value={company.email || ''} onChange={(e) => setCompany({ ...company, email: e.target.value })} className="w-full h-10 px-3 rounded-xl bg-pearl border border-hairline text-ink text-sm focus:outline-none focus:border-action/50" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink-80">Phone</label>
                <input value={company.phone || ''} onChange={(e) => setCompany({ ...company, phone: e.target.value })} className="w-full h-10 px-3 rounded-xl bg-pearl border border-hairline text-ink text-sm focus:outline-none focus:border-action/50" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink-80">Address</label>
                <input value={company.address || ''} onChange={(e) => setCompany({ ...company, address: e.target.value })} className="w-full h-10 px-3 rounded-xl bg-pearl border border-hairline text-ink text-sm focus:outline-none focus:border-action/50" />
              </div>
            </div>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleSaveCompany} loading={saving}>
              <Save className="h-4 w-4 shrink-0" /> Save Company Info
            </Button>
          </div>
        </motion.div>
      )}
    </>
  )
}
