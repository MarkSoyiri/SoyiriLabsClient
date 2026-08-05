import { readFileSync, writeFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const swPath = join(root, 'dist', 'sw.js')
const htmlPath = join(root, 'dist', 'index.html')

const html = readFileSync(htmlPath, 'utf8')
const version = createHash('sha256').update(html).digest('hex').slice(0, 12)

const sw = readFileSync(swPath, 'utf8')
if (!sw.includes('__BUILD_VERSION__')) {
  console.warn('[sw-version] placeholder __BUILD_VERSION__ not found in dist/sw.js; skipping')
} else {
  writeFileSync(swPath, sw.replace('__BUILD_VERSION__', version))
  console.log(`[sw-version] embedded app version ${version} into dist/sw.js`)
}