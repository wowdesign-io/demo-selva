import { storyblokEditable } from '@storyblok/react/rsc'

interface SbAsset { filename: string; alt?: string }
export interface HomeHeroBlok {
  _uid: string; component: 'home_hero'
  pre_label?: string; title?: string; tagline?: string; delivery_note?: string
  bg_image?: SbAsset; bg_alt?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any
}

export default function HeroSection({ blok }: { blok?: HomeHeroBlok }) {
  const preLabel     = blok?.pre_label     ?? 'Miami · 40 Residences'
  const title        = blok?.title         ?? 'SELVA'
  const tagline      = blok?.tagline       ?? 'Where the forest meets the sky.'
  const deliveryNote = blok?.delivery_note ?? 'Delivery Mid-2027'
  const bgSrc        = blok?.bg_image?.filename || '/images/hero/360-front.jpg'
  const bgAlt        = blok?.bg_alt        ?? 'SELVA Residences — botanical luxury, Miami'

  return (
    <div className="hero" id="hero" {...(blok ? storyblokEditable(blok) : {})}>
      <div className="hero__sticky">
        <div className="hero__imagePanel" id="heroImage">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={bgSrc} alt={bgAlt} decoding="async" fetchPriority="high" />
        </div>
        <div className="hero__textPanel">
          <div className="hero__textInner" id="heroText">
            <div className="hero__scrollCue" id="heroCue">
              <span className="hero__scrollLabel">Scroll to explore</span>
            </div>
            <div className="hero__logoBlock">
              <p className="hero__preLabel">{preLabel}</p>
              <h1 className="hero__wordmark">{title}</h1>
              <div className="hero__rule"></div>
              <p className="hero__tagline">{tagline}</p>
            </div>
            <p className="hero__deliveryNote">{deliveryNote}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
