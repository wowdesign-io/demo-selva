'use client';

import { useRef, useEffect } from 'react';
import { storyblokEditable } from '@storyblok/react';

interface SbAsset { filename: string; alt?: string }
interface ResCardBlok {
  _uid: string; component: 'res_card'
  model_tag?: string; name?: string; sf?: string; layout?: string; outdoor?: string
  image?: SbAsset; alt?: string; planpoint_floor?: string; planpoint_unit?: string; cta_text?: string
}
export interface ResHscrollBlok {
  _uid: string; component: 'res_hscroll'
  header_label?: string; header_cta_text?: string; header_cta_href?: string
  intro_overline?: string; intro_heading?: string; intro_body?: string
  intro_cta_text?: string; intro_cta_href?: string; cards?: ResCardBlok[]
  [index: string]: unknown
}

const FALLBACK_CARDS = [
  { _uid: 'c', model_tag: 'Model C', name: 'Patio 1BR Suite',  sf: '575',     layout: '1',       outdoor: 'Patio',    src: '/images/renders/terrace.webp',      alt: 'Model C — Patio 1BR Suite', floor: 'Floor%201', unit: '110' },
  { _uid: 'd', model_tag: 'Model D', name: '1BR + Den Suite',  sf: '700–880', layout: '1 + Den', outdoor: 'Balcony',  src: '/images/renders/balcony.webp',      alt: 'Model D — 1BR + Den Suite', floor: 'Floor%201', unit: '113' },
  { _uid: 'b', model_tag: 'Model B', name: '2BR Suite',        sf: '880',     layout: '2',       outdoor: 'Terrace',  src: '/images/renders/kitchen-wide.webp', alt: 'Model B — 2BR Suite',       floor: 'Floor%201', unit: '112' },
]

export default function ResHscroll({ blok }: { blok?: ResHscrollBlok }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef  = useRef<HTMLDivElement>(null);

  const headerLabel   = blok?.header_label    ?? 'Residences · Three Models · 40 Suites'
  const headerCtaText = blok?.header_cta_text ?? 'Explore in Digital Twin →'
  const headerCtaHref = blok?.header_cta_href ?? '/residences#planpoint'
  const introOverline = blok?.intro_overline  ?? 'SELVA · Miami · Pre-Sales'
  const introHeading  = blok?.intro_heading   ?? 'Curated for Private Living.'
  const introBody     = blok?.intro_body      ?? 'Three signature layouts — Models B, C and D — across forty residences and three floors, each opening to the green canopy.'
  const introCtaText  = blok?.intro_cta_text  ?? 'Explore All Floorplans'
  const introCtaHref  = blok?.intro_cta_href  ?? '/residences#planpoint'

  const cards = blok?.cards?.length
    ? blok.cards.map((c) => ({
        _uid:      c._uid,
        model_tag: c.model_tag ?? '',
        name:      c.name      ?? '',
        sf:        c.sf        ?? '',
        layout:    c.layout    ?? '',
        outdoor:   c.outdoor   ?? '',
        src:       c.image?.filename || '',
        alt:       c.alt ?? c.image?.alt ?? '',
        floor:     encodeURIComponent(c.planpoint_floor ?? 'Floor 1'),
        unit:      c.planpoint_unit ?? '',
        ctaText:   c.cta_text ?? 'View Floorplan →',
      }))
    : FALLBACK_CARDS.map((c) => ({ ...c, ctaText: 'View Floorplan →' }))

  useEffect(() => {
    const outer = outerRef.current;
    const track = trackRef.current;
    const fill  = fillRef.current;
    if (!outer || !track) return;

    function resize() {
      const maxScroll = Math.max(0, track!.scrollWidth - window.innerWidth);
      outer!.style.height = (window.innerHeight + maxScroll + 80) + 'px';
    }

    function update() {
      const rect       = outer!.getBoundingClientRect();
      const scrollable = outer!.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const progress     = Math.max(0, Math.min(1, -rect.top / scrollable));
      const maxTranslate = track!.scrollWidth - window.innerWidth;
      track!.style.transform = `translateX(${-progress * maxTranslate}px)`;
      if (fill) fill.style.width = (progress * 100) + '%';
    }

    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { update(); ticking = false; });
    }

    function onResize() { resize(); update(); }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    resize();
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <section className="res-hscroll" id="residences" data-screen-label="Residences" {...(blok ? storyblokEditable(blok) : {})}>
      <div ref={outerRef} className="res-hscroll__outer" id="hscrollOuter">
        <div className="res-hscroll__sticky">

          <div className="res-hscroll__header">
            <p className="res-hscroll__label">{headerLabel}</p>
            <a href={headerCtaHref} className="res-hscroll__cta-link">{headerCtaText}</a>
          </div>

          <div ref={trackRef} className="res-hscroll__track" id="hscrollTrack">

            <div className="res-hscroll__card res-hscroll__card--intro">
              <div className="res-hscroll__intro-leaves"></div>
              <div className="res-hscroll__intro-content">
                <p className="res-hscroll__intro-overline">{introOverline}</p>
                <h2 className="res-hscroll__intro-heading">{introHeading}</h2>
                <p className="res-hscroll__intro-body">{introBody}</p>
                <a href={introCtaHref} className="res-hscroll__card-cta">
                  {introCtaText}
                  <svg width="14" height="7" viewBox="0 0 14 7" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="0" y1="3.5" x2="12" y2="3.5" />
                    <polyline points="9,1 12,3.5 9,6" />
                  </svg>
                </a>
              </div>
            </div>

            {cards.map((card) => (
              <div key={card._uid} className="res-hscroll__card">
                <div className="res-hscroll__card-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={card.src} alt={card.alt} loading="lazy" decoding="async" />
                </div>
                <div className="res-hscroll__card-overlay"></div>
                <div className="res-hscroll__card-body">
                  <p className="res-hscroll__model-tag">{card.model_tag}</p>
                  <h3 className="res-hscroll__model-name">{card.name}</h3>
                  <div className="res-hscroll__specs">
                    <div className="res-hscroll__spec"><span className="res-hscroll__spec-val">{card.sf}</span><span className="res-hscroll__spec-key">Approx. SF</span></div>
                    <div className="res-hscroll__spec"><span className="res-hscroll__spec-val">{card.layout}</span><span className="res-hscroll__spec-key">{card.layout === '2' ? 'Bedrooms' : 'Bedroom'}</span></div>
                    <div className="res-hscroll__spec"><span className="res-hscroll__spec-val">{card.outdoor}</span><span className="res-hscroll__spec-key">Outdoor</span></div>
                  </div>
                  <a href={`/residences?f=${card.floor}&u=${card.unit}#planpoint`} className="res-hscroll__card-cta">{card.ctaText}</a>
                </div>
              </div>
            ))}

          </div>

          <div className="res-hscroll__footer">
            <div className="res-hscroll__progress">
              <div ref={fillRef} className="res-hscroll__progress-fill" id="hscrollFill"></div>
            </div>
            <span className="res-hscroll__progress-hint">Scroll to explore</span>
          </div>

        </div>
      </div>
    </section>
  )
}
