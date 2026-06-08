'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { motion } from 'framer-motion';
import AnimateIn from '../../ui/AnimateIn/AnimateIn';
import styles from './AmenitiesSection.module.css';
import 'swiper/css';

const SLIDES = [
  { src: '/images/renders/amenity-01.jpg', alt: 'SELVA — residents lounge' },
  { src: '/images/renders/amenity-02.jpg', alt: 'SELVA — wellness centre' },
  { src: '/images/renders/amenity-03.jpg', alt: 'SELVA — pool terrace' },
  { src: '/images/renders/interior-04.jpg', alt: 'SELVA — private garden' },
];

// Swiper 12 loop requires ≥8 slides with slidesPerView: auto
const LOOP_SLIDES = [...SLIDES, ...SLIDES];
const total = SLIDES.length;
const pad = (n: number) => String(n).padStart(2, '0');

const HEADLINE = ['A Life', 'Lived Beautifully'];

const headlineContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};

const headlineLine = {
  hidden: { y: '108%' },
  visible: {
    y: '0%',
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export default function AmenitiesSection() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [current, setCurrent] = useState(1);

  return (
    <section className={styles.section}>
      <div className={styles.bg} aria-hidden />
      <div className={styles.overlay} aria-hidden />

      {/* Right-aligned intro */}
      <div className={styles.introWrap}>
        <div className={styles.introInner}>
          <AnimateIn>
            <span className={styles.label}>Amenities</span>
          </AnimateIn>
          <motion.h2
            className={styles.heading}
            variants={headlineContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {HEADLINE.map((line, i) => (
              <span key={i} className={styles.lineWrap}>
                <motion.span className={styles.line} variants={headlineLine}>
                  {line}
                </motion.span>
              </span>
            ))}
          </motion.h2>
          <AnimateIn delay={0.2}>
            <p className={styles.sub}>
              From the skylit wellness terrace to the botanical residents&apos; lounge,
              every amenity at SELVA is conceived to enrich daily life with nature,
              light, and unhurried luxury.
            </p>
          </AnimateIn>
        </div>
      </div>

      {/* Carousel strip */}
      <div className={styles.strip}>

        {/* Dark panel — left flex child. High z-index covers the loop clone. */}
        <div className={styles.darkPanel}>
          <div className={styles.panelBg} aria-hidden />
          <div className={styles.panelOverlay} aria-hidden />
          <button
            className={styles.navBtn}
            style={{ bottom: '80px' }}
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Next slide"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
              <path d="M3 13 L9 7 L15 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <span className={styles.counter} aria-live="polite" aria-atomic>
            {pad(current)}&thinsp;/&thinsp;{pad(total)}
          </span>
          <button
            className={styles.navBtn}
            style={{ top: '80px' }}
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Previous slide"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
              <path d="M3 5 L9 11 L15 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Swiper — right flex child. overflow: visible lets loop clone spill left; panel z-index buries it. */}
        <div className={styles.swiperWrap}>
          <Swiper
            modules={[A11y]}
            slidesPerView="auto"
            spaceBetween={12}
            loop
            grabCursor
            speed={500}
            onSwiper={(s) => { swiperRef.current = s; }}
            onRealIndexChange={(s) => setCurrent((s.realIndex % total) + 1)}
            className={styles.swiper}
          >
            {LOOP_SLIDES.map((slide, i) => (
              <SwiperSlide key={i} className={styles.slide}>
                <Link href="/amenities" className={styles.slideInner}>
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    sizes="(max-width: 768px) 280px, 460px"
                    quality={85}
                    style={{ objectFit: 'cover' }}
                  />
                  <div className={styles.slideOverlay} aria-hidden>
                    <span className={styles.overlayLabel}>Explore</span>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>

      {/* CTA */}
      <AnimateIn>
        <div className={styles.ctaRow}>
          <Link href="/amenities" className={styles.cta}>
            <span>View Amenities</span>
            <span aria-hidden>View Amenities</span>
          </Link>
        </div>
      </AnimateIn>
    </section>
  );
}
