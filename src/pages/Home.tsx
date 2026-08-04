import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Code2,
  Palette,
  Globe,
  Smartphone,
  TrendingUp,
  Server,
  Zap,
  Users,
  Target,
  ArrowUp,
  Star,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  ArrowUpRight,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { Skeleton } from '@/components/ui/Skeleton'
import Reveal from '@/components/animations/Reveal'
import { projectsApi } from '@/lib/api'
import { cn } from '@/lib/utils'
import type { Project } from '@/types'

const services = [
  {
    icon: Palette,
    title: 'Website Design',
    slug: 'website-design',
    description: 'Stunning, conversion-focused designs that captivate your audience and elevate your brand identity.',
    color: 'violet',
  },
  {
    icon: Code2,
    title: 'Website Development',
    slug: 'website-development',
    description: 'Blazing-fast, responsive websites built with modern frameworks and clean, maintainable code.',
    color: 'action',
  },
  {
    icon: Globe,
    title: 'Web Applications',
    slug: 'web-applications',
    description: 'Full-stack web applications with real-time features, APIs, and scalable cloud infrastructure.',
    color: 'cyan',
  },
  {
    icon: Smartphone,
    title: 'UI/UX Design',
    slug: 'ui-ux-design',
    description: 'Intuitive user interfaces backed by research-driven UX strategy and meticulous prototyping.',
    color: 'magenta',
  },
  {
    icon: TrendingUp,
    title: 'SEO Optimization',
    slug: 'seo-optimization',
    description: 'Data-driven SEO strategies that boost visibility, drive traffic, and maximize organic growth.',
    color: 'lime',
  },
  {
    icon: Server,
    title: 'Hosting & Deployment',
    slug: 'hosting-deployment',
    description: 'Enterprise-grade hosting, CI/CD pipelines, and 24/7 monitoring for peak performance.',
    color: 'action-sky',
  },
] as const

const whyValues = [
  {
    icon: Zap,
    title: 'Cutting-Edge Technology',
    description: 'We leverage the latest frameworks, tools, and cloud infrastructure to build future-proof solutions that scale.',
    color: 'bg-action/10 text-action',
  },
  {
    icon: Users,
    title: 'User-Centric Design',
    description: 'Every pixel is crafted with your users in mind, ensuring intuitive experiences that drive engagement and retention.',
    color: 'bg-violet/10 text-violet',
  },
  {
    icon: Target,
    title: 'Results-Driven Approach',
    description: 'We measure success by the impact we deliver, focusing on KPIs that grow your business and bottom line.',
    color: 'bg-cyan/10 text-cyan',
  },
] as const

const technologies = [
  'React', 'Express', 'Node.js', 'MongoDB', 'TypeScript', 'Tailwind',
  'Firebase', 'Docker', 'Vercel', 'Three.js', 'Framer Motion', 'GSAP',
] as const

const processSteps = [
  {
    step: 1,
    title: 'Discovery',
    description: 'We dive deep into your business, goals, and audience to define a clear roadmap for success.',
  },
  {
    step: 2,
    title: 'Planning',
    description: 'Strategic architecture and detailed project planning ensure alignment and set clear milestones.',
  },
  {
    step: 3,
    title: 'Design',
    description: 'Pixel-perfect designs with interactive prototypes that bring your vision to life before a single line of code.',
  },
  {
    step: 4,
    title: 'Development',
    description: 'Agile development with clean code, daily commits, and transparent progress updates.',
  },
  {
    step: 5,
    title: 'Testing',
    description: 'Rigorous QA across devices, browsers, and edge cases to ensure flawless performance.',
  },
  {
    step: 6,
    title: 'Deployment',
    description: 'Smooth launch with CI/CD pipelines, zero-downtime deployments, and performance optimization.',
  },
  {
    step: 7,
    title: 'Maintenance',
    description: 'Ongoing support, security updates, and continuous improvement to keep your product at its best.',
  },
] as const

