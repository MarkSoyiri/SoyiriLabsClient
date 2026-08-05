import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { ScrollText } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import Reveal from '@/components/animations/Reveal'

const sections = [
  {
    title: 'Acceptance of Terms',
    content:
      'By accessing or using the Soyiri Labs website and services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use our website or services. We reserve the right to update or modify these terms at any time without prior notice. Continued use of our services after changes constitutes acceptance of the new terms.',
  },
  {
    title: 'Description of Services',
    content:
      'Soyiri Labs provides web development, design, consulting, and related digital services as described on our website. The scope, timeline, and deliverables for each engagement will be defined in a separate project agreement or statement of work. We reserve the right to refuse service to anyone for any lawful reason.',
  },
  {
    title: 'Intellectual Property Rights',
    content:
      'Upon full payment for services, we assign to you all intellectual property rights in the custom work product we create specifically for your project, unless otherwise agreed. We retain the right to display completed work in our portfolio and marketing materials. All pre-existing tools, libraries, and frameworks used in your project remain our intellectual property, licensed for use as part of your project.',
  },
  {
    title: 'User Obligations',
    content:
      'You agree to provide accurate, current, and complete information when engaging our services. You are responsible for maintaining the confidentiality of any account credentials and for all activities that occur under your account. You agree not to use our website for any unlawful purpose or in violation of any applicable laws or regulations.',
  },
  {
    title: 'Payment Terms',
    content:
      'Payment terms, including amounts, schedules, and methods, are specified in each project agreement. Invoices are due within 30 days of receipt unless otherwise agreed. Late payments may incur a service charge of 1.5% per month. We reserve the right to suspend work on projects with outstanding invoices exceeding 30 days past due.',
  },
  {
    title: 'Limitation of Liability',
    content:
      'To the maximum extent permitted by law, Soyiri Labs shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or business opportunities, arising out of or related to our services. Our total liability for any claim shall not exceed the total amount paid by you for the specific service giving rise to the claim.',
  },
  {
    title: 'Warranties and Disclaimers',
    content:
      'We warrant that our services will be performed in a professional and workmanlike manner in accordance with industry standards. However, all services are provided "as is" without any other express or implied warranties, including merchantability or fitness for a particular purpose. We do not guarantee that our services will be error-free or uninterrupted.',
  },
  {
    title: 'Confidentiality',
    content:
      'Both parties agree to maintain the confidentiality of all proprietary information shared during the course of the engagement. This includes business plans, technical specifications, financial data, and any other information designated as confidential. This obligation survives the termination of our agreement for a period of three years.',
  },
  {
    title: 'Termination',
    content:
      'Either party may terminate a project agreement with 30 days written notice. In the event of termination, you shall pay for all work completed up to the termination date. We may terminate immediately if you breach any material term of the agreement and fail to cure such breach within 10 days of written notice.',
  },
  {
    title: 'Indemnification',
    content:
      'You agree to indemnify and hold harmless Soyiri Labs, its employees, and contractors from any claims, damages, losses, or expenses arising out of your use of our services, violation of these terms, or infringement of any third-party rights. This indemnification obligation survives termination of these terms.',
  },
  {
    title: 'Governing Law',
    content:
      'These terms shall be governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions. Any disputes arising under these terms shall be resolved exclusively in the courts of San Francisco County, California.',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
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

export default function Terms() {
  return (
    <>
      <Helmet>
        <title>Terms of Service | Soyiri Labs</title>
        <meta name="description" content="Soyiri Labs Terms of Service — the terms governing the use of our website and services." />
      </Helmet>

      <section className="tile-light relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 grid-bg" />
        <div className="pointer-events-none absolute -top-24 right-[-8%] h-[420px] w-[420px] blob-violet" />
        <div className="pointer-events-none absolute bottom-[-16%] left-[-8%] h-[380px] w-[380px] blob-cyan opacity-60" />
        <div className="relative container-site px-4 pb-24 pt-24 md:pb-32 md:pt-28">
          <Reveal>
            <SectionHeading
              label="Legal"
              title={
                <>
                  Terms of <span className="text-serif-accent text-action">service</span>
                </>
              }
              description="Last updated: January 1, 2026"
            />
          </Reveal>

          <div className="mx-auto mt-14 max-w-3xl">
            <div className="rounded-2xl border-2 border-ink bg-parchment p-8 shadow-hard md:p-12">
              <div className="mb-8 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet/10 text-violet">
                  <ScrollText className="h-5 w-5" />
                </span>
                <span className="text-caption-strong uppercase tracking-[0.14em] text-ink">Terms Overview</span>
              </div>

              <p className="mb-10 leading-relaxed text-ink-80">
                Welcome to Soyiri Labs. These Terms of Service govern your use of our website and the services
                we provide. By accessing our website or engaging our services, you agree to comply with and be
                bound by these terms. Please read them carefully before using our services.
              </p>

              <div className="mb-10 h-px bg-ink/15" />

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                className="space-y-10"
              >
                {sections.map((section, i) => (
                  <motion.div key={section.title} variants={itemVariants} className="flex gap-5">
                    <span className="hidden select-none font-display text-4xl font-bold tracking-tight text-outline sm:block">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0">
                      <h2 className="mb-3 text-[21px] font-semibold tracking-tight text-ink">{section.title}</h2>
                      <p className="leading-relaxed text-ink-80">{section.content}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
