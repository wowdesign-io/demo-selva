'use client';

import Link from 'next/link';
import AnimateIn from '../../ui/AnimateIn/AnimateIn';
import styles from './ResidencesSection.module.css';

export default function ResidencesSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
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
              Forty bespoke one- and two-bedroom residences — several with private dens —
              each thoughtfully proportioned for a life of botanical luxury and urban ease.
            </p>
          </AnimateIn>
          <AnimateIn delay={0.3}>
            <Link href="/residences" className={styles.cta}>
              <span>View Residences</span>
              <span aria-hidden>View Residences</span>
            </Link>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
