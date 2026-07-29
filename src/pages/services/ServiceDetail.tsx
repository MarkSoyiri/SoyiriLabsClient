import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
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
  CheckCircle,
  Clock,
  Layers,
  Lightbulb,
  Palette,
  Cog,
  ShieldCheck,
  Rocket,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { GlassDivider } from '@/components/ui/GlassDivider'
import Reveal from '@/components/animations/Reveal'
import TextReveal from '@/components/animations/TextReveal'

const servicesData = [
  {
    slug: 'website-design',
    icon: Monitor,
    title: 'Website Design',
    tagline: 'Beautiful, conversion-focused designs that captivate your audience.',
    description:
      'We craft visually stunning website designs that align perfectly with your brand identity and business objectives. Every design decision is rooted in user psychology and conversion optimization principles, ensuring your site not only looks exceptional but also drives measurable results. From wireframes to pixel-perfect mockups, we guide you through a collaborative design process that brings your vision to life.',
    detailedDescription:
      'Our website design process begins with understanding your brand, audience, and goals. We conduct thorough research to identify what resonates with your target market, then translate those insights into stunning visual designs. Every element — from typography and color palettes to spacing and imagery — is carefully chosen to create a cohesive, memorable brand experience that builds trust and drives engagement.',
    features: [
      'Custom UI/UX design tailored to your brand identity',
      'Fully responsive layouts optimized for all devices',
      'Interactive wireframing & high-fidelity prototyping',
      'Modern, accessible design systems with reusable components',
      'Conversion-focused layouts with strategic CTAs',
      'Brand guideline documentation & asset delivery',
    ],
    process: [
      {
        icon: Lightbulb,
        title: 'Discovery & Research',
        description: 'We analyze your brand, market, competitors, and target audience to inform the design direction.',
      },
      {
        icon: PenTool,
        title: 'Wireframing',
        description: 'We create low-fidelity wireframes that map out the user journey, content hierarchy, and page structure.',
      },
      {
        icon: Palette,
        title: 'Visual Design',
        description: 'We apply branding, color, typography, and imagery to create high-fidelity mockups that bring the vision to life.',
      },
      {
        icon: Cog,
        title: 'Prototyping & Testing',
        description: 'We build interactive prototypes and conduct usability testing to refine the experience before development.',
      },
    ],
  },
  {
    slug: 'website-development',
    icon: Code,
    title: 'Website Development',
    tagline: 'High-performance websites built with cutting-edge technologies.',
    description:
      'We build robust, scalable websites using modern frameworks and best practices. Our development team specializes in creating fast, secure, and maintainable web solutions that stand the test of time. Whether you need a simple marketing site or a complex platform, we have the technical expertise to deliver exceptional results that load quickly, rank well, and provide a seamless user experience.',
    detailedDescription:
      'Our development approach prioritizes performance, accessibility, and maintainability. We leverage modern frameworks like React, Next.js, and Node.js to build websites that are both powerful and flexible. Every project follows strict coding standards, includes comprehensive testing, and is optimized for Core Web Vitals. We also integrate content management systems that make it easy for your team to manage content without technical expertise.',
    features: [
      'Modern frontend development with React, Next.js, TypeScript',
      'Robust backend development with Node.js, Python, or PHP',
      'Headless CMS integration (Sanity, Strapi, WordPress)',
      'Custom functionality, APIs & third-party integrations',
      'Performance optimization for fast load times',
      'Comprehensive testing & quality assurance',
    ],
    process: [
      {
        icon: Lightbulb,
        title: 'Technical Planning',
        description: 'We define the architecture, technology stack, and development roadmap based on your requirements.',
      },
      {
        icon: Code,
        title: 'Development',
        description: 'Our developers build your website iteratively using agile methodology with regular check-ins.',
      },
      {
        icon: ShieldCheck,
        title: 'Testing & QA',
        description: 'We conduct thorough testing across browsers, devices, and edge cases to ensure flawless performance.',
      },
      {
        icon: Cloud,
        title: 'Deployment & Launch',
        description: 'We deploy your site to production with CI/CD pipelines, monitoring, and ongoing support.',
      },
    ],
  },
  {
    slug: 'web-applications',
    icon: AppWindow,
    title: 'Web Applications',
    tagline: 'Powerful data-driven applications built for scale and performance.',
    description:
      'We design and develop custom web applications that solve complex business challenges. From SaaS platforms to internal tools, our applications are built with scalability, security, and user experience at their core. Leveraging modern full-stack technologies and cloud infrastructure, we deliver solutions that handle thousands of users with ease while maintaining lightning-fast performance.',
    detailedDescription:
      'Our web application development combines robust backend architecture with intuitive frontend interfaces. We specialize in building real-time applications, data dashboards, e-commerce platforms, and enterprise-grade tools. Using technologies like React, Node.js, PostgreSQL, and cloud services from AWS and Vercel, we create applications that are not only powerful but also maintainable and cost-effective to run.',
    features: [
      'Full-stack development with modern frameworks',
      'Real-time data processing & WebSocket integration',
      'Third-party API integrations & custom microservices',
      'Scalable cloud architecture on AWS, Vercel, or Azure',
      'Authentication, authorization & role-based access',
      'Comprehensive analytics & monitoring dashboards',
    ],
    process: [
      {
        icon: Lightbulb,
        title: 'Discovery & Architecture',
        description: 'We define requirements, user stories, and system architecture to guide the development process.',
      },
      {
        icon: Code,
        title: 'Iterative Development',
        description: 'We build the application in sprints, delivering working features at the end of each cycle.',
      },
      {
        icon: ShieldCheck,
        title: 'Testing & Security',
        description: 'We perform automated testing, security audits, and load testing to ensure reliability.',
      },
      {
        icon: Cloud,
        title: 'Deployment & Scaling',
        description: 'We deploy with CI/CD, set up monitoring, and implement auto-scaling for growing user bases.',
      },
    ],
  },
  {
    slug: 'ui-ux-design',
    icon: PenTool,
    title: 'UI/UX Design',
    tagline: 'User-centered experiences that delight and drive engagement.',
    description:
      'We create intuitive, engaging user experiences that make your digital products a joy to use. Our UX process is grounded in research and data, ensuring every interaction feels natural and purposeful. From mobile apps to complex enterprise dashboards, we design interfaces that users love, reducing friction and boosting satisfaction at every touchpoint.',
    detailedDescription:
      'Our UI/UX design service goes beyond aesthetics. We dive deep into user behavior through research, analytics, and testing to understand what drives your users. We then craft experiences that anticipate their needs, reduce friction, and create moments of delight. The result is a product that not only looks beautiful but also performs exceptionally in terms of user engagement, retention, and conversion.',
    features: [
      'User research, interviews & persona development',
      'User journey mapping & information architecture',
      'Interaction design with micro-animations & transitions',
      'Usability testing & iterative design refinement',
      'Comprehensive design system & component libraries',
      'Accessibility-first design (WCAG 2.1 AA compliant)',
    ],
    process: [
      {
        icon: Lightbulb,
        title: 'Research & Discovery',
        description: 'We conduct user research, competitive analysis, and stakeholder interviews to gather insights.',
      },
      {
        icon: PenTool,
        title: 'Ideation & Prototyping',
        description: 'We sketch, wireframe, and prototype ideas, iterating quickly to find the best solutions.',
      },
      {
        icon: Palette,
        title: 'Visual Design',
        description: 'We craft pixel-perfect designs with carefully considered typography, color, and spacing.',
      },
      {
        icon: ShieldCheck,
        title: 'Testing & Handoff',
        description: 'We validate designs through usability testing and deliver detailed specs for development.',
      },
    ],
  },
  {
    slug: 'website-maintenance',
    icon: Wrench,
    title: 'Website Maintenance',
    tagline: 'Keep your website secure, updated, and running at peak performance.',
    description:
      'We provide comprehensive website maintenance services to ensure your site remains secure, up-to-date, and performing optimally. Our proactive approach catches issues before they become problems, giving you peace of mind and freeing you to focus on growing your business. From security patches to content updates, we handle every aspect of keeping your digital presence in top shape.',
    detailedDescription:
      'Website maintenance is critical for security, performance, and user experience. Our maintenance plans are tailored to your specific needs, whether you require monthly check-ins or round-the-clock monitoring. We handle everything from WordPress core updates and plugin management to performance optimization, security scanning, and content refreshes. Our team acts as your dedicated digital caretaker.',
    features: [
      'Regular security updates, patches & vulnerability scanning',
      'Content updates, blog posts & media management',
      'Performance monitoring & optimization',
      'Automated backups & disaster recovery planning',
      'Uptime monitoring with 24/7 alerting',
      'Monthly performance & security reports',
    ],
    process: [
      {
        icon: Lightbulb,
        title: 'Assessment & Planning',
        description: 'We audit your current site and create a customized maintenance plan tailored to your needs.',
      },
      {
        icon: Wrench,
        title: 'Regular Maintenance',
        description: 'We perform scheduled updates, backups, and security scans to keep your site healthy.',
      },
      {
        icon: Zap,
        title: 'Performance Optimization',
        description: 'We continuously monitor and optimize your site speed, Core Web Vitals, and overall performance.',
      },
      {
        icon: ShieldCheck,
        title: 'Security & Support',
        description: 'We provide ongoing security monitoring and responsive support for any issues that arise.',
      },
    ],
  },
  {
    slug: 'website-optimization',
    icon: Zap,
    title: 'Website Optimization',
    tagline: 'Supercharge your website speed and performance for better rankings.',
    description:
      'We optimize your website for speed, performance, and user experience. Our data-driven optimization process targets every layer of your site — from server configuration and code to images and assets — to deliver blazing-fast load times. The result is better search rankings, higher conversion rates, and a superior experience for every visitor.',
    detailedDescription:
      'Website speed is a critical factor in user experience, SEO rankings, and conversion rates. Our optimization experts conduct a comprehensive audit of your site, identifying bottlenecks and implementing targeted improvements. We optimize images, minify code, implement caching strategies, improve server response times, and fine-tune database queries. Every optimization is measured and validated to ensure real, tangible improvements.',
    features: [
      'Core Web Vitals assessment & improvement',
      'Image compression, WebP conversion & lazy loading',
      'Code splitting, minification & tree shaking',
      'Server optimization & CDN configuration',
      'Database query optimization & caching strategies',
      'Performance monitoring with actionable insights',
    ],
    process: [
      {
        icon: Lightbulb,
        title: 'Performance Audit',
        description: 'We conduct a comprehensive audit using Lighthouse, WebPageTest, and real user monitoring data.',
      },
      {
        icon: Zap,
        title: 'Implementation',
        description: 'We implement targeted optimizations across code, assets, server, and infrastructure layers.',
      },
      {
        icon: ShieldCheck,
        title: 'Testing & Validation',
        description: 'We test across devices and connection speeds to validate improvements and ensure no regressions.',
      },
      {
        icon: BarChartAlt,
        title: 'Monitoring & Reporting',
        description: 'We set up ongoing performance monitoring and provide regular reports on key metrics.',
      },
    ],
  },
  {
    slug: 'website-redesign',
    icon: RefreshCw,
    title: 'Website Redesign',
    tagline: 'Strategic redesigns that modernize your brand and boost conversions.',
    description:
      'We breathe new life into your online presence with strategic website redesigns that respect your existing SEO equity while delivering a fresh, modern experience. Our redesign process balances aesthetics with functionality, ensuring your new site not only looks amazing but also performs better than ever. We minimize disruption and maximize impact.',
    detailedDescription:
      'A website redesign is a significant undertaking that requires careful planning to preserve SEO rankings and user experience. Our approach begins with a thorough analysis of your current site — what is working, what is not, and what opportunities exist. We then craft a redesigned experience that modernizes your brand, improves usability, and drives better business results, all while ensuring a seamless migration that protects your search rankings.',
    features: [
      'SEO-preserving migration strategy & 301 redirects',
      'Complete visual refresh aligned with brand evolution',
      'Information architecture & content restructuring',
      'Conversion rate optimization throughout the redesign',
      'Mobile-first responsive design approach',
      'Post-launch monitoring & performance comparison',
    ],
    process: [
      {
        icon: Lightbulb,
        title: 'Audit & Strategy',
        description: 'We analyze your current site, SEO performance, analytics, and user feedback to inform the redesign.',
      },
      {
        icon: PenTool,
        title: 'Design & Prototyping',
        description: 'We create new designs and prototypes, iterating based on feedback and usability testing.',
      },
      {
        icon: Code,
        title: 'Development & Migration',
        description: 'We build the new site with careful attention to SEO preservation and seamless content migration.',
      },
      {
        icon: Rocket,
        title: 'Launch & Optimization',
        description: 'We launch the redesigned site, monitor performance, and fine-tune based on real user data.',
      },
    ],
  },
  {
    slug: 'seo-optimization',
    icon: Search,
    title: 'SEO Optimization',
    tagline: 'Data-driven SEO strategies that grow your organic traffic.',
    description:
      'We implement comprehensive SEO strategies that improve your search visibility and drive qualified organic traffic. Our approach combines technical SEO expertise with content strategy and off-page optimization to deliver sustainable, long-term results. We focus on what actually moves the needle — from keyword research and on-page optimization to link building and analytics.',
    detailedDescription:
      'Search engine optimization is a multifaceted discipline that requires expertise across technical, content, and strategic domains. Our SEO services begin with a thorough audit of your current search presence, followed by a customized strategy that targets high-value opportunities. We optimize your site structure, content, and technical foundation while building authority through ethical link-building and content marketing.',
    features: [
      'Comprehensive technical SEO audits & fixes',
      'In-depth keyword research & content strategy',
      'On-page optimization (meta tags, headers, schema)',
      'Off-page SEO & ethical link-building campaigns',
      'Local SEO optimization & Google Business Profile',
      'Monthly performance reports & strategy adjustments',
    ],
    process: [
      {
        icon: Search,
        title: 'SEO Audit & Analysis',
        description: 'We audit your current SEO performance, analyze competitors, and identify high-impact opportunities.',
      },
      {
        icon: Lightbulb,
        title: 'Strategy Development',
        description: 'We create a tailored SEO strategy targeting keywords, technical fixes, and content opportunities.',
      },
      {
        icon: Cog,
        title: 'Implementation',
        description: 'We execute on-page optimizations, technical fixes, and content creation aligned with the strategy.',
      },
      {
        icon: BarChartAlt,
        title: 'Monitoring & Refinement',
        description: 'We track rankings, traffic, and conversions, continuously refining the strategy for better results.',
      },
    ],
  },
  {
    slug: 'hosting-deployment',
    icon: Cloud,
    title: 'Hosting & Deployment',
    tagline: 'Enterprise-grade hosting with seamless deployment pipelines.',
    description:
      'We provide reliable, scalable hosting and deployment solutions tailored to your project needs. From CI/CD pipeline setup to cloud infrastructure management, we ensure your applications are deployed efficiently and run reliably. Our hosting solutions include 24/7 monitoring, automated backups, and enterprise-grade security — giving you complete peace of mind.',
    detailedDescription:
      'Getting your website or application online reliably is crucial. We manage the entire deployment process — from infrastructure setup and CI/CD pipeline configuration to ongoing hosting management. Whether you need Vercel for a Next.js site, AWS for a complex application, or a managed WordPress host, we set everything up for optimal performance, security, and scalability.',
    features: [
      'Cloud hosting on AWS, Vercel, Netlify, or DigitalOcean',
      'Automated CI/CD pipelines for seamless deployments',
      'SSL/TLS certificate setup & management',
      'DDoS protection, WAF & security hardening',
      'Automated backups with point-in-time recovery',
      '24/7 uptime monitoring & incident response',
    ],
    process: [
      {
        icon: Lightbulb,
        title: 'Infrastructure Planning',
        description: 'We assess your requirements and design a hosting infrastructure that meets your needs.',
      },
      {
        icon: Cloud,
        title: 'Setup & Configuration',
        description: 'We configure servers, databases, CDN, SSL, and CI/CD pipelines for automated deployments.',
      },
      {
        icon: ShieldCheck,
        title: 'Security Hardening',
        description: 'We implement security best practices including firewalls, encryption, and access controls.',
      },
      {
        icon: Cog,
        title: 'Monitoring & Support',
        description: 'We provide ongoing monitoring, maintenance, and responsive support for your hosting environment.',
      },
    ],
  },
]

