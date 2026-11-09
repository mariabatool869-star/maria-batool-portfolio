import { useSyncExternalStore } from 'react'

const subscribe = (cb: () => void) => {
  window.addEventListener('load', cb)
  return () => window.removeEventListener('load', cb)
}

/** True once the window `load` event has fired. `false` in pre-rendered HTML and during hydration. */
export function usePageLoaded() {
  return useSyncExternalStore(subscribe, () => document.readyState === 'complete', () => false)
}
