import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useEffect, useState } from 'react'
import { bookingHref, config, navLinks, copy } from '../data/content'
import { BrandIcon } from '../lib/BrandIcon'
import { contactLinks } from '../lib/links'
import { Icon } from '../lib/icons'
import { Avatar } from '../lib/Avatar'
import { font } from '../lib/type'

const isExternal = (href: string) => href.startsWith('http')

export default function Navbar() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24))

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const linkStyle = { fontFamily: font, fontSize: '14px', fontWeight: 500, color: 'rgba(255,255,255,0.82)', textDecoration: 'none' }
  const solid = scrolled || open

  return (
    <header
      className="nav-in fixed inset-x-0 top-0 z-50"
      style={{
        background: solid ? 'rgba(15, 10, 26,0.7)' : 'transparent',
        backdropFilter: solid ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: solid ? 'blur(20px)' : 'none',
        borderBottom: `1px solid ${solid ? 'rgba(255,255,255,0.08)' : 'transparent'}`,
        transition: 'background 0.3s ease, border-color 0.3s ease',
      }}
    >
      <nav aria-label="Main" className="mx-auto flex items-center justify-between px-6 py-4 md:px-11 md:py-5">
        <div className="flex items-center gap-10">
          <a href="#top" className="flex items-center gap-3" style={{ textDecoration: 'none' }} aria-label={`${config.name}, back to top`}>
            <Avatar size={32} />
            <span style={{ fontFamily: font, fontWeight: 900, fontSize: '14px', letterSpacing: '0.14em', color: '#fff' }}>{config.name.toUpperCase()}</span>
          </a>
          <ul className="hidden items-center gap-7 lg:flex">
            {navLinks.map((l) => (
              <li key={l.href}><a href={l.href} className="nav-link" style={linkStyle}>{l.label}</a></li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-5">
          <span className="hidden items-center gap-2 xl:flex" style={{ fontFamily: font, fontSize: '13px', color: 'rgba(255,255,255,0.72)' }}>
            <span className="pulse-dot" aria-hidden="true" />
            {copy.navStatus}
          </span>
          <ul className="hidden items-center gap-2 md:flex" aria-label="Contact links">
            {contactLinks(['linkedin', 'gmail']).map((l) => (
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
          <motion.a
            href={bookingHref}
            target={isExternal(bookingHref) ? '_blank' : undefined}
            rel={isExternal(bookingHref) ? 'noopener noreferrer' : undefined}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="btn-nav hidden items-center gap-2 sm:inline-flex"
            style={{ fontFamily: font }}
          >
            {/* UPDATE 4: calendar icon; gradient border glow on hover (.btn-nav) */}
            <Icon name="arrow" width={15} height={15} />
            Contact me
          </motion.a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full lg:hidden"
            style={{ color: '#fff', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.06)' }}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? 'close' : 'menu'} width={20} height={20} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 pb-6">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={() => setOpen(false)} className="block py-3" style={{ ...linkStyle, fontSize: '17px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>{l.label}</a>
                </li>
              ))}
              <li className="pt-4 sm:hidden">
                <a href={bookingHref} onClick={() => setOpen(false)} className="block rounded-full py-3 text-center" style={{ fontFamily: font, fontWeight: 700, fontSize: '15px', color: '#0F0A1A', background: '#fff', textDecoration: 'none' }}>Contact me</a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
