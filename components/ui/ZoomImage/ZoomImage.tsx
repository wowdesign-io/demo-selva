'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './ZoomImage.module.css';

interface ZoomImageProps {
  src: string;
  alt: string;
  sizes?: string;
  quality?: number;
  objectPosition?: string;
  /** Scale from (default 1.12) as element enters, to 1.0 when centred */
  fromScale?: number;
}

export default function ZoomImage({
  src,
  alt,
  sizes = '50vw',
  quality = 90,
  objectPosition = 'center',
  fromScale = 1.12,
}: ZoomImageProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [fromScale, 1.0]);

  return (
    <div ref={ref} className={styles.wrap}>
      <motion.div className={styles.inner} style={{ scale }}>
        <Image
          src={src}
          alt={alt}
          fill
          style={{ objectFit: 'cover', objectPosition }}
          sizes={sizes}
          quality={quality}
        />
      </motion.div>
    </div>
  );
}
