import { useEffect, useRef } from 'react'
import { useDeferredStage } from '../lib/deferred'
import { useMediaQuery } from '../lib/useMediaQuery'
import { useReducedMotionSafe } from '../lib/useReducedMotionSafe'

/** 2px blue→cyan bar at the very top that fills as the page scrolls. */
function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (ref.current) ref.current.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    update()
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(frame) }
  }, [])
  return <div ref={ref} aria-hidden="true" className="scroll-progress" />
}

/**
 * Glowing cyan dot that trails the pointer (desktop, fine pointer only; off for
 * reduced motion). 10px, growing to 20px over links and buttons. The system
 * cursor stays visible, so nothing is lost if the dot lags.
 */
function CursorDot() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const dot = ref.current
    if (!dot) return
    let x = -100, y = -100, cx = -100, cy = -100, frame = 0
    const loop = () => {
      cx += (x - cx) * 0.28; cy += (y - cy) * 0.28   // ≈0.15s of lag at 60fps
      dot.style.transform = `translate3d(${cx}px, ${cy}px, 0)`
      frame = Math.abs(x - cx) + Math.abs(y - cy) > 0.3 ? requestAnimationFrame(loop) : 0
    }
    const onMove = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY
      dot.classList.add('is-visible')
      const t = e.target as Element | null
      dot.classList.toggle('is-hover', !!t?.closest?.('a, button, [role="button"], input, select, textarea, label'))
      if (!frame) frame = requestAnimationFrame(loop)
    }
    const onLeave = () => dot.classList.remove('is-visible')
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => { window.removeEventListener('pointermove', onMove); document.documentElement.removeEventListener('pointerleave', onLeave); cancelAnimationFrame(frame) }
  }, [])
  return <div ref={ref} aria-hidden="true" className="cursor-dot" />
}

/** Click ripple on buttons and CTAs (event delegation; one listener for the page). */
function useRipple(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return
    const sel = '.btn-ghost, .btn-outline, .btn-nav, .filter-btn, [data-ripple]'
    const onDown = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.(sel) as HTMLElement | null
      if (!el) return
      const r = el.getBoundingClientRect()
      const size = Math.max(r.width, r.height) * 2
      const span = document.createElement('span')
      span.className = 'ripple'
      span.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - r.left - size / 2}px;top:${e.clientY - r.top - size / 2}px`
      el.appendChild(span)
      span.addEventListener('animationend', () => span.remove())
    }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [enabled])
}

/** Site-wide finishing touches. The cursor mounts only after page load. */
export default function Enhancements() {
  const reduce = useReducedMotionSafe()
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)')
  const loaded = useDeferredStage(1)
  useRipple(!reduce)
  return (
    <>
      <ScrollProgress />
      <div aria-hidden="true" className="grain" />
      {loaded && finePointer && !reduce && <CursorDot />}
    </>
  )
}
