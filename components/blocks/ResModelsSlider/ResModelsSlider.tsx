'use client';

import { useEffect, useRef } from 'react';
import { storyblokEditable } from '@storyblok/react';

const PROJECT_URL = 'https://app.planpoint.io/miami-wowdesign/laurent?lang=English';

interface SbAsset { filename: string; alt?: string }
interface ResCardBlok {
  _uid: string; component: 'res_card'
  model_tag?: string; name?: string; sf?: string; layout?: string; outdoor?: string
  image?: SbAsset; alt?: string
  planpoint_floor?: string; planpoint_unit?: string; cta_text?: string
}
export interface ResModelsSliderBlok {
  _uid: string; component: 'res_models_slider'
  header_label?: string; cta_text?: string
  intro_overline?: string; intro_heading?: string; intro_body?: string; intro_cta_text?: string
  cards?: ResCardBlok[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any
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

/* Deep-link into a specific Planpoint unit, then scroll to the embed. */
function goToUnit(unitId: string, floorId: string) {
  const iframe = document.getElementById('planpoint-frame') as HTMLIFrameElement | null;
  const section = document.getElementById('planpoint');
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

  const headerLabel  = blok?.header_label  ?? 'Three Models · 40 Residences';
  const introCta     = blok?.cta_text      ?? 'Explore in Digital Twin →';
  const introOverline = blok?.intro_overline ?? 'SELVA · Miami · Pre-Sales';
  const introHeading = blok?.intro_heading  ?? 'Three Models,\nOne Address.';
  const introBody    = blok?.intro_body     ?? 'Three signature layouts — Models B, C and D — across forty residences and three floors, each opening to the green canopy.';
  const introCta2    = blok?.intro_cta_text ?? 'Explore All Floorplans';
  const cards        = blok?.cards?.length  ? blok.cards : DEFAULT_CARDS;

  /* Cursor-based nav: floating arrow follows the pointer; click scrolls one card. */
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

  const introHeadingLines = introHeading.split('\n');

  return (
    <section
      className="res-hscroll res-hscroll--inline"
      data-screen-label="Models Slider"
      {...(blok ? storyblokEditable(blok) : {})}
    >
      <div className="res-inline-header">
        <p className="res-hscroll__label">{headerLabel}</p>
        <a
          href="#planpoint"
          className="res-hscroll__cta-link"
          onClick={(e) => { e.preventDefault(); goToUnit('102', 'Floor 1'); }}
        >
          {introCta}
        </a>
      </div>

      <div ref={wrapRef} className="res-inline-track-wrap">
        <div ref={trackRef} className="res-inline-track" id="resInlineTrack">

          <div className="res-inline-card res-inline-card--intro">
            <div className="res-hscroll__intro-leaves"></div>
            <div className="res-hscroll__intro-content">
              <p className="res-hscroll__intro-overline">{introOverline}</p>
              <h2 className="res-hscroll__intro-heading">
                {introHeadingLines.map((line, i) => (
                  <span key={i}>{line}{i < introHeadingLines.length - 1 && <br />}</span>
                ))}
              </h2>
              <p className="res-hscroll__intro-body">{introBody}</p>
              <a
                href="#planpoint"
                onClick={(e) => { e.preventDefault(); goToUnit('102', 'Floor 1'); }}
                className="res-hscroll__card-cta"
              >
                {introCta2}
                <svg width="14" height="7" viewBox="0 0 14 7" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="0" y1="3.5" x2="12" y2="3.5"></line>
                  <polyline points="9,1 12,3.5 9,6"></polyline>
                </svg>
              </a>
            </div>
          </div>

          {cards.map((card) => {
            const imgSrc = card.image?.filename ?? '';
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
                    href="#planpoint"
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
