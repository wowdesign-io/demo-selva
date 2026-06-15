'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ZoomImage from '../../ui/ZoomImage/ZoomImage';
import AnimateIn from '../../ui/AnimateIn/AnimateIn';
import styles from './NeighborhoodSection.module.css';

const STATS = [
  { value: '6 min',  label: 'Design District' },
  { value: '12 min', label: 'Brickell' },
  { value: '14 min', label: 'South Beach' },
  { value: '18 min', label: "Miami Int'l Airport" },
];

/* Line-mask heading animation (matches OverviewSection / AmenitiesSection pattern) */
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

const HEADING_LINES = ['One Foot in the Canopy.', 'One Foot in the City.'];

export default function NeighborhoodSection() {
  return (
    <section id="neighborhood" className={styles.section}>

      {/* ── 1. Full-bleed break image ── */}
      <div className={styles.image}>
        <ZoomImage
          src="/images/renders/bayfront-marina.png"
          alt="SELVA — Coconut Grove aerial, where canopy meets bay"
          sizes="100vw"
          quality={90}
        />
      </div>

      {/* ── 2. Proximity strip ── */}
      <div className={styles.strip}>
        <AnimateIn>
          <div className={styles.stripInner}>
            {STATS.map((s) => (
              <div key={s.label} className={styles.stat}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>

      {/* ── 3. Centered statement ── */}
      <div className={styles.body}>
        <AnimateIn>
          <span className={styles.label}>The Neighborhood</span>
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
          <p className={styles.text}>
            SELVA rises in one of Miami&rsquo;s last green enclaves — where the canopy meets
            the bay, and the city&rsquo;s culture, dining, and design districts sit just minutes
            away. A rare address that offers seclusion without distance.
          </p>
        </AnimateIn>

        <AnimateIn delay={0.25}>
          <p className={styles.address}>3000 Hibiscus Lane · Coconut Grove · Miami, FL 33133</p>
        </AnimateIn>

        <AnimateIn delay={0.35}>
          <Link href="/neighborhood" className={styles.cta}>
            <span>Explore the Neighborhood</span>
            <span aria-hidden>Explore the Neighborhood</span>
          </Link>
        </AnimateIn>
      </div>

    </section>
  );
}
