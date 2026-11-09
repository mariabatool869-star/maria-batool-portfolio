import { useEffect, useRef } from 'react'

/**
 * Hero parallax: the background layer moves at 70% of scroll speed (shifted
 * down by 30% of the scroll distance) while the hero is on screen. One passive
 * scroll listener, batched with requestAnimationFrame; off for reduced motion.
 */
export function useHeroParallax() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    const update = () => {
      frame = 0
      const y = window.scrollY
      if (y <= window.innerHeight * 1.2) el.style.transform = `translate3d(0, ${(y * 0.3).toFixed(1)}px, 0)`
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(frame) }
  }, [])
  return ref
}
