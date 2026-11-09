import { testimonials, copy } from '../data/content'
import { FadeUp } from '../lib/motion'
import { Section } from '../lib/Section'
import { card, font, gradientText, t } from '../lib/type'

/**
 * Renders nothing until real, permission-cleared quotes are added
 * to `testimonials` in src/data/content.ts.
 */
export default function Testimonials() {
  if (testimonials.length === 0) return null
  return (
    <Section id="testimonials" title={copy.testimonials.title}>
      <ul className="grid gap-4 md:grid-cols-3">
        {testimonials.map((q, i) => (
          <FadeUp as="li" key={q.name} delay={i * 0.1}>
            <figure className="flex h-full flex-col rounded-2xl p-7" style={card}>
              <span aria-hidden="true" style={{ fontFamily: font, fontWeight: 900, fontSize: '4rem', lineHeight: 0.6, ...gradientText }}>“</span>
              <blockquote className="mt-4 flex-1" style={{ ...t.bodyLg, fontStyle: 'italic', color: 'rgba(255,255,255,0.85)' }}>{q.quote}</blockquote>
              <figcaption className="mt-6" style={t.small}><strong style={{ color: '#fff', fontWeight: 500 }}>{q.name}</strong><br />{q.role}</figcaption>
            </figure>
          </FadeUp>
        ))}
      </ul>
    </Section>
  )
}
