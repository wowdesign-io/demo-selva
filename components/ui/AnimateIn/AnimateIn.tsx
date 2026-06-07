'use client';

import { motion } from 'framer-motion';

interface AnimateInProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

/**
 * Fade + translateY reveal on scroll. Use for headings, labels, and body blocks.
 * For large display headings with per-line mask reveal use the HEADLINE pattern instead.
 */
export default function AnimateIn({ children, delay = 0, y = 22, className }: AnimateInProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        delay,
      }}
      viewport={{ once: true, margin: '-60px' }}
    >
      {children}
    </motion.div>
  );
}
