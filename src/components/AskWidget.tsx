import { useEffect, useRef, useState } from 'react'
import { askQA, config } from '../data/content'
import { Icon } from '../lib/icons'
import { font } from '../lib/type'

/**
 * "Ask about <first name>": five pre-written answers from content.ts (askQA).
 * No AI and no network requests.
 */
const QA = askQA
const askTitle = `Ask about ${config.name.split(' ')[0]}`

export default function AskWidget() {
  const [open, setOpen] = useState(false)
  const [chat, setChat] = useState<{ from: 'you' | 'them'; text: string }[]>([])
  const panelRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const logRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    panelRef.current?.querySelector<HTMLElement>('button')?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); btnRef.current?.focus() } }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])
  useEffect(() => { logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: 'smooth' }) }, [chat])

  const ask = (i: number) => setChat((c) => [...c, { from: 'you', text: QA[i].q }, { from: 'them', text: QA[i].a }])

  return (
    <>
      {open && (
        <div ref={panelRef} id="ask-panel" role="dialog" aria-label={askTitle} className="ask-panel fixed z-[70] flex flex-col overflow-hidden rounded-2xl">
          <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <p style={{ fontFamily: font, fontWeight: 700, fontSize: '15px', color: '#fff' }}>{askTitle}</p>
            <button type="button" onClick={() => { setOpen(false); btnRef.current?.focus() }} aria-label="Close" className="flex h-8 w-8 items-center justify-center rounded-full" style={{ color: '#fff', background: 'rgba(255,255,255,0.06)' }}>
              <Icon name="close" width={16} height={16} />
            </button>
          </div>
          <div ref={logRef} className="flex-1 space-y-2 overflow-y-auto px-4 py-3" aria-live="polite">
            {chat.length === 0 && <p style={{ fontFamily: font, fontSize: '13.5px', color: '#DDD6FE' }}>Pick a question below.</p>}
            {chat.map((m, i) => (
              <p key={i} className={`ask-bubble ${m.from === 'you' ? 'ask-you' : 'ask-them'}`}>{m.text}</p>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5 px-4 pb-4 pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            {QA.map((x, i) => (
              <button key={x.q} type="button" onClick={() => ask(i)} className="ask-chip">{x.q}</button>
            ))}
          </div>
        </div>
      )}
      <button ref={btnRef} type="button" onClick={() => setOpen((o) => !o)} aria-label={askTitle} aria-expanded={open} aria-controls="ask-panel" data-ripple className="ask-fab fixed z-[70] inline-flex items-center gap-2 rounded-full">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
        <span className="ask-fab-label">{askTitle}</span>
      </button>
    </>
  )
}
