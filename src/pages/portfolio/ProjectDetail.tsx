import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { ArrowLeft, ExternalLink, Code2, Calendar, Building2, Lightbulb, Target, Trophy } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Skeleton } from '@/components/ui/Skeleton'
import Reveal from '@/components/animations/Reveal'
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
import betguardThumb from '@/assets/betguard-1.png'
import betguardGallery1 from '@/assets/betguard-1.png'
import betguardGallery2 from '@/assets/betguard-2.png'
import betguardGallery3 from '@/assets/betguard-3.png'
import betguardGallery4 from '@/assets/betguard-4.png'

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
  {
    _id: '5',
    title: 'BetGuard',
    slug: 'betguard',
    description: 'A responsible betting companion web app that helps users track spending, set budgets, log bets, and build healthier betting habits. Features spending analytics, smart budget alerts, an AI coach, savings goals, risk assessments, an education center, and a supportive community.',
    clientName: 'BetGuard',
    industry: 'Fintech / Responsible Gaming',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Recharts', 'Framer Motion', 'Vite'],
    thumbnail: betguardThumb,
    gallery: [betguardGallery1, betguardGallery2, betguardGallery3, betguardGallery4],
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

const gradientMap: Record<string, string> = {
  Fintech: 'from-[#2a2347] via-[#211c3c] to-[#14101f]',
  Healthcare: 'from-[#26304a] via-[#1d2438] to-[#11141f]',
  Sustainability: 'from-[#1f2e3f] via-[#182230] to-[#0f151d]',
  'E-commerce': 'from-[#332b1f] via-[#262019] to-[#17130e]',
  Blockchain: 'from-[#2f2330] via-[#241b26] to-[#141114]',
  'Smart City': 'from-[#2a2a38] via-[#202030] to-[#131319]',
  Education: 'from-[#26304a] via-[#1d2438] to-[#11141f]',
  Media: 'from-[#2f2330] via-[#241b26] to-[#141114]',
  'Restaurant / E-Commerce': 'from-[#332b1f] via-[#262019] to-[#17130e]',
  'IoT / Smart Water Management': 'from-[#1f2e3f] via-[#182230] to-[#0f151d]',
  'IoT / Backend Infrastructure': 'from-[#26304a] via-[#1d2438] to-[#11141f]',
  'Backend / API Development': 'from-[#2a2347] via-[#211c3c] to-[#14101f]',
  'Fintech / Responsible Gaming': 'from-[#2a2a38] via-[#202030] to-[#131319]',
}

function ProjectSkeleton() {
  return (
    <div className="tile-light">
      <div className="container-site px-4 py-16">
        <Skeleton className="mb-8 h-6 w-32" />
        <Skeleton className="mb-8 h-64 w-full rounded-[18px]" />
        <div className="max-w-3xl space-y-4">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
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
        const apiProject = res.data.data
        const demo = DEMO_PROJECTS.find((p) => p.slug === slug)
        if (apiProject && (!apiProject.gallery || apiProject.gallery.length === 0) && demo) {
          apiProject.gallery = demo.gallery
        }
        setProject(apiProject)
        if (apiProject) {
          setRelated(DEMO_PROJECTS.filter((p) => p.industry === apiProject.industry && p.slug !== slug).slice(0, 3))
        }
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
      <div className="tile-light text-center">
        <div className="container-site px-4 py-24">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-ink bg-canvas shadow-hard-sm">
            <Target className="h-8 w-8 text-ink-48" />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-ink">Project Not Found</h2>
          <p className="mb-6 text-ink-80">{error || 'The project you\'re looking for doesn\'t exist.'}</p>
          <Button variant="primary" href="/portfolio">
            <ArrowLeft className="h-4 w-4 shrink-0" />
            Back to Portfolio
          </Button>
        </div>
      </div>
    )
  }

  const gradient = gradientMap[project.industry] || 'from-[#2a2347] via-[#211c3c] to-[#14101f]'

  return (
    <>
      <Helmet>
        <title>{project.seoTitle || `${project.title} | Soyiri Labs Portfolio`}</title>
        <meta name="description" content={project.seoDescription || project.description} />
      </Helmet>

      <section className="tile-light relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 grid-bg" />
        <div className="pointer-events-none absolute -top-24 right-[-10%] h-[460px] w-[460px] blob-electric" />
        <div className="pointer-events-none absolute bottom-[-20%] left-[-10%] h-[420px] w-[420px] blob-violet" />
        <div className={cn('pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-gradient-to-br opacity-5', gradient)} />
        <div className="relative container-site px-4 py-14 md:py-20">
          <Reveal>
            <Link to="/portfolio" className="mb-8 inline-flex items-center gap-2 text-ink-48 transition-colors hover:text-action">
              <ArrowLeft className="h-4 w-4 shrink-0" />
              <span className="text-[15px] font-medium">Back to Portfolio</span>
            </Link>
          </Reveal>
          <div className="grid items-start gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Reveal delay={0.1}>
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span className={cn(
                    'rounded-full px-3 py-1 text-xs font-semibold',
                    project.status === 'completed' && 'bg-success/10 text-success',
                    project.status === 'in-progress' && 'bg-warning/10 text-warning',
                    project.status === 'maintenance' && 'bg-action/10 text-action',
                  )}>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </span>
                  <span className="text-caption text-ink-48">{project.industry}</span>
                  <span className="text-ink-48">·</span>
                  <span className="text-caption text-ink-48">{project.completionYear}</span>
                </div>
              </Reveal>
              <Reveal delay={0.15}>
                <h1 className="mb-4 text-4xl font-bold tracking-tight text-ink md:text-5xl lg:text-6xl">
                  {project.title}
                  <span className="text-action">.</span>
                </h1>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-lg leading-relaxed text-ink-80">{project.description}</p>
              </Reveal>
            </div>
            <div className="rounded-2xl border-2 border-ink bg-canvas p-6 shadow-hard">
              <Reveal delay={0.25}>
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-action/10">
                    <Building2 className="h-5 w-5 text-action" />
                  </div>
                  <div>
                    <span className="block text-caption text-ink-48">Client</span>
                    <span className="text-[15px] font-medium text-ink">{project.clientName}</span>
                  </div>
                </div>
              </Reveal>
              <div className="my-5 h-px bg-ink/15" />
              <Reveal delay={0.3}>
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet/10">
                    <Calendar className="h-5 w-5 text-violet" />
                  </div>
                  <div>
                    <span className="block text-caption text-ink-48">Completed</span>
                    <span className="text-[15px] font-medium text-ink">{formatDate(project.createdAt)}</span>
                  </div>
                </div>
              </Reveal>
              <div className="my-5 h-px bg-ink/15" />
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

      <section className="tile-dark tile relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 grid-bg-dark" />
        <div className="relative container-site px-4">
          <div className="mb-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {project.gallery.map((img, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className={cn(
                  'group relative h-56 cursor-pointer overflow-hidden rounded-2xl border border-white/10',
                  !img && 'bg-gradient-to-br',
                  !img && gradient,
                  i === 0 && 'h-72 md:col-span-2 md:row-span-2 md:h-80',
                )}>
                  {img ? (
                    <img
                      src={img}
                      alt={`${project.title} screenshot ${i + 1}`}
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <>
                      <div className="pointer-events-none absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-black/10" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="select-none font-display text-8xl font-bold tracking-tight text-white/15">{i + 1}</span>
                      </div>
                    </>
                  )}
                  <div className="absolute bottom-4 left-4 rounded-lg bg-tile-1/80 px-3 py-1.5 backdrop-blur">
                    <span className="text-xs text-on-dark-muted">Screenshot {i + 1}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mx-auto max-w-4xl space-y-12">
            <Reveal>
              <div className="rounded-2xl border border-white/10 bg-tile-2 p-8">
                <h2 className="mb-4 text-xl font-semibold text-on-dark">Services Provided</h2>
                <div className="flex flex-wrap gap-2">
                  {project.servicesProvided.map((s) => (
                    <span key={s} className="rounded-lg border border-white/12 bg-white/10 px-3 py-1.5 text-sm text-on-dark-muted">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div>
                <h2 className="mb-4 text-xl font-semibold text-on-dark">Technologies Used</h2>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/12 bg-tile-2 px-4 py-2 text-sm text-on-dark-muted transition-colors hover:border-action-sky/50 hover:text-on-dark"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            {project.challenges && (
              <Reveal>
                <div className="rounded-2xl border border-white/10 border-l-4 border-l-warning bg-tile-2 p-8">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning/15">
                      <Lightbulb className="h-5 w-5 text-warning" />
                    </div>
                    <h2 className="text-xl font-semibold text-on-dark">The Challenge</h2>
                  </div>
                  <p className="leading-relaxed text-on-dark-muted">{project.challenges}</p>
                </div>
              </Reveal>
            )}

            {project.solution && (
              <Reveal>
                <div className="rounded-2xl border border-white/10 border-l-4 border-l-action bg-tile-2 p-8">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-action/15">
                      <Target className="h-5 w-5 text-action-sky" />
                    </div>
                    <h2 className="text-xl font-semibold text-on-dark">Our Solution</h2>
                  </div>
                  <p className="leading-relaxed text-on-dark-muted">{project.solution}</p>
                </div>
              </Reveal>
            )}

            {project.results && (
              <Reveal>
                <div className="rounded-2xl border border-white/10 border-l-4 border-l-success bg-tile-2 p-8">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/15">
                      <Trophy className="h-5 w-5 text-success" />
                    </div>
                    <h2 className="text-xl font-semibold text-on-dark">The Results</h2>
                  </div>
                  <p className="leading-relaxed text-on-dark-muted">{project.results}</p>
                </div>
              </Reveal>
            )}

            <Reveal>
              <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
                {project.liveUrl && (
                  <Button variant="primary" size="lg" href={project.liveUrl} className="text-sm md:text-lg">
                    <ExternalLink className="h-5 w-5 shrink-0" />
                    Visit Live Site
                  </Button>
                )}
                <Button variant="secondary" size="lg" href="/portfolio" className="text-sm md:text-lg">
                  <ArrowLeft className="h-5 w-5 shrink-0" />
                  Back to Portfolio
                </Button>
              </div>
            </Reveal>
          </div>

          {related.length > 0 && (
            <div className="mt-20">
              <div className="mb-12 h-px bg-white/10" />
              <SectionHeading
                label="Explore More"
                title={
                  <>
                    Related <span className="text-serif-accent text-action-sky">projects</span>
                  </>
                }
                description="Check out more projects in the same industry."
                onDark
              />
              <div className="mt-10 grid gap-6 md:grid-cols-3">
                {related.map((r, i) => (
                  <Reveal key={r._id} delay={i * 0.05}>
                    <Link to={`/portfolio/${r.slug}`} className="group block">
                      <div className="overflow-hidden rounded-2xl border border-white/10 bg-tile-2 transition-colors duration-300 hover:border-white/25">
                        <div className={cn(
                          'flex h-36 items-center justify-center bg-gradient-to-br',
                          gradientMap[r.industry] || 'from-[#2a2347] via-[#211c3c] to-[#14101f]',
                        )}>
                          <span className="select-none font-display text-4xl font-bold text-white/20">{r.title.charAt(0)}</span>
                        </div>
                        <div className="p-5">
                          <h3 className="mb-1 text-base font-semibold text-on-dark transition-colors group-hover:text-action-sky">{r.title}</h3>
                          <p className="line-clamp-2 text-sm text-on-dark-muted">{r.description}</p>
                        </div>
                      </div>
                    </Link>
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
