import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Search, ArrowUpRight, Filter, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Skeleton } from '@/components/ui/Skeleton'
import { Chip } from '@/components/ui/Chip'
import { SearchInput } from '@/components/ui/Input'
import Reveal from '@/components/animations/Reveal'
import { projectsApi } from '@/lib/api'
import { cn } from '@/lib/utils'
import type { Project } from '@/types'

import zestyThumb from '@/assets/zesty-cave-1.png'
import hydroThumb from '@/assets/hydromonitor-1.png'
import hydroV2Thumb from '@/assets/hydromonitor-v2-1.png'
import backendSpThumb from '@/assets/backend-sp-1.png'
import betguardThumb from '@/assets/betguard-1.png'

const DEMO_PROJECTS: Project[] = [
  {
    _id: '1',
    title: 'Zesty Cave',
    slug: 'zesty-cave',
    description: 'A modern online food ordering platform built for restaurants. Customers can browse menus, place orders, make secure payments, and track orders in real time. Includes a powerful admin dashboard for managing products, categories, customers, orders, payments, and business operations.',
    clientName: 'Zesty Cave',
    industry: 'Restaurant / E-Commerce',
    technologies: ['React', 'Express.js', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    thumbnail: zestyThumb,
    gallery: ['', '', ''],
    liveUrl: 'https://react-shop-project-bootstrap.vercel.app/',
    featured: true,
    completionYear: 2025,
    servicesProvided: ['Web Development', 'E-Commerce', 'Admin Dashboard'],
    colorTheme: '#e11d48',
    status: 'completed',
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-06-01T00:00:00Z',
  },
  {
    _id: '2',
    title: 'HydroMonitor',
    slug: 'hydromonitor',
    description: 'A complete smart water monitoring and billing platform designed for property managers and institutions. Provides real-time monitoring from ESP32 devices, tenant management, billing, analytics, leak detection, alerts, and administrative tools through a modern responsive dashboard.',
    clientName: 'HydroMonitor',
    industry: 'IoT / Smart Water Management',
    technologies: ['React', 'Express.js', 'Node.js', 'MongoDB', 'ESP32', 'Firebase'],
    thumbnail: hydroThumb,
    gallery: ['', '', ''],
    liveUrl: 'https://hydromonitor-web-app.vercel.app/',
    featured: true,
    completionYear: 2025,
    servicesProvided: ['Web Development', 'IoT Development', 'Dashboard Design'],
    colorTheme: '#0891b2',
    status: 'completed',
    createdAt: '2025-02-01T00:00:00Z',
    updatedAt: '2025-06-01T00:00:00Z',
  },
  {
    _id: '3',
    title: 'HydroMonitorV2 Backend',
    slug: 'hydromonitor-v2-backend',
    description: 'A robust backend infrastructure powering the next generation of smart water monitoring. Built with Node.js and Express, it handles real-time sensor data ingestion via MQTT, WebSocket-based live dashboards, tenant management, billing automation, and scalable API services for IoT ecosystems.',
    clientName: 'HydroMonitor',
    industry: 'IoT / Backend Infrastructure',
    technologies: ['Node.js', 'Express.js', 'MongoDB', 'MQTT', 'WebSockets', 'Docker'],
    thumbnail: hydroV2Thumb,
    gallery: ['', '', ''],
    liveUrl: 'https://hydromonitor-v2-backend.vercel.app/',
    featured: true,
    completionYear: 2025,
    servicesProvided: ['Backend Development', 'IoT Engineering', 'API Design'],
    colorTheme: '#0e7490',
    status: 'completed',
    createdAt: '2025-03-01T00:00:00Z',
    updatedAt: '2025-06-01T00:00:00Z',
  },
  {
    _id: '4',
    title: 'BackendSP',
    slug: 'backend-sp',
    description: 'A high-performance backend platform built with Node.js and TypeScript, featuring modular service architecture, real-time data processing, secure authentication, and scalable RESTful APIs for modern web applications and third-party integrations.',
    clientName: 'BackendSP',
    industry: 'Backend / API Development',
    technologies: ['Node.js', 'Express.js', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker'],
    thumbnail: backendSpThumb,
    gallery: ['', '', ''],
    liveUrl: 'https://express-js-on-vercel-liart-chi.vercel.app/',
    featured: true,
    completionYear: 2025,
    servicesProvided: ['Backend Development', 'API Design', 'DevOps'],
    colorTheme: '#7c3aed',
    status: 'completed',
    createdAt: '2025-04-01T00:00:00Z',
    updatedAt: '2025-06-01T00:00:00Z',
  },
  {
    _id: '5',
    title: 'BetGuard',
    slug: 'betguard',
    description: 'A responsible betting companion web app that helps users track spending, set budgets, log bets, and build healthier betting habits. Features spending analytics, smart budget alerts, an AI coach, savings goals, risk assessments, an education center, and a supportive community.',
    clientName: 'BetGuard',
    industry: 'Fintech / Responsible Gaming',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Recharts', 'Framer Motion', 'Vite'],
    thumbnail: betguardThumb,
    gallery: ['', '', ''],
    liveUrl: 'https://bet-guard-web-app-soyiri-labs-9yruqr0c5-mark-soyiris-projects.vercel.app/',
    githubUrl: 'https://github.com/MarkSoyiri/BetGuard-webApp-SoyiriLabs',
    featured: true,
    completionYear: 2026,
    servicesProvided: ['Web Development', 'Web Application', 'UI/UX Design'],
    colorTheme: '#1e3a8a',
    status: 'completed',
    createdAt: '2026-05-01T00:00:00Z',
    updatedAt: '2026-07-01T00:00:00Z',
  },
]

const industries = ['All', 'Restaurant / E-Commerce', 'IoT / Smart Water Management', 'IoT / Backend Infrastructure', 'Backend / API Development', 'Fintech / Responsible Gaming']
const technologies = ['All', 'React', 'Express.js', 'Node.js', 'MongoDB', 'Tailwind CSS', 'ESP32', 'Firebase', 'MQTT', 'WebSockets', 'Docker', 'TypeScript', 'PostgreSQL', 'Redis', 'Recharts', 'Framer Motion', 'Vite']
const years = ['All', '2025', '2026']

interface FilterState {
  industry: string
  technology: string
  year: string
}

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState<FilterState>({ industry: 'All', technology: 'All', year: 'All' })
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await projectsApi.getAll()
        setProjects(res.data.data)
      } catch {
        setProjects(DEMO_PROJECTS)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchSearch = !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.technologies.some((t) => t.toLowerCase().includes(search.toLowerCase()))
      const matchIndustry = filters.industry === 'All' || p.industry === filters.industry
      const matchTech = filters.technology === 'All' || p.technologies.includes(filters.technology)
      const matchYear = filters.year === 'All' || p.completionYear.toString() === filters.year
      return matchSearch && matchIndustry && matchTech && matchYear
    })
  }, [projects, search, filters])

  const clearFilters = () => {
    setFilters({ industry: 'All', technology: 'All', year: 'All' })
    setSearch('')
  }

  const hasActiveFilters = filters.industry !== 'All' || filters.technology !== 'All' || filters.year !== 'All' || search !== ''

  return (
    <>
      <Helmet>
        <title>Our Portfolio | Soyiri Labs</title>
        <meta name="description" content="Explore our portfolio of innovative projects spanning fintech, healthcare, e-commerce, and more." />
      </Helmet>

      <section className="tile-light relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 grid-bg" />
        <div className="pointer-events-none absolute -top-28 right-[-10%] h-[520px] w-[520px] blob-electric" />
        <div className="pointer-events-none absolute bottom-[-22%] left-[-10%] h-[480px] w-[480px] blob-magenta opacity-50" />
        <div className="relative container-site px-4 pb-24 pt-16 md:pb-32 md:pt-24">
          <SectionHeading
            label="Our Work"
            title={
              <>
                Work that <span className="text-serif-accent text-action">speaks for itself</span>
              </>
            }
            description="Showcasing innovative solutions we've built for clients across industries. Each project represents a unique challenge and a tailored solution."
          />
          <Reveal delay={0.4}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3.5">
              <Button href="/contact" size="lg">
                Start a Project
                <ArrowUpRight className="h-5 w-5 shrink-0" />
              </Button>
            </div>
          </Reveal>
        </div>

        <div className="pointer-events-none absolute bottom-1 left-1/2 hidden -translate-x-1/2 select-none whitespace-nowrap text-[10rem] font-bold uppercase leading-none tracking-tighter text-outline lg:block">
          Work
        </div>
      </section>

      <section className="tile-parchment tile">
        <div className="container-site px-4">
          <div className="mb-10 rounded-2xl border-2 border-ink bg-canvas p-4 shadow-hard-sm md:p-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <SearchInput
                  className="flex-1"
                  placeholder="Search projects by name, description, or technology..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button
                  variant="secondary"
                  size="md"
                  className="shrink-0"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4 shrink-0" />
                  <span className="hidden sm:inline">Filters</span>
                </Button>
              </div>

              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col gap-5 border-t border-hairline pt-5">
                      <div>
                        <span className="mb-2.5 block text-caption-strong uppercase tracking-wider text-ink-48">Industry</span>
                        <div className="flex flex-wrap gap-2">
                          {industries.map((i) => (
                            <Chip
                              key={i}
                              selected={filters.industry === i}
                              onClick={() => setFilters((f) => ({ ...f, industry: i }))}
                            >
                              {i}
                            </Chip>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="mb-2.5 block text-caption-strong uppercase tracking-wider text-ink-48">Technology</span>
                        <div className="flex flex-wrap gap-2">
                          {technologies.map((t) => (
                            <Chip
                              key={t}
                              selected={filters.technology === t}
                              onClick={() => setFilters((f) => ({ ...f, technology: t }))}
                            >
                              {t}
                            </Chip>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="mb-2.5 block text-caption-strong uppercase tracking-wider text-ink-48">Year</span>
                        <div className="flex flex-wrap gap-2">
                          {years.map((y) => (
                            <Chip
                              key={y}
                              selected={filters.year === y}
                              onClick={() => setFilters((f) => ({ ...f, year: y }))}
                            >
                              {y}
                            </Chip>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {hasActiveFilters && (
                <div className="flex items-center gap-2 text-sm text-ink-48">
                  <span>{filtered.length} project{filtered.length !== 1 ? 's' : ''} found</span>
                  <button onClick={clearFilters} className="flex items-center gap-1 text-action transition-colors hover:text-action-focus">
                    <X className="h-3 w-3" />
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </div>

          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="overflow-hidden rounded-2xl border border-white/10 bg-tile-2">
                  <Skeleton className="h-48 rounded-none" />
                  <div className="space-y-3 p-6">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    <div className="flex gap-2 pt-2">
                      <Skeleton className="h-6 w-16 rounded-full" />
                      <Skeleton className="h-6 w-20 rounded-full" />
                      <Skeleton className="h-6 w-14 rounded-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="py-20 text-center">
              <p className="mb-4 text-lg text-ink-80">{error}</p>
              <Button variant="primary" onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-ink bg-canvas shadow-hard-sm">
                <Search className="h-8 w-8 text-ink-48" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-ink">No projects found</h3>
              <p className="mb-6 text-ink-80">Try adjusting your search or filters to find what you're looking for.</p>
              <Button variant="primary" onClick={clearFilters}>Clear All Filters</Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {filtered.map((project, index) => (
                  <motion.div
                    key={project._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Reveal delay={index * 0.05}>
                      <Link to={`/portfolio/${project.slug}`} className="group block">
                        <div className="h-full overflow-hidden rounded-2xl border border-white/10 bg-tile-2 transition-colors duration-300 group-hover:border-white/25">
                          <div
                            className="relative flex h-48 items-center justify-center"
                            style={{ backgroundColor: `${project.colorTheme || '#4f46e5'}2e` }}
                          >
                            {project.thumbnail ? (
                              <img
                                src={project.thumbnail}
                                alt={project.title}
                                className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                              />
                            ) : (
                              <span className="select-none text-6xl font-semibold tracking-tight text-white/25">
                                {project.title.charAt(0)}
                              </span>
                            )}
                            <span className="absolute left-4 top-4 select-none font-display text-5xl font-bold text-white/10">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                            {project.featured && (
                              <div className="absolute right-4 top-4">
                                <span className="rounded-full bg-action px-2.5 py-1 text-xs font-semibold text-white">
                                  Featured
                                </span>
                              </div>
                            )}
                            <span className="absolute bottom-4 right-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-action text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                              <ArrowUpRight className="h-5 w-5" />
                            </span>
                          </div>
                          <div className="p-6">
                            <div className="mb-2 flex items-center gap-2 text-caption text-on-dark-muted">
                              <span>{project.completionYear}</span>
                              <span>·</span>
                              <span className="truncate">{project.industry}</span>
                            </div>
                            <h3 className="mb-2 text-lg font-semibold text-on-dark transition-colors group-hover:text-action-sky">
                              {project.title}
                            </h3>
                            <p className="mb-4 line-clamp-2 text-[15px] leading-relaxed text-on-dark-muted">
                              {project.description}
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {project.technologies.slice(0, 4).map((tech) => (
                                <span
                                  key={tech}
                                  className="rounded-lg border border-white/12 bg-white/10 px-2.5 py-1 text-xs text-on-dark-muted"
                                >
                                  {tech}
                                </span>
                              ))}
                              {project.technologies.length > 4 && (
                                <span className="rounded-lg border border-white/12 bg-white/10 px-2.5 py-1 text-xs text-on-dark-muted">
                                  +{project.technologies.length - 4}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </Reveal>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
