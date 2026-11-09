// Build step: render the app to HTML and inject it into dist/index.html, so
// text is visible on first paint (faster LCP) and crawlers see real content.
// Below-the-fold sections are lazy, so they render client-side as before.
import { readFileSync, writeFileSync, rmSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

const dist = resolve('dist/index.html')
const { render } = await import(pathToFileURL(resolve('dist-ssr/entry-server.js')).href)
const html = readFileSync(dist, 'utf8')
const marker = '<div id="root"></div>'
if (!html.includes(marker)) throw new Error('prerender: #root marker not found in dist/index.html')
writeFileSync(dist, html.replace(marker, `<div id="root">${await render()}</div>`))
rmSync(resolve('dist-ssr'), { recursive: true, force: true })
console.log('prerender: dist/index.html now contains the rendered page')
