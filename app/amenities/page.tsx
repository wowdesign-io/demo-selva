import type { Metadata } from 'next';
import AmenitiesCarousel from '../../components/blocks/AmenitiesCarousel/AmenitiesCarousel';
import AmenStickySlider from '../../components/blocks/AmenStickySlider/AmenStickySlider';
import HomeScript from '../../components/ui/HomeScript/HomeScript';

export const metadata: Metadata = {
  title: 'Amenities — SELVA Residences',
  description: 'Seven amenities conceived for a life of botanical luxury. SELVA Residences, Miami.',
};

export default function AmenitiesPage() {
  return (
    <>
      <main>

        {/* ============ HERO ============ */}
        <div className="hero" id="hero" data-screen-label="Amenities Hero">
          <div className="hero__sticky">
            <div className="hero__imagePanel" id="heroImage">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/renders/exterior-05.webp" alt="SELVA — the rooftop pool terrace among the treetops" decoding="async" fetchPriority="high" />
            </div>
            <div className="hero__textPanel">
              <div className="hero__textInner" id="heroText">
                <div className="hero__scrollCue" id="heroCue">
                  <span className="hero__scrollLabel">Scroll to explore</span>
                </div>
                <div className="hero__logoBlock">
                  <p className="hero__preLabel">Miami &middot; Amenities</p>
                  <h1 className="hero__pageTitle">A Life Lived<br />Beautifully</h1>
                  <div className="hero__rule"></div>
                  <p className="hero__tagline">Seven experiences set in the canopy.</p>
                </div>
                <p className="hero__deliveryNote">Delivery Mid-2027</p>
              </div>
            </div>
          </div>
        </div>

        {/* ============ INTRO + CAROUSEL ============ */}
        <section className="amen" id="amenities-intro">
          <div className="amen__texture" aria-hidden="true"></div>
          <div className="amen__intro">
            <div className="amen__introInner">
              <span className="amen__label reveal">Seven Amenities &middot; One Vision</span>
              <h2 className="amen__heading" data-lines="">
                <span className="lineWrap"><span className="line">Conceived for</span></span>
                <span className="lineWrap"><span className="line">Daily Wonder</span></span>
              </h2>
              <p className="amen__sub reveal" data-delay="200">
                From the infinity-edge pool terrace to the botanical residents&rsquo; lounge,
                every amenity at SELVA is conceived to enrich daily life with nature,
                light, and unhurried luxury. A life lived beautifully, every day.
              </p>
              <a href="/residences#digital-twin" className="vision__cta reveal" data-delay="320" style={{ marginTop: 'var(--space-8)' }}>
                Explore the Residences <span className="vision__arrow" aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>

          <AmenitiesCarousel slideHref="/residences#digital-twin" overlayLabel="View Residences" />
        </section>

        {/* ============ CINEMATIC MOTION ============ */}
        <section className="amen-motion" data-screen-label="Amenity Film">
          <div className="amen-motion__media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/amenities/sky-terrace.webp" alt="SELVA — the sky terrace at golden hour" loading="lazy" decoding="async" />
          </div>
          <div className="amen-motion__scrim"></div>
          <div className="amen-motion__content">
            <span className="amen-motion__label reveal">In Motion</span>
            <h2 className="amen-motion__heading reveal" data-delay="100">Evenings unfold<br />above the canopy</h2>
            <a href="/residences#digital-twin" className="btnSlide btnSlide--amber reveal" data-delay="220" style={{ marginTop: 'var(--space-8)' }}>
              <span>View the Floorplans</span><span aria-hidden="true">View the Floorplans</span>
            </a>
          </div>
        </section>

        {/* ============ AMENITIES GRID ============ */}
        <section className="amen-grid">
          <div className="amen-grid__header">
            <span className="amen-grid__label">All Amenities</span>
            <span className="amen-grid__count">Seven experiences</span>
          </div>
          <div className="icon-grid icon-grid--showcase icon-grid--cols-3">

            <div className="icon-grid__item reveal">
              <span className="icon-grid__icon" aria-hidden="true"><svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 15q5-5 10 0t10 0 10 0" /><path d="M5 23q5-5 10 0t10 0 10 0" /><path d="M5 31q5-5 10 0t10 0 10 0" /></svg></span>
              <h3 className="icon-grid__name">Pool Terrace</h3>
              <p className="icon-grid__desc">An infinity-edge pool above the canopy, framed by swaying palms and open Miami sky &mdash; open from sunrise to sunset for residents.</p>
            </div>

            <div className="icon-grid__item reveal" data-delay="80">
              <span className="icon-grid__icon" aria-hidden="true"><svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M22 7c-7 9-10 14-10 19a10 10 0 0 0 20 0c0-5-3-10-10-19z" /></svg></span>
              <h3 className="icon-grid__name">Wellness Spa</h3>
              <p className="icon-grid__desc">Private treatment rooms, sauna, steam, and a cold-plunge pool &mdash; a sanctuary for deep restoration and unhurried wellbeing.</p>
            </div>

            <div className="icon-grid__item reveal" data-delay="160">
              <span className="icon-grid__icon" aria-hidden="true"><svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="22" cy="17" r="6" /><path d="M22 5v3M22 26v2M9 17h3M32 17h3M12.5 7.5l2 2M31.5 7.5l-2 2" /><path d="M6 35h32" /></svg></span>
              <h3 className="icon-grid__name">Sky Terrace</h3>
              <p className="icon-grid__desc">A rooftop terrace with fire feature and lounge seating, set among the treetops for golden-hour gatherings under open sky.</p>
            </div>

            <div className="icon-grid__item reveal">
              <span className="icon-grid__icon" aria-hidden="true"><svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21v-2a3 3 0 0 1 3-3h20a3 3 0 0 1 3 3v2" /><rect x="6" y="21" width="32" height="10" rx="3" /><path d="M11 31v4M33 31v4" /></svg></span>
              <h3 className="icon-grid__name">Residents&rsquo; Lounge</h3>
              <p className="icon-grid__desc">An indoor lounge of linen, stone, and living greenery &mdash; for receptions, quiet afternoons, and evenings by the fire.</p>
            </div>

            <div className="icon-grid__item reveal" data-delay="80">
              <span className="icon-grid__icon" aria-hidden="true"><svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M14 22h16" /><rect x="7" y="15" width="6" height="14" rx="2" /><rect x="31" y="15" width="6" height="14" rx="2" /></svg></span>
              <h3 className="icon-grid__name">Fitness Studio</h3>
              <p className="icon-grid__desc">A light-filled studio facing a vertical garden, equipped for strength, cardio, and stretch amid the green.</p>
            </div>

            <div className="icon-grid__item reveal" data-delay="160">
              <span className="icon-grid__icon" aria-hidden="true"><svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M22 13c-4-3-9-3-14-1.5v21C13 30 18 30 22 33c4-3 9-3 14-1.5v-21C31 10 26 10 22 13z" /><path d="M22 13v20" /></svg></span>
              <h3 className="icon-grid__name">Library &amp; Co-Work</h3>
              <p className="icon-grid__desc">An oak-panelled library and communal worktable &mdash; for focused work or quiet study amid the treetops.</p>
            </div>

            <div className="icon-grid__item reveal" data-delay="240">
              <span className="icon-grid__icon" aria-hidden="true"><svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M22 35V17" /><path d="M22 24c0-5.5 4.2-9.8 9.6-9.8C31.6 19.7 27.4 24 22 24z" /><path d="M22 28c0-4.4-3.4-7.8-7.7-7.8C14.3 24.6 17.7 28 22 28z" /></svg></span>
              <h3 className="icon-grid__name">Garden Courtyard</h3>
              <p className="icon-grid__desc">A meandering botanical courtyard with a water feature and shaded stone seating at the heart of the building.</p>
            </div>

          </div>
        </section>

        {/* ============ STICKY SLIDER — A DAY AT SELVA ============ */}
        <AmenStickySlider />

        {/* ============ CTA ============ */}
        <section className="page-cta" data-screen-label="Amenities CTA">
          <span className="page-cta__label reveal">Explore SELVA</span>
          <h2 className="page-cta__heading reveal" data-delay="100">Find Your Residence</h2>
          <a href="/residences#digital-twin" className="btnSlide reveal" data-delay="220">
            <span>Explore Floorplans</span><span aria-hidden="true">Explore Floorplans</span>
          </a>
        </section>

      </main>
      <HomeScript />
    </>
  );
}
