import { storyblokEditable } from '@storyblok/react/rsc'

interface SbAsset { filename: string; alt?: string }
export interface VisionTeaserBlok {
  _uid: string; component: 'vision_teaser'
  label?: string; headline?: string; body_1?: string; body_2?: string
  cta_text?: string; cta_href?: string; image?: SbAsset; alt?: string
  [index: string]: unknown
}

export default function VisionSection({ blok }: { blok?: VisionTeaserBlok }) {
  const label    = blok?.label    ?? 'The Vision'
  const headline = blok?.headline ?? "Where Miami's Botanical Soul Becomes Home"
  const body1    = blok?.body_1   ?? "SELVA is a rare collection of forty private residences where Miami's lush canopy, refined interiors, and open sky converge. Conceived for those who seek the extraordinary — a home that breathes, grows, and endures."
  const body2    = blok?.body_2   ?? "Every detail, from the hand-selected material palette to the seamless indoor–outdoor flow, reflects a singular vision: to create a living environment as alive and generous as the nature that surrounds it."
  const ctaText  = blok?.cta_text ?? 'Explore the Vision'
  const ctaHref  = blok?.cta_href ?? '/vision'
  const imgSrc   = blok?.image?.filename || '/images/renders/exterior-03.webp'
  const imgAlt   = blok?.alt ?? 'SELVA — where living and nature converge'

  return (
    <section className="vision" {...(blok ? storyblokEditable(blok) : {})}>
      <div className="vision__copyBand">
        <div className="vision__leavesBg" aria-hidden="true"></div>
        <div className="vision__leavesOverlay" aria-hidden="true"></div>
        <div className="vision__inner">
          <div className="vision__headingCol">
            <span className="vision__label reveal">{label}</span>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <h2 className="vision__headline" {...{ 'data-lines': '' } as any}>{headline}</h2>
          </div>
          <div className="vision__bodyCol">
            <p className="vision__bodyText reveal" data-delay="200">{body1}</p>
            <p className="vision__bodyText reveal" data-delay="320">{body2}</p>
            <a href={ctaHref} className="vision__cta reveal" data-delay="440">
              {ctaText} <span className="vision__arrow">→</span>
            </a>
          </div>
        </div>
      </div>
      <div className="vision__imageWrap">
        <div className="zoom">
          <div className="zoom__inner zoom-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imgSrc} alt={imgAlt} loading="lazy" decoding="async" />
          </div>
        </div>
      </div>
    </section>
  )
}
