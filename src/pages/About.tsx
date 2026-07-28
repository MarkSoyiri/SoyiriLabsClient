import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Lightbulb,
  Users,
  Target,
  CheckCircle,
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
import { GlassDivider } from '@/components/ui/GlassDivider'
import Reveal from '@/components/animations/Reveal'
import TextReveal from '@/components/animations/TextReveal'

const values = [
  {
    icon: Lightbulb,
    title: 'Innovation',
    description:
      'We embrace emerging technologies and creative thinking to deliver solutions that push boundaries and set new standards in digital excellence.',
  },
  {
    icon: Award,
    title: 'Quality',
    description:
      'Every line of code we write and every pixel we place meets rigorous quality standards. We never compromise on the excellence our clients deserve.',
  },
  {
    icon: HeartHandshake,
    title: 'Transparency',
    description:
      'Open communication and honest collaboration form the foundation of our client relationships. We keep you informed at every stage of the journey.',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description:
      'We believe the best results come from working together. Our team integrates seamlessly with yours to bring collective expertise to every project.',
  },
  {
    icon: Target,
    title: 'Excellence',
    description:
      'Mediocrity is not an option. We strive for excellence in every project, continuously refining and perfecting until the result exceeds expectations.',
  },
]

const reasons = [
  {
    icon: Code,
    title: 'Expert Team',
    description:
      'Our developers, designers, and strategists bring years of experience across diverse industries and technologies.',
  },
  {
    icon: Rocket,
    title: 'Proven Track Record',
    description:
      'We have delivered 50+ successful projects with measurable results, helping businesses grow and transform digitally.',
  },
  {
    icon: Clock,
    title: 'Timely Delivery',
    description:
      'We respect your time. Our agile methodology ensures projects are delivered on schedule without compromising quality.',
  },
  {
    icon: BarChart3,
    title: 'Results-Driven Approach',
    description:
      'Every decision we make is guided by data and focused on delivering tangible business outcomes for our clients.',
  },
]

