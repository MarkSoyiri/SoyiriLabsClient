import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { ArrowLeft, ExternalLink, Code2, Calendar, Building2, Lightbulb, Target, Trophy } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { GlassDivider } from '@/components/ui/GlassDivider'
import { Skeleton } from '@/components/ui/Skeleton'
import Reveal from '@/components/animations/Reveal'
import ParallaxTilt from '@/components/animations/ParallaxTilt'
import { projectsApi } from '@/lib/api'
import { cn, formatDate } from '@/lib/utils'
import type { Project } from '@/types'

import zestyThumb from '@/assets/zesty-cave-1.png'
import zestyGallery1 from '@/assets/zesty-cave-1.png'
import zestyGallery2 from '@/assets/zesty-cave-2.png'
import zestyGallery3 from '@/assets/zesty-cave-3.png'
import zestyGallery4 from '@/assets/zesty-cave-4.png'
import hydroThumb from '@/assets/hydromonitor-1.png'
import hydroGallery1 from '@/assets/hydromonitor-1.png'
import hydroGallery2 from '@/assets/hydromonitor-2.png'
import hydroGallery3 from '@/assets/hydromonitor-3.png'
import hydroGallery4 from '@/assets/hydromonitor-4.png'
import hydroV2Thumb from '@/assets/hydromonitor-v2-1.png'
import hydroV2Gallery1 from '@/assets/hydromonitor-v2-1.png'
import hydroV2Gallery2 from '@/assets/hydromonitor-v2-2.png'
import hydroV2Gallery3 from '@/assets/hydromonitor-v2-3.png'
import hydroV2Gallery4 from '@/assets/hydromonitor-v2-4.png'
import backendSpThumb from '@/assets/backend-sp-1.png'
import backendSpGallery1 from '@/assets/backend-sp-1.png'
import backendSpGallery2 from '@/assets/backend-sp-2.png'
import backendSpGallery3 from '@/assets/backend-sp-3.png'
import backendSpGallery4 from '@/assets/backend-sp-4.png'

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
    gallery: [zestyGallery1, zestyGallery2, zestyGallery3, zestyGallery4],
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
    gallery: [hydroGallery1, hydroGallery2, hydroGallery3, hydroGallery4],
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
    gallery: [hydroV2Gallery1, hydroV2Gallery2, hydroV2Gallery3, hydroV2Gallery4],
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
    gallery: [backendSpGallery1, backendSpGallery2, backendSpGallery3, backendSpGallery4],
    liveUrl: 'https://express-js-on-vercel-liart-chi.vercel.app/',
    featured: true,
    completionYear: 2025,
    servicesProvided: ['Backend Development', 'API Design', 'DevOps'],
    colorTheme: '#7c3aed',
    status: 'completed',
    createdAt: '2025-04-01T00:00:00Z',
    updatedAt: '2025-06-01T00:00:00Z',
  },
]

const gradientMap: Record<string, string> = {
  Fintech: 'from-accent to-purple-500',
  Healthcare: 'from-cyan-500 to-blue-600',
  Sustainability: 'from-green-500 to-emerald-600',
  'E-commerce': 'from-pink-500 to-rose-600',
  Blockchain: 'from-amber-500 to-orange-600',
  'Smart City': 'from-violet-500 to-indigo-600',
  Education: 'from-blue-500 to-cyan-600',
  Media: 'from-red-500 to-pink-600',
  'Restaurant / E-Commerce': 'from-rose-500 to-red-600',
  'IoT / Smart Water Management': 'from-cyan-600 to-blue-700',
  'IoT / Backend Infrastructure': 'from-cyan-700 to-teal-600',
  'Backend / API Development': 'from-violet-600 to-purple-700',
}

