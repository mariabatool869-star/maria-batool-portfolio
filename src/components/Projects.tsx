import type React from 'react'
import { motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { allProjects, backgrounds, copy, projectCategories, projects, type Project, type ProjectCategory, type WorkItem } from '../data/content'
import { Icon } from '../lib/icons'
import { Counter, FadeUp } from '../lib/motion'
import { SafeImage } from '../lib/SafeImage'
import { Section } from '../lib/Section'
import { sectionBg } from '../lib/sectionBg'
import { card, color, font, gradientText, t } from '../lib/type'
import { useMediaQuery } from '../lib/useMediaQuery'
import { useReducedMotionSafe } from '../lib/useReducedMotionSafe'
import { useDeferredStage } from '../lib/deferred'
import { useRevealGroup } from '../lib/reveal'

/** Grid placeholder shown only if a project image is missing. */
function Placeholder({ index }: { index: number }) {
  return (
    <div className="absolute inset-0" style={{
      backgroundImage: `radial-gradient(circle at ${30 + index * 20}% 40%, rgba(139, 92, 246,0.35), transparent 55%), radial-gradient(circle at 80% 80%, rgba(236, 72, 153,0.25), transparent 50%), linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`,
      backgroundSize: 'auto, auto, 32px 32px, 32px 32px',
    }} />
  )
}

/**
 * UPDATE 1 — hover-to-play project video.
 *
 * The still image is always the base layer (it doubles as the poster, so the
 * same file is never downloaded twice). The <video> sits on top at opacity 0
 * and fades in only once frames are actually playing, so there is never a
 * black flash.
 *
 * - Desktop (hover + fine pointer): plays on mouse enter, pauses and fades
 *   back to the image on mouse leave.
 * - Touch: image only until the visitor taps the Preview button; tap again
 *   to stop. Plays inline.
 * - prefers-reduced-motion: never plays on hover; the Preview button still
 *   works, because pressing it is an explicit request.
 * - Nothing is fetched until the first hover/tap (preload="none", and the
 *   <source> elements are only added at that point).
 * - If the video can't play, it is removed and the image stays.
 */
function ProjectVisual({ p, index }: { p: Project; index: number }) {
  const reduce = useReducedMotionSafe()
  const canHover = useMediaQuery('(hover: hover) and (pointer: fine)')
  const videoRef = useRef<HTMLVideoElement>(null)
  const [armed, setArmed] = useState(false) // sources attached (first hover/tap)
  const [wanted, setWanted] = useState(false) // should be playing
  const [visible, setVisible] = useState(false) // frames are on screen
  const [failed, setFailed] = useState(false)
  const hasVideo = Boolean(p.video) && !failed

  const request = (on: boolean) => {
    if (!hasVideo) return
    if (on) setArmed(true)
    setWanted(on)
  }

  // Play / pause whenever the wish changes (sources exist once `armed`).
  useEffect(() => {
    const v = videoRef.current
    if (!v || !armed) return
    if (wanted) {
      v.muted = true // required for inline autoplay on iOS/Android
      v.play().catch(() => setWanted(false))
    } else {
      v.pause() // the video's own `pause` event fades it out (onPause below)
    }
  }, [armed, wanted])

  // Fall back to the image if no source can be played.
  useEffect(() => {
    const v = videoRef.current
    if (!v || !armed) return
    let timer = 0
    const onError = () => {
      clearTimeout(timer)
      timer = window.setTimeout(() => {
        if (v.error || v.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) { setFailed(true); setWanted(false) }
      }, 0)
    }
    v.addEventListener('error', onError, true) // <source> errors don't bubble
    return () => { clearTimeout(timer); v.removeEventListener('error', onError, true) }
  }, [armed])

  const hoverHandlers = canHover && !reduce
    ? { onMouseEnter: () => request(true), onMouseLeave: () => request(false) }
    : {}

  return (
    <figure
      {...hoverHandlers}
      className="project-visual relative aspect-video w-full overflow-hidden rounded-2xl"
      style={{ border: `1px solid ${color.cardBorder}`, background: '#1A1028' }}
    >
      <SafeImage
        src={p.image}
        jpgFallback
        alt={`${p.title} concept visual`}
        width={1600}
        height={900}
        className="project-still absolute inset-0 h-full w-full object-cover"
        fallback={<Placeholder index={index} />}
      />

      {hasVideo && p.video && (
        <video
          ref={videoRef}
          aria-hidden="true"
          tabIndex={-1}
          muted
          loop
          playsInline
          preload="none"
          disablePictureInPicture
          onPlaying={() => setVisible(true)}
          onPause={() => setVisible(false)}
          className="project-video absolute inset-0 h-full w-full object-cover"
          style={{ opacity: visible ? 1 : 0 }}
        >
          {armed && <source src={p.video.webm} type="video/webm" />}
          {armed && <source src={p.video.mp4} type="video/mp4" />}
        </video>
      )}

      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2" style={{ background: 'linear-gradient(to top, rgba(15, 10, 26,0.92), rgba(15, 10, 26,0.4) 45%, transparent)' }} />
      <figcaption className="pointer-events-none absolute bottom-4 left-5 right-24">
        <span style={{ fontFamily: font, fontWeight: 700, fontSize: 'clamp(1rem, 1.8vw, 1.2rem)', color: '#fff' }}>{p.title}</span>
        <span className="block" style={{ ...t.small, fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>{p.stack.slice(0, 4).join('  /  ')}</span>
      </figcaption>

      {/* Preview toggle: the way to play on touch devices and for keyboard or
          reduced-motion users. On desktop it also shows the current state. */}
      {hasVideo && (
        <button
          type="button"
          onClick={() => request(!wanted)}
          aria-pressed={wanted}
          aria-label={`${wanted ? 'Stop' : 'Play'} ${p.title} preview video`}
          className="preview-toggle absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            {wanted ? <path d="M6 5h4v14H6zM14 5h4v14h-4z" /> : <path d="M8 5v14l11-7z" />}
          </svg>
          {wanted ? 'Pause' : 'Preview'}
        </button>
      )}
    </figure>
  )
}

function ProjectCard({ p, index }: { p: Project; index: number }) {
  return (
    <FadeUp as="article">
      <div className="project-card relative overflow-hidden rounded-3xl p-6 md:p-10" style={card}>
        <header className="flex flex-col gap-2 md:flex-row md:items-end md:gap-6">
          <span aria-hidden="true" style={{ fontFamily: font, fontWeight: 900, fontSize: 'clamp(3.5rem, 7vw, 6rem)', lineHeight: 0.85, letterSpacing: '-0.04em', opacity: 0.8, ...gradientText }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <div>
            <h3 style={t.projectTitle}>{p.title}</h3>
            <p className="mt-1" style={t.small}>{p.client}</p>
          </div>
        </header>
        {p.summary && <p className="mt-5 max-w-[980px]" style={{ ...t.body, color: 'rgba(255,255,255,0.74)' }}>{p.summary}</p>}

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
          <ProjectVisual p={p} index={index} />

          <div className="flex flex-col">
            <dl className="grid grid-cols-3 gap-4 pb-6" style={{ borderBottom: `1px solid ${color.cardBorder}` }}>
              {p.metrics.map((m) => (
                <div key={m.label}>
                  <dd style={{ ...t.stat, fontSize: 'clamp(1.6rem, 3vw, 2.25rem)', ...gradientText }}>
                    {m.value === null ? m.text : <Counter to={m.value} prefix={m.prefix} suffix={m.suffix} />}
                  </dd>
                  <dt className="mt-2" style={{ ...t.small, fontSize: '13px', lineHeight: 1.45 }}>{m.label}</dt>
                </div>
              ))}
            </dl>

            <h4 className="mt-6" style={t.label}>{copy.flagshipListLabel}</h4>
            <ul className="mt-3 space-y-3">
              {p.how.map((h) => (
                <li key={h} className="flex gap-3" style={{ ...t.body, fontSize: '15px', lineHeight: 1.6 }}>
                  <span aria-hidden="true" className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: color.blue, boxShadow: `0 0 8px ${color.blue}` }} />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap gap-2" aria-label={`${p.title} tech stack`}>
            {p.stack.map((s) => <li key={s} className="pill">{s}</li>)}
          </ul>
          {(p.liveUrl || p.caseStudyUrl) && (
            <div className="flex shrink-0 gap-3">
              {p.liveUrl && (
                // UPDATE 4: external-link icon nudges up-right on hover.
                <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost group">
                  {/github\.com/.test(p.liveUrl) ? 'View code' : 'View live site'}
                  <span className="inline-flex transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    <Icon name="external" width={15} height={15} />
                  </span>
                </motion.a>
              )}
              {p.caseStudyUrl && (
                <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} href={p.caseStudyUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost group">
                  Read case study
                  <span className="inline-flex transition-transform duration-200 group-hover:translate-x-1"><Icon name="arrow" width={15} height={15} /></span>
                </motion.a>
              )}
            </div>
          )}
        </div>
      </div>
    </FadeUp>
  )
}

/** Gradient placeholder for a project without an image (or if it fails). */
function WorkPlaceholder({ seed }: { seed: number }) {
  return (
    <div className="absolute inset-0" style={{
      backgroundImage: `radial-gradient(circle at ${20 + (seed * 37) % 60}% 35%, rgba(139, 92, 246,0.35), transparent 55%), radial-gradient(circle at 80% 85%, rgba(236, 72, 153,0.25), transparent 50%), linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`,
      backgroundSize: 'auto, auto, 28px 28px, 28px 28px',
    }} />
  )
}

/**
 * Card media: 16:9 image (lazy) that opens the lightbox. If the project has a
 * video (Xila), it behaves like the flagship cards: plays on hover (desktop),
 * via the Preview button (touch, keyboard, reduced motion), fetched only on
 * first use, and removed if it cannot play.
 */
function CardMedia({ p, seed, onOpen }: { p: WorkItem; seed: number; onOpen: () => void }) {
  const reduce = useReducedMotionSafe()
  const canHover = useMediaQuery('(hover: hover) and (pointer: fine)')
  const ref = useRef<HTMLVideoElement>(null)
  const [armed, setArmed] = useState(false)
  const [wanted, setWanted] = useState(false)
  const [visible, setVisible] = useState(false)
  const [failed, setFailed] = useState(false)
  const hasVideo = Boolean(p.video) && !failed
  const request = (on: boolean) => { if (!hasVideo) return; if (on) setArmed(true); setWanted(on) }

  useEffect(() => {
    const v = ref.current
    if (!v || !armed) return
    if (wanted) { v.muted = true; v.play().catch(() => setWanted(false)) } else v.pause()
  }, [armed, wanted])
  useEffect(() => {
    const v = ref.current
    if (!v || !armed) return
    let timer = 0
    const onError = () => { clearTimeout(timer); timer = window.setTimeout(() => { if (v.error || v.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) { setFailed(true); setWanted(false) } }, 0) }
    v.addEventListener('error', onError, true)
    return () => { clearTimeout(timer); v.removeEventListener('error', onError, true) }
  }, [armed])

  const hover = canHover && !reduce ? { onMouseEnter: () => request(true), onMouseLeave: () => request(false) } : {}
  return (
    <div {...hover} className="work-media relative aspect-video overflow-hidden rounded-t-2xl" style={{ background: '#1A1028' }}>
      <button type="button" onClick={onOpen} className="absolute inset-0 block h-full w-full" style={{ cursor: 'zoom-in' }} aria-label={`Open ${p.title} details`}>
        {p.image
          ? <SafeImage src={p.image} jpgFallback alt="" width={800} height={450} className="absolute inset-0 h-full w-full object-cover" fallback={<WorkPlaceholder seed={seed} />} />
          : <WorkPlaceholder seed={seed} />}
        {hasVideo && p.video && (
          <video ref={ref} aria-hidden="true" tabIndex={-1} muted loop playsInline preload="none" disablePictureInPicture
            onPlaying={() => setVisible(true)} onPause={() => setVisible(false)}
            className="project-video pointer-events-none absolute inset-0 h-full w-full object-cover" style={{ opacity: visible ? 1 : 0 }}>
            {armed && <source src={p.video.webm} type="video/webm" />}
            {armed && <source src={p.video.mp4} type="video/mp4" />}
          </video>
        )}
      </button>
      {hasVideo && (
        <button type="button" onClick={() => request(!wanted)} aria-pressed={wanted}
          aria-label={`${wanted ? 'Stop' : 'Play'} ${p.title} preview video`}
          className="preview-toggle absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{wanted ? <path d="M6 5h4v14H6zM14 5h4v14h-4z" /> : <path d="M8 5v14l11-7z" />}</svg>
          {wanted ? 'Pause' : 'Preview'}
        </button>
      )}
    </div>
  )
}

/**
 * Lightbox: large image, description, tech stack and "Visit site" when a URL
 * exists. Escape, the close button or a click outside closes it; focus moves
 * into the dialog and returns to the card afterwards; the page does not scroll.
 */
function Lightbox({ p, label, onClose }: { p: WorkItem; label: string; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    const html = document.documentElement
    const old = html.style.overflow
    html.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab') {
        // keep focus inside the dialog
        const f = [...document.querySelectorAll<HTMLElement>('.lightbox-panel a, .lightbox-panel button')]
        if (!f.length) return
        const first = f[0], last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); html.style.overflow = old; prev?.focus() }
  }, [onClose])

  // Rendered into <body>: the projects section is its own stacking context
  // (for its background), which would otherwise trap the overlay under the nav.
  return createPortal(
    <div className="lightbox fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-8" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-labelledby="lightbox-title" className="lightbox-panel relative w-full max-w-[1000px] overflow-hidden rounded-3xl"
        style={{ ...card, background: 'rgba(26, 16, 40,0.97)', maxHeight: '92vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
        <div className="relative aspect-video w-full" style={{ background: '#1A1028' }}>
          {p.image ? <SafeImage src={`${p.image}-lg.webp`} alt={`${p.title} visual`} width={1600} height={900} loading="eager" className="absolute inset-0 h-full w-full object-cover" fallback={<WorkPlaceholder seed={3} />} /> : <WorkPlaceholder seed={3} />}
        </div>
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close" className="lightbox-close absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full">
          <Icon name="close" width={18} height={18} />
        </button>
        <div className="p-6 md:p-8">
          <span className="rounded-full px-2.5 py-1" style={{ fontFamily: font, fontSize: '11px', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: color.body, background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)' }}>{label}</span>
          <h3 id="lightbox-title" className="mt-4" style={t.projectTitle}>{p.title}</h3>
          <p className="mt-3 max-w-[720px]" style={t.bodyLg}>{p.description}</p>
          {p.tech.length > 0 && <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tech stack">{p.tech.map((tch) => <li key={tch} className="pill">{tch}</li>)}</ul>}
          {p.url && (
            <a href={p.url} target="_blank" rel="noopener noreferrer" data-ripple className="btn-ghost group mt-6">
              {/github\.com/.test(p.url) ? 'View code' : 'Visit site'} <span className="inline-flex transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"><Icon name="external" width={15} height={15} /></span>
            </a>
          )}
        </div>
      </div>
    </div>,
    document.body,
  )
}

/**
 * All projects: 9 featured cards first; "Show all" expands to the full grid
 * with category filters (3 columns desktop, 2 tablet, 1 phone). The heading
 * is pre-rendered; the grid renders after page load (deferred stage 2).
 */
function ProjectGrid() {
  // With 9 or fewer projects everything shows at once (no "Show all" step).
  const [expanded, setExpanded] = useState(allProjects.length <= 9)
  const [filter, setFilter] = useState<ProjectCategory | 'all'>('all')
  const [open, setOpen] = useState<WorkItem | null>(null)
  const gridRef = useRevealGroup<HTMLUListElement>()
  const counts = Object.fromEntries(projectCategories.map((c) => [c.id, allProjects.filter((p) => p.category === c.id).length]))
  const label = Object.fromEntries(projectCategories.map((c) => [c.id, c.label])) as Record<ProjectCategory, string>
  const featured = allProjects.filter((p) => p.featured)
  const shown = !expanded ? featured : filter === 'all' ? allProjects : allProjects.filter((p) => p.category === filter)
  const buttons: { id: ProjectCategory | 'all'; label: string; n: number }[] = [
    { id: 'all', label: 'All', n: allProjects.length },
    // Only categories that have projects get a filter button.
    ...projectCategories.map((c) => ({ id: c.id, label: c.label, n: counts[c.id] })).filter((b) => b.n > 0),
  ]
  const close = useCallback(() => setOpen(null), [])

  return (
    <>
      {expanded && (
        <div role="group" aria-label="Filter projects by category" className="mt-8 flex flex-wrap gap-2">
          {buttons.map((b) => (
            <button key={b.id} type="button" aria-pressed={filter === b.id} onClick={() => setFilter(b.id)} className="filter-btn rounded-full px-4 py-2">
              {b.label} <span style={{ opacity: 0.6 }}>({b.n})</span>
            </button>
          ))}
        </div>
      )}

      <p className="sr-only" aria-live="polite">{shown.length} projects shown</p>

      <ul ref={gridRef} id="all-projects-grid" className="reveal-group mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((pr, i) => (
          <li key={pr.title} style={{ '--i': Math.min(i, 11) } as React.CSSProperties}>
            <article className="work-card flex h-full flex-col rounded-2xl" style={card}>
              <CardMedia p={pr} seed={i} onOpen={() => setOpen(pr)} />
              <div className="flex flex-1 flex-col p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full px-2.5 py-1" style={{ fontFamily: font, fontSize: '11px', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: color.body, background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)' }}>
                    {label[pr.category]}
                  </span>
                  {pr.pending && (
                    <span className="rounded-full px-2.5 py-1" style={{ fontFamily: font, fontSize: '11px', fontWeight: 500, color: '#FCD34D', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.35)' }}>
                      Details pending
                    </span>
                  )}
                </div>
                <h4 className="mt-3" style={{ ...t.cardTitle, fontSize: '1.0625rem' }}>{pr.title}</h4>
                <p className="mt-1.5 flex-1" style={{ ...t.body, fontSize: '14.5px', lineHeight: 1.6 }}>{pr.description}</p>
                {pr.tech.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`${pr.title} tech stack`}>
                    {pr.tech.map((tch) => <li key={tch} className="pill" style={{ fontSize: '12px', padding: '6px 10px' }}>{tch}</li>)}
                  </ul>
                )}
              </div>
            </article>
          </li>
        ))}
      </ul>

      {!expanded && (
        <div className="mt-8 flex justify-center">
          <motion.button type="button" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setExpanded(true)}
            aria-expanded={expanded} aria-controls="all-projects-grid" className="btn-ghost" style={{ cursor: 'pointer' }}>
            Show all {allProjects.length} projects <Icon name="arrow" width={15} height={15} />
          </motion.button>
        </div>
      )}

      {open && <Lightbox p={open} label={label[open.category]} onClose={close} />}
    </>
  )
}

// FIX 6: subtle projects background (10%; 7% on phones), full-bleed, fixed on desktop.
const allProjectsBg = sectionBg(backgrounds.allProjects)

function AllProjects() {
  const ready = useDeferredStage(2)
  return (
    <div className={`mt-20 ${allProjectsBg.className} has-bg--bleed has-bg--fixed`} style={allProjectsBg.style} id="all-projects">
      <FadeUp>
        <h3 style={{ ...t.sectionTitle, fontSize: 'clamp(1.6rem, 3vw, 2rem)' }}><span className="hero-tagline" style={gradientText}>{copy.allProjects.title}</span></h3>
        <p className="mt-3" style={t.subhead}>{copy.allProjects.subtitle}</p>
      </FadeUp>
      {ready ? <ProjectGrid /> : <div aria-hidden="true" className="deferred-projects" />}
    </div>
  )
}

export default function Projects() {
  return (
    <Section id="projects" bg={backgrounds.projects} title={copy.projects.title} subtitle={copy.projects.subtitle}>
      <div className="space-y-8 md:space-y-10">
        {projects.map((p, i) => <ProjectCard key={p.id} p={p} index={i} />)}
      </div>
      <AllProjects />
    </Section>
  )
}
