const APP_VERSION = '__BUILD_VERSION__'
const HTML_CACHE = 'soyiri-labs-html'

self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys()
      await Promise.all(
        keys
          .filter((key) => key !== HTML_CACHE && !key.startsWith('runtime-'))
          .map((key) => caches.delete(key)),
      )
      await self.clients.claim()
    })(),
  )
})

async function digest(text) {
  const data = new TextEncoder().encode(text)
  const hash = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .slice(0, 16)
}

function currentRuntimeCache(keys) {
  return [...keys].reverse().find((key) => key.startsWith('runtime-')) || null
}

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET' || !request.url.startsWith(self.location.origin)) return

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(async (response) => {
          const body = await response.clone().text()
          const htmlCache = await caches.open(HTML_CACHE)
          await htmlCache.put(
            '/index.html',
            new Response(body, {
              status: response.status,
              statusText: response.statusText,
              headers: response.headers,
            }),
          )
          const runtimeName = 'runtime-' + (await digest(body))
          const keys = await caches.keys()
          await Promise.all(
            keys
              .filter((key) => key.startsWith('runtime-') && key !== runtimeName)
              .map((key) => caches.delete(key)),
          )
          return response
        })
        .catch(() => caches.match('/index.html')),
    )
    return
  }

  event.respondWith(
    caches.match(request).then(async (cached) => {
      const keys = await caches.keys()
      const runtimeName = currentRuntimeCache(keys)
      if (cached) {
        fetch(request)
          .then((response) => {
            if (response && response.status === 200 && runtimeName) {
              caches.open(runtimeName).then((cache) => cache.put(request, response))
            }
          })
          .catch(() => {})
        return cached
      }
      const response = await fetch(request)
      if (response && response.status === 200 && response.type === 'basic' && runtimeName) {
        const cache = await caches.open(runtimeName)
        cache.put(request, response.clone())
      }
      return response
    }),
  )
})
