'use client';

import { useEffect, useRef } from 'react';
import { storyblokEditable } from '@storyblok/react';

const PROJECT_URL = 'https://app.planpoint.io/miami-wowdesign/laurent?lang=English';

interface SbAsset { filename: string; alt?: string }
interface SbLink { linktype?: string; url?: string; cached_url?: string; target?: string }

interface ResIntroCardBlok {
  _uid: string; component: 'res_intro_card'
  label?: string; heading?: string; body?: string; cta_text?: string; cta_href?: SbLink | string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any
}
interface ResCardBlok {
  _uid: string; component: 'res_card'
  model_tag?: string; name?: string; sf?: string; layout?: string; outdoor?: string
  img_src?: string; image?: SbAsset; alt?: string
  planpoint_floor?: string; planpoint_unit?: string; cta_text?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any
}
export interface ResModelsSliderBlok {
  _uid: string; component: 'res_models_slider'
  header_label?: string; cta_text?: string; header_cta_href?: SbLink | string
  cards?: (ResIntroCardBlok | ResCardBlok)[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any
}

const DEFAULT_INTRO: ResIntroCardBlok = {
  _uid: 'intro-default', component: 'res_intro_card',
  label: 'SELVA · Miami · Pre-Sales',
  heading: 'Three Models,\nOne Address.',
  body: 'Three signature layouts — Models B, C and D — across forty residences and three floors, each opening to the green canopy.',
  cta_text: 'Explore All Floorplans',
}
const DEFAULT_CARDS: ResCardBlok[] = [
  {
    _uid: 'c1', component: 'res_card',
    model_tag: 'Model C', name: 'Patio 1BR Suite', sf: '575', layout: '1', outdoor: 'Patio',
    image: { filename: '/images/renders/terrace.webp', alt: 'Model C — Patio 1BR Suite' },
    planpoint_unit: '110', planpoint_floor: 'Floor 1', cta_text: 'View Floorplan',
  },
  {
    _uid: 'c2', component: 'res_card',
    model_tag: 'Model D', name: '1BR + Den Suite', sf: '700–880', layout: '1 + Den', outdoor: 'Balcony',
    image: { filename: '/images/renders/balcony.webp', alt: 'Model D — 1BR + Den Suite' },
    planpoint_unit: '113', planpoint_floor: 'Floor 1', cta_text: 'View Floorplan',
  },
  {
    _uid: 'c3', component: 'res_card',
    model_tag: 'Model B', name: '2BR Suite', sf: '880', layout: '2', outdoor: 'Terrace',
    image: { filename: '/images/renders/kitchen-wide.webp', alt: 'Model B — 2BR Suite' },
    planpoint_unit: '112', planpoint_floor: 'Floor 1', cta_text: 'View Floorplan',
  },
]

function goToUnit(unitId: string, floorId: string) {
  const iframe = document.getElementById('digital-twin-frame') as HTMLIFrameElement | null;
  const section = document.getElementById('digital-twin');
  if (iframe) {
    let src = PROJECT_URL;
    if (floorId) src += '&f=' + encodeURIComponent(floorId);
    if (unitId) src += '&u=' + encodeURIComponent(unitId);
    iframe.src = src;
  }
  if (section) {
    const top = section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: Math.max(0, top - 80), behavior: 'smooth' });
  }
}

