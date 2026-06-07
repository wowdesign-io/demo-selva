'use client';

import { useEffect, useRef, useCallback } from 'react';
import styles from './ScrollProgress.module.css';

export default function ScrollProgress() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const arrowUpRef = useRef<HTMLButtonElement>(null);
  const arrowDownRef = useRef<HTMLButtonElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isDragging = useRef(false);

  const update = useCallback(() => {
    const wrap = wrapRef.current;
    const indicator = indicatorRef.current;
    const track = trackRef.current;
    const arrowUp = arrowUpRef.current;
    const arrowDown = arrowDownRef.current;
    if (!wrap || !indicator || !track) return;

    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const scrollable = docHeight - winHeight;
    const trackH = track.offsetHeight;

    const indicatorH = Math.max(6, (winHeight / docHeight) * trackH);
    const maxTravel = trackH - indicatorH;
    const indicatorTop = scrollable > 0 ? (scrollTop / scrollable) * maxTravel : 0;

    indicator.style.height = `${indicatorH}px`;
    indicator.style.top = `${indicatorTop}px`;

    // Disable arrows at edges
    if (arrowUp) arrowUp.classList.toggle(styles.arrowDisabled, scrollTop <= 0);
    if (arrowDown) arrowDown.classList.toggle(styles.arrowDisabled, scrollTop >= scrollable - 1);

    wrap.classList.add(styles.visible);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      wrap.classList.remove(styles.visible);
    }, 1500);
  }, []);

  const scrollBy = useCallback((direction: 'up' | 'down') => {
    const amount = window.innerHeight * 0.3 * (direction === 'down' ? 1 : -1);
    const lenis = (window as any).__lenis;
    if (lenis) {
      lenis.scrollTo(window.scrollY + amount, { duration: 0.8 });
    } else {
      window.scrollBy({ top: amount, behavior: 'smooth' });
    }
  }, []);

  // Drag-to-scroll on the indicator
  useEffect(() => {
    const indicator = indicatorRef.current;
    const track = trackRef.current;
    if (!indicator || !track) return;

    const onPointerDown = (e: PointerEvent) => {
      isDragging.current = true;
      indicator.classList.add(styles.noTransition);
      indicator.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      const trackH = track.offsetHeight;
      const indicatorH = indicator.offsetHeight;
      const maxTravel = trackH - indicatorH;
      const trackRect = track.getBoundingClientRect();
      const relY = e.clientY - trackRect.top - indicatorH / 2;
      const clamped = Math.max(0, Math.min(relY, maxTravel));
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const target = (clamped / maxTravel) * scrollable;

      const lenis = (window as any).__lenis;
      if (lenis) {
        lenis.scrollTo(target, { immediate: true });
      } else {
        window.scrollTo({ top: target });
      }
    };

    const onPointerUp = () => {
      isDragging.current = false;
      indicator.classList.remove(styles.noTransition);
    };

    indicator.addEventListener('pointerdown', onPointerDown);
    indicator.addEventListener('pointermove', onPointerMove);
    indicator.addEventListener('pointerup', onPointerUp);
    indicator.addEventListener('pointercancel', onPointerUp);

    return () => {
      indicator.removeEventListener('pointerdown', onPointerDown);
      indicator.removeEventListener('pointermove', onPointerMove);
      indicator.removeEventListener('pointerup', onPointerUp);
      indicator.removeEventListener('pointercancel', onPointerUp);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [update]);

  return (
    <div ref={wrapRef} className={styles.wrap}>
      <button
        ref={arrowUpRef}
        className={styles.arrow}
        onClick={() => scrollBy('up')}
        aria-label="Scroll up"
      />
      <div ref={trackRef} className={styles.track}>
        <div ref={indicatorRef} className={styles.indicator} />
      </div>
      <button
        ref={arrowDownRef}
        className={`${styles.arrow} ${styles.arrowDown}`}
        onClick={() => scrollBy('down')}
        aria-label="Scroll down"
      />
    </div>
  );
}
