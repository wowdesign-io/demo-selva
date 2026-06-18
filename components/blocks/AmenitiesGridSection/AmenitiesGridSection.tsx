'use client'

import { storyblokEditable } from '@storyblok/react'

interface FeatureItemBlok {
  _uid: string; component: 'feature_item'
  icon_name?: string; title?: string; desc?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any
}
export interface AmenitiesGridBlok {
  _uid: string; component: 'amenities_grid'
  label?: string; count?: string
  items?: FeatureItemBlok[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any
}

// SVG icons keyed by icon_name field value
const ICONS: Record<string, React.ReactNode> = {
  pool: <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 15q5-5 10 0t10 0 10 0" /><path d="M5 23q5-5 10 0t10 0 10 0" /><path d="M5 31q5-5 10 0t10 0 10 0" /></svg>,
  spa: <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M22 7c-7 9-10 14-10 19a10 10 0 0 0 20 0c0-5-3-10-10-19z" /></svg>,
  sky: <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="22" cy="17" r="6" /><path d="M22 5v3M22 26v2M9 17h3M32 17h3M12.5 7.5l2 2M31.5 7.5l-2 2" /><path d="M6 35h32" /></svg>,
  lounge: <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21v-2a3 3 0 0 1 3-3h20a3 3 0 0 1 3 3v2" /><rect x="6" y="21" width="32" height="10" rx="3" /><path d="M11 31v4M33 31v4" /></svg>,
  fitness: <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M14 22h16" /><rect x="7" y="15" width="6" height="14" rx="2" /><rect x="31" y="15" width="6" height="14" rx="2" /></svg>,
  library: <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M22 13c-4-3-9-3-14-1.5v21C13 30 18 30 22 33c4-3 9-3 14-1.5v-21C31 10 26 10 22 13z" /><path d="M22 13v20" /></svg>,
  courtyard: <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M22 35V17" /><path d="M22 24c0-5.5 4.2-9.8 9.6-9.8C31.6 19.7 27.4 24 22 24z" /><path d="M22 28c0-4.4-3.4-7.8-7.7-7.8C14.3 24.6 17.7 28 22 28z" /></svg>,
}

const DEFAULT_ITEMS: FeatureItemBlok[] = [
  { _uid: 'g1', component: 'feature_item', icon_name: 'pool',      title: 'Pool Terrace',      desc: "An infinity-edge pool above the canopy, framed by swaying palms and open Miami sky — open from sunrise to sunset for residents." },
  { _uid: 'g2', component: 'feature_item', icon_name: 'spa',       title: 'Wellness Spa',      desc: "Private treatment rooms, sauna, steam, and a cold-plunge pool — a sanctuary for deep restoration and unhurried wellbeing." },
  { _uid: 'g3', component: 'feature_item', icon_name: 'sky',       title: 'Sky Terrace',       desc: "A rooftop terrace with fire feature and lounge seating, set among the treetops for golden-hour gatherings under open sky." },
  { _uid: 'g4', component: 'feature_item', icon_name: 'lounge',    title: "Residents' Lounge", desc: "An indoor lounge of linen, stone, and living greenery — for receptions, quiet afternoons, and evenings by the fire." },
  { _uid: 'g5', component: 'feature_item', icon_name: 'fitness',   title: 'Fitness Studio',    desc: "A light-filled studio facing a vertical garden, equipped for strength, cardio, and stretch amid the green." },
  { _uid: 'g6', component: 'feature_item', icon_name: 'library',   title: 'Library & Co-Work', desc: "An oak-panelled library and communal worktable — for focused work or quiet study amid the treetops." },
  { _uid: 'g7', component: 'feature_item', icon_name: 'courtyard', title: 'Garden Courtyard',  desc: "A meandering botanical courtyard with a water feature and shaded stone seating at the heart of the building." },
]

export default function AmenitiesGridSection({ blok }: { blok?: AmenitiesGridBlok }) {
  const label = blok?.label ?? 'All Amenities'
  const count = blok?.count ?? 'Seven experiences'
  const items = blok?.items?.length ? blok.items : DEFAULT_ITEMS
  const delays = [0, 80, 160, 0, 80, 160, 240]

  return (
    <section className="amen-grid" {...(blok ? storyblokEditable(blok) : {})}>
      <div className="amen-grid__header">
        <span className="amen-grid__label">{label}</span>
        <span className="amen-grid__count">{count}</span>
      </div>
      <div className="icon-grid icon-grid--showcase icon-grid--cols-3">
        {items.map((item, i) => (
          <div
            key={item._uid}
            className="icon-grid__item reveal"
            {...(delays[i] ? { 'data-delay': String(delays[i]) } : {})}
            {...storyblokEditable(item)}
          >
            <span className="icon-grid__icon" aria-hidden="true">
              {ICONS[item.icon_name ?? ''] ?? null}
            </span>
            <h3 className="icon-grid__name">{item.title}</h3>
            {item.desc && <p className="icon-grid__desc">{item.desc}</p>}
          </div>
        ))}
      </div>
    </section>
  )
}
