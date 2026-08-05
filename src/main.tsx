import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import './index.css'

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js', { updateViaCache: 'none' })
      .then(() => setupUpdateChecks())
      .catch(() => {})
  })
}

async function setupUpdateChecks() {
  try {
    const reg = await navigator.serviceWorker.getRegistration()
    if (!reg) return
    let lastCheck = 0
    const check = () => {
      const now = Date.now()
      if (now - lastCheck < 60_000) return
      lastCheck = now
      reg.update().catch(() => {})
    }
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') check()
    })
    window.addEventListener('focus', check)
    window.setInterval(check, 60_000)
  } catch {
    // no-op
  }
}

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
)
