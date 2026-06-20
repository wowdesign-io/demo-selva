import Image from 'next/image'
import { Fragment } from 'react';
import { storyblokEditable } from '@storyblok/react/rsc';

interface SbAsset { filename: string; alt?: string }

interface PartnerRowBlok {
  _uid: string; component: 'partner_row'
  img?: SbAsset; alt?: string; eyebrow?: string
  heading_line_1?: string; heading_line_2?: string
  person?: string; role?: string
  body_1?: string; body_2?: string
  pills?: string; reverse?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any
}

export interface TeamPartnersBlok {
  _uid: string; component: 'team_partners'
  partners?: PartnerRowBlok[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any
}

// Hardcoded defaults — used when Storyblok story has no partners (dev safety net).
// All images reference Storyblok CDN once uploaded; local paths are fallback only.
const DEFAULT_PARTNERS: PartnerRowBlok[] = [
  {
    _uid: 'd1', component: 'partner_row',
    img: { filename: '/images/team/developer.webp' }, alt: 'Banyan Bay Development',
    reverse: false, eyebrow: 'Developer',
    heading_line_1: 'Banyan Bay', heading_line_2: 'Development',
    person: 'David Calloway', role: 'Founding Partner',
    body_1: 'Banyan Bay Development conceived SELVA as a deliberately small project — forty residences across three intimate storeys — and has shepherded it from raw land to delivery in mid-2027.',
    body_2: 'Their approach favours the long view of Coconut Grove over the quick exit: fewer homes, finer detailing, and a building made to belong to its street for decades.',
    pills: 'Boutique Residential,Coconut Grove,Long-Term Hold',
  },
  {
    _uid: 'd2', component: 'partner_row',
    img: { filename: '/images/team/architect.webp' }, alt: 'Estudio Frondoso',
    reverse: true, eyebrow: 'Architecture',
    heading_line_1: 'Estudio', heading_line_2: 'Frondoso',
    person: 'Marisol Rivera', role: 'Principal Architect',
    body_1: 'Estudio Frondoso shaped SELVA around the canopy rather than above it — three low storeys, cantilevered terraces and deep eaves that fold planting into the structure.',
    body_2: 'Warm-white stone and fluted timber let the architecture recede, so that from the street the building reads as part of the forest it sits within.',
    pills: 'Biophilic Design,Low-Rise,Tropical Modern',
  },
  {
    _uid: 'd3', component: 'partner_row',
    img: { filename: '/images/team/interior-design.webp' }, alt: 'Taller Lumina',
    reverse: false, eyebrow: 'Interior Design',
    heading_line_1: 'Taller', heading_line_2: 'Lumina',
    person: 'Clara Bennett', role: 'Design Director',
    body_1: 'Taller Lumina drew SELVA’s interior palette straight from nature — white oak, honed travertine, woven cane and brushed brass, framed by glass that opens to the green.',
    body_2: 'Each room is composed to feel grown rather than installed, with light that shifts across the day and planting never more than a glance away.',
    pills: 'Natural Materials,Custom Millwork,Light & Calm',
  },
  {
    _uid: 'd4', component: 'partner_row',
    img: { filename: '/images/team/landscape.webp' }, alt: 'Raíz Landscape Studio',
    reverse: true, eyebrow: 'Landscape',
    heading_line_1: 'Raíz Landscape', heading_line_2: 'Studio',
    person: 'Mateo Fuentes', role: 'Studio Director',
    body_1: 'Raíz Landscape Studio treats planting as architecture, not decoration. Vertical gardens, terrace plantings and a courtyard at the building’s heart keep green within reach of every residence.',
    body_2: 'Native and tropical species are layered through the structure so the landscape matures with the building, softening it year on year.',
    pills: 'Native Planting,Vertical Gardens,Courtyards',
  },
  {
    _uid: 'd5', component: 'partner_row',
    img: { filename: '/images/team/sales-marketing.webp' }, alt: 'Meridian Residential',
    reverse: false, eyebrow: 'Sales & Marketing',
    heading_line_1: 'Meridian', heading_line_2: 'Residential',
    person: 'Karen Whitfield', role: 'Sales Director',
    body_1: 'Meridian Residential leads SELVA’s pre-sales and private previews from the Coconut Grove gallery, guiding residents through floorplans, finishes and the story of the building.',
    body_2: 'Their team accompanies each buyer from first visit to closing, with the unhurried, personal service a boutique address of forty homes allows.',
    pills: 'Pre-Sales,Private Previews,Grove Gallery',
  },
  {
    _uid: 'd6', component: 'partner_row',
    img: { filename: '/images/team/andy-bittner.webp' }, alt: 'Andy Bittner — wowdesign',
    reverse: true, eyebrow: 'Digital Experience',
    heading_line_1: 'wowdesign', heading_line_2: '',
    person: 'Andy Bittner', role: 'Founder',
    body_1: 'wowdesign designed SELVA’s digital experience — the website and the interactive floorplan tools — translating the architecture’s quiet, botanical character into every screen.',
    body_2: 'From the first scroll to the live availability map, the goal was a digital home as considered and calm as the residences themselves.',
    pills: 'Web Design,Interactive Floorplans,UX & Product',
  },
];

export default function TeamPartners({ blok }: { blok?: TeamPartnersBlok }) {
  const partners = blok?.partners?.length ? blok.partners : DEFAULT_PARTNERS;

  return (
    <div {...(blok ? storyblokEditable(blok) : {})}>
      {partners.map((p) => {
        // Images MUST be in Storyblok CDN. img.filename is the CDN URL post-upload.
        const imgSrc  = p.img?.filename || '';
        const alt     = p.alt ?? p.img?.alt ?? '';
        const heading = [p.heading_line_1, p.heading_line_2].filter(Boolean) as string[];
        const paras   = [p.body_1, p.body_2].filter(Boolean) as string[];
        const pills   = (p.pills ?? '').split(',').map(s => s.trim()).filter(Boolean);
        const reverse = p.reverse ?? false;

        return (
          <section
            key={p._uid}
            className={`vis-feature reveal${reverse ? ' vis-feature--reverse' : ''}`}
            data-screen-label={p.eyebrow}
          >
            <div className="vis-feature__media">
              {imgSrc && <Image fill src={imgSrc} alt={alt} quality={85} sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover', objectPosition: 'center' }} loading="lazy" />}
            </div>
            <div className="vis-feature__body">
              <span className="vis-feature__eyebrow">{p.eyebrow}</span>
              <h2 className="vis-feature__heading">
                {heading.map((line, i) => (
                  <Fragment key={i}>{i > 0 && <br />}{line}</Fragment>
                ))}
              </h2>
              <p className="team-person">{p.person} <span>&middot; {p.role}</span></p>
              {paras.map((para, i) => (
                <p key={i} className="vis-feature__text">{para}</p>
              ))}
              {pills.length > 0 && (
                <div className="team-meta">
                  {pills.map((pill) => (
                    <span key={pill} className="pill">{pill}</span>
                  ))}
                </div>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}
