import '@/styles/selva/home.css'
import { storyblokEditable } from '@storyblok/react/rsc'
import { resolveLink, type SbLink } from '@/lib/resolveLink'

export interface ResidencesTeaserBlok {
  _uid: string; component: 'residences_teaser'
  label?: string; heading?: string; sub?: string; cta_text?: string; cta_href?: SbLink | string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any
}

export default function ResidencesSection({ blok }: { blok?: ResidencesTeaserBlok }) {
  const label   = blok?.label    ?? 'Residences'
  const heading = blok?.heading  ?? 'Curated for Private Living'
  const sub     = blok?.sub      ?? 'Forty bespoke one- and two-bedroom residences — several with private dens — each thoughtfully proportioned for a life of botanical luxury and urban ease.'
  const ctaText = blok?.cta_text ?? 'View Residences'
  const ctaLink = resolveLink(blok?.cta_href, '/residences')

  return (
    <section className="residences" data-screen-label="Residences" {...(blok ? storyblokEditable(blok) : {})}>
      <div className="residences__container">
        <div className="residences__intro">
          <span className="residences__label reveal">{label}</span>
          <h2 className="residences__heading reveal" data-delay="100">{heading}</h2>
          <p className="residences__sub reveal" data-delay="200">{sub}</p>
          <a href={ctaLink.href} target={ctaLink.target} rel={ctaLink.rel} className="btnSlide residences__cta reveal" data-delay="300">
            <span>{ctaText}</span><span aria-hidden="true">{ctaText}</span>
          </a>
        </div>
      </div>
    </section>
  )
}
