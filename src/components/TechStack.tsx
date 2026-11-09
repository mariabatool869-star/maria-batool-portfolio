import { backgrounds, certifications, techStack, copy } from '../data/content'
import { FadeUp } from '../lib/motion'
import { Section } from '../lib/Section'
import { font, t } from '../lib/type'

export default function TechStack() {
  return (
    <Section id="skills" bg={backgrounds.skills} title={copy.techStack.title} subtitle={copy.techStack.subtitle}>
      <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
        {techStack.map((row, i) => (
          <FadeUp key={row.group} delay={Math.min(i, 4) * 0.05}>
            <div className="grid gap-3 py-5 md:grid-cols-[140px_1fr] md:items-center md:gap-8">
              <h3 style={t.label}>{row.group}</h3>
              <ul className="flex flex-wrap gap-2">
                {row.items.map((item) => <li key={item} className="pill">{item}</li>)}
              </ul>
            </div>
          </FadeUp>
        ))}
      </div>
      <FadeUp className="mt-8 flex flex-wrap items-center gap-3">
        <span style={t.label}>Certified</span>
        {certifications.map((c) => (
          <span key={c} className="rounded-full px-3.5 py-1.5" style={{ fontFamily: font, fontSize: '13px', fontWeight: 500, color: '#fff', background: 'rgba(139, 92, 246,0.12)', border: '1px solid rgba(139, 92, 246,0.35)' }}>{c}</span>
        ))}
      </FadeUp>
    </Section>
  )
}
