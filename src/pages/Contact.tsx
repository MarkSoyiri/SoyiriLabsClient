import { useState, useCallback } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Mail, Phone, MapPin, Clock, Send, Code2, Share2, MessageCircle, Palette,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Toast } from '@/components/ui/Toast'
import { TextField, TextAreaField, SelectField } from '@/components/ui/Input'
import Reveal from '@/components/animations/Reveal'
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
  color: string
}

const contactInfo: ContactInfo[] = [
  { icon: Mail, label: 'Email', value: 'hello@soyirilabs.com', href: 'mailto:hello@soyirilabs.com', color: 'bg-action/10 text-action' },
  { icon: Phone, label: 'Phone', value: '+233 050 747 8237', href: 'tel:+233507478237', color: 'bg-violet/10 text-violet' },
  { icon: MapPin, label: 'Location', value: 'Kumasi - Ashanti Region (Ghana)', color: 'bg-cyan/10 text-cyan' },
  { icon: Clock, label: 'Hours', value: 'Mon–Fri, 9 AM – 6 PM PST', color: 'bg-lime/10 text-lime' },
]

const socialLinks = [
  { icon: Code2, label: 'GitHub', href: '#', color: 'text-ink' },
  { icon: Share2, label: 'LinkedIn', href: '#', color: 'text-action' },
  { icon: MessageCircle, label: 'Twitter', href: '#', color: 'text-cyan' },
  { icon: Palette, label: 'Dribbble', href: '#', color: 'text-magenta' },
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

      <section className="tile-light relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 grid-bg" />
        <div className="pointer-events-none absolute -top-24 right-[-8%] h-[440px] w-[440px] blob-electric" />
        <div className="pointer-events-none absolute bottom-[-20%] left-[-8%] h-[400px] w-[400px] blob-violet" />
        <div className="pointer-events-none absolute bottom-[30%] right-[20%] h-[240px] w-[240px] blob-cyan opacity-50" />

        <div className="relative container-site px-4 pb-24 pt-24 md:pb-32 md:pt-28">
          <Reveal>
            <SectionHeading
              label="Get in Touch"
              title={
                <>
                  Let's talk about <span className="text-serif-accent text-action">your project</span>
                </>
              }
              description="Have a project in mind? We'd love to hear about it. Send us a message and we'll get back to you within 24 hours."
            />
          </Reveal>

          <div className="mx-auto mt-14 grid max-w-5xl gap-8 lg:grid-cols-5">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-3"
            >
              <div className="rounded-2xl border-2 border-ink bg-canvas shadow-hard">
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5 p-8">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <TextField
                      id="name"
                      label="Name"
                      required
                      placeholder="John Doe"
                      error={errors.name?.message}
                      {...register('name')}
                    />
                    <TextField
                      id="email"
                      type="email"
                      label="Email"
                      required
                      placeholder="john@example.com"
                      error={errors.email?.message}
                      {...register('email')}
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <TextField
                      id="company"
                      label="Company"
                      placeholder="Your Company Inc."
                      {...register('company')}
                    />
                    <SelectField
                      id="budget"
                      label="Budget"
                      required
                      error={errors.budget?.message}
                      {...register('budget')}
                    >
                      {budgetOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </SelectField>
                  </div>

                  <TextAreaField
                    id="message"
                    label="Project Details"
                    required
                    rows={6}
                    placeholder="Tell us about your project, goals, timeline..."
                    error={errors.message?.message}
                    {...register('message')}
                  />

                  <Button type="submit" loading={isSubmitting} className="w-full">
                    <Send className="h-4 w-4 shrink-0" />
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-5 lg:col-span-2"
            >
              {contactInfo.map((info) => {
                const Icon = info.icon
                return (
                  <Card key={info.label} hover className="p-5">
                    <div className="flex items-start gap-4">
                      <div className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-xl', info.color)}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-fine uppercase tracking-wider text-ink-48">
                          {info.label}
                        </p>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="mt-1 block truncate text-[15px] text-ink transition-colors hover:text-action"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="mt-1 truncate text-[15px] text-ink">{info.value}</p>
                        )}
                      </div>
                    </div>
                  </Card>
                )
              })}

              <div className="rounded-2xl border-2 border-ink bg-canvas p-6 shadow-hard-sm">
                <p className="mb-4 text-center text-caption-strong text-ink">
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
                        className={cn(
                          'flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink bg-canvas transition-all duration-200 hover:-translate-y-0.5',
                          social.color,
                        )}
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
