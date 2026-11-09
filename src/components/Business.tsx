import type React from 'react'
import { businessValue, copy } from '../data/content'
import { useDeferredStage } from '../lib/deferred'
import { Icon } from '../lib/icons'
import { useRevealGroup } from '../lib/reveal'
import { Section } from '../lib/Section'
import { card, gradient, gradientText, t, gradientButton } from '../lib/type'

/** Cards rendered after page load (deferred stage 1), revealed with CSS. */
function BusinessCards() {
  const servicesRef = useRevealGroup<HTMLUListElement>()
  const pillarsRef = useRevealGroup<HTMLDivElement>()
  return (
    <>
      {/* Part A: 7 services */}
      <ul ref={servicesRef} className="reveal-group grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {businessValue.services.map((s, i) => (
          <li key={s.title} style={{ '--i': i % 4 } as React.CSSProperties}>
            <div className="lift-card h-full rounded-2xl p-6" style={card}>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: gradientButton, color: '#fff', boxShadow: '0 8px 24px rgba(139,92,246,0.3)' }}>
                <Icon name={s.icon} />
              </span>
              <h3 className="mt-4" style={{ ...t.cardTitle, fontSize: '1.0625rem' }}>{s.title}</h3>
              <p className="mt-2" style={{ ...t.body, fontSize: '15px' }}>{s.body}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* Parts B–D: product, idea, organisation */}
      <div ref={pillarsRef} className="reveal-group mt-6 grid gap-4 md:grid-cols-3">
        {businessValue.pillars.map((pl, i) => (
          <div key={pl.title} style={{ '--i': i } as React.CSSProperties}>
            <div className="h-full rounded-2xl p-6 md:p-7" style={{ ...card, borderColor: 'rgba(139, 92, 246,0.25)', background: 'linear-gradient(160deg, rgba(139, 92, 246,0.10), rgba(255,255,255,0.02))' }}>
              <span aria-hidden="true" className="block h-1 w-10 rounded-full" style={{ background: gradient }} />
              <h3 className="mt-4" style={{ ...t.cardTitle, fontSize: '1.25rem', ...gradientText }}>{pl.title}?</h3>
              <p className="mt-3" style={{ ...t.body, fontSize: '15px', color: 'rgba(255,255,255,0.78)' }}>{pl.body}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

/** "What I bring to the business": heading pre-rendered, cards deferred. */
export default function Business() {
  const ready = useDeferredStage(1)
  return (
    <Section id="business" title={copy.business.title} subtitle={copy.business.subtitle}>
      {ready ? <BusinessCards /> : <div aria-hidden="true" className="deferred-business" />}
    </Section>
  )
}
