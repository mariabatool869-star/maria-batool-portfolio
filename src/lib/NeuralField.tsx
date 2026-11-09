import { useEffect, useRef } from 'react'

/**
 * Animated neural-network field drawn on a canvas.
 * Used as the hero background when no video is available.
 * - Pauses when off-screen or the tab is hidden.
 * - Draws one still frame for reduced-motion users.
 */
export function NeuralField() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0, h = 0, raf = 0, running = true
    type Node = { x: number; y: number; vx: number; vy: number; r: number; hue: number; phase: number }
    let nodes: Node[] = []

    const resize = () => {
      w = canvas.clientWidth; h = canvas.clientHeight
      canvas.width = w * dpr; canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.round(Math.min(90, Math.max(36, (w * h) / 16000)))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22, vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.6 + 0.8, hue: Math.random(), phase: Math.random() * Math.PI * 2,
      }))
    }

    const link = Math.min(170, Math.max(110, window.innerWidth / 9))
    const draw = (time: number) => {
      ctx.clearRect(0, 0, w, h)
      for (const n of nodes) {
        if (!reduce) {
          n.x += n.vx; n.y += n.vy
          if (n.x < -20) n.x = w + 20; if (n.x > w + 20) n.x = -20
          if (n.y < -20) n.y = h + 20; if (n.y > h + 20) n.y = -20
        }
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j]
          const dx = a.x - b.x, dy = a.y - b.y
          const d = Math.hypot(dx, dy)
          if (d < link) {
            const alpha = (1 - d / link) * 0.32
            const g = ctx.createLinearGradient(a.x, a.y, b.x, b.y)
            g.addColorStop(0, `rgba(139, 92, 246,${alpha})`)
            g.addColorStop(1, `rgba(236, 72, 153,${alpha})`)
            ctx.strokeStyle = g; ctx.lineWidth = 0.8
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
          }
        }
      }
      for (const n of nodes) {
        const pulse = reduce ? 0.7 : 0.55 + 0.45 * Math.sin(time / 900 + n.phase)
        ctx.fillStyle = n.hue > 0.5 ? `rgba(236, 72, 153,${0.5 + 0.5 * pulse})` : `rgba(96,165,250,${0.5 + 0.5 * pulse})`
        ctx.shadowColor = n.hue > 0.5 ? '#EC4899' : '#8B5CF6'
        ctx.shadowBlur = 8 * pulse
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill()
      }
      ctx.shadowBlur = 0
      if (running && !reduce) raf = requestAnimationFrame(draw)
    }

    resize(); draw(0)
    const onResize = () => { resize(); if (reduce) draw(0) }
    window.addEventListener('resize', onResize)

    const start = () => { if (!running && !reduce) { running = true; raf = requestAnimationFrame(draw) } }
    const stop = () => { running = false; cancelAnimationFrame(raf) }
    const io = new IntersectionObserver(([e]) => (e.isIntersecting && !document.hidden ? start() : stop()))
    io.observe(canvas)
    const onVis = () => (document.hidden ? stop() : start())
    document.addEventListener('visibilitychange', onVis)

    return () => { stop(); io.disconnect(); window.removeEventListener('resize', onResize); document.removeEventListener('visibilitychange', onVis) }
  }, [])

  return <canvas ref={ref} aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
}
