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
  ChevronDown,
  Star,
  Quote,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { GlassDivider } from '@/components/ui/GlassDivider'
import { Skeleton } from '@/components/ui/Skeleton'
import Reveal from '@/components/animations/Reveal'
import ParallaxTilt from '@/components/animations/ParallaxTilt'
import GlowCard from '@/components/animations/GlowCard'
import FloatingElements from '@/components/animations/FloatingElements'
import { projectsApi } from '@/lib/api'
import { cn } from '@/lib/utils'
import type { Project } from '@/types'

const services = [
  {
    icon: Palette,
    title: 'Website Design',
    description: 'Stunning, conversion-focused designs that captivate your audience and elevate your brand identity.',
  },
  {
    icon: Code2,
    title: 'Website Development',
    description: 'Blazing-fast, responsive websites built with modern frameworks and clean, maintainable code.',
  },
  {
    icon: Globe,
    title: 'Web Applications',
    description: 'Full-stack web applications with real-time features, APIs, and scalable cloud infrastructure.',
  },
  {
    icon: Smartphone,
    title: 'UI/UX Design',
    description: 'Intuitive user interfaces backed by research-driven UX strategy and meticulous prototyping.',
  },
  {
    icon: TrendingUp,
    title: 'SEO Optimization',
    description: 'Data-driven SEO strategies that boost visibility, drive traffic, and maximize organic growth.',
  },
  {
    icon: Server,
    title: 'Hosting & Deployment',
    description: 'Enterprise-grade hosting, CI/CD pipelines, and 24/7 monitoring for peak performance.',
  },
] as const



const whyValues = [
  {
    icon: Zap,
    title: 'Cutting-Edge Technology',
    description: 'We leverage the latest frameworks, tools, and cloud infrastructure to build future-proof solutions that scale.',
  },
  {
    icon: Users,
    title: 'User-Centric Design',
    description: 'Every pixel is crafted with your users in mind, ensuring intuitive experiences that drive engagement and retention.',
  },
  {
    icon: Target,
    title: 'Results-Driven Approach',
    description: 'We measure success by the impact we deliver, focusing on KPIs that grow your business and bottom line.',
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
  { label: 'Projects Completed', value: 50, suffix: '+' },
  { label: 'Happy Clients', value: 30, suffix: '+' },
  { label: 'Years Experience', value: 5, suffix: '+' },
  { label: 'Websites Maintained', value: 80, suffix: '+' },
] as const

function BackgroundGradient() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-[20%] -top-[20%] h-[60%] w-[60%] rounded-full bg-accent/10 blur-[60px] md:blur-[120px]" />
      <div className="absolute -right-[20%] top-[10%] h-[50%] w-[50%] rounded-full bg-gold/6 blur-[50px] md:blur-[100px]" />
      <div className="absolute -bottom-[20%] left-[30%] h-[50%] w-[50%] rounded-full bg-accent-light/5 blur-[50px] md:blur-[100px]" />
    </div>
  )
}

function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.5, duration: 1 }}
    >
      <motion.div
        className="flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-xs font-medium tracking-widest text-text-muted uppercase">Scroll</span>
        <ChevronDown className="h-4 w-4 text-text-muted" />
      </motion.div>
    </motion.div>
  )
}

