'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ResHscroll.module.css';

const MODELS = [
  {
    tag: 'Model C',
    name: 'Patio 1BR Suite',
    src: '/images/renders/terrace.png',
    alt: 'Model C — Patio 1BR Suite',
    specs: [
      { val: '575',     key: 'Approx. SF' },
      { val: '1',       key: 'Bedroom' },
      { val: 'Patio',   key: 'Outdoor' },
    ],
    href: '/residences#planpoint',
  },
  {
    tag: 'Model D',
    name: '1BR + Den Suite',
    src: '/images/renders/balcony.png',
    alt: 'Model D — 1BR + Den Suite',
    specs: [
      { val: '700–880', key: 'Approx. SF' },
      { val: '1 + Den', key: 'Layout' },
      { val: 'Balcony', key: 'Outdoor' },
    ],
    href: '/residences#planpoint',
  },
  {
    tag: 'Model B',
    name: '2BR Suite',
    src: '/images/renders/kitchen-wide.png',
    alt: 'Model B — 2BR Suite',
    specs: [
      { val: '880',     key: 'Approx. SF' },
      { val: '2',       key: 'Bedrooms' },
      { val: 'Terrace', key: 'Outdoor' },
    ],
    href: '/residences#planpoint',
  },
];

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
    window.addEventListener('resize', onResize,  { passive: true });
    resize();
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <section className={styles.section} id="residences">
      <div ref={outerRef} className={styles.outer}>
        <div className={styles.sticky}>

          <div className={styles.header}>
            <p className={styles.label}>Residences · Three Models · 40 Suites</p>
            <Link href="/residences#planpoint" className={styles.ctaLink}>
              Explore in Digital Twin →
            </Link>
          </div>

          <div ref={trackRef} className={styles.track}>

            {/* Intro card */}
            <div className={`${styles.card} ${styles.introCard}`}>
              <div className={styles.introLeaves} aria-hidden />
              <div className={styles.introContent}>
                <p className={styles.introOverline}>SELVA · Miami · Pre-Sales</p>
                <h2 className={styles.introHeading}>Curated for<br />Private Living.</h2>
                <p className={styles.introBody}>
                  Three signature layouts — Models B, C and D — across forty residences
                  and three floors, each opening to the green canopy.
                </p>
                <Link href="/residences#planpoint" className={styles.cardCta}>
                  Explore All Floorplans
                  <svg width="14" height="7" viewBox="0 0 14 7" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <line x1="0" y1="3.5" x2="12" y2="3.5" />
                    <polyline points="9,1 12,3.5 9,6" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Model cards */}
            {MODELS.map((model) => (
              <div key={model.tag} className={styles.card}>
                <div className={styles.cardImg}>
                  <Image
                    src={model.src}
                    alt={model.alt}
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                    sizes="(max-width: 768px) 100vw, 48vw"
                    quality={90}
                  />
                </div>
                <div className={styles.cardOverlay} />
                <div className={styles.cardBody}>
                  <p className={styles.modelTag}>{model.tag}</p>
                  <h3 className={styles.modelName}>{model.name}</h3>
                  <div className={styles.specs}>
                    {model.specs.map((s) => (
                      <div key={s.key} className={styles.spec}>
                        <span className={styles.specVal}>{s.val}</span>
                        <span className={styles.specKey}>{s.key}</span>
                      </div>
                    ))}
                  </div>
                  <Link href={model.href} className={styles.cardCta}>
                    View Floorplan →
                  </Link>
                </div>
              </div>
            ))}

          </div>

          <div className={styles.footer}>
            <div className={styles.progress}>
              <div ref={fillRef} className={styles.progressFill} />
            </div>
            <span className={styles.progressHint}>Scroll to explore</span>
          </div>

        </div>
      </div>
    </section>
  );
}
