import type { Metadata } from 'next';
import ResModelsSlider from '../../components/blocks/ResModelsSlider/ResModelsSlider';
import PlanpointEmbed from '../../components/blocks/PlanpointEmbed/PlanpointEmbed';
import HomeScript from '../../components/ui/HomeScript/HomeScript';

export const metadata: Metadata = {
  title: 'Residences — SELVA',
  description:
    'Explore 40 botanical residences in Miami. Select your residence, view floorplans, and reserve — powered by the SELVA digital twin.',
};

export default function ResidencesPage() {
  return (
    <>
      <main>

        {/* ============ HERO ============ */}
        <div className="hero" id="hero" data-screen-label="Residences Hero">
          <div className="hero__sticky">
            <div className="hero__imagePanel" id="heroImage">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/renders/exterior-02.webp" alt="SELVA Residences — twilight facade among the canopy, Miami" decoding="async" fetchPriority="high" />
            </div>
            <div className="hero__textPanel">
              <div className="hero__textInner" id="heroText">
                <div className="hero__scrollCue" id="heroCue">
                  <span className="hero__scrollLabel">Scroll to explore</span>
                </div>
                <div className="hero__logoBlock">
                  <p className="hero__preLabel">Miami · 40 Residences</p>
                  <h1 className="hero__pageTitle">Find Your<br />Residence</h1>
                  <div className="hero__rule"></div>
                  <p className="hero__tagline">Explore, select, and reserve — directly.</p>
                </div>
                <p className="hero__deliveryNote">Delivery Mid-2027</p>
              </div>
            </div>
          </div>
        </div>

        {/* ============ STATS BRIDGE ============ */}
        <div className="stat-strip stat-strip--light" data-screen-label="Stats Bridge">
          <div className="stat-strip__inner reveal">
            <div className="stat-strip__item"><span className="stat-strip__value">From $300K</span><span className="stat-strip__label">Starting Price</span></div>
            <div className="stat-strip__item"><span className="stat-strip__value">575 &ndash; 800</span><span className="stat-strip__label">Square Feet</span></div>
            <div className="stat-strip__item"><span className="stat-strip__value">40</span><span className="stat-strip__label">Residences</span></div>
            <div className="stat-strip__item"><span className="stat-strip__value">Mid-2027</span><span className="stat-strip__label">Delivery</span></div>
          </div>
        </div>

        {/* ============ MODELS SLIDER ============ */}
        <ResModelsSlider />

        {/* ============ PLANPOINT DIGITAL TWIN ============ */}
        <PlanpointEmbed />

        {/* ============ RESIDENCE FEATURES ============ */}
        <section className="res-feat" data-screen-label="Residence Features">
          <div className="res-feat__inner">
            <div className="res-feat__header reveal">
              <div>
                <p className="res-feat__overline">Every Residence</p>
                <h2 className="res-feat__heading">Crafted to<br />the Last Detail</h2>
              </div>
              <p className="res-feat__lead">Unit-specific finishes selected for longevity, comfort, and an unmistakable sense of place.</p>
            </div>
            <div className="icon-grid icon-grid--spec icon-grid--cols-4 res-feat__grid">

              <div className="icon-grid__item reveal">
                <svg className="icon-grid__icon" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="6" y="4" width="13" height="36"></rect><line x1="6" y1="22" x2="19" y2="22"></line>
                  <rect x="25" y="4" width="13" height="36"></rect><line x1="25" y1="22" x2="38" y2="22"></line>
                </svg>
                <p className="icon-grid__name">Floor-to-Ceiling Glass</p>
                <p className="icon-grid__desc">Impact-rated windows and sliding glass balcony doors throughout every residence</p>
              </div>

              <div className="icon-grid__item reveal" data-delay="60">
                <svg className="icon-grid__icon" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="4" y1="38" x2="40" y2="38"></line>
                  <line x1="4" y1="14" x2="40" y2="14"></line>
                  <line x1="12" y1="14" x2="12" y2="38"></line>
                  <line x1="22" y1="14" x2="22" y2="38"></line>
                  <line x1="32" y1="14" x2="32" y2="38"></line>
                </svg>
                <p className="icon-grid__name">Private Ocean Terrace</p>
                <p className="icon-grid__desc">Fully tiled balconies with frameless glass railings — accessible from living room and primary bedroom</p>
              </div>

              <div className="icon-grid__item reveal" data-delay="120">
                <svg className="icon-grid__icon" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="5" y="10" width="34" height="26" rx="1"></rect>
                  <circle cx="16" cy="21" r="5"></circle>
                  <circle cx="28" cy="21" r="5"></circle>
                  <circle cx="16" cy="31" r="3"></circle>
                  <circle cx="28" cy="31" r="3"></circle>
                </svg>
                <p className="icon-grid__name">Chef&rsquo;s Kitchen</p>
                <p className="icon-grid__desc">Thermador &amp; Bosch appliances, stone island, custom cabinetry in every suite</p>
              </div>

              <div className="icon-grid__item reveal" data-delay="180">
                <svg className="icon-grid__icon" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="10,8 10,18 30,18"></polyline>
                  <rect x="26" y="13" width="12" height="9" rx="2"></rect>
                  <line x1="30" y1="28" x2="27" y2="38"></line>
                  <line x1="34" y1="26" x2="31" y2="38"></line>
                  <line x1="38" y1="28" x2="35" y2="38"></line>
                </svg>
                <p className="icon-grid__name">Spa Primary Bath</p>
                <p className="icon-grid__desc">Rain showers, double vanities, stone countertops and porcelain tile floor to ceiling</p>
              </div>

              <div className="icon-grid__item reveal" data-delay="60">
                <svg className="icon-grid__icon" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="4" y="8" width="36" height="8"></rect>
                  <rect x="4" y="18" width="36" height="8"></rect>
                  <rect x="4" y="28" width="36" height="8"></rect>
                  <line x1="22" y1="8" x2="22" y2="16"></line>
                  <line x1="14" y1="18" x2="14" y2="26"></line>
                  <line x1="28" y1="28" x2="28" y2="36"></line>
                </svg>
                <p className="icon-grid__name">Engineered Flooring</p>
                <p className="icon-grid__desc">Wide-plank oak in bedrooms; large-format porcelain throughout living areas</p>
              </div>

              <div className="icon-grid__item reveal" data-delay="120">
                <svg className="icon-grid__icon" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="4" y="6" width="36" height="34"></rect>
                  <line x1="22" y1="6" x2="22" y2="40"></line>
                  <line x1="6" y1="16" x2="20" y2="16"></line>
                  <line x1="24" y1="16" x2="38" y2="16"></line>
                  <circle cx="13" cy="12" r="3"></circle>
                  <circle cx="31" cy="12" r="3"></circle>
                </svg>
                <p className="icon-grid__name">Custom Closet Systems</p>
                <p className="icon-grid__desc">Fully built-out wardrobe configurations designed for every suite</p>
              </div>

              <div className="icon-grid__item reveal" data-delay="180">
                <svg className="icon-grid__icon" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="6" y="6" width="32" height="32" rx="2"></rect>
                  <circle cx="22" cy="26" r="9"></circle>
                  <circle cx="22" cy="26" r="5"></circle>
                  <circle cx="12" cy="13" r="1.5" fill="currentColor" stroke="none"></circle>
                  <circle cx="18" cy="13" r="1.5" fill="currentColor" stroke="none"></circle>
                </svg>
                <p className="icon-grid__name">In-Unit Laundry</p>
                <p className="icon-grid__desc">Dedicated laundry room with full-size washer &amp; dryer in every residence</p>
              </div>

              <div className="icon-grid__item reveal" data-delay="240">
                <svg className="icon-grid__icon" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M17 40 L27 40"></path>
                  <line x1="22" y1="40" x2="22" y2="29"></line>
                  <path d="M16 29 Q12 22 12 16 L12 9 Q12 6 22 6 Q32 6 32 9 L32 16 Q32 22 28 29 Z"></path>
                  <line x1="12" y1="22" x2="32" y2="22"></line>
                </svg>
                <p className="icon-grid__name">Wine Storage</p>
                <p className="icon-grid__desc">Integrated wine coolers in select residences</p>
              </div>

            </div>
          </div>
        </section>

        {/* ============ CTA — ONWARD TO AMENITIES ============ */}
        <section className="page-cta" data-screen-label="Explore Next">
          <span className="page-cta__label reveal">Explore Next</span>
          <h2 className="page-cta__heading reveal" data-delay="100">Discover the Amenities</h2>
          <a href="/amenities" className="btnSlide reveal" data-delay="220">
            <span>View Amenities</span><span aria-hidden="true">View Amenities</span>
          </a>
        </section>

      </main>
      <HomeScript />
    </>
  );
}