function HeroSection() {
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 500], [1, 0])
  const y = useTransform(scrollY, [0, 500], [0, 100])

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <FloatingElements count={10} />
      <BackgroundGradient />

      <motion.div style={{ opacity, y }} className="relative z-10 w-full px-4 pt-20 md:pt-[90px]">
        <div className="container-premium">
          <div className="flex flex-col items-center text-center">
            <Reveal delay={0.1}>
              <div className="glass mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm">
                <span className="h-2 w-2 rounded-full bg-gradient-to-r from-accent to-gold" />
                <span className="text-text-muted">Welcome to Soyiri Labs</span>
              </div>
            </Reveal>

            <div className="mb-6 max-w-5xl">
              <h1 className="flex flex-wrap justify-center text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl xl:text-8xl">
                {['We', 'Build'].map((word, i) => (
                  <motion.span
                    key={word}
                    className="text-text"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease: [0.25, 0.4, 0.25, 1] }}
                  >
                    {word}{'\u00A0'}
                  </motion.span>
                ))}
                <motion.span
                  className="gradient-text"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.36, ease: [0.25, 0.4, 0.25, 1] }}
                >
                  Digital{'\u00A0'}Products{'\u00A0'}
                </motion.span>
                <motion.span
                  className="text-text"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.52, ease: [0.25, 0.4, 0.25, 1] }}
                >
                  That{'\u00A0'}Matter
                </motion.span>
              </h1>
            </div>

            <Reveal delay={0.4} className="mb-10 max-w-2xl">
              <p className="text-base leading-relaxed text-text-secondary md:text-lg lg:text-xl">
                We craft premium web experiences that blend stunning design with
                cutting-edge technology. From concept to launch, we build digital
                products that drive real business growth.
              </p>
            </Reveal>

            <Reveal delay={0.6} className="flex flex-wrap items-center justify-center gap-4">
              <Button href="/portfolio" size="lg">
                View Our Work
                <ArrowRight className="h-5 w-5 shrink-0" />
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Get in Touch
              </Button>
            </Reveal>

            <Reveal delay={0.8} className="mt-20 w-full">
              <div className="glass inline-grid w-full max-w-3xl grid-cols-2 divide-x divide-border overflow-hidden rounded-2xl md:grid-cols-4">
                {[
                  { label: 'Projects', value: '50+', sub: 'Completed' },
                  { label: 'Clients', value: '30+', sub: 'Worldwide' },
                  { label: 'Years', value: '5+', sub: 'Experience' },
                  { label: 'Satisfaction', value: '98%', sub: 'Rate' },
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col items-center px-4 py-6 md:py-8">
                    <span className="gradient-text text-2xl font-bold md:text-3xl">{stat.value}</span>
                    <span className="mt-1 text-xs text-text-muted">{stat.label}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </motion.div>

      <ScrollIndicator />
    </section>
  )
}

function ServicesSection() {
  return (
    <section id="services" className="section-padding relative">
      <div className="container-premium">
        <Reveal>
          <SectionHeading
            label="What We Do"
            title="Premium Web Development Services"
            description="We offer end-to-end web development services tailored to your business needs, from concept to launch and beyond."
          />
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.1}>
              <ParallaxTilt intensity={10}>
                <GlowCard>
                  <Card hover glow className="group h-full">
                    <div className="glass-light mb-5 inline-flex rounded-xl p-3">
                      <service.icon className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="mb-3 text-lg font-semibold text-text">{service.title}</h3>
                    <p className="text-sm leading-relaxed text-text-secondary">{service.description}</p>
                    <div className="mt-5 flex items-center gap-1 text-sm font-medium text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      Learn more <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </Card>
                </GlowCard>
              </ParallaxTilt>
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

const gradients = [
  'from-[#2a2347] via-[#211c3c] to-[#14101f]',
  'from-[#26304a] via-[#1d2438] to-[#11141f]',
  'from-[#2a2a38] via-[#202030] to-[#131319]',
  'from-[#332b1f] via-[#262019] to-[#17130e]',
  'from-[#1f2e3f] via-[#182230] to-[#0f151d]',
  'from-[#2f2330] via-[#241b26] to-[#141114]',
] as const

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
    <section id="work" className="section-padding relative">
      <div className="container-premium">
        <Reveal>
          <SectionHeading
            label="Our Work"
            title="Featured Projects"
            description="Explore our latest projects showcasing premium design and engineering excellence."
          />
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="glass rounded-2xl overflow-hidden">
                <Skeleton className="h-52 rounded-none" />
                <div className="p-6 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <div className="flex gap-2 pt-2">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-14 rounded-full" />
                  </div>
                </div>
              </div>
            ))
          ) : projects.length === 0 ? null : (
            projects.map((project, i) => (
              <Reveal key={project._id} delay={i * 0.15}>
                <Link to={`/portfolio/${project.slug}`} className="block group">
                  <GlowCard>
                    <Card hover className="h-full overflow-hidden p-0">
                      <div className={cn('flex h-52 items-center justify-center bg-gradient-to-br', gradients[i % gradients.length])}>
                        <span className="text-6xl font-black tracking-tight text-white/30 select-none">
                          {project.title.charAt(0)}
                        </span>
                      </div>
                      <div className="p-6">
                        <h3 className="mb-2 text-xl font-semibold text-text group-hover:text-accent transition-colors">
                          {project.title}
                        </h3>
                        <p className="mb-4 text-sm leading-relaxed text-text-secondary line-clamp-2">
                          {project.description}
                        </p>
                        <div className="mb-5 flex flex-wrap gap-2">
                          {project.technologies.slice(0, 4).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-lg bg-glass-light px-2.5 py-1 text-xs font-medium text-text-secondary"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors duration-300 group-hover:text-accent-light">
                          View Project <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                        </span>
                      </div>
                    </Card>
                  </GlowCard>
                </Link>
              </Reveal>
            ))
          )}
        </div>

        <Reveal className="mt-12 text-center">
          <Button href="/portfolio">
            View All Projects
            <ArrowRight className="h-4 w-4 shrink-0" />
          </Button>
        </Reveal>
      </div>
    </section>
  )
}

