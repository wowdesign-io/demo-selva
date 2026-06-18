import { storyblokEditable } from '@storyblok/react/rsc'
import { resolveLink, type SbLink } from '@/lib/resolveLink'

interface SbAsset { filename: string; alt?: string }
export interface VisFeatureBlok {
  _uid: string; component: 'vis_feature'
  eyebrow?: string
  img_src?: string; image?: SbAsset; alt?: string
  heading?: string; body_text?: string
  cta_text?: string; cta_href?: SbLink | string
  reverse?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any
}

export default function VisFeature({ blok }: { blok?: VisFeatureBlok }) {
  const eyebrow  = blok?.eyebrow   ?? 'Architecture'
  const imgSrc   = blok?.img_src || blok?.image?.filename || '/images/renders/exterior-04.webp'
  const imgAlt   = blok?.alt ?? blok?.image?.alt ?? ''
  const heading  = (blok?.heading  ?? 'Designed around\nthe canopy').split('\n')
  const bodyText = blok?.body_text ?? ''
  const ctaText  = blok?.cta_text  ?? 'View Residences'
  const ctaLink  = resolveLink(blok?.cta_href, '/residences#digital-twin')
  const reverse  = blok?.reverse   ?? false

  return (
    <section
      className={`vis-feature${reverse ? ' vis-feature--reverse' : ''}`}
      {...(blok ? storyblokEditable(blok) : {})}
    >
      <div className="vis-feature__media">
        <div className="zoom"><div className="zoom__inner zoom-img">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imgSrc} alt={imgAlt} loading="lazy" decoding="async" />
        </div></div>
      </div>
      <div className="vis-feature__body">
        <span className="vis-feature__eyebrow reveal">{eyebrow}</span>
        <h2 className="vis-feature__heading reveal" data-delay="80">
          {heading.map((line, i) => (
            <span key={i}>{line}{i < heading.length - 1 && <br />}</span>
          ))}
        </h2>
        <p className="vis-feature__text reveal" data-delay="160">{bodyText}</p>
        <a href={ctaLink.href} target={ctaLink.target} rel={ctaLink.rel} className="btnSlide reveal" data-delay="240">
          <span>{ctaText}</span><span aria-hidden="true">{ctaText}</span>
        </a>
      </div>
    </section>
  )
}
