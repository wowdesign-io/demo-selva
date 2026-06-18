import { storyblokEditable } from '@storyblok/react/rsc'

interface StatItemBlok { _uid: string; component: 'stat_item'; value: string; label: string }
export interface ResStatsBridgeBlok {
  _uid: string; component: 'res_stats_bridge'
  items?: StatItemBlok[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any
}

const DEFAULTS: StatItemBlok[] = [
  { _uid: 'd1', component: 'stat_item', value: 'From $300K', label: 'Starting Price' },
  { _uid: 'd2', component: 'stat_item', value: '575 – 800',  label: 'Square Feet' },
  { _uid: 'd3', component: 'stat_item', value: '40',         label: 'Residences' },
  { _uid: 'd4', component: 'stat_item', value: 'Mid-2027',   label: 'Delivery' },
]

export default function ResStatsBridge({ blok }: { blok?: ResStatsBridgeBlok }) {
  const items = blok?.items?.length ? blok.items : DEFAULTS

  return (
    <div
      className="stat-strip stat-strip--light"
      data-screen-label="Stats Bridge"
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
