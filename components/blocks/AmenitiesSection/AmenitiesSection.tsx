'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ZoomImage from '../../ui/ZoomImage/ZoomImage';
import AnimateIn from '../../ui/AnimateIn/AnimateIn';
import styles from './AmenitiesSection.module.css';

const SLIDES = [
  { src: '/images/renders/amenity-01-sharp.jpg', label: 'Pool Terrace' },
  { src: '/images/renders/amenity-02-sharp.jpg', label: 'Wellness Spa' },
  { src: '/images/renders/amenity-03-sharp.jpg', label: 'Garden Lounge' },
  { src: '/images/renders/interior-02.jpg',      label: 'Residents’ Salon' },
  { src: '/images/renders/interior-04.jpg',      label: 'Private Suite' },
  { src: '/images/renders/interior-01.jpg',      label: 'Sky Conservatory' },
  { src: '/images/renders/interior-03.jpg',      label: 'The Library' },
];

const REAL_LEN = SLIDES.length;
// Triple the list — start at middle copy so we can loop in both directions invisibly
const ALL_SLIDES = [...SLIDES, ...SLIDES, ...SLIDES];

function pad(n: number) {
  return String(n).padStart(2, '0');
}

/* Line-mask heading animation (matches OverviewSection pattern) */
const headingContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

