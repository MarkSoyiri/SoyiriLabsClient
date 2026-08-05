import { useEffect, useState } from 'react'
import { RefreshCw, X } from 'lucide-react'

export default function UpdatePrompt() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!import.meta.env.PROD || !('serviceWorker' in navigator)) return
    const hadController = navigator.serviceWorker.controller !== null
    const onControllerChange = () => {
      if (hadController) setVisible(true)
    }
    navigator.serviceWorker.addEventListener('controllerchange', onControllerChange)
    return () => navigator.serviceWorker.removeEventListener('controllerchange', onControllerChange)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed bottom-5 left-1/2 z-[60] w-[calc(100%-2rem)] max-w-md -translate-x-1/2">
      <div className="flex items-center gap-3 rounded-2xl border-2 border-ink bg-canvas p-4 shadow-hard">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-action/10">
          <RefreshCw className="h-5 w-5 text-action" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-caption-strong text-ink">A new version is available</p>
          <p className="text-fine text-ink-48">Refresh to get the latest updates</p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="shrink-0 rounded-full bg-action px-4 py-2 text-button-utility text-white transition-colors duration-200 hover:bg-action-focus"
        >
          Update
        </button>
        <button
          onClick={() => setVisible(false)}
          className="shrink-0 p-1.5 text-ink-48 transition-colors hover:text-ink"
          aria-label="Dismiss update prompt"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
