import { storyblokEditable } from '@storyblok/react/rsc'

interface SbAsset { filename: string; alt?: string }
interface StatItemBlok { _uid: string; component: 'stat_item'; value?: string; label?: string }
export interface NeighborhoodTeaserBlok {
  _uid: string; component: 'neighborhood_teaser'
  image?: SbAsset; alt?: string; label?: string; heading?: string; body?: string
  address?: string; cta_text?: string; cta_href?: string; stats?: StatItemBlok[]
  [index: string]: unknown
}

const FALLBACK_STATS = [
  { value: '6 min',  label: 'Design District' },
  { value: '12 min', label: 'Brickell' },
  { value: '14 min', label: 'South Beach' },
  { value: '18 min', label: "Miami Int'l Airport" },
]

export default function NeighborhoodSection({ blok }: { blok?: NeighborhoodTeaserBlok }) {
  const imgSrc  = blok?.image?.filename || '/images/neighborhood/bayfront-marina.webp'
  const imgAlt  = blok?.alt     ?? 'SELVA — waterfront promenade and botanical residences'
  const label   = blok?.label   ?? 'The Neighborhood'
  const heading = blok?.heading ?? 'One Foot in the Canopy. One Foot in the City.'
  const body    = blok?.body    ?? "SELVA rises in one of Miami's last green enclaves — where the canopy meets the bay, and the city's culture, dining, and design districts sit just minutes away. A rare address that offers seclusion without distance."
  const address = blok?.address ?? '3000 Hibiscus Lane · Coconut Grove · Miami, FL 33133'
  const ctaText = blok?.cta_text ?? 'Explore the Neighborhood'
  const ctaHref = blok?.cta_href ?? '/neighborhood'

  const stats = blok?.stats?.length
    ? blok.stats.map((s) => ({ value: s.value ?? '', label: s.label ?? '', _uid: s._uid }))
    : FALLBACK_STATS.map((s) => ({ ...s, _uid: s.label }))

  return (
    <section className="hood" id="neighborhood" data-screen-label="Neighborhood" {...(blok ? storyblokEditable(blok) : {})}>
      <div className="hood__image">
        <div className="zoom">
          <div className="zoom__inner zoom-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imgSrc} alt={imgAlt} loading="lazy" decoding="async" />
          </div>
        </div>
      </div>
      <div className="stat-strip">
        <div className="stat-strip__inner reveal">
          {stats.map((s) => (
            <div key={s._uid} className="stat-strip__item">
              <span className="stat-strip__value">{s.value}</span>
              <span className="stat-strip__label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="hood__body">
        <span className="hood__label reveal">{label}</span>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <h2 className="hood__heading" {...{ 'data-lines': '' } as any}>{heading}</h2>
        <p className="hood__text reveal" data-delay="150">{body}</p>
        <p className="hood__address reveal" data-delay="250">{address}</p>
        <a href={ctaHref} className="btnSlide hood__cta reveal" data-delay="350">
          <span>{ctaText}</span><span aria-hidden="true">{ctaText}</span>
        </a>
      </div>
    </section>
  )
}
