import Link from 'next/link';
import { storyblokEditable } from '@storyblok/react/rsc';
import { resolveLink, type SbLink } from '../../../lib/resolveLink';

export interface PressIndexBlok {
  _uid: string; component: 'press_index'
  label?: string
  heading?: string
  note?: string
  media_email?: string
  cta_label?: string
  cta_heading?: string
  cta_button_text?: string
  cta_button_href?: SbLink
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any
}

export interface PressCardItem {
  pub: string; date: string; title: string; slug: string; delay?: string
}

const ArrowIcon = () => (
  <svg width="16" height="11" viewBox="0 0 16 11" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
    <path d="M1 5.5h13M10 1l4.5 4.5L10 10" />
  </svg>
);

export default function PressIndex({
  blok,
  cards,
}: {
  blok?: PressIndexBlok
  cards: PressCardItem[]
}) {
  const label      = blok?.label    ?? 'Latest News';
  const heading    = blok?.heading  ?? 'Coverage &amp; announcements';
  const note       = blok?.note     ?? 'Illustrative coverage, created for this presentation.';
  const email      = blok?.media_email ?? 'press@selvaresidences.com';
  const ctaLabel   = blok?.cta_label ?? 'Explore Next';
  const ctaHeading = blok?.cta_heading ?? 'Begin your <em>visit</em>';
  const ctaBtnText = blok?.cta_button_text ?? 'Explore Floorplans';
  const ctaLink    = resolveLink(blok?.cta_button_href, '/residences#digital-twin');

  return (
    <>
      {/* ============ HERO ============ */}
      <div className="hero" id="hero" data-screen-label="Press Hero">
        <div className="hero__sticky">
          <div className="hero__imagePanel" id="heroImage">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/renders/interior-01.jpg"
              alt="SELVA Residences — a light-filled living space opening to the canopy"
              decoding="async"
              fetchPriority="high"
            />
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
      <section className="press" data-screen-label="Press" {...(blok ? storyblokEditable(blok) : {})}>
        <div className="press__head">
          <div className="press__intro">
            <span className="press__label reveal">{label}</span>
            <h2
              className="press__heading reveal"
              data-delay="100"
              dangerouslySetInnerHTML={{ __html: heading }}
            />
          </div>
          <p className="press__note reveal" data-delay="160">{note}</p>
        </div>

        <div className="press__grid">
          {cards.map((card, i) => (
            <Link
              key={i}
              href={`/press/${card.slug}`}
              className="press-card reveal"
              data-delay={card.delay || undefined}
            >
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
        <p className="press-media__text">
          Press &amp; media enquiries &mdash;{' '}
          <a href={`mailto:${email}`}>{email}</a>
        </p>
      </div>

      {/* ============ CTA ============ */}
      <section className="page-cta" data-screen-label="Press CTA">
        <span className="page-cta__label reveal">{ctaLabel}</span>
        <h2
          className="page-cta__heading reveal"
          data-delay="100"
          dangerouslySetInnerHTML={{ __html: ctaHeading }}
        />
        <a href={ctaLink.href} className="btnSlide reveal" data-delay="220">
          <span>{ctaBtnText}</span><span aria-hidden="true">{ctaBtnText}</span>
        </a>
      </section>
    </>
  );
}
