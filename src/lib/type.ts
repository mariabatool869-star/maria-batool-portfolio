import type { CSSProperties } from 'react'

/** Typography tokens, applied through inline `style` props (Aurora convention). */
export const font = "'Roboto', system-ui, -apple-system, 'Segoe UI', sans-serif"
export const mono = 'ui-monospace, SFMono-Regular, Menlo, monospace'

export const color = {
  bg: '#0F0A1A',
  blue: '#8B5CF6',
  cyan: '#EC4899',
  amber: '#F59E0B',
  green: '#10B981',
  white: '#FFFFFF',
  body: '#DDD6FE',
  muted: '#A78BFA',
  cardBg: 'rgba(139,92,246,0.05)',
  cardBorder: 'rgba(139,92,246,0.15)',
}

export const gradient = 'linear-gradient(135deg, #8B5CF6, #EC4899)'

/** Buttons: deeper shades of the same hues so white text passes 4.5:1. */
export const gradientButton = 'linear-gradient(135deg, #7C3AED, #DB2777)'
/** Hero tagline: softer violet → rose. */
export const gradientSoft = 'linear-gradient(135deg, #A78BFA, #F472B6)'

export const gradientText: CSSProperties = {
  background: gradient,
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  color: 'transparent',
}

export const glass: CSSProperties = {
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.12)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
}

export const card: CSSProperties = {
  background: color.cardBg,
  border: `1px solid ${color.cardBorder}`,
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
}

export const t = {
  heroName: { fontFamily: font, fontWeight: 900, fontSize: 'clamp(3rem, 8vw, 4.75rem)', lineHeight: 0.95, letterSpacing: '-0.03em', color: color.white },
  heroTagline: { fontFamily: font, fontWeight: 500, fontSize: 'clamp(1.05rem, 2.2vw, 1.5rem)', lineHeight: 1.35 },
  sectionTitle: { fontFamily: font, fontWeight: 900, fontSize: 'clamp(2rem, 4.5vw, 2.75rem)', lineHeight: 1.08, letterSpacing: '-0.02em', color: color.white },
  subhead: { fontFamily: font, fontWeight: 500, fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)', lineHeight: 1.5, color: color.body },
  projectTitle: { fontFamily: font, fontWeight: 700, fontSize: 'clamp(1.4rem, 2.6vw, 1.75rem)', lineHeight: 1.2, letterSpacing: '-0.01em', color: color.white },
  cardTitle: { fontFamily: font, fontWeight: 700, fontSize: '1.125rem', lineHeight: 1.3, color: color.white },
  body: { fontFamily: font, fontWeight: 400, fontSize: '1rem', lineHeight: 1.7, color: color.body },
  bodyLg: { fontFamily: font, fontWeight: 400, fontSize: '1.0625rem', lineHeight: 1.7, color: color.body },
  small: { fontFamily: font, fontWeight: 400, fontSize: '0.875rem', lineHeight: 1.6, color: color.body },
  stat: { fontFamily: font, fontWeight: 900, fontSize: 'clamp(2.25rem, 4vw, 3rem)', lineHeight: 1, letterSpacing: '-0.02em' },
  label: { fontFamily: font, fontWeight: 500, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: color.muted },
} satisfies Record<string, CSSProperties>
