'use client'

import Image from 'next/image'
import { storyblokEditable } from '@storyblok/react'
import { resolveLink, type SbLink } from '@/lib/resolveLink'

export interface CinematicBandBlok {
  _uid: string; component: 'cinematic_band'
  image?: { filename: string; alt?: string }
  alt?: string; label?: string; heading?: string
  cta_text?: string; cta_href?: SbLink | string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any
}

export default function CinematicBand({ blok }: { blok?: CinematicBandBlok }) {
  const imgSrc  = blok?.image?.filename || '/images/amenities/sky-terrace.webp'
  const imgAlt  = blok?.alt   ?? blok?.image?.alt ?? 'SELVA — the sky terrace at golden hour'
  const label   = blok?.label   ?? 'In Motion'
  const heading = blok?.heading ?? 'Evenings unfold\nabove the canopy'
  const ctaText = blok?.cta_text ?? 'View the Floorplans'
  const cta     = resolveLink(blok?.cta_href, '/residences#digital-twin')
  const headingLines = heading.split('\n')

  return (
    <section className="amen-motion" data-screen-label="Amenity Film" {...(blok ? storyblokEditable(blok) : {})}>
      <div className="amen-motion__media">
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <Image fill src={imgSrc} alt={imgAlt} quality={85} sizes="100vw" style={{ objectFit: 'cover' }} loading="lazy" />
        </div>
      </div>
      <div className="amen-motion__scrim"></div>
      <div className="amen-motion__content">
        <span className="amen-motion__label reveal">{label}</span>
        <h2 className="amen-motion__heading reveal" data-delay="100">
          {headingLines.map((line, i) => (
            <span key={i}>{line}{i < headingLines.length - 1 && <br />}</span>
          ))}
        </h2>
        <a href={cta.href} target={cta.target} rel={cta.rel} className="btnSlide btnSlide--amber reveal" data-delay="220" style={{ marginTop: 'var(--space-8)' }}>
          <span>{ctaText}</span><span aria-hidden="true">{ctaText}</span>
        </a>
      </div>
    </section>
  )
}
