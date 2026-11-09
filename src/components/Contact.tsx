import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { backgrounds, config, contactCtaHref, copy } from '../data/content'
import { Avatar } from '../lib/Avatar'
import { BrandIcon } from '../lib/BrandIcon'
import { Icon } from '../lib/icons'
import { FadeUp } from '../lib/motion'
import { sectionBg } from '../lib/sectionBg'
import { font, glass, gradientButton, gradientText, t } from '../lib/type'

const tile = { background: gradientButton, color: '#fff' }

const contactBg = sectionBg(backgrounds.contact)

export default function Contact() {
  const bookExternal = contactCtaHref.startsWith('http')
  const linkedinLabel = config.socials.linkedin.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
  const mailto = config.email ? `mailto:${config.email}` : ''

  type Row = { key: string; label: string; value: string; href?: string; external?: boolean; icon: ReactNode }
  const rows: Row[] = [
    ...(config.email ? [{ key: 'email', label: 'Email', value: config.email, href: mailto, icon: <BrandIcon name="gmail" size={16} /> }] : []),
    ...(config.socials.linkedin ? [{ key: 'linkedin', label: 'LinkedIn', value: linkedinLabel, href: config.socials.linkedin, external: true, icon: <BrandIcon name="linkedin" size={16} /> }] : []),
    { key: 'location', label: 'Location', value: `${config.location} · ${config.workModes}`, icon: <Icon name="pin" width={18} height={18} /> },
    ...(config.clearance ? [{ key: 'clearance', label: 'Security clearance', value: config.clearance, icon: <Icon name="shield" width={18} height={18} /> }] : []),
    ...(config.languages ? [{ key: 'languages', label: 'Languages', value: config.languages, icon: <Icon name="voice" width={18} height={18} /> }] : []),
    ...(config.responseTime ? [{ key: 'response', label: 'Response', value: config.responseTime, icon: <Icon name="clock" width={18} height={18} /> }] : []),
  ]

  return (
    // FIX 2: contact background (10%, 7% on phones) via ::before.
    <section id="contact" aria-labelledby="contact-title" className={`relative scroll-mt-24 overflow-hidden px-6 py-20 md:px-10 md:py-28 ${contactBg.className}`} style={contactBg.style}>
      <FadeUp className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[28px] p-6 sm:p-8 md:p-14">
        <div aria-hidden="true" className="absolute inset-0" style={{ ...glass, borderRadius: 28, background: 'linear-gradient(145deg, rgba(139, 92, 246,0.14), rgba(236, 72, 153,0.05) 45%, rgba(255,255,255,0.03))' }} />
        <div aria-hidden="true" className="absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(236, 72, 153,0.22), transparent 65%)' }} />

        <div className="relative grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:items-end">
          <div>
            <p className="flex items-center gap-2.5" style={{ fontFamily: font, fontSize: '14px', fontWeight: 500, color: '#6EE7B7' }}>
              <span className="pulse-dot" aria-hidden="true" /> {config.availability}
            </p>
            <h2 id="contact-title" className="mt-5" style={{ ...t.sectionTitle, fontSize: 'clamp(2.1rem, 5vw, 3.25rem)' }}><span className="hero-tagline" style={gradientText}>{copy.contact.heading}</span></h2>
            <p className="mt-4" style={t.subhead}>{copy.contact.subhead}</p>

            <div className="mt-8 flex items-center gap-4">
              <Avatar size={64} />
              <span>
                <span className="block" style={{ fontFamily: font, fontWeight: 700, fontSize: '17px', color: '#fff' }}>{config.name}</span>
                <span className="block" style={{ ...t.small, fontSize: '13.5px' }}>{config.title}</span>
              </span>
            </div>

            <ul className="mt-6 space-y-4">
              {rows.map((r) => (
                <li key={r.key} className="flex items-center gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={tile}>{r.icon}</span>
                  <span className="min-w-0">
                    <span className="block" style={{ ...t.label, fontSize: '11px' }}>{r.label}</span>
                    {r.href ? (
                      <a href={r.href} target={r.external ? '_blank' : undefined} rel={r.external ? 'noopener noreferrer' : undefined} className="link" style={{ ...t.body, color: '#fff', overflowWrap: 'anywhere' }}>{r.value}</a>
                    ) : (
                      <span style={{ ...t.body, color: '#fff' }}>{r.value}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Buttons: stacked full-width on phones, secondary pair side by side from sm up. */}
          <div className="flex flex-col gap-3">
            <motion.a
              href={contactCtaHref}
              target={bookExternal ? '_blank' : undefined}
              rel={bookExternal ? 'noopener noreferrer' : undefined}
              initial={{ boxShadow: '0 8px 32px rgba(139, 92, 246,0.4)' }}
              whileHover={{ scale: 1.03, boxShadow: '0 8px 32px rgba(139, 92, 246,0.6)' }}
              whileTap={{ scale: 0.97 }}
              className="flex w-full items-center justify-center gap-2.5 rounded-full px-6 py-5"
              style={{ background: gradientButton, color: '#fff', fontFamily: font, fontWeight: 700, fontSize: '17px', textDecoration: 'none' }}
            >
              <Icon name="arrow" width={19} height={19} /> {config.ctaSecondary}
            </motion.a>
            <div className="grid gap-3 sm:grid-cols-2">
              {/* Hidden until the CV PDF exists (config.cvUrl), so it can never 404. */}
              {config.cvUrl && (
                <motion.a href={config.cvUrl} download whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="btn-outline">
                  <Icon name="download" width={17} height={17} /> Download full CV
                </motion.a>
              )}
              {mailto && (
                <motion.a href={mailto} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="btn-outline">
                  <BrandIcon name="gmail" size={16} /> Email me
                </motion.a>
              )}
            </div>
          </div>
        </div>
      </FadeUp>
    </section>
  )
}