const testimonials = [
  {
    quote: 'Soyiri Labs transformed our digital presence. The team\'s attention to detail and technical expertise exceeded our expectations at every turn.',
    name: 'Sarah Chen',
    company: 'TechVentures Inc.',
    position: 'CEO',
    rating: 5,
  },
  {
    quote: 'Working with Soyiri Labs was a game-changer. They delivered a platform that not only looks beautiful but performs flawlessly under heavy load.',
    name: 'Marcus Rodriguez',
    company: 'GrowthWave',
    position: 'CTO',
    rating: 5,
  },
  {
    quote: 'The level of craftsmanship Soyiri Labs brings is rare. They don\'t just build websites, they build digital experiences that leave a lasting impression.',
    name: 'Emily Nakamura',
    company: 'BrightPath Media',
    position: 'Creative Director',
    rating: 5,
  },
  {
    quote: 'From concept to launch, Soyiri Labs was the epitome of professionalism. Their UI/UX work drastically improved our user engagement metrics.',
    name: 'David Okonkwo',
    company: 'Finova Financial',
    position: 'Product Manager',
    rating: 5,
  },
] as const

const stats = [
  { label: 'Projects Completed', value: 50, suffix: '+', color: 'text-action' },
  { label: 'Happy Clients', value: 30, suffix: '+', color: 'text-violet' },
  { label: 'Years Experience', value: 5, suffix: '+', color: 'text-cyan' },
  { label: 'Websites Maintained', value: 80, suffix: '+', color: 'text-lime' },
] as const

const heroStats = [
  { label: 'Projects', value: '50+' },
  { label: 'Clients', value: '30+' },
  { label: 'Years', value: '5+' },
  { label: 'Satisfaction', value: '98%' },
] as const

const marqueeItems = [
  'Web Design',
  'Web Development',
  'UI/UX',
  'Web Apps',
  'SEO',
  'Hosting & Deployment',
]

function Marquee({ items, reverse = false, className }: { items: readonly string[]; reverse?: boolean; className?: string }) {
  const content = (
    <>
      {items.map((item) => (
        <span key={item} className="mx-6 flex items-center gap-6 whitespace-nowrap font-display text-2xl font-semibold tracking-tight md:text-4xl">
          {item}
          <span className="text-cyan">✦</span>
        </span>
      ))}
    </>
  )
  return (
    <div className={cn('marquee', reverse && 'marquee-reverse', className)}>
      <div className="marquee-track">{content}{content}</div>
    </div>
  )
}

