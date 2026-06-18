import { storyblokEditable } from '@storyblok/react/rsc'

interface SbAsset { filename: string; alt?: string }
export interface VisionCopyBandBlok {
  _uid: string; component: 'vision_copy_band'
  label?: string; headline?: string
  body_1?: string; body_2?: string
  cta_text?: string; cta_href?: string
  image?: SbAsset; alt?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any
}

export default function VisionCopyBand({ blok }: { blok?: VisionCopyBandBlok }) {
  const label    = blok?.label    ?? 'The Vision'
  const headline = (blok?.headline ?? "Where Miami’s\nBotanical Soul\nBecomes Home").split('\n')
  const body1    = blok?.body_1   ?? "SELVA is a rare collection of forty private residences where Miami’s lush canopy, refined interiors, and open sky converge. Conceived for those who seek the extraordinary — a home that breathes, grows, and endures."
  const body2    = blok?.body_2   ?? "SELVA was born from the conviction that luxury and nature are not in tension — they are complements. Where others impose the city upon the land, SELVA cedes ground to the canopy. Architecture bends to the tree line. Terraces open to the sky. Every interior breathes."
  const ctaText  = blok?.cta_text ?? 'Explore the Residences'
  const ctaHref  = blok?.cta_href ?? '/residences#planpoint'
  const imgSrc   = blok?.image?.filename ?? '/images/renders/interior-02.jpg'
  const imgAlt   = blok?.alt ?? blok?.image?.alt ?? 'SELVA — where living and nature converge'

  return (
    <section className="vision" {...(blok ? storyblokEditable(blok) : {})}>
      <div className="vision__copyBand">
        <div className="vision__leavesBg" aria-hidden="true"></div>
        <div className="vision__leavesOverlay" aria-hidden="true"></div>
        <div className="vision__inner">
          <div className="vision__headingCol">
            <span className="vision__label reveal">{label}</span>
            <h2 className="vision__headline" data-lines="">
              {headline.map((line, i) => (
                <span key={i} className="lineWrap"><span className="line">{line}</span></span>
              ))}
            </h2>
          </div>
          <div className="vision__bodyCol">
            <p className="vision__bodyText reveal" data-delay="150">{body1}</p>
            <p className="vision__bodyText reveal" data-delay="260">{body2}</p>
            <a href={ctaHref} className="vision__cta reveal" data-delay="480" style={{ marginTop: 'var(--space-6)' }}>
              {ctaText} <span className="vision__arrow" aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
      <div className="vision__imageWrap">
        <div className="zoom"><div className="zoom__inner zoom-img">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imgSrc} alt={imgAlt} loading="lazy" decoding="async" />
        </div></div>
      </div>
    </section>
  )
}
