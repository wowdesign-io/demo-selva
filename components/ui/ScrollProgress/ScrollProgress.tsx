'use client';

import { useRef, useEffect } from 'react';

export default function ScrollProgress() {
  const scrollerRef  = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const trackRef     = useRef<HTMLDivElement>(null);
  const arrowUpRef   = useRef<HTMLButtonElement>(null);
  const arrowDownRef = useRef<HTMLButtonElement>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragging     = useRef(false);

  useEffect(() => {
    if (!scrollerRef.current || !indicatorRef.current || !trackRef.current ||
        !arrowUpRef.current  || !arrowDownRef.current) return;

    // Capture as non-null after the guard above
    const scroller  = scrollerRef.current  as HTMLDivElement;
    const indicator = indicatorRef.current as HTMLDivElement;
    const trackEl   = trackRef.current     as HTMLDivElement;
    const arrowUp   = arrowUpRef.current   as HTMLButtonElement;
    const arrowDown = arrowDownRef.current as HTMLButtonElement;

    function clamp(v: number, a: number, b: number) { return Math.max(a, Math.min(b, v)); }

    function updateScroller() {
      const scrollTop  = window.scrollY;
      const docH       = document.documentElement.scrollHeight;
      const winH       = window.innerHeight;
      const scrollable = docH - winH;
      const trackH     = trackEl.offsetHeight;
      const indH       = Math.max(6, (winH / docH) * trackH);
      const maxTravel  = trackH - indH;
      const indTop     = scrollable > 0 ? (scrollTop / scrollable) * maxTravel : 0;
      indicator.style.height = indH + 'px';
      indicator.style.top    = indTop + 'px';
      arrowUp.classList.toggle('is-disabled', scrollTop <= 0);
      arrowDown.classList.toggle('is-disabled', scrollTop >= scrollable - 1);
      scroller.classList.add('is-visible');
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      hideTimerRef.current = setTimeout(() => scroller.classList.remove('is-visible'), 1500);
    }

    function scrollByDir(dir: 'up' | 'down') {
      const amount = window.innerHeight * 0.3 * (dir === 'down' ? 1 : -1);
      const lenis = (window as Window & { __lenis?: { scrollTo: (to: number, opts: object) => void } }).__lenis;
      if (lenis) {
        lenis.scrollTo(window.scrollY + amount, { duration: 0.8 });
      } else {
        window.scrollBy({ top: amount, behavior: 'smooth' });
      }
    }

    arrowUp.addEventListener('click', () => scrollByDir('up'));
    arrowDown.addEventListener('click', () => scrollByDir('down'));

    function onPointerDown(e: PointerEvent) {
      dragging.current = true;
      indicator.classList.add('no-transition');
      indicator.setPointerCapture(e.pointerId);
    }
    function onPointerMove(e: PointerEvent) {
      if (!dragging.current) return;
      const trackH     = trackEl.offsetHeight;
      const indH       = indicator.offsetHeight;
      const maxTravel  = trackH - indH;
      const rect       = trackEl.getBoundingClientRect();
      const relY       = e.clientY - rect.top - indH / 2;
      const clamped    = clamp(relY, 0, maxTravel);
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({ top: (clamped / maxTravel) * scrollable });
    }
    function endDrag() { dragging.current = false; indicator.classList.remove('no-transition'); }

    indicator.addEventListener('pointerdown', onPointerDown);
    indicator.addEventListener('pointermove', onPointerMove);
    indicator.addEventListener('pointerup', endDrag);
    indicator.addEventListener('pointercancel', endDrag);

    window.addEventListener('scroll', updateScroller, { passive: true });
    window.addEventListener('resize', updateScroller, { passive: true });
    updateScroller();

    return () => {
      window.removeEventListener('scroll', updateScroller);
      window.removeEventListener('resize', updateScroller);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  return (
    <div ref={scrollerRef} className="scroller" id="scroller">
      <button ref={arrowUpRef} className="scroller__arrow" id="scrollUp" aria-label="Scroll up"></button>
      <div ref={trackRef} className="scroller__track" id="scrollTrack">
        <div ref={indicatorRef} className="scroller__indicator" id="scrollIndicator"></div>
      </div>
      <button ref={arrowDownRef} className="scroller__arrow scroller__arrow--down" id="scrollDown" aria-label="Scroll down"></button>
    </div>
  );
}
