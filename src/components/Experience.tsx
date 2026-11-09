import { backgrounds, experience, copy } from '../data/content'
import { Icon } from '../lib/icons'
import { FadeUp } from '../lib/motion'
import { Section } from '../lib/Section'
import { color, font, gradientText, t } from '../lib/type'

const kindIcon = { corporate: 'building', startup: 'rocket', government: 'landmark' } as const
const kindLabel = { corporate: 'Corporate', startup: 'Start-up', government: 'Government and public sector' } as const

export default function Experience() {
  return (
    <Section id="experience" bg={backgrounds.experience} title={copy.experience.title} subtitle={copy.experience.subtitle}>
      <ol className="relative ml-2 md:ml-0">
        <span aria-hidden="true" className="absolute bottom-2 left-0 top-2 md:left-[196px]" style={{ width: 1, background: 'linear-gradient(to bottom, rgba(236, 72, 153,0.8), rgba(139, 92, 246,0.35) 25%, rgba(255,255,255,0.1))' }} />
        {experience.map((e, i) => {
          const current = i === 0
          return (
            <FadeUp as="li" key={`${e.company}-${e.years}`} delay={Math.min(i, 3) * 0.06} className="relative grid gap-2 pb-10 pl-8 last:pb-0 md:grid-cols-[196px_1fr_200px] md:gap-8 md:pl-0">
              <span aria-hidden="true" className={`timeline-node absolute left-[-6px] top-[6px] md:left-[190px] ${current ? 'is-current' : ''}`} />
              <p className="whitespace-nowrap md:pr-8 md:text-right" style={{ fontFamily: font, fontWeight: 500, fontSize: '14px', color: current ? '#fff' : 'rgba(255,255,255,0.55)', fontVariantNumeric: 'tabular-nums' }}>{e.years}</p>
              <div className="md:pl-10">
                <h3 className="flex items-center gap-2.5" style={{ ...t.cardTitle, fontSize: '1.1875rem' }}>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg" style={{ background: 'rgba(139, 92, 246,0.1)', border: '1px solid rgba(139, 92, 246,0.25)', color: color.cyan }} title={kindLabel[e.kind]}>
                    <Icon name={kindIcon[e.kind]} width={15} height={15} aria-hidden="true" />
                  </span>
                  {e.company}
                  <span className="sr-only">({kindLabel[e.kind]})</span>
                </h3>
                <p className="mt-1" style={{ ...t.small, color: 'rgba(255,255,255,0.7)' }}>{e.role}</p>
                <p className="mt-2 max-w-[560px]" style={{ ...t.body, fontSize: '15px' }}>{e.summary}</p>
              </div>
              <div className="mt-2 md:mt-0 md:text-right">
                <p style={{ fontFamily: font, fontWeight: 900, fontSize: e.metric.length > 6 ? '1.25rem' : '1.75rem', lineHeight: 1.1, ...gradientText }}>{e.metric}</p>
                <p style={{ ...t.small, fontSize: '13px' }}>{e.metricLabel}</p>
              </div>
            </FadeUp>
          )
        })}
      </ol>
    </Section>
  )
}
