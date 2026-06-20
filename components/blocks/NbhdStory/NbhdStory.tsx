import Image from 'next/image'
import { storyblokEditable } from '@storyblok/react/rsc'
import { resolveLink, type SbLink } from '../../../lib/resolveLink'

interface SbAsset { filename: string; alt?: string }

interface NbhdStoryPanelBlok {
  _uid: string; component: 'nbhd_story_panel'
  num?: string; title?: string
  para_1?: string; para_2?: string
  pills?: string
  cta_text?: string; cta_href?: SbLink | string
  image?: SbAsset; alt?: string
}

export interface NbhdStoryBlok {
  _uid: string; component: 'nbhd_story'
  eyebrow?: string
  items?: NbhdStoryPanelBlok[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any
}

const DEFAULTS: NbhdStoryPanelBlok[] = [
  {
    _uid: 'd1', component: 'nbhd_story_panel',
    img: '/images/neighborhood/sidewalk-storefronts.webp',
    num: '01 — The Morning',
    title: 'Sidewalk <em>mornings</em>',
    para_1: 'The Grove wakes slowly. Light filters through the oak and banyan canopy onto narrow, walkable streets, and the neighborhood’s cafés set out their first tables long before the heat arrives.',
    para_2: 'Order a cortado at the counter, wander the tree-lined blocks, and watch a community that still knows its shopkeepers by name come quietly to life.',
    pills: 'Coffee Houses, Tree-Lined Streets, Local Boutiques',
    image: { filename: '/images/neighborhood/sidewalk-storefronts.webp', alt: '' },
  },
  {
    _uid: 'd2', component: 'nbhd_story_panel',
    num: '02 — The Evening',
    title: 'A table <em>outdoors</em>',
    para_1: 'As the light softens, the Grove’s courtyards fill. String lights flicker on between the trees, and chef-led kitchens spill out onto the pavement.',
    para_2: 'From garden bistros to candlelit terraces, dinner here is an unhurried, open-air ritual — the kind of evening that never asks you to drive across town.',
    pills: 'Garden Dining, Wine Bars, Chef’s Tables',
    image: { filename: '/images/neighborhood/outdoor-dining.webp', alt: '' },
  },
  {
    _uid: 'd3', component: 'nbhd_story_panel',
    num: '03 — The Culture',
    title: 'The design <em>quarter</em>',
    para_1: 'A few blocks inland, the neighborhood turns to art. Independent galleries, design showrooms and a year-round calendar of openings give the Grove a creative current that never quite settles.',
    para_2: 'It is a place to collect, to stay curious, and to live alongside the makers and gallerists who shape Miami’s cultural life.',
    pills: 'Galleries, Design Showrooms, Open-Air Cinema',
    image: { filename: '/images/neighborhood/cultural-district.webp', alt: '' },
  },
  {
    _uid: 'd4', component: 'nbhd_story_panel',
    num: '04 — The Water',
    title: 'Out on <em>the water</em>',
    para_1: 'And then there is the bay. The Grove’s sheltered waterfront has been Miami’s sailing heart for generations, its marinas lined with everything from weekend dinghies to bluewater yachts.',
    para_2: 'Step off the dock at dawn, cross to the islands for lunch, or simply watch the masts catch the last of the light from the shore.',
    pills: 'Marina, Sailing Club, Bayfront Park',
    image: { filename: '/images/neighborhood/bayfront-marina.webp', alt: '' },
  },
] as unknown as NbhdStoryPanelBlok[]

export default function NbhdStory({ blok }: { blok?: NbhdStoryBlok }) {
  const eyebrow = blok?.eyebrow ?? 'A Day in the Grove'
  const panels  = blok?.items?.length ? blok.items : DEFAULTS

  return (
    <section
      className="nbhd-story"
      id="nbhdStory"
      data-screen-label="Neighborhood Story"
      {...(blok ? storyblokEditable(blok) : {})}
    >
      <div className="nbhd-story__grid">

        <div className="nbhd-story__media">
          {panels.map((s, i) => {
            const src = s.image?.filename || (s as unknown as { img?: string }).img || ''
            return (
              <div key={s._uid} className={`nbhd-story__layer${i === 0 ? ' is-active' : ''}`}>
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                  <Image fill src={src} alt="" quality={85} sizes="50vw" style={{ objectFit: 'cover', objectPosition: 'center' }} loading="lazy" />
                </div>
              </div>
            )
          })}
          <div className="nbhd-story__overlay">
            <span className="nbhd-story__eyebrow">{eyebrow}</span>
            <div className="nbhd-story__counter">
              <span className="nbhd-story__count" id="nbhdCount">01</span>
              <span className="nbhd-story__total">/ {String(panels.length).padStart(2, '0')}</span>
            </div>
          </div>
          <div className="nbhd-story__progress">
            <div className="nbhd-story__progressBar" id="nbhdProgress"></div>
          </div>
        </div>

        <div className="nbhd-story__copy">
          {panels.map((s) => {
            const src     = s.image?.filename || (s as unknown as { img?: string }).img || ''
            const imgAlt  = s.image?.alt ?? s.alt ?? ''
            const pills   = s.pills ? s.pills.split(',').map(p => p.trim()).filter(Boolean) : []
            const ctaLink = resolveLink(s.cta_href, '/residences#digital-twin')
            const ctaText = s.cta_text ?? 'Explore the Residences'

            return (
              <article key={s._uid} className="nbhd-panel">
                <div className="nbhd-panel__img" style={{ position: 'relative' }}>
                  <Image fill src={src} alt={imgAlt} quality={85} sizes="100vw" style={{ objectFit: 'cover' }} loading="lazy" />
                </div>
                <div className="nbhd-panel__body">
                  <p className="nbhd-panel__num">{s.num}</p>
                  <h3
                    className="nbhd-panel__title"
                    dangerouslySetInnerHTML={{ __html: s.title ?? '' }}
                  />
                  {s.para_1 && <p className="nbhd-panel__text">{s.para_1}</p>}
                  {s.para_2 && <p className="nbhd-panel__text">{s.para_2}</p>}
                  <a href={ctaLink.href} target={ctaLink.target} rel={ctaLink.rel}
                     className="vision__cta vision__cta--amber"
                     style={{ marginTop: 'var(--space-6)' }}>
                    {ctaText} <span className="vision__arrow" aria-hidden="true">&rarr;</span>
                  </a>
                  <div className="nbhd-panel__meta">
                    {pills.map((pill) => (
                      <span key={pill} className="pill pill--on-dark">{pill}</span>
                    ))}
                  </div>
                </div>
              </article>
            )
          })}
        </div>

      </div>
    </section>
  )
}
