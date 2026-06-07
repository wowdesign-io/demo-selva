'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './OverviewSection.module.css';

const INTRO_LINES = [
  "Nestled where Miami’s botanical soul meets the open sky,",
  "SELVA presents forty private residences — a rare collection",
  "where verdant canopy, bespoke interiors, and the city converge.",
];

const introContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

const introLine = {
  hidden: { y: '110%' },
  visible: {
    y: '0%',
    transition: { duration: 1.05, ease: [0.16, 1, 0.3, 1] },
  },
};

const PANELS = [
  {
    label: 'Residences',
    href: '/residences',
    src: '/images/renders/interior-01.jpg',
    alt: 'SELVA Residences — curated interiors',
  },
  {
    label: 'Amenities',
    href: '/amenities',
    src: '/images/renders/amenity-01.jpg',
    alt: 'SELVA Amenities — botanical setting',
  },
  {
    label: 'Neighborhood',
    href: '/neighborhood',
    src: '/images/renders/amenity-03.jpg',
    alt: 'SELVA — Miami neighborhood',
  },
];

function OverviewPanel({ panel }: { panel: typeof PANELS[number] }) {
  const ref = useRef<HTMLAnchorElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  // Zooms from 1.14 → 1.0 as panel scrolls into center; reverses on scroll up
  const scale = useTransform(scrollYProgress, [0, 1], [1.14, 1.0]);

  return (
    <Link ref={ref} href={panel.href} className={styles.panel}>
      <motion.div className={styles.imageWrap} style={{ scale }}>
        <Image
          src={panel.src}
          alt={panel.alt}
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          sizes="40vw"
          quality={90}
        />
      </motion.div>
      <div className={styles.overlay} />
      <span className={styles.label}>{panel.label}</span>
    </Link>
  );
}

export default function OverviewSection() {
  return (
    <section className={styles.section}>
      <motion.div
        className={styles.intro}
        variants={introContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        <p className={styles.introText}>
          {INTRO_LINES.map((line, i) => (
            <span key={i} className={styles.lineWrap}>
              <motion.span className={styles.line} variants={introLine}>
                {line}
              </motion.span>
            </span>
          ))}
        </p>
      </motion.div>

      <div className={styles.panels}>
        {PANELS.map((panel) => (
          <OverviewPanel key={panel.href} panel={panel} />
        ))}
      </div>
    </section>
  );
}
