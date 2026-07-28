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
    gallery: ['', '', '', '', ''],
    liveUrl: 'https://example.com/nexus',
    githubUrl: 'https://github.com/example/nexus',
    featured: true,
    completionYear: 2024,
    servicesProvided: ['Web Development', 'UI/UX Design', 'Cloud Infrastructure'],
    colorTheme: '#6366f1',
    status: 'completed',
    challenges: 'Handling massive real-time data streams while maintaining sub-second query performance across millions of transactions. The existing legacy system could not scale beyond 100K transactions per day and had frequent outages during peak trading hours.',
    solution: 'We designed and implemented a microservices architecture using event-driven data processing. The system leverages Apache Kafka for real-time event streaming, Redis for caching, and PostgreSQL with read replicas for persistence. A custom-built dashboard with WebSocket connections provides real-time updates to users.',
    results: 'Achieved 99.9% uptime with 40% reduction in query latency. The platform now processes over 10M transactions daily with seamless horizontal scaling. Client reported a 60% increase in user engagement and 35% reduction in operational costs.',
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
    gallery: ['', '', '', '', ''],
    liveUrl: 'https://example.com/mediconnect',
    featured: true,
    completionYear: 2024,
    servicesProvided: ['Full-Stack Development', 'UI/UX Design', 'DevOps'],
    colorTheme: '#06b6d4',
    status: 'completed',
    challenges: 'Ensuring HIPAA compliance while delivering low-latency video consultations across varying network conditions. The application needed to support multiple concurrent sessions with screen sharing, file transfer, and real-time chat.',
    solution: 'Built on WebRTC with adaptive bitrate streaming and end-to-end encryption. Deployed on HIPAA-compliant AWS infrastructure with auto-scaling groups. Implemented a fallback system for low-bandwidth scenarios using audio-only mode.',
    results: 'Enabled 50,000+ virtual consultations in the first quarter with 98% patient satisfaction rating. Reduced no-show rates by 40% and average wait times by 60%.',
    createdAt: '2024-02-20T00:00:00Z',
    updatedAt: '2024-07-15T00:00:00Z',
  },
  {
    _id: '3',
    title: 'EcoTrack Sustainability',
    slug: 'ecotrack-sustainability',
    description: 'Enterprise sustainability management platform for tracking, analyzing, and reporting carbon emissions.',
    clientName: 'GreenFuture Corp',
    industry: 'Sustainability',
    technologies: ['React', 'Python', 'FastAPI', 'TimescaleDB', 'GraphQL'],
    thumbnail: '',
    gallery: ['', '', '', '', ''],
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
    description: 'AI-powered fashion recommendation engine with virtual try-on capabilities for e-commerce.',
    clientName: 'StyleAI Inc.',
    industry: 'E-commerce',
    technologies: ['Next.js', 'Python', 'PyTorch', 'Elasticsearch', 'Redis', 'AWS SageMaker'],
    thumbnail: '',
    gallery: ['', '', '', '', ''],
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
    gallery: ['', '', '', '', ''],
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
    description: 'IoT-powered smart city management platform for traffic optimization and urban planning.',
    clientName: 'UrbanFlow Municipality',
    industry: 'Smart City',
    technologies: ['React', 'Node.js', 'InfluxDB', 'MQTT', 'Kubernetes', 'Go'],
    thumbnail: '',
    gallery: ['', '', '', '', ''],
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
    gallery: ['', '', '', '', ''],
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
    description: 'Real-time streaming data analytics platform for media companies with audience insights.',
    clientName: 'MediaPulse Networks',
    industry: 'Media',
    technologies: ['React', 'Apache Flink', 'Kafka', 'Elasticsearch', 'Kubernetes'],
    thumbnail: '',
    gallery: ['', '', '', '', ''],
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

const gradientMap: Record<string, string> = {
  Fintech: 'from-accent to-purple-500',
  Healthcare: 'from-cyan-500 to-blue-600',
  Sustainability: 'from-green-500 to-emerald-600',
  'E-commerce': 'from-pink-500 to-rose-600',
  Blockchain: 'from-amber-500 to-orange-600',
  'Smart City': 'from-violet-500 to-indigo-600',
  Education: 'from-blue-500 to-cyan-600',
  Media: 'from-red-500 to-pink-600',
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
        <div className={cn('absolute inset-0 bg-gradient-to-br opacity-5', gradient)} />
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
                  'relative h-56 rounded-2xl bg-gradient-to-br overflow-hidden group cursor-pointer',
                  gradient,
                  i === 0 && 'md:col-span-2 md:row-span-2 h-72 md:h-80',
                )}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white/20 text-8xl font-black tracking-tight select-none">{i + 1}</span>
                  </div>
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
