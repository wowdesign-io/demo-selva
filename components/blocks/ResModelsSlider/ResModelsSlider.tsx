'use client';

import { useEffect, useRef } from 'react';

const PROJECT_URL = 'https://app.planpoint.io/miami-wowdesign/laurent?lang=English';

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

export default function ResModelsSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

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

    function onEnter() {
      cursor.classList.add('is-active');
      wrap!.style.cursor = 'none';
    }
    function onLeave() {
      cursor.classList.remove('is-active');
      wrap!.style.cursor = '';
    }
    function onMove(e: MouseEvent) {
      if ((e.target as Element).closest('a, button')) {
        cursor.classList.remove('is-active');
        wrap!.style.cursor = '';
        return;
      }
      cursor.classList.add('is-active');
      wrap!.style.cursor = 'none';
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
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
    <section className="res-hscroll res-hscroll--inline" data-screen-label="Models Slider">
      <div className="res-inline-header">
        <p className="res-hscroll__label">Three Models &middot; 40 Residences</p>
        <a href="#planpoint" className="res-hscroll__cta-link" onClick={(e) => { e.preventDefault(); goToUnit('102', 'Floor 1'); }}>Explore in Digital Twin &rarr;</a>
      </div>

      <div ref={wrapRef} className="res-inline-track-wrap">
        <div ref={trackRef} className="res-inline-track" id="resInlineTrack">

          <div className="res-inline-card res-inline-card--intro">
            <div className="res-hscroll__intro-leaves"></div>
            <div className="res-hscroll__intro-content">
              <p className="res-hscroll__intro-overline">SELVA &middot; Miami &middot; Pre-Sales</p>
              <h2 className="res-hscroll__intro-heading">Three Models,<br />One Address.</h2>
              <p className="res-hscroll__intro-body">Three signature layouts &mdash; Models B, C and D &mdash; across forty residences and three floors, each opening to the green canopy.</p>
              <a href="#planpoint" onClick={(e) => { e.preventDefault(); goToUnit('102', 'Floor 1'); }} className="res-hscroll__card-cta">
                Explore All Floorplans
                <svg width="14" height="7" viewBox="0 0 14 7" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="0" y1="3.5" x2="12" y2="3.5"></line><polyline points="9,1 12,3.5 9,6"></polyline></svg>
              </a>
            </div>
          </div>

          <div className="res-inline-card">
            <div className="res-hscroll__card-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/renders/terrace.webp" alt="Model C — Patio 1BR Suite" loading="lazy" decoding="async" />
            </div>
            <div className="res-hscroll__card-overlay"></div>
            <div className="res-hscroll__card-body">
              <p className="res-hscroll__model-tag">Model C</p>
              <h3 className="res-hscroll__model-name">Patio 1BR Suite</h3>
              <div className="res-hscroll__specs">
                <div className="res-hscroll__spec"><span className="res-hscroll__spec-val">575</span><span className="res-hscroll__spec-key">Approx. SF</span></div>
                <div className="res-hscroll__spec"><span className="res-hscroll__spec-val">1</span><span className="res-hscroll__spec-key">Bedroom</span></div>
                <div className="res-hscroll__spec"><span className="res-hscroll__spec-val">Patio</span><span className="res-hscroll__spec-key">Outdoor</span></div>
              </div>
              <a href="#planpoint" onClick={(e) => { e.preventDefault(); goToUnit('110', 'Floor 1'); }} className="res-hscroll__card-cta">View Floorplan &rarr;</a>
            </div>
          </div>

          <div className="res-inline-card">
            <div className="res-hscroll__card-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/renders/balcony.webp" alt="Model D — 1BR + Den Suite" loading="lazy" decoding="async" />
            </div>
            <div className="res-hscroll__card-overlay"></div>
            <div className="res-hscroll__card-body">
              <p className="res-hscroll__model-tag">Model D</p>
              <h3 className="res-hscroll__model-name">1BR + Den Suite</h3>
              <div className="res-hscroll__specs">
                <div className="res-hscroll__spec"><span className="res-hscroll__spec-val">700&ndash;880</span><span className="res-hscroll__spec-key">Approx. SF</span></div>
                <div className="res-hscroll__spec"><span className="res-hscroll__spec-val">1 + Den</span><span className="res-hscroll__spec-key">Layout</span></div>
                <div className="res-hscroll__spec"><span className="res-hscroll__spec-val">Balcony</span><span className="res-hscroll__spec-key">Outdoor</span></div>
              </div>
              <a href="#planpoint" onClick={(e) => { e.preventDefault(); goToUnit('113', 'Floor 1'); }} className="res-hscroll__card-cta">View Floorplan &rarr;</a>
            </div>
          </div>

          <div className="res-inline-card">
            <div className="res-hscroll__card-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/renders/kitchen-wide.webp" alt="Model B — 2BR Suite" loading="lazy" decoding="async" />
            </div>
            <div className="res-hscroll__card-overlay"></div>
            <div className="res-hscroll__card-body">
              <p className="res-hscroll__model-tag">Model B</p>
              <h3 className="res-hscroll__model-name">2BR Suite</h3>
              <div className="res-hscroll__specs">
                <div className="res-hscroll__spec"><span className="res-hscroll__spec-val">880</span><span className="res-hscroll__spec-key">Approx. SF</span></div>
                <div className="res-hscroll__spec"><span className="res-hscroll__spec-val">2</span><span className="res-hscroll__spec-key">Bedrooms</span></div>
                <div className="res-hscroll__spec"><span className="res-hscroll__spec-val">Terrace</span><span className="res-hscroll__spec-key">Outdoor</span></div>
              </div>
              <a href="#planpoint" onClick={(e) => { e.preventDefault(); goToUnit('112', 'Floor 1'); }} className="res-hscroll__card-cta">View Floorplan &rarr;</a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
