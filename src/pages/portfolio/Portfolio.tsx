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

const DEMO_PROJECTS: Project[] = [
  {
    _id: '1',
    title: 'Nexus Finance Platform',
    slug: 'nexus-finance-platform',
    description: 'A comprehensive financial analytics dashboard with real-time data visualization and AI-powered insights for enterprise clients.',
    clientName: 'Nexus Financial Group',
    industry: 'Fintech',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'TensorFlow', 'Redis'],
    thumbnail: '',
    gallery: ['', '', ''],
    liveUrl: 'https://example.com/nexus',
    githubUrl: 'https://github.com/example/nexus',
    featured: true,
    completionYear: 2024,
    servicesProvided: ['Web Development', 'UI/UX Design', 'Cloud Infrastructure'],
    colorTheme: '#6366f1',
    status: 'completed',
    challenges: 'Handling massive real-time data streams while maintaining sub-second query performance across millions of transactions.',
    solution: 'Implemented a microservices architecture with event-driven data processing using Kafka and in-memory caching layers.',
    results: 'Achieved 99.9% uptime with 40% reduction in query latency and successfully processed over 10M transactions daily.',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-06-01T00:00:00Z',
  },
  {
    _id: '2',
    title: 'MediConnect Telehealth',
    slug: 'mediconnect-telehealth',
    description: 'End-to-end telemedicine platform connecting patients with healthcare providers through virtual consultations.',
    clientName: 'MediConnect Health',
    industry: 'Healthcare',
    technologies: ['Next.js', 'WebRTC', 'MongoDB', 'AWS', 'Socket.io'],
    thumbnail: '',
    gallery: ['', '', ''],
    liveUrl: 'https://example.com/mediconnect',
    featured: true,
    completionYear: 2024,
    servicesProvided: ['Full-Stack Development', 'UI/UX Design', 'DevOps'],
    colorTheme: '#06b6d4',
    status: 'completed',
    challenges: 'Ensuring HIPAA compliance while delivering low-latency video consultations across varying network conditions.',
    solution: 'Built on WebRTC with adaptive bitrate streaming and end-to-end encryption, deployed on HIPAA-compliant AWS infrastructure.',
    results: 'Enabled 50,000+ virtual consultations in the first quarter with 98% patient satisfaction rating.',
    createdAt: '2024-02-20T00:00:00Z',
    updatedAt: '2024-07-15T00:00:00Z',
  },
  {
    _id: '3',
    title: 'EcoTrack Sustainability',
    slug: 'ecotrack-sustainability',
    description: 'Enterprise sustainability management platform for tracking, analyzing, and reporting carbon emissions and environmental impact.',
    clientName: 'GreenFuture Corp',
    industry: 'Sustainability',
    technologies: ['React', 'Python', 'FastAPI', 'TimescaleDB', 'GraphQL'],
    thumbnail: '',
    gallery: ['', '', ''],
    liveUrl: 'https://example.com/ecotrack',
    featured: false,
    completionYear: 2023,
    servicesProvided: ['Web Development', 'Data Engineering'],
    colorTheme: '#22c55e',
    status: 'completed',
    challenges: 'Integrating diverse data sources with varying formats and ensuring accurate carbon accounting per international standards.',
    solution: 'Developed a flexible ETL pipeline with automated data validation and a comprehensive calculation engine using Python.',
    results: 'Reduced reporting time by 80% and helped clients identify 25% reduction opportunities in carbon emissions.',
    createdAt: '2023-08-10T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z',
  },
  {
    _id: '4',
    title: 'StyleAI Fashion Retail',
    slug: 'styleai-fashion-retail',
    description: 'AI-powered fashion recommendation engine with virtual try-on capabilities for a leading e-commerce brand.',
    clientName: 'StyleAI Inc.',
    industry: 'E-commerce',
    technologies: ['Next.js', 'Python', 'PyTorch', 'Elasticsearch', 'Redis', 'AWS SageMaker'],
    thumbnail: '',
    gallery: ['', '', ''],
    liveUrl: 'https://example.com/styleai',
    featured: true,
    completionYear: 2024,
    servicesProvided: ['AI/ML Development', 'Web Development', 'Mobile App'],
    colorTheme: '#ec4899',
    status: 'completed',
    challenges: 'Building accurate recommendation models with cold-start problem and delivering real-time personalization at scale.',
    solution: 'Implemented hybrid collaborative filtering with deep learning embeddings and real-time inference pipeline.',
    results: 'Increased average order value by 35% and improved conversion rate by 28% within three months of deployment.',
    createdAt: '2024-03-05T00:00:00Z',
    updatedAt: '2024-08-01T00:00:00Z',
  },
  {
    _id: '5',
    title: 'BlockVote DA Platform',
    slug: 'blockvote-da-platform',
    description: 'Decentralized voting platform for organizational governance using blockchain technology.',
    clientName: 'BlockVote DAO',
    industry: 'Blockchain',
    technologies: ['Solidity', 'React', 'Hardhat', 'IPFS', 'The Graph', 'TypeScript'],
    thumbnail: '',
    gallery: ['', '', ''],
    liveUrl: 'https://example.com/blockvote',
    featured: false,
    completionYear: 2023,
    servicesProvided: ['Smart Contract Development', 'DApp Development', 'Security Audit'],
    colorTheme: '#f59e0b',
    status: 'completed',
    challenges: 'Ensuring vote integrity and privacy while maintaining transparency and scalability on the Ethereum network.',
    solution: 'Designed zk-SNARKs based voting contracts with gas-optimized aggregation and IPFS-backed proposal storage.',
    results: 'Processed 100,000+ secure votes across 500 organizations with zero security incidents.',
    createdAt: '2023-06-15T00:00:00Z',
    updatedAt: '2023-12-10T00:00:00Z',
  },
  {
    _id: '6',
    title: 'UrbanFlow Smart City',
    slug: 'urbanflow-smart-city',
    description: 'IoT-powered smart city management platform for traffic optimization, waste management, and urban planning.',
    clientName: 'UrbanFlow Municipality',
    industry: 'Smart City',
    technologies: ['React', 'Node.js', 'InfluxDB', 'MQTT', 'Kubernetes', 'Go'],
    thumbnail: '',
    gallery: ['', '', ''],
    liveUrl: 'https://example.com/urbanflow',
    featured: true,
    completionYear: 2024,
    servicesProvided: ['IoT Development', 'Full-Stack Development', 'Data Analytics'],
    colorTheme: '#8b5cf6',
    status: 'in-progress',
    challenges: 'Integrating heterogeneous IoT devices with different protocols while processing millions of sensor data points in real time.',
    solution: 'Built a unified ingestion layer with protocol adapters and a stream processing pipeline using Kafka and Flink.',
    results: 'Reduced traffic congestion by 22% and optimized waste collection routes saving 30% in operational costs.',
    createdAt: '2024-04-01T00:00:00Z',
    updatedAt: '2024-09-01T00:00:00Z',
  },
  {
    _id: '7',
    title: 'LearnPath LMS',
    slug: 'learnpath-lms',
    description: 'Modern learning management system with adaptive learning paths and AI-driven content recommendations.',
    clientName: 'EduTech Global',
    industry: 'Education',
    technologies: ['Next.js', 'Python', 'Django', 'PostgreSQL', 'Docker'],
    thumbnail: '',
    gallery: ['', '', ''],
    liveUrl: 'https://example.com/learnpath',
    featured: false,
    completionYear: 2023,
    servicesProvided: ['Web Development', 'UI/UX Design', 'Cloud Migration'],
    colorTheme: '#3b82f6',
    status: 'completed',
    challenges: 'Creating personalized learning paths for diverse student populations while maintaining content quality and engagement.',
    solution: 'Developed an adaptive learning engine using Bayesian Knowledge Tracing with real-time progress analytics.',
    results: 'Improved student completion rates by 45% and achieved 4.8/5 average user satisfaction rating.',
    createdAt: '2023-04-20T00:00:00Z',
    updatedAt: '2023-10-15T00:00:00Z',
  },
  {
    _id: '8',
    title: 'StreamPulse Analytics',
    slug: 'streampulse-analytics',
    description: 'Real-time streaming data analytics platform for media companies with audience insights and content optimization.',
    clientName: 'MediaPulse Networks',
    industry: 'Media',
    technologies: ['React', 'Apache Flink', 'Kafka', 'Elasticsearch', 'Kubernetes'],
    thumbnail: '',
    gallery: ['', '', ''],
    liveUrl: 'https://example.com/streampulse',
    featured: false,
    completionYear: 2024,
    servicesProvided: ['Data Engineering', 'Web Development', 'DevOps'],
    colorTheme: '#ef4444',
    status: 'maintenance',
    challenges: 'Processing terabytes of streaming data daily while providing sub-second query capabilities for live dashboards.',
    solution: 'Architected a lambda architecture combining real-time Flink processing with batch analytics on data lakes.',
    results: 'Enabled real-time audience insights for 200+ media channels processing 5TB of data daily.',
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-08-20T00:00:00Z',
  },
]

