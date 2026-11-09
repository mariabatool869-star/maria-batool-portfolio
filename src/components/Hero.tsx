import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { bookingHref, config, hero, copy } from '../data/content'
import { Counter } from '../lib/motion'
import { BrandIcon } from '../lib/BrandIcon'
import { contactLinks } from '../lib/links'
import { Icon } from '../lib/icons'
import { Monogram } from '../lib/Monogram'
import { SafeImage } from '../lib/SafeImage'
import { NeuralField } from '../lib/NeuralField'
import { color, font, glass, gradient, gradientButton, gradientSoft, gradientText, t } from '../lib/type'
import { usePageLoaded } from '../lib/usePageLoaded'
import { useReducedMotionSafe } from '../lib/useReducedMotionSafe'
import { useHeroParallax } from '../lib/parallax'

// Hero entrance: `data-rise="<delay s>"` runs the CSS fade-up in index.css,
// so the staggered entrance starts as soon as the pre-rendered HTML paints.

/** Floating stat card positions around the portrait (desktop only). */
const statSpots = [
  { top: '0%', left: '-6%' },
  { top: '6%', right: '-8%' },
  { bottom: '8%', left: '-10%' },
  { bottom: '0%', right: '-6%' },
]

function HeroBackground() {
  const reduce = useReducedMotionSafe()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoFailed, setVideoFailed] = useState(!config.heroVideo)
  // Attach the video sources only after the page has loaded, so fonts, CSS
  // and JS aren't competing with ~0.6–1.9 MB of video on mobile connections.
  // The poster (preloaded) shows until then, so nothing visibly changes.
  const attach = usePageLoaded()

  useEffect(() => {
    const v = videoRef.current
    if (!v || !attach) return
    // iOS and Android only autoplay when muted is set as a property too.
    v.muted = true
    // Fall back to the canvas only when the browser has no usable source
    // left (NETWORK_NO_SOURCE). Source errors don't bubble, so listen in the
    // capture phase; a phone-only source being skipped is not a failure.
    let timer = 0
    const onError = () => {
      clearTimeout(timer)
      timer = window.setTimeout(() => {
        if (v.error || v.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) setVideoFailed(true)
      }, 0)
    }
    v.addEventListener('error', onError, true)
    // Pause while off-screen or the tab is hidden, resume when visible.
    const io = new IntersectionObserver(([e]) => (e.isIntersecting && !document.hidden ? v.play().catch(() => {}) : v.pause()))
    io.observe(v)
    const onVis = () => (document.hidden ? v.pause() : v.play().catch(() => {}))
    document.addEventListener('visibilitychange', onVis)
    return () => { clearTimeout(timer); v.removeEventListener('error', onError, true); io.disconnect(); document.removeEventListener('visibilitychange', onVis) }
  }, [reduce, videoFailed, attach])

  const parallaxRef = useHeroParallax()
  let media
  if (reduce) {
    // Reduced motion: a still frame, never a moving background.
    media = config.heroPoster
      ? <img src={config.heroPoster} alt="" className="hero-media" fetchPriority="high" />
      : <NeuralField />
  } else if (!videoFailed) {
    media = (
      <video
        ref={videoRef}
        className="hero-media"
        autoPlay muted loop playsInline
        preload="none"
        poster={config.heroPoster || undefined}
        disablePictureInPicture
        disableRemotePlayback
        tabIndex={-1}
      >
        {attach && config.heroVideoWebm && <source src={config.heroVideoWebm} type="video/webm" />}
        {attach && <source src={config.heroVideo} type="video/mp4" />}
      </video>
    )
  } else {
    media = <NeuralField />
  }

  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 40%, #1F1333 0%, #0F0A1A 70%)' }} />
      {/* Parallax: the video drifts at 70% of scroll speed (see useHeroParallax). */}
      <div ref={parallaxRef} className="hero-parallax" style={{ position: 'absolute', inset: 0 }}>{media}</div>
      {/* Aurora overlays: deliberately light so the video stays vivid. */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'rgba(0,0,0,0.08)' }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'linear-gradient(to bottom, rgba(0,0,0,0.10) 0%, transparent 22%, transparent 60%, rgba(0,0,0,0.15) 100%)' }} />
      {/* Left-third protection for the headline and copy (body text stays ≥4.5:1 on every frame). */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 3, background: 'linear-gradient(to right, rgba(0,0,0,0.30) 0%, transparent 40%)' }} />
      {/* Violet glow from the top-left and a rose glow from the bottom-right. */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 3, background: 'radial-gradient(ellipse at 30% 0%, rgba(139,92,246,0.12) 0%, transparent 50%), radial-gradient(ellipse at 70% 100%, rgba(236,72,153,0.08) 0%, transparent 50%)' }} />
      {/* Right-third vignette so the portrait sits on a slightly darker area. */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 3, background: 'linear-gradient(to right, transparent 60%, rgba(15, 10, 26,0.4) 100%)' }} />
      <div style={{ position: 'absolute', top: '-14%', left: '50%', zIndex: 3, transform: 'translateX(-50%)', width: '1000px', maxWidth: '100vw', height: '720px', background: 'radial-gradient(ellipse at 50% 30%, rgba(139, 92, 246,0.18) 0%, transparent 68%)', pointerEvents: 'none' }} />
      {/* Fade into the page so the next section doesn't start on a hard edge. */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 3, height: '120px', background: `linear-gradient(to bottom, transparent, ${color.bg})` }} />
    </div>
  )
}