function HeroSection() {
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 500], [1, 0])
  const y = useTransform(scrollY, [0, 500], [0, 80])

  return (
    <section className="tile-light relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-bg" />
      <div className="pointer-events-none absolute -top-32 right-[-10%] h-[560px] w-[560px] blob-electric" />
      <div className="pointer-events-none absolute bottom-[-20%] left-[-10%] h-[520px] w-[520px] blob-violet" />
      <div className="pointer-events-none absolute bottom-[30%] left-[30%] h-[320px] w-[320px] blob-cyan opacity-60" />

      <motion.div style={{ opacity, y }} className="relative z-10 w-full px-4 pb-16 pt-24 md:pb-24 md:pt-28">
        <div className="container-site">
          <div className="flex flex-col items-center text-center">
            <Reveal delay={0.1}>
              <div className="mb-9 inline-flex items-center gap-2 rounded-full border border-hairline bg-canvas/80 px-4 py-2 shadow-hard-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                </span>
                <span className="text-caption-strong text-ink">Available for new projects</span>
              </div>
            </Reveal>

            <div className="mb-7 max-w-5xl">
              <h1 className="text-hero-display flex flex-wrap justify-center text-ink">
                {['We', 'Build'].map((word, i) => (
                  <motion.span
                    key={word}
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.15 + i * 0.08, ease: [0.25, 0.4, 0.25, 1] }}
                  >
                    {word}{'\u00A0'}
                  </motion.span>
                ))}
                <motion.span
                  className="bg-gradient-to-r from-action via-violet to-cyan bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.31, ease: [0.25, 0.4, 0.25, 1] }}
                >
                  Digital{'\u00A0'}Products{'\u00A0'}
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.47, ease: [0.25, 0.4, 0.25, 1] }}
                >
                  That{'\u00A0'}
                </motion.span>
                <motion.span
                  className="text-serif-accent text-action"
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
                >
                  Matter.
                </motion.span>
              </h1>
            </div>

            <Reveal delay={0.35} className="mb-10 max-w-2xl">
              <p className="text-lead-airy text-ink-80">
                We craft premium web experiences that blend stunning design with
                cutting-edge technology. From concept to launch, we build digital
                products that drive real business growth.
              </p>
            </Reveal>

            <Reveal delay={0.5} className="flex flex-wrap items-center justify-center gap-3.5">
              <Button href="/portfolio" size="lg">
                View Our Work
                <ArrowRight className="h-5 w-5 shrink-0" />
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Get in Touch
              </Button>
            </Reveal>

            <Reveal delay={0.6} className="mt-10 flex flex-wrap items-center justify-center gap-2">
              {['Web Design', 'Development', 'SEO', 'UI/UX'].map((chip, i) => (
                <span
                  key={chip}
                  className={cn(
                    'cursor-default rounded-full border px-4 py-1.5 text-caption-strong transition-colors duration-200 hover:-translate-y-0.5',
                    i === 0 && 'border-violet/40 bg-violet/10 text-violet',
                    i === 1 && 'border-action/40 bg-action/10 text-action',
                    i === 2 && 'border-lime/50 bg-lime/10 text-lime',
                    i === 3 && 'border-magenta/40 bg-magenta/10 text-magenta',
                  )}
                >
                  {chip}
                </span>
              ))}
            </Reveal>

            <Reveal delay={0.7} className="mt-14 w-full">
              <div className="mx-auto grid w-full max-w-3xl grid-cols-2 divide-x divide-hairline rounded-2xl border-2 border-ink bg-canvas shadow-hard md:grid-cols-4">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="flex flex-col items-center px-4 py-7">
                    <span className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">{stat.value}</span>
                    <span className="mt-1.5 text-fine uppercase tracking-widest text-ink-48">{stat.label}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </motion.div>

      <div className="pointer-events-none absolute bottom-2 left-1/2 hidden -translate-x-1/2 select-none whitespace-nowrap text-[11rem] font-bold uppercase leading-none tracking-tighter text-outline lg:block">
        Digital
      </div>
    </section>
  )
}

function ServicesSection() {
  return (
    <section id="services" className="tile-parchment tile">
      <div className="container-site">
        <Reveal>
          <SectionHeading
            label="What We Do"
            title={
              <>
                Services that <span className="text-serif-accent text-action">move the needle</span>
              </>
            }
            description="We offer end-to-end web development services tailored to your business needs, from concept to launch and beyond."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.08}>
              <Link to={`/services/${service.slug ?? ''}`} className="group block h-full">
                <Card hover className="h-full">
                  <div className="mb-5 inline-flex rounded-xl bg-action/10 p-3 transition-transform duration-300 group-hover:-rotate-6">
                    <service.icon className={cn('h-6 w-6', `text-${service.color}`)} />
                  </div>
                  <h3 className="mb-3 text-tagline text-ink">{service.title}</h3>
                  <p className="text-[15px] leading-relaxed text-ink-80">{service.description}</p>
                  <div className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-semibold text-action">
                    Learn more <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </Card>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <Button href="/services" variant="secondary">
            View All Services
            <ArrowRight className="h-4 w-4 shrink-0" />
          </Button>
        </Reveal>
      </div>
    </section>
  )
}

function FeaturedProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await projectsApi.getFeatured()
        setProjects(res.data.data)
      } catch {
        setProjects([])
      } finally {
        setLoading(false)
      }
    }
    fetchFeatured()
  }, [])

  return (
    <section id="work" className="tile-dark tile relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-bg-dark" />
      <div className="relative">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              label="Our Work"
              title={
                <>
                  Selected <span className="text-serif-accent text-action-sky">work</span>, zero filler
                </>
              }
              description="Explore our latest projects showcasing premium design and engineering excellence."
              onDark
            />
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="overflow-hidden rounded-2xl border border-white/10 bg-tile-2">
                  <Skeleton className="h-48 rounded-none" />
                  <div className="space-y-3 p-6">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </div>
              ))
            ) : projects.length === 0 ? null : (
              projects.map((project, i) => (
                <Reveal key={project._id} delay={i * 0.1}>
                  <Link to={`/portfolio/${project.slug}`} className="group block">
                    <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-tile-2 transition-colors duration-300 group-hover:border-white/25">
                      <div
                        className="relative flex h-48 items-center justify-center"
                        style={{ backgroundColor: `${project.colorTheme || '#4f46e5'}2e` }}
                      >
                        <span className="select-none text-6xl font-semibold tracking-tight text-white/25">
                          {project.title.charAt(0)}
                        </span>
                        <span className="absolute left-4 top-4 font-display text-5xl font-bold text-white/10">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-action text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
                          <ArrowUpRight className="h-5 w-5" />
                        </span>
                      </div>
                      <div className="p-6">
                        <h3 className="mb-2 text-[21px] font-semibold text-on-dark transition-colors duration-200 group-hover:text-action-sky">
                          {project.title}
                        </h3>
                        <p className="mb-4 line-clamp-2 text-[15px] leading-relaxed text-on-dark-muted">
                          {project.description}
                        </p>
                        <div className="mb-5 flex flex-wrap gap-2">
                          {project.technologies.slice(0, 4).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-lg border border-white/12 bg-white/10 px-2.5 py-1 text-xs font-medium text-on-dark-muted"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-action-sky">
                          View Project <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))
            )}
          </div>

          <Reveal className="mt-12 text-center">
            <Button href="/portfolio" variant="pearl" size="lg">
              View All Projects
              <ArrowRight className="h-4 w-4 shrink-0" />
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function WhySoyiriLabsSection() {
  return (
    <section className="tile-light tile">
      <div className="container-site">
        <Reveal>
          <SectionHeading
            label="Why Choose Us"
            title={
              <>
                The studio <span className="text-serif-accent text-violet">difference</span>
              </>
            }
            description="We combine technical excellence with strategic thinking to deliver exceptional results."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {whyValues.map((value, i) => (
            <Reveal key={value.title} delay={i * 0.12}>
              <Card hover className="h-full text-center">
                <div className={cn('mx-auto mb-6 inline-flex rounded-full p-4', value.color)}>
                  <value.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-3 text-tagline text-ink">{value.title}</h3>
                <p className="text-[15px] leading-relaxed text-ink-80">{value.description}</p>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14">
          <div className="mx-auto max-w-4xl rounded-2xl border border-hairline bg-canvas p-8 shadow-hard-sm md:p-12">
            <div className="grid gap-8 sm:grid-cols-3">
              {[
                { icon: Zap, label: 'Lightning Fast', desc: 'Optimized for speed', color: 'text-action' },
                { icon: CheckCircle2, label: '99.9% Uptime', desc: 'Enterprise reliability', color: 'text-success' },
                { icon: Users, label: 'Dedicated Support', desc: '24/7 expert assistance', color: 'text-cyan' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <item.icon className={cn('mb-3 h-6 w-6', item.color)} />
                  <span className="mb-1 text-caption-strong text-ink">{item.label}</span>
                  <span className="text-fine text-ink-48">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function TechnologiesSection() {
  return (
    <section className="border-y border-hairline bg-canvas py-10">
      <div className="marquee">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {technologies.map((tech) => (
                <span key={`${copy}-${tech}`} className="mx-3 flex items-center gap-6 whitespace-nowrap font-display text-lg font-semibold text-ink-48 transition-colors hover:text-action">
                  {tech}
                  <span className="text-violet">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProcessSection() {
  return (
    <section className="tile-dark tile relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-bg-dark" />
      <div className="relative">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              label="How We Work"
              title={
                <>
                  Seven steps to <span className="text-serif-accent text-action-sky">ship it</span>
                </>
              }
              description="A proven methodology that ensures every project is delivered on time, on budget, and beyond expectations."
              onDark
            />
          </Reveal>

          <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((step, i) => (
              <Reveal key={step.step} delay={i * 0.06}>
                <div className="group relative h-full rounded-2xl border border-white/10 bg-tile-2 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-action-sky/40">
                  <span className="pointer-events-none absolute right-5 top-4 select-none font-display text-6xl font-bold text-outline-light">
                    {String(step.step).padStart(2, '0')}
                  </span>
                  <div className="relative">
                    <h3 className="mb-2 text-tagline text-on-dark group-hover:text-action-sky">{step.title}</h3>
                    <p className="text-[15px] leading-relaxed text-on-dark-muted">{step.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  return (
    <section className="tile-parchment tile">
      <div className="container-site">
        <Reveal>
          <SectionHeading
            label="Testimonials"
            title={
              <>
                Kind words from <span className="text-serif-accent text-magenta">happy clients</span>
              </>
            }
            description="Don't just take our word for it. Here's what our clients have to say."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {testimonials.map((testimonial, i) => (
            <Reveal key={testimonial.name} delay={i * 0.08}>
              <Card hover className="group h-full">
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>
                <p className="mb-6 line-clamp-4 font-serif text-[19px] italic leading-relaxed text-ink-80">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="border-t border-hairline pt-4">
                  <span className="block text-caption-strong text-ink">{testimonial.name}</span>
                  <span className="text-fine text-ink-48">
                    {testimonial.position}, {testimonial.company}
                  </span>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function StatisticsSection() {
  return (
    <section className="tile-light tile">
      <div className="container-site">
        <Reveal>
          <SectionHeading
            label="By the Numbers"
            title={
              <>
                Our impact in <span className="text-serif-accent text-cyan">numbers</span>
              </>
            }
            description="Hard work, happy clients, and measurable results."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <Card hover className="text-center">
                <div className={cn('font-display text-5xl font-bold tracking-tight md:text-6xl', stat.color)}>
                  <AnimatedCounter to={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-3 text-[15px] text-ink-80">{stat.label}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="tile-electric tile relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-bg-dark" />
      <div className="pointer-events-none absolute -left-24 top-1/2 h-[420px] w-[420px] -translate-y-1/2 blob-violet" />
      <div className="pointer-events-none absolute -right-24 top-0 h-[360px] w-[360px] blob-cyan" />
      <div className="relative">
        <div className="container-site">
          <Reveal>
            <div className="text-center">
              <p className="mb-4 text-caption-strong uppercase tracking-[0.14em] text-white/70">
                Got a project in mind?
              </p>
              <h2 className="text-display-lg text-white text-balance">
                Ready to build something
                <br />
                <span className="text-serif-accent">amazing?</span>
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lead-airy text-white/80">
                Let's turn your vision into a premium digital product. Get in touch
                and we'll make it happen.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3.5">
                <Button
                  href="/contact"
                  size="lg"
                  variant="white"
                >
                  Start Your Project
                  <ArrowRight className="h-5 w-5 shrink-0" />
                </Button>
                  <Button
                    href="/services"
                    variant="outline-light"
                    size="lg"
                  >
                    Explore Services
                  </Button>
              </div>
            </div>
          </Reveal>
        </div>
        <div className="mt-16 border-t border-white/15 pt-6">
          <Marquee items={marqueeItems} />
        </div>
      </div>
    </section>
  )
}

function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={cn(
        'fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-ink text-white shadow-hard-sm transition-colors duration-200 hover:bg-action',
        visible ? 'pointer-events-auto' : 'pointer-events-none',
      )}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.8 }}
      transition={{ duration: 0.2 }}
      aria-label="Back to top"
    >
      <ArrowUp className="h-5 w-5" />
    </motion.button>
  )
}

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Soyiri Labs | Premium Web Development Agency</title>
        <meta
          name="description"
          content="Soyiri Labs is a premium web development agency crafting stunning digital products that drive business growth. We build websites, web apps, and digital experiences."
        />
        <meta name="keywords" content="web development, web design, UI/UX, SEO, premium agency" />
        <meta property="og:title" content="Soyiri Labs | Premium Web Development Agency" />
        <meta
          property="og:description"
          content="We build digital products that matter. Premium web development and design services."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Soyiri Labs | Premium Web Development Agency" />
        <meta
          name="twitter:description"
          content="We build digital products that matter. Premium web development and design services."
        />
        <link rel="canonical" href="https://soyirilabs.com" />
      </Helmet>

      <HeroSection />
      <ServicesSection />
      <FeaturedProjectsSection />
      <WhySoyiriLabsSection />
      <TechnologiesSection />
      <ProcessSection />
      <TestimonialsSection />
      <StatisticsSection />
      <CTASection />
      <BackToTop />
    </>
  )
}
