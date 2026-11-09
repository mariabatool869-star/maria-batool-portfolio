import { useEffect, useRef } from 'react'

/**
 * Lightweight scroll reveal for a group of cards: one IntersectionObserver per
 * group adds `is-in`, and CSS (`.reveal-group` in index.css) fades the children
 * up with a stagger. Replaces one animation component per card.
 */
export function useRevealGroup<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('is-in'); io.disconnect() }
    }, { rootMargin: '0px 0px -80px 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}