const headingLine = {
  hidden: { y: '110%' },
  visible: {
    y: '0%',
    transition: { duration: 1.05, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const HEADING_LINES = ['A Life', 'Lived Beautifully'];

export default function AmenitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef   = useRef<HTMLDivElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);

  /* Active index into ALL_SLIDES (0-20). Start at middle copy, slide 0. */
  const activeRef       = useRef(REAL_LEN);
  const lockedRef       = useRef(false);
  const suppressClickRef = useRef(false);
  const safeTimerRef    = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Drives the counter display + isActive class; kept in sync with activeRef. */
  const [displayActive, setDisplayActive] = useState(REAL_LEN);

  /* Read carousel geometry from CSS custom properties on the section element.
     Vars change per breakpoint, so we re-read on resize. */
  const readGeo = useCallback(() => {
    const el = sectionRef.current;
    if (!el) return { step: 334, featureX: 314 };
    const cs = getComputedStyle(el);
    const baseW  = parseFloat(cs.getPropertyValue('--amen-base-w'));
    const gap    = parseFloat(cs.getPropertyValue('--amen-gap'));
    const greenW = parseFloat(cs.getPropertyValue('--amen-green-w'));
    return { step: baseW + gap, featureX: greenW + gap };
  }, []);

  /* translateX so that slide `idx` sits at the featured slot (just right of the green panel).
     All slides before it are base-width, so the offset is exactly idx * step. */
  const computeTrackX = useCallback((idx: number) => {
    const { step, featureX } = readGeo();
    return featureX - idx * step;
  }, [readGeo]);

  /* Position the track with no animation (initial placement, snap, resize). */
  const snapTo = useCallback((idx: number) => {
    const track = trackRef.current;
    if (!track) return;
    activeRef.current = idx;
    track.classList.remove(styles.isAnimating);
    track.style.transform = `translate3d(${computeTrackX(idx)}px,0,0)`;
    setDisplayActive(idx);
    void track.offsetWidth; // force reflow so the next animated move actually transitions
  }, [computeTrackX]);

  /* After each animated move, snap back into the middle copy if we've drifted out.
     Content repeats across copies, so the snap is pixel-identical and invisible. */
  const doSnap = useCallback(() => {
    let snapped = activeRef.current;
    if (activeRef.current >= REAL_LEN * 2)  snapped = activeRef.current - REAL_LEN;
    else if (activeRef.current < REAL_LEN)   snapped = activeRef.current + REAL_LEN;
    if (snapped !== activeRef.current) snapTo(snapped);
    lockedRef.current = false;
  }, [snapTo]);

  const go = useCallback((dir: number) => {
    if (lockedRef.current) return;
    lockedRef.current = true;
    const next = activeRef.current + dir;
    activeRef.current = next;
    const track = trackRef.current;
    if (!track) return;
    track.classList.add(styles.isAnimating);
    track.style.transform = `translate3d(${computeTrackX(next)}px,0,0)`;
    setDisplayActive(next);
  }, [computeTrackX]);

  /* goSafe: like go(), but if transitionend doesn't fire within 750ms, snap anyway. */
  const goSafe = useCallback((dir: number) => {
    go(dir);
    if (safeTimerRef.current) clearTimeout(safeTimerRef.current);
    safeTimerRef.current = setTimeout(() => {
      if (lockedRef.current) doSnap();
    }, 750);
  }, [go, doSnap]);

  /* Initial placement + transitionend → snap */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Wait one RAF so CSS vars are applied before we read geometry
    const raf = requestAnimationFrame(() => snapTo(REAL_LEN));

    function onTransitionEnd(e: TransitionEvent) {
      if (e.target !== track || e.propertyName !== 'transform') return;
      doSnap();
    }
    track.addEventListener('transitionend', onTransitionEnd);
    return () => {
      cancelAnimationFrame(raf);
      track.removeEventListener('transitionend', onTransitionEnd);
    };
  }, [snapTo, doSnap]);

  /* Keyboard: ArrowLeft / ArrowRight only while the stage is in the viewport */
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      const stage = stageRef.current;
      if (!stage) return;
      const r = stage.getBoundingClientRect();
      if (r.top > window.innerHeight || r.bottom < 0) return;
      goSafe(e.key === 'ArrowRight' ? 1 : -1);
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [goSafe]);

  /* Swipe: advance on pointer release past 50px threshold */
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    let sx = 0;
    let sActive = false;

    function onPointerDown(e: PointerEvent) { sActive = true; sx = e.clientX; }
    function onPointerUp(e: PointerEvent) {
      if (!sActive) return;
      sActive = false;
      const dx = e.clientX - sx;
      if (Math.abs(dx) > 50) {
        suppressClickRef.current = true;
        setTimeout(() => { suppressClickRef.current = false; }, 60);
        goSafe(dx < 0 ? 1 : -1);
      }
    }
    stage.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);
    return () => {
      stage.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [goSafe]);

  /* Resize: re-apply position after vars change per breakpoint */
  useEffect(() => {
    let rt: ReturnType<typeof setTimeout>;
    function onResize() {
      clearTimeout(rt);
      rt = setTimeout(() => snapTo(activeRef.current), 120);
    }
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, [snapTo]);

  function handleSlideClick(e: React.MouseEvent, idx: number) {
    if (suppressClickRef.current) { e.preventDefault(); return; }
    if (idx === activeRef.current) return; // active slide → follow the link
    e.preventDefault();                    // side slide → advance toward it
    if (lockedRef.current) return;
    goSafe(idx > activeRef.current ? 1 : -1);
  }

  /* Humanise the active index for the counter (always 1-based, real-slide range) */
  const humanIdx = ((displayActive % REAL_LEN) + REAL_LEN) % REAL_LEN;

  return (
    <section id="amenities" ref={sectionRef} className={styles.section}>
      <div className={styles.texture} aria-hidden />

      {/* ── Intro (top-right) ── */}
      <div className={styles.intro}>
        <div className={styles.introInner}>
          <AnimateIn>
            <span className={styles.label}>Amenities</span>
          </AnimateIn>
          <motion.h2
            className={styles.heading}
            variants={headingContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {HEADING_LINES.map((line, i) => (
              <span key={i} className={styles.lineWrap}>
                <motion.span className={styles.line} variants={headingLine}>
                  {line}
                </motion.span>
              </span>
            ))}
          </motion.h2>
          <AnimateIn delay={0.15}>
            <p className={styles.sub}>
              A curated collection of spaces designed for wellness, connection,
              and the quiet pleasures of a life well-lived.
            </p>
          </AnimateIn>
          <AnimateIn delay={0.25}>
            <Link href="/amenities" className={styles.cta}>
              <span>View Amenities</span>
              <span aria-hidden>View Amenities</span>
            </Link>
          </AnimateIn>
        </div>
      </div>

      {/* ── Stage ── */}
      <div ref={stageRef} className={styles.stage}>

        {/* Track — translated by JS to land the active slide in the featured slot */}
        <div ref={trackRef} className={styles.track}>
          {ALL_SLIDES.map((slide, idx) => (
            <a
              key={idx}
              href="/amenities"
              className={`${styles.slide}${displayActive === idx ? ` ${styles.isActive}` : ''}`}
              onClick={(e) => handleSlideClick(e, idx)}
              draggable={false}
            >
              <ZoomImage
                src={slide.src}
                alt={`SELVA — ${slide.label}`}
                sizes="(max-width: 760px) 250px, (max-width: 1100px) 360px, 460px"
                quality={90}
              />
              <div className={styles.overlay} aria-hidden>
                <span className={styles.overlayLabel}>View Amenities</span>
              </div>
            </a>
          ))}
        </div>

        {/* Green nav panel — fixed left, masks the slide behind it */}
        <div className={styles.green}>
          <div className={styles.nav}>
            <button
              className={`${styles.arrow} ${styles.prev}`}
              onClick={() => goSafe(-1)}
              aria-label="Previous amenity"
            >
              <span className={styles.chev} />
            </button>
            <span className={styles.counter}>
              <b>{pad(humanIdx + 1)}</b>
              {' / '}
              <span>{pad(REAL_LEN)}</span>
            </span>
            <button
              className={`${styles.arrow} ${styles.next}`}
              onClick={() => goSafe(1)}
              aria-label="Next amenity"
            >
              <span className={styles.chev} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
