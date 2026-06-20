import '@/styles/selva/page-cta.css'
import { storyblokEditable } from '@storyblok/react/rsc'
import { resolveLink, type SbLink } from '@/lib/resolveLink'

export interface PageCtaBlok {
  _uid: string; component: 'page_cta'
  label?: string; heading?: string; cta_text?: string; cta_href?: SbLink | string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any
}

export default function PageCta({ blok }: { blok?: PageCtaBlok }) {
  const label   = blok?.label    ?? 'Explore Next'
  const heading = blok?.heading  ?? 'Discover the Amenities'
  const ctaText = blok?.cta_text ?? 'View Amenities'
  const ctaLink = resolveLink(blok?.cta_href, '/amenities')

  return (
    <section className="page-cta" data-screen-label="Explore Next" {...(blok ? storyblokEditable(blok) : {})}>
      <span className="page-cta__label reveal">{label}</span>
      <h2 className="page-cta__heading reveal" data-delay="100" dangerouslySetInnerHTML={{ __html: heading }} />
      <a href={ctaLink.href} target={ctaLink.target} rel={ctaLink.rel} className="btnSlide reveal" data-delay="220">
        <span>{ctaText}</span><span aria-hidden="true">{ctaText}</span>
      </a>
    </section>
  )
}
