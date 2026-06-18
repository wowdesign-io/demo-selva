'use client'

import { storyblokEditable } from '@storyblok/react'
import { resolveLink, type SbLink } from '@/lib/resolveLink'
import AmenitiesCarousel from '../AmenitiesCarousel/AmenitiesCarousel'

interface CarouselSlideBlok {
  _uid: string; component: 'carousel_slide'
  image?: { filename: string; alt?: string }
  alt?: string; label?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any
}
export interface AmenitiesIntroBlok {
  _uid: string; component: 'amenities_intro'
  label?: string; heading?: string; body?: string
  cta_text?: string; cta_href?: SbLink | string
  overlay_label?: string; slide_href?: SbLink | string
  slides?: CarouselSlideBlok[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any
}

export default function AmenitiesIntroSection({ blok }: { blok?: AmenitiesIntroBlok }) {
  const label        = blok?.label        ?? 'Seven Amenities · One Vision'
  const heading      = blok?.heading      ?? 'Conceived for Daily Wonder'
  const body         = blok?.body         ?? "From the infinity-edge pool terrace to the botanical residents' lounge, every amenity at SELVA is conceived to enrich daily life with nature, light, and unhurried luxury. A life lived beautifully, every day."
  const ctaText      = blok?.cta_text     ?? 'Explore the Residences'
  const cta          = resolveLink(blok?.cta_href, '/residences#digital-twin')
  const slideHref    = resolveLink(blok?.slide_href, '/residences#digital-twin').href
  const overlayLabel = blok?.overlay_label ?? 'View Residences'

  const slides = blok?.slides?.length
    ? blok.slides.map(s => ({ src: s.image?.filename || '', label: s.label ?? '' }))
    : undefined

  const headingLines = heading.split('\n')

  return (
    <section className="amen" id="amenities-intro" {...(blok ? storyblokEditable(blok) : {})}>
      <div className="amen__texture" aria-hidden="true"></div>
      <div className="amen__intro">
        <div className="amen__introInner">
          <span className="amen__label reveal">{label}</span>
          <h2 className="amen__heading" data-lines="">
            {headingLines.map((line, i) => (
              <span key={i} className="lineWrap"><span className="line">{line}</span></span>
            ))}
          </h2>
          <p className="amen__sub reveal" data-delay="200">{body}</p>
          <a href={cta.href} target={cta.target} rel={cta.rel} className="vision__cta reveal" data-delay="320" style={{ marginTop: 'var(--space-8)' }}>
            {ctaText} <span className="vision__arrow" aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
      <AmenitiesCarousel slideHref={slideHref} overlayLabel={overlayLabel} slides={slides} />
    </section>
  )
}
