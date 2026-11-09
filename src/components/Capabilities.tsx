import { backgrounds, capabilities, copy } from '../data/content'
import { Icon } from '../lib/icons'
import { FadeUp } from '../lib/motion'
import { SafeImage } from '../lib/SafeImage'
import { Section } from '../lib/Section'
import { card, gradient, t } from '../lib/type'

export default function Capabilities() {
  return (
    <Section id="about" bg={backgrounds.capabilities} title={copy.capabilities.title} subtitle={copy.capabilities.subtitle}>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((c, i) => (
          <FadeUp as="li" key={c.title} delay={(i % 3) * 0.1}>
            <div className="lift-card h-full rounded-2xl p-6 md:p-7" style={card}>
              {/* Icon sliced from the capability sprite; gradient SVG tile if missing. */}
              <span className="capability-icon block overflow-hidden rounded-xl" style={{ border: '1px solid rgba(236,72,153,0.25)', boxShadow: '0 8px 24px rgba(139,92,246,0.3)' }}>
                <SafeImage
                  src={c.image}
                  alt=""
                  width={56}
                  height={56}
                  className="h-full w-full object-cover"
                  fallback={
                    <span className="flex h-full w-full items-center justify-center" style={{ background: gradient, color: '#fff' }}>
                      <Icon name={c.icon} />
                    </span>
                  }
                />
              </span>
              <h3 className="mt-5" style={t.cardTitle}>{c.title}</h3>
              <p className="mt-2" style={{ ...t.body, fontSize: '15px' }}>{c.body}</p>
            </div>
          </FadeUp>
        ))}
      </ul>
    </Section>
  )
}
