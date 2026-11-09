import { font, gradient } from './type'

/** "SR" monogram in a gradient circle. Used in nav, footer and portrait fallback. */
export function Monogram({ size = 34, text = 'SR' }: { size?: number; text?: string }) {
  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size, borderRadius: 999, background: gradient, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: font, fontWeight: 900, fontSize: size * 0.38, letterSpacing: '-0.02em', color: '#fff', boxShadow: '0 0 0 1px rgba(255,255,255,0.18) inset' }}
    >
      {text}
    </span>
  )
}
