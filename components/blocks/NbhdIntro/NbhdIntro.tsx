import { storyblokEditable } from '@storyblok/react/rsc'
import { resolveLink, type SbLink } from '../../../lib/resolveLink'

export interface NbhdIntroBlok {
  _uid: string; component: 'nbhd_intro'
  label?: string
  heading?: string
  lead?: string
  body_1?: string
  body_2?: string
  body_3?: string
  cta_text?: string
  cta_href?: SbLink | string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any
}

export default function NbhdIntro({ blok }: { blok?: NbhdIntroBlok }) {
  const label    = blok?.label    ?? 'The Neighborhood'
  const heading  = blok?.heading  ?? 'A canopy<br/><em>with a pulse</em>'
  const lead     = blok?.lead     ?? 'SELVA stands where Coconut Grove’s century-old tree canopy gives way to the open water of Biscayne Bay — a rare pocket of Miami that still moves at a human pace.'
  const body1    = blok?.body_1   ?? 'The Grove is Miami’s oldest neighborhood, and it wears its history lightly: banyan-shaded sidewalks, family-run cafés, sailboats on the bay, and a design quarter that draws collectors and creatives from across the city.'
  const body2    = blok?.body_2   ?? 'From SELVA’s door, the day unfolds on foot — a morning coffee beneath the trees, an afternoon among the galleries, an evening table under string lights, and the marina never more than a short walk away.'
  const ctaText  = blok?.cta_text ?? 'Explore the Residences'
  const ctaLink  = resolveLink(blok?.cta_href, '/residences#digital-twin')

  return (
    <section
      className="nbhd-intro"
      data-screen-label="Neighborhood Intro"
      {...(blok ? storyblokEditable(blok) : {})}
    >
      <div className="nbhd-intro__headingCol">
        <span className="nbhd-intro__label reveal">{label}</span>
        {/* heading supports <em> and <br/> via HTML */}
        <h2
          className="nbhd-intro__headline reveal"
          data-delay="100"
          dangerouslySetInnerHTML={{ __html: heading }}
        />
      </div>
      <div className="nbhd-intro__body">
        <p className="nbhd-intro__lead reveal" data-delay="120">{lead}</p>
        <p className="nbhd-intro__text reveal" data-delay="220">{body1}</p>
        {body2 && <p className="nbhd-intro__text reveal" data-delay="300">{body2}</p>}
        <a href={ctaLink.href} target={ctaLink.target} rel={ctaLink.rel}
           className="vision__cta reveal" data-delay="420">
          {ctaText} <span className="vision__arrow" aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </section>
  )
}
