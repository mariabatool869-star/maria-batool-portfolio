import { backgrounds, config, navLinks, copy } from '../data/content'
import { BrandIcon } from '../lib/BrandIcon'
import { contactLinks } from '../lib/links'
import { Avatar } from '../lib/Avatar'
import { sectionBg } from '../lib/sectionBg'
import { color, font, t } from '../lib/type'

const footerBg = sectionBg(backgrounds.footer, { fade: false })

export default function Footer() {
  return (
    // FIX 2: footer background (12%, centre top; 8.4% on phones) via ::before.
    <footer className={`relative overflow-hidden px-6 pb-10 pt-4 md:px-10 ${footerBg.className}`} style={{ ...footerBg.style, borderTop: `1px solid ${color.cardBorder}` }}>
      <div className="relative mx-auto flex max-w-[1200px] flex-col gap-8 pt-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Avatar size={40} />
          <p style={{ fontFamily: font, fontWeight: 700, fontSize: '15px', color: '#fff' }}>
            {config.name}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {navLinks.map((l) => <li key={l.href}><a href={l.href} className="footer-link" style={t.small}>{l.label}</a></li>)}
            </ul>
          </nav>
          <ul className="flex items-center gap-2" aria-label="Contact links">
            {/* LinkedIn, Gmail and X (X appears once config.socials.x is set). */}
            {contactLinks(['linkedin', 'gmail', 'x']).map((l) => (
              <li key={l.key}>
                <a
                  href={l.href}
                  target={l.external ? '_blank' : undefined}
                  rel={l.external ? 'noopener noreferrer' : undefined}
                  aria-label={l.label}
                  title={l.label}
                  className="social flex h-9 w-9 items-center justify-center rounded-full"
                  style={{ border: '1px solid rgba(255,255,255,0.22)', color: 'rgba(255,255,255,0.8)' }}
                >
                  <BrandIcon name={l.key} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="relative mx-auto mt-8 flex max-w-[1200px] flex-col gap-1 md:flex-row md:items-center md:justify-between md:gap-6">
        <p style={{ ...t.small, fontSize: '13px', color: color.muted }}>© {new Date().getFullYear()} {config.name}. All rights reserved.</p>
          <p style={{ ...t.small, fontSize: '12px', color: color.muted }}>Last updated: {config.lastUpdated}</p>
        <p style={{ ...t.small, fontSize: '13px', color: 'rgba(167, 139, 250,0.7)' }}>{copy.footerTagline}</p>
      </div>
    </footer>
  )
}
