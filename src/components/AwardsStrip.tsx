import { awards, backgrounds, copy } from '../data/content'
import { Icon } from '../lib/icons'
import { FadeUp } from '../lib/motion'
import { SafeImage } from '../lib/SafeImage'
import { sectionBg } from '../lib/sectionBg'
import { card, gradientButton, t } from '../lib/type'

/**
 * UPDATE 2: trophy images for the two awards (56px, coloured drop-shadow
 * glow that brightens and scales 1.05 when the card is hovered). The MSc card
 * keeps its SVG cap. If an image is missing, the SVG trophy shows instead.
 */
function AwardIcon({ a }: { a: (typeof awards)[number] }) {
  const svgTile = (
    <span className="award-icon flex shrink-0 items-center justify-center rounded-xl" style={{ background: gradientButton, color: '#fff', boxShadow: '0 8px 24px rgba(139,92,246,0.3)' }}>
      <Icon name={(a.kind as string) === 'award' ? 'trophy' : 'cap'} />
    </span>
  )
  if (!a.image) return svgTile
  // The wrapper stops the flex row from squeezing the image (the <picture>
  // element, not the <img>, is the flex item).
  return (
    <span className="flex shrink-0">
      <SafeImage
        src={a.image}
        jpgFallback
        alt=""
        width={56}
        height={56}
        className={`award-trophy award-trophy--${a.glow} rounded-xl object-contain`}
        fallback={svgTile}
      />
    </span>
  )
}

// FIX 2: awards background (10%, 7% on phones) via ::before.
const awardsBg = sectionBg(backgrounds.awards, { fade: false })

export default function AwardsStrip() {
  return (
    <section aria-labelledby="awards-title" className={`relative overflow-hidden ${awardsBg.className}`} style={{ ...awardsBg.style, background: 'rgba(139,92,246,0.04)', borderTop: '1px solid rgba(139,92,246,0.15)', borderBottom: '1px solid rgba(139,92,246,0.15)' }}>
      <h2 id="awards-title" className="sr-only">{copy.educationHeading}</h2>
      {/* The whole strip fades in as one unit: per-card reveals never fire for
          cards that start off-screen in the phone swipe row. */}
      <FadeUp>
        <ul className="no-scrollbar relative mx-auto flex max-w-[1200px] snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 py-10 md:grid md:grid-cols-3 md:overflow-visible md:px-10">
          {awards.map((a) => (
            <li key={a.title} className="min-w-[82%] snap-start sm:min-w-[60%] md:min-w-0">
              <div className="award-card flex h-full items-center gap-4 rounded-2xl p-5" style={card}>
                <AwardIcon a={a} />
                <div>
                  <h3 style={{ ...t.cardTitle, fontSize: '1.0625rem' }}>{a.title}</h3>
                  <p className="mt-1" style={t.small}>{a.body}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </FadeUp>
    </section>
  )
}
