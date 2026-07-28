import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { GlassDivider } from '@/components/ui/GlassDivider'
import Reveal from '@/components/animations/Reveal'
import FloatingElements from '@/components/animations/FloatingElements'
import { cn } from '@/lib/utils'

interface FaqItem {
  question: string
  answer: string
  category: string
}

const categories = ['General', 'Development', 'Design', 'Business']

const faqItems: FaqItem[] = [
  {
    category: 'General',
    question: 'What services does Soyiri Labs offer?',
    answer:
      'We specialize in full-stack web development, custom web applications, UI/UX design, e-commerce solutions, API development, and ongoing maintenance & support. Our expertise spans modern frameworks like React, Next.js, Node.js, and Python, ensuring we deliver scalable, performant solutions tailored to your needs.',
  },
  {
    category: 'General',
    question: 'How long does a typical project take?',
    answer:
      'Timelines vary based on scope and complexity. A simple landing page might take 2–3 weeks, while a full-scale web application can take 3–6 months or more. During our discovery phase, we provide a detailed roadmap with milestones so you always know what to expect.',
  },
  {
    category: 'General',
    question: 'What is your pricing model?',
    answer:
      'We primarily work on a project-based pricing model. After understanding your requirements, we provide a fixed-price quote. For ongoing work, we offer retainer packages. Every engagement starts with a free consultation to align on scope and budget.',
  },
  {
    category: 'Development',
    question: 'What technologies and frameworks do you use?',
    answer:
      'We use a modern tech stack including React, Next.js, TypeScript, Node.js, Express, Python, PostgreSQL, and MongoDB. On the frontend we leverage Tailwind CSS and Framer Motion for polished, responsive interfaces. We choose the best tools for each project\'s specific needs.',
  },
  {
    category: 'Development',
    question: 'Do you provide post-launch support?',
    answer:
      'Yes, we offer comprehensive maintenance and support packages. This includes bug fixes, performance monitoring, security updates, content updates, and feature enhancements. We tailor our support plans to match your ongoing needs and budget.',
  },
  {
    category: 'Development',
    question: 'Can you work with our existing codebase?',
    answer:
      'Absolutely. We regularly take over existing projects, refactor legacy code, and add new features. We begin with a thorough code audit to understand the architecture, then develop a strategy that minimizes disruption while improving quality and performance.',
  },
  {
    category: 'Design',
    question: 'Do you provide UI/UX design services?',
    answer:
      'Yes, design is a core part of our workflow. We handle everything from wireframing and prototyping to high-fidelity mockups and final UI delivery. Our designs prioritize usability, accessibility, and visual appeal, with a focus on conversion-driven layouts.',
  },
  {
    category: 'Design',
    question: 'Will my website be mobile-responsive?',
    answer:
      'Every project we deliver is fully responsive and tested across devices — mobile, tablet, and desktop. We follow a mobile-first approach to ensure your site looks and performs flawlessly on all screen sizes.',
  },
  {
    category: 'Business',
    question: 'How do we get started?',
    answer:
      'Getting started is simple. Reach out through our contact form or email us directly. We\'ll schedule a free discovery call to discuss your project, goals, and timeline. From there, we\'ll prepare a proposal and roadmap. No commitment required until you\'re ready.',
  },
  {
    category: 'Business',
    question: 'What information do you need to provide a quote?',
    answer:
      'To provide an accurate quote, we\'d love to hear about your project goals, target audience, desired features, timeline, and any design references you have. The more detail you share, the more precise our estimate will be.',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
  },
}

function AccordionItem({
  item,
  isOpen,
  onToggle,
  index,
}: {
  item: FaqItem
  isOpen: boolean
  onToggle: () => void
  index: number
}) {
  return (
    <motion.div
      variants={itemVariants}
      layout
      className={cn(
        'glass cursor-pointer overflow-hidden rounded-2xl border border-border transition-all duration-300',
        isOpen && 'border-accent/30 shadow-lg shadow-accent/5',
      )}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 p-5 text-left md:p-6"
        aria-expanded={isOpen}
      >
        <span className="flex items-start gap-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-xs font-bold text-accent">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-base font-medium text-text md:text-lg">{item.question}</span>
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] as const }}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent"
        >
          <Plus className="h-4 w-4" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] as const }}
            className="overflow-hidden"
          >
            <div className="border-t border-border/50 px-5 pb-5 pt-4 md:px-6 md:pb-6">
              <p className="leading-relaxed text-text-secondary">{item.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <>
      <Helmet>
        <title>FAQ | Soyiri Labs</title>
        <meta
          name="description"
          content="Frequently asked questions about Soyiri Labs' web development, design, and consulting services."
        />
      </Helmet>

      <FloatingElements count={5} />

      <section className="section-padding relative">
        <div className="container-premium">
          <Reveal>
            <SectionHeading
              label="FAQ"
              title="Frequently Asked Questions"
              description="Everything you need to know about working with Soyiri Labs. Can't find what you're looking for? Reach out and we'll help."
            />
          </Reveal>

          <div className="mx-auto mt-16 max-w-3xl">
            {categories.map((cat) => {
              const items = faqItems.filter((i) => i.category === cat)
              if (items.length === 0) return null

              const startIndex = faqItems.indexOf(items[0])

              return (
                <motion.div
                  key={cat}
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-30px' }}
                  className="mb-12 last:mb-0"
                >
                  <div className="mb-6 flex items-center gap-3">
                    <span className="h-6 w-1 rounded-full bg-gradient-to-b from-accent to-purple-500" />
                    <h2 className="text-lg font-semibold text-text">{cat}</h2>
                  </div>

                  <div className="space-y-4">
                    {items.map((item, i) => {
                      const globalIndex = startIndex + i
                      return (
                        <AccordionItem
                          key={globalIndex}
                          item={item}
                          index={globalIndex}
                          isOpen={openIndex === globalIndex}
                          onToggle={() => toggle(globalIndex)}
                        />
                      )
                    })}
                  </div>

                  {cat !== categories[categories.length - 1] && (
                    <div className="mt-12">
                      <GlassDivider />
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
