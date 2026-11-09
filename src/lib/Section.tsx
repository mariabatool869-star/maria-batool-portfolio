import type { ReactNode } from 'react'
import { FadeUp } from './motion'
import type { Background } from '../data/content'
import { sectionBg } from './sectionBg'
import { t, gradientText } from './type'

/**
 * Section wrapper: 1200px container, heading block, fade-up, and an optional
 * atmospheric ::before background (see sectionBg).
 */
export function Section({ id, title, subtitle, children, className = '', bg }: {
  id: string; title: string; subtitle?: string; children: ReactNode; className?: string; bg?: Background
}) {
  const b = bg ? sectionBg(bg) : undefined
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`relative scroll-mt-24 overflow-hidden px-6 py-20 md:px-10 md:py-28 ${b?.className ?? ''} ${className}`} style={b?.style}>
      <div className="relative mx-auto w-full max-w-[1200px]">
        <FadeUp className="mb-12 max-w-[680px] md:mb-16">
          <h2 id={`${id}-title`} style={t.sectionTitle}><span className="hero-tagline" style={gradientText}>{title}</span></h2>
          {subtitle && <p className="mt-4" style={t.subhead}>{subtitle}</p>}
        </FadeUp>
        {children}
      </div>
    </section>
  )
}