export default function ResModelsSlider({ blok }: { blok?: ResModelsSliderBlok }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  // cards[0] is the intro card (res_intro_card), cards[1..] are model cards (res_card)
  const allCards = blok?.cards ?? [];
  const introCard = allCards[0]?.component === 'res_intro_card' ? allCards[0] as ResIntroCardBlok : null;
  const modelCards = introCard ? allCards.slice(1) as ResCardBlok[] : allCards as ResCardBlok[];

  const intro   = introCard ?? DEFAULT_INTRO;
  const cards   = modelCards.length ? modelCards : DEFAULT_CARDS;

  const headerLabel   = blok?.header_label ?? 'Three Models · 40 Residences';
  const headerCtaText = blok?.cta_text     ?? 'Explore in Digital Twin →';

  const introHeadingLines = (intro.heading ?? '').split('\n');

  useEffect(() => {
    const inlineTrack = trackRef.current;
    const wrap = wrapRef.current;
    if (!inlineTrack || !wrap) return;

    const cursor = document.createElement('div');
    cursor.className = 'res-cursor';
    cursor.innerHTML =
      '<div class="res-cursor__inner res-cursor__inner--left">' +
        '<svg width="11" height="18" viewBox="0 0 11 18" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="9,1 2,9 9,17"></polyline></svg>' +
      '</div>' +
      '<div class="res-cursor__inner res-cursor__inner--right">' +
        '<svg width="11" height="18" viewBox="0 0 11 18" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="2,1 9,9 2,17"></polyline></svg>' +
      '</div>';
    document.body.appendChild(cursor);

    let dir = 1;

    function onEnter() { cursor.classList.add('is-active'); wrap!.style.cursor = 'none'; }
    function onLeave() { cursor.classList.remove('is-active'); wrap!.style.cursor = ''; }
    function onMove(e: MouseEvent) {
      if ((e.target as Element).closest('a, button')) {
        cursor.classList.remove('is-active'); wrap!.style.cursor = ''; return;
      }
      cursor.classList.add('is-active'); wrap!.style.cursor = 'none';
      cursor.style.left = e.clientX + 'px'; cursor.style.top = e.clientY + 'px';
      const rect = wrap!.getBoundingClientRect();
      dir = e.clientX - rect.left < rect.width / 2 ? -1 : 1;
      cursor.classList.toggle('is-left', dir === -1);
      cursor.classList.toggle('is-right', dir === 1);
    }
    function onClick(e: MouseEvent) {
      if ((e.target as Element).closest('a, button')) return;
      const card = inlineTrack!.querySelector('.res-inline-card') as HTMLElement | null;
      const cardW = card ? card.offsetWidth + 20 : 500;
      inlineTrack!.scrollBy({ left: dir * cardW, behavior: 'smooth' });
    }

    wrap.addEventListener('mouseenter', onEnter);
    wrap.addEventListener('mouseleave', onLeave);
    wrap.addEventListener('mousemove', onMove);
    wrap.addEventListener('click', onClick);

    return () => {
      wrap.removeEventListener('mouseenter', onEnter);
      wrap.removeEventListener('mouseleave', onLeave);
      wrap.removeEventListener('mousemove', onMove);
      wrap.removeEventListener('click', onClick);
      cursor.remove();
    };
  }, []);

  return (
    <section
      className="res-hscroll res-hscroll--inline"
      data-screen-label="Models Slider"
      {...(blok ? storyblokEditable(blok) : {})}
    >
      <div className="res-inline-header">
        <p className="res-hscroll__label">{headerLabel}</p>
        <a
          href="#digital-twin"
          className="res-hscroll__cta-link"
          onClick={(e) => { e.preventDefault(); goToUnit('102', 'Floor 1'); }}
        >
          {headerCtaText}
        </a>
      </div>

      <div ref={wrapRef} className="res-inline-track-wrap">
        <div ref={trackRef} className="res-inline-track" id="resInlineTrack">

          <div
            className="res-inline-card res-inline-card--intro"
            {...(introCard ? storyblokEditable(introCard) : {})}
          >
            <div className="res-hscroll__intro-leaves"></div>
            <div className="res-hscroll__intro-content">
              <p className="res-hscroll__intro-overline">{intro.label}</p>
              <h2 className="res-hscroll__intro-heading">
                {introHeadingLines.map((line, i) => (
                  <span key={i}>{line}{i < introHeadingLines.length - 1 && <br />}</span>
                ))}
              </h2>
              <p className="res-hscroll__intro-body">{intro.body}</p>
              <a
                href="#digital-twin"
                onClick={(e) => { e.preventDefault(); goToUnit('102', 'Floor 1'); }}
                className="res-hscroll__card-cta"
              >
                {intro.cta_text}
                <svg width="14" height="7" viewBox="0 0 14 7" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="0" y1="3.5" x2="12" y2="3.5"></line>
                  <polyline points="9,1 12,3.5 9,6"></polyline>
                </svg>
              </a>
            </div>
          </div>

          {cards.map((card) => {
            const imgSrc = card.img_src || card.image?.filename || '';
            const imgAlt = card.alt ?? card.image?.alt ?? card.name ?? '';
            const unitId = card.planpoint_unit ?? '';
            const floorId = card.planpoint_floor ?? 'Floor 1';
            return (
              <div key={card._uid} className="res-inline-card" {...storyblokEditable(card)}>
                <div className="res-hscroll__card-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imgSrc} alt={imgAlt} loading="lazy" decoding="async" />
                </div>
                <div className="res-hscroll__card-overlay"></div>
                <div className="res-hscroll__card-body">
                  <p className="res-hscroll__model-tag">{card.model_tag}</p>
                  <h3 className="res-hscroll__model-name">{card.name}</h3>
                  <div className="res-hscroll__specs">
                    <div className="res-hscroll__spec">
                      <span className="res-hscroll__spec-val">{card.sf}</span>
                      <span className="res-hscroll__spec-key">Approx. SF</span>
                    </div>
                    <div className="res-hscroll__spec">
                      <span className="res-hscroll__spec-val">{card.layout}</span>
                      <span className="res-hscroll__spec-key">Layout</span>
                    </div>
                    <div className="res-hscroll__spec">
                      <span className="res-hscroll__spec-val">{card.outdoor}</span>
                      <span className="res-hscroll__spec-key">Outdoor</span>
                    </div>
                  </div>
                  <a
                    href="#digital-twin"
                    onClick={(e) => { e.preventDefault(); goToUnit(unitId, floorId); }}
                    className="res-hscroll__card-cta"
                  >
                    {card.cta_text ?? 'View Floorplan'} &rarr;
                  </a>
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
