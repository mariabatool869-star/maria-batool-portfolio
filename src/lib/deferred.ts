import { useSyncExternalStore } from 'react'

/**
 * Deferred rendering in small steps after the page has loaded.
 *
 * Stage 0 is the pre-rendered HTML and hydration (nothing deferred is shown,
 * so hydration matches). After the window `load` event the stage advances one
 * step per browser idle period: 1 = business cards, 2 = project grid. Each step
 * is a small render, so none of them blocks the main thread for long.
 */
let stage = 0
let started = false
const listeners = new Set<() => void>()

// requestIdleCallback is missing in older Safari; fall back to a short timeout.
const idle = (cb: () => void) => {
  if (typeof window.requestIdleCallback === 'function') window.requestIdleCallback(cb, { timeout: 1200 })
  else setTimeout(cb, 120)
}

function start() {
  const step = () => {
    stage += 1
    listeners.forEach((l) => l())
    if (stage < 2) idle(step)
  }
  idle(step)
}

function subscribe(cb: () => void) {
  listeners.add(cb)
  if (!started) {
    started = true
    if (document.readyState === 'complete') start()
    else window.addEventListener('load', start, { once: true })
  }
  return () => { listeners.delete(cb) }
}

/** True once deferred stage `n` has been reached (always false in pre-rendered HTML). */
export function useDeferredStage(n: number) {
  return useSyncExternalStore(subscribe, () => stage >= n, () => false)
}
