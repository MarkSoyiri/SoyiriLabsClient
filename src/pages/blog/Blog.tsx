import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Search, Calendar, Clock, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Skeleton } from '@/components/ui/Skeleton'
import { Chip } from '@/components/ui/Chip'
import { SearchInput } from '@/components/ui/Input'
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
    content: '',
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
    content: '',
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
    content: '',
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
    content: '',
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
    content: '',
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
    content: '',
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

const categories = ['All', 'Frontend', 'Backend', 'Design', 'AI & ML', 'DevOps']

const categoryGradients: Record<string, string> = {
  Frontend: 'from-[#26304a] via-[#1d2438] to-[#11141f]',
  Backend: 'from-[#2a2347] via-[#211c3c] to-[#14101f]',
  Design: 'from-[#2f2330] via-[#241b26] to-[#141114]',
  'AI & ML': 'from-[#1f2e3f] via-[#182230] to-[#0f151d]',
  DevOps: 'from-[#332b1f] via-[#262019] to-[#17130e]',
}

const POSTS_PER_PAGE = 4

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await blogApi.getAll()
        setPosts(res.data.data)
      } catch {
        setPosts(DEMO_POSTS)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchCategory = category === 'All' || p.category === category
      const matchSearch = !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
      return matchCategory && matchSearch
    })
  }, [posts, category, search])

  const visiblePosts = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + POSTS_PER_PAGE)
  }

  useEffect(() => {
    setVisibleCount(POSTS_PER_PAGE)
  }, [category, search])

  return (
    <>
      <Helmet>
        <title>Blog | Soyiri Labs</title>
        <meta name="description" content="Insights, tutorials, and updates from the Soyiri Labs team on web development, design, AI, and technology." />
      </Helmet>

      <section className="tile-light relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 grid-bg" />
        <div className="pointer-events-none absolute -top-28 right-[-10%] h-[520px] w-[520px] blob-electric" />
        <div className="pointer-events-none absolute bottom-[-22%] left-[-10%] h-[480px] w-[480px] blob-lime opacity-40" />
        <div className="relative container-site px-4 pb-24 pt-24 md:pb-32 md:pt-28">
          <SectionHeading
            label="Our Blog"
            title={
              <>
                Insights &amp; <span className="text-serif-accent text-action">articles</span>
              </>
            }
            description="Thoughts on technology, design, and building digital products that make a difference."
          />
        </div>

        <div className="pointer-events-none absolute bottom-1 left-1/2 hidden -translate-x-1/2 select-none whitespace-nowrap text-[10rem] font-bold uppercase leading-none tracking-tighter text-outline lg:block">
          Journal
        </div>
      </section>

      <section className="tile-parchment tile">
        <div className="container-site px-4">
          <div className="mb-10 rounded-2xl border-2 border-ink bg-canvas p-4 shadow-hard-sm md:p-6">
            <div className="flex flex-col gap-4">
              <SearchInput
                placeholder="Search articles by title, content, or tags..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <Chip
                    key={cat}
                    selected={category === cat}
                    onClick={() => setCategory(cat)}
                  >
                    {cat}
                  </Chip>
                ))}
              </div>

              {!loading && (
                <div className="text-sm text-ink-48">
                  {filtered.length} article{filtered.length !== 1 ? 's' : ''} found
                </div>
              )}
            </div>
          </div>

          {loading ? (
            <div className="grid gap-6 md:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="overflow-hidden rounded-2xl border border-white/10 bg-tile-2">
                  <Skeleton className="h-48 rounded-none" />
                  <div className="space-y-3 p-6">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    <div className="flex items-center gap-4 pt-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="py-20 text-center">
              <p className="mb-4 text-lg text-ink-80">{error}</p>
              <Button variant="primary" onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-ink bg-canvas shadow-hard-sm">
                <Search className="h-8 w-8 text-ink-48" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-ink">No articles found</h3>
              <p className="mb-6 text-ink-80">Try a different search term or category.</p>
              <Button variant="primary" onClick={() => { setSearch(''); setCategory('All') }}>
                Reset Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="grid gap-6 md:grid-cols-2">
                <AnimatePresence mode="popLayout">
                  {visiblePosts.map((post, index) => {
                    const gradient = categoryGradients[post.category] || 'from-[#2a2347] via-[#211c3c] to-[#14101f]'
                    return (
                      <motion.div
                        key={post._id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Reveal delay={index * 0.05}>
                          <Link to={`/blog/${post.slug}`} className="group block">
                            <div className="overflow-hidden rounded-2xl border border-hairline bg-canvas transition-all duration-300 hover:-translate-y-1 hover:border-ink/30 hover:shadow-product">
                              <div className={cn(
                                'relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br',
                                gradient,
                              )}>
                                <div className="pointer-events-none absolute inset-0 bg-black/20" />
                                <span className="relative select-none font-display text-5xl font-bold tracking-tight text-white/20">
                                  {post.category}
                                </span>
                                <div className="absolute left-4 top-4">
                                  <span className="rounded-lg bg-tile-1/70 px-3 py-1 text-xs font-medium text-on-dark backdrop-blur">
                                    {post.category}
                                  </span>
                                </div>
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                              </div>
                              <div className="p-6">
                                <div className="mb-3 flex items-center gap-4 text-xs text-ink-48">
                                  <span className="flex items-center gap-1.5">
                                    <Calendar className="h-3 w-3" />
                                    {formatDate(post.publishedAt)}
                                  </span>
                                  <span className="flex items-center gap-1.5">
                                    <Clock className="h-3 w-3" />
                                    {post.readingTime} min read
                                  </span>
                                </div>
                                <h3 className="mb-2 text-lg font-semibold text-ink transition-colors group-hover:text-action">
                                  {post.title}
                                </h3>
                                <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-ink-80">
                                  {post.excerpt}
                                </p>
                                <div className="mb-4 flex flex-wrap gap-1.5">
                                  {post.tags.slice(0, 3).map((tag) => (
                                    <span key={tag} className="rounded-full border border-hairline bg-parchment px-2.5 py-1 text-xs text-ink-48">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                                <div className="flex items-center gap-2 text-sm font-semibold text-action">
                                  <span>Read Article</span>
                                  <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
                                </div>
                              </div>
                            </div>
                          </Link>
                        </Reveal>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              </div>

              {hasMore && (
                <div className="mt-10 flex justify-center">
                  <Button variant="secondary" size="lg" onClick={handleLoadMore}>
                    Load More Articles
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}
