import '@/styles/selva/overview.css'
import Image from 'next/image'
import { storyblokEditable } from '@storyblok/react/rsc'
import { resolveLink, type SbLink } from '@/lib/resolveLink'

interface SbAsset { filename: string; alt?: string }
interface OverviewPanelBlok {
  _uid: string; component: 'overview_panel'
  label?: string; href?: SbLink | string; image?: SbAsset; alt?: string
}
export interface OverviewSectionBlok {
  _uid: string; component: 'overview_section'
  intro_text?: string; panels?: OverviewPanelBlok[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any
}

const FALLBACK_PANELS = [
  { label: 'Residences',   href: '/residences',   src: '/images/renders/interior-01.jpg',                alt: 'SELVA Residences — curated interiors' },
  { label: 'Amenities',    href: '/amenities',    src: '/images/amenities/pool-deck.webp',               alt: 'SELVA Amenities — botanical setting' },
  { label: 'Neighborhood', href: '/neighborhood', src: '/images/neighborhood/sidewalk-storefronts.webp', alt: 'SELVA — Miami neighborhood' },
]

export default function OverviewSection({ blok }: { blok?: OverviewSectionBlok }) {
  const introText = blok?.intro_text ?? "Nestled where Miami's botanical soul meets the open sky, SELVA presents forty private residences — a rare collection where verdant canopy, bespoke interiors, and the city converge."

  const panels = blok?.panels?.length
    ? blok.panels.map((p) => ({ label: p.label ?? '', link: resolveLink(p.href, '#'), src: p.image?.filename || '', alt: p.alt ?? p.image?.alt ?? '', _uid: p._uid }))
    : FALLBACK_PANELS.map((p) => ({ label: p.label, link: resolveLink(p.href), src: p.src, alt: p.alt, _uid: p.label }))

  return (
    <section className="overview" {...(blok ? storyblokEditable(blok) : {})}>
      <div className="overview__intro">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <p className="overview__introText" {...{ 'data-lines': '' } as any}>{introText}</p>
      </div>
      <div className="overview__panels">
        {panels.map((panel) => (
          <a href={panel.link.href} target={panel.link.target} rel={panel.link.rel} key={panel._uid} className="overview__panel">
            <div className="overview__imageWrap zoom-panel">
              <div className="overview__imageFill">
                <Image
                  src={panel.src}
                  alt={panel.alt}
                  fill
                  quality={85}
                  sizes="(max-width: 768px) 114vw, (max-width: 1200px) 57vw, 43vw"
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                />
              </div>
            </div>
            <div className="overview__overlay"></div>
            <span className="overview__label">{panel.label}</span>
          </a>
        ))}
      </div>
    </section>
  )
}
