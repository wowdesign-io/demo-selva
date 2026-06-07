'use client';

import Link from 'next/link';
import ZoomImage from '../../ui/ZoomImage/ZoomImage';
import AnimateIn from '../../ui/AnimateIn/AnimateIn';
import styles from './ResidencesSection.module.css';

export default function ResidencesSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* ── Intro — left aligned ── */}
        <div className={styles.intro}>
          <AnimateIn>
            <span className={styles.label}>Residences</span>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h2 className={styles.heading}>
              Curated for<br />Private Living
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <p className={styles.sub}>
              Forty bespoke 1 to 3 bedroom residences, each thoughtfully proportioned
              for a life of botanical luxury and urban ease.
            </p>
          </AnimateIn>
        </div>

        {/* ── Two images — uneven grid ── */}
        <AnimateIn delay={0.1} className={styles.images}>
          <div className={styles.imageLarge}>
            <ZoomImage
              src="/images/renders/interior-03.jpg"
              alt="SELVA — living area with botanical views"
              sizes="(max-width: 768px) 100vw, 60vw"
              quality={90}
            />
          </div>
          <div className={styles.imageSmall}>
            <ZoomImage
              src="/images/renders/interior-04.jpg"
              alt="SELVA — master bedroom suite"
              sizes="(max-width: 768px) 100vw, 38vw"
              quality={90}
            />
          </div>
        </AnimateIn>

        {/* ── CTA ── */}
        <AnimateIn delay={0.15} className={styles.ctaWrap}>
          <Link href="/residences" className={styles.cta}>
            <span>View Residences</span>
            <span aria-hidden>View Residences</span>
          </Link>
        </AnimateIn>

      </div>
    </section>
  );
}
