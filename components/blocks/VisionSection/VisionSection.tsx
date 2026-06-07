'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ZoomImage from '../../ui/ZoomImage/ZoomImage';
import AnimateIn from '../../ui/AnimateIn/AnimateIn';
import styles from './VisionSection.module.css';

const HEADLINE = ["Where Miami's", 'Botanical Soul', 'Becomes Home'];

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

export default function VisionSection() {
  return (
    <section className={styles.section}>

      {/* Full-width band — leaves bg stretches edge to edge */}
      <div className={styles.copyBand}>
        <div className={styles.leavesBg} aria-hidden />
        <div className={styles.leavesOverlay} aria-hidden />

      <div className={styles.inner}>

        {/* ── Left: display heading ── */}
        <div className={styles.headingCol}>
          <AnimateIn>
            <span className={styles.label}>The Vision</span>
          </AnimateIn>
          <motion.h2
            className={styles.headline}
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
        </div>

        {/* ── Right: two body paragraphs + CTA, bottom-aligned ── */}
        <div className={styles.bodyCol}>
          <AnimateIn delay={0.2}>
            <p className={styles.bodyText}>
              SELVA is a rare collection of forty private residences where Miami&apos;s lush
              canopy, refined interiors, and open sky converge. Conceived for those who seek
              the extraordinary — a home that breathes, grows, and endures.
            </p>
          </AnimateIn>
          <AnimateIn delay={0.32}>
            <p className={styles.bodyText}>
              Every detail, from the hand-selected material palette to the seamless
              indoor–outdoor flow, reflects a singular vision: to create a living environment
              as alive and generous as the nature that surrounds it.
            </p>
          </AnimateIn>
          <AnimateIn delay={0.44}>
            <Link href="/vision" className={styles.cta}>
              Explore the Vision <span className={styles.arrow}>→</span>
            </Link>
          </AnimateIn>
        </div>

      </div>{/* .inner */}
      </div>{/* .copyBand */}

      {/* ── Full-width render image below ── */}
      <div className={styles.imageWrap}>
        <ZoomImage
          src="/images/renders/interior-02.jpg"
          alt="SELVA — where living and nature converge"
          sizes="100vw"
          quality={90}
        />
      </div>

    </section>
  );
}
