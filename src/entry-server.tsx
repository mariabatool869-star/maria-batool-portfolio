import { StrictMode } from 'react'
import { prerender } from 'react-dom/static'
import App from './App'

/**
 * Used only at build time by scripts/prerender.mjs. `prerender` waits for the
 * lazy-loaded sections, so the whole page becomes static HTML.
 * `progressiveChunkSize` is raised because React otherwise moves any large
 * completed Suspense boundary into a hidden <div> plus an inline script that
 * swaps it in (useful for streaming, but it hides content from no-JS
 * visitors and some crawlers in a static file).
 */
export async function render(): Promise<string> {
  const { prelude } = await prerender(<StrictMode><App /></StrictMode>, { progressiveChunkSize: Number.MAX_SAFE_INTEGER })
  return new Response(prelude).text()
}
