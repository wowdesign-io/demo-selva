'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end start'],
  });

  // Image expands from 50% → 100%, sliding over the text panel
  const imageWidth = useTransform(scrollYProgress, [0, 0.38], ['50%', '100%']);

  // Text panel stays fixed — only content fades + shrinks
  const textOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.88]);

  // Subtle upward parallax on the "scroll to explore" cue
  const cueY = useTransform(scrollYProgress, [0, 0.3], [0, -12]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  return (
    /* Scroll runway — 200vh gives room for the entry animation */
    <div ref={wrapperRef} className={styles.wrapper}>
      <div className={styles.sticky}>

        {/* Left — image panel, expands over text panel on scroll */}
        <motion.div className={styles.imagePanel} style={{ width: isMobile ? undefined : imageWidth }}>
          <Image
            src="/images/hero/360-front.jpg"
            alt="SELVA Residences — botanical luxury, Miami"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority
            quality={90}
          />
        </motion.div>

        {/* Right — text panel stays fixed; content fades + shrinks */}
        <div className={styles.textPanel}>
          <motion.div className={styles.textInner} style={isMobile ? undefined : { opacity: textOpacity, scale: textScale }}>

            {/* Top: scroll cue */}
            <motion.div
              className={styles.scrollCue}
              style={isMobile ? undefined : { y: cueY, opacity: cueOpacity }}
            >
              <span className={styles.scrollLabel}>Scroll to explore</span>
            </motion.div>

            {/* Center: wordmark + tagline */}
            <div className={styles.logoBlock}>
              <p className={styles.preLabel}>Miami · 40 Residences</p>
              <h1 className={styles.heroWordmark}>SELVA</h1>
              <div className={styles.rule} />
              <p className={styles.tagline}>
                Where the forest meets the sky.
              </p>
            </div>

            {/* Bottom: delivery note */}
            <p className={styles.deliveryNote}>Delivery Mid-2027</p>

          </motion.div>
        </div>

      </div>
    </div>
  );
}
