import { storyblokEditable } from '@storyblok/react/rsc'
import AmenitiesCarousel from '../AmenitiesCarousel/AmenitiesCarousel'

export interface AmenitiesTeaserBlok {
  _uid: string; component: 'amenities_teaser'
  label?: string; heading?: string; sub?: string; cta_text?: string; cta_href?: string
}

export default function AmenitiesSection({ blok }: { blok?: AmenitiesTeaserBlok }) {
  const label   = blok?.label    ?? 'Amenities'
  const heading = blok?.heading  ?? 'A Life Lived Beautifully'
  const sub     = blok?.sub      ?? "From the skylit wellness terrace to the botanical residents’ lounge, every amenity at SELVA is conceived to enrich daily life with nature, light, and unhurried luxury."
  const ctaText = blok?.cta_text ?? 'View Amenities'
  const ctaHref = blok?.cta_href ?? '/amenities'

  return (
    <section className="amen" id="amenities" data-screen-label="Amenities" {...(blok ? storyblokEditable(blok) : {})}>
      <div className="amen__texture" aria-hidden="true"></div>

      <div className="amen__intro">
        <div className="amen__introInner">
          <span className="amen__label reveal">{label}</span>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <h2 className="amen__heading" {...{ 'data-lines': '' } as any}>{heading}</h2>
          <p className="amen__sub reveal" data-delay="200">{sub}</p>
          <a href={ctaHref} className="btnSlide amen__cta reveal" data-delay="300">
            <span>{ctaText}</span><span aria-hidden="true">{ctaText}</span>
          </a>
        </div>
      </div>

      <AmenitiesCarousel slideHref={ctaHref} overlayLabel={ctaText} />
    </section>
  )
}
