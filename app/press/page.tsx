import type { Metadata } from 'next';
import Link from 'next/link';
import HomeScript from '../../components/ui/HomeScript/HomeScript';
import { PRESS_CARDS } from './articles';

export const metadata: Metadata = {
  title: 'Press — SELVA Residences',
  description:
    'The latest news and coverage of SELVA Residences — a 40-residence botanical sanctuary in Coconut Grove, Miami.',
};

const ArrowIcon = () => (
  <svg width="16" height="11" viewBox="0 0 16 11" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
    <path d="M1 5.5h13M10 1l4.5 4.5L10 10" />
  </svg>
);

export default function PressPage() {
  return (
    <>
      <main>

        {/* ============ HERO ============ */}
        <div className="hero" id="hero" data-screen-label="Press Hero">
          <div className="hero__sticky">
            <div className="hero__imagePanel" id="heroImage">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/renders/interior-01.jpg" alt="SELVA Residences — a light-filled living space opening to the canopy" decoding="async" fetchPriority="high" />
            </div>
            <div className="hero__textPanel">
              <div className="hero__textInner" id="heroText">
                <div className="hero__scrollCue" id="heroCue">
                  <span className="hero__scrollLabel">Scroll to explore</span>
                </div>
                <div className="hero__logoBlock">
                  <p className="hero__preLabel">Miami &middot; Press</p>
                  <h1 className="hero__pageTitle">In the press</h1>
                  <div className="hero__rule"></div>
                  <p className="hero__tagline">The story of SELVA, as it is being told.</p>
                </div>
                <p className="hero__deliveryNote">Delivery Mid-2027</p>
              </div>
            </div>
          </div>
        </div>

        {/* ============ PRESS INDEX ============ */}
        <section className="press" data-screen-label="Press">

          <div className="press__head">
            <div className="press__intro">
              <span className="press__label reveal">Latest News</span>
              <h2 className="press__heading reveal" data-delay="100">Coverage &amp;<br />announcements</h2>
            </div>
            <p className="press__note reveal" data-delay="160">Illustrative coverage, created for this presentation.</p>
          </div>

          {/* Card grid (uniform — no featured) */}
          <div className="press__grid">
            {PRESS_CARDS.map((card, i) => (
              <Link key={i} href={`/press/${card.slug}`} className="press-card reveal" data-delay={card.delay || undefined}>
                <div className="press-card__meta">
                  <span className="press-card__pub">{card.pub}</span>
                  <span className="press-card__date">{card.date}</span>
                </div>
                <h3 className="press-card__title">{card.title}</h3>
                <span className="press-more">Read more<ArrowIcon /></span>
              </Link>
            ))}
          </div>
        </section>

        {/* ============ MEDIA ENQUIRIES ============ */}
        <div className="press-media" data-screen-label="Press Media">
          <span className="press-media__label">Media</span>
          <p className="press-media__text">Press &amp; media enquiries &mdash; <a href="mailto:press@selvaresidences.com">press@selvaresidences.com</a></p>
        </div>

        {/* ============ CTA ============ */}
        <section className="page-cta" data-screen-label="Press CTA">
          <span className="page-cta__label reveal">Explore Next</span>
          <h2 className="page-cta__heading reveal" data-delay="100">Begin your <em>visit</em></h2>
          <a href="/residences#planpoint" className="btnSlide reveal" data-delay="220">
            <span>Explore Floorplans</span><span aria-hidden="true">Explore Floorplans</span>
          </a>
        </section>

      </main>
      <HomeScript />
    </>
  );
}
