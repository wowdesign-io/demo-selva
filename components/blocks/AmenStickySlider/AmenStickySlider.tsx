'use client';

import { useRef, useEffect } from 'react';
import { storyblokEditable } from '@storyblok/react';

interface AmenCardBlok {
  _uid: string; component: 'amen_card'
  image?: { filename: string }; alt?: string
  time?: string; name?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any
}
export interface AmenStickySliderBlok {
  _uid: string; component: 'amen_sticky_slider'
  label?: string; title?: string
  cards?: AmenCardBlok[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any
}

const CARDS = [
  { src: '/images/amenities/pool-deck.webp',         alt: 'Pool terrace at sunrise',              time: 'Sunrise',   name: 'Laps in the canopy pool' },
  { src: '/images/amenities/fitness.webp',           alt: 'Fitness studio in the morning',        time: 'Morning',   name: 'Strength among the ferns' },
  { src: '/images/amenities/garden-courtyard.webp',  alt: 'Garden courtyard at midday',           time: 'Midday',    name: 'Stillness in the courtyard' },
  { src: '/images/amenities/coworking-library.webp', alt: 'Library and co-work in the afternoon', time: 'Afternoon', name: 'Focus in the library' },
  { src: '/images/amenities/lounge.webp',            alt: 'Residents lounge in the evening',      time: 'Evening',   name: 'Gatherings by the fire' },
  { src: '/images/amenities/sky-terrace.webp',       alt: 'Sky terrace at nightfall',             time: 'Nightfall', name: 'Sunset on the sky terrace' },
];

/* "A Day at SELVA" — sticky section, scroll position drives a horizontal pan. */
export default function AmenStickySlider({ blok }: { blok?: AmenStickySliderBlok }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track   = trackRef.current;
    if (!section || !track) return;

    function update() {
      const total = section!.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const p = Math.min(Math.max(-section!.getBoundingClientRect().top / total, 0), 1);
      let maxX = track!.scrollWidth - (track!.parentElement as HTMLElement).clientWidth;
      if (maxX < 0) maxX = 0;
      track!.style.transform = 'translate3d(' + (-p * maxX) + 'px,0,0)';
    }

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const label = blok?.label ?? 'A Day at SELVA'
  const title = blok?.title ?? 'From first light to last'
  const cards = blok?.cards?.length
    ? blok.cards.map(c => ({ src: c.image?.filename || '', alt: c.alt ?? '', time: c.time ?? '', name: c.name ?? '' }))
    : CARDS

  return (
    <section ref={sectionRef} className="amen-sticky" id="amenSticky" data-screen-label="A Day at SELVA" {...(blok ? storyblokEditable(blok) : {})}>
      <div className="amen-sticky__pin">
        <div className="amen-sticky__head">
          <div>
            <span className="amen-sticky__label">{label}</span>
            <h2 className="amen-sticky__title">{title}</h2>
          </div>
          <span className="amen-sticky__hint">Scroll to move &rarr;</span>
        </div>
        <div className="amen-sticky__viewport">
          <div ref={trackRef} className="amen-sticky__track" id="amenStickyTrack">
            {cards.map((c) => (
              <figure key={c.time} className="amen-sticky__card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.src} alt={c.alt} loading="lazy" decoding="async" />
                <div className="amen-sticky__cardOverlay"></div>
                <figcaption className="amen-sticky__cardBody">
                  <span className="amen-sticky__cardTime">{c.time}</span>
                  <p className="amen-sticky__cardName">{c.name}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
