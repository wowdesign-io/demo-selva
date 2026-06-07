'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
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
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Background zooms out as section scrolls into view (same pattern as OverviewSection panels)
  const bgScale = useTransform(scrollYProgress, [0, 0.6], [1.1, 1.0]);

  return (
    <section ref={ref} className={styles.section}>

      {/* Background image */}
      <motion.div className={styles.bg} style={{ scale: bgScale }}>
        <Image
          src="/images/renders/amenity-02.jpg"
          alt=""
          fill
          style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
          quality={85}
          aria-hidden
        />
      </motion.div>

      {/* Dark overlay */}
      <div className={styles.overlay} />

      {/* Content */}
      <div className={styles.inner}>

        <span className={styles.label}>The Vision</span>

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

        <motion.div
          className={styles.body}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.45 }}
          viewport={{ once: true, margin: '-60px' }}
        >
          <p>
            SELVA is a rare collection of forty private residences where Miami&apos;s lush canopy,
            refined interiors, and open sky converge. Conceived for those who seek the
            extraordinary — a home that breathes, grows, and endures.
          </p>
          <p>
            Every detail, from the hand-selected material palette to the seamless
            indoor–outdoor flow, reflects a singular vision: to create a living environment
            as alive and generous as the nature that surrounds it.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          viewport={{ once: true }}
        >
          <Link href="/vision" className={styles.cta}>
            Explore the Vision <span className={styles.arrow}>→</span>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
