import { storyblokEditable } from '@storyblok/react/rsc'

interface StatItemBlok { _uid: string; component: 'stat_item'; value: string; label: string }
export interface VisionStatsBridgeBlok {
  _uid: string; component: 'vision_stats_bridge'
  items?: StatItemBlok[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any
}

const DEFAULTS: StatItemBlok[] = [
  { _uid: 'd1', component: 'stat_item', value: '40',   label: 'Residences' },
  { _uid: 'd2', component: 'stat_item', value: '3',    label: 'Stories' },
  { _uid: 'd3', component: 'stat_item', value: '3',    label: 'Models' },
  { _uid: 'd4', component: 'stat_item', value: '2027', label: 'Delivery' },
]

export default function VisionStatsBridge({ blok }: { blok?: VisionStatsBridgeBlok }) {
  const items = blok?.items?.length ? blok.items : DEFAULTS

  return (
    <div
      className="stat-strip"
      data-screen-label="Stats"
      {...(blok ? storyblokEditable(blok) : {})}
    >
      <div className="stat-strip__inner reveal">
        {items.map((item) => (
          <div key={item._uid} className="stat-strip__item">
            <span className="stat-strip__value">{item.value}</span>
            <span className="stat-strip__label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
