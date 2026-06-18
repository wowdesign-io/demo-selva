import type { Metadata } from 'next';
import { Fragment } from 'react';
import HomeScript from '../../components/ui/HomeScript/HomeScript';

export const metadata: Metadata = {
  title: 'The Team — SELVA Residences',
  description:
    'The architects, interior and landscape designers behind SELVA Residences — a small team shaping a building that lives with the Coconut Grove canopy.',
};

const PARTNERS = [
  {
    img: '/images/team/developer.webp', reverse: false, alt: 'Banyan Bay Development',
    eyebrow: 'Developer', heading: ['Banyan Bay', 'Development'],
    person: 'David Calloway', role: 'Founding Partner',
    paras: [
      'Banyan Bay Development conceived SELVA as a deliberately small project — forty residences across three intimate storeys — and has shepherded it from raw land to delivery in mid-2027.',
      'Their approach favours the long view of Coconut Grove over the quick exit: fewer homes, finer detailing, and a building made to belong to its street for decades.',
    ],
    pills: ['Boutique Residential', 'Coconut Grove', 'Long-Term Hold'],
  },
  {
    img: '/images/team/architect.webp', reverse: true, alt: 'Estudio Frondoso',
    eyebrow: 'Architecture', heading: ['Estudio', 'Frondoso'],
    person: 'Marisol Rivera', role: 'Principal Architect',
    paras: [
      'Estudio Frondoso shaped SELVA around the canopy rather than above it — three low storeys, cantilevered terraces and deep eaves that fold planting into the structure.',
      'Warm-white stone and fluted timber let the architecture recede, so that from the street the building reads as part of the forest it sits within.',
    ],
    pills: ['Biophilic Design', 'Low-Rise', 'Tropical Modern'],
  },
  {
    img: '/images/team/interior-design.webp', reverse: false, alt: 'Taller Lumina',
    eyebrow: 'Interior Design', heading: ['Taller', 'Lumina'],
    person: 'Clara Bennett', role: 'Design Director',
    paras: [
      'Taller Lumina drew SELVA’s interior palette straight from nature — white oak, honed travertine, woven cane and brushed brass, framed by glass that opens to the green.',
      'Each room is composed to feel grown rather than installed, with light that shifts across the day and planting never more than a glance away.',
    ],
    pills: ['Natural Materials', 'Custom Millwork', 'Light & Calm'],
  },
  {
    img: '/images/team/landscape.webp', reverse: true, alt: 'Raíz Landscape Studio',
    eyebrow: 'Landscape', heading: ['Raíz Landscape', 'Studio'],
    person: 'Mateo Fuentes', role: 'Studio Director',
    paras: [
      'Raíz Landscape Studio treats planting as architecture, not decoration. Vertical gardens, terrace plantings and a courtyard at the building’s heart keep green within reach of every residence.',
      'Native and tropical species are layered through the structure so the landscape matures with the building, softening it year on year.',
    ],
    pills: ['Native Planting', 'Vertical Gardens', 'Courtyards'],
  },
  {
    img: '/images/team/sales-marketing.webp', reverse: false, alt: 'Meridian Residential',
    eyebrow: 'Sales & Marketing', heading: ['Meridian', 'Residential'],
    person: 'Karen Whitfield', role: 'Sales Director',
    paras: [
      'Meridian Residential leads SELVA’s pre-sales and private previews from the Coconut Grove gallery, guiding residents through floorplans, finishes and the story of the building.',
      'Their team accompanies each buyer from first visit to closing, with the unhurried, personal service a boutique address of forty homes allows.',
    ],
    pills: ['Pre-Sales', 'Private Previews', 'Grove Gallery'],
  },
  {
    img: '/images/team/andy-bittner.webp', reverse: true, alt: 'Andy Bittner — wowdesign',
    eyebrow: 'Digital Experience', heading: ['wowdesign'],
    person: 'Andy Bittner', role: 'Founder',
    paras: [
      'wowdesign designed SELVA’s digital experience — the website and the interactive floorplan tools — translating the architecture’s quiet, botanical character into every screen.',
      'From the first scroll to the live availability map, the goal was a digital home as considered and calm as the residences themselves.',
    ],
    pills: ['Web Design', 'Interactive Floorplans', 'UX & Product'],
  },
];

export default function TeamPage() {
  return (
    <>
      <main>

        {/* ============ HERO ============ */}
        <div className="hero" id="hero" data-screen-label="Team Hero">
          <div className="hero__sticky">
            <div className="hero__imagePanel" id="heroImage">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/renders/vision-01.webp" alt="A SELVA residence opening to the botanical canopy" decoding="async" fetchPriority="high" />
            </div>
            <div className="hero__textPanel">
              <div className="hero__textInner" id="heroText">
                <div className="hero__scrollCue" id="heroCue">
                  <span className="hero__scrollLabel">Scroll to explore</span>
                </div>
                <div className="hero__logoBlock">
                  <p className="hero__preLabel">Miami &middot; The Team</p>
                  <h1 className="hero__pageTitle">The people<br />behind SELVA</h1>
                  <div className="hero__rule"></div>
                  <p className="hero__tagline">Architects, designers and makers shaping a building that lives with the forest.</p>
                </div>
                <p className="hero__deliveryNote">Delivery Mid-2027</p>
              </div>
            </div>
          </div>
        </div>

        {/* ============ INTRO ============ */}
        <section className="team-intro" data-screen-label="Team Intro">
          <span className="team-intro__label reveal">The Makers</span>
          <p className="team-intro__lead reveal" data-delay="100">SELVA is the work of a small, like-minded group of partners &mdash; the developer, architects, interior and landscape designers, and the people who bring it to the world &mdash; united by one idea: that a home should feel grown, not built.</p>
          <p className="team-intro__text reveal" data-delay="200">Each discipline shaped the next, in close collaboration, so that structure, interior and planting read as a single, continuous gesture &mdash; a building that belongs to its corner of Coconut Grove.</p>
        </section>

        {/* ============ PARTNER ROWS ============ */}
        {PARTNERS.map((p) => (
          <section key={p.eyebrow} className={`vis-feature reveal${p.reverse ? ' vis-feature--reverse' : ''}`} data-screen-label={p.eyebrow}>
            <div className="vis-feature__media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.img} alt={p.alt} loading="lazy" decoding="async" />
            </div>
            <div className="vis-feature__body">
              <span className="vis-feature__eyebrow">{p.eyebrow}</span>
              <h2 className="vis-feature__heading">
                {p.heading.map((line, i) => (
                  <Fragment key={i}>{i > 0 && <br />}{line}</Fragment>
                ))}
              </h2>
              <p className="team-person">{p.person} <span>&middot; {p.role}</span></p>
              {p.paras.map((para, i) => <p key={i} className="vis-feature__text">{para}</p>)}
              <div className="team-meta">
                {p.pills.map((pill) => <span key={pill} className="pill">{pill}</span>)}
              </div>
            </div>
          </section>
        ))}

        {/* ============ CTA ============ */}
        <section className="page-cta" data-screen-label="Team CTA">
          <span className="page-cta__label reveal">Explore Next</span>
          <h2 className="page-cta__heading reveal" data-delay="100">Find your place<br /><em>at SELVA</em></h2>
          <a href="/residences#digital-twin" className="btnSlide reveal" data-delay="220">
            <span>Explore Floorplans</span><span aria-hidden="true">Explore Floorplans</span>
          </a>
        </section>

      </main>
      <HomeScript />
    </>
  );
}