const timeline = [
  {
    year: '2020',
    title: 'The Beginning',
    description:
      'Soyiri Labs was founded with a vision to bridge the gap between businesses and cutting-edge digital solutions.',
  },
  {
    year: '2021',
    title: 'First Major Milestone',
    description:
      'Launched our first enterprise platform, growing the team to 15 members and establishing our development methodology.',
  },
  {
    year: '2022',
    title: 'Expansion & Growth',
    description:
      'Expanded services to include UI/UX design and SEO optimization. Partnered with 20+ businesses across Africa and Europe.',
  },
  {
    year: '2023',
    title: 'Industry Recognition',
    description:
      'Named among top digital agencies. Launched our proprietary framework and opened a second office location.',
  },
  {
    year: '2024',
    title: 'Global Reach',
    description:
      'Served clients in 12+ countries. Crossed 50 completed projects and built partnerships with leading technology providers.',
  },
  {
    year: '2025',
    title: 'Innovation Hub',
    description:
      'Launched our innovation lab focused on AI-driven solutions, expanding our team to 40+ talented professionals worldwide.',
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
  hidden: { opacity: 0, y: 30 },
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
      <section className="relative overflow-hidden pb-20 pt-32 md:pb-32 md:pt-40">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/4 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[120px]" />
          <div className="absolute right-0 top-1/3 h-[300px] w-[300px] rounded-full bg-purple-500/10 blur-[100px]" />
        </div>
        <div className="container-premium px-4 text-center">
          <Reveal>
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-sm text-accent-light">
              <Briefcase className="h-4 w-4" />
              About Us
            </span>
          </Reveal>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-text md:text-5xl lg:text-7xl">
            <TextReveal text="About Soyiri Labs" />
          </h1>
          <Reveal delay={0.3}>
            <p className="mx-auto max-w-2xl text-lg text-text-secondary md:text-xl">
              We are a passionate team of designers, developers, and strategists dedicated to crafting
              exceptional digital experiences that drive real business growth.
            </p>
          </Reveal>
        </div>
      </section>

      <GlassDivider />

      {/* Story */}
      <section className="section-padding">
        <div className="container-premium px-4">
          <div className="mx-auto max-w-4xl">
            <SectionHeading
              label="Our Story"
              title="Built on Passion, Driven by Purpose"
              description="How Soyiri Labs evolved from a bold idea into a thriving digital innovation agency."
              align="center"
            />
            <div className="mt-12 space-y-6 text-text-secondary">
              <Reveal>
                <p className="text-lg leading-relaxed">
                  Soyiri Labs was founded in 2020 with a simple yet powerful belief: that every
                  business, regardless of size, deserves access to world-class digital solutions. What
                  started as a small team of three passionate developers has grown into a full-service
                  digital agency serving clients across the globe.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="text-lg leading-relaxed">
                  Our journey has been defined by a relentless pursuit of innovation and a commitment
                  to quality that never wavers. We have had the privilege of working with startups
                  finding their footing, established enterprises scaling new heights, and everything
                  in between.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="text-lg leading-relaxed">
                  Today, Soyiri Labs stands as a testament to what is possible when talent meets
                  purpose. With a team of over 40 professionals spanning multiple continents, we
                  continue to push the boundaries of what digital experiences can achieve.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <GlassDivider />

      {/* Mission & Vision */}
      <section className="section-padding">
        <div className="container-premium px-4">
          <SectionHeading
            label="Our Direction"
            title="Mission & Vision"
            description="The guiding principles that shape every project we undertake."
            align="center"
          />
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <Reveal direction="left">
              <Card glow border className="h-full p-8">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10">
                  <Rocket className="h-7 w-7 text-accent-light" />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-text">Our Mission</h3>
                <p className="text-lg leading-relaxed text-text-secondary">
                  To empower businesses with innovative digital solutions that transform their online
                  presence, streamline operations, and drive sustainable growth through technology
                  and creativity.
                </p>
              </Card>
            </Reveal>
            <Reveal direction="right">
              <Card glow border className="h-full p-8">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10">
                  <Target className="h-7 w-7 text-accent-light" />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-text">Our Vision</h3>
                <p className="text-lg leading-relaxed text-text-secondary">
                  To be the leading digital innovation partner in emerging markets, setting the
                  standard for excellence in web development, design, and digital strategy while
                  making a lasting impact on the businesses and communities we serve.
                </p>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      <GlassDivider />

      {/* Values */}
      <section className="section-padding">
        <div className="container-premium px-4">
          <SectionHeading
            label="Our Principles"
            title="Core Values"
            description="The beliefs that define who we are and how we work."
            align="center"
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                variants={staggerItem}
              >
                <Card hover glow className="group h-full p-8">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 transition-colors duration-300 group-hover:bg-accent/20">
                    <value.icon className="h-6 w-6 text-accent-light" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-text">{value.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <GlassDivider />

      {/* Why Choose Us */}
      <section className="section-padding">
        <div className="container-premium px-4">
          <SectionHeading
            label="Why Soyiri Labs"
            title="What Sets Us Apart"
            description="Four reasons why businesses trust us with their digital presence."
            align="center"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {reasons.map((reason, i) => (
              <Reveal key={reason.title} delay={i * 0.1}>
                <Card hover border className="flex items-start gap-5 p-6 md:p-8">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent/10">
                    <reason.icon className="h-7 w-7 text-accent-light" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-text">{reason.title}</h3>
                    <p className="text-text-secondary leading-relaxed">{reason.description}</p>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <GlassDivider />

      {/* Timeline */}
      <section className="section-padding">
        <div className="container-premium px-4">
          <SectionHeading
            label="Our Journey"
            title="Company Timeline"
            description="Key milestones that have shaped Soyiri Labs into what it is today."
            align="center"
          />
          <div className="relative mx-auto mt-16 max-w-3xl">
            <div className="absolute left-8 top-0 h-full w-px bg-gradient-to-b from-accent/50 via-accent/20 to-transparent md:left-1/2 md:-translate-x-px" />
            {timeline.map((item, i) => (
              <Reveal key={item.year} delay={i * 0.1}>
                <div
                  className={`relative mb-12 pl-20 last:mb-0 md:w-1/2 md:pl-0 ${
                    i % 2 === 0
                      ? 'md:pr-12 md:text-right'
                      : 'md:ml-auto md:pl-12'
                  }`}
                >
                  <div
                    className={`absolute left-[7px] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-primary md:left-auto ${
                      i % 2 === 0 ? 'md:right-[-7px]' : 'md:left-[-7px]'
                    }`}
                  />
                  <span className="mb-2 inline-block text-sm font-semibold text-accent-light">
                    {item.year}
                  </span>
                  <h3 className="mb-2 text-xl font-bold text-text">{item.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
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
            <Reveal>
              <CheckCircle className="mx-auto mb-6 h-12 w-12 text-accent-light" />
            </Reveal>
            <SectionHeading
              title="Ready to Work Together?"
              description="Let us help you build something amazing. Get in touch and let us discuss your next project."
            />
            <Reveal delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Button href="/contact" size="lg">
                  Start a Project
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <Button href="/services" variant="secondary" size="lg">
                  Explore Services
                </Button>
              </div>
            </Reveal>
          </Card>
        </div>
      </section>
    </>
  )
}
