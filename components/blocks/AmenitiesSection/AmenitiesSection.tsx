'use client';

import { useRef, useEffect } from 'react';

const SLIDES = [
  { src: '/images/amenities/pool-deck.webp',         label: 'Pool Terrace' },
  { src: '/images/amenities/spa-room.webp',          label: 'Wellness Spa' },
  { src: '/images/amenities/sky-terrace.webp',       label: 'Sky Terrace' },
  { src: '/images/amenities/lounge.webp',            label: "Residents' Lounge" },
  { src: '/images/amenities/fitness.webp',           label: 'Fitness Studio' },
  { src: '/images/amenities/coworking-library.webp', label: 'Library & Co-Work' },
  { src: '/images/amenities/garden-courtyard.webp',  label: 'Garden Courtyard' },
];

export default function AmenitiesSection() {
  const trackRef   = useRef<HTMLDivElement>(null);
  const stageRef   = useRef<HTMLDivElement>(null);
  const prevRef    = useRef<HTMLButtonElement>(null);
  const nextRef    = useRef<HTMLButtonElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const track   = trackRef.current;
    const stage   = stageRef.current;
    const prevBtn = prevRef.current;
    const nextBtn = nextRef.current;
    const counter = counterRef.current;
    if (!track || !stage || !prevBtn || !nextBtn || !counter) return;

    const realLen = SLIDES.length;
    const COPIES  = 3;
    let active    = realLen; // start at first slide of middle copy
    let locked    = false;
    const nodes: HTMLAnchorElement[] = [];
    const inners: HTMLDivElement[]   = [];

    function pad(n: number) { return String(n).padStart(2, '0'); }

    /* Build tripled DOM */
    const frag = document.createDocumentFragment();
    for (let c = 0; c < COPIES; c++) {
      for (let i = 0; i < realLen; i++) {
        const s = SLIDES[i];
        const slide = document.createElement('a');
        slide.className = 'amen__slide';
        slide.href = '/amenities';

        const inner = document.createElement('div');
        inner.className = 'zoom__inner amen__zoom';
        const img = document.createElement('img');
        img.src = s.src;
        img.alt = 'SELVA — ' + s.label;
        img.draggable = false;
        img.loading = 'lazy';
        img.decoding = 'async';
        inner.appendChild(img);
        slide.appendChild(inner);

        const ov = document.createElement('div');
        ov.className = 'amen__overlay';
        ov.setAttribute('aria-hidden', 'true');
        const lab = document.createElement('span');
        lab.className = 'amen__overlayLabel';
        lab.textContent = 'View Amenities';
        ov.appendChild(lab);
        slide.appendChild(ov);

        inners.push(inner);
        nodes.push(slide);
        frag.appendChild(slide);
      }
    }
    track.appendChild(frag);
    counter.innerHTML = '<b>' + pad(1) + '</b>&thinsp;/&thinsp;<span id="amenTotal">' + pad(realLen) + '</span>';

    /* Geometry from live DOM measurements — never CSS var parseFloat */
    function geo() {
      const greenEl   = stage!.querySelector<HTMLElement>('.amen__green');
      let baseSlide: HTMLElement | null = null;
      for (let i = 0; i < nodes.length; i++) {
        if (!nodes[i].classList.contains('is-active')) { baseSlide = nodes[i]; break; }
      }
      const greenW   = greenEl   ? greenEl.getBoundingClientRect().width  : 300;
      const baseW    = baseSlide ? baseSlide.getBoundingClientRect().width : 320;
      const trackGap = parseFloat(getComputedStyle(track!).gap) || 14;
      return { step: baseW + trackGap, featureX: greenW + trackGap };
    }

    function trackX(idx: number) {
      const g = geo();
      return g.featureX - idx * g.step;
    }

    function applyActiveClass() {
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].classList.toggle('is-active', i === active);
      }
    }

    function setCounter() {
      const human = ((active % realLen) + realLen) % realLen;
      counter!.innerHTML = '<b>' + pad(human + 1) + '</b>&thinsp;/&thinsp;<span id="amenTotal">' + pad(realLen) + '</span>';
    }

    function snapTo(idx: number) {
      active = idx;
      track!.classList.remove('is-animating');
      track!.style.transform = 'translate3d(' + trackX(active) + 'px,0,0)';
      applyActiveClass();
      setCounter();
      void track!.offsetWidth;
    }

    function go(dir: number) {
      if (locked) return;
      locked = true;
      active += dir;
      track!.classList.add('is-animating');
      track!.style.transform = 'translate3d(' + trackX(active) + 'px,0,0)';
      applyActiveClass();
      setCounter();
    }

    function doSnap() {
      let snapped = active;
      if (active >= realLen * 2) snapped = active - realLen;
      else if (active < realLen)  snapped = active + realLen;
      if (snapped !== active) snapTo(snapped);
      locked = false;
    }

    track.addEventListener('transitionend', function(e: TransitionEvent) {
      if (e.target !== track || e.propertyName !== 'transform') return;
      doSnap();
    });

    const safeRef = { timer: 0 };
    function goSafe(dir: number) {
      go(dir);
      clearTimeout(safeRef.timer);
      safeRef.timer = window.setTimeout(function() {
        if (locked) doSnap();
      }, 750);
    }

    nextBtn.addEventListener('click', () => goSafe(1));
    prevBtn.addEventListener('click', () => goSafe(-1));

    function onKeydown(e: KeyboardEvent) {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      const r = stage!.getBoundingClientRect();
      if (r.top > window.innerHeight || r.bottom < 0) return;
      if (e.key === 'ArrowRight') goSafe(1);
      if (e.key === 'ArrowLeft')  goSafe(-1);
    }
    document.addEventListener('keydown', onKeydown);

    let sx = 0, sActive = false, suppressClick = false;
    function onPointerDown(e: PointerEvent) { sActive = true; sx = e.clientX; }
    function onPointerUp(e: PointerEvent) {
      if (!sActive) return;
      sActive = false;
      const dx = e.clientX - sx;
      if (Math.abs(dx) > 50) {
        suppressClick = true;
        setTimeout(() => { suppressClick = false; }, 60);
        goSafe(dx < 0 ? 1 : -1);
      }
    }
    stage.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);

    function onTrackClick(e: MouseEvent) {
      const slide = (e.target as Element).closest('.amen__slide') as HTMLAnchorElement | null;
      if (!slide) return;
      if (suppressClick) { e.preventDefault(); return; }
      if (slide.classList.contains('is-active')) return;
      e.preventDefault();
      if (locked) return;
      const idx = nodes.indexOf(slide);
      if (idx > active) goSafe(1);
      else if (idx < active) goSafe(-1);
    }
    track.addEventListener('click', onTrackClick);

    /* Scroll zoom on inner elements */
    function clampZ(v: number, a: number, b: number) { return Math.max(a, Math.min(b, v)); }
    function updateZoom() {
      const winH = window.innerHeight;
      for (let i = 0; i < inners.length; i++) {
        const el = inners[i];
        const r = el.getBoundingClientRect();
        if (r.bottom < -240 || r.top > winH + 240) continue;
        const denom = winH / 2 + r.height / 2;
        const p = clampZ((winH - r.top) / denom, 0, 1);
        el.style.transform = 'scale(' + (1.12 + (1.0 - 1.12) * p) + ')';
      }
    }
    let zTick = false;
    function reqZoom() {
      if (!zTick) { zTick = true; requestAnimationFrame(() => { updateZoom(); zTick = false; }); }
    }
    window.addEventListener('scroll', reqZoom, { passive: true });

    let resizeTimer = 0;
    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => { snapTo(active); updateZoom(); }, 120);
    }
    window.addEventListener('resize', onResize, { passive: true });

    requestAnimationFrame(() => { snapTo(active); updateZoom(); });
    window.addEventListener('load', () => { snapTo(active); updateZoom(); }, { once: true });

    return () => {
      document.removeEventListener('keydown', onKeydown);
      stage.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('scroll', reqZoom);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <section className="amen" id="amenities" data-screen-label="Amenities">
      <div className="amen__texture" aria-hidden="true"></div>

      <div className="amen__intro">
        <div className="amen__introInner">
          <span className="amen__label reveal">Amenities</span>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <h2 className="amen__heading" {...{ 'data-lines': '' } as any}>
            <span className="lineWrap"><span className="line">A Life</span></span>
            <span className="lineWrap"><span className="line">Lived Beautifully</span></span>
          </h2>
          <p className="amen__sub reveal" data-delay="200">
            From the skylit wellness terrace to the botanical residents&apos; lounge,
            every amenity at SELVA is conceived to enrich daily life with nature,
            light, and unhurried luxury.
          </p>
          <a href="/amenities" className="btnSlide amen__cta reveal" data-delay="300">
            <span>View Amenities</span><span aria-hidden="true">View Amenities</span>
          </a>
        </div>
      </div>

      <div ref={stageRef} className="amen__stage">
        <div ref={trackRef} className="amen__track" id="amenTrack"></div>
        <div className="amen__green">
          <div className="amen__nav">
            <button ref={prevRef} className="amen__arrow amen__arrow--prev" id="amenPrev" aria-label="Previous amenity">
              <span className="amen__chev"></span>
            </button>
            <span ref={counterRef} className="amen__counter" id="amenCounter">
              <b>01</b>&thinsp;/&thinsp;<span id="amenTotal">07</span>
            </span>
            <button ref={nextRef} className="amen__arrow amen__arrow--next" id="amenNext" aria-label="Next amenity">
              <span className="amen__chev"></span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