const industries = ['All', 'Fintech', 'Healthcare', 'E-commerce', 'Education', 'Blockchain', 'Media', 'Smart City', 'Sustainability']
const technologies = ['All', 'React', 'Next.js', 'Node.js', 'Python', 'TypeScript', 'Docker', 'Kubernetes', 'AWS', 'PostgreSQL', 'MongoDB']
const years = ['All', '2024', '2023']

const thumbnailGradients = [
  'from-accent to-purple-500',
  'from-cyan-500 to-blue-600',
  'from-green-500 to-emerald-600',
  'from-pink-500 to-rose-600',
  'from-amber-500 to-orange-600',
  'from-violet-500 to-indigo-600',
  'from-blue-500 to-cyan-600',
  'from-red-500 to-pink-600',
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

      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
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
                  Filters
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
                    <div className="flex flex-wrap gap-6 pt-4 border-t border-border">
                      <div>
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
                      <div>
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
                      <div>
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
                              'relative h-48 bg-gradient-to-br flex items-center justify-center overflow-hidden',
                              thumbnailGradients[index % thumbnailGradients.length],
                            )}>
                              <div className="absolute inset-0 bg-black/20" />
                              <span className="relative text-white/30 text-6xl font-black tracking-tight select-none">
                                {project.title.charAt(0)}
                              </span>
                              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
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
