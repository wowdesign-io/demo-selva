import { storyblokEditable } from '@storyblok/react/rsc'

interface SbAsset { filename: string; alt?: string }
export interface PageHeroBlok {
  _uid: string; component: 'page_hero'
  pre_label?: string; title?: string; tagline?: string
  bg_src?: string; bg_image?: SbAsset; bg_alt?: string; delivery_note?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any
}

export default function PageHero({ blok }: { blok?: PageHeroBlok }) {
  const preLabel     = blok?.pre_label     ?? 'Miami · 40 Residences'
  const titleLines   = (blok?.title        ?? 'Find Your\nResidence').split('\n')
  const tagline      = blok?.tagline       ?? 'Explore, select, and reserve — directly.'
  const bgSrc        = blok?.bg_src || blok?.bg_image?.filename || '/images/renders/exterior-02.webp'
  const bgAlt        = blok?.bg_alt        ?? blok?.bg_image?.alt ?? ''
  const deliveryNote = blok?.delivery_note ?? 'Delivery Mid-2027'

  return (
    <div className="hero" id="hero" data-screen-label="Hero" {...(blok ? storyblokEditable(blok) : {})}>
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
              <h1 className="hero__pageTitle">
                {titleLines.map((line, i) => (
                  <span key={i}>{line}{i < titleLines.length - 1 && <br />}</span>
                ))}
              </h1>
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