const relatedServicesMap: Record<string, string[]> = {
  'website-design': ['website-development', 'ui-ux-design', 'website-redesign'],
  'website-development': ['web-applications', 'website-design', 'hosting-deployment'],
  'web-applications': ['website-development', 'ui-ux-design', 'hosting-deployment'],
  'ui-ux-design': ['website-design', 'website-development', 'website-redesign'],
  'website-maintenance': ['website-optimization', 'hosting-deployment', 'website-development'],
  'website-optimization': ['website-development', 'seo-optimization', 'hosting-deployment'],
  'website-redesign': ['website-design', 'website-development', 'seo-optimization'],
  'seo-optimization': ['website-optimization', 'website-redesign', 'website-development'],
  'hosting-deployment': ['website-development', 'web-applications', 'website-optimization'],
}

function BarChartAlt({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="16" />
    </svg>
  )
}

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>()
  const service = servicesData.find((s) => s.slug === slug)
  const relatedSlugs = slug ? relatedServicesMap[slug] ?? [] : []
  const relatedServices = relatedSlugs
    .map((s) => servicesData.find((svc) => svc.slug === s))
    .filter(Boolean)

  if (!service) {
    return (
      <section className="flex min-h-[60vh] flex-col items-center justify-center px-4 pt-24 text-center">
        <Helmet>
          <title>Service Not Found | Soyiri Labs</title>
        </Helmet>
        <h1 className="mb-4 text-4xl font-bold text-text">Service Not Found</h1>
        <p className="mb-8 text-text-secondary">
          The service you are looking for does not exist or may have been moved.
        </p>
        <Button href="/services" variant="primary">
          View All Services
          <ArrowRight className="h-4 w-4 shrink-0" />
        </Button>
      </section>
    )
  }

  return (
    <>
      <Helmet>
        <title>{service.title} | Soyiri Labs</title>
        <meta
          name="description"
          content={service.description.slice(0, 160)}
        />
      </Helmet>

      {/* Hero */}
      <section className="relative overflow-hidden pb-20 pt-14 md:pb-32 md:pt-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/4 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[120px]" />
          <div className="absolute right-0 top-1/3 h-[300px] w-[300px] rounded-full bg-purple-500/10 blur-[100px]" />
        </div>
        <div className="container-premium px-4">
          <Reveal>
            <Link
              to="/services"
              className="mb-6 inline-flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-accent-light"
            >
              <ArrowRight className="h-4 w-4 shrink-0 rotate-180" />
              Back to Services
            </Link>
          </Reveal>
          <div className="max-w-3xl">
            <Reveal>
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-sm text-accent-light">
                <service.icon className="h-4 w-4" />
                {service.title}
              </span>
            </Reveal>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-text md:text-5xl lg:text-7xl">
              <TextReveal text={service.title} />
            </h1>
            <Reveal delay={0.3}>
              <p className="text-lg text-text-secondary md:text-xl">{service.tagline}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <GlassDivider />

      {/* Details */}
      <section className="section-padding">
        <div className="container-premium px-4">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Reveal>
                <h2 className="mb-6 text-2xl font-bold text-text md:text-3xl">Overview</h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mb-8 text-lg leading-relaxed text-text-secondary">{service.description}</p>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mb-8 text-lg leading-relaxed text-text-secondary">{service.detailedDescription}</p>
              </Reveal>

              <GlassDivider className="my-10" />

              {/* Features */}
              <Reveal>
                <h2 className="mb-6 text-2xl font-bold text-text md:text-3xl">Key Features</h2>
              </Reveal>
              <div className="mb-10 grid gap-4 sm:grid-cols-2">
                {service.features.map((feature, i) => (
                  <Reveal key={feature} delay={i * 0.05}>
                    <div className="flex items-start gap-3 rounded-xl bg-glass p-4">
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent-light" />
                      <span className="text-text-secondary">{feature}</span>
                    </div>
                  </Reveal>
                ))}
              </div>

              <GlassDivider className="my-10" />

              {/* Process */}
              <Reveal>
                <h2 className="mb-6 text-2xl font-bold text-text md:text-3xl">
                  Our Process
                </h2>
              </Reveal>
              <div className="space-y-6">
                {service.process.map((step, i) => (
                  <Reveal key={step.title} delay={i * 0.1}>
                    <div className="relative flex gap-5 rounded-xl bg-glass p-5 md:p-6">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                        <step.icon className="h-6 w-6 text-accent-light" />
                      </div>
                      <div className="flex-1">
                        <div className="mb-1 flex items-center gap-2">
                          <span className="text-xs font-semibold uppercase tracking-wider text-accent-light">
                            Step {i + 1}
                          </span>
                        </div>
                        <h3 className="mb-2 text-lg font-semibold text-text">{step.title}</h3>
                        <p className="text-text-secondary leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Sidebar — Related Services */}
            <aside>
              <div className="sticky top-28">
                <Reveal>
                  <Card className="p-6">
                    <div className="mb-5 flex items-center gap-2">
                      <Layers className="h-5 w-5 text-accent-light" />
                      <h3 className="text-lg font-semibold text-text">Related Services</h3>
                    </div>
                    <div className="space-y-3">
                      {relatedServices.length > 0 ? (
                        relatedServices.map((related) => {
                          if (!related) return null
                          const Icon = related.icon
                          return (
                            <Link
                              key={related.slug}
                              to={`/services/${related.slug}`}
                              className="group flex items-center gap-3 rounded-xl bg-glass-light p-3 transition-all duration-300 hover:bg-accent/10"
                            >
                              <Icon className="h-5 w-5 text-accent-light" />
                              <span className="text-sm font-medium text-text-secondary transition-colors group-hover:text-text">
                                {related.title}
                              </span>
                            </Link>
                          )
                        })
                      ) : (
                        <p className="text-sm text-text-muted">No related services available.</p>
                      )}
                    </div>
                  </Card>
                </Reveal>

                <Reveal delay={0.15}>
                  <Card className="mt-6 p-6 text-center">
                    <Clock className="mx-auto mb-4 h-8 w-8 text-accent-light" />
                    <h3 className="mb-2 text-lg font-semibold text-text">
                      Have a Project?
                    </h3>
                    <p className="mb-6 text-sm text-text-secondary">
                      Tell us about your needs and we will craft a solution tailored to you.
                    </p>
                    <Button href="/contact" size="sm" className="w-full">
                      Get in Touch
                    </Button>
                  </Card>
                </Reveal>
              </div>
            </aside>
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
            <SectionHeading
              title="Ready to Get Started?"
              description={`Let us discuss how our ${service.title.toLowerCase()} service can help achieve your goals.`}
            />
            <Reveal delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Button href="/contact" size="lg">
                  Start Your Project
                  <ArrowRight className="h-5 w-5 shrink-0" />
                </Button>
                <Button href="/portfolio" variant="secondary" size="lg">
                  See Our Work
                </Button>
              </div>
            </Reveal>
          </Card>
        </div>
      </section>
    </>
  )
}
