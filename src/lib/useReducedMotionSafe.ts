import { useSyncExternalStore } from 'react'

const query = '(prefers-reduced-motion: reduce)'
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(query)
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}

/**
 * Hydration-safe reduced-motion flag. The pre-rendered HTML and the first
 * client render both use `false`; React then re-renders with the real value.
 * (framer-motion's hook reads the media query on the first client render,
 * which would mismatch the pre-rendered HTML.)
 */
export function useReducedMotionSafe() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false)
}
