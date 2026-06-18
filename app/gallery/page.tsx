import type { Metadata } from 'next';
import GalleryGrid from '../../components/blocks/GalleryGrid/GalleryGrid';
import HomeScript from '../../components/ui/HomeScript/HomeScript';

export const metadata: Metadata = {
  title: 'Gallery — SELVA Residences',
  description:
    'A closer look at SELVA Residences — architecture, interiors, amenities and the Coconut Grove neighborhood, frame by frame.',
};

export default function GalleryPage() {
  return (
    <>
      <main>

        {/* ============ HERO ============ */}
        <div className="hero" id="hero" data-screen-label="Gallery Hero">
          <div className="hero__sticky">
            <div className="hero__imagePanel" id="heroImage">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/renders/exterior-03.webp" alt="SELVA Residences — the botanical entrance loggia among the canopy" decoding="async" fetchPriority="high" />
            </div>
            <div className="hero__textPanel">
              <div className="hero__textInner" id="heroText">
                <div className="hero__scrollCue" id="heroCue">
                  <span className="hero__scrollLabel">Scroll to explore</span>
                </div>
                <div className="hero__logoBlock">
                  <p className="hero__preLabel">Miami &middot; Gallery</p>
                  <h1 className="hero__pageTitle">A closer look</h1>
                  <div className="hero__rule"></div>
                  <p className="hero__tagline">Architecture, interiors and the life around SELVA &mdash; frame by frame.</p>
                </div>
                <p className="hero__deliveryNote">Delivery Mid-2027</p>
              </div>
            </div>
          </div>
        </div>

        {/* ============ MASONRY GALLERY ============ */}
        <section className="gallery" data-screen-label="Gallery">
          <GalleryGrid />
        </section>

        {/* ============ CTA ============ */}
        <section className="page-cta" data-screen-label="Gallery CTA">
          <span className="page-cta__label reveal">Explore Next</span>
          <h2 className="page-cta__heading reveal" data-delay="100">See it for <em>yourself</em></h2>
          <a href="/residences#digital-twin" className="btnSlide reveal" data-delay="220">
            <span>Explore Floorplans</span><span aria-hidden="true">Explore Floorplans</span>
          </a>
        </section>

      </main>
      <HomeScript />
    </>
  );
}
