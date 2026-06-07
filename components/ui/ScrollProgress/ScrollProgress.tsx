'use client';

import { useEffect, useRef } from 'react';
import styles from './ScrollProgress.module.css';

export default function ScrollProgress() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const thumb = thumbRef.current;
    if (!wrap || !thumb) return;

    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollable = docHeight - winHeight;

      // Track is 50vh; thumb height proportional to viewport/doc ratio, min 24px
      const trackH = winHeight * 0.5;
      const thumbH = Math.max(24, (winHeight / docHeight) * trackH);
      const maxTravel = trackH - thumbH;
      const thumbTop = scrollable > 0 ? (scrollTop / scrollable) * maxTravel : 0;

      thumb.style.height = `${thumbH}px`;
      thumb.style.transform = `translateY(${thumbTop}px)`;

      wrap.style.opacity = '1';

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        wrap.style.opacity = '0';
      }, 1200);
    };

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div ref={wrapRef} className={styles.wrap}>
      <div ref={thumbRef} className={styles.thumb} />
    </div>
  );
}
