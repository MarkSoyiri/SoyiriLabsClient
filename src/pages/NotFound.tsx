import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 — Page Not Found | Soyiri Labs</title>
        <meta name="description" content="The page you're looking for doesn't exist. Let's get you back on track." />
      </Helmet>

      <section className="tile-light relative flex min-h-[calc(100vh-64px)] items-center justify-center overflow-hidden px-4">
        <div className="pointer-events-none absolute inset-0 grid-bg" />
        <div className="pointer-events-none absolute -top-32 right-[-10%] h-[520px] w-[520px] blob-electric" />
        <div className="pointer-events-none absolute bottom-[-22%] left-[-10%] h-[480px] w-[480px] blob-violet" />
        <div className="pointer-events-none absolute bottom-[25%] right-[25%] h-[260px] w-[260px] blob-cyan opacity-50" />

        <div className="relative text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-hairline bg-canvas/80 px-4 py-2 text-caption-strong uppercase tracking-[0.14em] text-ink-48 shadow-hard-sm"
          >
            Error 404
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
            className="select-none text-[7rem] font-semibold leading-none tracking-tighter text-outline-strong md:text-[11rem] lg:text-[14rem]"
          >
            404
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <h2 className="mb-4 text-display-md text-ink">
              This page <span className="text-serif-accent text-action">wandered off</span>
            </h2>

            <p className="mx-auto mb-8 max-w-md text-lg leading-relaxed text-ink-80">
              The page you're looking for doesn't exist or has been moved.
              Let's get you back to familiar territory.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-3.5"
            >
              <Button href="/" size="lg">
                <ArrowLeft className="h-5 w-5 shrink-0" />
                Go Home
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Contact Us
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
