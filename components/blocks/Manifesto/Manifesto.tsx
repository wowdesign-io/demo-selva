import { storyblokEditable } from '@storyblok/react/rsc'

interface SbAsset { filename: string; alt?: string }
export interface ManifestoBlok {
  _uid: string; component: 'manifesto'
  quote_text?: string
  image?: SbAsset; alt?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any
}

export default function Manifesto({ blok }: { blok?: ManifestoBlok }) {
  const quoteText = blok?.quote_text ?? '“A home that breathes, grows, and endures.”'
  const imgSrc    = blok?.image?.filename ?? '/images/renders/terrace.webp'
  const imgAlt    = blok?.alt ?? blok?.image?.alt ?? 'SELVA — a planted private terrace in the canopy'

  return (
    <>
      <section className="vis-statement" {...(blok ? storyblokEditable(blok) : {})}>
        <span className="vis-statement__eyebrow reveal">The Manifesto</span>
        <p className="vis-statement__quote reveal" data-delay="100">{quoteText}</p>
      </section>
      <div className="vis-image2" {...(blok ? storyblokEditable(blok) : {})}>
        <div className="zoom"><div className="zoom__inner zoom-img">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imgSrc} alt={imgAlt} loading="lazy" decoding="async" />
        </div></div>
      </div>
    </>
  )
}
