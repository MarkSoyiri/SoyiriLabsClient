import { useState, useCallback } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Mail, Phone, MapPin, Clock, Send, Code2, Share2, MessageCircle, Palette,
  AlertCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { GlassDivider } from '@/components/ui/GlassDivider'
import { Toast } from '@/components/ui/Toast'
import Reveal from '@/components/animations/Reveal'
import FloatingElements from '@/components/animations/FloatingElements'
import { contactApi } from '@/lib/api'
import { cn } from '@/lib/utils'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  budget: z.string().min(1, 'Please select a budget range'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

const budgetOptions = [
  { value: '', label: 'Select a budget range' },
  { value: 'under-5k', label: 'Under $5,000' },
  { value: '5k-15k', label: '$5,000 – $15,000' },
  { value: '15k-50k', label: '$15,000 – $50,000' },
  { value: '50k-plus', label: '$50,000+' },
]

interface ContactInfo {
  icon: typeof Mail
  label: string
  value: string
  href?: string
}

const contactInfo: ContactInfo[] = [
  { icon: Mail, label: 'Email', value: 'hello@soyirilabs.com', href: 'mailto:hello@soyirilabs.com' },
  { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567', href: 'tel:+15551234567' },
  { icon: MapPin, label: 'Location', value: 'Kumasi - Ashanti Region (Ghana)' },
  { icon: Clock, label: 'Hours', value: 'Mon–Fri, 9 AM – 6 PM PST' },
]

const socialLinks = [
  { icon: Code2, label: 'GitHub', href: '#' },
  { icon: Share2, label: 'LinkedIn', href: '#' },
  { icon: MessageCircle, label: 'Twitter', href: '#' },
  { icon: Palette, label: 'Dribbble', href: '#' },
]

export default function Contact() {
  const [toast, setToast] = useState<{ variant: 'success' | 'error'; message: string } | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = useCallback(async (data: ContactFormData) => {
    try {
      await contactApi.send({
        name: data.name,
        email: data.email,
        company: data.company || undefined,
        budget: data.budget,
        message: data.message,
      })
      setToast({ variant: 'success', message: 'Message sent successfully! We will get back to you shortly.' })
      reset()
    } catch {
      setToast({ variant: 'error', message: 'Failed to send message. Please try again later.' })
    }
  }, [reset])

  return (
    <>
      <Helmet>
        <title>Contact Us | Soyiri Labs</title>
        <meta name="description" content="Get in touch with Soyiri Labs. Let's discuss your next web development project." />
      </Helmet>

      <FloatingElements count={6} />

      <section className="section-padding relative">
        <div className="container-premium">
          <Reveal>
            <SectionHeading
              label="Get in Touch"
              title="Let's Talk"
              description="Have a project in mind? We'd love to hear about it. Send us a message and we'll get back to you within 24 hours."
            />
          </Reveal>

          <div className="mx-auto mt-16 grid max-w-5xl gap-8 lg:grid-cols-5">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <Card className="p-8">
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-medium text-text-secondary">
                        Name <span className="text-error">*</span>
                      </label>
                      <input
                        id="name"
                        {...register('name')}
                        placeholder="John Doe"
                        className={cn(
                          'w-full rounded-xl border bg-glass px-4 py-3 text-text placeholder:text-text-muted transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/50',
                          errors.name ? 'border-error/50' : 'border-border hover:border-border-light',
                        )}
                      />
                      {errors.name && (
                        <p className="flex items-center gap-1 text-xs text-error">
                          <AlertCircle className="h-3 w-3" /> {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium text-text-secondary">
                        Email <span className="text-error">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        {...register('email')}
                        placeholder="john@example.com"
                        className={cn(
                          'w-full rounded-xl border bg-glass px-4 py-3 text-text placeholder:text-text-muted transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/50',
                          errors.email ? 'border-error/50' : 'border-border hover:border-border-light',
                        )}
                      />
                      {errors.email && (
                        <p className="flex items-center gap-1 text-xs text-error">
                          <AlertCircle className="h-3 w-3" /> {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="company" className="block text-sm font-medium text-text-secondary">
                        Company
                      </label>
                      <input
                        id="company"
                        {...register('company')}
                        placeholder="Your Company Inc."
                        className="w-full rounded-xl border border-border bg-glass px-4 py-3 text-text placeholder:text-text-muted transition-all duration-200 hover:border-border-light focus:outline-none focus:ring-2 focus:ring-accent/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="budget" className="block text-sm font-medium text-text-secondary">
                        Budget <span className="text-error">*</span>
                      </label>
                      <select
                        id="budget"
                        {...register('budget')}
                        className={cn(
                          'w-full rounded-xl border bg-glass px-4 py-3 text-text transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/50',
                          errors.budget ? 'border-error/50' : 'border-border hover:border-border-light',
                        )}
                      >
                        {budgetOptions.map((opt) => (
                          <option key={opt.value} value={opt.value} className="bg-primary text-text">
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      {errors.budget && (
                        <p className="flex items-center gap-1 text-xs text-error">
                          <AlertCircle className="h-3 w-3" /> {errors.budget.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-medium text-text-secondary">
                      Project Details <span className="text-error">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      {...register('message')}
                      placeholder="Tell us about your project, goals, timeline..."
                      className={cn(
                        'w-full resize-none rounded-xl border bg-glass px-4 py-3 text-text placeholder:text-text-muted transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/50',
                        errors.message ? 'border-error/50' : 'border-border hover:border-border-light',
                      )}
                    />
                    {errors.message && (
                      <p className="flex items-center gap-1 text-xs text-error">
                        <AlertCircle className="h-3 w-3" /> {errors.message.message}
                      </p>
                    )}
                  </div>

                  <Button type="submit" loading={isSubmitting} className="w-full">
                    <Send className="h-4 w-4 shrink-0" />
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6 lg:col-span-2"
            >
              {contactInfo.map((info) => {
                const Icon = info.icon
                return (
                  <Card key={info.label} hover glow className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
                          {info.label}
                        </p>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="mt-1 block truncate text-sm text-text transition-colors hover:text-accent"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="mt-1 truncate text-sm text-text">{info.value}</p>
                        )}
                      </div>
                    </div>
                  </Card>
                )
              })}

              <GlassDivider />

              <div>
                <p className="mb-4 text-center text-sm font-medium uppercase tracking-wider text-text-muted">
                  Follow Us
                </p>
                <div className="flex justify-center gap-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        aria-label={social.label}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-glass text-text-muted transition-all duration-300 hover:border-accent/50 hover:text-accent hover:shadow-lg hover:shadow-accent/10"
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-6 right-6 z-50 max-w-sm"
          >
            <Toast
              variant={toast.variant}
              message={toast.message}
              onClose={() => setToast(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
