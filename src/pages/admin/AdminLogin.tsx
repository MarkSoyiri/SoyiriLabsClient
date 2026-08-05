import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { LogIn, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { TextField } from '@/components/ui/Input'
import { authApi } from '@/lib/api'
import logo from '@/assets/image.png'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }
    setLoading(true)
    setError('')
    try {
      const { data } = await authApi.login(email, password)
      localStorage.setItem('token', data.data.token)
      localStorage.setItem('user', JSON.stringify(data.data.user || data.data))
      navigate('/admin')
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Admin Login | Soyiri Labs</title>
      </Helmet>

      <div className="flex min-h-screen items-center justify-center bg-parchment px-4 py-12">
        <div className="pointer-events-none fixed -top-32 right-[-10%] h-[480px] w-[480px] blob-electric" />
        <div className="pointer-events-none fixed bottom-[-22%] left-[-10%] h-[440px] w-[440px] blob-violet" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          className="relative w-full max-w-md"
        >
          <div className="rounded-2xl border-2 border-ink bg-canvas p-8 shadow-hard md:p-10">
            <div className="mb-6 text-center">
              <Link to="/" className="block transition-opacity hover:opacity-80" aria-label="Go to homepage">
                <img src={logo} alt="Soyiri Labs" className="mx-auto mb-3 h-14 w-auto object-contain" />
              </Link>
              <h1 className="mb-1 text-2xl font-semibold tracking-tight text-ink">Admin Dashboard</h1>
              <p className="text-caption text-ink-48">Sign in to manage your site</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 rounded-[11px] border border-error/20 bg-error/10 px-4 py-3 text-sm text-error"
                >
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {error}
                </motion.div>
              )}

              <TextField
                id="admin-email"
                type="email"
                label="Email"
                placeholder="admin@soyirilabs.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div>
                <label htmlFor="admin-password" className="mb-1.5 block text-caption-strong text-ink-80">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="admin-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="h-11 w-full rounded-xl border-2 border-hairline bg-canvas pr-11 pl-4 text-[16px] text-ink placeholder:text-ink-48 transition-colors duration-200 focus:border-action focus:outline-none focus:ring-[3px] focus:ring-action/15"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-48 transition-colors hover:text-ink"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" loading={loading} className="w-full">
                <LogIn className="h-4 w-4 shrink-0" />
                Sign In
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </>
  )
}
