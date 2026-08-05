import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import {
  Lightbulb,
  Users,
  Target,
  ArrowRight,
  Briefcase,
  Rocket,
  Code,
  HeartHandshake,
  Clock,
  BarChart3,
  Award,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { SectionHeading } from '@/components/ui/SectionHeading'
import Reveal from '@/components/animations/Reveal'
import TextReveal from '@/components/animations/TextReveal'
import { cn } from '@/lib/utils'

const values = [
  {
    icon: Lightbulb,
    title: 'Innovation',
    description:
      'We embrace emerging technologies and creative thinking to deliver solutions that push boundaries and set new standards in digital excellence.',
    color: 'bg-action/10 text-action',
  },
  {
    icon: Award,
    title: 'Quality',
    description:
      'Every line of code we write and every pixel we place meets rigorous quality standards. We never compromise on the excellence our clients deserve.',
    color: 'bg-violet/10 text-violet',
  },
  {
    icon: HeartHandshake,
    title: 'Transparency',
    description:
      'Open communication and honest collaboration form the foundation of our client relationships. We keep you informed at every stage of the journey.',
    color: 'bg-cyan/10 text-cyan',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description:
      'We believe the best results come from working together. Our team integrates seamlessly with yours to bring collective expertise to every project.',
    color: 'bg-lime/10 text-lime',
  },
  {
    icon: Target,
    title: 'Excellence',
    description:
      'Mediocrity is not an option. We strive for excellence in every project, continuously refining and perfecting until the result exceeds expectations.',
    color: 'bg-magenta/10 text-magenta',
  },
]

const reasons = [
  {
    icon: Code,
    title: 'Expert Team',
    description:
      'Our developers and designers bring years of experience across diverse industries and technologies.',
    color: 'text-action',
  },
  {
    icon: Rocket,
    title: 'Proven Track Record',
    description:
      'We have delivered 50+ successful projects with measurable results that help businesses grow.',
    color: 'text-cyan',
  },
  {
    icon: Clock,
    title: 'Timely Delivery',
    description:
      'Projects delivered on schedule without compromising quality, every time.',
    color: 'text-lime',
  },
  {
    icon: BarChart3,
    title: 'Results-Driven Approach',
    description:
      'Data-driven decisions focused on delivering tangible business outcomes for our clients.',
    color: 'text-magenta',
  },
]

const timeline = [
  {
    year: '2025',
    title: 'AI-Powered Solutions',
    description:
      'Launching AI-driven platforms that automate workflows and deliver intelligent insights for businesses of all sizes.',
  },
  {
    year: '2026',
    title: 'Global Expansion',
    description:
      'Expanding operations into new markets across North America and Asia, with a focus on enterprise-level partnerships.',
  },
  {
    year: '2027',
    title: 'Industry Leadership',
    description:
      'Becoming a recognized leader in digital innovation, shaping industry standards and driving technological advancement.',
  },
]

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
  },
}

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Soyiri Labs | Digital Innovation Agency</title>
        <meta
          name="description"
          content="Learn about Soyiri Labs — a digital innovation agency specializing in web development, UI/UX design, and SEO. Discover our mission, vision, and values."
        />
      </Helmet>

      {/* Hero */}
      <section className="tile-light relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 grid-bg" />
        <div className="pointer-events-none absolute -top-28 right-[-10%] h-[520px] w-[520px] blob-electric" />
        <div className="pointer-events-none absolute bottom-[-22%] left-[-10%] h-[480px] w-[480px] blob-violet" />
        <div className="pointer-events-none absolute bottom-[24%] right-[22%] h-[280px] w-[280px] blob-cyan opacity-50" />

        <div className="relative container-site px-4 pb-24 pt-16 text-center md:pb-32 md:pt-24">
          <Reveal>
            <span className="mb-8 inline-flex items-center gap-2 rounded-full border border-hairline bg-canvas/80 px-4 py-2 text-caption-strong text-ink shadow-hard-sm">
              <Briefcase className="h-4 w-4 text-action" />
              About Us
            </span>
          </Reveal>
          <h1 className="mb-6 text-hero-display text-ink">
            <TextReveal text="The team behind" as="span" />
            <span className="text-serif-accent block text-action">the pixels</span>
          </h1>
          <Reveal delay={0.3}>
            <p className="mx-auto max-w-2xl text-lead-airy text-ink-80">
              We are a passionate team of designers, developers, and strategists dedicated to crafting
              exceptional digital experiences that drive real business growth.
            </p>
          </Reveal>
          <Reveal delay={0.45}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3.5">
              <Button href="/contact" size="lg">
                Work With Us
                <ArrowRight className="h-5 w-5 shrink-0" />
              </Button>
              <Button href="/portfolio" variant="secondary" size="lg">
                See Our Work
              </Button>
            </div>
          </Reveal>
        </div>

        <div className="pointer-events-none absolute bottom-1 left-1/2 hidden -translate-x-1/2 select-none whitespace-nowrap text-[10rem] font-bold uppercase leading-none tracking-tighter text-outline lg:block">
          Soyiri
        </div>
      </section>

      {/* Story */}
      <section className="tile-parchment tile">
        <div className="container-site px-4">
          <div className="mx-auto max-w-3xl">
            <SectionHeading
              label="Our Story"
              title={
                <>
                  Built on passion, <span className="text-serif-accent text-violet">driven by purpose</span>
                </>
              }
              description="How Soyiri Labs evolved from a bold idea into a thriving digital innovation agency."
              align="center"
            />
            <div className="mt-12 space-y-6">
              <Reveal>
                <p className="text-lg leading-relaxed text-ink-80">
                  Soyiri Labs was founded in 2020 with a simple yet powerful belief: that every
                  business, regardless of size, deserves access to world-class digital solutions. What
                  started as a small team of three passionate developers has grown into a full-service
                  digital agency serving clients across the globe.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="text-lg leading-relaxed text-ink-80">
                  Our journey has been defined by a relentless pursuit of innovation and a commitment
                  to quality that never wavers. We have had the privilege of working with startups
                  finding their footing, established enterprises scaling new heights, and everything
                  in between.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="text-lg leading-relaxed text-ink-80">
                  Today, Soyiri Labs stands as a testament to what is possible when talent meets
                  purpose. With a team of over 40 professionals spanning multiple continents, we
                  continue to push the boundaries of what digital experiences can achieve.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="tile-light tile">
        <div className="container-site px-4">
          <SectionHeading
            label="Our Direction"
            title={
              <>
                Mission <span className="text-serif-accent text-action">&</span> vision
              </>
            }
            description="The guiding principles that shape every project we undertake."
            align="center"
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            <Reveal direction="left">
              <Card hover className="h-full p-8">
                <div className="mb-6 inline-flex rounded-xl bg-action/10 p-4">
                  <Rocket className="h-7 w-7 text-action" />
                </div>
                <h3 className="mb-4 text-tagline text-ink">Our Mission</h3>
                <p className="text-[17px] leading-relaxed text-ink-80">
                  To empower businesses with innovative digital solutions that transform their online
                  presence, streamline operations, and drive sustainable growth through technology
                  and creativity.
                </p>
              </Card>
            </Reveal>
            <Reveal direction="right">
              <Card hover className="h-full p-8">
                <div className="mb-6 inline-flex rounded-xl bg-violet/10 p-4">
                  <Target className="h-7 w-7 text-violet" />
                </div>
                <h3 className="mb-4 text-tagline text-ink">Our Vision</h3>
                <p className="text-[17px] leading-relaxed text-ink-80">
                  To be the leading digital innovation partner in emerging markets, setting the
                  standard for excellence in web development, design, and digital strategy while
                  making a lasting impact on the businesses and communities we serve.
                </p>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="tile-parchment tile">
        <div className="container-site px-4">
          <SectionHeading
            label="Our Principles"
            title={
              <>
                The values we <span className="text-serif-accent text-magenta">live by</span>
              </>
            }
            description="The beliefs that define who we are and how we work."
            align="center"
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {values.map((value, i) => (
              <motion.div key={value.title} variants={staggerItem}>
                <Card hover className="group h-full p-8">
                  <div
                    className={cn(
                      'mb-5 inline-flex rounded-xl p-3.5 transition-transform duration-300 group-hover:-rotate-6',
                      value.color,
                    )}
                  >
                    <value.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-3 text-tagline text-ink">{value.title}</h3>
                  <p className="leading-relaxed text-ink-80">{value.description}</p>
                </Card>
              </motion.div>
            ))}
            <Reveal delay={0.4}>
              <div className="relative flex h-full min-h-[220px] flex-col justify-between overflow-hidden rounded-2xl border-2 border-ink bg-canvas p-8 shadow-hard">
                <div className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 blob-lime" />
                <h3 className="text-tagline text-ink">
                  Five values. <span className="text-serif-accent text-action">Zero compromise.</span>
                </h3>
                <p className="relative text-[15px] leading-relaxed text-ink-80">
                  These principles guide every decision, every line of code, and every conversation we have.
                </p>
              </div>
            </Reveal>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="tile-dark tile relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 grid-bg-dark" />
        <div className="pointer-events-none absolute -left-24 top-0 h-[380px] w-[380px] blob-electric" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-[380px] w-[380px] blob-cyan opacity-50" />
        <div className="relative">
          <div className="container-site px-4">
            <SectionHeading
              label="Why Soyiri Labs"
              title={
                <>
                  What sets us <span className="text-serif-accent text-action-sky">apart</span>
                </>
              }
              description="Four reasons why businesses trust us with their digital presence."
              align="center"
              onDark
            />
            <div className="mt-14 grid gap-5 md:grid-cols-2">
              {reasons.map((reason, i) => (
                <Reveal key={reason.title} delay={i * 0.08}>
                  <div className="group relative h-full rounded-2xl border border-white/10 bg-tile-2 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-action-sky/40">
                    <span className="pointer-events-none absolute right-5 top-4 select-none font-display text-6xl font-bold text-outline-light">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="relative flex items-start gap-5">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-white/12 bg-white/10">
                        <reason.icon className={cn('h-7 w-7', reason.color)} />
                      </div>
                      <div>
                        <h3 className="mb-2 text-tagline text-on-dark">{reason.title}</h3>
                        <p className="leading-relaxed text-on-dark-muted">{reason.description}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="tile-light tile relative overflow-hidden">
        <div className="container-site px-4">
          <SectionHeading
            label="Our Journey"
            title={
              <>
                Where we're <span className="text-serif-accent text-cyan">headed</span>
              </>
            }
            description="Key milestones that have shaped Soyiri Labs into what it is today."
            align="center"
          />
          <div className="relative mx-auto mt-16 max-w-3xl">
            <div className="absolute left-[7px] top-0 h-full w-px bg-hairline md:left-[118px]" />
            {timeline.map((item, i) => (
              <Reveal key={item.year} delay={i * 0.1}>
                <div className="relative mb-12 pl-[16px] last:mb-0 md:grid md:grid-cols-[120px_1fr] md:gap-8 md:pl-0">
                  <div className="absolute left-0 top-2 z-10 h-3.5 w-3.5 rounded-full border-2 border-action bg-canvas md:left-[111px]" />
                  <div className="hidden select-none pb-2 font-display text-4xl font-bold tracking-tight text-outline md:block">
                    {item.year}
                  </div>
                  <div className="min-w-0 pb-2 md:pl-0">
                    <span className="mb-2 inline-block text-caption-strong uppercase tracking-[0.14em] text-action md:hidden">
                      {item.year}
                    </span>
                    <h3 className="mb-2 text-xl font-semibold tracking-tight text-ink">{item.title}</h3>
                    <p className="leading-relaxed text-ink-80">{item.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
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
                  Ready to build something
                  <br />
                  <span className="text-serif-accent">great together?</span>
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-lead-airy text-white/80">
                  Let us help you build something amazing. Get in touch and let us discuss your next project.
                </p>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-3.5">
                  <Button
                    href="/contact"
                    size="lg"
                    variant="white"
                  >
                    Start a Project
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
        </div>
      </section>
    </>
  )
}
