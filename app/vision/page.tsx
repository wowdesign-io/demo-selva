import type { Metadata } from 'next';
import HomeScript from '../../components/ui/HomeScript/HomeScript';

export const metadata: Metadata = {
  title: 'The Vision — SELVA Residences',
  description: "Where Miami's botanical soul becomes home. The vision behind SELVA Residences.",
};

export default function VisionPage() {
  return (
    <>
      <main>

        {/* ============ HERO ============ */}
        <div className="hero" id="hero" data-screen-label="Vision Hero">
          <div className="hero__sticky">
            <div className="hero__imagePanel" id="heroImage">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/renders/vision-02.webp" alt="SELVA — the low-rise building emerging from the forest canopy" decoding="async" fetchPriority="high" />
            </div>
            <div className="hero__textPanel">
              <div className="hero__textInner" id="heroText">
                <div className="hero__scrollCue" id="heroCue">
                  <span className="hero__scrollLabel">Scroll to explore</span>
                </div>
                <div className="hero__logoBlock">
                  <p className="hero__preLabel">Miami &middot; The Vision</p>
                  <h1 className="hero__pageTitle">Where Forest<br />Meets Sky</h1>
                  <div className="hero__rule"></div>
                  <p className="hero__tagline">The philosophy behind forty residences in the canopy.</p>
                </div>
                <p className="hero__deliveryNote">Delivery Mid-2027</p>
              </div>
            </div>
          </div>
        </div>

        {/* ============ STATS STRIP ============ */}
        <div className="stat-strip" data-screen-label="Stats">
          <div className="stat-strip__inner reveal">
            <div className="stat-strip__item"><span className="stat-strip__value">40</span><span className="stat-strip__label">Residences</span></div>
            <div className="stat-strip__item"><span className="stat-strip__value">3</span><span className="stat-strip__label">Stories</span></div>
            <div className="stat-strip__item"><span className="stat-strip__value">3</span><span className="stat-strip__label">Models</span></div>
            <div className="stat-strip__item"><span className="stat-strip__value">2027</span><span className="stat-strip__label">Delivery</span></div>
          </div>
        </div>

        {/* ============ VISION COPY BAND ============ */}
        <section className="vision">
          <div className="vision__copyBand">
            <div className="vision__leavesBg" aria-hidden="true"></div>
            <div className="vision__leavesOverlay" aria-hidden="true"></div>
            <div className="vision__inner">
              <div className="vision__headingCol">
                <span className="vision__label reveal">The Vision</span>
                <h2 className="vision__headline" data-lines="">
                  <span className="lineWrap"><span className="line">Where Miami&rsquo;s</span></span>
                  <span className="lineWrap"><span className="line">Botanical Soul</span></span>
                  <span className="lineWrap"><span className="line">Becomes Home</span></span>
                </h2>
              </div>
              <div className="vision__bodyCol">
                <p className="vision__bodyText reveal" data-delay="150">
                  SELVA is a rare collection of forty private residences where Miami&rsquo;s lush
                  canopy, refined interiors, and open sky converge. Conceived for those who seek
                  the extraordinary &mdash; a home that breathes, grows, and endures.
                </p>
                <p className="vision__bodyText reveal" data-delay="260">
                  SELVA was born from the conviction that luxury and nature are not in tension &mdash;
                  they are complements. Where others impose the city upon the land, SELVA cedes ground
                  to the canopy. Architecture bends to the tree line. Terraces open to the sky.
                  Every interior breathes.
                </p>
                <a href="/residences#planpoint" className="vision__cta reveal" data-delay="480" style={{ marginTop: 'var(--space-6)' }}>
                  Explore the Residences <span className="vision__arrow" aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
          </div>
          <div className="vision__imageWrap">
            <div className="zoom"><div className="zoom__inner zoom-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/renders/interior-02.jpg" alt="SELVA — where living and nature converge" loading="lazy" decoding="async" />
            </div></div>
          </div>
        </section>

        {/* ============ DESIGN PILLARS ============ */}
        <section className="icon-grid icon-grid--showcase icon-grid--cols-3 vis-pillars">
          <div className="icon-grid__item reveal">
            <span className="icon-grid__icon" aria-hidden="true"><svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M9 38V21a13 13 0 0 1 26 0v17" /><line x1="5" y1="38" x2="39" y2="38" /></svg></span>
            <h3 className="icon-grid__name">Botanical<br />Architecture</h3>
            <p className="icon-grid__desc">Designed in dialogue with Miami&rsquo;s tropical canopy, every facade and terrace integrates living material &mdash; from shaded loggias to rooftop gardens that evolve with the seasons.</p>
          </div>
          <div className="icon-grid__item reveal" data-delay="120">
            <span className="icon-grid__icon" aria-hidden="true"><svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="8" width="26" height="28" rx="1" /><line x1="22" y1="8" x2="22" y2="36" /><line x1="9" y1="22" x2="35" y2="22" /></svg></span>
            <h3 className="icon-grid__name">Living<br />Interiors</h3>
            <p className="icon-grid__desc">A material palette of warm stone, aged timber, and hand-plastered walls brings the outside in. Every surface is chosen for its sensory connection to the earth beneath the canopy.</p>
          </div>
          <div className="icon-grid__item reveal" data-delay="240">
            <span className="icon-grid__icon" aria-hidden="true"><svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><line x1="6" y1="31" x2="38" y2="31" /><path d="M14 31a8 8 0 0 1 16 0" /><line x1="22" y1="11" x2="22" y2="15" /><line x1="10.5" y1="18.5" x2="13" y2="21" /><line x1="33.5" y1="18.5" x2="31" y2="21" /></svg></span>
            <h3 className="icon-grid__name">Urban<br />Serenity</h3>
            <p className="icon-grid__desc">SELVA offers the rare privilege of seclusion without distance &mdash; a quietude only the canopy provides, with Miami&rsquo;s design districts, bay, and cultural heart just minutes away.</p>
          </div>
        </section>

        {/* ============ ARCHITECTURE ============ */}
        <section className="vis-feature">
          <div className="vis-feature__media"><div className="zoom"><div className="zoom__inner zoom-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/renders/exterior-04.webp" alt="SELVA — planted terraces against a warm-white facade" loading="lazy" decoding="async" />
          </div></div></div>
          <div className="vis-feature__body">
            <span className="vis-feature__eyebrow reveal">Architecture</span>
            <h2 className="vis-feature__heading reveal" data-delay="80">Designed around<br />the canopy</h2>
            <p className="vis-feature__text reveal" data-delay="160">Rather than impose a tower on the land, SELVA keeps to three intimate storeys and lets the planting climb. Cantilevered terraces brim with greenery, deep eaves shade every window, and warm-white stone and fluted timber settle the architecture into its surroundings &mdash; a building that reads, from the street, as part of the forest itself.</p>
            <a href="/residences#planpoint" className="btnSlide reveal" data-delay="240">
              <span>View Residences</span><span aria-hidden="true">View Residences</span>
            </a>
          </div>
        </section>

        {/* ============ INTERIORS & MATERIALS ============ */}
        <section className="vis-feature vis-feature--reverse">
          <div className="vis-feature__media"><div className="zoom"><div className="zoom__inner zoom-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/renders/kitchen.webp" alt="SELVA — oak, travertine and brushed-brass interiors" loading="lazy" decoding="async" />
          </div></div></div>
          <div className="vis-feature__body">
            <span className="vis-feature__eyebrow reveal">The Interiors</span>
            <h2 className="vis-feature__heading reveal" data-delay="80">Materials drawn<br />from the earth</h2>
            <p className="vis-feature__text reveal" data-delay="160">Inside, the palette stays close to nature &mdash; warm white oak underfoot, honed travertine, woven cane and brushed brass, framed by glass that opens to the green. Light shifts through each residence over the course of the day, and the planting outside is never more than a glance away. Interiors composed to feel grown, not installed.</p>
            <a href="/residences#planpoint" className="btnSlide reveal" data-delay="240">
              <span>View the Floorplans</span><span aria-hidden="true">View the Floorplans</span>
            </a>
          </div>
        </section>

        {/* ============ STATEMENT ============ */}
        <section className="vis-statement">
          <span className="vis-statement__eyebrow reveal">The Manifesto</span>
          <p className="vis-statement__quote reveal" data-delay="100">&ldquo;A home that breathes, grows, and endures.&rdquo;</p>
        </section>

        {/* ============ SECOND IMAGE ============ */}
        <div className="vis-image2">
          <div className="zoom"><div className="zoom__inner zoom-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/renders/terrace.webp" alt="SELVA — a planted private terrace in the canopy" loading="lazy" decoding="async" />
          </div></div>
        </div>

        {/* ============ CTA ============ */}
        <section className="page-cta" data-screen-label="Vision CTA">
          <span className="page-cta__label reveal">Explore Next</span>
          <h2 className="page-cta__heading reveal" data-delay="100">Discover the Residences</h2>
          <a href="/residences#planpoint" className="btnSlide reveal" data-delay="220">
            <span>View Residences</span><span aria-hidden="true">View Residences</span>
          </a>
        </section>

      </main>
      <HomeScript />
    </>
  );
}
