import type { CSSProperties } from 'react'
import type { Background } from '../data/content'

/**
 * FIX 2: section backgrounds via a ::before pseudo-element (see `.has-bg` in
 * index.css). Returns the class and CSS variables to spread onto the section:
 *
 *   <section {...sectionBg(backgrounds.awards)} …>
 *
 * Phones get a 720px variant (<name>-sm.webp). The images are applied once
 * the page has finished loading (html.bg-ready, set in index.html), so they
 * never compete with the fonts and hero on slow connections.
 *
 * The pseudo-element sits at z-index -1 inside an isolated section, so it is
 * behind the content and above the section's own background colour. Opacity
 * is the specified value × --bg-k (0.7 on phones). If the image fails to
 * load, the section simply keeps its plain dark background.
 */
export function sectionBg(bg: Background, { fade = true }: { fade?: boolean } = {}) {
  return {
    className: fade ? 'has-bg has-bg--fade' : 'has-bg',
    style: {
      '--bg-src': `url(${bg.src})`,
      '--bg-src-sm': `url(${bg.src.replace(/\.webp$/, '-sm.webp')})`,
      '--bg-pos': bg.position,
      '--bg-o': String(bg.opacity),
    } as CSSProperties,
  }
}