function ProjectSkeleton() {
  return (
    <div className="container-premium section-padding">
      <Skeleton className="h-6 w-32 mb-8" />
      <Skeleton className="h-64 w-full rounded-2xl mb-8" />
      <div className="space-y-4 max-w-3xl">
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  )
}

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [project, setProject] = useState<Project | null>(null)
  const [related, setRelated] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true)
      setError('')
      try {
        const res = await projectsApi.getBySlug(slug!)
        setProject(res.data.data)
      } catch {
        const found = DEMO_PROJECTS.find((p) => p.slug === slug)
        if (found) {
          setProject(found)
          setRelated(DEMO_PROJECTS.filter((p) => p.industry === found.industry && p.slug !== slug).slice(0, 3))
        } else {
          setError('Project not found')
        }
      } finally {
        setLoading(false)
      }
    }
    if (slug) fetchProject()
  }, [slug])

  if (loading) return <ProjectSkeleton />

  if (error || !project) {
    return (
      <div className="container-premium section-padding text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full glass flex items-center justify-center">
          <Target className="h-8 w-8 text-text-muted" />
        </div>
        <h2 className="text-2xl font-bold text-text mb-2">Project Not Found</h2>
        <p className="text-text-secondary mb-6">{error || 'The project you\'re looking for doesn\'t exist.'}</p>
        <Button variant="primary" href="/portfolio">
          <ArrowLeft className="h-4 w-4 shrink-0" />
          Back to Portfolio
        </Button>
      </div>
    )
  }

  const gradient = gradientMap[project.industry] || 'from-accent to-purple-500'

  return (
    <>
      <Helmet>
        <title>{project.seoTitle || `${project.title} | Soyiri Labs Portfolio`}</title>
        <meta name="description" content={project.seoDescription || project.description} />
      </Helmet>

      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
        <div className={cn('absolute inset-0 bg-gradient-to-br opacity-5 pointer-events-none', gradient)} />
        <div className="container-premium section-padding pt-0 pb-0">
          <Reveal>
            <Link to="/portfolio" className="inline-flex items-center gap-2 text-text-muted hover:text-accent transition-colors mb-8">
              <ArrowLeft className="h-4 w-4 shrink-0" />
              <span className="text-sm font-medium">Back to Portfolio</span>
            </Link>
          </Reveal>
          <div className="grid lg:grid-cols-3 gap-10 items-start">
            <div className="lg:col-span-2">
              <Reveal delay={0.1}>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className={cn(
                    'text-xs font-medium px-3 py-1 rounded-full glass text-accent-light',
                    project.status === 'completed' && 'text-success',
                    project.status === 'in-progress' && 'text-warning',
                    project.status === 'maintenance' && 'text-accent',
                  )}>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </span>
                  <span className="text-xs text-text-muted">{project.industry}</span>
                  <span className="text-xs text-text-muted">·</span>
                  <span className="text-xs text-text-muted">{project.completionYear}</span>
                </div>
              </Reveal>
              <Reveal delay={0.15}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text mb-4">
                  {project.title}
                </h1>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-lg text-text-secondary leading-relaxed">{project.description}</p>
              </Reveal>
            </div>
            <div className="glass rounded-2xl p-6 space-y-4">
              <Reveal delay={0.25}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg glass flex items-center justify-center shrink-0">
                    <Building2 className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <span className="block text-xs text-text-muted">Client</span>
                    <span className="text-sm font-medium text-text">{project.clientName}</span>
                  </div>
                </div>
              </Reveal>
              <GlassDivider />
              <Reveal delay={0.3}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg glass flex items-center justify-center shrink-0">
                    <Calendar className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <span className="block text-xs text-text-muted">Completed</span>
                    <span className="text-sm font-medium text-text">{formatDate(project.createdAt)}</span>
                  </div>
                </div>
              </Reveal>
              <GlassDivider />
              <Reveal delay={0.35}>
                <div className="flex gap-3">
                  {project.liveUrl && (
                    <Button variant="primary" size="sm" href={project.liveUrl} className="flex-1">
                      <ExternalLink className="h-4 w-4 shrink-0" />
                      Live Site
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button variant="secondary" size="sm" href={project.githubUrl} className="flex-1">
                      <Code2 className="h-4 w-4 shrink-0" />
                      Source
                    </Button>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-premium">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
            {project.gallery.map((img, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className={cn(
                  'relative h-56 rounded-2xl overflow-hidden group cursor-pointer',
                  !img && 'bg-gradient-to-br',
                  !img && gradient,
                  i === 0 && 'md:col-span-2 md:row-span-2 h-72 md:h-80',
                )}>
                  {img ? (
                    <img
                      src={img}
                      alt={`${project.title} screenshot ${i + 1}`}
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white/20 text-8xl font-black tracking-tight select-none">{i + 1}</span>
                      </div>
                    </>
                  )}
                  <div className="absolute bottom-4 left-4 glass rounded-lg px-3 py-1.5">
                    <span className="text-xs text-text">Screenshot {i + 1}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            <Reveal>
              <div className="glass rounded-2xl p-8">
                <h2 className="text-xl font-semibold text-text mb-4">Services Provided</h2>
                <div className="flex flex-wrap gap-2">
                  {project.servicesProvided.map((s) => (
                    <span key={s} className="px-3 py-1.5 rounded-lg glass text-sm text-text-secondary">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div>
                <h2 className="text-xl font-semibold text-text mb-4">Technologies Used</h2>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 rounded-full glass text-sm text-text-secondary border border-accent/20 hover:border-accent/40 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            {project.challenges && (
              <Reveal>
                <div className="glass rounded-2xl p-8 border-l-4 border-warning">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg glass flex items-center justify-center">
                      <Lightbulb className="h-5 w-5 text-warning" />
                    </div>
                    <h2 className="text-xl font-semibold text-text">The Challenge</h2>
                  </div>
                  <p className="text-text-secondary leading-relaxed">{project.challenges}</p>
                </div>
              </Reveal>
            )}

            {project.solution && (
              <Reveal>
                <div className="glass rounded-2xl p-8 border-l-4 border-accent">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg glass flex items-center justify-center">
                      <Target className="h-5 w-5 text-accent" />
                    </div>
                    <h2 className="text-xl font-semibold text-text">Our Solution</h2>
                  </div>
                  <p className="text-text-secondary leading-relaxed">{project.solution}</p>
                </div>
              </Reveal>
            )}

            {project.results && (
              <Reveal>
                <div className="glass rounded-2xl p-8 border-l-4 border-success">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg glass flex items-center justify-center">
                      <Trophy className="h-5 w-5 text-success" />
                    </div>
                    <h2 className="text-xl font-semibold text-text">The Results</h2>
                  </div>
                  <p className="text-text-secondary leading-relaxed">{project.results}</p>
                </div>
              </Reveal>
            )}

            <Reveal>
              <div className="flex justify-center gap-4">
                {project.liveUrl && (
                  <Button variant="primary" size="lg" href={project.liveUrl}>
                    <ExternalLink className="h-5 w-5 shrink-0" />
                    Visit Live Site
                  </Button>
                )}
                <Button variant="secondary" size="lg" href="/portfolio">
                  <ArrowLeft className="h-5 w-5 shrink-0" />
                  Back to Portfolio
                </Button>
              </div>
            </Reveal>
          </div>

          {related.length > 0 && (
            <div className="mt-20">
              <GlassDivider className="mb-12" />
              <SectionHeading
                label="Explore More"
                title="Related Projects"
                description="Check out more projects in the same industry."
              />
              <div className="grid md:grid-cols-3 gap-6 mt-10">
                {related.map((r, i) => (
                  <Reveal key={r._id} delay={i * 0.05}>
                    <ParallaxTilt intensity={8}>
                      <Link to={`/portfolio/${r.slug}`} className="block group">
                        <div className={cn(
                          'glass rounded-2xl overflow-hidden transition-all duration-300 hover:border-accent/30',
                        )}>
                          <div className={cn(
                            'h-36 bg-gradient-to-br flex items-center justify-center',
                            gradientMap[r.industry] || 'from-accent to-purple-500',
                          )}>
                            <span className="text-white/20 text-4xl font-black select-none">{r.title.charAt(0)}</span>
                          </div>
                          <div className="p-5">
                            <h3 className="text-base font-semibold text-text mb-1 group-hover:text-accent transition-colors">{r.title}</h3>
                            <p className="text-sm text-text-secondary line-clamp-2">{r.description}</p>
                          </div>
                        </div>
                      </Link>
                    </ParallaxTilt>
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