/**
 * Portrait in a circular frame: rotating blue→cyan gradient ring (4px), soft
 * glow and a gentle float, on a glass card. Falls back to the "SR" monogram.
 * Animations stop for reduced-motion users (index.css).
 */
function PortraitFrame({ variant }: { variant: 'lg' | 'sm' }) {
  const size = variant === 'lg' ? 360 : 220
  const fallback = (
    <span className="flex h-full w-full items-center justify-center"><Monogram size={Math.round(size * 0.45)} /></span>
  )
  return (
    <div className={`portrait-float portrait-${variant} relative`}>
      <div aria-hidden="true" className="portrait-ring absolute inset-0 rounded-full" />
      <div className="absolute rounded-full overflow-hidden" style={{ inset: 4, background: '#1A1028', boxShadow: '0 0 100px rgba(139, 92, 246,0.4)' }}>
        <SafeImage
          src={config.portrait}
          jpgFallback
          alt={`Portrait of ${config.name}`}
          width={size}
          height={size}
          loading="eager"
          className="h-full w-full object-cover"
          fallback={fallback}
        />
        <span aria-hidden="true" className="portrait-vignette pointer-events-none absolute inset-0" />
      </div>
    </div>
  )
}

/** Desktop: portrait on a glass card with the four stat cards floating around it. */
function Portrait() {
  return (
    <div className="portrait-stage relative mx-auto flex aspect-square w-full items-center justify-center">
      <div aria-hidden="true" className="portrait-card absolute rounded-[36px]" style={{ inset: '12%' }} />
      <PortraitFrame variant="lg" />
      {hero.stats.map((s, i) => (
        <div
          key={s.label}
          data-rise={(0.7 + i * 0.12).toFixed(2)}
          className="absolute"
          style={{ ...statSpots[i] }}
        >
          <div className="stat-float rounded-2xl px-4 py-3" style={{ ...glass, minWidth: 150, boxShadow: '0 12px 40px rgba(0,0,0,0.35)' }}>
            <div style={{ ...t.stat, fontSize: '1.75rem', ...gradientText }}>
              <Counter to={s.value} suffix={s.suffix} />
            </div>
            <div style={{ ...t.small, fontSize: '12.5px', color: color.muted, marginTop: 4 }}>{s.label}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Hero() {
  const socials = contactLinks()

  return (
    <section id="top" aria-label="Introduction" className="relative w-full overflow-hidden" style={{ minHeight: '100svh' }}>
      <HeroBackground />

      <div className="relative z-10 mx-auto grid min-h-[100svh] w-full max-w-[1440px] grid-cols-1 items-start gap-12 px-6 pb-28 pt-[20vh] md:px-16 md:pt-[22vh] lg:grid-cols-[1.25fr_1fr] lg:pb-32">
        <div className="max-w-[640px]">
          {/* Trust badge */}
          <div data-rise="0.1" className="hero-glass inline-flex items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-4" style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}>
            <span className="flex">
              {[0, 1, 2].map((i) => (
                <span key={i} style={{ width: 22, height: 22, borderRadius: 999, background: gradient, border: '2px solid rgba(15, 10, 26,0.9)', marginLeft: i === 0 ? 0 : -8 }} />
              ))}
            </span>
            <span style={{ fontFamily: font, fontSize: '12.5px', color: color.body }}>{hero.trustLine}</span>
          </div>

          {/* Award badge (hidden when there is no award) */}
          {hero.award && <div data-rise="0.18" className="hero-glass mt-4 flex w-fit items-center gap-2 rounded-full px-3.5 py-1.5" style={{ background: 'rgba(245,158,11,0.10)', border: '1px solid rgba(245,158,11,0.32)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', color: color.amber }}>
            <Icon name="trophy" width={15} height={15} />
            <span style={{ fontFamily: font, fontSize: '12.5px', fontWeight: 500, color: '#FCD34D' }}>{hero.award}</span>
          </div>}

          <h1 data-rise="0.25" className="rise-solid mt-6" style={t.heroName}>
            <span className="hero-tagline" style={gradientText}>{config.name.toUpperCase()}</span>
          </h1>

          {/* The slide-in runs on the wrapper and the gradient on the inner span:
              Safari can render background-clip:text invisible when both sit on one element. */}
          <p data-rise="0.33" className="rise-solid mt-4" style={t.heroTagline}>
            <span className="hero-tagline" style={{ ...gradientText, backgroundImage: gradientSoft }}>{config.tagline}</span>
          </p>

          <p data-rise="0.42" className="rise-solid mt-5 max-w-[560px]" style={{ ...t.body, color: color.body }}>
            {hero.valueProp}
          </p>

          <div data-rise="0.58" className="mt-8 flex flex-wrap items-center gap-3.5">
            <motion.a
              href="#projects"
              data-ripple
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-2"
              style={{ padding: '14px 26px', borderRadius: 999, background: gradientButton, boxShadow: '0 8px 32px rgba(139,92,246,0.4)', color: '#fff', fontFamily: font, fontSize: '14px', fontWeight: 700, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }}
            >
              {config.ctaPrimary}
              {/* UPDATE 4: arrow slides right 4px on hover */}
              <span className="inline-flex transition-transform duration-200 group-hover:translate-x-1"><Icon name="arrow" width={16} height={16} /></span>
            </motion.a>
            <a href={bookingHref} className="group flex items-center gap-3" style={{ textDecoration: 'none' }} target={bookingHref.startsWith('http') ? '_blank' : undefined} rel={bookingHref.startsWith('http') ? 'noopener noreferrer' : undefined}>
              <motion.span
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
                style={{ width: 44, height: 44, borderRadius: 999, background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', color: '#fff' }}
              >
                {/* UPDATE 4: soft 2s pulse (off for reduced motion) */}
                <span className="icon-pulse inline-flex"><Icon name="arrow" width={17} height={17} /></span>
              </motion.span>
              <span style={{ fontFamily: font, fontSize: '14px', fontWeight: 500, color: 'rgba(255,255,255,0.85)' }}>{config.ctaSecondary}</span>
            </a>
          </div>

          {/* Phones and tablets: portrait centred below the text */}
          <div data-rise="0.62" className="mt-10 flex justify-center lg:hidden">
            <div className="portrait-card-sm rounded-[28px] p-5">
              <PortraitFrame variant="sm" />
            </div>
          </div>

          {/* Stats as a grid on phones and tablets (floating cards are desktop only) */}
          <dl data-rise="0.66" className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:hidden">
            {hero.stats.map((s) => (
              <div key={s.label} className="hero-glass rounded-2xl px-4 py-3" style={glass}>
                <dd style={{ ...t.stat, fontSize: '1.6rem', ...gradientText }}><Counter to={s.value} suffix={s.suffix} /></dd>
                <dt style={{ ...t.small, fontSize: '12.5px', color: color.muted, marginTop: 4 }}>{s.label}</dt>
              </div>
            ))}
          </dl>

          {hero.pastClients.length > 0 && <div data-rise="0.74" className="mt-10">
            <p style={{ ...t.label, color: 'rgba(255,255,255,0.4)' }}>{copy.pastClientsLabel}</p>
            <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2" aria-label={copy.pastClientsLabel}>
              {hero.pastClients.map((c) => (
                <li key={c} style={{ fontFamily: font, fontWeight: 700, fontSize: '13px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>{c}</li>
              ))}
            </ul>
          </div>}
        </div>

        <div data-rise="0.4" className="hidden self-center lg:block">
          <Portrait />
        </div>
      </div>

      {socials.length > 0 && (
        <ul className="absolute bottom-8 left-6 z-10 flex gap-2.5 md:left-16" aria-label="Contact links">
          {socials.map((l) => (
            <li key={l.key}>
              <a
                href={l.href}
                target={l.external ? '_blank' : undefined}
                rel={l.external ? 'noopener noreferrer' : undefined}
                aria-label={l.label}
                title={l.label}
                className="social flex h-[34px] w-[34px] items-center justify-center rounded-full"
                style={{ border: '1px solid rgba(255,255,255,0.22)', color: 'rgba(255,255,255,0.8)', background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
              >
                <BrandIcon name={l.key} />
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
