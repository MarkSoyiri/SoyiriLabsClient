import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Search, Calendar, Clock, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/SectionHeading'
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
  Frontend: 'from-blue-500 to-cyan-600',
  Backend: 'from-accent to-purple-500',
  Design: 'from-pink-500 to-rose-600',
  'AI & ML': 'from-green-500 to-emerald-600',
  DevOps: 'from-amber-500 to-orange-600',
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

      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container-premium px-4">
          <SectionHeading
            label="Our Blog"
            title="Insights &amp; Articles"
            description="Thoughts on technology, design, and building digital products that make a difference."
          />
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-premium">
          <div className="glass rounded-2xl p-4 md:p-6 mb-10">
            <div className="flex flex-col gap-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                <input
                  type="text"
                  placeholder="Search articles by title, content, or tags..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full h-12 pl-11 pr-4 glass rounded-xl text-text placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={cn(
                      'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                      category === cat
                        ? 'bg-accent text-white shadow-lg shadow-accent/25'
                        : 'glass text-text-secondary hover:text-text hover:bg-glass-light',
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {!loading && (
                <div className="text-sm text-text-muted">
                  {filtered.length} article{filtered.length !== 1 ? 's' : ''} found
                </div>
              )}
            </div>
          </div>

          {loading ? (
            <div className="grid gap-6 md:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="glass rounded-2xl overflow-hidden">
                  <Skeleton className="h-48 rounded-none" />
                  <div className="p-6 space-y-3">
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
            <div className="text-center py-20">
              <p className="text-text-secondary text-lg mb-4">{error}</p>
              <Button variant="primary" onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full glass flex items-center justify-center">
                <Search className="h-8 w-8 text-text-muted" />
              </div>
              <h3 className="text-xl font-semibold text-text mb-2">No articles found</h3>
              <p className="text-text-secondary mb-6">Try a different search term or category.</p>
              <Button variant="primary" onClick={() => { setSearch(''); setCategory('All') }}>
                Reset Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="grid gap-6 md:grid-cols-2">
                <AnimatePresence mode="popLayout">
                  {visiblePosts.map((post, index) => {
                    const gradient = categoryGradients[post.category] || 'from-accent to-purple-500'
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
                          <Link to={`/blog/${post.slug}`} className="block group">
                            <div className="glass rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-accent/10 hover:border-accent/30">
                              <div className={cn(
                                'relative h-48 bg-gradient-to-br flex items-center justify-center overflow-hidden',
                                gradient,
                              )}>
                                <div className="absolute inset-0 bg-black/20 pointer-events-none" />
                                <span className="relative text-white/20 text-5xl font-black tracking-tight select-none">
                                  {post.category}
                                </span>
                                <div className="absolute top-4 left-4">
                                  <span className="glass text-xs font-medium text-text px-3 py-1 rounded-full">
                                    {post.category}
                                  </span>
                                </div>
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                              </div>
                              <div className="p-6">
                                <div className="flex items-center gap-4 text-xs text-text-muted mb-3">
                                  <span className="flex items-center gap-1.5">
                                    <Calendar className="h-3 w-3" />
                                    {formatDate(post.publishedAt)}
                                  </span>
                                  <span className="flex items-center gap-1.5">
                                    <Clock className="h-3 w-3" />
                                    {post.readingTime} min read
                                  </span>
                                </div>
                                <h3 className="text-lg font-semibold text-text mb-2 group-hover:text-accent transition-colors">
                                  {post.title}
                                </h3>
                                <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-3">
                                  {post.excerpt}
                                </p>
                                <div className="flex flex-wrap gap-1.5 mb-4">
                                  {post.tags.slice(0, 3).map((tag) => (
                                    <span key={tag} className="text-xs px-2.5 py-1 rounded-full glass text-text-muted">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                                <div className="flex items-center gap-2 text-accent text-sm font-medium">
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
                <div className="flex justify-center mt-10">
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
