import '@/styles/selva/feature-row.css'
import { storyblokEditable } from '@storyblok/react/rsc'

interface FeatureItemBlok {
  _uid: string; component: 'feature_item'
  icon_name?: string; title?: string; desc?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any
}
export interface DesignPillarsBlok {
  _uid: string; component: 'design_pillars'
  items?: FeatureItemBlok[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any
}

const ICON_MAP: Record<string, React.ReactNode> = {
  botanical: (
    <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 38V21a13 13 0 0 1 26 0v17" /><line x1="5" y1="38" x2="39" y2="38" />
    </svg>
  ),
  living: (
    <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="8" width="26" height="28" rx="1" />
      <line x1="22" y1="8" x2="22" y2="36" /><line x1="9" y1="22" x2="35" y2="22" />
    </svg>
  ),
  serenity: (
    <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <line x1="6" y1="31" x2="38" y2="31" /><path d="M14 31a8 8 0 0 1 16 0" />
      <line x1="22" y1="11" x2="22" y2="15" />
      <line x1="10.5" y1="18.5" x2="13" y2="21" /><line x1="33.5" y1="18.5" x2="31" y2="21" />
    </svg>
  ),
}

const DEFAULTS: FeatureItemBlok[] = [
  {
    _uid: 'p1', component: 'feature_item', icon_name: 'botanical',
    title: 'Botanical\nArchitecture',
    desc: "Designed in dialogue with Miami's tropical canopy, every facade and terrace integrates living material — from shaded loggias to rooftop gardens that evolve with the seasons.",
  },
  {
    _uid: 'p2', component: 'feature_item', icon_name: 'living',
    title: 'Living\nInteriors',
    desc: 'A material palette of warm stone, aged timber, and hand-plastered walls brings the outside in. Every surface is chosen for its sensory connection to the earth beneath the canopy.',
  },
  {
    _uid: 'p3', component: 'feature_item', icon_name: 'serenity',
    title: 'Urban\nSerenity',
    desc: "SELVA offers the rare privilege of seclusion without distance — a quietude only the canopy provides, with Miami's design districts, bay, and cultural heart just minutes away.",
  },
]

export default function DesignPillars({ blok }: { blok?: DesignPillarsBlok }) {
  const items = blok?.items?.length ? blok.items : DEFAULTS

  return (
    <section
      className="icon-grid icon-grid--showcase icon-grid--cols-3 vis-pillars"
      {...(blok ? storyblokEditable(blok) : {})}
    >
      {items.map((item, i) => {
        const titleLines = (item.title ?? '').split('\n')
        return (
          <div
            key={item._uid}
            className="icon-grid__item reveal"
            {...(i > 0 ? { 'data-delay': String(i * 120) } : {})}
            {...storyblokEditable(item)}
          >
            <span className="icon-grid__icon" aria-hidden="true">
              {ICON_MAP[item.icon_name ?? ''] ?? null}
            </span>
            <h3 className="icon-grid__name">
              {titleLines.map((line, j) => (
                <span key={j}>{line}{j < titleLines.length - 1 && <br />}</span>
              ))}
            </h3>
            <p className="icon-grid__desc">{item.desc}</p>
          </div>
        )
      })}
    </section>
  )
}
