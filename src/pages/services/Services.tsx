import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Monitor,
  Code,
  AppWindow,
  PenTool,
  Wrench,
  Zap,
  RefreshCw,
  Search,
  Cloud,
  ArrowRight,
  Layers,
  CheckCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { SectionHeading } from '@/components/ui/SectionHeading'
import Reveal from '@/components/animations/Reveal'
import TextReveal from '@/components/animations/TextReveal'
import { cn } from '@/lib/utils'

const services = [
  {
    icon: Monitor,
    title: 'Website Design',
    slug: 'website-design',
    description:
      'Beautiful, conversion-focused website designs tailored to your brand identity and business goals.',
    features: [
      'Custom UI/UX design tailored to your brand',
      'Responsive layouts for all devices',
      'Wireframing & prototyping',
      'Modern, accessible design systems',
    ],
    color: 'bg-violet/10 text-violet',
  },
  {
    icon: Code,
    title: 'Website Development',
    slug: 'website-development',
    description:
      'High-performance websites built with modern technologies for speed, scalability, and reliability.',
    features: [
      'Frontend & backend development',
      'CMS integration (Sanity, WordPress, etc.)',
      'Custom functionality & features',
      'Performance optimization',
    ],
    color: 'bg-action/10 text-action',
  },
  {
    icon: AppWindow,
    title: 'Web Applications',
    slug: 'web-applications',
    description:
      'Powerful, data-driven web applications designed to solve complex business challenges at scale.',
    features: [
      'Full-stack application development',
      'Real-time data processing',
      'Third-party API integrations',
      'Scalable cloud architecture',
    ],
    color: 'bg-cyan/10 text-cyan',
  },
  {
    icon: PenTool,
    title: 'UI/UX Design',
    slug: 'ui-ux-design',
    description:
      'User-centered design experiences that delight users and drive engagement across every touchpoint.',
    features: [
      'User research & personas',
      'Interaction design & micro-animations',
      'Usability testing & iteration',
      'Design system creation',
    ],
    color: 'bg-magenta/10 text-magenta',
  },
  {
    icon: Wrench,
    title: 'Website Maintenance',
    slug: 'website-maintenance',
    description:
      'Ongoing maintenance and support to keep your website secure, updated, and running flawlessly.',
    features: [
      'Regular security updates & patches',
      'Content updates & management',
      'Performance monitoring',
      'Backup & disaster recovery',
    ],
    color: 'bg-lime/10 text-lime',
  },
  {
    icon: Zap,
    title: 'Website Optimization',
    slug: 'website-optimization',
    description:
      'Speed and performance optimization services to improve user experience and search rankings.',
    features: [
      'Core Web Vitals optimization',
      'Image & asset optimization',
      'Code splitting & lazy loading',
      'Server & database tuning',
    ],
    color: 'bg-action-sky/10 text-action-sky',
  },
  {
    icon: RefreshCw,
    title: 'Website Redesign',
    slug: 'website-redesign',
    description:
      'Strategic redesigns that modernize your online presence while preserving SEO equity and usability.',
    features: [
      'SEO-preserving migration',
      'Visual refresh & rebranding',
      'Information architecture overhaul',
      'Conversion rate optimization',
    ],
    color: 'bg-violet/10 text-violet',
  },
  {
    icon: Search,
    title: 'SEO Optimization',
    slug: 'seo-optimization',
    description:
      'Data-driven SEO strategies that boost visibility, drive organic traffic, and grow your audience.',
    features: [
      'Technical SEO audits',
      'On-page & off-page optimization',
      'Keyword research & strategy',
      'Analytics & performance reporting',
    ],
    color: 'bg-cyan/10 text-cyan',
  },
  {
    icon: Cloud,
    title: 'Hosting & Deployment',
    slug: 'hosting-deployment',
    description:
      'Reliable hosting and deployment solutions with enterprise-grade infrastructure and 24/7 support.',
    features: [
      'Cloud hosting (AWS, Vercel, Netlify)',
      'CI/CD pipeline setup',
      'SSL & security configuration',
      '99.9% uptime guarantee',
    ],
    color: 'bg-action/10 text-action',
  },
]

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const staggerItem = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
  },
}

