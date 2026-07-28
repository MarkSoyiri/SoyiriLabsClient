import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { ArrowLeft, Calendar, Clock, User, Share2, MessageCircle, Link as LinkIcon, Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { GlassDivider } from '@/components/ui/GlassDivider'
import { Skeleton } from '@/components/ui/Skeleton'
import Reveal from '@/components/animations/Reveal'
import { blogApi } from '@/lib/api'
import { cn, formatDate } from '@/lib/utils'
import type { BlogPost } from '@/types'

const DEMO_POSTS: BlogPost[] = [
  {
    _id: 'b1',
    title: 'Building Scalable Microservices with Node.js and Docker',
    slug: 'building-scalable-microservices-nodejs-docker',
    excerpt: 'Learn how to architect and deploy production-ready microservices using Node.js, Docker containers, and Kubernetes orchestration for enterprise-grade applications.',
    content: `<h2>Introduction to Microservices</h2>
<p>Microservices architecture has become the go-to pattern for building scalable, maintainable applications. By breaking down a monolithic application into smaller, independent services, teams can develop, deploy, and scale each component independently.</p>
<p>In this comprehensive guide, we'll walk through the process of building a production-ready microservices architecture using Node.js and Docker. Whether you're migrating from a monolith or starting a new project, these patterns will help you avoid common pitfalls.</p>

<h2>Why Node.js for Microservices?</h2>
<p>Node.js is an excellent choice for microservices due to its event-driven, non-blocking I/O model. It excels at handling concurrent requests and is particularly well-suited for I/O-intensive operations that are common in microservice architectures. Additionally, the vast npm ecosystem provides libraries for almost every need.</p>

<h2>Setting Up Your Development Environment</h2>
<p>Before diving into the architecture, let's set up a proper development environment. You'll need Docker Desktop installed on your machine, along with Node.js 20+ and a code editor of your choice.</p>
<p>We'll structure our project as a monorepo using npm workspaces, which allows us to manage multiple services from a single repository while maintaining independent versioning and dependencies.</p>

<h2>Designing the Service Boundaries</h2>
<p>The most critical step in microservices design is defining proper service boundaries. Each service should own its data and expose a well-defined API. Common patterns include:</p>
<ul>
<li>Domain-driven design aggregates</li>
<li>API gateway pattern for client communication</li>
<li>Event-driven communication between services</li>
<li>Database-per-service pattern for data isolation</li>
</ul>

<h2>Containerization with Docker</h2>
<p>Docker containers provide consistent environments across development, testing, and production. Each microservice gets its own Dockerfile, and we use Docker Compose for local development to orchestrate multiple services together.</p>

<h2>Orchestration with Kubernetes</h2>
<p>For production deployments, Kubernetes provides powerful orchestration capabilities including auto-scaling, service discovery, load balancing, and rolling updates. We'll cover the essential Kubernetes manifests needed to deploy your microservices.</p>

<h2>Conclusion</h2>
<p>Building microservices with Node.js and Docker is a powerful combination for creating scalable applications. By following these patterns and best practices, you can avoid common pitfalls and build a robust system that grows with your needs.</p>`,
    coverImage: '',
    category: 'Backend',
    tags: ['Node.js', 'Docker', 'Microservices', 'Kubernetes'],
    author: 'Alex Chen',
    publishedAt: '2024-06-15T00:00:00Z',
    readingTime: 8,
    status: 'published',
    createdAt: '2024-06-15T00:00:00Z',
    updatedAt: '2024-06-15T00:00:00Z',
  },
  {
    _id: 'b2',
    title: 'The Future of AI in Web Development: Trends to Watch in 2024',
    slug: 'future-ai-web-development-trends-2024',
    excerpt: 'Explore the transformative impact of artificial intelligence on modern web development, from AI-powered code generation to intelligent user experiences.',
    content: `<h2>The AI Revolution in Web Development</h2>
<p>Artificial intelligence is reshaping how we build websites and applications. From automated code generation to intelligent testing and personalized user experiences, AI tools are becoming indispensable for modern web developers.</p>

<h2>AI-Powered Code Generation</h2>
<p>Tools like GitHub Copilot and Amazon CodeWhisperer have transformed the coding experience. These AI pair programmers can generate entire functions, suggest completions, and even write tests based on natural language prompts. The key is learning how to effectively prompt and review AI-generated code.</p>

<h2>Intelligent Testing and Quality Assurance</h2>
<p>AI-driven testing tools can automatically generate test cases, identify edge cases, and predict potential bugs before they reach production. Machine learning models analyze code patterns to suggest improvements and detect security vulnerabilities.</p>

<h2>Personalized User Experiences</h2>
<p>Modern web applications leverage AI to deliver personalized experiences. Recommendation engines, dynamic content optimization, and adaptive interfaces are becoming standard features, powered by machine learning models that run both on the server and in the browser.</p>

<h2>Ethical Considerations</h2>
<p>As AI becomes more prevalent in web development, it's crucial to consider ethical implications. Bias in training data, privacy concerns, and transparency in AI decision-making must be addressed to build trustworthy applications.</p>

<h2>Getting Started with AI Tools</h2>
<p>If you're new to AI in web development, start small. Integrate a code assistant tool into your IDE, experiment with an AI-powered testing framework, and explore APIs for adding intelligent features to your applications.</p>

<h2>Conclusion</h2>
<p>AI is not replacing web developers — it's augmenting our capabilities. By embracing these tools and understanding their strengths and limitations, we can build better applications more efficiently than ever before.</p>`,
    coverImage: '',
    category: 'AI & ML',
    tags: ['AI', 'Web Development', 'Machine Learning', 'Trends'],
    author: 'Sarah Williams',
    publishedAt: '2024-05-28T00:00:00Z',
    readingTime: 6,
    status: 'published',
    createdAt: '2024-05-28T00:00:00Z',
    updatedAt: '2024-05-28T00:00:00Z',
  },
  {
    _id: 'b3',
    title: 'UI/UX Design Principles for Dark Mode Applications',
    slug: 'ui-ux-design-principles-dark-mode',
    excerpt: 'A comprehensive guide to designing beautiful and accessible dark mode interfaces that reduce eye strain while maintaining visual hierarchy and readability.',
    content: `<h2>Why Dark Mode Matters</h2>
<p>Dark mode has evolved from a niche preference to an essential feature. With more users working late hours and OLED displays becoming standard, well-designed dark mode interfaces can reduce eye strain, save battery life, and create stunning visual experiences.</p>

<h2>Color Theory for Dark Interfaces</h2>
<p>Designing for dark mode requires a different approach to color. Avoid pure black (#000000) backgrounds — they create harsh contrast and can cause eye strain. Instead, use dark grays like #121212 or #1a1a2e. Similarly, avoid pure white text; off-white shades like #e0e0e0 are more comfortable to read.</p>

<h2>Maintaining Visual Hierarchy</h2>
<p>In dark mode, depth is communicated through luminance rather than shadow. Use lighter shades for elements that should appear closer and darker shades for elements that should recede. Elevation through color stops at 3-4 levels before differences become imperceptible.</p>

<h2>Accessibility Considerations</h2>
<p>WCAG guidelines require a contrast ratio of at least 4.5:1 for normal text. In dark mode, this means avoiding low-saturation colors that can blend together. Test your designs with contrast checkers and consider providing both light and dark mode options.</p>

<h2>Transitioning Between Modes</h2>
<p>Smooth transitions between light and dark modes enhance the user experience. Use CSS custom properties for color values and apply transitions to all color properties. Consider the context — some users may prefer automatic switching based on time of day.</p>

<h2>Conclusion</h2>
<p>Great dark mode design goes beyond inverting colors. By understanding the principles of luminance, contrast, and accessibility, you can create dark interfaces that are both beautiful and functional.</p>`,
    coverImage: '',
    category: 'Design',
    tags: ['UI/UX', 'Design', 'Dark Mode', 'Accessibility'],
    author: 'Emily Rodriguez',
    publishedAt: '2024-05-10T00:00:00Z',
    readingTime: 7,
    status: 'published',
    createdAt: '2024-05-10T00:00:00Z',
    updatedAt: '2024-05-10T00:00:00Z',
  },
  {
    _id: 'b4',
    title: 'Optimizing React Performance: Advanced Techniques',
    slug: 'optimizing-react-performance-advanced-techniques',
    excerpt: 'Deep dive into advanced React optimization strategies including code splitting, virtualization, memoization, and efficient state management for large-scale applications.',
    content: `<h2>Why React Performance Matters</h2>
<p>As React applications grow, performance can become a significant concern. Slow rendering, unnecessary re-renders, and large bundle sizes can degrade the user experience. In this guide, we'll explore advanced techniques to keep your React app fast and responsive.</p>

<h2>Code Splitting and Lazy Loading</h2>
<p>React.lazy and Suspense enable dynamic imports that split your bundle into smaller chunks. Route-based splitting is the most common approach, but you can also split at the component level for heavy dependencies like charts, editors, or data visualization libraries.</p>

<h2>Memoization Strategies</h2>
<p>React.memo, useMemo, and useCallback are powerful tools for preventing unnecessary re-renders. However, they come with their own costs. Use them strategically — profile first, then optimize. The React DevTools Profiler is invaluable for identifying performance bottlenecks.</p>

<h2>Virtualization for Large Lists</h2>
<p>When rendering thousands of items, virtualization libraries like react-window and react-virtuoso can dramatically improve performance by only rendering visible items. Combined with window scrolling, this can handle lists of virtually any size.</p>

<h2>State Management Optimization</h2>
<p>Choose the right state management strategy for your use case. Context API is great for low-frequency updates, while libraries like Zustand or Jotai excel at high-frequency updates with fine-grained subscriptions. Avoid storing derived state — compute it when needed.</p>

<h2>Bundle Size Optimization</h2>
<p>Use tools like webpack-bundle-analyzer to identify large dependencies. Consider alternatives to heavy libraries, use tree-shaking-friendly imports, and leverage modern ES modules for better code elimination.</p>

<h2>Conclusion</h2>
<p>React performance optimization is an ongoing process. Start with measurement, apply targeted optimizations, and always verify improvements with real data. A fast application is one of the best user experiences you can provide.</p>`,
    coverImage: '',
    category: 'Frontend',
    tags: ['React', 'Performance', 'Optimization', 'JavaScript'],
    author: 'Alex Chen',
    publishedAt: '2024-04-22T00:00:00Z',
    readingTime: 10,
    status: 'published',
    createdAt: '2024-04-22T00:00:00Z',
    updatedAt: '2024-04-22T00:00:00Z',
  },
  {
    _id: 'b5',
    title: 'Getting Started with TypeScript: A Practical Guide',
    slug: 'getting-started-typescript-practical-guide',
    excerpt: 'Everything you need to know to start using TypeScript effectively in your projects, from basic types to advanced generics and utility types.',
    content: `<h2>Why TypeScript?</h2>
<p>TypeScript has become the standard for serious JavaScript development. It catches errors at compile time, provides better tooling and documentation, and makes code more maintainable at scale. If you're building anything beyond a simple script, TypeScript is worth the investment.</p>

<h2>Setting Up Your First Project</h2>
<p>Getting started with TypeScript is straightforward. Install it via npm, create a tsconfig.json with your preferred settings, and start renaming your .js files to .ts. The TypeScript compiler will guide you through any type errors you need to fix.</p>

<h2>Understanding Basic Types</h2>
<p>TypeScript provides a rich type system built on JavaScript. Beyond string, number, and boolean, you'll use arrays, tuples, enums, and union types to model your data. The key is to start simple and gradually introduce more advanced types as needed.</p>

<h2>Interfaces and Type Aliases</h2>
<p>Interfaces and type aliases let you define the shape of your objects. Use interfaces for object shapes that can be extended, and type aliases for unions, intersections, and primitive types. Both support generics for reusable type definitions.</p>

<h2>Generics and Utility Types</h2>
<p>Generics allow you to write reusable, type-safe functions and components. TypeScript's built-in utility types like Partial, Pick, Omit, and Record solve common transformation patterns. Mastering these will dramatically reduce boilerplate in your code.</p>

<h2>Conclusion</h2>
<p>TypeScript's learning curve is real, but the benefits far outweigh the initial investment. Start with basic types, enable strict mode early, and leverage the community's type definitions for a smooth experience.</p>`,
    coverImage: '',
    category: 'Frontend',
    tags: ['TypeScript', 'JavaScript', 'Tutorial', 'Web Development'],
    author: 'Sarah Williams',
    publishedAt: '2024-04-05T00:00:00Z',
    readingTime: 9,
    status: 'published',
    createdAt: '2024-04-05T00:00:00Z',
    updatedAt: '2024-04-05T00:00:00Z',
  },
  {
    _id: 'b6',
    title: 'DevOps Best Practices for Modern Web Applications',
    slug: 'devops-best-practices-modern-web-apps',
    excerpt: 'Learn the essential DevOps practices including CI/CD pipelines, infrastructure as code, monitoring, and incident response for modern web applications.',
    content: `<h2>The DevOps Mindset</h2>
<p>DevOps is more than tools — it's a culture of collaboration, automation, and continuous improvement. Successful DevOps practices break down silos between development and operations teams, enabling faster and more reliable software delivery.</p>

<h2>CI/CD Pipeline Design</h2>
<p>A well-designed CI/CD pipeline automates testing, building, and deployment. Start with a simple pipeline that runs linting and tests, then gradually add stages for security scanning, integration tests, and deployment. Each stage should provide fast feedback to developers.</p>

<h2>Infrastructure as Code</h2>
<p>Tools like Terraform, Pulumi, and AWS CDK let you manage infrastructure through code. This enables version control, code review, and automated provisioning of environments. Always treat your infrastructure configuration with the same rigor as application code.</p>

<h2>Monitoring and Observability</h2>
<p>Modern applications require comprehensive monitoring. Implement the three pillars of observability: logs, metrics, and traces. Tools like Grafana, Prometheus, and OpenTelemetry provide the foundation for understanding system behavior in production.</p>

<h2>Incident Response</h2>
<p>When things go wrong — and they will — having a well-defined incident response process is crucial. Document runbooks, establish clear communication channels, and conduct post-mortems to learn from incidents without blame.</p>

<h2>Conclusion</h2>
<p>DevOps is a journey, not a destination. Start with automation that addresses your biggest pain points, measure your results, and continuously improve your processes. The investment in DevOps practices pays dividends in reliability and developer productivity.</p>`,
    coverImage: '',
    category: 'DevOps',
    tags: ['DevOps', 'CI/CD', 'Docker', 'AWS', 'Automation'],
    author: 'Mike Johnson',
    publishedAt: '2024-03-18T00:00:00Z',
    readingTime: 11,
    status: 'published',
    createdAt: '2024-03-18T00:00:00Z',
    updatedAt: '2024-03-18T00:00:00Z',
  },
]

const categoryGradients: Record<string, string> = {
  Frontend: 'from-blue-500 to-cyan-600',
  Backend: 'from-accent to-purple-500',
  Design: 'from-pink-500 to-rose-600',
  'AI & ML': 'from-green-500 to-emerald-600',
  DevOps: 'from-amber-500 to-orange-600',
}

function BlogPostSkeleton() {
  return (
    <div className="container-premium section-padding">
      <Skeleton className="h-6 w-32 mb-8" />
      <Skeleton className="h-56 w-full rounded-2xl mb-8" />
      <div className="max-w-3xl mx-auto space-y-4">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  )
}

function ShareButton({ onClick, icon: Icon, label }: { onClick: () => void; icon: any; label: string }) {
  return (
    <button
      onClick={onClick}
      className="glass w-10 h-10 rounded-xl flex items-center justify-center text-text-muted hover:text-accent hover:border-accent/30 transition-all"
      aria-label={label}
    >
      <Icon className="h-4 w-4" />
    </button>
  )
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [related, setRelated] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true)
      setError('')
      try {
        const res = await blogApi.getBySlug(slug!)
        setPost(res.data.data)
      } catch {
        const found = DEMO_POSTS.find((p) => p.slug === slug)
        if (found) {
          setPost(found)
          setRelated(DEMO_POSTS.filter((p) => p.category === found.category && p.slug !== slug).slice(0, 3))
        } else {
          setError('Post not found')
        }
      } finally {
        setLoading(false)
      }
    }
    if (slug) fetchPost()
  }, [slug])

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
    }
  }

  const shareTwitter = () => {
    const text = post ? `${post.title} by @SoyiriLabs` : ''
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`, '_blank')
  }

  const shareLinkedin = () => {
    window.open(`https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')
  }

  if (loading) return <BlogPostSkeleton />

  if (error || !post) {
    return (
      <div className="container-premium section-padding text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full glass flex items-center justify-center">
          <span className="text-3xl">📄</span>
        </div>
        <h2 className="text-2xl font-bold text-text mb-2">Post Not Found</h2>
        <p className="text-text-secondary mb-6">{error || 'The article you\'re looking for doesn\'t exist.'}</p>
        <Button variant="primary" href="/blog">
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Button>
      </div>
    )
  }

  const gradient = categoryGradients[post.category] || 'from-accent to-purple-500'

  return (
    <>
      <Helmet>
        <title>{post.seoTitle || `${post.title} | Soyiri Labs Blog`}</title>
        <meta name="description" content={post.seoDescription || post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.publishedAt} />
        <meta property="article:author" content={post.author} />
      </Helmet>

      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
        <div className={cn('absolute inset-0 bg-gradient-to-br opacity-5', gradient)} />
        <div className="container-premium section-padding pt-0 pb-0">
          <Reveal>
            <Link to="/blog" className="inline-flex items-center gap-2 text-text-muted hover:text-accent transition-colors mb-8">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Back to Blog</span>
            </Link>
          </Reveal>

          <div className={cn(
            'relative h-56 md:h-72 lg:h-80 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-10 overflow-hidden',
            gradient,
          )}>
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative text-center">
              <span className="block text-white/10 text-8xl font-black tracking-tight select-none">{post.category}</span>
            </div>
            <div className="absolute bottom-4 left-4 glass rounded-lg px-3 py-1.5">
              <span className="text-sm text-text">{post.category}</span>
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <Reveal delay={0.1}>
              <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted mb-6">
                <span className="flex items-center gap-1.5">
                  <User className="h-4 w-4" />
                  {post.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.publishedAt)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {post.readingTime} min read
                </span>
                <span className="glass px-2.5 py-0.5 rounded-full text-xs font-medium text-accent-light">
                  {post.category}
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-text mb-6">
                {post.title}
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-lg text-text-secondary leading-relaxed mb-8">{post.excerpt}</p>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full glass text-xs text-text-muted border border-accent/10">
                    #{tag}
                  </span>
                ))}
              </div>
            </Reveal>

            <GlassDivider />
          </div>
        </div>
      </section>

      <section className="section-padding pt-10">
        <div className="container-premium">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <div
                className="prose prose-invert prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </Reveal>

            <GlassDivider className="my-10" />

            <Reveal>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className={cn('w-12 h-12 rounded-full bg-gradient-to-br flex items-center justify-center text-white font-bold', gradient)}>
                    {post.author.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-text">{post.author}</span>
                    <span className="text-xs text-text-muted">Author</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-text-muted mr-1">Share:</span>
                  <ShareButton onClick={shareTwitter} icon={MessageCircle} label="Share on Twitter" />
                  <ShareButton onClick={shareLinkedin} icon={Share2} label="Share on LinkedIn" />
                  <ShareButton
                    onClick={copyUrl}
                    icon={copied ? Check : LinkIcon}
                    label={copied ? 'Copied!' : 'Copy link'}
                  />
                </div>
              </div>
            </Reveal>

            <GlassDivider className="my-10" />

            <Reveal>
              <div className="text-center">
                <Button variant="secondary" size="lg" href="/blog">
                  <ArrowLeft className="h-5 w-5" />
                  Back to Blog
                </Button>
              </div>
            </Reveal>

            <GlassDivider className="my-10" />
          </div>

          {related.length > 0 && (
            <div className="mt-16">
              <Reveal>
                <h2 className="text-2xl font-bold text-text text-center mb-8">Related Articles</h2>
              </Reveal>
              <div className="grid md:grid-cols-3 gap-6">
                {related.map((r, i) => (
                  <Reveal key={r._id} delay={i * 0.05}>
                    <Link to={`/blog/${r.slug}`} className="block group">
                      <div className="glass rounded-2xl overflow-hidden transition-all duration-300 hover:border-accent/30">
                        <div className={cn(
                          'h-36 bg-gradient-to-br flex items-center justify-center',
                          categoryGradients[r.category] || 'from-accent to-purple-500',
                        )}>
                          <span className="text-white/20 text-3xl font-black select-none">{r.category}</span>
                        </div>
                        <div className="p-5">
                          <div className="flex items-center gap-2 text-xs text-text-muted mb-2">
                            <Calendar className="h-3 w-3" />
                            {formatDate(r.publishedAt)}
                          </div>
                          <h3 className="text-base font-semibold text-text mb-1 group-hover:text-accent transition-colors line-clamp-2">
                            {r.title}
                          </h3>
                          <p className="text-sm text-text-secondary line-clamp-2">{r.excerpt}</p>
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
