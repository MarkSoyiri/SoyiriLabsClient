import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Search, ArrowUpRight, Filter, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Skeleton } from '@/components/ui/Skeleton'
import Reveal from '@/components/animations/Reveal'
import ParallaxTilt from '@/components/animations/ParallaxTilt'
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

const thumbnailGradients = [
  'from-[#2a2347] via-[#211c3c] to-[#14101f]',
  'from-[#26304a] via-[#1d2438] to-[#11141f]',
  'from-[#2a2a38] via-[#202030] to-[#131319]',
  'from-[#332b1f] via-[#262019] to-[#17130e]',
  'from-[#1f2e3f] via-[#182230] to-[#0f151d]',
  'from-[#2f2330] via-[#241b26] to-[#141114]',
]

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

      <section className="relative overflow-hidden pt-24 pb-16 md:pt-40 md:pb-20">
        <div className="container-premium px-4">
          <SectionHeading
            label="Our Work"
            title="Our Portfolio"
            description="Showcasing innovative solutions we've built for clients across industries. Each project represents a unique challenge and a tailored solution."
          />
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-premium">
          <div className="glass rounded-2xl p-4 md:p-6 mb-10">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                  <input
                    type="text"
                    placeholder="Search projects by name, description, or technology..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full h-12 pl-11 pr-4 glass rounded-xl text-text placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors"
                  />
                </div>
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
                    <div className="flex flex-col md:flex-row md:flex-wrap gap-4 md:gap-6 pt-4 border-t border-border">
                      <div className="w-full md:w-auto">
                        <span className="block text-xs text-text-muted mb-2 font-medium uppercase tracking-wider">Industry</span>
                        <div className="flex flex-wrap gap-2">
                          {industries.map((i) => (
                            <button
                              key={i}
                              onClick={() => setFilters((f) => ({ ...f, industry: i }))}
                              className={cn(
                                'px-3 py-1.5 rounded-lg text-sm transition-all duration-200',
                                filters.industry === i
                                  ? 'bg-accent text-white shadow-lg shadow-accent/25'
                                  : 'glass text-text-secondary hover:text-text hover:bg-glass-light',
                              )}
                            >
                              {i}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="w-full md:w-auto">
                        <span className="block text-xs text-text-muted mb-2 font-medium uppercase tracking-wider">Technology</span>
                        <div className="flex flex-wrap gap-2">
                          {technologies.map((t) => (
                            <button
                              key={t}
                              onClick={() => setFilters((f) => ({ ...f, technology: t }))}
                              className={cn(
                                'px-3 py-1.5 rounded-lg text-sm transition-all duration-200',
                                filters.technology === t
                                  ? 'bg-accent text-white shadow-lg shadow-accent/25'
                                  : 'glass text-text-secondary hover:text-text hover:bg-glass-light',
                              )}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="w-full md:w-auto">
                        <span className="block text-xs text-text-muted mb-2 font-medium uppercase tracking-wider">Year</span>
                        <div className="flex flex-wrap gap-2">
                          {years.map((y) => (
                            <button
                              key={y}
                              onClick={() => setFilters((f) => ({ ...f, year: y }))}
                              className={cn(
                                'px-3 py-1.5 rounded-lg text-sm transition-all duration-200',
                                filters.year === y
                                  ? 'bg-accent text-white shadow-lg shadow-accent/25'
                                  : 'glass text-text-secondary hover:text-text hover:bg-glass-light',
                              )}
                            >
                              {y}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {hasActiveFilters && (
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <span>{filtered.length} project{filtered.length !== 1 ? 's' : ''} found</span>
                  <button onClick={clearFilters} className="flex items-center gap-1 text-accent hover:text-accent-light transition-colors">
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
                <div key={i} className="glass rounded-2xl overflow-hidden">
                  <Skeleton className="h-48 rounded-none" />
                  <div className="p-6 space-y-3">
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
            <div className="text-center py-20">
              <p className="text-text-secondary text-lg mb-4">{error}</p>
              <Button variant="primary" onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full glass flex items-center justify-center">
                <Search className="h-8 w-8 text-text-muted" />
              </div>
              <h3 className="text-xl font-semibold text-text mb-2">No projects found</h3>
              <p className="text-text-secondary mb-6">Try adjusting your search or filters to find what you're looking for.</p>
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
                      <ParallaxTilt intensity={10}>
                        <Link to={`/portfolio/${project.slug}`} className="block group">
                          <div className="glass rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-accent/10 hover:border-accent/30 group">
                            <div className={cn(
                              'relative h-48 overflow-hidden',
                              project.thumbnail ? '' : 'bg-gradient-to-br flex items-center justify-center',
                              !project.thumbnail && thumbnailGradients[index % thumbnailGradients.length],
                            )}>
                              {project.thumbnail ? (
                                <img
                                  src={project.thumbnail}
                                  alt={project.title}
                                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                />
                              ) : (
                                <span className="text-white/30 text-6xl font-black tracking-tight select-none">
                                  {project.title.charAt(0)}
                                </span>
                              )}
                              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                <div className="glass-light rounded-full p-2">
                                  <ArrowUpRight className="h-4 w-4 text-accent" />
                                </div>
                              </div>
                              {project.featured && (
                                <div className="absolute top-4 left-4">
                                  <span className="glass text-xs font-medium text-accent-light px-2.5 py-1 rounded-full">
                                    Featured
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="p-6">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-xs text-text-muted font-mono">{project.completionYear}</span>
                                <span className="text-text-muted">·</span>
                                <span className="text-xs text-text-muted">{project.industry}</span>
                              </div>
                              <h3 className="text-lg font-semibold text-text mb-2 group-hover:text-accent transition-colors">
                                {project.title}
                              </h3>
                              <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-2">
                                {project.description}
                              </p>
                              <div className="flex flex-wrap gap-1.5">
                                {project.technologies.slice(0, 4).map((tech) => (
                                  <span
                                    key={tech}
                                    className="text-xs px-2.5 py-1 rounded-full glass text-text-muted"
                                  >
                                    {tech}
                                  </span>
                                ))}
                                {project.technologies.length > 4 && (
                                  <span className="text-xs px-2.5 py-1 rounded-full glass text-text-muted">
                                    +{project.technologies.length - 4}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </ParallaxTilt>
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