export default function Services() {
  return (
    <>
      <Helmet>
        <title>Services | Soyiri Labs — Web Development, Design & SEO</title>
        <meta
          name="description"
          content="Explore Soyiri Labs' full range of digital services including website design, development, web applications, UI/UX design, SEO, hosting, and more."
        />
      </Helmet>

      {/* Hero */}
      <section className="tile-light relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 grid-bg" />
        <div className="pointer-events-none absolute -top-28 right-[-10%] h-[520px] w-[520px] blob-electric" />
        <div className="pointer-events-none absolute bottom-[-22%] left-[-10%] h-[480px] w-[480px] blob-cyan opacity-60" />
        <div className="pointer-events-none absolute bottom-[25%] right-[20%] h-[280px] w-[280px] blob-magenta opacity-40" />

        <div className="relative container-site px-4 pb-24 pt-16 text-center md:pb-32 md:pt-24">
          <Reveal>
            <span className="mb-8 inline-flex items-center gap-2 rounded-full border border-hairline bg-canvas/80 px-4 py-2 text-caption-strong text-ink shadow-hard-sm">
              <Layers className="h-4 w-4 text-action" />
              Our Services
            </span>
          </Reveal>
          <h1 className="mb-6 text-hero-display text-ink">
            <TextReveal text="What we" as="span" />
            <span className="text-serif-accent block text-action">deliver</span>
          </h1>
          <Reveal delay={0.3}>
            <p className="mx-auto max-w-2xl text-lead-airy text-ink-80">
              From concept to launch and beyond, we offer end-to-end digital services that help
              businesses thrive in the modern online landscape.
            </p>
          </Reveal>
          <Reveal delay={0.45}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3.5">
              <Button href="/contact" size="lg">
                Start a Project
                <ArrowRight className="h-5 w-5 shrink-0" />
              </Button>
              <Button href="/portfolio" variant="secondary" size="lg">
                See Our Work
              </Button>
            </div>
          </Reveal>
        </div>

        <div className="pointer-events-none absolute bottom-1 left-1/2 hidden -translate-x-1/2 select-none whitespace-nowrap text-[10rem] font-bold uppercase leading-none tracking-tighter text-outline lg:block">
          Services
        </div>
      </section>

      {/* Services Grid */}
      <section className="tile-parchment tile">
        <div className="container-site px-4">
          <SectionHeading
            label="What We Do"
            title={
              <>
                Nine ways to <span className="text-serif-accent text-action">grow your business</span>
              </>
            }
            description="Every service is designed to deliver measurable impact and exceptional quality."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {services.map((service, i) => (
              <motion.div key={service.slug} variants={staggerItem}>
                <Link to={`/services/${service.slug}`} className="group block h-full">
                  <Card hover className="flex h-full flex-col p-8">
                    <div className="mb-5 flex items-center justify-between">
                      <div className={cn('inline-flex rounded-xl p-3 transition-transform duration-300 group-hover:-rotate-6', service.color)}>
                        <service.icon className="h-6 w-6" />
                      </div>
                      <span className="select-none font-display text-3xl font-bold tracking-tight text-outline">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="mb-3 text-tagline text-ink">{service.title}</h3>
                    <p className="mb-5 flex-1 leading-relaxed text-ink-80">
                      {service.description}
                    </p>
                    <ul className="mb-6 space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-[15px] text-ink-48">
                          <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-action" />
                          <span className="min-w-0">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <span className="inline-flex items-center gap-2 text-[15px] font-semibold text-action">
                      Learn More
                      <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="tile-electric tile relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 grid-bg-dark" />
        <div className="pointer-events-none absolute -left-24 top-1/2 h-[380px] w-[380px] -translate-y-1/2 blob-violet" />
        <div className="pointer-events-none absolute -right-24 top-0 h-[320px] w-[320px] blob-cyan" />
        <div className="relative">
          <div className="container-site px-4">
            <Reveal>
              <div className="text-center">
                <h2 className="text-display-lg text-white text-balance">
                  Need a custom <span className="text-serif-accent">solution?</span>
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-lead-airy text-white/80">
                  Every business is unique. Tell us about your project and we will tailor a solution that fits your specific needs and goals.
                </p>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-3.5">
                  <Button
                    href="/contact"
                    size="lg"
                    variant="white"
                  >
                    Get a Free Consultation
                    <ArrowRight className="h-5 w-5 shrink-0" />
                  </Button>
                  <Button
                    href="/portfolio"
                    variant="outline-light"
                    size="lg"
                  >
                    View Our Work
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