function WhySoyiriLabsSection() {
  return (
    <section className="section-padding relative">
      <div className="container-premium">
        <Reveal>
          <SectionHeading
            label="Why Choose Us"
            title="Why Soyiri Labs?"
            description="We combine technical excellence with strategic thinking to deliver exceptional results."
          />
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {whyValues.map((value, i) => (
            <Reveal key={value.title} delay={i * 0.15}>
              <GlowCard>
                <Card className="h-full text-center">
                  <div className="glass-light mx-auto mb-6 inline-flex rounded-2xl p-4">
                    <value.icon className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-text">{value.title}</h3>
                  <p className="text-sm leading-relaxed text-text-secondary">{value.description}</p>
                </Card>
              </GlowCard>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16">
          <div className="glass mx-auto max-w-4xl rounded-3xl p-8 md:p-12">
            <div className="grid gap-8 sm:grid-cols-3">
              {[
                { icon: Zap, label: 'Lightning Fast', desc: 'Optimized for speed' },
                { icon: CheckCircle2, label: '99.9% Uptime', desc: 'Enterprise reliability' },
                { icon: Users, label: 'Dedicated Support', desc: '24/7 expert assistance' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <item.icon className="mb-3 h-6 w-6 text-accent" />
                  <span className="mb-1 text-sm font-semibold text-text">{item.label}</span>
                  <span className="text-xs text-text-muted">{item.desc}</span>
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
    <section className="section-padding relative">
      <GlassDivider className="mb-0" />
      <div className="container-premium pt-16">
        <Reveal>
          <SectionHeading
            label="Tech Stack"
            title="Technologies We Use"
            description="Modern tools and frameworks powering our premium web solutions."
          />
        </Reveal>

        <div className="mt-16 flex flex-wrap justify-center gap-4">
          {technologies.map((tech, i) => (
            <Reveal key={tech} delay={i * 0.05} direction="up">
              <motion.div
                className="glass rounded-full px-5 py-2.5 text-sm font-medium text-text-secondary transition-colors duration-300 hover:border-accent/30 hover:text-text"
                whileHover={{ y: -4, scale: 1.05 }}
              >
                {tech}
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
      <GlassDivider className="mt-0" />
    </section>
  )
}

function ProcessSection() {
  return (
    <section className="section-padding relative">
      <div className="container-premium">
        <Reveal>
          <SectionHeading
            label="How We Work"
            title="Our Process"
            description="A proven methodology that ensures every project is delivered on time, on budget, and beyond expectations."
          />
        </Reveal>

        <div className="relative mt-20">
          <div className="absolute bottom-0 left-6 top-0 hidden w-px bg-gradient-to-b from-accent via-gold/40 to-transparent md:block" />

          <div className="space-y-12 md:space-y-16">
            {processSteps.map((step, i) => (
              <Reveal key={step.step} delay={i * 0.1}>
                <div className="group relative md:flex md:items-start md:gap-8">
                  <div className="mb-4 hidden md:block md:w-14 md:shrink-0">
                    <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary ring-2 ring-accent/30 transition-all duration-300 group-hover:ring-accent/60">
                      <span className="text-sm font-bold text-accent">{String(step.step).padStart(2, '0')}</span>
                    </div>
                  </div>

                  <GlowCard>
                    <Card className="relative md:ml-0">
                      <div className="mb-3 flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 md:hidden">
                          <span className="text-xs font-bold text-accent">{step.step}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-text">{step.title}</h3>
                      </div>
                      <p className="text-sm leading-relaxed text-text-secondary">{step.description}</p>
                    </Card>
                  </GlowCard>
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
    <section className="section-padding relative overflow-hidden">
      <div className="container-premium">
        <Reveal>
          <SectionHeading
            label="Testimonials"
            title="What Our Clients Say"
            description="Don't just take our word for it. Here's what our clients have to say."
          />
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {testimonials.map((testimonial, i) => (
            <Reveal key={testimonial.name} delay={i * 0.1}>
              <GlowCard>
                <Card className="group h-full">
                  <Quote className="mb-4 h-8 w-8 text-accent/30" />
                  <p className="mb-6 text-sm leading-relaxed text-text-secondary italic line-clamp-4">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <div className="border-t border-border pt-4">
                    <span className="block text-sm font-semibold text-text">{testimonial.name}</span>
                    <span className="text-xs text-text-muted">
                      {testimonial.position}, {testimonial.company}
                    </span>
                  </div>
                </Card>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function StatisticsSection() {
  return (
    <section className="section-padding relative">
      <GlassDivider className="mb-0" />
      <div className="container-premium pt-16">
        <Reveal>
          <SectionHeading
            label="By the Numbers"
            title="Our Impact in Numbers"
            description="Hard work, happy clients, and measurable results."
          />
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1}>
              <Card glow className="text-center">
                <div className="gradient-text text-4xl font-bold md:text-5xl">
                  <AnimatedCounter to={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-3 text-sm text-text-secondary">{stat.label}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
      <GlassDivider className="mt-0" />
    </section>
  )
}

function CTASection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[120px]" />
      </div>

      <div className="container-premium relative z-10">
        <Reveal>
          <Card className="relative overflow-hidden text-center">
            <div className="pointer-events-none absolute -inset-px bg-gradient-to-br from-accent/10 via-gold/5 to-transparent opacity-50" />
            <div className="relative z-10 py-8 md:py-12">
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-text md:text-4xl lg:text-5xl">
                Ready to Build Something Amazing?
              </h2>
              <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-text-secondary">
                Let's turn your vision into a premium digital product. Get in touch
                and we'll make it happen.
              </p>
              <Button href="/contact" size="lg">
                Start Your Project
                <ArrowRight className="h-5 w-5 shrink-0" />
              </Button>
            </div>
          </Card>
        </Reveal>
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
        'fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-glass backdrop-blur-xl transition-colors duration-300 hover:border-accent/50 hover:bg-glass-hover',
        visible ? 'pointer-events-auto' : 'pointer-events-none',
      )}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.8 }}
      transition={{ duration: 0.2 }}
      aria-label="Back to top"
    >
      <ArrowUp className="h-5 w-5 text-text-secondary" />
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
