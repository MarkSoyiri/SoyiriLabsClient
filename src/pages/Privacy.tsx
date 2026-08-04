import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import Reveal from '@/components/animations/Reveal'
import { cn } from '@/lib/utils'

const sections = [
  {
    title: 'Information We Collect',
    content:
      'We collect information you provide directly when you fill out our contact form, subscribe to our newsletter, or communicate with us. This may include your name, email address, phone number, company name, and project details. We also automatically collect certain technical information when you visit our website, including your IP address, browser type, operating system, referring URLs, and pages viewed.',
  },
  {
    title: 'How We Use Your Information',
    content:
      'We use the information we collect to respond to your inquiries, provide our services, improve our website, send relevant communications (with your consent), and comply with legal obligations. We process your data on the lawful bases of consent, contract performance, and legitimate business interests.',
  },
  {
    title: 'Data Sharing and Disclosure',
    content:
      'We do not sell your personal information to third parties. We may share your data with trusted service providers who assist us in operating our website and business, such as hosting providers, analytics services, and email delivery platforms. These providers are contractually bound to protect your data and use it only for the purposes we specify.',
  },
  {
    title: 'Cookies and Tracking Technologies',
    content:
      'Our website uses cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand where our visitors come from. You can control cookie preferences through your browser settings. Essential cookies are required for the website to function properly; analytics and marketing cookies are used only with your consent.',
  },
  {
    title: 'Data Retention',
    content:
      'We retain your personal information only as long as necessary to fulfill the purposes described in this policy, or as required by applicable law. When we no longer need your data, we securely delete or anonymize it. Contact form submissions are retained for up to 24 months after project completion, after which they are permanently deleted.',
  },
  {
    title: 'Your Rights',
    content:
      'Depending on your jurisdiction, you may have the right to access, correct, delete, or port your personal data, as well as the right to restrict or object to certain processing activities. You may also withdraw consent at any time where processing is based on consent. To exercise any of these rights, please contact us at privacy@soyirilabs.com. We will respond to your request within 30 days.',
  },
  {
    title: 'Data Security',
    content:
      'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encryption in transit and at rest, regular security audits, access controls, and employee training on data protection best practices. However, no method of transmission over the Internet is 100% secure.',
  },
  {
    title: 'International Data Transfers',
    content:
      'Your information may be transferred to and processed in countries other than your own, where our servers and service providers are located. We ensure appropriate safeguards are in place, such as Standard Contractual Clauses, to protect your data in accordance with applicable data protection laws.',
  },
  {
    title: 'Third-Party Links',
    content:
      'Our website may contain links to third-party websites, plugins, or services. We are not responsible for the privacy practices or content of these third parties. We encourage you to review their privacy policies before providing any personal information.',
  },
  {
    title: 'Changes to This Policy',
    content:
      'We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of material changes by posting the updated policy on this page with a revised "Last Updated" date. We encourage you to review this policy periodically.',
  },
  {
    title: 'Contact Us',
    content:
      'If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at privacy@soyirilabs.com or write to us at: Soyiri Labs, 123 Innovation Drive, San Francisco, CA 94105, United States.',
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

export default function Privacy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Soyiri Labs</title>
        <meta name="description" content="Soyiri Labs Privacy Policy — how we collect, use, and protect your personal information." />
      </Helmet>

      <section className="tile-light tile relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 grid-bg" />
        <div className="pointer-events-none absolute -top-24 right-[-8%] h-[420px] w-[420px] blob-electric" />
        <div className="pointer-events-none absolute bottom-[-16%] left-[-8%] h-[380px] w-[380px] blob-violet" />
        <div className="relative container-site px-4">
          <Reveal>
            <SectionHeading
              label="Legal"
              title={
                <>
                  Privacy <span className="text-serif-accent text-action">policy</span>
                </>
              }
              description="Last updated: January 1, 2026"
            />
          </Reveal>

          <div className="mx-auto mt-14 max-w-3xl">
            <div className="rounded-2xl border-2 border-ink bg-parchment p-8 shadow-hard md:p-12">
              <div className="mb-8 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-action/10 text-action">
                  <Shield className="h-5 w-5" />
                </span>
                <span className="text-caption-strong uppercase tracking-[0.14em] text-ink">Your Privacy Matters</span>
              </div>

              <p className="mb-10 leading-relaxed text-ink-80">
                At Soyiri Labs, we take your privacy seriously. This Privacy Policy explains how we collect,
                use, disclose, and safeguard your information when you visit our website or use our services.
                Please read this policy carefully. By using our website, you consent to the practices described
                herein.
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
