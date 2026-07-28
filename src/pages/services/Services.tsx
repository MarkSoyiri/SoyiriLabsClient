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
import { GlassDivider } from '@/components/ui/GlassDivider'
import Reveal from '@/components/animations/Reveal'
import TextReveal from '@/components/animations/TextReveal'

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
  hidden: { opacity: 0, y: 40 },
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
      <section className="relative overflow-hidden pb-20 pt-32 md:pb-32 md:pt-40">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/4 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[120px]" />
          <div className="absolute left-0 top-1/3 h-[300px] w-[300px] rounded-full bg-purple-500/10 blur-[100px]" />
        </div>
        <div className="container-premium px-4 text-center">
          <Reveal>
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-sm text-accent-light">
              <Layers className="h-4 w-4" />
              Our Services
            </span>
          </Reveal>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-text md:text-5xl lg:text-7xl">
            <TextReveal text="What We Deliver" />
          </h1>
          <Reveal delay={0.3}>
            <p className="mx-auto max-w-2xl text-lg text-text-secondary md:text-xl">
              From concept to launch and beyond, we offer end-to-end digital services that help
              businesses thrive in the modern online landscape.
            </p>
          </Reveal>
        </div>
      </section>

      <GlassDivider />

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-premium px-4">
          <SectionHeading
            label="What We Do"
            title="Complete Digital Solutions"
            description="Every service is designed to deliver measurable impact and exceptional quality."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {services.map((service) => (
              <motion.div key={service.slug} variants={staggerItem}>
                <Link to={`/services/${service.slug}`} className="group block h-full">
                  <Card hover glow className="flex h-full flex-col p-8">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 transition-colors duration-300 group-hover:bg-accent/20">
                      <service.icon className="h-6 w-6 text-accent-light" />
                    </div>
                    <h3 className="mb-3 text-xl font-semibold text-text">{service.title}</h3>
                    <p className="mb-5 flex-1 text-text-secondary leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="mb-6 space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm text-text-muted">
                          <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent-light" />
                          <span className="min-w-0">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-accent-light transition-all duration-300 group-hover:gap-3">
                      Learn More
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <GlassDivider />

      {/* CTA */}
      <section className="section-padding">
        <div className="container-premium px-4">
          <Card glow border className="relative overflow-hidden p-10 text-center md:p-16">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[80px]" />
            </div>
            <SectionHeading
              title="Need a Custom Solution?"
              description="Every business is unique. Tell us about your project and we will tailor a solution that fits your specific needs and goals."
            />
            <Reveal delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Button href="/contact" size="lg">
                  Get a Free Consultation
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <Button href="/portfolio" variant="secondary" size="lg">
                  View Our Work
                </Button>
              </div>
            </Reveal>
          </Card>
        </div>
      </section>
    </>
  )
}
