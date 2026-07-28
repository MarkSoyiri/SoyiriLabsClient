import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import FloatingElements from '@/components/animations/FloatingElements'

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 — Page Not Found | Soyiri Labs</title>
        <meta name="description" content="The page you're looking for doesn't exist. Let's get you back on track." />
      </Helmet>

      <FloatingElements count={3} />

      <section className="relative flex min-h-[calc(100vh-80px)] items-center justify-center px-4 overflow-hidden">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
            className="gradient-text select-none text-[10rem] font-black leading-none md:text-[14rem] lg:text-[18rem]"
          >
            404
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <h2 className="mb-4 text-2xl font-semibold text-text md:text-3xl">
              Page Not Found
            </h2>

            <p className="mx-auto mb-8 max-w-md text-base leading-relaxed text-text-secondary md:text-lg">
              The page you're looking for doesn't exist or has been moved.
              Let's get you back to familiar territory.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button href="/" size="lg">
                <ArrowLeft className="h-4 w-4" />
                Go Home
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
