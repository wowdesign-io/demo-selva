'use client'

import '@/styles/selva/hero.css'
import Image from 'next/image'
import { storyblokEditable } from '@storyblok/react'

interface SbAsset { filename: string; alt?: string }
export interface PageHeroBlok {
  _uid: string; component: 'page_hero'
  wordmark_style?: boolean
  pre_label?: string; title?: string; tagline?: string
  bg_image?: SbAsset; bg_alt?: string; delivery_note?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any
}

export default function PageHero({ blok }: { blok?: PageHeroBlok }) {
  const wordmark    = blok?.wordmark_style  ?? false
  const preLabel    = blok?.pre_label       ?? 'Miami · 40 Residences'
  const titleRaw    = blok?.title           ?? (wordmark ? 'SELVA' : 'Find Your\nResidence')
  const tagline     = blok?.tagline         ?? (wordmark ? 'Where the forest meets the sky.' : 'Explore, select, and reserve — directly.')
  const deliveryNote = blok?.delivery_note  ?? 'Delivery Mid-2027'
  const bgSrc       = blok?.bg_image?.filename || (wordmark ? '/images/hero/360-front.jpg' : '/images/renders/exterior-02.webp')
  const bgAlt       = blok?.bg_alt          ?? blok?.bg_image?.alt ?? ''

  const titleLines = titleRaw.split('\n')

  return (
    <div
      className="hero"
      id="hero"
      data-screen-label="Hero"
      {...(blok ? storyblokEditable(blok) : {})}
    >
      <div className="hero__sticky">
        <div className="hero__imagePanel" id="heroImage">
          <div className="hero__imageFill">
            <Image
              src={bgSrc}
              alt={bgAlt}
              fill
              priority
              quality={90}
              sizes="(max-width: 900px) 100vw, 100vw"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
          </div>
        </div>
        <div className="hero__textPanel">
          <div className="hero__textInner" id="heroText">
            <div className="hero__scrollCue" id="heroCue">
              <span className="hero__scrollLabel">Scroll to explore</span>
            </div>
            <div className="hero__logoBlock">
              <p className="hero__preLabel">{preLabel}</p>
              {wordmark ? (
                <h1 className="hero__wordmark">{titleRaw}</h1>
              ) : (
                <h1 className="hero__pageTitle">
                  {titleLines.map((line, i) => (
                    <span key={i}>{line}{i < titleLines.length - 1 && <br />}</span>
                  ))}
                </h1>
              )}
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
