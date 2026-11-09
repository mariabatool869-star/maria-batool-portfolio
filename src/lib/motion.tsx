import { animate, motion, useInView } from 'framer-motion'
import { useEffect, useRef, type ReactNode } from 'react'
import { useReducedMotionSafe } from './useReducedMotionSafe'

/** Fade-and-rise when scrolled into view. Static for reduced-motion users. */
export function FadeUp({ children, delay = 0, className, as = 'div' }: { children: ReactNode; delay?: number; className?: string; as?: 'div' | 'li' | 'article' }) {
  const reduce = useReducedMotionSafe()
  const Tag = motion[as]
  return (
    <Tag
      data-fade=""
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    >
      {children}
    </Tag>
  )
}

/**
 * Counts up from 0 to `to` the first time it enters the viewport.
 * Writes straight to the DOM each frame instead of setting React state,
 * so the count-up costs no re-renders (keeps mobile main-thread time low).
 * Screen readers get the final value only.
 */
export function Counter({ to, prefix = '', suffix = '', duration = 1.6 }: { to: number; prefix?: string; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' })
  const reduce = useReducedMotionSafe()
  const final = `${prefix}${to.toLocaleString('en-GB')}${suffix}`

  useEffect(() => {
    const el = ref.current
    if (!el || !inView || reduce) return
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => { el.textContent = `${prefix}${Math.round(v).toLocaleString('en-GB')}${suffix}` },
    })
    return () => controls.stop()
  }, [inView, reduce, to, duration, prefix, suffix])

  return (
    <>
      <span className="sr-only">{final}</span>
      <span ref={ref} aria-hidden="true">{reduce ? final : `${prefix}0${suffix}`}</span>
    </>
  )
}
