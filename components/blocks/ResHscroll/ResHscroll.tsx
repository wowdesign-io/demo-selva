'use client';

import { useRef, useEffect } from 'react';

export default function ResHscroll() {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef  = useRef<HTMLDivElement>(null);

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
    <section className="res-hscroll" id="residences" data-screen-label="Residences">
      <div ref={outerRef} className="res-hscroll__outer" id="hscrollOuter">
        <div className="res-hscroll__sticky">

          <div className="res-hscroll__header">
            <p className="res-hscroll__label">Residences &middot; Three Models &middot; 40 Suites</p>
            <a href="/residences#planpoint" className="res-hscroll__cta-link">Explore in Digital Twin &rarr;</a>
          </div>

          <div ref={trackRef} className="res-hscroll__track" id="hscrollTrack">

            <div className="res-hscroll__card res-hscroll__card--intro">
              <div className="res-hscroll__intro-leaves"></div>
              <div className="res-hscroll__intro-content">
                <p className="res-hscroll__intro-overline">SELVA &middot; Miami &middot; Pre-Sales</p>
                <h2 className="res-hscroll__intro-heading">Curated for<br />Private Living.</h2>
                <p className="res-hscroll__intro-body">
                  Three signature layouts &mdash; Models B, C and D &mdash; across forty residences
                  and three floors, each opening to the green canopy.
                </p>
                <a href="/residences#planpoint" className="res-hscroll__card-cta">
                  Explore All Floorplans
                  <svg width="14" height="7" viewBox="0 0 14 7" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="0" y1="3.5" x2="12" y2="3.5" />
                    <polyline points="9,1 12,3.5 9,6" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="res-hscroll__card">
              <div className="res-hscroll__card-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/renders/terrace.png" alt="Model C — Patio 1BR Suite" />
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
                <a href="/residences?f=1&u=102#planpoint" className="res-hscroll__card-cta">View Floorplan &rarr;</a>
              </div>
            </div>

            <div className="res-hscroll__card">
              <div className="res-hscroll__card-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/renders/balcony.png" alt="Model D — 1BR + Den Suite" />
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
                <a href="/residences?f=2&u=201#planpoint" className="res-hscroll__card-cta">View Floorplan &rarr;</a>
              </div>
            </div>

            <div className="res-hscroll__card">
              <div className="res-hscroll__card-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/renders/kitchen-wide.png" alt="Model B — 2BR Suite" />
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
                <a href="/residences?f=2&u=214#planpoint" className="res-hscroll__card-cta">View Floorplan &rarr;</a>
              </div>
            </div>

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
  );
}
