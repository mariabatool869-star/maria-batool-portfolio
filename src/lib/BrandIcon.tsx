import { brandPaths } from './brandPaths'

/** Brand glyph (LinkedIn, Gmail, X…) in currentColor. */
export function BrandIcon({ name, size = 14 }: { name: keyof typeof brandPaths; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d={brandPaths[name]} />
    </svg>
  )
}
